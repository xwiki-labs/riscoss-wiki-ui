XWikiObj(function (obj) {
    obj.setCache("forbid");
    obj.setCode("var XWiki = (function(XWiki) {\n  function init() {\n    var sections = $('palette').down('ul').children;\n    sections[2].setStyle({display: 'none'});\n    sections[3].setStyle({display: 'none'});\n    var pickers = sections[1].down('ul').children;\n    pickers[2].setStyle({display: 'none'});\n\n    var options = $('options');\n    if(options) {\n      options.setStyle({display: 'none'});\n      $('updateClassSheet').checked = false;\n      $('updateClassTranslations').checked = false;\n    }\n  }\n\n  //Wait for dom load\n  (XWiki.domIsLoaded && init()) || document.observe('xwiki:dom:loaded', init);\n\n  //End XWiki augmentation\n  return XWiki;\n} (XWiki || {}))");
    obj.setParse(0);
    obj.setUse("onDemand");
});
