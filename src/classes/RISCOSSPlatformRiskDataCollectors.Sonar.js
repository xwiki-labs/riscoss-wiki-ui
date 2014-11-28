XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("sonarURI", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Sonar URI",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
});