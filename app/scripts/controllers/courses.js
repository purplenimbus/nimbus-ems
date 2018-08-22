'use strict';

/**
 * @ngdoc function
 * @name nimbusEmsApp.controller:CoursesCtrl
 * @description
 * # CoursesCtrl
 * Controller of the nimbusEmsApp
 */
angular.module('nimbusEmsApp')
	.controller('CoursesCtrl', function ($scope,coursesData,grades,courseService,modal,form,uikit3,eduApi,user,apiConst,$window) {
		$scope.showAdvanced = false;
		$scope.asset = { 
			meta : {
				course_grade_id : 1,
				course_schema : {
		            lab: {value:5,enabled:true},
		            exam: {value:35,enabled:true},
		            quiz: {value:10,enabled:true},
		            midterm: {value:30,enabled:true},
		            assignment: {value:15,enabled:true},
		            attendance: {value:5,enabled:true}
		        }
			} 
		};

		$scope.getSchema = function(){
			return Object.keys($scope.asset.meta.course_schema);
		};
		
		$scope.coursesList = coursesData;

		if(!coursesData.length){
			$scope.noCoursesMessage = 'No Content';
		}

		$scope.createCourseInit = false;
				
		//$scope.coursesList = coursesData.data ? coursesData.data : false;
		
		$scope.courseAverage = function(course){
			return grades.getAverage(course);
		};
		
		$scope.courseGrade = function(course){
			return grades.getGrade(grades.getAverage(course));
		};
		
		console.log('CoursesCtrl scope',$scope);
		
		$scope.createCourse = function(){

			var header = '';

				header += '<div class="uk-clearfix uk-margin-bottom">';
				header += '	<div class="uk-float-left">';
				header += '<p class="uk-button uk-button-text title uk-text-capitalize uk-text-bold uk-margin-remove">Create Course</p>';
				header += '	</div>';
				header += '	<div class="uk-float-right">';

				header += uikit3.button({
								//icon:'upload-cloud',
								directive:'ng-click="save(asset)"',
								cls:'uk-button-primary uk-button-small',
								label:'Save'
							});

				header += uikit3.button({
								//icon:'close',
								directive:'ng-click="modal.hide()"',
								cls:'uk-button-danger uk-button-small',
								label:'Close'
							});

				header += '	</div>';
				header += '</div>';

			var obj = {
				title	:	header,
				type 	: 	'full',
				body	:	form.editCourse($scope),
				//footer	:	uikit3.button({cls:'uk-button uk-button-text uk-margin-small-bottom',icon:'upload',label:'Save',directive:'ng-click="save(this.asset)"'})
			};

			if(!$scope.createCourseInit){
				courseService.initTypeAhead($scope,[{
					name:'subjects',
					display:'name',
					endPoint:eduApi.apiEndPoint+'subjects'
				},{
					name:'instructors',
					display:'firstname',
					endPoint:eduApi.apiEndPoint+user.tenant.id+'/users?user_type=teacher'
				}]);
			}

			console.log('$scope createCourse',$scope.asset);

			modal.modal(obj,$scope).then(function(result){
				$scope.modal = result;
				$scope.createCourseInit = true;
			});
			
		};

		$scope.save = function(data){ 
			console.log('save course',data);
			//courseService.saveCourse(data); 
		};

		$scope.next = function(page){
			$scope.loading = true;
			eduApi.api('GET',user.tenant.id+'/courses?paginate='+apiConst.widgetPagination+'&page='+page)
			.then((result) => {
				var newArray = $scope.coursesList.data.concat(result.data.data);
				
				$scope.coursesList.data = newArray;
				//userList.initialize(true);

				$scope.loading = false;
			}).catch((error) => {
				console.log('eduApi error',error);
				/*$window.UIkit.notification({
					message: 'Couldnt get users',
					status: 'danger',
					pos: 'top-right',
					timeout: 5000
				});*/
			});
		};
		
		$($window).scroll(function() {
		   if($(window).scrollTop() + $(window).height() == $(document).height()) {
		       $scope.next();
		   }
		});
	});
