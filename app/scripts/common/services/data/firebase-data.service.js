(function() {
	'use strict';

	angular
		.module('realestate.common')
		.factory('db', ['ENV', function(ENV) {
			firebase.initializeApp(ENV.firebaseConfig);
			return firebase.database().ref();
		}])
		.factory('firebaseDataService', firebaseDataService);

	firebaseDataService.$inject = ['_', 'db', '$firebaseArray', '$firebaseObject'];

	/* @ngInject */
	function firebaseDataService(_, db, $firebaseArray, $firebaseObject) {
		var service = {
			getPropertiesByCategory: getPropertiesByCategory,
			getProperties: getProperties,
			getProperty: getProperty,
			getCategories: getCategories,
			getCommon: getCommon
		};
		return service;

		// ***********************************************************

		function getProperties() {
			var query = db.child('properties');
			return $firebaseArray(query).$loaded().then(initArray);
		}

		function getPropertiesByCategory(category, intention) {
			var query = db.child('properties');

			if (category !== 'All') {
				query = query.orderByChild('category').equalTo(category);
			}

			return $firebaseArray(query).$loaded()
				.then(function(properties) {
					return _.filter(properties, function(property) {
						return property.intention.toLowerCase() === intention;
					})
				})
				.then(initArray);
		}

		function getProperty(propertyId) {
			var query = db.child('properties/' + propertyId);
			return $firebaseObject(query).$loaded()
				.then(initItem)
				.then(adjustFeatures);
		}

		function getCategories() {
			var query = db.child('properties');
			return $firebaseArray(query).$loaded().then(function(properties) {
				return _.map(properties, function(property) {
					return property.category;
				});
			});
		}

		function getCommon() {
			var query = db.child('common');
			return $firebaseObject(query).$loaded().then(initItem);
		}

		function initItem(item) {
			return angular.extend({}, item, {
				guid: item.$id
			});
		}

		function initArray(array) {
			return _.map(array, initItem);
		}

		function adjustFeatures(item) {
			item.features = _.filter(item.features, function(group) {
				return !!group.title;
			});
			return item;
		}
	}
})();
