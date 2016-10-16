(function(window, document, undefined) {

	function picDrag() {

	}

	window.picDrag = picDrag;

})(window, document);

if (typeof module !== 'undefined') {
	module.exports = window.WaterFull;
} else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.WaterFull;
    });
}