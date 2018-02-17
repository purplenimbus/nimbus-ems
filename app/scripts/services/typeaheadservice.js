'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.typeaheadService
 * @description
 * # typeaheadService
 * Service in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
	.service('typeaheadService', function ($window,wordpressApi) {
    // AngularJS will instantiate a singleton by calling "new" on this function
		return {
			init : 	function($scope,name,endPoint,displayKey,label,display){
							
					this[name+'List'] = new $window.Bloodhound({
						datumTokenizer: function(d) { console.log(name+'list',d); return $window.Bloodhound.tokenizers.whitespace(d[displayKey]); },
						queryTokenizer: $window.Bloodhound.tokenizers.whitespace,
						remote:	{
							url : endPoint,
							prepare: function(query, settings) {
								//console.log('prepare',query,settings);
								settings.url += '?search=' + query;
								return settings;
							}
						},
					});	
					
					this[name+'List'].initialize();
							
					$scope[name+'Dataset'] = {
						name	: label,
						display	: display,
						source	: this[name+'List']/*.ttAdapter()*/,
						limit	: 5,
						templates: {
							//header: '<h3 class="uk-text-muted uk-text-small">'+name+'</h3>',
							//TO DO Move strings below to its own function
							
							suggestion: function(data){ 
								var str = 		'<li class="uk-text-capitalize">'+wordpressApi.parseWPData(data)[displayKey]+'</li>';
								
								//console.log('typeaheadService '+name+' templates',wordpressApi.parseWPData(data),displayKey);
								
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
					
					$scope[name+'Options'] = {
						displayKey: displayKey,
						minLength: 3,
						highlight: true,
						classNames: {
							dataset: 'uk-list uk-list-divider uk-dropdown uk-padding-small'
						}
					};
					
					console.log('typeaheadService '+name ,$scope);
			},
			bloodhound	:	function(){
				
			},
			dataset	:	function(){
				
			},
			options :	function(){

			}
		};
	});
