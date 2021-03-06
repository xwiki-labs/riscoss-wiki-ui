require(['jquery'], function ($) {

  var MESSAGES = {
    dataCollectors: 'Data Collectors',
    deletingObject: 'Deleting Object',
    doneDeletingObject: 'Done',
    errorDeletingObject: 'Error',
    rerunningCollector: 'Rerunning collector',
    doneRerunningCollector: 'Done',
    errorRerunningCollector: 'Error',
    frequency: 'Frequency',
    running: 'Running...',
    rerun: "Rerun",
    timeLastCollected: "Time Last Collected",
    collectorFrequency: "Collection Frequency",
    collectorName: "Data Collector Name",
    errFailedToRedisplayTable: "Failed to redisplay table"
  };

  var RERUN_ICON = '/' + XWiki.webapppath + 'resources/icons/silk/arrow_rotate_clockwise.png';

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
  };

  var buildAjaxURL = function (conf, action, className) {
    return conf.ajaxURL + '?xpage=plain&entityDoc=' + conf.entityDoc +
      '&action=' + action + '&collector=' + className;
  };

  var editCollector = function (col, $elem, config) {

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
          url: buildAjaxURL(config, 'remove', col.fullName),
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
      editCollector(config.collectors[i], $dd, config);
    }
  };

  var redisplay = function (config, $elem, callback) {
    $.ajax({
      url: config.displayURL + '?xpage=plain&entityDoc=' + config.entityDoc,
      method: 'POST',
      success: function (data) {
        try {
            var parsed = parseData($(data));
            $elem.empty();
            view(parsed, $elem);
        } catch (e) { console.log("error: [" + data + "]"); }
        callback(null);
      },
      error: function (jqXHR, error) {
        callback(error);
      }
    });
  };

  var viewCollector = function (col, $tbody, config, $elem) {
    if (!col.enabled) { return; }
    var $tr = appendElem($tbody, 'tr');
    var $td = appendElem($tr, 'td');
    $td.text(col.title);

    $td = appendElem($tr, 'td');
    $td.text(col.frequency_view);

    var lastRun = MESSAGES.running;
    if (col.timeLastRun) { lastRun = new Date(Number(col.timeLastRun)).toGMTString(); }
    $td = appendElem($tr, 'td');
    $td.text(lastRun);

    if (!config.canEdit) { return (lastRun === MESSAGES.running); }

    $td = appendElem($tr, 'td');
    $td.append('<center><img style="cursor: pointer;" src="'+RERUN_ICON+'"></img></center>');
    $td.find('img').click(function () {
      var inProgress = new XWiki.widgets.Notification(MESSAGES.rerunningCollector, "inprogress");
      var showError = function (error) {
          inProgress.hide();
          new XWiki.widgets.Notification(MESSAGES.errorRerunningCollector + ' ' + error, "error");
      };
      $.ajax({
        url: buildAjaxURL(config, 'rerun', col.fullName),
        method: 'POST',
        success: function () {
          redisplay(config, $elem, function (err) {
              if (err) {
                  showError(MESSAGES.errFailedToRedisplayTable);
              } else {
                  inProgress.hide();
                  new XWiki.widgets.Notification(MESSAGES.doneRerunningCollector, "done");
              }
          });
        },
        error: function (jqXHR, error) {
          showError(error);
        }
      });
    });

    return (lastRun === MESSAGES.running);
  };

  var parseData = function ($elem) {
    return JSON.parse(decodeURIComponent($elem.text().replace(/\+/g, '%20')));
  };

  var view = function (config, $elem) {
    if (!config.collectors.length) { return; }
    $elem.append('<h1>'+MESSAGES.dataCollectors+'</h1>');
    var $table = appendElem($elem, 'table');
    var $tbody = appendElem($table, 'tbody');
    var $headerTr = appendElem($tbody, 'tr');
    var $th = appendElem($headerTr, 'th');
    $th.text(MESSAGES.collectorName);
    $th = appendElem($headerTr, 'th');
    $th.text(MESSAGES.collectorFrequency);
    $th = appendElem($headerTr, 'th');
    $th.text(MESSAGES.timeLastCollected);
    if (config.canEdit) {
      $th = appendElem($headerTr, 'th');
      $th.text(MESSAGES.rerun);
    }
    var needsRecheck = 0;
    for (var i = 0; i < config.collectors.length; i++) {
      needsRecheck |= viewCollector(config.collectors[i], $tbody, config, $elem);
    }
    if (needsRecheck) {
        setTimeout(function () { redisplay(config, $elem, function () { }); }, 10000);
    }
  };

  var $elem = $('.data-collectors');
  var config = parseData($elem);
  $elem.text('');
  $elem.removeAttr('style');
  $elem.append('<hr />');

  if (XWiki.contextaction === 'edit') {
    edit(config, $elem);
  } else {
    view(config, $elem);
  }
});
