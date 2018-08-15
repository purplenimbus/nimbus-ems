'use strict';

/**
 * @ngdoc function
 * @name nimbusEmsApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the nimbusEmsApp
 */
angular.module('nimbusEmsApp')
  .controller('DashboardCtrl', function ($scope,settings,$route,$window) {
	  //console.log('dashboardCtrl route',$route);
	  $scope.route = $route;
      $scope.loggedin = false;
	  $scope.courseId = 2;
	  $scope.employees = {
		  title : 'Employees',
		  data : [{
			id:1,
			title:'Mr',
			fname:'Anthony',
			lname:'Akpan',
			picture : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/4/005/02f/0b3/31ce301.jpg',
			jobTitle:'Chief Technology Officer'
		  },{
			id:2,
			title:'Mrs',
			fname:'Stella',
			lname:'Rich',
			picture : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
			jobTitle : 'Secretary'
		  },{
			id:3,
			title:'Mr',
			fname:'Ike',
			lname:'Turner',
			picture : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
			jobTitle:'Accountant'
		  },{
			id:4,
			title:'Dr.',
			fname:'Ekama',
			lname:'Akpan',
			picture : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
			jobTitle:'Managing Director'
		  }]
	  };
	  
	  $scope.dashboardSettings = settings.getSettings('dashboard');
	  	  
	  $scope.requests = {
		  title : 'Requests',
		  data : [{
			id:1,
			name:'Diesel for the generator',
			description:'',
			from:{
			  id:2,
			  title:'Mrs',
			  fname:'Stella',
			  lname:'Rich',
			  picture : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
			  jobTitle : 'Secretary'
		  },
			to:{
			  id:1,
			  title:'Mr',
			  fname:'Anthony',
			  lname:'Akpan',
			  picture : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/4/005/02f/0b3/31ce301.jpg',
			  jobTitle:'Chief Technology Officer'
		  },
			approved : true
		  },
				 {
			id:1,
			name:'Purchase gifts for MD\'s Birthday',
			description:'',
			from:{
			id:3,
			title:'Mr',
			fname:'Ike',
			lname:'Turner',
			picture : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
			jobTitle:'Accountant'
		  },
			to:{
			  id:1,
			  title:'Mr',
			  fname:'Anthony',
			  lname:'Akpan',
			  picture : 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/4/005/02f/0b3/31ce301.jpg',
			  jobTitle:'Chief Technology Officer'
		  },
			approved : false
		  }]
		};
		
	
	$scope.$on('$routeChangeStart', function() { 
	   //close any open menus or modals
		$window.UIkit.offcanvas('#side-menu').hide();
	});
  });
