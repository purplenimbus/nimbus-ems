'use strict';

/**
 * @ngdoc function
 * @name nimbusEmsApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the nimbusEmsApp
 */
angular.module('nimbusEmsApp')
	.controller('UsersCtrl', function ($scope,$window,usersData,graphApi,subdomain) {
		$scope.defaultPagination = 5;
		
		$scope.usersData = usersData;
		
		$scope.usersList = usersData.data;
				
		var list = new $window.Bloodhound({
			datumTokenizer: function(d) { console.log('bloodhound d',d); return $window.Bloodhound.tokenizers.whitespace(d.fname); },
			queryTokenizer: $window.Bloodhound.tokenizers.whitespace,
			remote:	'http://graph.nimbus.com:8000/'+subdomain+'/users'
		});	
		
		list.initialize();
				
		$scope.userDataset = {
			name	: 'users',
			display	: 'fname',
			source	: list.ttAdapter(),
			//limit	: 10,
			templates: {
				//header: '<h3 class="uk-text-muted uk-text-small">Users</h3>',
				suggestion: function(data){ 
					var str = '<article class="uk-comment uk-card">';
						str += '		<header class="uk-comment-header uk-grid-medium uk-flex-middle uk-margin-remove-bottom uk-grid" uk-grid="">';
						//str += '			<div class="uk-width-auto uk-first-column">';
						//str += '				<img class="uk-comment-avatar" src="'+data.image_url+'" width="40" height="40" alt="">';
						//str += '			</div>';
						str += '			<div class="uk-width-expand">';
						str += '				<h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset ng-binding uk-text-small" href="#"> '+data.fname+' '+data.lname+'</a></h4>';
						str += '				<ul class="uk-padding-remove uk-margin-remove uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top uk-text-mute">';
						str += '				</ul>';
						str += '			</div>';
						str += '		</header>';
						str += '		<div class="uk-comment-footer"></div>';
						str += '	</article>';
					return str;
				},
				empty: [
					'',
					'No results were found ...',
					''
				].join('\n'),
			},
		};
		
		$scope.userOptions = {
			displayKey: 'fname',
			minLength: 2,
			highlight: true,
			classNames: {
				dataset: 'uk-dropdown'
			}
		};
		
		$scope.next = function(page){
			$scope.loading = true;
			graphApi.api('GET',subdomain+'/users?paginate='+$scope.defaultPagination+'&page='+page).then(function(result){
				
				console.log('next page:'+page,result.data.data);
				
				$scope.usersData = result.data;
				
				var newArray = $scope.usersList.concat(result.data.data);
				
				$scope.usersList = newArray;
				
				list.initialize(true);
				$scope.loading = false;
			}).catch(function(error){
				console.log('graphApi error',error);
				$window.UIkit.notification({
					message: 'Couldnt get users',
					status: 'danger',
					pos: 'top-right',
					timeout: 5000
				});
			});
		};
		
		console.log('UsersCtrl',$scope);
		
		$scope.$on('$routeChangeStart', function() { 
			//close any open menus or modals
			$window.UIkit.offcanvas('#side-menu').hide();
		});
  });
