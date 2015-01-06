XClass(function (xcl, XWiki) {
  var props = XWiki.model.properties;
  xcl.setCustomClass("");
  xcl.setCustomMapping("");
  xcl.setDefaultViewSheet("");
  xcl.setDefaultEditSheet("");
  xcl.setDefaultWeb("");
  xcl.setNameField("");
  xcl.setValidationScript("");
  xcl.addProp("backgroundSecondaryColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Secondary background color (table headers, message boxes, administration boxes)",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("borderColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Border color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("buttonPrimaryBackgroundColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Primary action button background color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("buttonPrimaryGradientColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Primary action button gradient color",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("buttonPrimaryTextColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Primary action button text color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("buttonSecondaryBackgroundColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Secondary action button background color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("buttonSecondaryGradientColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Secondary action button gradient color",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("buttonSecondaryTextColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Secondary action button text color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("fieldGradientColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Field gradient color (for form elements: input, select, textarea, etc.)",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("headerBackgroundImage", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Banner (header image - the name of an image attached to the theme document)",
    "size": "15",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("headerBackgroundPosition", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Banner position and repeat (CSS syntax, for example: \"left center no-repeat\")",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("highlightColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Background color for highlighted elements",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("linkColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Link color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("logoImage", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Logo (image displayed at the top left corner of the header - the name of an image attached to the theme document; if set, it has priority over the logo configured in the skin and the default logo)",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("menuAddEntryBackgroundColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Add menu entry background color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("menuAddEntryLinkColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Add menu entry link color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("menuBackgroundColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Menu background color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("menuContentBackgroundColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Content menu background color",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("menuContentGradientColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Content menu gradient color",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("menuContentLinkColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Content menu text color",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("menuGradientColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Menu gradient color",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("menuLinkColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Menu text color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("menuSelectedEntryBackgroundColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Selected menu entry background color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("menuSelectedEntryLinkColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Selected menu entry text color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("notificationErrorColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Error notifications color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("notificationInfoColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Informational notifications color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("notificationSuccessColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Success notifications color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("notificationWarningColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Warning notifications color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("pageBackgroundColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Page background color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("pageBackgroundImage", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Page background image (the name of an image attached to the theme document)",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("pageBackgroundPosition", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Page background image position and repeat (CSS syntax, for example: \"left top repeat-x\")",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("pageContentBackgroundColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Page content background color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("pageHeaderBackgroundColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Page header background color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("panelBackgroundColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Panel background color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("panelCollapsedBackgroundColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Collapsed panel background color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("panelCollapsedGradientColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Collapsed panel gradient color",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("panelCollapsedTextColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Collapsed panel text color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("panelHeaderBackgroundColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Panel header background color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("panelHeaderGradientColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Panel header gradient color",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("panelHeaderTextColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Panel header text color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("panelTextColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Panel text color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("submenuContentBackgroundColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Content submenu background color",
    "size": "30",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("textColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Text color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("textPrimaryColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Informative text color (Modified by, Created by, etc)",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("textSecondaryColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Details text color (Comments date, attachments date, etc)",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
  xcl.addProp("titleColor", props.XString.create({
    "customDisplay": "",
    "picker": "0",
    "prettyName": "Title color",
    "size": "7",
    "validationMessage": "",
    "validationRegExp": ""
  }));
});