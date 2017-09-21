'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.uikit3
 * @description
 * # uikit3
 * Factory in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
	.factory('uikit3', function () {

		return {
			input : function(attrs){
				var str = '';
				
				str += attrs.placeholder ? '<label class="uk-form-label uk-text-capitalize" for="form-stacked-text">'+attrs.placeholder+'</label>' : '';
				str += '<input ';
				str += attrs.cls ? 'class="uk-input '+attrs.cls+'"' : 'class="uk-input"';
				str += attrs.type ? 'type="'+attrs.type+'"' : 'type="text"';
				str += attrs.model ? 'ng-model="'+attrs.model+'"' : '';
				str += attrs.placeholder ? 'placeholder="'+attrs.placeholder+'"' : '';
				str += attrs.required ? 'required' : '';
				str += '>';
				
				return str;
			},
			inputIcon : function(attrs){
				var str = '',self = this;
				
				str +=	'<div class="uk-inline uk-width-1-1">';
				str +=	'<a class="uk-form-icon uk-form-icon-flip" href=""';
				str +=  attrs.icon ? 'uk-icon="icon: '+attrs.icon+'"' : 'uk-icon="icon: "';
				str +=  '></a>';
				str += 	self.input(attrs);
				str +=	'</div>';
				
				return str;
			},
			button : function(attrs){
				var str = '';
				
				str += '<button ';
				str += attrs.cls ? 'class="uk-button '+attrs.cls+'"' : 'class="uk-button uk-button-primary"';
				str += attrs.directive ? attrs.directive : '';
				str += '">';
				str += attrs.icon ? '<span uk-icon="icon: '+attrs.icon+'"></span>'  : '';
				str += attrs.label ? attrs.label : '';
				str += '</button>';
				
				return str;
			},
			textarea : function(attrs){
				var str = '';
				
				str += attrs.placeholder ? '<label class="uk-form-label uk-text-capitalize" for="form-stacked-text">'+attrs.placeholder+'</label>' : '';
				str += '<textarea ';
				str += attrs.cls ? 'class="uk-textarea" '+attrs.cls+'"' : 'class="uk-textarea""';
				str += attrs.placeholder ? 'placeholder="'+attrs.placeholder+'"' : '';
				str += attrs.directive ? attrs.directive : '';
				str += '">';
				str += '</textarea>';
				
				return str;
			},
			select : function(attrs){
				var str = '';
				
				str += attrs.placeholder ? '<label class="uk-form-label uk-text-capitalize" for="form-stacked-text">'+attrs.placeholder+'</label>' : '';
				str += '<select ';
				str += attrs.cls ? 'class="uk-textarea" '+attrs.cls+'"' : 'class="uk-textarea""';
				str += attrs.placeholder ? 'placeholder="'+attrs.placeholder+'"' : '';
				str += attrs.directive ? attrs.directive : '';
				str += '">';
				str += attrs.options ? '<option ng-repeat="option in '+attrs.options+'"></option>' : '';
				str += '</select>';
				
				return str;
			},
			upload : function(attrs){
				var str = '';
				str += attrs.placeholder ? '<label class="uk-form-label uk-text-capitalize" for="form-stacked-text">'+attrs.placeholder+'</label>' : '';
				str += '<div class="test-upload uk-placeholder uk-text-center">';
				str += '	<span uk-icon="icon: cloud-upload"></span>';
				str += '	<span class="uk-text-middle">Attach binaries by dropping them here or</span>';
				str += '	<div uk-form-custom>';
				str += '		<input type="file" multiple>';
				str += '		<span class="uk-link">selecting one</span>';
				str += '	</div>';
				str += '</div>';
				return str;
			},
			offcanvas: function () {
				var str = '';
				
				str += '<div id="my-id" uk-offcanvas>';
				str += '    <div class="uk-offcanvas-bar">';
				str += '        <button class="uk-offcanvas-close" type="button" uk-close></button>';
				str += '    </div>';
				str += '</div>';
				
				return str;
			},
			
			modal : function(attrs){
				var str = '';
				
				if(attrs.type && attrs.type === 'full'){
					attrs.cls = 'uk-modal-full';
				}
								
				str += '<div id="modal" uk-modal>';
				str += '	<div class="uk-modal-dialog ';
				str += attrs.cls ? attrs.cls+'"' : '"';
				str += attrs.directive ? attrs.directive : '';
				str += '>';
				str += '		<button class="uk-modal-close-default" type="button" uk-close></button>';
				str += attrs.title ?'<div class="uk-modal-header"><h2 class="uk-modal-title">'+attrs.title+'</h2></div>' : '';
				str += attrs.body ? '		<div class="uk-modal-body">'+attrs.body+'</div>' : '';
				str += attrs.footer ?'		<div class="uk-modal-footer">'+attrs.footer+'</div>' : '';
				str += '	</div>';
				str += '</div>';
				
				return str;
			}
		};
	});
