XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.setCustomClass("");
  xcl.setCustomMapping("");
  xcl.setDefaultViewSheet("");
  xcl.setDefaultEditSheet("");
  xcl.setDefaultWeb("");
  xcl.setNameField("");
  xcl.setValidationScript("");
  xcl.addProp("entity", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "entity",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
});