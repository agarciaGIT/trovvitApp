sfdcControllers.controller('SFDCAppOrdersCtrl', ['util','common','$scope', '$rootScope', '$state','$location','$window','$filter','remoteDataService',
  function(util,common, $scope, $rootScope, $state, $location, $window, $filter, remoteDataService) {

    $scope.envPath = envPath;
    $scope.userData = remoteDataService.userData;
    var orderBy = $filter('orderBy');

    $scope.navigate = function(route, params) {
      util.navigate(route, params);
    }

    $scope.isOppPaid = function(oppStageName) {
      return isOppPaid(oppStageName);
    }
    
    $scope.order = function(predicate, reverse) {
      $scope.userData.opportunityData = orderBy($scope.userData.opportunityData, predicate, reverse);
    };    

    $scope.order('-CreatedDate',false);

    $scope.getEpochDateTimeText = function(epochDate) {
      return util.getEpochDateTimeText(epochDate);
    }

    $scope.formatAmountDisplay = function(amount) {
      return util.formatAmountDisplay(amount);
    }

    $scope.payOpportunity = function(Opp) {
      payOpportunity(Opp, remoteDataService, $window);
    }

  }
]);