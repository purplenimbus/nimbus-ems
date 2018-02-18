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
							},
							transform : function(o){
								var data = o.map(function(v){
									return wordpressApi.parseWPData(v);
								});
								
								//console.log('transform data',data);
								
								return data;
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
							
							suggestion: function(data){ 
								//console.log('suggestion',data);
								var str = 		'<li class="uk-text-capitalize">'+data[displayKey]+'</li>';
																
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
						hint:true,
						classNames: {
							dataset: 'uk-list uk-list-divider uk-dropdown uk-padding-small'
						}
					};
					
			},
			bloodhound	:	function(){
				
			},
			dataset	:	function(){
				
			},
			options :	function(){

			}
		};
	});
