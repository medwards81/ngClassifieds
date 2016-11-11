(function(){
	"use strict";

	angular
		.module('ngClassifieds')
		.controller('classifiedsCtrl', function($scope, $http, $state, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {

			var vm = this;

			vm.categories;
			vm.classified;
			vm.classifieds;
			vm.closeSidebar = closeSidebar;
			vm.editing;
			vm.openSidebar = openSidebar;
			vm.saveClassified = saveClassified;
			vm.saveEdit = saveEdit;

			classifiedsFactory.getClassifieds().then(function(classifieds) {
				//console.log(classifieds.data);
				vm.classifieds = classifieds.data;
				vm.categories = getCategories(vm.classifieds);
			});

			$scope.$on('newClassified', function(event, classified) {
				classified.id = vm.classifieds.length + 1;
				vm.classifieds.push(classified);
				showToast('Classified saved', 'top, right', 3000);
			});

			$scope.$on('editSaved', function(event, message) {
				showToast(message, 'top, right', 3000);
			});

			var contact = {
				name: "marc edwards",
				phone: "(513) 544-8803",
				email: "mdouglasedwards@gmail.com"
			}

			function openSidebar() {
				$state.go('classifieds.new');
			}

			function closeSidebar() {
				$mdSidenav('left').close();
			}

			function saveClassified(classified) {
				if (classified) {
					classified.contact = contact;
					vm.classifieds.push(classified);
					vm.classified = {};
					closeSidebar();
					showToast('Classified saved!', 'top, right', 3000)
				}
			}

			function saveEdit() {
				vm.editing = false;
				vm.classified = {}; // reset the form
				closeSidebar();
				showToast('Classified updated!', 'top, right', 3000);
			}

			function showToast(message, pos, delay) {
				$mdToast.show(
					$mdToast.simple()
						.content(message)
						.position(pos)
						.hideDelay(delay)
				);
			}

			function getCategories(classifieds) {
				var categories = [];

				angular.forEach(classifieds, function(item) {
					angular.forEach(item.categories, function(category) {
						categories.push(category);
					});
				});

				return _.uniq(categories);
			}
		});
})();
