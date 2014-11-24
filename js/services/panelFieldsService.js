panelFieldsServices = angular.module('sfdcServices');

panelFieldsServices.factory('sfdcPanelFieldsService', ['$resource','$http','$rootScope','remoteDataService','util',
  function($resource, $http, $rootScope, remoteDataService,util){

    var sfdcPanelFieldsService = {};
    sfdcPanelFieldsService.$http = $http;
    sfdcPanelFieldsService.userData = {};
    sfdcPanelFieldsService.viewMode = 'card';
    sfdcPanelFieldsService.mode = 'view';
    sfdcPanelFieldsService.panelFieldRecords = {};

    sfdcPanelFieldsService.changeMode = function(mode, recordName) {
      $rootScope.$broadcast('handleModeChange', mode, recordName);
    };

    sfdcPanelFieldsService.changeData = function(panelFieldsInfo) {
      $rootScope.$broadcast('handleDataChange', panelFieldsInfo);
    };


    sfdcPanelFieldsService.deleteFormData = function(panelInfo, recordIndex, callback) {
      var panelValues = panelInfo.recordData[recordIndex]; 
      remoteDataService.deletePanel(panelInfo.objectType, panelValues.Id, function(err, data) {
        callback(err, data);
      })
    };

    sfdcPanelFieldsService.saveFormData = function(panelInfo, recordIndex, callback) {

      var recordData = panelInfo.recordData;
      var fieldRecords = panelInfo.fieldRecords;
      //var fetchPanelFieldsParams = panelInfo.fetchPanelFieldsParams;

      if(util.defined(panelInfo,"addRecordData")) {
        var panelValues = panelInfo.addRecordData[recordIndex];
      } else {
        var panelValues = recordData[recordIndex];  
      }

      //var hiddenfields = fetchPanelFieldsParams.hiddenfields;
      //var readOnlyfields = fetchPanelFieldsParams.readOnlyfields;
      for(var i=0; i<fieldRecords.length; i++) {
        delete fieldRecords[i].$$hashKey;

        var field = _.findWhere(panelInfo.fields, {sfdcAPIName: fieldRecords[i].name});

        var val = panelValues[fieldRecords[i].name];
        if(!defined(val) && !fieldRecords[i].hidden && fieldRecords[i].type != 'MULTIPICKLIST') {
          fieldRecords[i].value = null;
          continue;
        }

        if(fieldRecords[i].type == 'DATETIME') {
          var mdate = moment(val);
          fieldRecords[i].epochValue = mdate.unix() * 1000;
        }

        if(fieldRecords[i].type == 'DATE') {

          // If a date object
          var dt = new Date();

          if(typeof panelValues[fieldRecords[i].name] == "object") {

            dt = new Date(panelValues[fieldRecords[i].name].toUTCString());
            fieldRecords[i].epochValue = dt.getTime();                

          } else {

            val = panelValues[fieldRecords[i].name] + ' 00:00';
            var parts = val.match(/(\d{1,2})\/(\d{1,2})\/(\d{4}) (\d{2}):(\d{2})/);

            var epochVal = Date.UTC(+parts[3], parts[1]-1, +parts[2], +parts[4], +parts[5]);
            dt = new Date(epochVal)
            fieldRecords[i].epochValue = dt.getTime();

          }

          var curr_date = dt.getDate();
          var curr_month = dt.getMonth() + 1; //Months are zero based
          var curr_year = dt.getFullYear();

          var dateText = curr_month + "/" + curr_date  + "/" + curr_year;
          fieldRecords[i].value = dateText;

              // Must match the values by 'Name' property
        } else if(fieldRecords[i].type == 'REFERENCE') {

          if(util.defined(field,"references.values")) {

            var refData = field.references.values;
            var match = _.findWhere(refData, {name: val});
            if(match !== null && typeof match !== "undefined") {
              fieldRecords[i].refValue = match.id;
              fieldRecords[i].value = panelValues[fieldRecords[i].name];
            } else {
              var otherFieldName = fetchPanelFieldsParams.references[fieldRecords[i].name].otherFieldName;
              fieldRecords[i].refOtherField = otherFieldName;
              fieldRecords[i].value = val;
            }
          }

        } else if(fieldRecords[i].type == 'MULTIPICKLIST') {
          var val = '';
          for(var j=0; j<fieldRecords[i].multiSelect.length; j++) {
            var fld = fieldRecords[i].multiSelect[j];
            if ( fld.ticked === true ) {
              if(val == '')
                val = fld.name
              else val = val + '; ' + fld.name;
            }
          }
          fieldRecords[i].value = val;

        } else {
          fieldRecords[i].value = panelValues[fieldRecords[i].name];  
        }   

        if(util.defined(field,"hidden") && field.hidden) {
          fieldRecords[i].value=match.value;
          fieldRecords[i].refValue=match.value;
        }          
      }

      // delete fieldRecords.$$hashKey 
      // for(var i=0; i<fieldRecords.length; i++) {
      //   delete fieldRecords[i].$$hashKey;
      // }

      remoteDataService.savePanel(panelInfo.objectType, panelValues.Id, fieldRecords, function(err, data) {
			  callback(err, data);
      })

    }

    sfdcPanelFieldsService.fetchPanelRecords = function(panelName, callback) {

      var fetchPanelFieldsParams = this.panelFieldRecords[panelName];

      var fieldStrings = _.pluck(fetchPanelFieldsParams.fields, 'sfdcAPIName');
      if(!util.defined(fieldStrings)) {
        callback(500, null);
        return;
      }

      remoteDataService.fetchPanelList(fetchPanelFieldsParams.objectType, 
        fetchPanelFieldsParams.parentField, fetchPanelFieldsParams.parentId, fieldStrings, function(err, data) {

        if(util.errorCheck(err)) {
          callback(err,null)
          return;
        }
        var fieldRecords = [];
        var fields = fetchPanelFieldsParams.fields;

        var keys = _.keys(data.result.fields);
        for(var i=0; i<keys.length; i++) {

          var key = keys[i];
          var order = -1;

          var field = _.findWhere(fetchPanelFieldsParams.fields, {sfdcAPIName: key});

          var viewOnly = _.where(fetchPanelFieldsParams.fields, 'view: true');
          if(util.defined(viewOnly,"length") && viewOnly.length > 0) {
            var vFields = _.pluck(viewOnly, 'sfdcAPIName');
            order = _.indexOf(vFields, key.toLowerCase()); 
          } else {
            order = _.indexOf(fieldStrings, key.toLowerCase());  
          }

          var fieldKey = data.result.fields[key];
          var multiSelect = [];
          if(defined(fieldKey,"pickList.length")) {
            for(var k=0; k<data.result.fields[key].pickList.length; k++) {
              var obj = {
                name: data.result.fields[key].pickList[k],
                ticked: false
              }
              multiSelect.push(obj);
            }
          }

          var fieldRecord = {
            name: key,
            type: data.result.fields[key].type,
            label: data.result.fields[key].label,
            pickList: data.result.fields[key].pickList,
            multiSelect: multiSelect,
            order: order,
            maxLength: data.result.fields[key].maxLength,
            isCalculated: data.result.fields[key].isCalculated,
            isNillable: data.result.fields[key].isNillable,
            description: data.result.fields[key].description,
            readOnly: field.readOnly,
            hidden: field.hidden,
            view: field.view
          }

          fieldRecords.push(fieldRecord);
        }

        fieldRecords = _.sortBy(fieldRecords, function(rec){ return rec.order; });

        for(var j=0; j<data.result.recordData.length; j++) {

          var recordData = data.result.recordData[j];

          for(var i=0; i<fieldRecords.length; i++) {

            var found = 0;
            for (var property in recordData) {
              if(property == fieldRecords[i].name)
                found=1;
            }

            if(found == 0) {
              recordData[fieldRecords[i].name]=null;
            }

            var val = recordData[fieldRecords[i].name];
            if(!defined(val)) {
              continue;
            }


            if(fieldRecords[i].type == 'MULTIPICKLIST') {
              var ms = fieldRecords[i].multiSelect.slice();
              for(var k=0; k<ms.length; k++) {
                if(val.indexOf( ms[k].name) > -1)
                   ms[k].ticked=true;
              }
              var obj = {
                value: val,
                multiSelect: ms
              }
              val = recordData[fieldRecords[i].name] = obj;
            }

            // Must match the values by 'Name' property
            if(fieldRecords[i].type == 'REFERENCE') {

              if(util.defined(field,"references.values")) {
                var refData = field.references.values;
                var match = _.findWhere(refData, {id: val});
                if(util.defined(match)) {
                  recordData[fieldRecords[i].name] = match.name;
                }
              }
            }

            if(fieldRecords[i].type == 'DATETIME') {
              var d = new Date(0);
              d.setUTCSeconds((val/1000));
              recordData[fieldRecords[i].name]=d;
            }

            if(fieldRecords[i].type == 'CURRENCY') {
              recordData[fieldRecords[i].name]=util.formatAmount(val);
            }

            if(fieldRecords[i].type == 'DATE') {

              var d = new Date(0);
              d.setUTCSeconds((val/1000));

              var curr_date = d.getDate();
              var curr_month = d.getMonth() + 1; //Months are zero based
              var curr_year = d.getFullYear();

              var dateText = curr_month + "/" + curr_date  + "/" + curr_year;

              recordData[fieldRecords[i].name]=dateText;
            }

          }          
        }

        var recordList = {
          fieldRecords: fieldRecords,
          recordData: data.result.recordData
        }

        callback(null, recordList);

      });      
    }


    sfdcPanelFieldsService.fetchPanelFields = function(fetchPanelFieldsParams, callback) {

      remoteDataService.fetchPanel(fetchPanelFieldsParams.objectType, fetchPanelFieldsParams.obectId, fetchPanelFieldsParams.fields, function(err, data) {

        if(util.errorCheck(err)) {
          callback(err,null)
        } else {
          var fieldRecords = [];
          var fields = fetchPanelFieldsParams.fields;
          var requiredFields = fetchPanelFieldsParams.requiredFields;
          fields = _.map(fields, function(field){ return field.toLowerCase().trim(); });
          requiredFields = _.map(requiredFields, function(field){ return field.toLowerCase().trim(); });

          var keys = _.keys(data.result.fields);
          for(var i=0; i<keys.length; i++) {

            var key = keys[i];

            var order = _.indexOf(fields, key.toLowerCase());

            var fieldRecord = {
              name: key,
              type: data.result.fields[key].type,
              label: data.result.fields[key].label,
              pickList: data.result.fields[key].pickList,
              order: order,
              maxLength: data.result.fields[key].maxLength,
              isCalculated: data.result.fields[key].isCalculated,
              isNillable: data.result.fields[key].isNillable,
              description: data.result.fields[key].description
            }

            var required = _.indexOf(requiredFields, key.toLowerCase());
            if(defined(required) && required > -1) {
              fieldRecord.isNillable = false;
            }

            fieldRecords.push(fieldRecord);
          }

          fieldRecords = _.sortBy(fieldRecords, function(rec){ return rec.order; });

          // Check for empty properties
          //for(var j=0; j<data.result.recordData.length; j++) {

          var recordData = {};
          if(defined(data,"result.recordData.length") && data.result.recordData.length > 0) {
            recordData = data.result.recordData[0];
          } else {
            recordData.Id = fetchPanelFieldsParams.obectId;
          }
          
          for(var i=0; i<fieldRecords.length; i++) {

              var found = 0;
              for (var property in recordData) {
                if(property == fieldRecords[i].name)
                  found=1;
              }

              if(found == 0) {
                recordData[fieldRecords[i].name]=null;
              }

              if(fieldRecords[i].type == 'DATETIME') {
                var d = new Date(0);
                var val = recordData[fieldRecords[i].name];
                d.setUTCSeconds((val/1000));
                recordData[fieldRecords[i].name]=d;
              }

              if(fieldRecords[i].type == 'DATE') {

                var d = new Date(0);
                var val = recordData[fieldRecords[i].name];
                d.setUTCSeconds((val/1000));

                var curr_date = d.getDate();
                var curr_month = d.getMonth() + 1; //Months are zero based
                var curr_year = d.getFullYear();

                var dateText = curr_month + "/" + curr_date  + "/" + curr_year;

                val=dateText;
              }

          }

          var recordFields = {
            fieldRecords: fieldRecords,
            recordData: [recordData]
          }

          callback(null, recordFields);

        }
      });
    }

  return sfdcPanelFieldsService;

}]);
