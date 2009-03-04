// Switches to the next background-image by incrementing the
// background-image ccs property (eg: name1.jpg, name2.jpg, name3jpg, etc.)
// Starts back at 1 when max is reached.
//
// Example:
//   $('foo').style.backgroundImage = "url(foo1.jpg)"
//   $('foo').increment_background_image(5)
//   $('foo').style.backgroundImage # => "url(foo2.jpg)"
Element.addMethods({
	increment_background_image: function(element, max) {
		var style = $(element).getStyle('background-image')
		var image_re = /([0-9]+)\.jpg/
		var current = parseInt(style.match(image_re)[1], 10)
		var next = (current == max) ? 1 : current + 1;
		$(element).setStyle({
			backgroundImage: style.replace(image_re, next + '.jpg')
		})
	}
})
