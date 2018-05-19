(function() {
	'use strict';

	angular
		.module('realestate.common')
		.factory('distanceService', distanceService);

	distanceService.$inject = ['$cordovaGeolocation', 'convert', 'geolib', '_', 'ENV'];

	/* @ngInject */
	function distanceService($cordovaGeolocation, convert, geolib, _, ENV) {
		var service = {
			getDistanceToOrigin: getDistanceToOrigin,
			getDistancesToOrigins: getDistancesToOrigins
		};
		return service;
		
		// ********************************************************

		function getDistancesToOrigins(origins) {
			return getCurrentPosition()
				.then(function(position) {
					return _.map(origins, function(origin) {
						return !origin ? '' : getDistance(origin, position);
					});
				});
		}

		function getDistanceToOrigin(origin) {
			return getCurrentPosition()
				.then(function(position) {
					return getDistance(origin, position);
				});
		}

		function getDistance(origin, position) {
			if (typeof origin === 'string') {
				origin = origin.split(',');
				origin = {
					latitude: origin[0],
					longitude: origin[1]
				};
			}

			var distance = geolib.getDistance({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			}, origin);

			if (ENV.metric === 'km') {
				if (distance < 1000) {
					distance = distance + ' m';
				} else {
					distance = convert(distance, 'meters', {
						precision: 2
					}).toKilometers() + ' km';
				}
			} else {
				distance = convert(distance, 'meters', {
					precision: 2
				}).toMiles() + ' miles';
			}
			return distance;
		}

		function getCurrentPosition() {
			var posOptions = {
				enableHighAccuracy: true
			};

			return $cordovaGeolocation
				.getCurrentPosition(posOptions);
		}
	}
})();
