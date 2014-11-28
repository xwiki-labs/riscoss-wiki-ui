XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("action", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Action",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
});