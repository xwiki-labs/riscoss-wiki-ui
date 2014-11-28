XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.addProp("child", props.DBList.create({
    "classname": "",
    "customDisplay": "{{velocity}}\n#set($propertyClass = $object.getxWikiClass().get($name))\n#if ($type == 'edit')\n  #set($selectName = \"${prefix}${name}\")\n  {{html clean=\"false\" wiki=\"false\"}}\n    <select name=\"$selectName\">\n    #if($!value == \"\")\n      <option value='' selected='selected'>None</option>\n    #else\n      <option value=''>None</option>\n    #end\n    #foreach($key in $propertyClass.getListValues())\n      #set($checked = '')\n      #if($value == $key)\n        #set($checked = \"selected='selected'\")\n      #end\n      <option value=\"$key\" $checked>$key</option>\n    #end\n    </select>\n  {{/html}}\n#else\n  $doc.displayView($propertyClass, $prefix, $object)\n#end\n{{/velocity}}",
    "idField": "",
    "picker": "0",
    "prettyName": "child",
    "relationalStorage": "1",
    "sort": "none",
    "sql": "SELECT doc.fullName FROM XWikiDocument doc, BaseObject obj WHERE doc.fullName = obj.name AND obj.className = 'RISCOSSPlatformLayerManagerCode.LayerClass' AND doc.space = 'RISCOSSPlatformLayers' AND doc.fullName <> '$doc.fullName'",
    "validationMessage": "",
    "validationRegExp": "",
    "valueField": ""
  }));
});