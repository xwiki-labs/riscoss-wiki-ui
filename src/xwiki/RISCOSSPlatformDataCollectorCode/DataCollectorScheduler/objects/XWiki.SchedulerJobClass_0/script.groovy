/* -*- Mode:Java */
import com.xpn.xwiki.api.Context;
try {
    def dcg = xwiki.parseGroovyFromPage("RISCOSSPlatformDataCollectorCode.DataCollectorGroovy");
    dcg.main(new Context(xcontext), services, xwiki);
} catch (Exception e) { e.printStackTrace(); }
