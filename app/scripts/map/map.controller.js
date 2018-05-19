(function() {
	'use strict';

	angular
		.module('realestate.map')
		.controller('MapController', MapController);

	MapController.$inject = ['common', 'pins', '_'];

	/* @ngInject */
	function MapController(common, pins, _) {
		var vm = angular.extend(this, {
			origin: {
				lat: common.map.origin.latitude,
				lon: common.map.origin.longitude
			},
			zoom: common.map.zoomLevel,
			markers: loadPoints()
		});

		// ******************************************************************

		function loadPoints() {
			var markers = [];
			_.each(pins, function(pin) {
				markers.push({
					name: pin.title + getBusinessLink(pin.propertyId),
					lat: pin.lat,
					lon: pin.lon
				});
			});
			return markers;
		}

		function getBusinessLink(propertyId) {
			return '<br> <a href="#/app/properties/' + propertyId + '">More details</a>';
		}
	}
})();
