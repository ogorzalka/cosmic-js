// Clears a text-field of it's default
// Keeps the default in the "data-default" attribute
jQuery.fn.clearDefault = function() {
	return jQuery(this).each(function(i, elem) {
		var elem = jQuery(elem);
		elem.attr('data-default', elem.val());
		elem.focus(function(e) {
			if (elem.val() == elem.attr('data-default'))
				elem.val('');
		});
	});
}

// Use it on labels to add the "error" class if the "error" class appears
// on the associated input by looking at the for="" attribute or its children.
//
// Examples:
//   <input id="bob" class="error" /> <label for="bob">Bob</label>
//   <script>$('label').copy_error_class_from_input()</script>
//   # => <input id="bob" class="error" /> <label for="bob" class="error">Bob</label>
//
//   <div><input class="error" /></div>
//   <script>$('div').copy_error_class_from_input()</script>
//   # => <div class="error"><input class="error" /></div>
jQuery.fn.copy_error_class_from_input = function() {
	return jQuery(this).each(function(i, elem) {
		var id_for = jQuery(elem).attr('for');
		var input = id_for ? jQuery('#'+id_for+'.error') : jQuery(this).find('input.error');
		if (input.length > 0)
			jQuery(this).addClass('error');
	})
}

// Like .serialize() but works on elements like inputs whether than forms
// $(jQuery).serializeArrayElem()
jQuery.fn.serializeArrayElem = function() {
	return jQuery(this).map(function(i, elem) {
		return { name: elem.name, value: jQuery(this).val() };
	});
}



// Like jQuery.fn.toggleClass() but to switch between two different classes rather than just one
jQuery.fn.toggleClasses = function(firstclass, secondclass) {
	return jQuery(this).each(function(i, elem) {
		var elem = jQuery(elem)
		if (elem.hasClass(firstclass))
			elem.removeClass(firstclass).addClass(secondclass)
		else
			elem.removeClass(secondclass).addClass(firstclass)
	})
}


// Fade out and show another element during `duration_in_seconds` seconds
// $(jQuery).replace_with_fade_with_duration('#elem', 10)
jQuery.fn.replace_with_fade_with_duration = function(replace, duration_in_seconds) {
	return jQuery(this).map(function(i, elem) {
		jQuery(elem).fadeOut('fast', function() {
			jQuery(replace).fadeIn('slow', function() {
				setTimeout(function() {
					jQuery(replace).fadeOut('fast', function() {
						jQuery(elem).fadeIn('slow');
					});
				}, duration_in_seconds * 1000);
			});
		});
	});
	return true;
}



// Scroll to the bottom of an element
// $(jQuery).scrollBottom()
jQuery.fn.scrollBottom = function() {
	return jQuery(this).each(function() {
		jQuery(this).scrollTop(9999); // $(this).find(':last').offset().top
	})
}


// Equalize the heights of elements
// (via http://www.cssnewbie.com/equalheights-jquery-plugin/)
// Usage: $(elems).equalHeights([minHeight][, maxHeight])
// Example: $('.foo').equalHeights()
jQuery.fn.equalHeights = function(minHeight, maxHeight) {
	var tallest = minHeight ? minHeight : 0;
	this.each(function() {
		var height = jQuery(this).height() + jQuery(this).extraHeight();
		if (height > tallest)
			tallest = height;
	});
	if ((maxHeight) && tallest > maxHeight) tallest = maxHeight;
	return this.each(function() {
		jQuery(this).height(tallest - jQuery(this).extraHeight());
	});
}

// Returns the extra height provided by borders and paddings
// Example: $('.foo').css({border:'1px solid'}).extraHeight(); # => 2
jQuery.fn.extraHeight = function() {
	var height = 0;
	var properties = $(['border-top-width', 'border-bottom-width', 'padding-top', 'padding-bottom']);
	properties.each(function(i, prop) {
		var size = parseInt(this.css(prop), 10);
		if (!isNan(size))
			height += size
	});
	return height;
}
