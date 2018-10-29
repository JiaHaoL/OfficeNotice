(function() {
    define([], function() {
        return [
            '$scope','httpService','config','params','$routeParams','eventBusService','controllerName','loggingService', 
            function($scope,$httpService,config,params,$routeParams,eventBusService,controllerName,loggingService) {
            	
            	$scope.docInfo = {};
            	$httpService.post(config.findByIdURL, {"DOCID":$routeParams.pk}).success(function(data) {
					if(data.code == "0000") {
						$scope.docInfo =  data.data;
						console.log($scope.docInfo);
						$scope.$apply();
					}
				});
            	
            	
            }
        ];
    });
}).call(this);
