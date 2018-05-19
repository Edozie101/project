(function() {
	'use strict';

	angular
		.module('realestate.favorite-properties')
		.factory('favoritePropertiesService', favoritePropertiesService);

	favoritePropertiesService.$inject = ['localStorageService', 'propertiesService', '_'];

	/* @ngInject */
	function favoritePropertiesService(localStorageService, propertiesService, _) {
		var service = {
			addToFavorites: addToFavorites,
			removeFromFavorites: removeFromFavorites,
			isInFavorites: isInFavorites,
			getFavoriteProperties: getFavoriteProperties
		};
		return service;

		// ***************************************************************
		
		function getFavoriteProperties() {
			return propertiesService.getProperties().then(function(items) {
				var favorites = localStorageService.get('favorites') || [];
				return _.filter(items, function(item) {
					return favorites.indexOf(item.guid) >= 0;
				});
			});
		}
		
		function addToFavorites(propertyId) {
			var favorites = localStorageService.get('favorites') || [];
			if (favorites.indexOf(propertyId) === -1) {
				favorites.push(propertyId);
				localStorageService.set('favorites', favorites);
			}
		}
		
		function removeFromFavorites(propertyId) {
			var favorites = localStorageService.get('favorites') || [];
			var index = favorites.indexOf(propertyId);
			if (index >= 0) {
				favorites.splice(index, 1);
				localStorageService.set('favorites', favorites);
			}
		}
		
		function isInFavorites(propertyId) {
			var favorites = localStorageService.get('favorites') || [];
			return favorites.indexOf(propertyId) >= 0;
		}
	}
})();
