(function() {
	'use strict';

	angular
		.module('realestate.common')
		.factory('dataService', dataService);

	dataService.$inject = ['ENV', '$injector'];

	/* @ngInject */
	function dataService(ENV, $injector) {
		switch(ENV.dataProvider) {
			case 'LOCAL':
				return $injector.get('localDataService');
			case 'REMOTE':
				return $injector.get('remoteDataService');
			case 'FIREBASE':
				return $injector.get('firebaseDataService');
		}
		
		throw new Error('Data provider is not valid');
	}
})();
