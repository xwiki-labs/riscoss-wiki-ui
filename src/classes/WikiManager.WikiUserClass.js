XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("membershipType", props.StaticList.create({
    "displayType": "radio",
    "prettyName": "Membership Type",
    "size": "3",
    "values": "open|request|invite"
  }));
  xcl.addProp("userScope", props.StaticList.create({
    "displayType": "radio",
    "prettyName": "User scope",
    "size": "3",
    "values": "global_only|local_only|local_and_global"
  }));
});
