(function() {
	'use strict';

	angular
		.module('realestate.properties')
		.controller('PropertyController', PropertyController);

	PropertyController.$inject = [
		'property', 'externalAppsService', 'distanceService', '$state', 'favoritePropertiesService',
		'ionicToast', '$ionicHistory'];

	/* @ngInject */
	function PropertyController(
		property, externalAppsService, distanceService, $state, favoritePropertiesService, ionicToast,
		$ionicHistory) {
		var vm = angular.extend(this, {
			currentDateTime: (new Date()).format('dddd HH:MM'),
			hasMapdata: property.mapdata.annotations[0],
			property: {
				code: property.code,
				title: property.title,
				price: property.price,
				intention: property.intention,
				distance: null,
				pictures: property.pictures,
				name: property.name,
				category: property.category,
				features: property.features,
				isInFavorites: favoritePropertiesService.isInFavorites(property.guid)
			},
			showFavorites: showFavorites,
			getDirections: getDirections,
			toggleFavorites: toggleFavorites,
			showContactUs: showContactUs
		});

		(function activate() {
			setDistanceToOrigin();
		})();

		// *************************************************************

		function toggleFavorites() {
			vm.property.isInFavorites = !vm.property.isInFavorites;
			if (vm.property.isInFavorites) {
				favoritePropertiesService.addToFavorites(property.guid);
				ionicToast.show('\'' + vm.property.title + '\' has been added to your Favorites', 'bottom', false, 2000);
			} else {
				favoritePropertiesService.removeFromFavorites(property.guid);
				ionicToast.show('\'' + vm.property.title + '\' has been removed from your Favorites', 'bottom', false, 2000);
			}
		}

		function showContactUs() {
			var currentState = $ionicHistory.currentStateName();
			var state = currentState + '-' + 'contact-us';

			$state.go(state, {
				propertyId: property.guid
			});
		}

		function showFavorites() {
			var state = 'app.favorite-properties';
			if ($ionicHistory.currentStateName() !== 'app.property') {
				state = $ionicHistory.currentStateName() + '-' + 'favorites';
			}

			$state.go(state, {
				random: (new Date()).getTime()
			});
		}

		function setDistanceToOrigin() {
			if (vm.hasMapdata) {
				distanceService.getDistanceToOrigin(property.mapdata.annotations[0]).then(function(distance) {
					vm.property.distance = distance;
				});
			}
		}

		function getDirections() {
			externalAppsService.openMapsApp(property.mapdata.annotations[0]);
		}
	}
})();
