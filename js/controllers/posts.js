sfdcControllers.controller('SFDCAppPostsCtrl', ['util','common','$rootScope', '$scope', '$state','$stateParams','remoteDataService','sfdcPanelFieldsService',
  function(util,common, $rootScope, $scope, $state, $stateParams, remoteDataService, sfdcPanelFieldsService) {

    $scope.navigate = function(route, params) {
      util.navigate(route, params);
    }
    
    $scope.userData = remoteDataService.userData;
    $scope.currentAccount = remoteDataService.currentAccount;
    $scope.envPath = envPath;

    var now = new Date();

    $scope.postFolders = [];
    remoteDataService.getPostFolders(function(err, data) {
      if (util.errorCheckBroadcast(err)) {
        return;
      }
      //$scope.postFolders = _.pluck(data.result,'Name');
      for(var i=0; i<data.result.length; i++) {
        var obj = {
          id: data.result[i].Id,
          name: data.result[i].Name
        }
        $scope.postFolders.push(obj);
      }

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
        defaultSort: 'Post_Date_Time__c',
        defaultSortReverse: true,      
        onRoute: 'posts',
        share: true,
        attachment: true,
        fields: [
          {
            sfdcAPIName: 'Contact_Owner__c',
            view: false,
            readOnly: false,
            hidden: true         
          },
          {
            sfdcAPIName: 'Post_Text__c',
            view: true,
            readOnly: false,
            hidden: false         
          },
          {
            sfdcAPIName: 'Post_Date_Time__c',
            defaultValue: now,
            view: true,
            readOnly: false,
            hidden: false         
          },
          {
            sfdcAPIName: 'Post_Folder__c',
            view: true,
            readOnly: false,
            hidden: false,
            references: {
              values: $scope.postFolders,
              otherFieldName: 'Post_Folder_New__c'
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
      
        $rootScope.$broadcast('handlePanelListDisplay');
      });   

    });
  }
]);