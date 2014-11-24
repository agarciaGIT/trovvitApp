sfdcControllers.controller('SFDCAppProfileSettingsMembershipCtrl', ['util', 'common', '$rootScope', '$scope', '$state', '$stateParams', '$window', 'remoteDataService', 'sfdcPanelFieldsService',
  function (util, common, $rootScope, $scope, $state, $stateParams, $window, remoteDataService, sfdcPanelFieldsService) {

        $scope.navigate = function (route, params) {
            util.navigate(route, params);
        }
        
        $scope.userData = remoteDataService.userData;
        $scope.currentAccount = remoteDataService.currentAccount;
        $scope.envPath = envPath;

        $scope.autoRenew = false;
        if ($scope.userData.membershipContract.Status == 'Activated ( Auto-Renew )') {
            $scope.autoRenew = true;
        }

        $scope.switchActive = true;

        $scope.memberType = MEMBER_PROD_CODE;
        $scope.paymentMethod = "creditCard";
        $scope.searchType = "Name";

        $scope.membership = null;
        $scope.fee = 0;

        $scope.MEMBER_PROD_CODE = MEMBER_PROD_CODE;
        $scope.MEMBER_STUDENT_PROD_CODE = MEMBER_STUDENT_PROD_CODE;

        if (defined(remoteDataService, "userData.renewContracts.length")) {
            for (i = 0; i < remoteDataService.userData.renewContracts.length; i++) {
                var rcont = remoteDataService.userData.renewContracts[i];
                if (rcont.strProductCode == MEMBER_STUDENT_PROD_CODE) {
                    $scope.studentMembership = rcont.dPrice;
                    if ($scope.membership == null) {
                        $scope.membership = $scope.studentMembership;
                    }
                } else if (rcont.strProductCode == MEMBER_PROD_CODE) {
                    $scope.membership = $scope.IndividualMembership = rcont.dPrice;
                }
            }

        }

        $scope.getEpochDateText = function (epochDate) {
            return util.getEpochDateText(epochDate);
        }

        $scope.switchToggle = function () {
            if ($scope.autoRenew) {
                //$scope.autoRenew = false;
                turnOnAuto();
            } else {
                //$scope.autoRenew = true;
                turnOffAuto();
            }
        }


        function turnOnAuto() {

            var prod = MEMBER_PROD_CODE;
            if ($scope.userData.contactData.Membership_Type__c == 'Student')
                prod = MEMBER_STUDENT_PROD_CODE;

            $scope.switchActive = false;
            util.disableToggleForm('#formArea', true);
            util.startSpinner('#subSpin', '#8b8989');

            remoteDataService.autoRenew(false, prod, function (err, data) {
                if (util.errorCheckBroadcast(err)) {
                    return;
                }
                $window.location.href = 'http://' + paymentDom + '/pymt__SiteSubscribePRB?ppid=' + data.result + '&context=website&finish_url=https%3A%2F%2F' + dashboardURL;
            });

        }

        function turnOffAuto() {

            util.disableToggleForm('#formArea', true);
            util.startSpinner('#subSpin', '#8b8989');
            $scope.switchActive = false;
            remoteDataService.autoRenewOff(true, function (err, data) {
                if (util.errorCheckBroadcast(err)) {
                    return;
                }
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            });
        }

        $scope.onSelectType = function (item) {
            if (item == MEMBER_PROD_CODE) {
                $scope.membership = $scope.IndividualMembership;
            } else {
                $scope.membership = $scope.studentMembership;
            }

        }



  }
]);