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


    // Name and Email
    var fetchPanelFieldsParams = {
        objectType: 'contact', 
        obectId: $scope.userData.contactData.Id, 
        pageLayoutId: '00he0000000SEzR',
        fields: ["FirstName","LastName","Email"]
    }

    var basicInfoPanel = { 
        objectType: 'contact', 
        obectId: $scope.userData.contactData.Id, 
        name: 'nameEmail',
        title: 'Name and Email',
        mode: 'view',
        allowEdit: true, 
        updateInfo: 'Update Basic Imformation',
        saveChngs: 'Save changes'
    }
    sfdcPanelFieldsService.panelFieldRecords['nameEmail'] = basicInfoPanel;
    sfdcPanelFieldsService.panelFieldRecords['nameEmail'].fetchPanelFieldsParams = jQuery.extend(true, {}, fetchPanelFieldsParams);

    fetchPanelFieldsParamsList.push(fetchPanelFieldsParams);

    // Phone
    var fetchPanelFieldsParams = {
        objectType: 'contact', 
        obectId: $scope.userData.contactData.Id, 
        pageLayoutId: '00he0000000SEzR',
        fields: ["HomePhone","OtherPhone","Fax"]
    }

    var basicInfoPanel = { 
        objectType: 'contact', 
        obectId: $scope.userData.contactData.Id, 
        name: 'phone',
        title: 'Phone Numbers',
        mode: 'view',
        allowEdit: true,
        editPhone: 'Update your phone numbers',
        saveNum: 'Save your phone number'
    }
    sfdcPanelFieldsService.panelFieldRecords['phone'] = basicInfoPanel;
    sfdcPanelFieldsService.panelFieldRecords['phone'].fetchPanelFieldsParams = jQuery.extend(true, {}, fetchPanelFieldsParams);

    fetchPanelFieldsParamsList.push(fetchPanelFieldsParams);

    // Mailing Info
    var fetchPanelFieldsParams = {
        objectType: 'contact', 
        obectId: $scope.userData.contactData.Id, 
        pageLayoutId: '00he0000000SEzR',
        fields: ["MailingStreet","MailingCity","MailingState","MailingPostalCode","MailingCountry"],
        requiredFields: ["MailingStreet","MailingCountry","MailingState","MailingCity","MailingPostalCode"],
        fieldFilter: function( item, panelValues, panelRecord ) {
          var val = panelValues['MailingCountry'];
          if(val == 'Canada') {
            panelRecord.fetchPanelFieldsParams.references['MailingState'].values = caProvenceFieldPanel;
          } else if(val == 'United States') {
            panelRecord.fetchPanelFieldsParams.references['MailingState'].values = usStatesFieldPanel;
          } else if(util.defined(val) && panelRecord.fetchPanelFieldsParams.references['MailingState'].values.length > 0) {
            panelRecord.fetchPanelFieldsParams.references['MailingState'].values = [];
          }
          return 1;
        },
        onSave: function( panelRecord, recordIndex, userData ) {

          var recordData = panelRecord.recordData[recordIndex];
          if(defined(panelRecord,"addRecordData")) {
              recordData = panelRecord.addRecordData[0];    
          }

          return validateAddress(recordData, "MailingStreet");
        },
        references: {
          MailingCountry: {
            values: countriesFieldPanel,
            otherFieldName: ''
          },
          MailingState: {
            values: usStatesFieldPanel,
            otherFieldName: ''
          }
        }        
    }

    var mailingInfoPanel = { 
        objectType: 'contact', 
        obectId: $scope.userData.contactData.Id, 
        name: 'mailingInfo',
        title: 'Mailing Address',
        mode: 'view',
        isAddress: true,
        allowEdit: true,
        editMail: 'Update your address',
        saveChanges: 'Save your changes'
    }
    sfdcPanelFieldsService.panelFieldRecords['mailingInfo'] = mailingInfoPanel;
    sfdcPanelFieldsService.panelFieldRecords['mailingInfo'].fetchPanelFieldsParams = jQuery.extend(true, {}, fetchPanelFieldsParams);

    fetchPanelFieldsParamsList.push(fetchPanelFieldsParams);

    // Billing Info
    var fetchPanelFieldsParams = {
        objectType: 'account', 
        obectId: $scope.userData.accountData.Id, 
        pageLayoutId: '00he0000000SEzR',
        fields: ["BillingStreet","BillingCity","BillingState","BillingPostalCode","BillingCountry"],
        requiredFields: ["BillingStreet","BillingCity","BillingState","BillingPostalCode","BillingCountry"],
        fieldFilter: function( item, panelValues, panelRecord ) {
          var val = panelValues['BillingCountry'];
          if(val == 'Canada') {
            panelRecord.fetchPanelFieldsParams.references['BillingState'].values = caProvenceFieldPanel;
          } else if(val == 'United States') {
            panelRecord.fetchPanelFieldsParams.references['BillingState'].values = usStatesFieldPanel;
          } else {
            panelRecord.fetchPanelFieldsParams.references['BillingState'].values = [];
          }
          return 1;
        },
        onSave: function( panelRecord, recordIndex, userData ) {

          var recordData = panelRecord.recordData[recordIndex];
          if(defined(panelRecord,"addRecordData")) {
              recordData = panelRecord.addRecordData[0];    
          }

          return validateAddress(recordData, "BillingStreet");
        },
        references: {
          BillingCountry: {
            values: countriesFieldPanel,
            otherFieldName: ''
          },
          BillingState: {
           values: usStatesFieldPanel,
           otherFieldName: ''
          }
        }        

    }

    var billingInfoPanel = { 
        objectType: 'account', 
        obectId: $scope.userData.accountData.Id, 
        name: 'billingInfo',
        title: 'Billing Address',
        mode: 'view',
        isAddress: true,
        allowEdit: true,
        editBilling: 'Update your billing address',
        save: 'Save your address'
    }
    sfdcPanelFieldsService.panelFieldRecords['billingInfo'] = billingInfoPanel;
    sfdcPanelFieldsService.panelFieldRecords['billingInfo'].fetchPanelFieldsParams = jQuery.extend(true, {}, fetchPanelFieldsParams);

    fetchPanelFieldsParamsList.push(fetchPanelFieldsParams);

    // Job Info
    var fetchPanelFieldsParams = {
        objectType: 'contact', 
        obectId: $scope.userData.contactData.Id, 
        pageLayoutId: '00he0000000SEzR',
        fields: ["Company__c","Corporate_Title__c"],
    }

    var jobInfoPanel = { 
        objectType: 'contact', 
        obectId: $scope.userData.contactData.Id, 
        name: 'jobInfo',
        title: 'Current Employment',
        mode: 'view',
        editJob: 'Update your job experience',
        saveExp: 'Sve your job experience',
        checkBoxGroup : {
          index: 5,
          name: 'Professional Designations'
        },
        allowEdit: true
    }
    sfdcPanelFieldsService.panelFieldRecords['jobInfo'] = jobInfoPanel;
    sfdcPanelFieldsService.panelFieldRecords['jobInfo'].fetchPanelFieldsParams = jQuery.extend(true, {}, fetchPanelFieldsParams);

    fetchPanelFieldsParamsList.push(fetchPanelFieldsParams);

    // EDU Info
    var fetchPanelFieldsParams = {
        objectType: 'contact', 
        obectId: $scope.userData.contactData.Id, 
        pageLayoutId: '00he0000000SEzR',
        fields: ["School_Name__c","Degree_Program_Name__c"]
    }

    var mailingInfoPanel = { 
        objectType: 'contact', 
        obectId: $scope.userData.contactData.Id, 
        name: 'eduInfo',
        title: 'Education',
        mode: 'view',
        allowEdit: true,
        editEd: 'Edit your address'
    }
    sfdcPanelFieldsService.panelFieldRecords['eduInfo'] = mailingInfoPanel;
    sfdcPanelFieldsService.panelFieldRecords['eduInfo'].fetchPanelFieldsParams = jQuery.extend(true, {}, fetchPanelFieldsParams);


    fetchPanelFieldsParamsList.push(fetchPanelFieldsParams); 

    async.map(fetchPanelFieldsParamsList, sfdcPanelFieldsService.fetchPanelFields, function(err, results){
      // results is now an array of stats for each file
      for(var i=0; i<results.length; i++) {

        var panelFieldsInfo = results[i];
        var err = results[i].err;

        if(util.errorCheck(err)) {
          $rootScope.$broadcast('handlePanelDisplayError');
          return;
        }
      

        var panelName='';
        switch(i) {
          case 0:
            panelName = 'nameEmail';
            break;
          case 1:
            panelName = 'phone';
            break;
          case 2:
            panelName = 'mailingInfo';
            break;
          case 3:
            panelName = 'billingInfo';
            break;
          case 4:
            panelName = 'jobInfo';
            break;
          case 5:
            panelName = 'eduInfo';
            break;
        }

        sfdcPanelFieldsService.panelFieldRecords[panelName].fieldRecords = panelFieldsInfo.fieldRecords;
        sfdcPanelFieldsService.panelFieldRecords[panelName].recordData = panelFieldsInfo.recordData;

      }

      $rootScope.$broadcast('handlePanelDisplay');

    });
  }
]);