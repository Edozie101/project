(function() {
	'use strict';

	var contactUsView = {
		templateUrl: 'scripts/contact-us/contact-us.html',
		controller: 'ContactUsController as vm'
	};

	var resolvePropertyFunction = function($stateParams, propertiesService) {
		return propertiesService.getProperty($stateParams.propertyId);
	}


	angular
		.module('realestate.contact-us', [
			'ionic',
			'ngCordova',
			'realestate.common'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.properties.property-rent-contact-us', {
					url: '/contact-us/:propertyId',
					views: { 'tab-rent': contactUsView	},
					resolve: {
						property: resolvePropertyFunction
					}
				})
				.state('app.properties.property-sale-contact-us', {
					url: '/contact-us/:propertyId',
					views: { 'tab-sale': contactUsView	},
					resolve: {
						property: resolvePropertyFunction
					}
				})
		});
})();
