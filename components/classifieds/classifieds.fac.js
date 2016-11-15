(function(){
	"use strict";

	angular
		.module('ngClassifieds')
		.factory('classifiedsFactory', function($http) {

			function getClassifieds() {
				//return $http.get('data/classifieds.json');
				return $http.get('https://api.mlab.com/api/1/databases/classifieds/collections/classifieds?apiKey='+MLAB.api_key);
			}

			return {
				getClassifieds: getClassifieds
			}
		});
})();
