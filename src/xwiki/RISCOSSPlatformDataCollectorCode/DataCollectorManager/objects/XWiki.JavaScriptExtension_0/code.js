require(['jquery'], function ($) {

  var MESSAGES = {
    dataCollectors: 'Data Collectors',
    deletingObject: 'Deleting Object',
    doneDeletingObject: 'Done',
    errorDeletingObject: 'Error',
    periodicity: 'Frequency'
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

    var $input = makeLabeledElement($list, MESSAGES.periodicity, 'input');
    var freqEdit = col.periodicity_edit.replace(/^{{[^}]+}}/, '').replace(/{{[^}]+}}$/, '');
    var $freqDD = $($input[0].parentNode);
    var inputId = $input.attr('id');
    $input.remove();
    $freqDD.append(freqEdit);
    var name = $freqDD.find('select').attr('name').replace(/_periodicity$/, '_collectorName');
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

  var viewCollector = function (col, $ul) {
    if (!col.enabled) { return; }
    var $li = appendElem($ul, 'li');
    $li.text(col.title + ' - Running ' + col.periodicity_view);
  };

  var view = function (config, $elem) {
    var $dl = appendElem($elem, 'dl');
    $dl.append('<dt>'+MESSAGES.dataCollectors+'</dt>');
    var $dd = appendElem($dl, 'dd');
    var $ul = appendElem($dd, 'ul');
    for (var i = 0; i < config.collectors.length; i++) {
      viewCollector(config.collectors[i], $ul);
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
