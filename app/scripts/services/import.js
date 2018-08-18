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

    	body += '<upload ng-if="!workbooks.length"></upload>';
    	body += '<div uk-spinner ng-if="loading" class="uk-width-1-1 uk-text-center"></div>';
    	body += '<ul class="uk-list" ng-if="!loading && workbooks.length">';
    	body += '	<li ng-repeat="(workbookIndex , workbook) in workbooks">';
    	body += '		<div class="uk-overflow-auto">';
    	body += '		<table class="uk-table uk-table-divider uk-table-small">';
    	body += '			<thead>';
        body +=	'				<tr>';
        body +=	'					<th class="uk-text-center"></th>';
        body +=	'					<th ng-repeat="header in workbook.header" class="">{{ header }}</th>';
       	body +=	'					<th class="uk-text-center"></th>';
        body +=	'				</tr>';
        body += '			</thead>';
        body += '			<tbody>';
        body +=	'				<tr ng-repeat="rows in workbook.data">';
        body +=	'					<td>{{ $index }}</td>';
        body +=	'					<td ng-repeat="column in rows track by $index">'+uikit3.input({model:'column' , cls:'uk-form-small'})+'</td>';
        body +=	'					<td>'+uikit3.icons([{icon:'close',action:'remove(workbookIndex,$index)'}])+'</td>';
        body += '				</tr>';
        body += '			</tbody>';
    	body += '		</table>';
    	body += '		</div>';
		body += '	</li>';
		body += '<ul>';

		var header = '<div class="uk-clearfix">';
			header += '<div class="uk-float-left">Import</div>';
			header += '<div class="uk-float-right" ng-if="workbooks.length">'+uikit3.button({label:'Clear Worksheet',directive:'ng-click="reset()"',cls:'uk-button-danger uk-button-small'})+'</div>';
			header += '</div>';
		str = uikit3.card({header:header,body:body,classes:{card:'uk-card-default',body:'uk-padding-small',header:'uk-padding-small'}});

    	return str;
    };
  });
