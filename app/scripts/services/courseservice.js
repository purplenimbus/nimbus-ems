'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.courseService
 * @description
 * # courseService
 * Service in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
	.service('courseService', function (modal,form,uikit3,$window,eduApi,graphApi,tenant) {
		//this.newAsset = {};
		
		this.course = function($scope,type){			
			var subjectList = new $window.Bloodhound({
				datumTokenizer: function(d) { /*console.log('bloodhound d',d);*/ return $window.Bloodhound.tokenizers.whitespace(d.fname); },
				queryTokenizer: $window.Bloodhound.tokenizers.whitespace,
				remote:	eduApi.apiEndPoint+'subjects'
			});	
			
			subjectList.initialize(true);
					
			$scope.subjectDataset = {
				name	: 'subjects',
				display	: 'name',
				source	: subjectList.ttAdapter(),
				limit	: 10,
				templates: {
					//header: '<h3 class="uk-text-muted uk-text-small">Users</h3>',
					//TO DO Move strings below to its own function
					suggestion: function(data){ 
												
						var str = 		'<li class="uk-text-capitalize">'+data.name+'</li>';

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
			
			$scope.subjectOptions = {
				displayKey: 'name',
				minLength: 2,
				highlight: true,
				classNames: {
					dataset: 'uk-list uk-list-divider uk-dropdown uk-padding-small'
				}
			};
			
			/* initialize */
			var instructorList = new $window.Bloodhound({
				datumTokenizer: function(d) { /*console.log('bloodhound d',d);*/ return $window.Bloodhound.tokenizers.whitespace(d.fname); },
				queryTokenizer: $window.Bloodhound.tokenizers.whitespace,
				remote:	graphApi.apiEndPoint+tenant.username+'/users?user_type=teacher'
			});	
			
			instructorList.initialize(true);
					
			$scope.instructorDataset = {
				name	: 'subjects',
				display	: 'fname',
				source	: instructorList.ttAdapter(),
				limit	: 10,
				templates: {
					//header: '<h3 class="uk-text-muted uk-text-small">Users</h3>',
					//TO DO Move strings below to its own function
					suggestion: function(data){ 
												
						var str = 		'<li class="uk-text-capitalize">'+data.fname+'</li>';

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
			
			$scope.instructorOptions = {
				displayKey: 'fname',
				minLength: 2,
				highlight: true,
				classNames: {
					dataset: 'uk-list uk-list-divider uk-dropdown uk-padding-small'
				}
			};
				
			var obj = {
				title	:	type+' Course',
				body	:	form.editCourse(),
				footer	:	uikit3.button({cls:'uk-button uk-button-text uk-margin-small-bottom',icon:'upload',label:'Save',directive:'ng-click="save(this.asset)"'})
			};
			
			modal.modal(obj,$scope).then(function(result){
				$scope.modal = result;
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
		
		this.save = function(data){
						
			eduApi.api('POST','courses',data).then(function(result){
				console.log('result',result);
			}).catch(function(error){
				console.log('save',error);
			});
		};
	});
