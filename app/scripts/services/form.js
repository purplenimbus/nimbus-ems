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
	this.login = function(){
		var str = '';
		
		str += '<form class="uk-form-stacked">';
		str += '	<div class="uk-margin">';
		str += 			uikit3.inputIcon({model:'username',icon:'user',type:'text',placeholder:'username'});
		str += '	</div>';
		str += '	<div class="uk-margin">';
		str += 			uikit3.inputIcon({model:'password',icon:'lock',type:'password',placeholder:'password'});		
		str += '	</div>';
		str += '	<div class="uk-margin">';
		str += 			uikit3.button({cls:'uk-width-1-1 uk-margin-small-bottom uk-button-primary',icon:'sign-in',label:'login',directive:'ng-click="login({ username:this.username , password: this.password })"'});
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
  });
