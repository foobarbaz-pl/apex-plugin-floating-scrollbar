function addFloatingScrollbar() {
  this.affectedElements.each(function() {
    var element = $(this),
      scrollbarElement;

    // interactive report
    if (element.is('div.t-IRR-region')) {
      scrollbarElement = element.find('table.a-IRR-table:last').parent();
      apex.debug.info('Adding floating scrollbar to IR region.', scrollbarElement);
      scrollbarElement.floatingScrollbar(true);
      element.one('apexbeforerefresh', {
        scrollbarElement: scrollbarElement
      }, function(e) {
        apex.debug.info('Removing floating scrollbar from IR region.', e.data.scrollbarElement);
        e.data.scrollbarElement.floatingScrollbar(false);
      });
    } else {
      scrollbarElement = element.find('div.t-Region-body');
      apex.debug.info('Adding floating scrollbar to region.', scrollbarElement);
      scrollbarElement.floatingScrollbar();
    }
  });
}
