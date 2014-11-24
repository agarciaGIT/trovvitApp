sfdcControllers.controller('SFDCAppPanelListAddCtrl', ['util','common','$scope', '$rootScope','$state','$timeout','$stateParams','remoteDataService','sfdcPanelFieldsService',
  function(util,common, $scope, $rootScope, $state, $timeout, $stateParams, remoteDataService, sfdcPanelFieldsService) {

    $scope.envPath = envPath;
    $scope.userData = remoteDataService.userData;

    if(defined(sfdcPanelFieldsService,"panelFieldRecords") && defined($stateParams,"fieldRecord")) {
      $scope.panelRecord = sfdcPanelFieldsService.panelFieldRecords[$stateParams.fieldRecord];      
    } else {
      $state.go('dash');
    }

  }
]);

sfdcControllers.controller('SFDCAppPanelListCtrl', ['util','common','$scope', '$rootScope','$state','$timeout','$stateParams','$filter','remoteDataService','sfdcPanelFieldsService',
  function(util,common, $scope, $rootScope, $state, $timeout, $stateParams, $filter, remoteDataService, sfdcPanelFieldsService) {

    $scope.envPath = envPath;
    $scope.userData = remoteDataService.userData;

    var orderBy = $filter('orderBy');
    var lastSort = '';

    
    $('#fieldListArea').hide();
    var selector = '#fieldListSpin';
    var obj = $(selector)
    if(obj !== null && typeof obj !== "undefined" && obj.length > 0) {
      $scope.spinner = new Spinner(opts).spin(obj[0]);
    }   

    $scope.$on('handlePanelListDisplayError', function() {
      $rootScope.$apply(function(){
        $scope.spinner.stop();
        $('#myGlobalErrorModal p').html(common.ERRORS.errorLoad.msg)
        $("#myGlobalErrorModal").modal();        
      });
    });

    $scope.$on('handlePanelListDisplay', function() {

      $rootScope.$apply(function(){
        $scope.panelInfo = sfdcPanelFieldsService.panelFieldRecords[$scope.recordName];  
        $scope.panelRecord = jQuery.extend(true, {}, sfdcPanelFieldsService.panelFieldRecords[$scope.recordName]); 
        $scope.panelRecordBackup = jQuery.extend(true, {}, $scope.panelRecord); 
        //$scope.panelListData = sfdcPanelFieldsService.panelFieldRecords[$scope.fieldPanel.name].panelListData;
           
        if($scope.panelInfo.fieldRecords.length > 0 && defined($scope,"panelInfo.defaultSort")) {
          $scope.panelInfo.recordData = orderBy($scope.panelInfo.recordData, $scope.panelInfo.defaultSort, false);
          lastSort = $scope.panelInfo.defaultSort;
        }
        $scope.reverse = false;

        if($scope.panelRecord !== null && typeof $scope.panelRecord !== "undefined") {

          if(util.defined($scope,"panelRecord.addRecordData")) {
            $scope.panelValues = $scope.panelRecord.addRecordData[$scope.recordIndex];
          } else {
            if(util.defined($scope,"panelRecord.recordData")) {  
              $scope.panelValues = $scope.panelRecord.recordData[$scope.recordIndex];  
            }
          }
        }

        if(util.defined($scope,"spinner")) {
          $scope.spinner.stop();
        }

      });

      $timeout(function() {
        $rootScope.$broadcast('handlePanelDisplay');        
        $('#fieldListArea').show();
      },1000);
      

    });

    $scope.showTextArea = function(label, value) {
      $scope.textareaModalLabel = label;
      $scope.textareaModalValue = value;
      $("#myTextAreaModal").modal();
    }

    $scope.order = function(fname) {
      if(lastSort == fname) {
        $scope.reverse = !$scope.reverse;
      } else {
        $scope.reverse = false;
      }
      $scope.panelInfo.recordData = orderBy($scope.panelInfo.recordData, fname, $scope.reverse);
      lastSort = fname;
    }

    $scope.addRecord = function() {
      var recordData = sfdcPanelFieldsService.panelFieldRecords[$scope.recordName].addRecordData = [{}];
      var fieldRecords = sfdcPanelFieldsService.panelFieldRecords[$scope.recordName].fieldRecords;

      $('#fieldlist').hide();

      // Initialize Record
      for(var i=0; i<fieldRecords.length; i++) {
          var found = 0;
          for (var property in recordData[0]) {
            if(property == fieldRecords[i].name)
              found=1;
          }
          if(found == 0) {
            recordData[0][fieldRecords[i].name]=null;
          }
      }
      recordData[0].Id='';

      var fetchPanelFieldsParams = sfdcPanelFieldsService.panelFieldRecords[$scope.recordName];
      var parentField = '';
      var parentId = '';

      if(defined(fetchPanelFieldsParams, "parentField") && defined(fetchPanelFieldsParams, "parentId")) {

          parentField = fetchPanelFieldsParams.parentField;
          parentId = fetchPanelFieldsParams.parentId;

          recordData[0][parentField] = parentId;
          var rec = {
            name: parentField,
            type: 'LOOKUP'
          }
          fieldRecords.push(rec);
      } else {
        // Error
      }


      sfdcPanelFieldsService.panelFieldRecords[$scope.recordName].mode='add';
      $state.go('panelListAdd',{fieldRecord:$scope.panelInfo.name});
      //$rootScope.$broadcast('handlePanelDisplay');        

    }


    $scope.criteriaMatch = function(value) {
      return function( item ) {

        var fetchPanelFieldsParams = sfdcPanelFieldsService.panelFieldRecords[$scope.recordName].fetchPanelFieldsParams;
        if(defined(fetchPanelFieldsParams,"listFilter")) {

          return fetchPanelFieldsParams.listFilter(item, $scope.userData);

        } else {

          return 1;
        }

      }
    }

    $scope.criteriaFieldMatch = function(value) {
      return function( item ) {

        if(item.hidden || ($scope.panelRecord.mode!='view' && item.readOnly)) { return 0; }

        if($scope.panelRecord.mode=='view') {
          // Check View Fields if given
          if(defined($scope,"panelRecord.fetchPanelFieldsParams.viewFields")) {
            for(var i=0; i< $scope.panelRecord.fetchPanelFieldsParams.viewFields.length; i++) {
              if($scope.panelRecord.fetchPanelFieldsParams.viewFields[i] == item.name) {
                return 1;
              }
            }
            return 0;
          }
        }
        
        if($scope.panelRecord.fetchPanelFieldsParams !== null && typeof $scope.panelRecord.fetchPanelFieldsParams !== "undefined" &&
           $scope.panelRecord.fetchPanelFieldsParams.fieldFilter !== null && typeof $scope.panelRecord.fetchPanelFieldsParams.fieldFilter !== "undefined") {

          return $scope.panelRecord.fetchPanelFieldsParams.fieldFilter(item, $scope.panelValues, $scope.panelRecord);

        } else {

          return 1;
        }

      }
    }


  }
]);