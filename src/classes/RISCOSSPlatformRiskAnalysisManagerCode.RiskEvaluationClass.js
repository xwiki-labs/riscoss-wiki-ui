XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("inputData", props.TextArea.create({
    "customDisplay": "",
    "editor": "---",
    "picker": "0",
    "prettyName": "Engine Input Data",
    "rows": "5",
    "size": "40",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("result", props.TextArea.create({
    "customDisplay": "",
    "editor": "---",
    "picker": "0",
    "prettyName": "Engine Result",
    "rows": "5",
    "size": "40",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("rawOutput", props.TextArea.create({
    "customDisplay": "",
    "editor": "---",
    "picker": "0",
    "prettyName": "Engine Raw Output",
    "rows": "5",
    "size": "40",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("interpretedInput", props.TextArea.create({
    "customDisplay": "",
    "editor": "---",
    "picker": "0",
    "prettyName": "Interpreted Input",
    "rows": "5",
    "size": "40",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("timeLastRun", props.XNumber.create({
    "numberType": "long",
    "prettyName": "Time Last Evaluated",
  }));
  xcl.addProp("riskConfiguration", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Risk Configuration (models)",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("entity", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Entity",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("useCase", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Use Case",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
});
