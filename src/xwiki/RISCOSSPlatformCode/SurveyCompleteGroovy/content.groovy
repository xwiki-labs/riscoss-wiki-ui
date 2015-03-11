/* -*- Mode:Java */

import org.json.JSONObject;
import org.json.JSONArray;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.client.HttpClient;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;

public class SurveyCompleteGroovy
{

public JSONObject getJSONObject()
{
    return new JSONObject();
}

public JSONObject uploadToRDR(String output, String rdrPath) throws Exception
{
    HttpClient client = HttpClientBuilder.create().build();
    HttpPost request = new HttpPost(rdrPath);
    request.setEntity(new StringEntity(output));
    HttpResponse response = client.execute(request);
    int responseCode = response.getStatusLine().getStatusCode();
    JSONObject out = new JSONObject();
    out.put("responseCode", responseCode);
    BufferedReader rd = new BufferedReader(
      new InputStreamReader(response.getEntity().getContent()));
    StringBuffer result = new StringBuffer();
    String allOut = "";
    String line = "";
    while ((line = rd.readLine()) != null) {
        allOut += line + "\n";
    }
    if (responseCode < 200 || responseCode > 299) {
        out.put("error", "unexpected response");
    } else {
        out.put("error", "none");
    }
    out.put("response", allOut);
    return out;
}

public JSONObject runCollector(Object services,
                               String command,
                               JSONObject inputs,
                               String workDir)
{
    JSONObject out =
        new JSONObject(services.commandRunner.run(command, inputs.toString(), 120000, workDir));
    out.put("command", command);
    out.put("workDir", workDir);

    String stdout = out.getString("stdout");
    String BEGIN = "-----BEGIN RISK DATA-----";
    String END = "-----END RISK DATA-----";
    if (stdout != null) {
        int beginIndex = stdout.indexOf(BEGIN);
        int endIndex = stdout.indexOf(END);
        if (beginIndex > -1 && endIndex > -1) {
            String output = stdout.substring(beginIndex + BEGIN.length(), endIndex);
            int ai = output.indexOf("[");
            int oi = output.indexOf("{");
            if (ai == -1 && oi == -1) {
            } else if (ai == -1) {
                out.put("output", new JSONObject(output));
            } else if (oi == -1) {
                out.put("output", new JSONArray(output));
            } else if (ai < oi) {
                out.put("output", new JSONArray(output));
            } else {
                out.put("output", new JSONObject(output));
            }
        }
    }
    return out;
}


}
