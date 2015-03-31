XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.setCustomClass("");
  xcl.setCustomMapping("");
  xcl.setDefaultViewSheet("");
  xcl.setDefaultEditSheet("");
  xcl.setDefaultWeb("");
  xcl.setNameField("");
  xcl.setValidationScript("");
  xcl.addProp("action", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Action",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
});