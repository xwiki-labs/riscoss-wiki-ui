var XWiki = require("xwiki-tools");
var props = XWiki.model.properties;
var obj = XWiki.model.BaseObj.create("RISCOSSPlatformDataCollectorCode.DataCollectorClass");

obj.addProp("command", props.TextArea.create({
  "customDisplay": "",
  "editor": "---",
  "picker": "0",
  "prettyName": "Command",
  "rows": "5",
  "size": "40",
  "validationMessage": "",
  "validationRegExp": ""
}));

module.exports.create = function () {
  return obj.instance();
};


XWikiDoc(function (doc) {
    doc.json.xwikidoc['class'] = obj.instance().json['class'];
});
