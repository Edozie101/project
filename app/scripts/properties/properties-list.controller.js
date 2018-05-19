(function() {
	'use strict';

	angular
		.module('realestate.properties')
		.controller('PropertiesListController', PropertiesListController);

	PropertiesListController.$inject = ['$state', 'propertiesService', 'distanceService', 'filterModal', '_'];

	/* @ngInject */
	function PropertiesListController($state, propertiesService, distanceService, filterModal, _) {
		var intention = $state.$current.name.indexOf('.rent') > 0 ? 'rent' : 'sale';

		var vm = angular.extend(this, {
			intention: intention,
			categories: null,
			selectedCategory: 'All',
			sortBy: 'title',
			properties: [],
			navigate: navigate,
			filterByCategory: filterByCategory,
			showFilter: showFilter
		});

		(function activate() {
			getProperties();
			getCategories()
		})();

		// ********************************************************************

		function getCategories() {
			propertiesService.getCategories().then(function(categories) {
				vm.categories = categories;
			});
		}

		function applyFilters() {
			filterModal.hide();

			var scope = filterModal.scope;
			vm.selectedCategory = scope.vm.selectedCategory;
			vm.sortBy = scope.vm.sortBy;
			getProperties();
		}

		function showFilter() {
			var scope = filterModal.scope;
			scope.vm = {
				categories: vm.categories,
				selectedCategory: vm.selectedCategory,
				sortBy: vm.sortBy,
				applyFilters: applyFilters
			};

			filterModal.show();
		}

		function filterByCategory(category) {
			vm.selectedCategory = category;
			getProperties();
		}

		function getProperties() {
			propertiesService.getPropertiesByCategory(vm.selectedCategory, vm.intention)
				.then(function(properties) {
					vm.properties = properties;
					return properties
				})
				.then(getDistances);
		}

		function navigate(propertyId) {
			var state = 'app.properties.property-' + intention.toLowerCase();
			$state.go(state, { propertyId: propertyId });
		}

		function getDistances(properties) {
			var origins = _.map(properties, function(property) {
				return property.mapdata.annotations[0];
			})
			distanceService.getDistancesToOrigins(origins).then(function(distances) {
				for (var i = 0; i < properties.length; i++) {
					properties[i].distance = distances[i];
				}
			});
		}
	}
})();
