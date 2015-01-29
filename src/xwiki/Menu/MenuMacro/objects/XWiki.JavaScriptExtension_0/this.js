XWikiObj(function (obj) {
    obj.setCache("long");
    obj.setCode("require(['jQueryNoConflict'], function($) {\n  // It's not possible to write a CSS selector that targets list items containing lists so we rely on JavaScript.\n  // The 'dropdown' CSS class is used only to display the down/left arrow.\n  $('.menu-horizontal li ul').parent().addClass('xDropdown');\n\n  // Collapsible menu bahavior.\n  $('.menu-vertical.collapsible').each(function(){\n    var open = $(this).hasClass('open');\n    $(this).find('li ul').each(function() {\n      $(this).addClass('xDropdown-menu').parent().addClass('xDropdown' + (open ? ' open' : ''));\n      // Wrap everything (including text nodes) before the sub-menu in a DIV that will toggle its state.\n      var toggle = this.ownerDocument.createElement('div');\n      $(this).parent().prepend(toggle);\n      for(var next = toggle.nextSibling; next != this; next = toggle.nextSibling) {\n        toggle.appendChild(next);\n      }\n      $(toggle).addClass('xDropdown-toggle').on('click', function() {\n        $(this).parent().toggleClass('open');\n      });\n    });\n  });\n})");
    obj.setName("");
    obj.setParse("0");
    obj.setUse("onDemand");
});
