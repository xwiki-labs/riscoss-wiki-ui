XWikiObj(function (obj) {
    obj.setDefaultRedirect("$xwiki.getURL($services.model.resolveDocument('', 'default', $doc.documentReference.extractReference('WIKI')))");
    obj.setHeading("");
    obj.setLiveValidation_defaultFieldOkMessage("$services.localization.render('core.validation.valid.message')");
    obj.setLiveValidation_enabled("1");
    obj.setLoginButton_autoLogin_enabled("0");
    obj.setLoginButton_enabled("1");
    obj.setRegistrationSuccessMessage("#set($fullName = \"$request.get('register_first_name') $request.get('register_last_name')\")\n{{info}}$services.localization.render('core.register.successful', [\"[[$fullName>>$userSpace$userName]]\", $userName]){{/info}}");
    obj.setRequireCaptcha("0");
    obj.setWelcomeMessage("");
});
