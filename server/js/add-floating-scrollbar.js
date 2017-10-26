function addFloatingScrollbar() {
  this.affectedElements.each(function() {
    var element = $(this),
      scrollbarElement,
      options = {"css":{"bottom":0}},
      igOptions = {"css":{"bottom":30}};

    // TODO: support IR and IG within regions having template other than IR
    // interactive report template
    if (element.is('div.t-IRR-region')) {
      scrollbarElement = element.find('div.a-GV-w-scroll'); // try IG

      if (scrollbarElement.length === 0) {
        // try IR
        scrollbarElement = element.find('table.a-IRR-table:last').parent();
        // hook to before refresh to remove floating scrollbar
        element.one('apexbeforerefresh', {
          scrollbarElement: scrollbarElement
        }, function(event) {
          apex.debug.info('Removing floating scrollbar from IR region.', event.data.scrollbarElement);
          event.data.scrollbarElement.floatingScrollbar(false);
        });
      } else {
        // IG
        element.on("interactivegridreportsettingschange", function(event, data) {
          $.floatingScrollbarUpdate();
        });
        scrollbarElement.one('remove', {
          scrollbarElement: scrollbarElement
        }, function(event) {
          apex.debug.info('Removing floating scrollbar from IG region.', event.data.scrollbarElement);
          event.data.scrollbarElement.floatingScrollbar(false);
        });
        element.on("gridpagechange", function(event, data) {
          $(this).find('div.a-GV-w-scroll').floatingScrollbar(true, igOptions);
        });
        // scrollbar has to be displayed above the footer for IG with sticky footer
        if (apex.region(element.attr("id")).widget().interactiveGrid("option").config.defaultGridViewOptions.stickyFooter) {
          igOptions.css.bottom = element.find('div.a-GV-footer').outerHeight();
          options = igOptions;
        }
      }
      apex.debug.info('Adding floating scrollbar to IG/IR region.', scrollbarElement);
      scrollbarElement.floatingScrollbar(true, options);
    } else {
      scrollbarElement = element.find('div.t-Region-body');
      apex.debug.info('Adding floating scrollbar to region.', scrollbarElement);
      scrollbarElement.floatingScrollbar(true, options);
    }
  });
}
