sfdcControllers.controller('SFDCAppPanelFieldsCtrl', ['util','common','$scope', '$rootScope','$state', '$stateParams','$timeout','remoteDataService','sfdcPanelFieldsService',
  function(util,common, $scope, $rootScope, $state, $stateParams, $timeout, remoteDataService, sfdcPanelFieldsService) {

    $scope.recordIndex = 0;
    $scope.recordId = 0;
    $scope.submitted = false;
    $scope.showAttachementAdd = false;

    var recName = $scope.recordName
    var params = recName.split(':');
    if(params.length > 1) {
      $scope.recordName = params[0];
      $scope.recordId = params[1];
    }
    $scope.displayMode = 'card';
    if(params.length > 2) {
      $scope.displayMode = params[2];
    }

    $scope.iFrameSrc = null;
    
    $scope.regions = [
        {
        name: "Alabama",
        code: "AL"},
    {
        name: "Alaska",
        code: "AK"},
    {
        name: "American Samoa",
        code: "AS"},
        ];

    $scope.qrcode = "http://api.qrserver.com/v1/create-qr-code/?size=75x75&data=https://" + domain + "/apex/ExamCheckin?id=";
    $scope.panelRecord = jQuery.extend(true, {}, sfdcPanelFieldsService.panelFieldRecords[$scope.recordName]); 
    $scope.panelRecordBackup = jQuery.extend(true, {}, $scope.panelRecord); 
    $scope.attachments = $scope.panelRecord.attachments;
    var add = [];
    if(util.defined($scope,"attachments") && util.defined($scope,"attachments.length")) {
      for(var i=0; i<$scope.attachments.length; i++)
        if($scope.attachments[i].ParentId == $scope.recordId)
          add.push($scope.attachments[i]);
    } else {
      //add.push($scope.attachments);
    }
    $scope.attachments = add;


    $scope.myShare = _.findWhere($scope.panelRecord.members, {Contact__c: $scope.userData.contactData.Id, Badge__c: $scope.recordId});

    if(params.length > 1 && defined($scope,"panelRecord.recordData.length")) {

      for(var i=0; i<$scope.panelRecord.recordData.length; i++) {
        if($scope.panelRecord.recordData[i].Id == $scope.recordId) {
          break;
        }
      }
      $scope.recordIndex = i;

    }

    if(util.defined($scope,"panelRecord")) {

      if(util.defined($scope,"panelRecord.addRecordData")) {
        $scope.panelValues = $scope.panelRecord.addRecordData[$scope.recordIndex];
      } else {
        if(util.defined($scope,"panelRecord.recordData")) {  
          $scope.panelValues = $scope.panelRecord.recordData[$scope.recordIndex];  
        }
      }
    }

    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];


    $timeout(function () {
      if(!util.defined($scope,"panelRecord.addRecordData") && !util.defined($scope,"panelRecord.basicInfoPanel.checkBoxGroup.readSave")) {
        $('#formArea').hide();
        $("#fieldSpin"+$scope.recordName+$scope.recordIndex).parent().css('height','130px')
        $scope.spinner = util.startSpinner("#fieldSpin"+$scope.recordName+$scope.recordIndex, '#8b8989', 0, 15)
      }
    });

    $scope.isName = function(fieldName) {
      return ($scope.panelRecord.nameFieldAPIname == fieldName);
    }
    
    $scope.getFieldInclude = function(fieldId) {
      var field = _.findWhere($scope.panelRecord.fields, {sfdcAPIName: fieldId});
      if(util.defined(field,"include")) 
        return field.include
      else return null;
    }

    $scope.getFieldHTML = function(fieldId, fieldValue) {
      var field = _.findWhere($scope.panelRecord.fields, {sfdcAPIName: fieldId});
      if(util.defined(field,"returnHTML")) 
        return field.returnHTML(fieldValue);
      else return null;
    }


    $scope.getFieldReferenceValue = function(fieldId, fieldValue) {
      var field = _.findWhere($scope.panelRecord.fields, {sfdcAPIName: fieldId});
      if(util.defined(field,"references.values") && field.references.values.length > 0) {
        var value = _.findWhere(field.references.values, {id: fieldValue});
        if(util.defined(value))
          return value.name;
        else return null;  
      }
      else return null;
    }

    $scope.getFieldReferenceValues = function(fieldId) {
      var field = _.findWhere($scope.panelRecord.fields, {sfdcAPIName: fieldId});
      if(util.defined(field,"references.values") && field.references.values.length > 0)
        return field.references.values;
      else return null;
    }

    $scope.getFieldReferenceOther = function(fieldId) {
      var field = _.findWhere($scope.panelRecord.fields, {sfdcAPIName: fieldId});
      if(util.defined(field,"references.otherFieldName") && field.references.otherFieldName.length > 0)
        return field.references.otherFieldName;
      else return null;
    }

    

    $scope.hasClass = function(fieldId, classname) {
      return $('#' + fieldId).hasClass(classname);      
    }

    $scope.getValidForm = function (formId) {
      return $('#' + formId).hasClass('ng-valid');
    };

    $scope.getValidFormItem = function (formId, fieldId) {
      return $('#' + fieldId).hasClass('ng-valid');
    };

    $rootScope.$on('handleModeChange', function(event, mode, recordName) {
      $scope.panelRecord.mode = mode;
    });

    $rootScope.$on('handleDataChange', function(event, panelFieldsInfo) {

      $scope.panelValues = jQuery.extend(true, {}, panelFieldsInfo.recordData[0]); 
      
      if($scope.panelRecord.addRecordData !== null && typeof $scope.panelRecord.addRecordData !== "undefined") {
        $scope.panelRecord.addRecordData[$scope.recordIndex] = $scope.panelValues;
      } else {
        if($scope.panelRecord.recordData !== null && typeof $scope.panelRecord.recordData !== "undefined") {  
          $scope.panelRecord.recordData[$scope.recordIndex] = $scope.panelValues;
        }
      }
    });

    $rootScope.$on('handleSave', function(event, mode, recordName) {
      $scope.savePanel();
    });

    $scope.isParticipant = function() {
      //return _.findWhere($scope.shares, {Contact__c: user.Id}) + 1;
      if(util.defined($scope,"panelValues.Contact_Owner__c")) {
        if($scope.panelValues.Contact_Owner__c == $scope.userData.contactData.Id)
          return false;
        else return true;        
      } else {
        return true;
      }
    }

    $scope.isShared = function() {
      //return _.findWhere($scope.shares, {Contact__c: user.Id}) + 1;
      if(util.defined($scope,"panelValues.Contact_Owner__c")) {
        if($scope.panelValues.Contact_Owner__c == $scope.userData.contactData.Id)
          return false;
        else return true;        
      } else {
        return true;
      }
    }

    $scope.getMembershipCount = function() {
      if($scope.panelRecord.membership && $scope.panelRecord.objectType == 'User_Group__c' && util.defined($scope,"panelRecord.members"))
        var fnd = _.where($scope.panelRecord.members, {User_Group__c: $scope.recordId});
      else var fnd = _.where($scope.panelRecord.members, {Badge__c: $scope.recordId});
      if(util.defined(fnd,"length"))
        return fnd.length;
      else return 0;
    }

    $scope.getSharedCount = function() {
      var fnd = _.where($scope.panelRecord.recordShares, {Post__c: $scope.recordId});
      if(util.defined(fnd,"length"))
        return fnd.length;
      else return 0;
    }


    $scope.removeAttachment = function(attachmentId) {
      remoteDataService.removeAttachment(attachmentId, function(err, data) {
          $rootScope.$apply(function(){ 
            $scope.attachments = _.reject($scope.attachments, function(obj) {
                  return (obj.Id == attachmentId);
            });
          });
      });
    }

    $scope.attach = function() {
      if($scope.panelRecord.mode=='add') {
        return $scope.savePanel(true);
      } else {
        $scope.iFrameSrc = 'https://' + util.contactsURL + util.uploadURL + $scope.recordId;        
        if($scope.showAttachementAdd == true) {
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        } else {
          $scope.showAttachementAdd=!$scope.showAttachementAdd;
        }
      }
    }
    $scope.doneAttch = function() {
      $("#myAttachModal").hide();
    }

    $scope.viewPanel = function() {
      util.navigate('panelListView',{fieldRecord: $scope.recordName, type: $scope.panelRecord.objectType, id: $scope.panelRecord.recordData[$scope.recordIndex].Id});
    }

    $scope.membersPanel = function() {
      util.navigate('panelListMembers',{fieldRecord: $scope.recordName, type: $scope.panelRecord.objectType, id: $scope.panelRecord.recordData[$scope.recordIndex].Id});
    }

    $scope.sharePanel = function() {
      util.navigate('panelListShare',{fieldRecord: $scope.recordName, type: $scope.panelRecord.objectType, id: $scope.panelRecord.recordData[$scope.recordIndex].Id});
    }

    $scope.editPanel = function() {
      $scope.panelRecord.mode = 'edit';
    }

    $scope.deletePanel = function() {

      var selector = '#fieldSpin' + $scope.recordName + $scope.recordIndex;
      $scope.spinner = util.startSpinner(selector, '#8b8989')
      util.disableToggleForm("#formArea", true);

      sfdcPanelFieldsService.deleteFormData($scope.panelRecord, $scope.recordIndex, function(err, data) {

        if(util.errorCheck(err)) {
          $rootScope.$apply(function(){ 
            util.disableToggleForm("#formArea", false);
            $scope.spinner.stop();
            $('#myGlobalErrorModal p').html(common.ERRORS.errorDelete.msg)
            $("#myGlobalErrorModal").modal();
          });
          return;
        }

        sfdcPanelFieldsService.fetchPanelRecords($scope.recordName, function(err, panelListData) {

          if(util.errorCheck(err)) {
            $rootScope.$apply(function(){ 
              util.disableToggleForm("#formArea", false);
              $scope.spinner.stop();
              $('#myGlobalErrorModal p').html(common.ERRORS.errorLoad.msg)
              $("#myGlobalErrorModal").modal();
            });
            return;
          }
          
          $scope.panelRecord.fieldRecords = panelListData.fieldRecords;
          $scope.panelRecord.recordData = panelListData.recordData;

          $rootScope.$apply(function(){
            //$scope.panelRecord.mode = 'view';

            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });

          });


        });
      });
    }


    $scope.switchToggle = function(fieldName) {
      util.disableToggleForm("#formArea", true);

      var selector = '#fieldSpin' + $scope.recordName + $scope.recordIndex;
      $scope.spinner = util.startSpinner(selector, '#8b8989')
      
      sfdcPanelFieldsService.saveFormData($scope.panelRecord, $scope.recordIndex, function(err, data) {
            
        $rootScope.$broadcast('switchToggleDisplay');

        $rootScope.$apply(function(){ 
          util.disableToggleForm("#formArea", false);
          $scope.spinner.stop();
        });
      });

    }


    $scope.savePanel = function(isAttachment) {

      var saveErrorText = "";
      $scope.panelRecord.error = "";
      $scope.submitted = true;

      if($scope.form.fields.$valid) {

        util.disableToggleForm("#formArea", true);

        var selector = '#fieldSpin' + $scope.recordName + $scope.recordIndex;
        $scope.spinner = util.startSpinner(selector, '#8b8989')

        if($scope.panelRecord.onSave !== null && typeof $scope.panelRecord.onSave !== "undefined") {
          saveErrorText = $scope.panelRecord.onSave( $scope.panelRecord, $scope.recordIndex, $scope.userData );
        }
        
        if(saveErrorText == "") {

          sfdcPanelFieldsService.saveFormData($scope.panelRecord, $scope.recordIndex, function(err, data) {
            if(util.errorCheck(err)) {
              $rootScope.$apply(function(){ 
                util.disableToggleForm("#formArea", false);
                $scope.spinner.stop();
                $('#myGlobalErrorModal p').html(common.ERRORS.errorSave.msg)
                $("#myGlobalErrorModal").modal();
              });
              return;
            }

            var objectId = data.result;

            delete $scope.panelRecord.addRecordData;

            if(err) {
            } else if(isAttachment) {
              
              $rootScope.$apply(function(){ 
                $scope.iFrameSrc = 'https://' + util.contactsURL + util.uploadURL + objectId;
                util.disableToggleForm("#formArea", false);
                $scope.spinner.stop();
                $scope.showAttachementAdd=!$scope.showAttachementAdd;
              });

            } else {        
              $scope.panelRecordBackup = jQuery.extend(true, {}, $scope.panelRecord); 

              if($scope.panelRecord.mode == 'add' && $scope.panelRecord.onRoute !== null && typeof $scope.panelRecord.onRoute !== "undefined") {

                
                $state.go($scope.panelRecord.onRoute);
                //$scope.panelRecord.mode = 'view';

              } else {

                $rootScope.$apply(function(){

                  $state.transitionTo($state.current, $stateParams, {
                      reload: true,
                      inherit: false,
                      notify: true
                  });
                  //$scope.panelRecord.mode = 'view';
                });
              }
            }
          });

        } else {
          
          util.disableToggleForm("#formArea", false);
          $scope.spinner.stop();
          $scope.panelRecord.error = saveErrorText;

        }
      }

    }
    
    $scope.cancelPanel = function() {

      if($scope.panelRecord.mode == 'add' && $scope.panelRecord.onRoute !== null && typeof $scope.panelRecord.onRoute !== "undefined") {

        delete $scope.panelRecord.addRecordData;
        //$scope.panelRecord.mode = 'view';
        $state.go($scope.panelRecord.onRoute);

      } else {

        $scope.panelRecord = jQuery.extend(true, {}, $scope.panelRecordBackup); 
        $scope.panelValues = $scope.panelRecord.recordData[$scope.recordIndex];
        $scope.panelRecord.mode = 'view';
      }
    }

    $scope.$on('handlePanelDisplayError', function() {

      $rootScope.$apply(function(){ 
        $scope.spinner.stop();
        $('#myGlobalErrorModal p').html(common.ERRORS.errorLoad.msg)
        $("#myGlobalErrorModal").modal();
      });

    });

    $scope.$on('handlePanelDisplay', function(event, finishName) {

      if((util.defined(finishName) && finishName == $scope.recordName) || !util.defined(finishName)) {
        $("#fieldSpin"+$scope.recordName+$scope.recordIndex).parent().css('height','100%')
        $('#formArea').show();
        $scope.spinner.stop();

        $rootScope.$apply(function(){

          $scope.panelRecord = jQuery.extend(true, {}, sfdcPanelFieldsService.panelFieldRecords[$scope.recordName]); 
          $scope.panelRecordBackup = jQuery.extend(true, {}, $scope.panelRecord); 
          $scope.panelValues = $scope.panelRecord.recordData[$scope.recordIndex];
          
          $scope.canEdit = true;
          var fetchPanelFieldsParams = sfdcPanelFieldsService.panelFieldRecords[$scope.recordName];

          if(defined(fetchPanelFieldsParams,"canEdit")) {
            $scope.canEdit = fetchPanelFieldsParams.canEdit($scope.panelRecord, $scope.panelValues);
          }

          $scope.dateOptions = {
            'year-format': "'yyyy'",
            'starting-day': 1
          };
          $scope.format = 'MM/dd/yyyy';
        });
      }
    });

    $scope.formatAmountDisplay = function(amount) {
      return util.formatAmountDisplay(amount);
    }

    $scope.getEpochDateTimeText = function(epochDate) {
      return util.getEpochDateTimeText(epochDate);
    }

    $scope.getDateValue = function(dateParam) {

      if(dateParam !== null && typeof dateParam !== "undefined") {

        if(dateParam == "Until present time.") {
          return "";
        } else {
          return dateParam;
        }
      }
    }

    $scope.getDateText = function(dateParam) {

      if(dateParam !== null && typeof dateParam !== "undefined") {

        if(dateParam == "Until present time.") {
          return dateParam;
        }

        if(typeof dateParam === "string") {
          var d = new Date(dateParam); // The 0 there is the key, which sets the date to the epoch
        } else {
          var d = dateParam;
        }

        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1; //Months are zero based
        var curr_year = d.getFullYear();

        return curr_month + "/" + curr_date  + "/" + curr_year;
      } else {
        return "";
      }
    }

    $scope.getDateTextEpoch = function(epochDate) {

      if(epochDate !== null && typeof epochDate !== "undefined") {
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds((epochDate/1000));

        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1; //Months are zero based
        var curr_year = d.getFullYear();

        return curr_month + "/" + curr_date  + "/" + curr_year;
      } else {
        return "";
      }
    }

    $scope.getDate = function(epochDate) {

      var d = new Date();
      if(epochDate !== null && typeof epochDate !== "undefined") {
        d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds((epochDate/1000));
      }
      return d;
    }

    $scope.disableField = function(value) {
      if(util.defined($scope,"panelRecord.fieldDisable")) {
        var pv = jQuery.extend(true, {}, $scope.panelValues);
        var pr = jQuery.extend(true, {}, $scope.panelRecord);
        return $scope.panelRecord.fieldDisable(value, pv, pr);
      } else {
        return false;
      }
    }


    $scope.criteriaMatch = function(value) {
      return function( item ) {

        if(item.hidden || ($scope.panelRecord.mode!='view' && item.readOnly)) { return 0; }
        
        if(util.defined($scope,"panelRecord.fieldFilter")) {

          //var pv = jQuery.extend(true, {}, $scope.panelValues);
          //var pr = jQuery.extend(true, {}, $scope.panelRecord);

          return $scope.panelRecord.fieldFilter(item, $scope.panelValues, $scope.panelRecord);

        } else {

          if(item.view) {
            return 1;
          } else {
            return 0;
          }
          
        }

      }
    }

  }
]);