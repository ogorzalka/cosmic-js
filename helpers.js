// Shortest way to test for IE
IE='\v'=='v'

// Moves the first element in an array to the end
// Example: [1, 2, 3, 4].enqueue() # => [2, 3, 4, 1]
Array.prototype.enqueue = function() {
	this.push(this.splice(0, 1)[0]);
	return this;
}

// Call a callback whenever a page's #hash changes
// Example: on_hash_change(function() { $(window.location.hash).show() })
function on_hash_change(callback, interval) {
	var current_hash = window.location.hash;
	if (!interval) interval = 200;
	return setInterval(function() {
		if (window.location.hash != current_hash) {
			callback.call();
			current_hash = window.location.hash;
		}
	}, 200);
}
