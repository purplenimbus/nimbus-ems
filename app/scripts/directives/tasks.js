'use strict';

/**
 * @ngdoc directive
 * @name nimbusEmsApp.directive:tasks
 * @description
 * # tasks
 */
angular.module('nimbusEmsApp')
  .directive('tasks', function (modal,form,tasks) {
	
    return {
		templateUrl: 'views/templates/tasks.html',
		restrict: 'EA',
		scope: true,
		controller: function($scope){
			$scope.widgetTitle = 'Tasks';
			$scope.tasks =  [];
			
			$scope.init = function(){
				tasks.getCompanyTasks({method:'GET',companyId:3}).then(function(result){
					console.log('result',result);
					$scope.tasks = result.data;
				});
			};
			
			$scope.showAddTask = function(){
				var obj;
				
					obj = {
						title:'Add Task',
						body:form.addTask(),
						footer:false
					};
				
				modal.modal(obj,$scope).then(function(result){
					$scope.modal = result;
				});
			};
			
			$scope.addTask = function(task){
				console.log('addTask',task);
				//show spinner
				
				//send to database
				
				//save task to scope
				$scope.tasks.push(task);
				
				//Reset newAsset
				$scope.newAsset = {};
				
				//close modal
				$scope.modal.hide();
			};
			
			$scope.removeTask = function(index){
				console.log('removeTask',$scope.tasks[index]);
				//send to database
				
				//remove from scope
				$scope.tasks.splice(index, 1);
			};
			
			$scope.completeTask = function(index){
				console.log('completeTask',$scope.tasks[index]);
				//send to database
				
				$scope.tasks[index].completed = true;
			};
			
			$scope.init();
		},
		link: function(scope, element) {
			element.on('$destroy', function () {
				scope.$destroy();
			});
		}
	};
  });
