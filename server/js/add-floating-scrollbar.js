function addFloatingScrollbar() {
  this.affectedElements.each(function() {
    var element = $(this), scrollbarElement;

    if (element.is('div.t-IRR-region')) {
      // interactive report
      scrollbarElement = element.find('table.a-IRR-table:last').parent();
      apex.debug.info('Adding floating scrollbar to IR region.', scrollbarElement);
      scrollbarElement.floatingScrollbar();
    } else {
      scrollbarElement = element.find('div.t-Region-body');
      apex.debug.info('Adding floating scrollbar to region.', scrollbarElement);
      scrollbarElement.floatingScrollbar();
    }
  });
}
