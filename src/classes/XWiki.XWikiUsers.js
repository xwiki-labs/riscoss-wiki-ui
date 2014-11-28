XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.setCustomClass("");
  xcl.setCustomMapping("");
  xcl.setDefaultViewSheet("");
  xcl.setDefaultEditSheet("");
  xcl.setDefaultWeb("");
  xcl.setNameField("");
  xcl.setValidationScript("");
  xcl.addProp("accessibility", props.XBoolean.create({
    "prettyName": "Enable extra accessibility features"
  }));
  xcl.addProp("active", props.XBoolean.create({
    "displayType": "active",
    "prettyName": "Active"
  }));
  xcl.addProp("address", props.TextArea.create({
    "prettyName": "Address",
    "rows": "3",
    "size": "40"
  }));
  xcl.addProp("avatar", props.XString.create({
    "prettyName": "Avatar",
    "size": "30"
  }));
  xcl.addProp("blog", props.XString.create({
    "prettyName": "Blog",
    "size": "60"
  }));
  xcl.addProp("blogfeed", props.XString.create({
    "prettyName": "Blog Feed",
    "size": "60"
  }));
  xcl.addProp("comment", props.TextArea.create({
    "prettyName": "Comment",
    "rows": "5",
    "size": "40"
  }));
  xcl.addProp("company", props.XString.create({
    "prettyName": "Company",
    "size": "30"
  }));
  xcl.addProp("default_language", props.XString.create({
    "prettyName": "Default Language",
    "size": "30"
  }));
  xcl.addProp("displayHiddenDocuments", props.XBoolean.create({
    "prettyName": "Display Hidden Documents"
  }));
  xcl.addProp("editor", props.StaticList.create({
    "prettyName": "Default Editor",
    "values": "---|Text|Wysiwyg"
  }));
  xcl.addProp("email", props.Email.create({
    "prettyName": "e-Mail",
    "size": "30",
    "validationRegExp": "/^(([^@\\s]+)@((?:[-a-zA-Z0-9]+\\.)+[a-zA-Z]{2,}))?$/"
  }));
  xcl.addProp("first_name", props.XString.create({
    "prettyName": "First Name",
    "size": "30"
  }));
  xcl.addProp("imaccount", props.XString.create({
    "prettyName": "imaccount",
    "size": "30"
  }));
  xcl.addProp("imtype", props.StaticList.create({
    "prettyName": "IM Type",
    "values": "---|AIM|Yahoo|Jabber|MSN|Skype|ICQ"
  }));
  xcl.addProp("last_name", props.XString.create({
    "prettyName": "Last Name",
    "size": "30"
  }));
  xcl.addProp("password", props.Password.create({
    "prettyName": "Password",
    "size": "10"
  }));
  xcl.addProp("phone", props.XString.create({
    "prettyName": "Phone",
    "size": "30"
  }));
  xcl.addProp("skin", props.XString.create({
    "prettyName": "skin",
    "size": "30"
  }));
  xcl.addProp("timezone", props.XString.create({
    "customDisplay": "{{velocity}}\n#if ($xcontext.action == 'inline' || $xcontext.action == 'edit')\n  {{html}}\n    #if($xwiki.jodatime)\n      <select id='$prefix$name' name='$prefix$name'>\n        <option value=\"\" #if($value == $tz)selected=\"selected\"#end>$services.localization.render('XWiki.XWikiPreferences_timezone_default')</option>\n        #foreach($tz in $xwiki.jodatime.getServerTimezone().getAvailableIDs())\n          <option value=\"$tz\" #if($value == $tz)selected=\"selected\"#end>$tz</option>\n        #end\n      </select>\n    #else\n      <input id='$prefix$name' name='$prefix$name' type=\"text\" value=\"$!value\"/>\n    #end\n  {{/html}}\n#else\n  $!value\n#end\n{{/velocity}}\n",
    "prettyName": "Timezone",
    "size": "30"
  }));
  xcl.addProp("usertype", props.StaticList.create({
    "prettyName": "User type",
    "values": "Simple|Advanced"
  }));
  xcl.addProp("validkey", props.Password.create({
    "prettyName": "Validation Key",
    "size": "10"
  }));
});