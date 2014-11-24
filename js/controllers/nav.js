sfdcControllers.controller('SFDCAppNavCtrl', ['util','common','$scope', '$rootScope', '$state','$location', '$timeout','$window','remoteDataService','$q','$http',
  function(util,common, $scope, $rootScope, $state, $location, $timeout, $window, remoteDataService,$q,$http) {

    var defer = $q.defer();
    $scope.envPath = envPath;

    if(document.URL.indexOf('reg') == -1 && document.URL.indexOf('apex') == -1) {

      remoteDataService.fetchData(defer, function(err, data) {
        if(util.errorCheckBroadcast(err, common.ERRORS.errorRetrieve.msg)) {return;}

        $scope.userData = remoteDataService.userData;

        $scope.membershipURL = membershipURL;
        $scope.bookStoreURL = bookStoreURL;
        $scope.contactsURL = contactsURL;
      });
    
    }

    $scope.navigate = function(route, params) {
      util.navigate(route, params); //used for dasboard button 
    }

    $scope.gotoChatterProfile = function() {

      var chURL = String.format(chatterProfileURL, remoteDataService.userData.userData.Id);
      $scope.chatterProfileURL = contactsURL + chURL;

      $window.location.href = $scope.chatterProfileURL;
    }

    $scope.isActive = function(viewLocation) {
      return viewLocation == $location.path();
    }

    $scope.setPage = function (page) {
        $state.transitionTo(page);
    };

    $scope.decodeEntities = function(content) {
      return decodeEntities(content);
    }

    $scope.gotoBookstore = function() {
      $window.open(contactsURL + bookStoreURL);
    }

    $scope.canEnterCredits = function() {
      var mdate = moment.tz($scope.userData.cpeCycle,'GMT');
      var now = moment();

      if(mdate.isAfter(now)) 
        return false;
      else return true;
    }

    $scope.hasERP = false;
    $scope.hasFRM = false;
    $scope.hasCPE = false;

    $rootScope.$on('handleGetUserInfo', function(event, message) {

      $scope.userData=message;

      $rootScope.$apply(function(){
        if($scope.userData.frmContract !== null && typeof $scope.userData.frmContract !== "undefined") {
          $scope.hasFRM = true;
        }
        if($scope.userData.erpContract !== null && typeof $scope.userData.erpContract !== "undefined") {
          $scope.hasERP = true;
        }
        if($scope.userData.cpeContract !== null && typeof $scope.userData.cpeContract !== "undefined") {
          $scope.hasCPE = true;
        }
      });

    });
    
  }
]);


sfdcControllers.controller('SFDCAppNavPublicCtrl', ['util','common','$scope', '$rootScope', '$state','$location', '$timeout','$window','remoteDataService','$q','$http',
  function(util,common, $scope, $rootScope, $state, $location, $timeout, $window, remoteDataService,$q,$http) {

    $scope.userInfo = remoteDataService.userData;
    $scope.currentAccount = remoteDataService.currentAccount;

    $scope.envPath = envPath;

    $scope.loginURL = util.contactsURL;

  }
]);
