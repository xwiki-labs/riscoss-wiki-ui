XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("description", props.TextArea.create({
    "customDisplay": "",
    "editor": "---",
    "picker": "0",
    "prettyName": "Description",
    "rows": "5",
    "size": "40",
    "validationMessage": "",
    "validationRegExp": ""
  }));
});
