;(function(window, document, undefined) {

	function Base() {}

	Base.prototype.queryParams = function() {

	};

	var base = new Base();

	window.base = base;

})(window, document);

if (typeof module !== 'undefined') {
	module.exports = window.Ajax;
} else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.Ajax;
    });
}