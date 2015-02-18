XWikiObj(function (obj) {
    obj.setContextLang("en");
    obj.setContextUser("xwiki:XWiki.Admin");
    obj.setCron("0 0/5 * * * ?");
    obj.setJobClass("com.xpn.xwiki.plugin.scheduler.GroovyJob");
    obj.setJobDescription("The schedule which is used to invoke data collectors for all RISCOSS entities.");
    obj.setJobName("Data Collector Schedule");
    obj.setStatus("Normal");
});
