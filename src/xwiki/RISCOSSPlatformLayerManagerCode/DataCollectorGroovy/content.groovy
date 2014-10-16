/* -*- Mode:Java
 * Groovy code for data collectors.
 */
import org.json.JSONObject;
import org.json.JSONArray;
import java.util.ArrayList;
import java.util.HashMap;
import org.json.JSONObject;
import java.util.concurrent.atomic.AtomicInteger;
import org.apache.commons.io.IOUtils;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.client.HttpClient;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;

public class Ctx {

    static final int COLLECTOR_TIMEOUT_MILLISECONDS = 20000;

    final Object xwiki;
    final Object services;
    final Object xcontext;
    HashMap maybeRDRInfo;
    final HashMap<String, Long> millisecondsByPeriod;

    Ctx(Object xwiki, Object services, Object xcontext, HashMap millisecondsByPeriod) {
        this.xwiki = xwiki;
        this.services = services;
        this.xcontext = xcontext;
        this.millisecondsByPeriod = millisecondsByPeriod;
    }
}

private Ctx mkCtx(Object xwiki, Object services, Object xcontext)
{
    return new Ctx(xwiki, services, xcontext,
        new HashMap<String, Long>() {{
            put("minutely", Long.valueOf(1000L * 60));
            put("hourly",   Long.valueOf(1000L * 60 * 60));
            put("daily",    Long.valueOf(1000L * 60 * 60 * 24));
            put("weekly",   Long.valueOf(1000L * 60 * 60 * 24 * 7));
            put("monthly",  Long.valueOf(1000L * 60 * 60 * 24 * 30));
        }});
}

private Object getValue(Object obj, String name) {
    def prop = obj.getProperty(name);
    if (!prop) { return null; }
    return prop.getValue();
}

private HashMap getRDRInfo(Ctx ctx) {
    if (ctx.maybeRDRInfo == null) {
        def confDoc = ctx.xwiki.getDocument("RISCOSSPlatformCode.RISCOSSConfig");
        def conf = confDoc.getObject("RISCOSSPlatformCode.RISCOSSConfig");
        def outMap = new HashMap<String, String>();
        outMap.put("riscoss_rdrHost", conf.getProperty("rdrHost").getValue());
        outMap.put("riscoss_rdrPort", conf.getProperty("rdrPort").getValue());
        outMap.put("riscoss_rdrPath", conf.getProperty("rdrPath").getValue());
        ctx.maybeRDRInfo = outMap;
    }
    return ctx.maybeRDRInfo;
}

public class CmdReturn {
    String stdout = "";
    String stderr = "";

    static final int retcode_TIMEOUT = (1<<31);
    int retcode;
}


private CmdReturn runCmd(Ctx ctx, String cmd, String stdin)
{
    System.out.println("debug: " + cmd + " < " + stdin);

    final CmdReturn out = new CmdReturn();
    final AtomicInteger ai = new AtomicInteger(4);
    final Process[] process = new Process[1];

    new Thread(new Runnable() {public void run() {
        
        process[0] = Runtime.getRuntime().exec(cmd);
        new Thread(new Runnable() {public void run() {
            out.stdout = IOUtils.toString(process[0].getInputStream(), "UTF-8");
            ai.decrementAndGet();
        } } ).start();
        new Thread(new Runnable() {public void run() {
            out.stderr = IOUtils.toString(process[0].getErrorStream(), "UTF-8");
            ai.decrementAndGet();
        } } ).start();
        new Thread(new Runnable() {public void run() {
            OutputStream stdinStream = process[0].getOutputStream();
            IOUtils.write(stdin, stdinStream, "UTF-8");
            stdinStream.close();
            ai.decrementAndGet();
        } } ).start();

        process[0].waitFor();
        out.retcode = process[0].exitValue();
        ai.decrementAndGet();
    }}).start();

    int waitMilliseconds = 0;
    while (ai.get() != 0) {
        Thread.sleep(10);
        waitMilliseconds += 10;
        if (waitMilliseconds > Ctx.COLLECTOR_TIMEOUT_MILLISECONDS) {
            if (process[0] != null) {
                process[0].destroy();
            }
            System.out.println("warning: TIMEOUT " + cmd + " < " + stdin);
            out.retcode = CmdReturn.retcode_TIMEOUT;
            return out;
        }
    }
    return out;
}

private int uploadToRDR(String output,
                        String host,
                        Long port,
                        String path) throws Exception
{
    HttpClient client = HttpClientBuilder.create().build();
    HttpPost request = new HttpPost("http://" + host + ":" + port + "" + path);
    request.setEntity(new StringEntity(output));
    HttpResponse response = client.execute(request);
    int responseCode = response.getStatusLine().getStatusCode();
    System.out.println("Response Code : " + responseCode);
    BufferedReader rd = new BufferedReader(
      new InputStreamReader(response.getEntity().getContent()));
    StringBuffer result = new StringBuffer();
    String line = "";
    while ((line = rd.readLine()) != null) {
        System.err.println(line);
    }
    if (responseCode < 200 || responseCode > 299) {
        return responseCode;
    }
    return 0;
}

private void runJob(Ctx ctx, Object doc, Object collectorConf, scheduleConf) {
    def collectorDoc = ctx.xwiki.getDocument(collectorConf.getxWikiClass().getName());
    def collectorObj = collectorDoc.getObject("RISCOSSPlatformCode.DataCollector");
    def entity = doc.getObject("RISCOSSPlatformLayerManagerCode.EntityClass");
    String command = getValue(collectorObj, "command");
    Map rdrInfo = getRDRInfo(ctx);
    def out = new JSONObject();
    out.put("riscoss_targetName", entity.getProperty("rdids").getValue());
    for (String propName : collectorConf.getxWikiClass().getEnabledPropertyNames()) {
        out.put(propName, getValue(collectorConf, propName));
    }
    CmdReturn res = runCmd(ctx, command, out.toString());
    System.out.println("debug: stdout: " + res.stdout);
    System.out.println("debug: stderr: " + res.stderr);
    System.out.println("debug: retcode: " + res.retcode);
    if (res.retcode != 0) { return; }
    String out = res.stdout;
    if (out.indexOf("-----BEGIN RISK DATA-----") != -1) {
        out = out.substring(0, out.indexOf("-----BEGIN RISK DATA-----") +
            "-----BEGIN RISK DATA-----".length());
        out = out.substring(out.indexOf("-----END RISK DATA-----"));
    }
    if (uploadToRDR(res.stdout,
                    rdrInfo.get("riscoss_rdrHost"),
                    rdrInfo.get("riscoss_rdrPort"),
                    rdrInfo.get("riscoss_rdrPath")) == 0)
    {
        rescheduleJob(ctx, doc, scheduleConf);
    }
}

private void rescheduleJob(Ctx ctx, Object doc, Object scheduleConf) {
    scheduleConf.set("timeLastRun", System.currentTimeMillis());
    doc.saveWithProgrammingRights("Ran DataCollector", true);
}

private void runSchedule(Ctx ctx, Object doc, Object scheduleConf) {
    Long timeLastRun = getValue(scheduleConf, "timeLastRun");
    if (timeLastRun == null) { timeLastRun = 0; }
    String name = getValue(scheduleConf, "collectorName");
    String fullName = doc.getFullName() + "/" + name;
    Long milliseconds = ctx.millisecondsByPeriod.get(getValue(scheduleConf, "periodicity"));
    if (milliseconds == null) {
        System.out.println("warning: [" + fullName + "] invalid periodicity [" +
            getValue(scheduleConf, "periodicity") + "]");
        return;
    }
    if (System.currentTimeMillis() - timeLastRun > milliseconds) {
        Object collectorConf = doc.getObject(name);
        if (scheduleConf == null) {
            System.out.println("warning: [" + fullName + "] no object");
            return;
        }
        try {
            runJob(ctx, doc, collectorConf, scheduleConf);
        } catch (Exception e) {
            System.out.println("warning: error running [" + fullName + "]");
            e.printStackTrace();
        }
    } else {
        System.out.println("debug: [" + fullName + "] skipping because it is not time yet.");
    }
}

private void runEntity(Ctx ctx, String docName) {

    def doc = ctx.xwiki.getDocument(docName);
    def scheduleConfs = doc.getObjects("RISCOSSPlatformLayerManagerCode.DataCollectorScheduler");
    for (int i = 0; i < scheduleConfs.size(); i++) {
        runSchedule(ctx, doc, scheduleConfs.get(i));
    }
}

public void main(Object xcontext, Object services, Object xwiki) {
    Ctx ctx = mkCtx(xwiki, services, xcontext);
    def docNames = ctx.services.query.xwql(
            "from doc.object('RISCOSSPlatformLayerManagerCode.DataCollectorScheduler') as sched"
        ).execute();
    def dox = new ArrayList();
    for (int i = 0; i < docNames.size(); i++) {
        runEntity(ctx, docNames.get(i));
    }
}
