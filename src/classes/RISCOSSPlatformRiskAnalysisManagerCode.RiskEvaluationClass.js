XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("inputData", props.TextArea.create({
    "customDisplay": "",
    "editor": "---",
    "picker": "0",
    "prettyName": "inputData",
    "rows": "5",
    "size": "40",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("result", props.TextArea.create({
    "customDisplay": "",
    "editor": "---",
    "picker": "0",
    "prettyName": "result",
    "rows": "5",
    "size": "40",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("rawOutput", props.TextArea.create({
    "customDisplay": "",
    "editor": "---",
    "picker": "0",
    "prettyName": "result",
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
    "prettyName": "riskConfiguration",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
});
