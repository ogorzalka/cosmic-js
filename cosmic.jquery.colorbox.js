// New argument on $.fn.colorbox() that lets you add a class
// to the #colorbox element.
// Example:
//   $('#foo a').colorbox({ className: 'foo' })
//   $('#bar a').colorbox({ className: 'bar' })
$.fn.colorbox.checkClassName = function(e) {
  var colorElement = $.fn.colorbox.element(),
      className = colorElement.data('colorbox').className,
      addRemove = e.type == 'cbox_open' ? 'add' : 'remove'
  if (className)
    $('#colorbox')[addRemove + 'Class'](className)
}
$(document).bind('cbox_open', $.fn.colorbox.checkClassName)
           .bind('cbox_closed', $.fn.colorbox.checkClassName);
