(function() {
    define(['swfobject','uploadify','uploadauto'], function() {
        return [
            '$scope','httpService','config','params','$routeParams','eventBusService','controllerName','loggingService', 
            function($scope,$httpService,config,params,$routeParams,eventBusService,controllerName,loggingService) {
            	$httpService.css("assets/css/uploadify.css");
            	//'swfobject','uploadify','uploadauto'
            	//初始化 form 表单
            	$scope.form={};
            	$scope.form.CLASS_INFO_PK=params.CLASS_INFO_PK;
            	var uploadfiletype ='.png,jpg';
            	var uploadapp="jky";
            	var UserID= "";
            	var url=config.uploadurl;
            	
            	var findInfo=function(){
            		$httpService.post(config.findByIdURL,{"CLASS_INFO_PK":params.CLASS_INFO_PK}).success(function(data) {
                		$scope.form=data.data;
                		$scope.$apply();
    	            });
            		findClassList();
            	}
            	
            	
            	var findClassList=function(){
            		$httpService.post(config.findAllClassURL,{"UNIT_PK":params.pk}).success(function(data) {
                		$scope.classList=data.data;
                		$scope.$apply();
    	            });
            	}
        		//附件上传（回调函数）
            	var callonComplete = function(event, queueID, fileObj, response, dataObj) {
              	    //转换为json对象
                	console.log(response);
                	var data = eval("("+response+")");
                	if(data.code == "4444"){
                		eventBusService.publish(controllerName,'appPart.load.modal.alert', {"title":"操作提示","content":"不支持此类型文件的上传!"});
                		return;
                	}
                   if(data.code == "0000"){
                	   $scope.form.LOG_BIG_URL = data.data.FILE_PATH;
                	   $scope.form.FK_FILE=data.data.RES_FILE_LINK_PK;
                	   $scope.form.EXTNAME=data.data.EXTNAME;
                	   $('#'+controllerName+' .uploadfile').show();
                       $('#'+controllerName+' .uploadresult').show();
                       $('#'+controllerName+' .uploadfile').html(data.data.ORI_FILENAME+"."+data.data.EXTNAME);
                   }
                    
                };
            	//初始化数据
            	var init = function(){
            		findInfo();
            		UPLOADAUTO.iniUploadauto($('#uploadifyfile'),uploadfiletype,uploadapp,"0",UserID,url,callonComplete);
            		
            	}
            	init();
        		
            	
            	$scope.save=function(){
            		$scope.form.UNIT_PK=params.pk;
            		$httpService.post(config.updateURL,$scope.form).success(function(data) {
                    	if(data.code != '0000'){
                    		loggingService.info(data.msg);
                    	}else{
                    		eventBusService.publish(controllerName,'appPart.load.modal.alert', {"title":"操作提示","content":"修改成功！"});
                    		eventBusService.publish(controllerName,'appPart.data.reload', {"scope":"site"});//发送更新事件，刷新数据
                    		$scope.goback();
                    	}
                     }).error(function(data) {
                         loggingService.info('修改出错！');
                     });
            	}
        		//返回上一页
        		$scope.goback = function() { 
	         		var menu = {
	         		    "CONTROLLER_NAME": "classSet", 
	         		    "CREATE_BY": "SJAAAAX44858", 
	         		    "CREATE_TIME": 1508169600000, 
	         		    "MENU_CODE": "0000730302", 
	         		    "MENU_FATHER_PK": "d301ac4a1bb3450aa47151cc56f933ea", 
	         		    "MENU_IMG": "file", 
	         		    "MENU_LINK": "aps/content/api/appSet/classSet/list/config.json", 
	         		    "MENU_NAME": "班级信息设置", 
	         		    "MENU_PK": "ec73a401220842b09d00435d66654695", 
	         		    "MENU_STATUS": "0", 
	         		    "MENU_TYPE": "0"
	         		}
	         		var changeControllerData = {
		                  url:menu.MENU_LINK,
		                  contentName:"content",
		                  hasButton:"right",
		                  data:menu
		                }
	      	        return eventBusService.publish(controllerName,'appPart.load.content', changeControllerData);
	    		}
            	
            }
        ];
    });
}).call(this);
