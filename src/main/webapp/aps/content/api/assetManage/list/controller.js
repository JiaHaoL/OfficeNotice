(function() {
    define([], function() {
        return [
            '$scope','httpService','config','params','$routeParams','eventBusService','controllerName','loggingService', 
            function($scope,$httpService,config,params,$routeParams,eventBusService,controllerName,loggingService) {
            	$scope.form={};
            	
            	//查询
            	$scope.find=function(){
            		$scope.form.page = JSON.stringify($scope.page);
            		$httpService.post(config.findAssetManageinfoURL, $scope.form).success(function(data) {
            			$scope.dataList = data.data;
            			console.log(data);
                        PAGE.buildPage($scope,data);
            		})	
            	}

 	            $scope.select = function(){
 	            	$scope.page.current = 1;
 	            	$scope.find();
 	            }
 	            PAGE.iniPage($scope);
            	
 	         //接收刷新事件
	            eventBusService.subscribe(controllerName, 'appPart.data.reload', function(event, data) {
	            	$scope.find();
	            });
            	
            	
	            /**
                 * 删除
                 */
                eventBusService.subscribe(controllerName, controllerName+'.delete', function(event, ojb) {
                	var ExamId=null;
                    var values = [];
	              	$('#'+controllerName+' input[name="dataPk"]:checked').each(function(){ 
	              		values.push($(this).val());
	              	});
	              	
	              	
	              	if(values.length < 1){
	              		eventBusService.publish(controllerName,'appPart.load.modal.alert', {"title":"操作提示","content":"请选择一条数据。"});
	              	}else if(values.length > 1){
	              		eventBusService.publish(controllerName,'appPart.load.modal.alert', {"title":"操作提示","content":"不能同时删除多行数据，请选择一条数据。"});
	              	}else{
		              	if(confirm("是否确认删除！")){
		              		$httpService.post(config.deleteAssetinfoURL,{"SC_ASSET_MANAG_PK":values[0]}).success(function(data) {
	                    		$scope.select();
		                     }).error(function(data) {
		                         loggingService.info('删除 出错');
		                     });
		              	}
	              	}
                	
                });
            	

            	/**
                 * 添加
                 */
                eventBusService.subscribe(controllerName, controllerName+'.add', function(event, ojb) {
                		var m2 = {
    						"url" : "aps/content/api/assetManage/add/config.json",
    						text:"新增资产",
    						size:"modal-lg",
    						"contentName" : "modal"
    					}
    					eventBusService.publish(controllerName,'appPart.load.modal', m2);
                });
            	
            	
                /**
                 * 修改
                 */
                eventBusService.subscribe(controllerName, controllerName+'.update', function(event, ojb) {
             	  var values = [];
	              	$('#'+controllerName+' input[name="dataPk"]:checked').each(function(){ 
	              		values.push($(this).val());
	              	});
	              	
	              	
	              	if(values.length < 1){
	              		eventBusService.publish(controllerName,'appPart.load.modal.alert', {"title":"操作提示","content":"请选择一条数据。"});
	              	}else if(values.length > 1){
	              		eventBusService.publish(controllerName,'appPart.load.modal.alert', {"title":"操作提示","content":"不能同时修改多行数据，请选择一条数据。"});
	              	}else{
	              		

 	               var m2 = {
 							"url" : "aps/content/api/assetManage/update/config.json?pk="+values[0],
 							text:"修改资产",
 							size:"modal-lg",
 							"contentName" : "modal"
 						}
 						eventBusService.publish(controllerName,'appPart.load.modal', m2);
	              	}
 	            });
                
           		

               
            	
    
            	
            	
            	
                
          
         
            
     
	       
            }
        ];
    });
}).call(this);
