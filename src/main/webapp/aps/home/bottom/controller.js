(function() {
    define([], function() {
        return [
            '$scope','$location','httpService','config','params','$routeParams','eventBusService','controllerName','loggingService', 
            function($scope,$location,$httpService,config,params,$routeParams,eventBusService,controllerName,loggingService) {
            
            		
            	$httpService.post(config.getUserInfoURL, {}).success(function(data) {
        			$scope.userInfo = data.data;
        			$scope.$apply();
	            });
            	
            	$httpService.post(config.getChannelListURL, {}).success(function(data) {
        			$scope.channels = data.data;
        			$scope.$apply();
	            });
            	
            	
            	$scope.logout = function(){
            		window.location.href = "logout.jsp?rand="+Math.random();
            	}
            	
            	//模糊查询文字
            	$scope.search = function (){
            		var docwz = $scope.DOCWZ;
            		if(docwz =="" || docwz ==undefined || docwz == null){
            			return ;
            		}else{
            			var href = "./search/"+docwz ;
            			console.log(docwz);
                		window.open(href);
            			//window.location.href = href ;
            		}
            		
            	}
            
            	
            }
        ];
    });
}).call(this);
