function addFloatingScrollbar() {
  this.affectedElements.each(function() {
    var element = $(this);
    var scrollbarElement;
    var irTable = element.find('table.a-IRR-table:last');

    // interactive report
    if (irTable) {

      scrollbarElement = irTable.parent();

      apex.debug.info('Adding floating scrollbar to IR region.', scrollbarElement);
      scrollbarElement.floatingScrollbar(true);
      // hook to before refresh to remove floating scrollbar
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
