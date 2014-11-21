var XWiki = (function(XWiki) {

  // VELOCITY
  var ALREADY_EXISTS = '$services.localization.render("riscossPlatform.createForm.alreadyExistingItem")';
  var VALUE_REQUIRED = '$services.localization.render("riscossPlatform.createForm.valueRequired")';
  var NETWORK_ERROR = '$services.localization.render("riscossPlatform.createForm.networkError")';
  // END_VELOCITY

  XWiki.RISCOSSPlatform = XWiki.RISCOSSPlatform || {};
  
  /* Setup the validation logic for a create form. */
  var initializeCreateForm = function(dialogContent) {
    var showErrorMessage = function(element, message) {
      if(!element.classList.contains('xErrorField')) {
        element.addClassName('xErrorField');
        element.insert({'after' : '<div class="xErrorMsg">' + message + '</div>'});
      }
    };
    
    var removeErrorMessage = function(element) {
      if(element.classList.contains('xErrorField')) {
        element.removeClassName('xErrorField');
        var errorMessage = element.next('.xErrorMsg');
        errorMessage && errorMessage.remove();
      }
    };
    
    var form = dialogContent.down('.createForm');
    var targetNameInput = dialogContent.down('.targetName');
    var targetSpaceInput = dialogContent.down('.targetSpace');
    
    targetNameInput.focus();
    
    form.observe('submit', function(event) {
      event.stop();
      
      removeErrorMessage(targetNameInput);
      
      if(targetNameInput.value.strip().length == 0) {
        showErrorMessage(targetNameInput, VALUE_REQUIRED);

        return;
      }
   
      var targetRestURL = XWiki.Document.RestURLTemplate.replace(
        "__wiki__", XWiki.Document.currentWiki).replace(
        "__space__", targetSpaceInput.value.strip()).replace(
        "__page__", targetNameInput.value.strip());

      new Ajax.Request(targetRestURL, {
        method: 'GET',
        onComplete: function(response) {
          if(404 == response.status) {
            form.submit();
          }
          else {
            showErrorMessage(targetNameInput, ALREADY_EXISTS);
          }
        },
        onError: function(response) {
          showErrorMessage(targetNameInput, NETWORK_ERROR);
        }
      });
    });
  };
  
  XWiki.RISCOSSPlatform.initializeCreateDialog = function(dialog) {
    var dialogContent = dialog.content;
    initializeCreateForm(dialogContent);
    
    var cancelButton = dialogContent.down('.secondary');
    cancelButton.observe('click', function(event) {
      event.stop();
      dialog.closeDialog();
    });
  }
      
  /* This is used to initialize the create forms that are present in the loaded page, if any. */
  var createForms = $$('.createForm');
  for(i = 0; i < createForms.length; i++) {
    initializeCreateForm(createForms[i]);
  }
  
  return XWiki;
}(XWiki || {}));
