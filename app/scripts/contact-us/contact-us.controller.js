(function() {
	'use strict';

	angular
		.module('realestate.contact-us')
		.controller('ContactUsController', ContactUsController);

	ContactUsController.$inject = [
		'property', 'externalAppsService', '$cordovaEmailComposer', '_'];

	/* @ngInject */
	function ContactUsController(
		property, externalAppsService, $cordovaEmailComposer, _) {
		var vm = angular.extend(this, {
			property: property,
			sendEmail: sendEmail,
			openWebsite: openWebsite
		});

		(function activate() {
			loadMapdata()
		})();

		// **********************************************************************

		function loadMapdata() {
			var origin = property.mapdata.annotations[0];
			if (origin) {
				vm.location = {
					origin: {
						lat : origin.latitude,
						lon : origin.longitude
					},
					markers: []
				};
				_.each(property.mapdata.annotations, function(annotation) {
					vm.location.markers.push({
						lat: annotation.latitude,
						lon: annotation.longitude,
						name: annotation.title
					});
				});
			}
		}

		function sendEmail() {
			$cordovaEmailComposer.isAvailable().then(function() {
				var email = {
					to: property.contact.email,
					subject: 'Cordova Icons',
					body: 'How are you? Nice greetings from Leipzig'
				};

				$cordovaEmailComposer.open(email);
			});
		}

		function openWebsite() {
			externalAppsService.openExternalUrl(property.contact.web);
		}
	}
})();
