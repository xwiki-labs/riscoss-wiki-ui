XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("periodicity", props.StaticList.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "periodicity",
    "sort": "none",
    "validationMessage": "",
    "validationRegExp": "",
    "values": "monthly|weekly|daily|hourly|minutely"
  }));
  xcl.addProp("collectorName", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "collectorName",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("timeLastRun", props.XNumber.create({
    "customDisplay": "",
    "numberType": "long",
    "prettyName": "timeLastRun",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
});