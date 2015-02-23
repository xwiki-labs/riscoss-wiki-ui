XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("command", props.XString.create({
    "prettyName": "Evaluator execution command",
  }));
});
