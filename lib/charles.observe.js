charles.observe = (function() {
	function observe(obj) {
		this.obj = obj || {};
		this.events = new charles.events();
	}

	observe.prototype.attr = function(attr, value) {
		if (typeof value === "undefined") {
			return this.obj[attr];
		}

		var newValue = value;
		var oldValue = this.obj[attr];

		// Are we creating a new attribute or setting the value of an old one?
		var how = typeof oldValue === "undefined" ? "create" : "set";

		this.obj[attr] = value;
		this.events.trigger("change", attr, how, newValue, oldValue);
		this.events.trigger(attr, newValue, oldValue);

		return this;
	};

	observe.prototype.removeAttr = function(attr) {
		delete this.obj[attr];
		return this;
	};

	observe.prototype.bind = function(eventType, callback) {
		this.events.on(eventType, callback);
		return this;
	};

	observe.prototype.unbind = function(eventType, callback) {
		this.events.off(eventType, callback);
		return this;
	};

	observe.prototype.each = function(callback) {
		for (var attr in this.obj) {
			if (this.obj.hasOwnProperty(attr)) {
				callback(attr, this.obj[attr]);
			}
		}

		return this;
	};

	return observe;
}());