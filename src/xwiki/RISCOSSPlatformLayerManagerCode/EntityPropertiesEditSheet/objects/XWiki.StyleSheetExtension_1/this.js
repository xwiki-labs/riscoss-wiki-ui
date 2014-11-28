XWikiObj(function (obj) {
    obj.setCache("long");
    obj.setCode("#options dt, #fields dt {\n  margin-top: 0;\n  padding-top: 0.5em;\n}\n\n#fields .field-config label {\n  color: $theme.textSecondaryColor;\n}\n\n#fields .unset {\n  color: $theme.textSecondaryColor !important;\n}\n\n#fields .autoResize-meter {\n  left: -9999px;\n  position: absolute;\n  top: 0;\n  visibility; hidden;\n}\n\n#fields .inherit {\n  background-image: none;\n  border: 0 none;\n  box-shadow: none;\n  color: inherit;\n  font-family: inherit;\n  font-size: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  padding: 0;\n  text-align: inherit;\n  text-transform: inherit;\n  word-spacing: inherit;\n}\n\n#fields input.inherit:hover, #fields input.xHint:hover {\n  background-color: $theme.highlightColor;\n}\n\n#fields input.xHint {\n  border: 0 none;\n}\n\n#fields .labelLine label {\n  display: inline-block;\n}\n\n#fields .toggle-switcher {\n  cursor: pointer;\n}");
    obj.setName("Widgets");
    obj.setParse("1");
    obj.setUse("onDemand");
});
