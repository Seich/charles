charles.events = (function() {
	function events() {
		this.events = {};
	}

	events.prototype.on = function (event, callback) {
		if (!(event in this.events)) {
			this.events[event] = [];
		}

		this.events[event].push(callback);
		return this;
	};

	events.prototype.off = function(event, callback) {
		// There's no such event.
		if (!(event in this.events)) {
			return;
		}

		for (var i = 0; i < this.events[event].length; i++) {
			if (this.events[event][i] === callback) {
				this.events[event].splice(i, 1);
			}
		}

		return this;
	};
	
	events.prototype.trigger = function(event) {
		var args = [];
		for (var i = 0; i < (arguments.length - 1); i++) {
			args[i] = arguments[i + 1];
		}

		if (event in this.events) {
			for (var j = 0; j < this.events[event].length; j++) {
				this.events[event][j].apply(this, args);
			}
		}

		return this;
	};

	events.prototype.clear = function(event) {
		if (event in this.events) {
			delete this.events[event];
		}

		return this;
	};

	return events;
}());