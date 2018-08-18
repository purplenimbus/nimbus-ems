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

    	body += '<upload></upload>';
    	body += '<ul class="uk-margin-top">{{workbooks}}';
    	//body += '	<li ng-repeat="workbook in workbooks">{{workbook}}';
    	/*body += '		<table class="uk-table uk-table-divider">';
    	body += '			<thead>';
        body +=	'				<tr ng-repeat="header in workbook.header">{{ header }}</tr>';
        body += '			</thead>';
        body += '			<tbody>';
        body +=	'				<tr ng-repeat="rows in workbook.data">{{ row }}</tr>';
        body += '			</tbody>';
    	body += '		</table>';*/
		//body += '	</li>';
		body += '<ul>';

		str = uikit3.card({header:'import',body:body,cls:'uk-card-default'});

    	return str;
    };
  });
