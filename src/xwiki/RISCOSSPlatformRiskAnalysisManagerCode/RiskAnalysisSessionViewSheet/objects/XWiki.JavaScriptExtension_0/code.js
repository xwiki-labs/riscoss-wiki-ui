require(['jquery'], function ($) {

  var EVIDENCE_GAUGE_URL = new XWiki.Document('EvidenceGauge', 'RISCOSSPlatformCode').getURL('get');
  var DISTRIBUTION_COLORS = ["#298a08", "#86b404", "#ffbf00", "#fa5858", "#ff0000"];
  var DISTRIBUTION_NAMES = [
    "Very Low Risk",
    "Low Risk",
    "Medium Risk",
    "High Risk",
    "Very High Risk"
  ];
  
  var createTextElement = function(value) {
    var element = document.createElement('div');
    element.innerHTML = JSON.stringify(value);
    return element;
  }
  
  var createEvidenceElement = function(evidence) {
    var div = new Element('div');
    
    var gauge = new Element('img', {
      src: EVIDENCE_GAUGE_URL + '?positive=' + evidence.positive + '&negative=' + evidence.negative});
    
    var textDiv = new Element('div');
    textDiv.setStyle({float: 'right'});
    textDiv.innerHTML = '<ul><li>Positive: ' + evidence.positive + '</li><li>Negative: ' + evidence.negative + '</li></ul>';
    
    div.insert({top: gauge});
    div.insert({bottom: textDiv});
    
    return div;
  };

  var createDeterminentDistributionElement = function (dist) {
    var i = 0;
    for (; i < dist.length && !dist[i]; i++) ;
    var out = document.createElement('div');
    out.setAttribute('style', 'width:120px;height:30px;background-color:'+DISTRIBUTION_COLORS[i]);
    out.innerHTML = '<center><p style="color:#000;font-weight:bold;padding-top:5px">'+DISTRIBUTION_NAMES[i]+'</p></center>';
    return out;
  };

  var isDeterminentDistribution = function (dist) {
    for (var i = 0; i < dist.length; i++) {
      if (dist[i] === 1) { return true; }
    }
    return false;
  }
  
  var createDistributionElement = function(distribution) {
    if (isDeterminentDistribution(distribution.values)) {
        return createDeterminentDistributionElement(distribution.values);
    }
    var canvas = new Element('canvas', {width: 200, height: 15 * distribution.values.length});
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
      context.fillStyle = DISTRIBUTION_COLORS[i];      
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
   * result is a map of an id to a map with 3 elements (description, type, value)
   */
  var displayData = function(element, data) {
    var html = '<table>';
    for(var category in data) {
      //html = html + '<tr><th colspan="2">' + category + '</th></tr>';
      var description = data[category].description || category;
      // TODO: Stop requiring unused inputs!
      if (description === 'unused') { continue; }
      html = html + '<tr><td>' + description + '</td><td><div class="result" data-category="' +
          category + '" style="display: none"></div></td></tr>';
    }
    html = html + '</table>';
    
    element.innerHTML = html;
    element.setAttribute('style', '');
    
    var resultElements = $('.result');
    for(var i = 0; i < resultElements.length; i++) {
      var resultElement = resultElements[i];
      var category = resultElement.getAttribute("data-category");
      var type = data[category].type;
      var value = data[category].value;
      if(type === "EVIDENCE") {
        Element.replace(resultElement, createEvidenceElement(value));
      } else if(type === "DISTRIBUTION") {
        Element.replace(resultElement, createDistributionElement(value));
      } else {
        Element.replace(resultElement, createTextElement(value));
      }
    }
  };

  // Copied from DataCollectorManager, TODO: fix
  var uid = function () { return 'uid-' + Math.random().toString(32).substring(2); };
  var appendElem = function ($container, type, id) {
    id = id || uid();
    $container.append("<"+type+" id="+id+"></"+type+">");
    return $('#'+id);
  };

  var showInput = function ($div, interpretedInput) {
    $div.html('');
    $div.attr('style', '');
    var $table = appendElem($div, 'table');
    var $tbody = appendElem($table, 'tbody');

    var $headerTr = appendElem($tbody, 'tr');
    var $th = appendElem($headerTr, 'th');
    $th.text("Risk Data Point");
    $th = appendElem($headerTr, 'th');
    $th.text("Collected Value");
    $th = appendElem($headerTr, 'th');
    $th.text("Interpreted Risk");

    var keys = Object.keys(interpretedInput);
    for (var i = 0; i < keys.length; i++) {
      var $tr = appendElem($tbody, 'tr');
      var $td = appendElem($tr, 'td');
      $td.text(interpretedInput[keys[i]].description || keys[i]);

      $td = appendElem($tr, 'td');
      $td.append(interpretedInput[keys[i]].rawValue);

      $td = appendElem($tr, 'td');
      $td.append(createDeterminentDistributionElement(interpretedInput[keys[i]].value.values));
    }
  };

  var getData = function (elem) {
    return JSON.parse(decodeURIComponent(elem.text()).replace(/\+/g, ' '));
  };

  var main = function () {
    var dat = getData($('.resultData'));
    displayData($('.resultData')[0], dat);

    var interpretedInput = getData($('.interpretedInput'));
    showInput($('.interpretedInput'), interpretedInput.output.result);
  };
  main();
});
