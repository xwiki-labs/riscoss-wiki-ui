/* -*- Mode:Java */
import java.util.regex.Pattern;
import java.net.URLEncoder;

public class CreateFromGithubGroovy
{
    private final Pattern regex =
        Pattern.compile('^https://github.com/[a-zA-Z0-9_\\.-]+/[a-zA-Z0-9_\\.-]+\\.git$');

    public boolean isOkGithubURL(String url)
    {
        return regex.matcher(url).matches();
    }

    private String encode(String content)
    {
        return URLEncoder.encode(content).replaceAll("_", "%5F").replaceAll("%2F", "_");
    }

    public String docNameForGithubURL(String url)
    {
        // 20 == ("https://github.com/").length
        // 4 == (".git").length
        url = url.substring(19, url.length() - 4);
        return "RISCOSSPlatformEntities." + encode(url);
    }

    public String titleForGithubURL(String url)
    {
        return encode(url.substring(19, url.length() - 4));
    }
}
