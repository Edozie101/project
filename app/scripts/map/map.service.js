(function() {
	'use strict';

	angular
		.module('realestate.map')
		.factory('mapService', mapService);

	mapService.$inject = ['_', 'propertiesService'];

	/* @ngInject */
	function mapService(_, propertiesService) {
		var pins;

		var service = {
			getPins: getPins,
			getCommon: getCommon
		};
		return service;

		// ***************************************************************

		function getPins() {
			return propertiesService.getProperties().then(function(properties) {
				pins = [];
				_.each(properties, function(property) {
					if (property.mapdata && property.mapdata.annotations) {
						_.each(property.mapdata.annotations, function(annotation) {
							pins.push({
								title: property.title + '. ' + annotation.title,
								lat: annotation.latitude,
								lon: annotation.longitude,
								propertyId: property.guid
							});
						});
					}
				});
				return pins;
			});
		}

		function getCommon() {
			return propertiesService.getCommon();
		}
	}
})();
