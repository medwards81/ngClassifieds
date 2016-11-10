(function(){
	"use strict";

	angular
		.module('ngClassifieds')
		.controller('classifiedsCtrl', function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast) {

			classifiedsFactory.getClassifieds().then(function(classifieds) {
				//console.log(classifieds.data);
				$scope.classifieds = classifieds.data;
			});

			var contact = {
				name: "marc edwards",
				phone: "(513) 544-8803",
				email: "mdouglasedwards@gmail.com"
			}

			$scope.openSidebar = function() {
				$mdSidenav('left').open();
			}

			$scope.closeSidebar = function() {
				$mdSidenav('left').close();
			}

			$scope.saveClassified = function(classified) {
				if (classified) {
					classified.contact = contact;
					$scope.classifieds.push(classified);
					$scope.classified = {};
					$scope.closeSidebar();
					$mdToast.show(
						$mdToast.simple()
							.content('Classified Saved!')
							.position('top, right')
							.hideDelay(3000)
					);
				}
			}
		});
})();
