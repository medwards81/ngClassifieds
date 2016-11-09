(function(){
	"use strict";

	angular
		.module('ngClassifieds')
		.controller('classifiedsCtrl', function($scope, $http, classifiedsFactory) {
			
			classifiedsFactory.getClassifieds().then(function(classifieds) {
				//console.log(classifieds.data);
				$scope.classifieds = classifieds.data;
			});
		})

})();
