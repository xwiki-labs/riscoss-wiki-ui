XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("rdr", props.XString.create({
    "prettyName": "Risk Data Repository URL",
  }));
  xcl.addProp("feedbackURL", props.XString.create({
    "prettyName": "Optional User Feedback URL",
  }));
  xcl.addProp("expertFeedbackURL", props.XString.create({
    "prettyName": "Optional Expert Assessment URL",
  }));
});
