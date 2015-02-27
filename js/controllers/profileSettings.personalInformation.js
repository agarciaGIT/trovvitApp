sfdcControllers.controller('SFDCAppProfileSettingsPersonalInformationCtrl', ['util','common','$rootScope', '$scope', '$state','$stateParams','remoteDataService','sfdcPanelFieldsService',
  function(util,common, $rootScope, $scope, $state, $stateParams, remoteDataService, sfdcPanelFieldsService) {

    $scope.navigate = function(route, params) {
      util.navigate(route, params);
    }
    
    $scope.userData = remoteDataService.userData;
    $scope.currentAccount = remoteDataService.currentAccount;
    $scope.envPath = envPath;
    $scope.photoMode = 'view';

    $scope.iFrameSrc = util.contactsURL + util.photoUpload;

    var fetchPanelFieldsParamsList = [];
    sfdcPanelFieldsService.panelFieldRecords = {};


    $scope.editPhoto = function() {
      $scope.photoMode = 'edit';
    }

    $scope.donePhoto = function() {
      util.disableToggleForm("#formArea", true);

      var selector = '#fieldSpin';
      $scope.spinner = util.startSpinner(selector, '#8b8989')


      $state.transitionTo($state.current, $stateParams, {
        reload: true,
        inherit: false,
        notify: true
      });      
    }

    $scope.fieldPanel = {
      objectType: 'contact', 
      obectId: $scope.userData.contactData.Id, 

      name: 'nameEmail',
      title: 'Name and Email',
      mode: 'view',
      allowEdit: true, 
      editButtonName: 'Update Basic Information',
      saveButtonName: 'Save changes',
      deleteButtonName: 'Delete',
      defaultSort: null,      
      onRoute: 'profileSettingsPersonalInformation',
      share: false,
      attachment: false,
      fields: [
        {
          sfdcAPIName: 'FirstName',
          view: true,
          readOnly: false,
          hidden: false         
        },
        {
          sfdcAPIName: 'LastName',
          view: true,
          readOnly: false,
          hidden: false         
        },
        {
          sfdcAPIName: 'Email',
          view: true,
          readOnly: true,
          hidden: false         
        }],
        canEdit: function( panelRecord, panelValues ) {
          return true;
        },
        onSave: function( panelRecord, recordIndex, userData ) {
          return "";
        },
        listFilter: function( item, userData ) {
          return 1;
        }
        //fieldFilter: function( item, panelValues, panelRecord ) {
          //return 1;
        //}
    }

    sfdcPanelFieldsService.panelFieldRecords[$scope.fieldPanel.name] = $scope.fieldPanel;
    
    sfdcPanelFieldsService.fetchPanelFields($scope.fieldPanel.name, function(err, panelListData) {
      if(util.errorCheck(err)) {
        $rootScope.$broadcast('handlePanelDisplay', $scope.fieldPanel.name);
        return;
      }
    
      $rootScope.$broadcast('handlePanelDisplay', $scope.fieldPanel.name);
    });      


    $scope.phonePanel = {
      objectType: 'contact', 
      obectId: $scope.userData.contactData.Id, 

      name: 'phone',
      title: 'Phone Numbers',
      mode: 'view',
      allowEdit: true, 
      editButtonName: 'Update your phone numbers',
      saveButtonName: 'Save your phone numbers',
      deleteButtonName: 'Delete',
      defaultSort: null,      
      onRoute: 'profileSettingsPersonalInformation',
      share: false,
      attachment: false,
      fields: [
        {
          sfdcAPIName: 'HomePhone',
          view: true,
          readOnly: false,
          hidden: false         
        },
        {
          sfdcAPIName: 'OtherPhone',
          view: true,
          readOnly: false,
          hidden: false         
        },
        {
          sfdcAPIName: 'Fax',
          view: true,
          readOnly: false,
          hidden: false         
        }],
        canEdit: function( panelRecord, panelValues ) {
          return true;
        },
        onSave: function( panelRecord, recordIndex, userData ) {
          return "";
        },
        listFilter: function( item, userData ) {
          return 1;
        }
        //fieldFilter: function( item, panelValues, panelRecord ) {
          //return 1;
        //}
    }

    sfdcPanelFieldsService.panelFieldRecords[$scope.phonePanel.name] = $scope.phonePanel;
    
    sfdcPanelFieldsService.fetchPanelFields($scope.phonePanel.name, function(err, panelListData) {
      if(util.errorCheck(err)) {
        $rootScope.$broadcast('handlePanelDisplay', $scope.phonePanel.name);
        return;
      }
    
      $rootScope.$broadcast('handlePanelDisplay', $scope.phonePanel.name);
    });   


    $scope.mailingInfoPanel = {
      objectType: 'contact', 
      obectId: $scope.userData.contactData.Id, 

      name: 'mailingInfo',
      title: 'Mailing Address',
      mode: 'view',
      allowEdit: true, 
      editButtonName: 'Update your address',
      saveButtonName: 'Save your changes',
      deleteButtonName: 'Delete',
      defaultSort: null,      
      onRoute: 'profileSettingsPersonalInformation',
      share: false,
      attachment: false,
      fields: [
        {
          sfdcAPIName: 'MailingStreet',
          view: true,
          readOnly: false,
          hidden: false         
        },
        {
          sfdcAPIName: 'MailingCity',
          view: true,
          readOnly: false,
          hidden: false         
        },
        {
          sfdcAPIName: 'MailingState',
          view: true,
          readOnly: false,
          hidden: false,
          references: {
            values: usStatesFieldPanel,
            otherFieldName: ''
          } 
        },
        {
          sfdcAPIName: 'MailingPostalCode',
          view: true,
          readOnly: false,
          hidden: false         
        },
        {
          sfdcAPIName: 'MailingCountry',
          view: true,
          readOnly: false,
          hidden: false,
          references: {
            values: countriesFieldPanel,
            otherFieldName: ''
          } 
        }
        ],
        canEdit: function( panelRecord, panelValues ) {
          return true;
        },
        onSave: function( panelRecord, recordIndex, userData ) {
          var recordData = panelRecord.recordData[recordIndex];
          if(defined(panelRecord,"addRecordData")) {
              recordData = panelRecord.addRecordData[0];    
          }

          return validateAddress(recordData, "MailingStreet");
        },
        listFilter: function( item, userData ) {
          return 1;
        },
        fieldFilter: function( item, panelValues, panelRecord ) {

          var field = _.findWhere(panelRecord.fields, {sfdcAPIName: 'MailingState'});
          
          var val = panelValues['MailingCountry'];
          if(val == 'Canada') {
            field.references.values = caProvenceFieldPanel;
          } else if(val == 'United States') {
            field.references.values = usStatesFieldPanel;
          } else if(util.defined(val) && field.references.values.length > 0) {
            field.references.values = [];
          }
          return 1;
        }
    }

    sfdcPanelFieldsService.panelFieldRecords[$scope.mailingInfoPanel.name] = $scope.mailingInfoPanel;
    
    sfdcPanelFieldsService.fetchPanelFields($scope.mailingInfoPanel.name, function(err, panelListData) {
      if(util.errorCheck(err)) {
        $rootScope.$broadcast('handlePanelDisplay', $scope.mailingInfoPanel.name);
        return;
      }
    
      $rootScope.$broadcast('handlePanelDisplay', $scope.mailingInfoPanel.name);
    });       


    // $scope.billingInfoPanel = {
    //   objectType: 'contact', 
    //   obectId: $scope.userData.contactData.Id, 

    //   name: 'billingInfo',
    //   title: 'Billing Address',
    //   mode: 'view',
    //   allowEdit: true, 
    //   editButtonName: 'Update your address',
    //   saveButtonName: 'Save your changes',
    //   deleteButtonName: 'Delete',
    //   defaultSort: null,      
    //   onRoute: 'profileSettingsPersonalInformation',
    //   share: false,
    //   attachment: false,
    //   fields: [
    //     {
    //       sfdcAPIName: 'BillingStreet',
    //       view: true,
    //       readOnly: false,
    //       hidden: false         
    //     },
    //     {
    //       sfdcAPIName: 'BillingCity',
    //       view: true,
    //       readOnly: false,
    //       hidden: false         
    //     },
    //     {
    //       sfdcAPIName: 'BillingState',
    //       view: true,
    //       readOnly: false,
    //       hidden: false,
    //       references: {
    //         values: usStatesFieldPanel,
    //         otherFieldName: ''
    //       } 
    //     },
    //     {
    //       sfdcAPIName: 'BillingPostalCode',
    //       view: true,
    //       readOnly: false,
    //       hidden: false         
    //     },
    //     {
    //       sfdcAPIName: 'BillingCountry',
    //       view: true,
    //       readOnly: false,
    //       hidden: false,
    //       references: {
    //         values: countriesFieldPanel,
    //         otherFieldName: ''
    //       } 
    //     }
    //     ],
    //     canEdit: function( panelRecord, panelValues ) {
    //       return true;
    //     },
    //     onSave: function( panelRecord, recordIndex, userData ) {
    //       var recordData = panelRecord.recordData[recordIndex];
    //       if(defined(panelRecord,"addRecordData")) {
    //           recordData = panelRecord.addRecordData[0];    
    //       }

    //       return validateAddress(recordData, "BillingStreet");
    //     },
    //     listFilter: function( item, userData ) {
    //       return 1;
    //     },
    //     fieldFilter: function( item, panelValues, panelRecord ) {

    //       var field = _.findWhere(panelRecord.fields, {sfdcAPIName: 'BillingState'});
          
    //       var val = panelValues['BillingCountry'];
    //       if(val == 'Canada') {
    //         field.references.values = caProvenceFieldPanel;
    //       } else if(val == 'United States') {
    //         field.references.values = usStatesFieldPanel;
    //       } else if(util.defined(val) && field.references.values.length > 0) {
    //         field.references.values = [];
    //       }
    //       return 1;
    //     }
    // }

    // sfdcPanelFieldsService.panelFieldRecords[$scope.billingInfoPanel.name] = $scope.billingInfoPanel;
    
    // sfdcPanelFieldsService.fetchPanelFields($scope.billingInfoPanel.name, function(err, panelListData) {
    //   if(util.errorCheck(err)) {
    //     $rootScope.$broadcast('handlePanelDisplay', $scope.billingInfoPanel.name);
    //     return;
    //   }
    
    //   $rootScope.$broadcast('handlePanelDisplay', $scope.billingInfoPanel.name);
    // });       

    $scope.jobInfoPanel = {
      objectType: 'contact', 
      obectId: $scope.userData.contactData.Id, 

      name: 'jobInfo',
      title: 'Employement Information',
      mode: 'view',
      allowEdit: true, 
      editButtonName: 'Update your address',
      saveButtonName: 'Save your changes',
      deleteButtonName: 'Delete',
      defaultSort: null,      
      onRoute: 'profileSettingsPersonalInformation',
      share: false,
      attachment: false,
      fields: [
        {
          sfdcAPIName: 'Company__c',
          view: true,
          readOnly: false,
          hidden: false         
        },
        {
          sfdcAPIName: 'Corporate_Title__c',
          view: true,
          readOnly: false,
          hidden: false         
        },
        {
          sfdcAPIName: 'Years_of_Experience__c',
          view: true,
          readOnly: false,
          hidden: false
        }
        ],
        canEdit: function( panelRecord, panelValues ) {
          return true;
        },
        onSave: function( panelRecord, recordIndex, userData ) {
          return "";
        },
        listFilter: function( item, userData ) {
          return 1;
        },
        fieldFilter: function( item, panelValues, panelRecord ) {

          var field = _.findWhere(panelRecord.fields, {sfdcAPIName: 'BillingState'});
          
          var val = panelValues['BillingCountry'];
          if(val == 'Canada') {
            field.references.values = caProvenceFieldPanel;
          } else if(val == 'United States') {
            field.references.values = usStatesFieldPanel;
          } else if(util.defined(val) && field.references.values.length > 0) {
            field.references.values = [];
          }
          return 1;
        }
    }

    sfdcPanelFieldsService.panelFieldRecords[$scope.jobInfoPanel.name] = $scope.jobInfoPanel;
    
    sfdcPanelFieldsService.fetchPanelFields($scope.jobInfoPanel.name, function(err, panelListData) {
      if(util.errorCheck(err)) {
        $rootScope.$broadcast('handlePanelDisplay', $scope.jobInfoPanel.name);
        return;
      }
    
      $rootScope.$broadcast('handlePanelDisplay', $scope.jobInfoPanel.name);
    });       

    $scope.eduInfoPanel = {
      objectType: 'contact', 
      obectId: $scope.userData.contactData.Id, 

      name: 'eduInfo',
      title: 'Employement Information',
      mode: 'view',
      allowEdit: true, 
      editButtonName: 'Update your address',
      saveButtonName: 'Save your changes',
      deleteButtonName: 'Delete',
      defaultSort: null,      
      onRoute: 'profileSettingsPersonalInformation',
      share: false,
      attachment: false,
      fields: [
        {
          sfdcAPIName: 'School_Name__c',
          view: true,
          readOnly: false,
          hidden: false         
        },
        {
          sfdcAPIName: 'Degree_Program_Name__c',
          view: true,
          readOnly: false,
          hidden: false         
        }
        ],
        canEdit: function( panelRecord, panelValues ) {
          return true;
        },
        onSave: function( panelRecord, recordIndex, userData ) {
          return "";
        },
        listFilter: function( item, userData ) {
          return 1;
        },
        fieldFilter: function( item, panelValues, panelRecord ) {

          var field = _.findWhere(panelRecord.fields, {sfdcAPIName: 'BillingState'});
          
          var val = panelValues['BillingCountry'];
          if(val == 'Canada') {
            field.references.values = caProvenceFieldPanel;
          } else if(val == 'United States') {
            field.references.values = usStatesFieldPanel;
          } else if(util.defined(val) && field.references.values.length > 0) {
            field.references.values = [];
          }
          return 1;
        }
    }

    sfdcPanelFieldsService.panelFieldRecords[$scope.eduInfoPanel.name] = $scope.eduInfoPanel;
    
    sfdcPanelFieldsService.fetchPanelFields($scope.eduInfoPanel.name, function(err, panelListData) {
      if(util.errorCheck(err)) {
        $rootScope.$broadcast('handlePanelDisplay', $scope.eduInfoPanel.name);
        return;
      }
    
      $rootScope.$broadcast('handlePanelDisplay', $scope.eduInfoPanel.name);
    });       

  }
]);