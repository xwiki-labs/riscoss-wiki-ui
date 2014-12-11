require(['jquery'], function (jQuery) {

  // VELOCITY
  var EVIDENCE_GAUGE = "$xwiki.getDocument('RISCOSSPlatformCode.EvidenceGauge').getExternalURL()";
  var ADD_IMG = "$xwiki.getSkinFile('icons/silk/add.png')";
  var NETWORK_ERR = "$services.localization.render('riscossPlatform.createForm.networkError')";
  var EXISTS_ERR = "$services.localization.render('riscossPlatform.createForm.alreadyExistingItem')";
  var VALUE_REQUIRED = "$services.localization.render('riscossPlatform.createForm.valueRequired')";
  var AJAX_SPINNER = "$xwiki.getSkinFile('icons/xwiki/ajax-loader-large.gif')"
  // END_VELOCITY
  
  var createTextElement = function(value) {
    var element = document.createElement('div');
    element.innerHTML = JSON.stringify(value);
    return element;
  }
  
  var createEvidenceElement = function(evidence) {
    var div = new Element('div');
    
    var gauge = new Element('img', {
      src: EVIDENCE_GAUGE + '?positive=' + evidence.positive + '&negative=' + evidence.negative});
    
    var textDiv = new Element('div');
    textDiv.setStyle({float: 'right'});
    textDiv.innerHTML = '<ul><li>Positive: ' + evidence.positive + '</li><li>Negative: ' + evidence.negative + '</li></ul>';
    
    div.insert({top: gauge});
    div.insert({bottom: textDiv});
    
    return div;
  };
  
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
      
      context.fillText('' + Math.floor(10000 * distribution.values[i]) / 100 + "%",
          Math.min((canvas.width * distribution.values[i]) + 5, canvas.width - maxTextWidth - 5),
          (barHeight * i) + (barHeight - fontSize) / 2);
    }
    
    return canvas;
  };
    
  /* We expect data to be a map from a category to a map of results, where each
   * result is a map of an id to a map with 3 elements (DESCRIPTION, TYPE, VALUE)
   */
  var displayData = function(element, data) {
    var html = '<table>';
    for(var category in data) {
      html = html + '<tr><th colspan="2">' + category + '</th></tr>';
      
      var description = data[category].DESCRIPTION || item;
      html = html + '<tr><td>' + description + '</td><td><div class="result" data-category="' +
          category + '" style="display: none"></div></td></tr>';
    }
    html = html + '</table>';
    
    element.innerHTML = html;
    element.setAttribute('style', '');
    
    var resultElements = jQuery('.result');
    for(var i = 0; i < resultElements.length; i++) {
      var resultElement = resultElements[i];
      var category = resultElement.getAttribute("data-category");
      var type = data[category].TYPE;
      var value = data[category].VALUE;
      if(type === "EVIDENCE") {
        Element.replace(resultElement, createEvidenceElement(value));
      } else if(type === "DISTRIBUTION") {
        Element.replace(resultElement, createDistributionElement(value));
      } else {
        Element.replace(resultElement, createTextElement(value));
      }
    }
  };

  var main = function () {
    var resultDataElement = jQuery('.resultData');        
    var resultData = JSON.parse(decodeURIComponent(resultDataElement.text()).replace(/\+/g, ' '));
    displayData(resultDataElement[0], resultData);
  };
  main();
});
