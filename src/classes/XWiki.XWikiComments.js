XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.setCustomClass("");
  xcl.setCustomMapping("");
  xcl.setDefaultViewSheet("");
  xcl.setDefaultEditSheet("");
  xcl.setDefaultWeb("");
  xcl.setNameField("");
  xcl.setValidationScript("");
  xcl.addProp("author", props.XString.create({
    "prettyName": "Author",
    "size": "30"
  }));
  xcl.addProp("comment", props.TextArea.create({
    "prettyName": "Comment",
    "rows": "5",
    "size": "40"
  }));
  xcl.addProp("date", props.XDate.create({
    "picker": "1",
    "prettyName": "Date",
    "size": "20"
  }));
  xcl.addProp("highlight", props.TextArea.create({
    "prettyName": "Highlighted Text",
    "rows": "2",
    "size": "40"
  }));
  xcl.addProp("originalSelection", props.TextArea.create({
    "prettyName": "Original Selection",
    "rows": "5",
    "size": "40"
  }));
  xcl.addProp("replyto", props.XNumber.create({
    "prettyName": "Reply To",
    "size": "5"
  }));
  xcl.addProp("selection", props.TextArea.create({
    "prettyName": "Selection",
    "rows": "5",
    "size": "40"
  }));
  xcl.addProp("selectionLeftContext", props.TextArea.create({
    "prettyName": "Selection Left Context",
    "rows": "5",
    "size": "40"
  }));
  xcl.addProp("selectionRightContext", props.TextArea.create({
    "prettyName": "Selection Right Context",
    "rows": "5",
    "size": "40"
  }));
  xcl.addProp("state", props.XString.create({
    "prettyName": "State",
    "size": "30"
  }));
  xcl.addProp("target", props.XString.create({
    "prettyName": "Target",
    "size": "30"
  }));
});