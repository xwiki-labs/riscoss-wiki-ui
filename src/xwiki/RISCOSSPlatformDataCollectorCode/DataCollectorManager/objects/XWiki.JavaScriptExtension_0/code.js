require(['jquery'], function ($) {

  var MESSAGES = {
    dataCollectors: 'Data Collectors',
    deletingObject: 'Deleting Object',
    doneDeletingObject: 'Done',
    errorDeletingObject: 'Error',
    frequency: 'Frequency'
  };

  var uid = function () { return 'uid-' + Math.random().toString(32).substring(2); };
  var appendElem = function ($container, type, id) {
    id = id || uid();
    $container.append("<"+type+" id="+id+"></"+type+">");
    return $('#'+id);
  };

  var toggleHidden = function ($elem) {
    if ($elem.attr('style') === 'display:none;') {
      $elem.removeAttr('style');
      $elem.find('.post-input[data-name]').each(function (num, el) {
        var $el = $(el);
        $el.attr('name', $el.attr('data-name'));
      });
    } else {
      $elem.attr('style', 'display:none;');
      // stash the 'name' field in data-name and remove it so it will not create a new obj.
      $elem.find('.post-input[name]').each(function (num, el) {
        var $el = $(el);
        $el.attr('data-name', $el.attr('name'));
        $el.removeAttr('name');
      });
    }
  };

  var makeLabeledElement = function ($list, labelTxt, elementType) {
    var id = uid();
    var $labelDT = appendElem($list, 'dt');
    var $label = appendElem($labelDT, 'label', id + '-label');
    $label.attr('for', id);
    $label.text(labelTxt);
    var $inputDD = appendElem($list, 'dd');
    return appendElem($inputDD, elementType, id);
  }

  var getObjRemoveURL = function (baseObjRemoveURL, className) {
    return baseObjRemoveURL + '&xpage=plain&deleteCollector=' + className;
  };

  var editCollector = function (col, $elem, objRemoveURL) {

    var $checkbox = makeLabeledElement($elem, col.title, 'input');
    $checkbox.attr('type', 'checkbox');
    $checkbox.parent().css({"background-color": "#F0F0F0", "padding": "5px", "border-bottom" : "1px solid #A0A0A0"});
    var $subsection = appendElem($checkbox.parent(), 'div');

    var $list = appendElem($subsection, 'dl');
    for (var i = 0; i < col.properties.length; i++) {
      var prop = col.properties[i];
      var $input = makeLabeledElement($list, prop.prettyName, 'input');
      switch (prop.type) {
        case 'StringClass': $input.attr('type', 'text'); break;
        case 'BooleanClass': $input.attr('type', 'checkbox'); break;
        case 'NumberClass': $input.attr('type', 'text'); break;
      }
      $input.attr('class', 'post-input');
      $input.attr('name', col.fullName + '_0_' + prop.name);
      $input.attr('value', prop.value || '');
    }

    var $input = makeLabeledElement($list, MESSAGES.frequency, 'input');
    var freqEdit = col.frequency_edit.replace(/^{{[^}]+}}/, '').replace(/{{[^}]+}}$/, '');
    var $freqDD = $($input[0].parentNode);
    var inputId = $input.attr('id');
    $input.remove();
    $freqDD.append(freqEdit);
    var name = $freqDD.find('select').attr('name').replace(/_frequency$/, '_collectorName');
    $freqDD.append('<input type="hidden" name="' + name + '" value="' + col.fullName + '">');
    $freqDD.find('select').attr('id', inputId).attr('class', 'post-input');
    $freqDD.find('input').attr('class', 'post-input');

    if (col.enabled) {
      $checkbox.attr('checked', 'checked');
    } else {
      toggleHidden($subsection);
    }

    $checkbox.click(function () {
      if (col.enabled) {
        var inProgress = new XWiki.widgets.Notification(MESSAGES.deletingObject, "inprogress");
        $.ajax({
          url: getObjRemoveURL(objRemoveURL, col.fullName),
          method: 'POST',
          success: function () {
            inProgress.hide();
            new XWiki.widgets.Notification(MESSAGES.doneDeletingObject, "done");
            col.enabled = false;
          },
          error: function (jqXHR, error) {
            inProgress.hide();
            new XWiki.widgets.Notification(MESSAGES.errorDeletingObject + ' ' + error, "error");
          }
        });
      }
      toggleHidden($subsection);
    });
  };

  var edit = function (config, $elem) {
    if (!config.collectors.length) { return; }
    var $updateOrCreate = appendElem($elem, 'input');
    $updateOrCreate.attr('type', 'hidden');
    $updateOrCreate.attr('value', 'updateOrCreate');
    $updateOrCreate.attr('name', 'objectPolicy');

    var $dl = appendElem($elem, 'dl');
    $dl.append('<dt>'+MESSAGES.dataCollectors+'</dt>');
    var $dd = appendElem($dl, 'dd');
    for (var i = 0; i < config.collectors.length; i++) {
      editCollector(config.collectors[i], $dd, config.objRemoveURL);
    }
  };

  var viewCollector = function (col, $tbody) {
    if (!col.enabled) { return; }
    var $tr = appendElem($tbody, 'tr');
    var $td = appendElem($tr, 'td');
    $td.text(col.title);

    $td = appendElem($tr, 'td');
    $td.text(col.frequency_view);

    var lastRun = 'Running...';
    if (col.timeLastRun) { lastRun = new Date(Number(col.timeLastRun)).toGMTString(); }
    $td = appendElem($tr, 'td');
    $td.text(lastRun);
  };

  var view = function (config, $elem) {
    if (!config.collectors.length) { return; }
    $elem.append('<h1>'+MESSAGES.dataCollectors+'</h1>');
    var $table = appendElem($elem, 'table');
    var $tbody = appendElem($table, 'tbody');
    var $headerTr = appendElem($tbody, 'tr');
    var $th = appendElem($headerTr, 'th');
    $th.text("Data Collector Name");
    $th = appendElem($headerTr, 'th');
    $th.text("Collection Frequency");
    $th = appendElem($headerTr, 'th');
    $th.text("Time Last Collected");
    for (var i = 0; i < config.collectors.length; i++) {
      viewCollector(config.collectors[i], $tbody);
    }
  };

  var $elem = $('.data-collectors');
  var config = JSON.parse(decodeURIComponent($elem.text().replace(/\+/g, '%20')));
  $elem.text('');
  $elem.removeAttr('style');
  $elem.append('<hr />');

  if (XWiki.contextaction === 'edit') {
    edit(config, $elem);
  } else {
    view(config, $elem);
  }
});
