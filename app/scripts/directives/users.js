'use strict';

/**
 * @ngdoc directive
 * @name nimbusEmsApp.directive:users
 * @description
 * # users
 */
angular.module('nimbusEmsApp')
  .directive('users', function () {
    return {
      templateUrl: 'views/templates/users.html',
      restrict: 'E',
	  scope: true,
	  controller : function($scope,emsApi,$window){
		$scope.widgetTitle = 'Users';
		
		$scope.search = null;
		
		$scope.defaultPagination = 3;
		
		$scope.init = function(){
			$scope.loading = true;
				
			emsApi.api('GET','1/users?paginate='+$scope.defaultPagination+'&page=1').then(function(result){
				$scope.data = result.data;
				userList.initialize(true);
				$scope.loading = false;
			}).catch(function(error){
				console.log('emsApi error',error);
			});
			
		};
		
		$scope.usersData = [
		  { fname: 'one' },
		  { fname: 'two' },
		  { fname: 'three' },
		  { fname: 'four' },
		  { fname: 'five' },
		  { fname: 'six' },
		  { fname: 'seven' },
		  { fname: 'eight' },
		  { fname: 'nine' },
		  { fname: 'ten' }
		];
		
		var userList = new $window.Bloodhound({
			datumTokenizer: function(d) { console.log('bloodhound d',d); return $window.Bloodhound.tokenizers.whitespace(d.fname); },
			queryTokenizer: $window.Bloodhound.tokenizers.whitespace,
			source:  $scope.usersData,
			remote:	'http://ems.nimbus.com:8000/1/users'
		});	
		
		userList.initialize();
				
		$scope.userDataset = {
			name	: 'users',
			display	: 'fname',
			source	: userList.ttAdapter(),
			limit	: 10,
			templates: {
				//header: '<h3 class="league-name">NBA Teams</h3>',
				//suggestion: '<div><strong>{{fname}}</strong> – {{lname}}</div>',
				empty: [
					'<div class="uk-dropdown">',
					'No results were found ...',
					'</div>'
				].join('\n'),
			},
		};
		
		$scope.userOptions = {
			displayKey: 'fname',
			minLength: 0,
			highlight: true,
			classNames: {
				dataset: 'uk-dropdown'
			}
		};
		
		$scope.next = function(page){
			console.log('get page',page,$scope.data);
			emsApi.api('GET','1/users?paginate='+$scope.defaultPagination+'&page='+page).then(function(result){
				$scope.data = result.data;
				userList.initialize(true);
				$scope.loading = false;
			}).catch(function(error){
				console.log('emsApi error',error);
			});
		};
		
		$scope.prev = function(page){
			console.log('get page',page,$scope.data);
			emsApi.api('GET','1/users?paginate='+$scope.defaultPagination+'&page='+page).then(function(result){
				$scope.data = result.data;
				userList.initialize(true);
				$scope.loading = false;
			}).catch(function(error){
				console.log('emsApi error',error);
			});
		};
		
		$scope.init();

		console.log('Users Directive Scope',$scope);
	  },
      link: function postLink(scope, element) {
		element.on('$destroy', function () {
			scope.$destroy();
		});
      }
    };
  });
