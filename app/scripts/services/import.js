'use strict';

/**
 * @ngdoc service
 * @name nimbusEmsApp.import
 * @description
 * # import
 * Service in the nimbusEmsApp.
 */
angular.module('nimbusEmsApp')
  .service('importService', function (uikit3) {
    this.render = function(){
    	var str = '',body = '';

    	body += '<upload ng-if="!workbook.length"></upload>';
    	body += '<div uk-spinner ng-if="loading" class="uk-width-1-1 uk-text-center"></div>';
    	body += '<ul class="uk-list" ng-if="!loading && workbook.length">';
    	body += '	<li ng-repeat="(worksheetIndex , worksheet) in workbook">';
    	body += '		<div class="uk-overflow-auto">';
    	body += '		<table class="uk-table uk-table-divider uk-table-small">';
    	body += '			<thead>';
        body +=	'				<tr>';
        body +=	'					<th class="uk-text-center"></th>';
        body +=	'					<th ng-repeat="header in worksheet.header" class="">{{ header }}</th>';
       	body +=	'					<th class="uk-text-center"></th>';
        body +=	'				</tr>';
        body += '			</thead>';
        body += '			<tbody>';
        body +=	'				<tr ng-repeat="rows in worksheet.data">';
        body +=	'					<td>{{ $index }}</td>';
        body +=	'					<td ng-repeat="column in rows track by $index">'+uikit3.input({model:'column' , cls:'uk-form-small'})+'</td>';
        body +=	'					<td>'+uikit3.icons([{icon:'close',action:'remove(worksheetIndex,$index)',tooltip:'remove row', cls:'uk-text-danger'}])+'</td>';
        body += '				</tr>';
        body += '			</tbody>';
    	body += '		</table>';
    	body += '		</div>';
		body += '	</li>';
		body += '<ul>';

		var header = '<div class="uk-clearfix">';
			header += '<div class="uk-float-left">Import</div>';
			header += '<div class="uk-float-right" ng-if="workbook.length">';
			header += uikit3.icons([{icon:'refresh',action:'reset()',cls:'uk-text-danger',tooltip:'reset'},{icon:'upload',action:'import()',cls:'uk-text-primary',tooltip:'import'}]);
			header += '</div>';
			header += '</div>';
		str = uikit3.card({header:header,body:body,classes:{card:'uk-card-default',body:'uk-padding-small',header:'uk-padding-small'}});

    	return str;
    };

    this.parseWorkBook = function(workbook){
    	var parsed = [];

    	workbook.forEach(function(worksheet,worksheetKey){
    		//console.log('parseWorkBook',worksheet.header,worksheet.data[0]);
    		//ar obj = {};
    		parsed[worksheetKey] = [];

    		worksheet.data.forEach(function(row){
    			//console.log('parseWorkBook',worksheet.header,row);
    			var obj = {};

    			worksheet.header.forEach(function(header,key){
    				obj[header] = row[key];
    			});

    			parsed[worksheetKey].push(obj);

    		});
    	});

    	return parsed;
    };

    this.import = function(worksheet){
    	var data = this.parseWorkBook(worksheet);

    	console.log('import',data);
    };
  });
