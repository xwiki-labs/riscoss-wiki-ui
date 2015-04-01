XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.setCustomClass("");
  xcl.setCustomMapping("");
  xcl.setDefaultViewSheet("");
  xcl.setDefaultEditSheet("");
  xcl.setDefaultWeb("");
  xcl.setNameField("");
  xcl.setValidationScript("");
  xcl.addProp("expertFeedbackURL", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Optional Expert Assessment URL",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("feedbackURL", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Optional User Feedback URL",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("oauthPublicKey", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "OauthPublicKey",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("rdr", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Risk Data Repository URL",
    "validationMessage": "",
    "validationRegExp": ""
  }));
});