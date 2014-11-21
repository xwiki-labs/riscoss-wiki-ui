XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("extensionPointId", props.XString.create({
    "prettyName": "Extension Point ID",
    "size": "30"
  }));
  xcl.addProp("name", props.XString.create({
    "prettyName": "Extension ID",
    "size": "30"
  }));
  xcl.addProp("content", props.TextArea.create({
    "prettyName": "Extension Content",
    "rows": "10",
    "size": "40"
  }));
  xcl.addProp("parameters", props.TextArea.create({
    "prettyName": "Extension Parameters",
    "rows": "10",
    "size": "40"
  }));
  xcl.addProp("scope", props.StaticList.create({
    "prettyName": "Extension Scope",
    "values": "wiki=Current Wiki|user=Current User|global=Global"
  }));
});