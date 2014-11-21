XWikiObj(function (obj) {
    obj.setContent("{{menu type=\"horizontal fixedWidth\"}}{{include reference=\"RISCOSSPlatformCode.NavigationMenu\" /}}{{/menu}}");
    obj.setExtensionPointId("org.xwiki.platform.template.header.after");
    obj.setName("RISCOSSPlatformCode.NavigationMenu");
    obj.setParameters("");
    obj.setScope("wiki");
});
