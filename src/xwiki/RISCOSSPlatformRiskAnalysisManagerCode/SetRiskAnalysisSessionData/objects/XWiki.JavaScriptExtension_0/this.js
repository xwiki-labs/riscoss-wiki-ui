XWikiObj(function (obj) {
    obj.setCache("forbid");
    obj.setCode("var XWiki = (function(XWiki) {  \n  function init() {    \n    var targetEntity = $('targetEntity');\n    var entitySuggest = new XWiki.widgets.Suggest(targetEntity, {script:'$xwiki.getURL(\"RISCOSSPlatformLayerManagerCode.SuggestEntities\", \"get\", \"outputSyntax=plain&\")', varname:\"entityName\"})\n    \n    var riskConfigurations = $('riskConfigurations');\n    var riskConfigurationSuggest = new XWiki.widgets.Suggest(riskConfigurations, {script:'$xwiki.getURL(\"RISCOSSPlatformRiskConfigurationManagerCode.SuggestRiskConfigurations\", \"get\", \"outputSyntax=plain&\")', varname:\"riskConfigurationName\"})\n    new XWiki.widgets.SuggestPicker(riskConfigurations, riskConfigurationSuggest)\n  }\n  \n  //Wait for dom load\n  (XWiki.domIsLoaded && init()) || document.observe(\"xwiki:dom:loaded\", init);\n   \n  //End XWiki augmentation\n  return XWiki;\n}(XWiki || {}))");
    obj.setName("");
    obj.setParse("1");
    obj.setUse("currentPage");
});
