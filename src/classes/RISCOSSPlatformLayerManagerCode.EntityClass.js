XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("layer", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Layer",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
});
