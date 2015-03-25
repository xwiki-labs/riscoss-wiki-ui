require(['jquery'], function ($) {
  // Copied from DataCollectorManager, TODO: fix
  var uid = function () { return 'uid-' + Math.random().toString(32).substring(2); };
  var appendElem = function ($container, type, id) {
    id = id || uid();
    $container.append("<"+type+" id="+id+"></"+type+">");
    return $('#'+id);
  };

  var showInput = function ($div, input) {
    $div.html('');
    $div.attr('style', '');
    var $table = appendElem($div, 'table');
    var $tbody = appendElem($table, 'tbody');

    var $headerTr = appendElem($tbody, 'tr');
    var $th = appendElem($headerTr, 'th');
    $th.text("Data Point");
    $th = appendElem($headerTr, 'th');
    $th.text("Collected Value");

    input.sort(function (a, b) { return (a.date > b.date) ? 1 : -1; });
    var seen = [];
    for (var i = 0; i < input.length; i++) {
      var entry = input[i];
      if (seen.indexOf(entry.id) !== -1) { continue; }
      seen.push(entry.id);

      var $tr = appendElem($tbody, 'tr');
      var $td = appendElem($tr, 'td');
      $td.text(entry.id);

      $td = appendElem($tr, 'td');
      if (["NUMBER","INTEGER","REAL"].indexOf(entry.type) > -1) {
          $td.append(entry.value);
      } else {
          throw new Error();
      }
    }
  };
/* TODO: this triggers a cross domain error.
  var url = decodeURIComponent($('.DisplayDataCollector').attr("data-rdrpath"));
  url = url.replace(/^ \| $/g, '');
  url = url.replace('localhost', window.location.hostname);
  url = url + '/' + $('#collected-data').attr("data-id") + '?limit=-1';
*/
  var url = window.location.href.replace(/riscoss\/.*$/,'') + 'riscoss-rdr/' + $('#collected-data').attr("data-id") + '?limit=-1'
  $.ajax(url, {
      success: function (ret) {
          showInput($('#collected-data'), ret.results);
      }
  });
});
