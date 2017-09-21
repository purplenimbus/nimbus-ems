'use strict';

/**
 * @ngdoc directive
 * @name nimbusEmsApp.directive:tasks
 * @description
 * # tasks
 */
angular.module('nimbusEmsApp')
  .directive('tasks', function (modal,form,tasks,tasksConst,uikit3) {
	
    return {
		templateUrl: 'views/templates/tasks.html',
		restrict: 'EA',
		scope: true,
		controller: function($scope,$window){
			$scope.widgetTitle = 'Tasks';
			$scope.tasks =  [];
			$scope.newAsset = {};
			$scope.search = false;
			var taskList = false;
			$scope.init = function(){
				taskList = new $window.Bloodhound({
					datumTokenizer: function(d) { console.log('bloodhound d',d); return $window.Bloodhound.tokenizers.whitespace(d.name); },
					queryTokenizer: $window.Bloodhound.tokenizers.whitespace,
					local:  $scope.tasks
				});	
				
				console.log('init',taskList.ttAdapter);
				
				$scope.tasksDataset = {
					displayKey: 'name',
					source: taskList.ttAdapter(),
					templates: {
					  empty: [
						'<div uk-dropdown>',
						'No results were found ...',
						'</div>'
					  ].join('\n'),
					}
				};	
			
				taskList.initialize();
								
				tasks.getCompanyTasks({method:'GET',companyId:3}).then(function(result){
					console.log('result',result);
					$scope.tasks = result.data;
				});
			};
			
			$scope.showAddTask = function(task){
				
				$scope.newAsset = task;
				
				var obj,
					title,
					footer,
					label,
					icon,
					directive;
				
				title = task ? 'Edit Task' : 'Add Task';
				
				label = task ? 'Edit' : 'Add';
				
				icon = task ? 'pencil' : 'plus';
				
				directive = task ? 'ng-click="saveTask(newAsset)"' : 'ng-click="addTask(newAsset)"';
				
				footer = '	<div class="uk-margin">';
				footer += 			uikit3.button({cls:'uk-width-1-1 uk-margin-small-bottom uk-button-primary',icon:icon,label:label,directive:directive});
				footer += '	</div>';
				
				obj = {
					title:title,
					body:form.addTask(true),
					footer:footer
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
				
				$scope.resetTypeAhead();
				
				$scope.reset();
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
			
			$scope.saveTask = function(task){
				console.log('saveTask',task);
				//send to database
				//close modal
				$scope.modal.hide();
				
				$scope.reset();
			};
			
			$scope.resetTypeAhead = function(){
				taskList = new $window.Bloodhound({
					datumTokenizer: function(d) { console.log('bloodhound d',d); return $window.Bloodhound.tokenizers.whitespace(d.name); },
					queryTokenizer: $window.Bloodhound.tokenizers.whitespace,
					local:  $scope.tasks
				});
				
				taskList.initialize();
			};
			
			$scope.reset = function(){
				console.log('Scope Reset');
				$scope.newAsset = {};
				
				console.log('init',taskList);
				//$scope.$apply();
			};
			
			$scope.statusTypes = tasksConst().statusTypes;
			
			console.log('Tasks Constant' , tasksConst());
			
			console.log('Tasks $scope' , $scope);
			
			$scope.init();
		},
		link: function(scope, element) {
			element.on('$destroy', function () {
				scope.$destroy();
			});
		}
	};
  });
