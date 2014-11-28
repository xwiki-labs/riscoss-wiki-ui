XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("level", props.StaticList.create({
    "picker": "0",
    "prettyName": "level",
    "sort": "none",
    "validationMessage": "",
    "validationRegExp": "",
    "values": "edit|programming"
  }));
});