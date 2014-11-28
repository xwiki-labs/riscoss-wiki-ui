XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("name", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Name",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
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
  xcl.addProp("website", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Web site",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
});