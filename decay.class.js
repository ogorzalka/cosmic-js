// Decay class, to call a callback less and less often. For example,
// make an Ajax request and freshen the decay only if the request has changed.
// 
// To start the timeouts, call decay_object.start()
// To freshen up the speed of query, call decay_object.reset()
// 
// Options:
//  - seconds: time between each callback at the start and after a reset() (default 2)
//  - decay: multiplier to use after each callback call (default 1.3)
//  - max: maximum number of seconds to wait between each call (default 42)
// 
// Example:
//   function decay_me() {
//     if (something() != "") this.reset();
//   }
//   new Decay(decay_me, { seconds: 2, decay: 1.3, max: 42 }).start()
function Decay(callback, options) {
	this.options = { seconds: 2, decay: 1.5, max: 30, callback: callback }
	jQuery.extend(this.options, options);

	this.timer = this.options.seconds
	this.timeout = null
}

Decay.prototype = {
	// call this method to freshen up the speed of callbacks
	reset: function() {
		this.timer = this.options.seconds
		this.start()
	},

	// call this method to start the decay
	start: function() {
		clearTimeout(this.timeout)

		var that = this
		var call_loop = function() {
			that.options.callback.apply(that)
			that.start.apply(that) // recurse!
		}

		this.timeout = setTimeout(call_loop, this.timer * 1000)

		// calculate the next timer
		this.timer = this.timer * this.options.decay
		if (this.timer > this.options.max)
			this.timer = this.options.max
		return this
	}
}

