/* -*- Mode:Java */
import java.util.regex.Pattern;

public class CreateFromGithubGroovy
{
    private final Pattern regex = Pattern.compile('^https://github.com/[a-zA-Z0-9_\\.-]+/[a-zA-Z0-9_\\.-]+\\.git$');

    public boolean isOkGithubURL(String url)
    {
        return regex.matcher(url).matches();
    }

    public String docNameForGithubURL(String url)
    {
        // 20 == ("https://github.com/").length
        // 4 == (".git").length
        url = url.substring(19, url.length() - 4);
        return "RISCOSSPlatformEntities." + url.replaceAll("[^a-zA-Z0-9_-]", "_");
    }

    public String titleForGithubURL(String url)
    {
        url = url.substring(19, url.length() - 4);
        return url.replaceAll("[^a-zA-Z0-9_\\-\\/]", "_");
    }
}
