(function() {
    define([], function() {
        return [
            '$scope','httpService','config','params','$routeParams','eventBusService','controllerName','loggingService', 
            function($scope,$httpService,config,params,$routeParams,eventBusService,controllerName,loggingService) {
            	
            	$scope.form = {};
            	
            	$scope.form.DOCCHANNEL = 'dc0c1dad1e8549ee82eae7580b509e9b';
            	$httpService.post(config.findCategotyListURL, $scope.form).success(function(data) {
					if(data.code == "0000") {
						$scope.categoryList =  data.data;
						$scope.$apply();
					}
				});
            	
            	$scope.find = function() {
            		$scope.form.page = JSON.stringify($scope.page);
            		$httpService.post(config.findURL, $scope.form).success(function(data) {
						if(data.code == "0000") {
							$scope.dataList =  data.data;
							
							for(var i=0; i<$scope.dataList.length; i++){
								if($scope.dataList[i].DOCAUTHOR == "" || $scope.dataList[i].DOCAUTHOR == undefined || $scope.dataList[i].DOCAUTHOR == " "){
									$scope.dataList[i].DOCAUTHOR = $scope.form.DOCAUTHOR;
									if($scope.form.DOCCHANNEL == 2075){
										$scope.dataList[i].DOCAUTHOR = "区教育督导室";
									}
								}
								if($scope.dataList[i].DOCAUTHOR == "教育督导室" || $scope.dataList[i].DOCAUTHOR == "督导室"){
									$scope.dataList[i].DOCAUTHOR = "区教育督导室";
								}
							}
							
							
							
							PAGE.buildPage($scope,data);
							$scope.$apply();
						}
					}).error(function(data) {
	                    loggingService.info("获取文章列表出错");
	                });
            	}
            	
            	//左侧导航
            	$scope.selectDocs = function(str, $event) {
            		$scope.form.DOCAUTHOR = null;
            		$scope.form.DOCCHANNEL = str;
            		var nodeVal = $event.currentTarget.childNodes[0].nodeValue;
            		
            		$('.tab ul>li>a').removeClass('active');
            		$($event.target).addClass('active');
            		$('.tab-title').text(nodeVal);
            		
            		$('.kind').css("display","none");
            		$('.channel_' +str).css("display","block");
            		
            		$scope.select();
				}
            	
            	//top导航
            	$scope.findDocs = function($event) {
            		var nodeVal = $event.currentTarget.childNodes[0].nodeValue;
            		$scope.form.DOCAUTHORMORE = null;
            		$scope.form.DOCAUTHOR = null;
            		if(nodeVal == '最新通知' || nodeVal == '最新文件') {
            			$scope.form.DOCAUTHOR = null;
            		}else if(nodeVal== "区教育督导室" || nodeVal== "教育督导室" || nodeVal== "督导室"){
            			//$scope.form.DOCAUTHORMORE = "'区教育督导室','教育督导室','督导室'";
            			$scope.form.DOCAUTHOR = "督导室";
            		}else{
            			$scope.form.DOCAUTHOR = nodeVal;
            		}
            		
            		$('.channel_' +$scope.form.DOCCHANNEL+ ' > div').removeClass('active');
            		$($event.target).addClass('active');
            		
            		$scope.select();
				}
            	
            	$scope.select = function() {
	            	$scope.page.current = 1;
	            	$scope.find();
				}
            	
            	//文章详情
            	$scope.docDetail = function(obj) {
            		window.location.href = '/OfficeNotice/detail/'+obj.DOCID;
            	}
            	
            	//接收 事件 刷新表格
            	eventBusService.subscribe(controllerName,'appPart.data.reload', function(event, m2) {
					$scope.find();
				});
            	
            	PAGE.iniPage($scope);
            }
        ];
    });
}).call(this);
