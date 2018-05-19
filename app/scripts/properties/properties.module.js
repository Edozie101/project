(function() {
	'use strict';

	var propertyResolve = {
		property: function($stateParams, propertiesService) {
			return propertiesService.getProperty($stateParams.propertyId);
		}
	};

	var propertyView = {
		templateUrl: 'scripts/properties/property.html',
		controller: 'PropertyController as vm',
		resolve: propertyResolve
	};

	var propertiesView = {
		templateUrl: 'scripts/properties/properties-list.html',
		controller: 'PropertiesListController as vm'
	};

	angular
		.module('realestate.properties', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.properties', {
					url: '/properties',
					abstract: true,
					views: {
						'menuContent': {
							templateUrl: 'scripts/properties/properties.html'
						}
					},
					resolve: {
						filterModal: function($ionicModal, $rootScope) {
							return $ionicModal.fromTemplateUrl('scripts/properties/properties-filter.html', {
								scope: $rootScope,
								animation: 'slide-in-up'
							});
						}
					}
				})
				.state('app.properties.rent', {
					url: '/rent',
					views: { 'tab-rent': propertiesView }
				})
				.state('app.properties.sale', {
					url: '/sale',
					views: { 'tab-sale': propertiesView }
				})
				.state('app.properties.property-rent', {
					url: '/rent/:propertyId',
					views: { 'tab-rent': propertyView }
				})
				.state('app.properties.property-sale', {
					url: '/sale/:propertyId',
					views: { 'tab-sale': propertyView }
				})
				.state('app.property', {
					url: '/properties/:propertyId',
					views: { 'menuContent': propertyView }
				});
			;
		});
})();