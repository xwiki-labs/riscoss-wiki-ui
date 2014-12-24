XWikiObj(function (obj) {
    obj.setCache("forbid");
    obj.setCode("var XWiki = (function(XWiki) {    \n  \n  function init() {\n    var liveTable = $('riskModels');\n    liveTable.on('click', function(e) {\n      if(e.srcElement.localName == 'a') {\n        e.stop();\n        \n        //Dirty hack to retrieve the risk model document name from the URI pointed by the link\n        var components = e.srcElement.href.split('/');\n        var space = components[components.length - 2];\n        var page = components[components.length - 1];\n        var riskModel = space + \".\" + page;\n        \n        $('riskModelInput').value = riskModel.replace(/\\+/g, ' ');\n        \n        $('addRiskModelForm').submit();                                        \n      }                  \n    });\n    \n  }\n  \n  //Wait for dom load\n  (XWiki.domIsLoaded && init()) || document.observe(\"xwiki:dom:loaded\", init);\n   \n  //End XWiki augmentation\n  return XWiki;\n}(XWiki || {}))");
    obj.setName("");
    obj.setParse(false);
    obj.setUse("currentPage");
});
