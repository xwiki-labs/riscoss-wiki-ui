XWikiObj(function (obj) {
    obj.setCode("{{velocity}}\n#set ($id = $xcontext.macro.params.id)\n#set ($type = $xcontext.macro.params.type)\n#set ($colorTheme = $xwiki.getUserPreference('colorTheme'))\n#if (\"$!colorTheme\" != '')\n  ## Make sure we use an absolute reference (see XWIKI-9672)\n  #set ($colorTheme = $services.model.resolveDocument($colorTheme, $doc.documentReference))\n#end\n#set ($discard = $xwiki.ssx.use(\"$xcontext.macro.doc.prefixedFullName\", {'colorTheme': $colorTheme}))\n#set ($discard = $xwiki.jsx.use(\"$xcontext.macro.doc.prefixedFullName\"))\n(% #if (\"$!id\" != '') id=\"$id\"#end class=\"menu menu-$!type\" %)(((\n  $xcontext.macro.content\n)))\n{{/velocity}}");
    obj.setContentDescription("Define the menu structure using wiki syntax. Each menu item should be a list item and should contain the menu item label or link. You can use nested lists for sub-menu items.");
    obj.setContentType("Mandatory");
    obj.setDefaultCategory("Navigation");
    obj.setDescription("Displays a menu created using simple wiki syntax (nested lists and links).");
    obj.setId("menu");
    obj.setName("Menu");
    obj.setSupportsInlineMode("0");
    obj.setVisibility("Global");
});
