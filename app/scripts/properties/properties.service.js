(function() {
	'use strict';

	angular
		.module('realestate.properties')
		.factory('propertiesService', propertiesService);

	propertiesService.$inject = ['dataService', '$q', '_'];

	/* @ngInject */
	function propertiesService(dataService, $q, _) {
		var service = {
			getProperties: getProperties,
			getPropertiesByCategory: getPropertiesByCategory,
			getProperty: getProperty,
			getCommon: getCommon,
			getCategories: getCategories
		};
		return service;

		// ***************************************************************

		function getCategories() {
			return dataService.getCategories().then(function(categories) {
				categories = ['All'].concat(_.sortBy(_.unique(categories)));
				return categories;
			});
		};

		function getProperties() {
			return dataService.getProperties();
		}

		function getPropertiesByCategory(category, intention) {
			return dataService.getPropertiesByCategory(category, intention);
		}

		function getProperty(propertyId) {
			return dataService.getProperty(propertyId);
		}

		function getCommon() {
			return dataService.getCommon();
		}
	}
})();
