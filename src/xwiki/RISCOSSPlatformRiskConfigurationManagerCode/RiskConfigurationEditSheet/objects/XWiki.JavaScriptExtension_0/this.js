XWikiObj(function (obj) {
    obj.setCache("forbid");
    obj.setCode("var XWiki = (function(XWiki) {\n  var bindFileUploader = function(input, responseContainer) {    \n    new XWiki.FileUploader(input, {\n      autoUpload: true,\n      progressAutohide: true,\n      targetURL: $('uploadTargetURL').value, //We use this because if we do $doc.getURL here we get the URL of the sheet. So the upload URL must be generated in the parsed sheet content and passed to this script.\n      responseURL: XWiki.currentDocument.getURL('get', 'xpage=attachmentslist'),\n      responseContainer: responseContainer\n    });\n  }  \n  \n  function init() {    \n    var fileInputs = $$('input[type=\"file\"]');\n    for(i = 0; i < fileInputs.length; i++) {           \n      bindFileUploader(fileInputs[i], $('invisiblediv'));\n    }\n    \n    var nextRiskModelObjectNumber = parseInt($(\"nextRiskModelObjectNumber\").value);\n    \n    document.observe('xwiki:html5upload:message', function(e) {\n      if(\"UPLOAD_FINISHED\" == e.memo.content) {\n        var layer = e.srcElement.getAttribute(\"layer\");\n        var modelsDiv = $(\"riskModels:\" + layer);\n        \n        var div = document.createElement(\"div\");\n        var text = document.createTextNode(e.memo.parameters.name);\n        div.appendChild(text);\n        var input = document.createElement(\"input\");\n        input.type = \"hidden\";        \n        input.name = \"RISCOSSPlatformRiskConfigurationManagerCode.RiskModelClass_\" + nextRiskModelObjectNumber + \"_data\";\n        input.value = e.memo.parameters.name;        \n        div.appendChild(input);\n        input = document.createElement(\"input\");\n        input.name = \"RISCOSSPlatformRiskConfigurationManagerCode.RiskModelClass_\" + nextRiskModelObjectNumber + \"_layer\";        \n        input.type = \"hidden\";\n        input.value = layer;\n        div.appendChild(input);\n        \n        nextRiskModelObjectNumber++;\n        \n        modelsDiv.appendChild(div);\n      }\n    });\n  }\n  \n  //Wait for dom load\n  (XWiki.domIsLoaded && init()) || document.observe('xwiki:dom:loaded', init);\n\n  //End XWiki augmentation\n  return XWiki;\n} (XWiki || {}))");
    obj.setName("");
    obj.setParse("1");
    obj.setUse("onDemand");
});
