(function() {
	'use strict';

	angular
		.module('realestate.favorite-properties')
		.controller('FavoritePropertiesController', FavoritePropertiesController);

	FavoritePropertiesController.$inject = ['$state', 'favoritePropertiesService', '_', '$ionicHistory'];

	/* @ngInject */
	function FavoritePropertiesController($state, favoritePropertiesService, _, $ionicHistory) {
		var vm = angular.extend(this, {
			properties: [],
			navigate: navigate,
			deleteFromFavorites: deleteFromFavorites
		});

		(function activate() {
			getProperties();
		})();

		// ********************************************************************

		function deleteFromFavorites(property) {
			favoritePropertiesService.removeFromFavorites(property.guid);
			var t = _.remove(vm.properties, function(item) {
				return item.guid === property.guid;
			});
			
			console.log(t);
		}

		function getProperties() {
			favoritePropertiesService.getFavoriteProperties()
				.then(function(properties) {
					vm.properties = properties;
				});
		}

		function navigate(propertyId) {
			var state = 'app.property';

			var current = $ionicHistory.currentStateName();
			if (current !== 'app.favorite-properties') {
				state = current.substring(0, current.length - 10);
			}

			$state.go(state, { propertyId: propertyId });
		}
	}
})();