XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("targetFossology", props.XString.create({
    "prettyName": "Fossology Target URL",
  }));
});
