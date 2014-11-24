sfdcControllers.controller('SFDCAppDashCtrl', ['util','common','$scope', '$rootScope', '$state','$location','remoteDataService',
  function(util,common, $scope, $rootScope, $state, $location, remoteDataService) {

    $scope.userData = remoteDataService.userData;

    $scope.items = {};
    $scope.userName = "";
    $scope.envPath = envPath;

    $scope.now = new Date().getTime();

    $scope.navigate = function(route, params) {
      util.navigate(route, params);
    }
    
    $scope.$on('handleNavigate', function(event, route, params) {
      util.navigate(route, params);
    });
    
    $scope.toProperCase = function(str) {
      return str.toProperCase();
    }


    $scope.isActive = function(viewLocation) {
      return viewLocation == $location.path();
    }

    $scope.setPage = function (page) {
        $state.transitionTo(page);
    };

    $scope.criteriaMatch = function(value) {
      return function( item ) {
        if((defined($scope,"userData.frmContract.completedDate") && item.Candidate_Commitment__c == $scope.userData.frmContract.Id) || !defined(item,"Exam_Site__r.Exam__r.Exam__c")) {
          return 0;
        } else {
          return 1;
        }
      }
    };


  }
]);
