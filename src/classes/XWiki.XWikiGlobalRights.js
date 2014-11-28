XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("groups", props.Groups.create({
    "displayType": "input",
    "multiSelect": "1",
    "picker": "1",
    "prettyName": "Groups",
    "size": "5"
  }));
  xcl.addProp("levels", props.Levels.create({
    "multiSelect": "1",
    "prettyName": "Levels",
    "size": "3"
  }));
  xcl.addProp("users", props.Users.create({
    "displayType": "input",
    "multiSelect": "1",
    "picker": "1",
    "prettyName": "Users",
    "size": "5"
  }));
  xcl.addProp("allow", props.XBoolean.create({
    "defaultValue": "1",
    "displayType": "allow",
    "prettyName": "Allow/Deny"
  }));
});