XWikiObj(function (obj) {
    obj.setCache("long");
    obj.setCode("var XWiki = (function(XWiki) {\n  function init() {\n    var inputs = $('inline').getElementsByTagName('input');\n    for(var i = 0; i < inputs.length; i++) { \n      if(inputs[i].type == 'text') { \n        inputs[i].setStyle({width: '100%'}); \n      }\n    }\n\n    var textareas = $('inline').getElementsByTagName('textarea');\n    for(var i = 0; i < textareas.length; i++) { \n      if(textareas[i].type == 'textarea') { \n        textareas[i].setStyle({width: '100%'}); \n      }\n    }\n  }\n  \n  //Wait for dom load\n  (XWiki.domIsLoaded && init()) || document.observe(\"xwiki:dom:loaded\", init);\n   \n  //End XWiki augmentation\n  return XWiki;\n}(XWiki || {}))");
    obj.setParse(false);
    obj.setUse("currentPage");
});
