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

        
        body += uikit3.section({
                    title:'Select Import Type',
                    directive:'ng-show="!importType"',
                    body:uikit3.select({
                        default:'Type',
                        options:'importTypes',
                        directive:'ng-model="importType"'
                    })
                });

    	body += '<upload ng-if="!workbook.length && !loading && importType"></upload>';
    	body += '<div uk-spinner ng-if="loading" class="uk-width-1-1 uk-text-center"></div>';
    	body += '<ul class="uk-list" ng-if="!loading && workbook.length">';
    	body += '	<li ng-repeat="(worksheetIndex , worksheet) in workbook">';
    	body += '		<div class="uk-overflow-auto">';
    	body += '		<table class="uk-table uk-table-divider uk-table-small">';
    	body += '			<thead>';
        body +=	'				<tr>';
        body +=	'					<th></th>';
        body +=	'					<th ng-repeat="(key,header) in worksheet.data[0]">{{ key }}</th>';
       	body +=	'					<th></th>';
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
        body += '</div>';

		var header = '<div class="uk-clearfix" ng-if="importType">';
			header += '<div class="uk-float-left uk-text-uppercase">Import {{ importType.name }}</div>';
			header += '<div class="uk-float-right" ng-if="workbook.length || importType">';
			header += uikit3.icons([
                        {icon:'refresh',action:'reset()',cls:'uk-text-danger',tooltip:'reset'},
                        {icon:'upload',action:'import(importType.value)',cls:'uk-text-primary',tooltip:'import',directive:'ng-if="workbook.length"'},
                    ]);
			header += '</div>';
			header += '</div>';

		str = uikit3.card({header:header,body:body,classes:{card:'uk-card-default',body:'uk-padding-small',header:'uk-padding-small'}});

    	return str;
    };

    this.parseWorkBook = function(workbook,type){
    	var parsed = [],
            obj = {},
            self = this;

    	workbook.forEach(function(worksheet,worksheetKey){

    		parsed[worksheetKey] = [];

            //console.log('parseWorkBook',worksheet,worksheetKey);

            worksheet.header = Object.keys(worksheet.data[0]);

            delete worksheet.header.$$hashKey;

    		worksheet.data.forEach(function(row){
    			
    			switch(type){
                    case 'users' :   obj = {meta:{address:{}}}; self.parseUsers(worksheet,row,obj); break;
                    default :   obj = {}; worksheet.header.forEach(function(header){
                                    obj[header] = row[header];
                                }); break;
                }
                

    			parsed[worksheetKey].push(obj);

    		});
    	});

    	return parsed;
    };

    this.parseUsers = function(worksheet,row,data){
        worksheet.header.forEach(function(header){
            if(header === 'firstname' || header === 'lastname' || header === 'email'){
                data[header] = row[header];
            }else if(header === 'address' || header === 'city' || header === 'state' || header === 'zip' || header === 'country'){
                if(row[header].length){ data.meta.address[header] = row[header];}
            }else{
                if(row[header].length){ data.meta[header] = row[header]; }
            }
        });
        return data;
    };

    this.importTypes = function(){

        return [{
            id:1,
            name:'users',
            value:'user',
        },{
            id:2,
            name:'other',
            value:'',
        }];

    };
  });
