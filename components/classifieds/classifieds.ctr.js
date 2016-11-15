(function(){
	"use strict";

	angular
		.module('ngClassifieds')
		.controller('classifiedsCtrl', function($scope, $http, $state, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {

			var vm = this;

			vm.categories;
			vm.classified;
			vm.classifieds;
			vm.deleteClassified = deleteClassified;
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
				saveClassified(classified);
			});

			$scope.$on('editSaved', function(event, classified) {
				saveEdit(classified);
			});

			$scope.$on('deleteClassified', function(event, classified) {
				deleteClassified(classified);
			});

			var contact = {
				name: "marc edwards",
				phone: "(513) 544-8803",
				email: "mdouglasedwards@gmail.com"
			}

			function openSidebar() {
				$state.go('classifieds.new');
			}

			function saveClassified(classified) {
				if (classified) {
					classified.contact = contact; // for now until we wire in user accounts
					$.ajax({
						url: 'https://api.mlab.com/api/1/databases/'+MLAB.database+'/collections/'+MLAB.collection+'?apiKey='+MLAB.api_key,
						data: JSON.stringify(classified),
						type: 'POST',
						contentType: 'application/json',
						success: function(data, textStatus, jqXhr) {
							//consol.log(data);
							if (data._id) {
								classified._id = data._id;
							}
							vm.classifieds.push(classified);
							vm.classified = {};
							showToast('Classified saved!', 'top, right', 3000);
						},
						eror: function(jqXhr, textStatus, errorThrown) {
							//console.log(errorThrown);
						}
					});
				}
			}

			function saveEdit(classified) {
				if (classified) {
					if (classified._id) {
						var dbId = classified._id['$oid'];
						delete classified._id;
						$.ajax({
							url: 'https://api.mlab.com/api/1/databases/'+MLAB.database+'/collections/'+MLAB.collection+'/'+dbId+'?apiKey='+MLAB.api_key,
							data: angular.toJson(classified), // use angular method to remove any '$$' hash keys, which the db api doesn't like
							type: 'PUT',
							contentType: 'application/json',
							success: function(data, textStatus, jqXhr) {
								//console.log(data)
								//vm.editing = false;
								//vm.classified = {}; // reset the form
								showToast('Classified updated!', 'top, right', 3000);
							},
							eror: function(jqXhr, textStatus, errorThrown) {
								console.log(errorThrown);
							}
						});
					}
				}
			}

			function deleteClassified(classified) {
				var index = vm.classifieds.indexOf(classified);
				vm.classifieds.splice(index, 1);
				showToast('Classified deleted!', 'top, right', 3000);
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
