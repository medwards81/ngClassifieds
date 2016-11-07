(function(){
	"use strict";

	angular
		.module('ngClassifieds')
		.controller('classifiedsCtrl', function($scope) {
			$scope.classified = {
				title: "First Item",
				price: "$1,000,000",
				description: "Lorem ipsum dolor sit amet"
			};

			$scope.message = "Hello, World!";
		})

})();