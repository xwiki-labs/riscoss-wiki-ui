XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.setCustomClass("");
  xcl.setCustomMapping("");
  xcl.setDefaultViewSheet("");
  xcl.setDefaultEditSheet("");
  xcl.setDefaultWeb("");
  xcl.setNameField("");
  xcl.setValidationScript("");
  xcl.addProp("limesurveyPass", props.Password.create({
    "algorithm": "",
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Password",
    "size": "30",
    "storageType": "Clear",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("limesurveyUser", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Username",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("surveyBaseURL", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "LimeSurvey Connection URL",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
});