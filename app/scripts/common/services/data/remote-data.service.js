(function () {
	'use strict';

	angular
		.module('realestate.common')
		.factory('remoteDataService', remoteDataService);

	remoteDataService.$inject = ['$http', 'ENV', '_', '$q'];

	/* @ngInject */
	function remoteDataService($http, ENV, _, $q) {
		var common;
		var properties;

		var commonUrl = ENV.apiUrl + 'common.json';
		var propertiesUrl = ENV.apiUrl + 'properties.json';

		var service = {
			getPropertiesByCategory: getPropertiesByCategory,
			getProperties: getProperties,
			getProperty: getProperty,
			getCategories: getCategories,
			getCommon: getCommon
		};

		return service;

		function getPropertiesByCategory(category, intention) {
			var promise;

			if (properties) {
				promise = $q.when(properties);
			} else {
				promise = getProperties();
			}

			return promise.then(function(properties) {
				return _.filter(properties, function(property) {
					return (category === 'All' || property.category === category)
						&& property.intention.toLowerCase() === intention;
				});
			});
		}

		function getProperty(propertyId) {
			var promise;

			if (properties) {
				promise = $q.when(properties);
			} else {
				promise = getProperties();
			}

			return promise.then(function(properties) {
				var property = _.find(properties, function(property) {
					return property.guid === propertyId;
				});

				adjustFeatures(property);
				return property;
			});
		}

		function getCategories() {
			return getProperties().then(function(properties) {
				var categories = _.map(properties, function (property) {
					return property.category;
				});
				return categories;
			});
		}

		function getProperties() {
			return $http.get(propertiesUrl).then(function(response) {
				properties = response.data.result;
				return properties;
			});
		}

		function getCommon() {
			return $http.get(commonUrl).then(function(response) {
				common = response.data.result;
				return common;
			});
		}

		function adjustFeatures(item) {
			item.features = _.filter(item.features, function(group) {
				return !!group.title;
			});
			return item;
		}
	}
})();
