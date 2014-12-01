XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("rdr", props.XString.create({
    "prettyName": "Risk Data Repository URL",
  }));
});
