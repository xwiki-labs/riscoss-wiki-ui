XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("scope", props.StaticList.create({
    "prettyName": "Scope",
    "values": "GLOBAL|WIKI|USER|ON_DEMAND"
  }));
});