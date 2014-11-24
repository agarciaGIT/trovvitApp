sfdcControllers.controller('SFDCAppPostsCtrl', ['util','common','$rootScope', '$scope', '$state','$stateParams','remoteDataService','sfdcPanelFieldsService',
  function(util,common, $rootScope, $scope, $state, $stateParams, remoteDataService, sfdcPanelFieldsService) {

    $scope.navigate = function(route, params) {
      util.navigate(route, params);
    }
    
    $scope.userData = remoteDataService.userData;
    $scope.currentAccount = remoteDataService.currentAccount;
    $scope.envPath = envPath;


    $scope.fieldPanel = {
      objectType: 'Post__c', 
      obectId: '', 
      name: 'posts',
      title: 'Posts',
      mode: 'view',
      allowEdit: true, 
      editButtonName: 'Edit',
      saveButtonName: 'Save',
      deleteButtonName: 'Delete',
      parentField: 'Contact_Owner__c',
      parentId: $scope.userData.contactData.Id,
      defaultSort: null,      
      onRoute: 'posts',
      fields: [
        {
          sfdcAPIName: 'Name',
          view: true,
          readOnly: false,
          hidden: false,
          references: {
            values: null,
            objectType: null,
            otherFieldName: null
          }
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

    sfdcPanelFieldsService.fetchPanelRecords($scope.fieldPanel.name, function(err, panelListData) {
      if(util.errorCheck(err)) {
        $rootScope.$broadcast('handlePanelListDisplayError');
        return;
      }
    
      sfdcPanelFieldsService.panelFieldRecords[$scope.fieldPanel.name].fieldRecords = panelListData.fieldRecords;
      sfdcPanelFieldsService.panelFieldRecords[$scope.fieldPanel.name].recordData = panelListData.recordData;

      $rootScope.$broadcast('handlePanelListDisplay');
    });      



  }
]);