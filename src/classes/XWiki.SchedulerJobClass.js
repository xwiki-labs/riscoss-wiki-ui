XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("jobName", props.XString.create({
    "prettyName": "Job Name",
    "size": "60"
  }));
  xcl.addProp("jobDescription", props.TextArea.create({
    "prettyName": "Job Description",
    "rows": "10",
    "size": "45"
  }));
  xcl.addProp("jobClass", props.XString.create({
    "prettyName": "Job Class",
    "size": "60"
  }));
  xcl.addProp("status", props.XString.create({
    "prettyName": "Status",
    "size": "30"
  }));
  xcl.addProp("cron", props.XString.create({
    "prettyName": "Cron Expression",
    "size": "30"
  }));
  xcl.addProp("script", props.TextArea.create({
    "editor": "PureText",
    "prettyName": "Job Script",
    "rows": "10",
    "size": "60"
  }));
  xcl.addProp("contextUser", props.XString.create({
    "prettyName": "Job execution context user",
    "size": "30"
  }));
  xcl.addProp("contextLang", props.XString.create({
    "prettyName": "Job execution context lang",
    "size": "30"
  }));
  xcl.addProp("contextDatabase", props.XString.create({
    "prettyName": "Job execution context database",
    "size": "30"
  }));
});