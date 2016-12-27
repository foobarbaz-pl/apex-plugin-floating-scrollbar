/**
 * jquery.is-scrollable - A jQuery plugin to check if element has a scrollbar.
 * @version v1.0.0
 * @author Sebastian Cichosz
 * @link https://github.com/foobarbaz-pl/jquery.is-scrollable
 * @license MIT
 */
(function($) {

  /**
   * Detects whether element can be scrolled vertically.
   * @this jQuery
   * @return {boolean}
   */
  $.fn.isVerticallyScrollable = function() {

    if (this.scrollTop()) {
      // Element is already scrolled, so it is scrollable
      return true;
    } else {
      // Test by actually scrolling
      this.scrollTop(1);

      if (this.scrollTop()) {
        // Scroll back
        this.scrollTop(0);
        return true;
      }
    }

    return false;
  };

  /**
  * Detects whether element can be scrolled horizontally.
   * @this jQuery
   * @return {boolean}
   */
  $.fn.isHorizontallyScrollable = function() {

    if (this.scrollLeft()) {
      // Element is already scrolled, so it is scrollable
      return true;
    } else {
      // Test by actually scrolling
      this.scrollLeft(1);

      if (this.scrollLeft()) {
        // Scroll back
        this.scrollLeft(0);
        return true;
      }
    }
    return false;
  };

  $.extend($.expr.pseudos || $.expr[ ":" ], {
    "vertically-scrollable": function(a, i, m) {
      return $(a).isVerticallyScrollable();
    },
    "horizontally-scrollable": function(a, i, m) {
      return $(a).isHorizontallyScrollable();
    }
  });
})(jQuery);
