XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.setCustomClass("");
  xcl.setCustomMapping("");
  xcl.setDefaultViewSheet("");
  xcl.setDefaultEditSheet("");
  xcl.setDefaultWeb("");
  xcl.setNameField("");
  xcl.setValidationScript("");
  xcl.addProp("defaultRedirect", props.XString.create({
    "picker": "0",
    "prettyName": "Redirect here after registration",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("heading", props.XString.create({
    "picker": "0",
    "prettyName": "Registration page heading",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("liveValidation_defaultFieldOkMessage", props.XString.create({
    "picker": "0",
    "prettyName": "Default field okay message",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("liveValidation_enabled", props.XBoolean.create({
    "defaultValue": "",
    "displayFormType": "checkbox",
    "displayType": "",
    "prettyName": "Enable Javascript field validation",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("loginButton_autoLogin_enabled", props.XBoolean.create({
    "defaultValue": "",
    "displayFormType": "checkbox",
    "displayType": "",
    "prettyName": "Enable automatic login",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("loginButton_enabled", props.XBoolean.create({
    "defaultValue": "",
    "displayFormType": "checkbox",
    "displayType": "",
    "prettyName": "Enable login button",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("registrationSuccessMessage", props.TextArea.create({
    "editor": "PureText",
    "picker": "0",
    "prettyName": "Registration Successful Message",
    "rows": "12",
    "size": "40",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("requireCaptcha", props.XBoolean.create({
    "defaultValue": "",
    "displayFormType": "checkbox",
    "displayType": "",
    "prettyName": "Require captcha to register",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("welcomeMessage", props.TextArea.create({
    "editor": "PureText",
    "picker": "0",
    "prettyName": "Welcome message",
    "rows": "12",
    "size": "40",
    "validationMessage": "",
    "validationRegExp": ""
  }));
});