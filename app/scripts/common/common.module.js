(function() {
	'use strict';

	angular
		.module('realestate.common', ['ionic'])
		.value('geolib', window.geolib)
		.value('convert', window.convert);
})();