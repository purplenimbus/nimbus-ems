'use strict';

/**
 * @ngdoc function
 * @name nimbusEmsApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the nimbusEmsApp
 */
angular.module('nimbusEmsApp')
	.controller('AccountCtrl', function ($scope,$window,profileData,eduApi,$route,apiConst,user) {
	
	$scope.init = function(){
		
		$scope.profileData = profileData;
	
		//console.log('profileData result',profileData);
		
		//$scope.loading = true;
		
		/*graphApi.api('GET','services?paginate='+apiConst.componentPagination+'&page=1').then(function(result){
			console.log('init result',result);
			$scope.services = result.data.data;
			$scope.loading = false;
		}).catch(function(){
			$window.UIkit.notification({
				message: 'Couldnt get servicesData',
				status: 'danger',
				pos: 'top-right',
				timeout: 5000
			});
			$scope.loading = false;
		});*/
	};
	
	$scope.save = function(data){
		$scope.loading = true;
		console.log('sending data',data);
		eduApi.api('POST',user.tenant.id+'/users/'+data.id,data).then(function(result){
			console.log('profile save result',result);
			$window.UIkit.notification({
									message: 'Profile Saved',
									status: 'success',
									pos: 'top-right',
									timeout: 5000
								});
			
			$scope.loading = false;
						
			//$route.reload();
		})
		.catch(function(){
			//do something
			$window.UIkit.notification({
				message: 'Couldnt save profile data',
				status: 'danger',
				pos: 'top-right',
				timeout: 5000
			});
			$scope.loading = false;
		});
	};
	
    var serviceList = new $window.Bloodhound({
		datumTokenizer: function(d) { /*console.log('bloodhound d',d);*/ return $window.Bloodhound.tokenizers.whitespace(d.fname); },
		queryTokenizer: $window.Bloodhound.tokenizers.whitespace,
		remote:	'http://graph.nimbus.com:8000/v1/services'
	});	
	
	$scope.search = null;
	
	serviceList.initialize();
			
	$scope.serviceDataset = {
		name	: 'services',
		display	: 'name',
		source	: serviceList.ttAdapter(),
		limit	: 10,
		templates: {
			//header: '<h3 class="uk-text-muted uk-text-small">Users</h3>',
			//TO DO Move strings below to its own function
			suggestion: function(data){ 
				var str = '<article class="uk-comment uk-card">';
					str += '		<header class="uk-comment-header uk-grid-medium uk-flex-middle uk-margin-remove-bottom uk-grid" uk-grid="">';
					//str += '			<div class="uk-width-auto uk-first-column">';
					//str += '				<img class="uk-comment-avatar" src="'+data.image_url+'" width="40" height="40" alt="">';
					//str += '			</div>';
					str += '			<div class="uk-width-expand">';
					str += '				<h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset ng-binding uk-text-small uk-text-capitalize" ng-href="#!/'+data.tenant_id+'/profile/'+data.id+'"> '+data.fname+' '+data.lname+'</a></h4>';
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
		async	:	true
	};
	
	$scope.serviceOptions = {
		displayKey: 'name',
		minLength: 2,
		highlight: true,
		classNames: {
			dataset: 'uk-dropdown'
		}
	};
	
	$scope.init();
	
	$scope.$on('$routeChangeStart', function() { 
		//close any open menus or modals
		$scope.$on('$routeChangeStart', function() { 
		   //close any open menus or modals
			$window.UIkit.offcanvas('#side-menu').hide();
		});
	});
  });
