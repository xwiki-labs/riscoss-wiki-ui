XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.setCustomClass("");
  xcl.setCustomMapping("internal");
  xcl.setDefaultViewSheet("");
  xcl.setDefaultEditSheet("");
  xcl.setDefaultWeb("");
  xcl.setNameField("");
  xcl.setValidationScript("");
  xcl.addProp("accessibility", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "0",
    "displayType": "",
    "prettyName": "Enable extra accessibility features",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("admin_email", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Admin eMail",
    "size": "30",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("auth_active_check", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "",
    "prettyName": "Authentication Active Check",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("authenticate_edit", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "",
    "prettyName": "Authenticate On Edit",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("authenticate_view", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "",
    "prettyName": "Authenticated View",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("backlinks", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "",
    "prettyName": "Backlinks",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("colorTheme", props.DBList.create({
    "classname": "",
    "customDisplay": "{{velocity}}\n{{html wiki=\"false\" clean=\"false\"}}\n#if (\"$!value\" == '')\n  #set ($value = '')\n#end\n<select name=\"${object.getxWikiClass().name}_${object.number}_${name}\" id=\"${object.getxWikiClass().name}_${object.number}_${name}\">\n  #if ($editor != 'globaladmin')<option value=\"\"#if ($value == '') selected=\"selected\"#end>---</option>#end\n#foreach($theme in $xwiki.wrapDocs($services.query.hql(\", BaseObject as theme where doc.fullName=theme.name and theme.className='ColorThemes.ColorThemeClass' and doc.fullName<>'ColorThemes.ColorThemeTemplate' order by doc.title\").execute()))\n  <option value=\"$theme.fullName\"#if ($theme.fullName.equals($value)) selected=\"selected\"#end>$theme.plainTitle</option>\n#end\n</select>\n{{/html}}\n{{/velocity}}",
    "idField": "",
    "picker": "0",
    "prettyName": "Color theme",
    "sort": "none",
    "sql": "select doc.fullName, doc.title from XWikiDocument as doc, BaseObject as theme where doc.fullName=theme.name and theme.className='ColorThemes.ColorThemeClass' and doc.fullName<>'ColorThemes.ColorThemeTemplate'",
    "validationMessage": "",
    "validationRegExp": "",
    "valueField": ""
  }));
  xcl.addProp("comment_anonymous", props.StaticList.create({
    "customDisplay": "",
    "picker": "1",
    "prettyName": "Anonymous",
    "sort": "none",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": "",
    "values": "---|Image|Text"
  }));
  xcl.addProp("comment_registered", props.StaticList.create({
    "customDisplay": "",
    "picker": "1",
    "prettyName": "Registered",
    "sort": "none",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": "",
    "values": "---|Image|Text"
  }));
  xcl.addProp("confirmation_email_content", props.TextArea.create({
    "contenttype": "FullyRenderedText",
    "customDisplay": "",
    "editor": "---",
    "picker": "0",
    "prettyName": "Confirmation eMail Content",
    "rows": "10",
    "size": "72",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("core.defaultDocumentSyntax", props.XString.create({
    "customDisplay": "{{velocity}}\n{{html wiki=\"false\" clean=\"false\"}}\n#if (\"$!value\" == '')\n  #set ($value = $xwiki.getDefaultDocumentSyntax())\n#end\n<select name=\"${object.getxWikiClass().name}_${object.number}_${name}\" id=\"${object.getxWikiClass().name}_${object.number}_${name}\">\n#set ($configuredSyntaxes = $xwiki.getConfiguredSyntaxes())\n#set ($availableParserSyntaxes = $services.rendering.getAvailableParserSyntaxes())\n##\n#foreach($syntax in $availableParserSyntaxes)\n  #if($configuredSyntaxes.contains($syntax.toIdString()))\n    <option value=\"$syntax.toIdString()\"#if($syntax.toIdString().equalsIgnoreCase($value)) selected=\"selected\"#end>$syntax.toString()</option>\n  #end\n#end\n</select>\n{{/html}}\n{{/velocity}}",
    "picker": "0",
    "prettyName": "Default document syntax",
    "size": "60",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("dateformat", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Date Format",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("default_language", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Default Language",
    "size": "5",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("documentBundles", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Internationalization Document Bundles",
    "size": "60",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("edit_anonymous", props.StaticList.create({
    "customDisplay": "",
    "picker": "1",
    "prettyName": "Anonymous",
    "sort": "none",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": "",
    "values": "---|Image|Text"
  }));
  xcl.addProp("edit_registered", props.StaticList.create({
    "customDisplay": "",
    "picker": "1",
    "prettyName": "Registered",
    "sort": "none",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": "",
    "values": "---|Image|Text"
  }));
  xcl.addProp("editcomment", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "",
    "displayType": "",
    "prettyName": "Enable version summary",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("editcomment_mandatory", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "",
    "displayType": "",
    "prettyName": "Make version summary mandatory",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("editor", props.StaticList.create({
    "customDisplay": "",
    "picker": "1",
    "prettyName": "Default Editor",
    "sort": "none",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": "",
    "values": "Text|Wysiwyg"
  }));
  xcl.addProp("guest_comment_requires_captcha", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "",
    "displayType": "",
    "prettyName": "Enable CAPTCHA in Comments for Unregistered Users",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("invitation_email_content", props.TextArea.create({
    "contenttype": "FullyRenderedText",
    "customDisplay": "",
    "editor": "---",
    "picker": "0",
    "prettyName": "Invitation eMail Content",
    "rows": "10",
    "size": "72",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("javamail_extra_props", props.TextArea.create({
    "customDisplay": "",
    "editor": "---",
    "picker": "0",
    "prettyName": "Additional JavaMail properties",
    "rows": "6",
    "size": "60",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("languages", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Supported languages",
    "size": "30",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("ldap", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "",
    "prettyName": "Ldap",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("ldap_UID_attr", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Ldap UID attribute name",
    "size": "60",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("ldap_base_DN", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Ldap base DN",
    "size": "60",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("ldap_bind_DN", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Ldap login matching",
    "size": "60",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("ldap_bind_pass", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Ldap password matching",
    "size": "60",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("ldap_exclude_group", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Ldap group to exclude",
    "size": "60",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("ldap_fields_mapping", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Ldap user fields mapping",
    "size": "60",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("ldap_group_mapping", props.TextArea.create({
    "customDisplay": "",
    "editor": "---",
    "picker": "0",
    "prettyName": "Ldap groups mapping",
    "rows": "5",
    "size": "60",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("ldap_groupcache_expiration", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "LDAP groups members cache",
    "size": "60",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("ldap_mode_group_sync", props.StaticList.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "LDAP groups sync mode",
    "sort": "none",
    "validationMessage": "",
    "validationRegExp": "",
    "values": "|always|create"
  }));
  xcl.addProp("ldap_port", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Ldap server port",
    "size": "60",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("ldap_server", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Ldap server address",
    "size": "60",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("ldap_trylocal", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "",
    "prettyName": "Try local login",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("ldap_update_user", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "",
    "prettyName": "Update user from LDAP",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("ldap_user_group", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Ldap group filter",
    "size": "60",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("ldap_validate_password", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "",
    "prettyName": "Validate Ldap user/password",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("leftPanels", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Panels displayed on the left",
    "size": "60",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("meta", props.TextArea.create({
    "contenttype": "FullyRenderedText",
    "customDisplay": "",
    "editor": "---",
    "picker": "0",
    "prettyName": "HTTP Meta Info",
    "rows": "5",
    "size": "40",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("minoredit", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "",
    "displayType": "",
    "prettyName": "Enable minor edits",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("multilingual", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "",
    "prettyName": "Multi-Lingual",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("obfuscateEmailAddresses", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "0",
    "displayType": "",
    "prettyName": "Obfuscate Email Addresses",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("parent", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Parent Space",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("plugins", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Plugins",
    "size": "40",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("registration_anonymous", props.StaticList.create({
    "customDisplay": "",
    "picker": "1",
    "prettyName": "Anonymous",
    "sort": "none",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": "",
    "values": "---|Image|Text"
  }));
  xcl.addProp("registration_registered", props.StaticList.create({
    "customDisplay": "",
    "picker": "1",
    "prettyName": "Registered",
    "sort": "none",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": "",
    "values": "---|Image|Text"
  }));
  xcl.addProp("rightPanels", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Panels displayed on the right",
    "size": "60",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("showLeftPanels", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "",
    "prettyName": "Display the left panel column",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("showRightPanels", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "",
    "prettyName": "Display the right panel column",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("showannotations", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "",
    "displayType": "",
    "prettyName": "Show document annotations",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("showattachments", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "",
    "displayType": "",
    "prettyName": "Show document attachments",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("showcomments", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "",
    "displayType": "",
    "prettyName": "Show document comments",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("showhistory", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "",
    "displayType": "",
    "prettyName": "Show document history",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("showinformation", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "",
    "displayType": "",
    "prettyName": "Show document information",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("skin", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Skin",
    "size": "20",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("smtp_port", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "SMTP Port",
    "size": "5",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("smtp_server", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "SMTP Server",
    "size": "30",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("smtp_server_password", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Server password (optional)",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("smtp_server_username", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Server username (optional)",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("stylesheet", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Stylesheet",
    "size": "30",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("stylesheets", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Stylesheets",
    "size": "30",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("tags", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "",
    "prettyName": "Activate the tagging",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("timezone", props.XString.create({
    "customDisplay": "{{velocity}}\n      #if ($xcontext.action == 'admin' || $xcontext.action == 'edit' || $xcontext.action == 'inline')\n        {{html}}\n          #if($xwiki.jodatime)\n            <select id='$prefix$name' name='$prefix$name'>\n              <option value=\"\" #if($value == $tz)selected=\"selected\"#end>$services.localization.render('XWiki.XWikiPreferences_timezone_default')</option>\n              #foreach($tz in $xwiki.jodatime.getServerTimezone().getAvailableIDs())\n                <option value=\"$tz\" #if($value == $tz)selected=\"selected\"#end>$tz</option>\n              #end\n            </select>\n          #else\n            <input id='$prefix$name' name='$prefix$name' type=\"text\" value=\"$!value\"/>\n          #end\n        {{/html}}\n      #else\n        $value\n      #end\n      {{/velocity}}",
    "picker": "0",
    "prettyName": "Timezone",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("title", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Title",
    "size": "30",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("upload_maxsize", props.XNumber.create({
    "customDisplay": "",
    "numberType": "long",
    "prettyName": "Maximum Upload Size",
    "size": "5",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("use_email_verification", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "",
    "prettyName": "Use eMail Verification",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("validation_email_content", props.TextArea.create({
    "contenttype": "FullyRenderedText",
    "customDisplay": "",
    "editor": "---",
    "picker": "0",
    "prettyName": "Validation eMail Content",
    "rows": "10",
    "size": "72",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("version", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Version",
    "size": "30",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("webcopyright", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Web Copyright",
    "size": "60",
    "tooltip": "",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("xwiki.title.mandatory", props.XBoolean.create({
    "customDisplay": "",
    "defaultValue": "",
    "displayType": "",
    "prettyName": "Make document title field mandatory",
    "validationMessage": "",
    "validationRegExp": ""
  }));
});