XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.setCustomClass("");
  xcl.setCustomMapping("");
  xcl.setDefaultViewSheet("");
  xcl.setDefaultEditSheet("");
  xcl.setDefaultWeb("");
  xcl.setNameField("");
  xcl.setValidationScript("");
  xcl.addProp("automaticwatch", props.StaticList.create({
    "prettyName": "Automatic watching",
    "values": "default|NONE|ALL|MAJOR|NEW"
  }));
  xcl.addProp("documents", props.TextArea.create({
    "prettyName": "Document list",
    "rows": "5",
    "size": "80"
  }));
  xcl.addProp("interval", props.StaticList.create({
    "prettyName": "Email notifications interval",
    "values": "Scheduler.WatchListDailyNotifier|Scheduler.WatchListHourlyNotifier|Scheduler.WatchListWeeklyNotifier"
  }));
  xcl.addProp("spaces", props.TextArea.create({
    "prettyName": "Space list",
    "rows": "5",
    "size": "80"
  }));
  xcl.addProp("users", props.TextArea.create({
    "prettyName": "User list",
    "rows": "5",
    "size": "80"
  }));
  xcl.addProp("wikis", props.TextArea.create({
    "prettyName": "Wiki list",
    "rows": "5",
    "size": "80"
  }));
});