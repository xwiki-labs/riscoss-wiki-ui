XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("JIRA_URL", props.XString.create({
    "prettyName": "JIRA Server URI",
  }));
  xcl.addProp("JIRA_Project", props.XString.create({
    "prettyName": "Jira Entity Name",
  }));
  xcl.addProp("JIRA_AnonymousAuthentication", props.XBoolean.create({
    "prettyName": "Use Anonymous Mode",
  }));
  xcl.addProp("JIRA_Username", props.XString.create({
    "prettyName": "Username",
  }));
  xcl.addProp("JIRA_Password", props.XString.create({
    "prettyName": "Password",
  }));
  xcl.addProp("JIRA_InitialDate", props.XString.create({
    "prettyName": "Initial Date",
  }));
});
