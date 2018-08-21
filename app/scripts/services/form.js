'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.form
 * @description
 * # form
 * Service in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
	.service('form', function (uikit3) {
		// AngularJS will instantiate a singleton by calling "new" on this function
		this.build = function(data){
			var str = '',
				self  = this;

			str += '<form action="javascript:void(0)">';
			
			data.forEach(function(value){
				switch(typeof value){
					case 'object' : if(value.type){
										str += uikit3[value.type](value.attrs ? value.attrs : {});
									}
					
									break;
					default : str += value;
				}
				
			});
			
			str += '</form>';
			
			console.log('formService form',str);
			
			return str;
		}
		this.login = function(){
			var str = '';
			
			str += '<form class="uk-form-stacked">';
			str += '	<div class="uk-margin">';
			str += 			uikit3.inputIcon({model:'email',icon:'user',type:'text',placeholder:'email',required:true});
			str += '	</div>';
			str += '	<div class="uk-margin">';
			str += 			uikit3.inputIcon({model:'password',icon:'lock',type:'password',placeholder:'password',required:true});		
			str += '	</div>';
			str += '	<div class="uk-margin">';
			str += 			uikit3.button({cls:'uk-width-1-1 uk-margin-small-bottom uk-button-primary',icon:'sign-in',label:'login',directive:'ng-click="login({ email:this.email , password: this.password },$event)"'});
			str += '	</div>';
			str += '</form>';

			return str;
		};
		
		this.addMedia = function(){
			var str = '';
			
			str += '<form class="uk-form-stacked">';
			str += '	<div class="uk-margin">';
			str += 			uikit3.inputIcon({model:'Title',icon:'user',type:'text',placeholder:'Title'});
			str += '	</div>';
			str += '	<div class="uk-margin">';
			str += 			uikit3.select({directive:'ng-model="type"' , options : ''});
			str += '	</div>';
			str += '	<div class="uk-margin">';
			str += 			uikit3.upload();
			str += '	</div>';
			str += '	<div class="uk-margin">';
			str += 			uikit3.textarea({directive:'ng-model="description"',placeholder:'description'});
			str += '	</div>';
			str += '	<div class="uk-margin">';
			str += 			uikit3.button({cls:'uk-width-1-1 uk-margin-small-bottom uk-button-primary',icon:'sign-in',label:'Add',directive:'ng-click="uploadData()"'});
			str += '	</div>';
			str += '</form>';
			return str;
		};
		
		this.addTask = function(edit){
			
			var str = '';
			
			if(edit){
				
			}
			
			str += '<form class="uk-form-stacked">';
			str += '	<div class="uk-margin">';
			str += 			uikit3.inputIcon({model:'newAsset.name',icon:'user',type:'text',placeholder:'Name',required:true});
			str += '	</div>';
			str += '	<div class="uk-margin">';
			str += 			uikit3.textarea({directive:'ng-model="description"',placeholder:'Description',model:'newAsset.description'});
			str += '	</div>';
			str += '	<div class="uk-margin uk-grid-small uk-child-width-1-2" uk-grid>';
			str += '		<div class="">';
			str += 				uikit3.input({model:'newAsset.deadline.date',type:'date',icon:'calendar',placeholder:'Deadline Date'});
			str += '		</div>';
			str += '		<div class="">';
			str += 				uikit3.input({model:'newAsset.deadline.time',type:'time',icon:'clock',placeholder:'Deadline Time'});
			str += '		</div>';
			str += '	</div>';
			str += '	<div class="uk-margin">';
			str += 			uikit3.select({options : 'statusTypes',directive:'ng-model="newAsset.status"'});
			str += '	</div>';
			str += '</form>';
			return str;
		};
	  
		this.addRequest = function(data){
			var str = '';
			
			str += uikit3.table(data,'request');
			
			return str;
		};
		
		this.editCourse = function(){
			var str = '';
			
			str += '<form>';
			str += '	<div class="uk-margin uk-grid-small" uk-grid>';
			str += '		<div class="uk-width-1-1">';
			str += uikit3.inputIcon({model:'asset.name',icon:'user',type:'text',required:true,placeholder:'Course Title' , cls:'uk-text-capitalize'});
			str += '		</div>';
			str += '	</div>';
			str += '	<div class="uk-margin uk-grid-small" uk-grid>';
			str += '		<div class="uk-width-1-2@m uk-width-1-2@xs">';
			str += uikit3.typeahead({
						directive:'datasets="subjectsDataSet" options="subjectsOptions" ng-model="asset.meta.subject" sf-typeahead',
						type:'text',
						required:true,
						cls:'uk-input uk-search-input uk-width-1-1 typeahead uk-text-capitalize',
						placeholder:'Subject'
					});
			str += '		</div>';
			str += '		<div class="uk-width-1-2@m uk-width-1-2@xs">';
			str += '			<select class="uk-select" ng-model="asset.meta.class_id" ng-options="class.id as class.name for class in classes"></select>';
			str += '		</div>';
			str += '	</div>';

			str += '	<div class="uk-margin typeahead">';
			str += uikit3.typeahead({
						directive:'datasets="instructorsDataSet" options="instructorsOptions" ng-model="asset.meta.instructor" sf-typeahead',
						type:'text',
						required:true,
						cls:'uk-input uk-search-input uk-width-1-1 typeahead uk-text-capitalize',
						placeholder:'Instructor'
					});
			str += '	</div>';
			//str += '	<div class="uk-margin typeahead">';
			//str += '		<div ng-if="asset.meta.instructor" class="preview">';			
			//str += 				uikit3.typeaheadPreview({image:'{{asset.meta.instructor.image_url}}'});
			//str += '		</div>';			
			//str += '	</div>';
			
			//str += '	<div class="uk-margin">';
			//str += 			uikit3.textarea({model:'asset.description',placeholder:'Course Description',label:false});
			//str += '	</div>';
			str += '</form>';
			
			return str;
		};
	});