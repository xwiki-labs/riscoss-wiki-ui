var XWiki = (function(XWiki) {
  /******************************************************
   * THIS PART IS FOR THE SAVE SESSION BUTTON
   ******************************************************/
  
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
  
  var DialogFromPage = Class.create(XWiki.widgets.ModalPopup, {
    initialize : function($super, title, url) {
      /* The div that will be used as the dialog content. It contains a loader icon at the beginning. */
      this.contentDiv = new Element('div').update('<img src=\"$xwiki.getSkinFile("icons/xwiki/ajax-loader-large.gif")\"/>');
      this.contentUrl = url;
      
      $super(this.contentDiv, {}, 
             {title: title, 
              position: 'middle', 
              removeOnClose: true
             });
    },
    
    createDialog : function($super, event) {
      $super(event);
      
      /* Save the dialog instance in a variable so that's available in Ajax.Updater closure */
      var dialog = this;
      
      /* Asynchronously load the create scope page content and show it in the dialog when ready. */
      new Ajax.Updater(this.contentDiv, this.contentUrl, {
        onComplete : function() {
          var sessionNameInput = $('saveSessionPopup:sessionNameInput');
          
          $('saveSessionPopup:cancel').observe('click', function(e) {
            e.stop();
            dialog.closeDialog();
          });
          
          sessionNameInput.observe('keyup', function(e) {            
            removeErrorMessage(sessionNameInput);
          });
          
          
          $('saveSessionPopup:form').observe('submit', function(e) {
            e.stop();
            
            
            if(sessionNameInput.value.strip().length == 0) {
              showErrorMessage(sessionNameInput, '$services.localization.render("riscossPlatform.createForm.valueRequired")');

              return;
            }
            
            var targetRestURL = XWiki.Document.RestURLTemplate.replace("__wiki__", XWiki.Document.currentWiki).replace("__space__", "RISCOSSPlatformRiskAnalysisSessions").replace("__page__", sessionNameInput.value.strip());

            new Ajax.Request(targetRestURL, {
              method: 'GET',
              onComplete: function(response) {
                if(404 == response.status) {
                  $('sessionName').setValue(sessionNameInput.getValue());
                  $('saveSessionForm').submit();
                }
                else {
                  showErrorMessage(sessionNameInput, '$services.localization.render("riscossPlatform.createForm.alreadyExistingItem")');
                }
              },
              onError: function(response) {
                showErrorMessage(sessionNameInput, '$services.localization.render("riscossPlatform.createForm.networkError")');
              }
            });
          });
        }});
    }
  });
  
  var SessionNamePopup = Class.create(XWiki.widgets.ModalPopup, {
    initialize : function($super) {
      this.sessionNameInput = new Element('input', {type: 'input'});
      this.createButton = new Element('input', {type: 'image', src: '$xwiki.getSkinFile("icons/silk/add.png")'});
      
      var container = new Element('div', {id: 'sessionNamePopup'});
      container.insert(this.sessionNameInput);
      container.insert(this.createButton);
      
      $super(container, {}, {
        title: 'Foo', position: 'middle'});
    }
  });
  
  /******************************************************
   * THIS PART IS FOR DISPLAYING RESULTS
   ******************************************************/
  
  var createTextElement = function(value) {
    var element = new Element('div');
    element.innerHTML = JSON.stringify(value);
    
    return element;
  }
  
  var createEvidenceElement = function(evidence) {
    var div = new Element('div');
    
    var gauge = new Element('img', {
      src: '$xwiki.getDocument('RISCOSSPlatformCode.EvidenceGauge').getExternalURL()?positive=' + evidence.positive + '&negative=' + evidence.negative});
    
    var textDiv = new Element('div');
    textDiv.setStyle({float: 'right'});
    textDiv.innerHTML = '<ul><li>Positive: ' + evidence.positive + '</li><li>Negative: ' + evidence.negative + '</li></ul>';
    
    div.insert({top: gauge});
    div.insert({bottom: textDiv});
    
    return div;
  }
  
  var createDistributionElement = function(distribution) {
    var canvas = new Element('canvas', {width: 200, height: 15 * distribution.values.length});
    var colors = ["#298a08", "#86b404", "#ffbf00", "#fa5858", "#ff0000"];
    var context = canvas.getContext("2d")
    var width = canvas.width;
    var height = canvas.height;

    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.stroke();
    
    var barHeight = Math.floor(canvas.height / distribution.values.length);
    var fontSize = Math.min(barHeight, 10) ;
    context.font = "bold " + fontSize + "px sans-serif"
    var maxTextWidth = context.measureText('999.99%').width;
        
    for(i = 0; i < distribution.values.length; i++) {
      context.beginPath();
      context.rect(0, i * barHeight, Math.floor(canvas.width  * distribution.values[i]), barHeight);
      context.fillStyle = colors[i];      
      context.fill();
      context.fillStyle = '#303030';
      context.textBaseline = "top";
      
      context.fillText('' + Math.floor(10000 * distribution.values[i]) / 100 + "%", Math.min((canvas.width * distribution.values[i]) + 5, canvas.width - maxTextWidth - 5), (barHeight * i) + (barHeight - fontSize) / 2);
    }
    
    return canvas;
  }
    
  /* We expect data to be a map from a category to a map of results, where each
   * result is a map of an id to a map with 3 elements (DESCRIPTION, TYPE, VALUE)
   */
  var displayData = function(element, data) {
    var html = '<table>';
console.log(JSON.stringify(data, null, '  '));
    for(category in data) {
      html = html + '<tr><th colspan="2">' + category + '</th></tr>';
      for(item in data[category]) {
        var description = data[category][item].DESCRIPTION || item;
        var type = data[category][item].TYPE;
        var value = data[category][item].VALUE;
        html = html + '<tr><td>' + description + '</td><td><div class="result" type="' + type +
            '" style="display: none">' + encodeURIComponent(JSON.stringify(value)) +
            '</div></td></tr>';
      }
    }
    html = html + '</table>';
    
    element.update(html);
    element.setStyle({display: ''});
    
    var resultElements = $$('.result');
    for(var i = 0; i < resultElements.length; i++) {
      var resultElement = resultElements[i];
      var type = resultElement.getAttribute("type");
      var value = JSON.parse(decodeURIComponent(resultElement.innerHTML));
      if(type == "EVIDENCE") {
        Element.replace(resultElement, createEvidenceElement(value));
      }
      else if(type = "DISTRIBUTION") {
        Element.replace(resultElement, createDistributionElement(value));
      }
      else {
        Element.replace(resultElement, createTextElement(value));
      }
    }
  }
  
  function init() {
    var inputDataElement = $('inputData');        
    var resultDataElement = $('resultData');        
    var inputData = JSON.parse(decodeURIComponent(inputDataElement.innerHTML).replace(/\+/g, ' '));
    var resultData = JSON.parse(decodeURIComponent(resultDataElement.innerHTML).replace(/\+/g, ' '));
    displayData(resultDataElement, resultData);
    //$('inputDataInput').setValue(JSON.stringify(inputData));
    //$('resultDataInput').setValue(JSON.stringify(resultData));
    
    $('saveSessionForm').observe('submit', function(e) {
      var saveSessionDialog = new DialogFromPage('Save session', '$xwiki.getDocument("RISCOSSPlatformRiskAnalysisManagerCode.SaveSessionPopupForm").getURL("view", "xpage=plain")');
      saveSessionDialog.showDialog();
      e.stop();
    })
  }
  
  //Wait for dom load
  (XWiki.domIsLoaded && init()) || document.observe('xwiki:dom:loaded', init);

  //End XWiki augmentation
  return XWiki;
} (XWiki || {}));
