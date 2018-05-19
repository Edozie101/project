(function() {
	'use strict';

	var favoritesView = {
		templateUrl: 'scripts/favorites/favorite-properties.html',
		controller: 'FavoritePropertiesController as vm'
	};

	angular
		.module('realestate.favorite-properties', [
			'ionic',
			'ngCordova',
			'LocalStorageModule',
			'realestate.common',
			'ionic-toast'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.favorite-properties', {
					url: '/favorite-properties/:random',
					views: { 'menuContent': favoritesView }
				})
				.state('app.properties.property-rent-favorites', {
					url: '/favorite-properties/:random',
					views: { 'tab-rent': favoritesView }
				})
				.state('app.properties.property-sale-favorites', {
					url: '/favorite-properties/:random',
					views: { 'tab-sale': favoritesView }
				})
		});
})();
