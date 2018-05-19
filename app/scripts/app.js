// angular.module is a global place for creating, registering and retrieving Angular modules
// 'realestate' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'realestate.controllers' is found in controllers.js
angular.module('realestate', [
	'ionic',
	'ionic.service.core',
	'ionic.service.push',
	'ngCordova',
	'firebase',

	'config',
	'gMaps',

	'realestate.map',
	'realestate.properties',
	'realestate.favorite-properties',
	'realestate.push',
	'realestate.menu',
	'realestate.contact-us'
])

.value('_', window._)

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)

		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.config(function($urlRouterProvider) {
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/properties/rent');
});
