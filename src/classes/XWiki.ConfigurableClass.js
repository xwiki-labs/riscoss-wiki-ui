XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.setCustomClass("");
  xcl.setCustomMapping("");
  xcl.setDefaultViewSheet("");
  xcl.setDefaultEditSheet("");
  xcl.setDefaultWeb("");
  xcl.setNameField("");
  xcl.setValidationScript("");
  xcl.addProp("codeToExecute", props.TextArea.create({
    "editor": "---",
    "picker": "0",
    "prettyName": "codeToExecute",
    "rows": "5",
    "size": "40",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("configurationClass", props.XString.create({
    "picker": "0",
    "prettyName": "configurationClass",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("configureGlobally", props.XBoolean.create({
    "defaultValue": "",
    "displayFormType": "checkbox",
    "displayType": "",
    "prettyName": "configureGlobally",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("displayInSection", props.XString.create({
    "picker": "0",
    "prettyName": "displayInSection",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("heading", props.XString.create({
    "picker": "0",
    "prettyName": "heading",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("iconAttachment", props.XString.create({
    "picker": "0",
    "prettyName": "iconAttachment",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("linkPrefix", props.XString.create({
    "picker": "0",
    "prettyName": "linkPrefix",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("propertiesToShow", props.StaticList.create({
    "displayType": "input",
    "multiSelect": "1",
    "picker": "0",
    "prettyName": "propertiesToShow",
    "relationalStorage": "1",
    "size": "20",
    "sort": "none",
    "validationMessage": "",
    "validationRegExp": ""
  }));
});