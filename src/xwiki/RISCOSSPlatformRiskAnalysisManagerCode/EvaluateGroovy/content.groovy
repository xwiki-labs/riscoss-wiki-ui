/* -*- Mode: Java */
import org.json.JSONObject;
import org.xwiki.environment.Environment;
import java.io.File;
import java.io.FileOutputStream;
import org.apache.commons.io.IOUtils;

public JSONObject parseJSON(String stdout)
{
    return new JSONObject(stdout);
}

public String getRemoteAnalyzerPath(Object services)
{
    Object env = services.component.getInstance(Environment.class);
    Object permDir = env.getPermanentDirectory();
    Object file = new File(permDir, "riscoss-remote-risk-analyser.jar");
    if (!file.exists()) {
    println("copying");
        Object input = Thread.currentThread().getContextClassLoader().getResourceAsStream("riscoss-remote-risk-analyser.jar");
        Object output = new FileOutputStream(file);
        IOUtils.copy(input, output);
        IOUtils.closeQuietly(input);
        IOUtils.closeQuietly(output);
    }
    return ""+file;
}
