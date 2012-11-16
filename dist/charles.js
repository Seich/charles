/*! charles - v0.1.0 - 2012-11-16
* https://github.com/seich/charles
* Copyright (c) 2012 Sergio Diaz; Licensed MIT */

var charles;
(function (charles) {
  charles.build = (function () {
    function build(fields, methods) {

    }

    return build;
  }());
  charles.events = (function () {
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

    events.prototype.off = function (event, callback) {
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

    events.prototype.trigger = function (event) {
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

    events.prototype.clear = function (event) {
      if (event in this.events) {
        delete this.events[event];
      }

      return this;
    };

    return events;
  }());
  charles.observe = (function () {
    function observe(obj) {
      this.obj = obj;
      this.events = new charles.events();
    }

    observe.prototype.attr = function (attr, value) {
      var newValue = value;
      var oldValue = this.obj[attr];

      // Are we creating a new attribute or setting the value of an old one?
      var how = typeof oldValue === "undefined" ? "create" : "set";

      this.obj[attr] = value;
      this.events.trigger("change", attr, how, newValue, oldValue);
      this.events.trigger(attr, newValue, oldValue);

      return this;
    };

    observe.prototype.removeAttr = function (attr) {
      delete this.obj[attr];
      return this;
    };

    observe.prototype.bind = function (eventType, callback) {
      this.events.on(eventType, callback);
      return this;
    };

    observe.prototype.unbind = function (eventType, callback) {
      this.events.off(eventType, callback);
      return this;
    };

    observe.prototype.each = function (callback) {
      for (var attr in this.obj) {
        if (this.obj.hasOwnProperty(attr)) {
          callback(attr, this.obj[attr]);
        }
      }

      return this;
    };

    return observe;
  }());
}()); //hi