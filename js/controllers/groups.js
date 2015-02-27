sfdcControllers.controller('SFDCAppGroupsCtrl', ['util','common','$rootScope', '$scope', '$state','$stateParams','remoteDataService','sfdcPanelFieldsService',
  function(util,common, $rootScope, $scope, $state, $stateParams, remoteDataService, sfdcPanelFieldsService) {

    $scope.navigate = function(route, params) {
      util.navigate(route, params);
    }
    
    $scope.userData = remoteDataService.userData;
    $scope.currentAccount = remoteDataService.currentAccount;
    $scope.envPath = envPath;

    var now = new Date();

    $scope.fieldPanel = {
      objectType: 'User_Group__c', 
      obectId: '', 
      name: 'groups',
      title: 'User Groups',
      mode: 'view',
      allowEdit: true, 
      editButtonName: 'Edit',
      saveButtonName: 'Save',
      deleteButtonName: 'Delete',
      parentField: 'Contact_Owner__c',
      parentId: $scope.userData.contactData.Id,
      defaultSort: 'CreatedDate',
      defaultSortReverse: true,      
      onRoute: 'groups',
      share: false,
      membership: true,
      attachment: false,
      fields: [
        {
          sfdcAPIName: 'Contact_Owner__c',
          view: false,
          readOnly: false,
          hidden: true         
        },          
        {
          sfdcAPIName: 'Name',
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

    sfdcPanelFieldsService.panelFieldRecords[$scope.fieldPanel.name] = $scope.fieldPanel;

    sfdcPanelFieldsService.fetchPanelRecords($scope.fieldPanel.name, function(err, panelListData) {
      if(util.errorCheck(err)) {
        $rootScope.$broadcast('handlePanelListDisplayError');
        return;
      }
    
      $rootScope.$broadcast('handlePanelListDisplay');
    });   

  }
]);