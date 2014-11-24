sfdcControllers.controller('SFDCAppDashMemberProfileCtrl', ['util', 'common', '$scope', '$rootScope', '$state', '$stateParams', '$location', '$window', 'remoteDataService', 'sfdcPanelFieldsService',
  function (util, common, $scope, $rootScope, $state, $stateParams, $location, $window, remoteDataService, sfdcPanelFieldsService) {


        $scope.envPath = envPath;
        $scope.userData = remoteDataService.userData;
        $scope.currentAccount = remoteDataService.currentAccount;

        $scope.getImageURL = function (imageURL) {
            return getImageURL(imageURL);
        }

        $scope.examRegistrationURL = frmRegistrationURL;
        $scope.examSwitchRegistrationURL = frmSwitchRegistrationURL;

        $scope.erpExamRegistrationURL = erpRegistrationURL;
        $scope.erpSwitchExamRegistrationURL = erpSwitchRegistrationURL;
        $scope.membershipRegistrationURL = membershipRegistrationURL;

        $scope.memberType = MEMBER_PROD_CODE;
        $scope.paymentMethod = "creditCard";
        $scope.searchType = "Name";
        $scope.autoRenew = false;

        $scope.membership = null;
        $scope.fee = 0;

        $scope.MEMBER_PROD_CODE = MEMBER_PROD_CODE;
        $scope.MEMBER_STUDENT_PROD_CODE = MEMBER_STUDENT_PROD_CODE;

        $scope.navigateDash = function (route, params) {
            $rootScope.$broadcast('handleNavigate', route, params);
        }

        var count = 0;
        var max = 4;
        if (defined($scope, "userData.contactData.HomePhone") || defined($scope, "userData.contactData.OtherPhone")) {
            count++;
        }
        if (defined($scope, "userData.userData.FullPhotoUrl")) {
            count++;
        }
        if (defined($scope, "userData.professionalExperienceData") && $scope.userData.professionalExperienceData.length > 0) {
            count++;
        }
        if (defined($scope, "userData.acdemicExperienceData") && $scope.userData.acdemicExperienceData.length > 0) {
            count++;
        }
        $scope.profilePercentComplete = (count / max) * 100;

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

        // To do: Get correct opportnity via contarct - opp link - waiting for Vivek
        //userData.opportunityData[0]
        if ($scope.userData.opportunityData !== null && typeof $scope.userData.opportunityData !== "undefined") {
            $scope.opportunityData = $scope.userData.opportunityData[0];
        }

        if (defined(remoteDataService, "userData.otherExamCodes")) {

            for (i = 0; i < remoteDataService.userData.otherExamCodes.length; i++) {
                var code = remoteDataService.userData.otherExamCodes[i];

                if (code.strProductCode == FBR_NONMEM_PROD_CODE) {
                    $scope.fbr = code.dPrice;
                }
                if (code.strProductCode == FBR_MEM_PROD_CODE) {
                    $scope.fbr_mem = code.dPrice;
                }
                if (code.strProductCode == MEMBER_PROD_CODE) {
                    $scope.mem = code.dPrice;
                }
                if (code.strProductCode == MEMBER_STUDENT_PROD_CODE) {
                    $scope.mem_student = code.dPrice;
                }
                if (code.strProductCode == ICBRR_NONMEM_PROD_CODE) {
                    $scope.icbrr = code.dPrice;
                }
                if (code.strProductCode == ICBRR_MEM_PROD_CODE) {
                    $scope.icbrr_mem = code.dPrice;
                }
                if (code.strProductCode == ICBRR_RETAKE_PROD_CODE) {
                    $scope.icbrr = code.dPrice;
                    $scope.icbrr_retake = code.dPrice;
                }
            }
            // if(defined($scope,"fbr_mem") && !defined($scope,"fbr")) {
            //   $scope.fbr = $scope.fbr_mem;
            // }

            // if(defined($scope,"icbrr_mem") && !defined($scope,"icbrr") && !defined($scope,"icbrr_retake")) {
            //   $scope.icbrr = $scope.icbrr_mem;
            // }

            // if(defined($scope,"icbrr_mem") && !defined($scope,"icbrr") && defined($scope,"icbrr_retake")) {
            //   $scope.icbrr = $scope.icbrr_retake;
            // }      

        }

        $scope.now = new Date().getTime();

        $scope.isClosedInoice = function () {
            return $scope.userData.membershipContract.Opportunity__r.StageName.indexOf('Closed') + 1;

        }

        $scope.onSelectType = function (item) {
            if (item == MEMBER_PROD_CODE) {
                $scope.membership = $scope.IndividualMembership;
            } else {
                $scope.membership = $scope.studentMembership;
            }

        }

        $scope.onSelectPay = function (item) {

            if (item != 'creditCard') {
                $scope.fee = $scope.userData.deferedPaymentPrice;
            } else {
                $scope.fee = 0;
            }


        }


        $scope.upgrade = function () {
            if (defined(remoteDataService, "userData.renewContracts.length")) {
                $('#selectMemberType').show();
            }
        }


        $scope.turnOnAuto = function () {

            var prod = MEMBER_PROD_CODE;
            if ($scope.userData.contactData.Membership_Type__c == 'Student')
                prod = MEMBER_STUDENT_PROD_CODE;

            util.disableToggleForm('#formArea', true);
            util.startSpinner('#subSpin', '#8b8989');

            remoteDataService.autoRenew(false, prod, function (err, data) {
                if (util.errorCheckBroadcast(err)) {
                    return;
                }
                $window.location.href = 'http://' + paymentDom + '/pymt__SiteSubscribePRB?ppid=' + data.result + '&context=website&finish_url=https%3A%2F%2F' + dashboardURL;
            });

        }

        $scope.turnOffAuto = function () {

            util.disableToggleForm('#formArea', true);
            util.startSpinner('#subSpin', '#8b8989');

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

        $scope.purchase = function (memberType, paymentMethod) {

            if ($scope.autoRenew) {

                util.disableToggleForm('#formArea', true);
                util.startSpinner('#subSpin', '#8b8989');

                remoteDataService.autoRenew(true, memberType, function (err, data) {
                    if (util.errorCheckBroadcast(err)) {
                        return;
                    }
                    if (paymentMethod == 'creditCard') {
                        $window.location.href = 'http://' + paymentDom + '/pymt__SiteSubscribePRB?ppid=' + data.result + '&context=website&finish_url=https%3A%2F%2F' + dashboardURL;
                    } else {
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    }

                });

            } else {

                util.disableToggleForm('#formArea', true);
                util.startSpinner('#subSpin', '#8b8989');

                remoteDataService.createcontractextension(memberType, function (err, data) {
                    if (util.errorCheckBroadcast(err)) {
                        return;
                    }
                    if (paymentMethod == 'creditCard') {

                        $window.location.href = 'http://' + paymentDom + '?pid=' + data.result + '&context=website&finish_url=https%3A%2F%2F' + dashboardURL;

                    } else {
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    }

                });


            }
        }

        $scope.payPendingMembership = function (pid) {
            $window.location.href = 'http://' + paymentDom + '?pid=' + pid + '&context=website&finish_url=https%3A%2F%2F' + dashboardURL;
        }

        $scope.isPaid = function (contract) {
            return isPaid(contract);
        }

        $scope.formatAmountDisplay = function (amount) {
            return util.formatAmountDisplay(amount);
        }

        $scope.getEpochDateText = function (epochDate) {
            return util.getEpochDateText(epochDate);
        }
  }
]);