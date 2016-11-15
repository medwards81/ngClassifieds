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

            function classifiedCardController($state, $scope, $mdDialog, $mdToast) {

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
    					.title("Are you sure you want to delete '" + classified.title + "'?")
    					.ok('Yes')
    					.cancel('No')
    					.targetEvent(event);
    				$mdDialog.show(confirm).then(function() {
                        var dbId = classified._id['$oid'];
                        if (dbId) {
                            $.ajax({
    							url: 'https://api.mlab.com/api/1/databases/'+MLAB.database+'/collections/'+MLAB.collection+'/'+dbId+'?apiKey='+MLAB.api_key,
    							type: 'DELETE',
    							contentType: 'application/json',
    							success: function(data, textStatus, jqXhr) {
                                    $scope.$emit('deleteClassified', classified);
    							},
    							eror: function(jqXhr, textStatus, errorThrown) {
    								console.log(errorThrown);
    							}
    						});
                        }
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
