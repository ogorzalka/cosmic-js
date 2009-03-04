// Shortest way to test for IE
IE='\v'=='v'

// Moves the first element in an array to the end
// Example: [1, 2, 3, 4].enqueue() # => [2, 3, 4, 1]
Array.prototype.enqueue = function() {
	this.push(this.splice(0, 1)[0]);
	return this;
}

