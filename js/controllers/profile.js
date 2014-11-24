sfdcControllers.controller('SFDCAppProfileCtrl', ['util','common','$rootScope', '$scope', '$state','remoteDataService','sfdcPanelFieldsService',
  function(util,common, $rootScope, $scope, $state, remoteDataService, sfdcPanelFieldsService) {

    $scope.userData = remoteDataService.userData;
    $scope.currentAccount = remoteDataService.currentAccount;

    $scope.navigateDash = function(route, params) {
      $rootScope.$broadcast('handleNavigate',route, params);
    }

    $scope.getImageURL = function(imageURL) {
      return getImageURL(imageURL);
    }

    var count = 0;
    var max = 4;
    if(defined($scope,"userData.contactData.HomePhone") || defined($scope,"userData.contactData.OtherPhone")) {
      count++;
    }
    if(defined($scope,"userData.userData.FullPhotoUrl")) {
      count++;
    }
    if(defined($scope,"userData.professionalExperienceData") && $scope.userData.professionalExperienceData.length > 0) {
      count++;
    }
    if(defined($scope,"userData.acdemicExperienceData") && $scope.userData.acdemicExperienceData.length > 0) {
      count++;
    }
    $scope.profilePercentComplete = (count / max) * 100;

  }
]);


// not being used