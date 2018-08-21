'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.courseService
 * @description
 * # courseService
 * Service in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
	.service('courseService', function (modal,form,uikit3,$window,eduApi,user,apiConst) {
		//this.newAsset = {};

		this.initTypeAhead = function($scope,fields = []){
			fields.forEach(function(field){
				console.log('field',field);

				var listName = field.name+'List',
					dataSetName = field.name+'DataSet',
					optionsName = field.name+'Options';;

				$scope[listName] = new $window.Bloodhound({
					datumTokenizer: function(d) { return $window.Bloodhound.tokenizers.whitespace(d[field.display]); },
					queryTokenizer: $window.Bloodhound.tokenizers.whitespace,
					remote:	field.endPoint
				});	
				
				$scope[listName].initialize(true);
						
				$scope[dataSetName] = {
					name	: field.name || '',
					display	: field.display || '',
					source	: $scope[listName].ttAdapter() || false,
					limit	: field.limit || 10,
					templates: {
						//header: '<h3 class="uk-text-muted uk-text-small">Users</h3>',
						//TO DO Move strings below to its own function
						suggestion: function(data){ 
							console.log(dataSetName,data,field);						
							var str = 		'<li class="uk-text-capitalize">'+data[field.display]+'</li>';

							return str;
						},
						empty: [
							'',
							'No results were found ...',
							''
						].join('\n'),
					},
					async	:	true
				};
				
				$scope[optionsName] = {
					displayKey: field.display || '',
					minLength: field.minLength || 2,
					highlight: true,
					hint: true,
					classNames: {
						dataset: 'uk-list uk-list-divider uk-dropdown uk-padding-small'
					}
				};
			
			});

			$scope.classes = [
				{ id:1,name:'JS 1'},
				{ id:2,name:'JS 2'},
				{ id:3,name:'JS 3'},
				{ id:4,name:'SS 1'},
				{ id:5,name:'SS 2'},
				{ id:6,name:'SS 3'}
			];
		};

		this.saveCourse = function(data){
			console.log('saveCourse',data);			
			/*eduApi.api('POST','courses',data).then(function(result){
				console.log('result',result);
			}).catch(function(error){
				console.log('save',error);
			});*/
		};
		
		this.initCourse = function($scope,params){
			//var self = this;
			
			$scope.loadingHome = true;
			
			$scope.students = [];
			
			//console.log('courseService params',params);
			
			eduApi.api('GET',user.tenant.id+'/registrations?course_id='+params.id+'&paginate='+apiConst.componentPagination+'&page=1&user_list=true').then(function(result){
				//console.log('courseService result',result,$scope,params);
				$scope.courseData = result.data;
				//console.log('courseData',$scope.courseData);
			
				$scope.students = result.data.data;
				$scope.pageTitle = result.data.data[0].course.name;
				
				$scope.loadingHome = false;
			}).catch(function(error){
				console.log('courseService error',error);
				$scope.loadingHome = false;
				$window.UIkit.notification({
					message: 'Couldnt get courseData',
					status: 'danger',
					pos: 'top-right',
					timeout: 5000
				});
				
			});
		};
	});
