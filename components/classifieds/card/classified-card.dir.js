(function(){
    angular
        .module('ngClassifieds')
        .directive('classifiedCard', function(){
            return {
                templateUrl: 'components/classifieds/card/classified-card.tpl.html',
                scope: {
                    classifieds: '=classifieds',
                    classifiedsFilter: '=classifiedsFilter',
                    category: '=category'
                },
                controller: classifiedCardController,
                controllerAs: 'vm'
            }

            function classifiedCardController($state, $scope, $mdDialog) {

                var vm = this;

                vm.editClassified = editClassified;
                vm.deleteClassified = deleteClassified;

                function editClassified(classified) {
    				$state.go('classifieds.edit', {
    					id: classified.id,
    					classified: classified
    				});
    			}

                function deleteClassified(event, classified) {
    				var confirm = $mdDialog.confirm()
    					.title('Are you sure you want to delete ' + classified.title + '?')
    					.ok('Yes')
    					.cancel('No')
    					.targetEvent(event);
    				$mdDialog.show(confirm).then(function() {
    					var index = vm.classifieds.indexOf(classified);
    					vm.classifieds.splice(index, 1);
    				}, function() {
    					// If cancel
    				});
    			}

                function showToast(message, pos, delay) {
    				$mdToast.show(
    					$mdToast.simple()
    						.content(message)
    						.position(pos)
    						.hideDelay(delay)
    				);
    			}
            }
        })
})();
