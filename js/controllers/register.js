sfdcControllers.controller('SFDCAppRegisterCtrl', ['util','common','$scope', '$rootScope', '$state','$stateParams','remoteDataService','$window','$anchorScroll',
  function(util,common, $scope, $rootScope, $state, $stateParams, remoteDataService, $window, $anchorScroll) {

    $scope.userInfo = remoteDataService.userData;
    $scope.currentAccount = remoteDataService.currentAccount;

    $scope.envPath = envPath;
    $scope.loaded=0;

    $scope.regForm = {};

    $scope.loginURL = util.contactsURL;

    // Here we are referencing the same object, so Angular inits the select box correctly
    $scope.correctlySelected = null;

    $scope.selTest = [];

    $scope.regInfo = {
        exam: null,
        examsite: null,
        fname: '',
        lname: '',
        email: '',
        vemail: '',
        membership: false,
        book1: false,
        book1Details: null,
        book2: false,
        book2Details: null,
        wiley: false,
        billshipsame: true,
        company: '',
        addr1: '',
        addr2: '',
        addr3: '',
        country: 'US',
        city: '',
        state: null,
        zip: '',
        phone: '',
        billcompany: '',
        billaddr1: '',
        billaddr2: '',
        billaddr3: '',
        billcountry: 'US',
        billcity: '',
        billstate: null,
        billzip: '',
        billphone: '',
        shipping: null,
        payment: 'cc',
        ccnumber: '',
        ccname: '',
        ccvnumber: '',
        ccmonth: '',
        ccyear: '',
        autorenew: false,
        looking: 0,
        pid: null,
        contactId: null, 
        regType: null,
        ccError: null
    };

    $scope.purchase = {
      enrollment: 0,
      exam: 0,
      materials: 0,
      membership: 0,
      processing: 0,
      shipping: 0,
      canadianCustoms: 0,
      tax: 0
    }
    
    $scope.registrationData = BackEnd;

    // Come from one RegType (not completed) to Another
    if(util.defined($stateParams,"regType.length") && $stateParams.regType.length > 0 && util.getCookie('regType') && util.getCookie('regType') !=  'null') {
      if($stateParams.regType != util.getCookie('regType')) {
        // clear all cookies
        for (var property in $scope.regInfo) {
          util.delete_cookie(property);
        }          
      }
    }

    for (var property in $scope.regInfo) {
        var val = util.getCookie(property);
        if(util.defined(val) && val != "null" && property != "ccnumber" && property != "ccvnumber") {
            if(val == "true")
              $scope.regInfo[property] = true;
            else if(val == "false")    
              $scope.regInfo[property] = false;
            else $scope.regInfo[property] = val;
        }
    }

    var cookieRegType = $scope.regInfo.regType;

    $scope.regInfo.regType = "frm";
    if(util.defined($stateParams,"regType.length") && $stateParams.regType.length > 0) {
      $scope.regInfo.regType = $stateParams.regType;
    }

    util.delete_cookie("ccnumber");
    util.delete_cookie("ccvnumber");

    // var ccError = util.getCookie('ccError');
    // if(util.defined(ccError) && ccError != "null") {
    //   $scope.ccError = ccError;
    // }

    $scope.countries = util.countriesObj;
    $scope.optionsSelectTest = [
      { name: 'one', value: 1 },
      { name: 'two', value: 2 }
    ];


    $scope.caData = util.caData;
    $scope.usData  = util.usData;

    // Setup CC Month
    $scope.monthSelectOptions = [];
    for(var i=1; i<13; i++) {
      var name = i.toString();
      if(i <= 9)
        name ="0" + i.toString();
      var obj = { name: name, value: i };
      $scope.monthSelectOptions.push(obj);                
    }

    // Setup CC Year
    $scope.yearSelectOptions = [];
    for(var i=2014; i<2014+10; i++) {
      var name = i.toString();
      var obj = { name: name, value: i };
      $scope.yearSelectOptions.push(obj);                
    }

    remoteDataService.getExamProducts($scope.regInfo.regType, function(err, data) {
      //if(util.errorCheckBroadcast(err, common.ERRORS.errorRetrieve.msg)) {return;}
      if(util.defined(data,"result")) {
        $scope.regProducts=data.result;
      } else {
        common.errorCheckBroadcast(500, common.ERRORS.errorRetrieve.msg)
      }

      remoteDataService.getTestDate(function(err, data) {
        //if(util.errorCheckBroadcast(err, common.ERRORS.errorRetrieve.msg)) {return;}
        if(util.defined(data,"result")) {
          $scope.testDate=data.result;
        } else {
          //util.errorCheckBroadcast(500, common.ERRORS.errorRetrieve.msg)
          common.errorCheckBroadcast(500, common.ERRORS.errorNoExam.msg);
          return;
        }

        remoteDataService.getActiveSites(function(err, data) {
          //if(util.errorCheckBroadcast(err, common.ERRORS.errorRetrieve.msg)) {return;}
          if(util.defined(data,"result") && data.result.length > 0) {
            $scope.activeSites=data.result;
          } else {
            common.errorCheckBroadcast(500, common.ERRORS.errorNoExam.msg);
            return;
          }

          remoteDataService.getRegistrationDate(function(err, data) {
            //if(util.errorCheckBroadcast(err, common.ERRORS.errorRetrieve.msg)) {return;}
            if(util.defined(data,"result")) {
              $scope.registrationDate=data.result;
            } else {
              common.errorCheckBroadcast(500, common.ERRORS.errorNoExam.msg);
              return;
            }

            $rootScope.$apply(function(){
              $scope.examOptions = [];
              $scope.membershipOptions = [];

              // Setup Site Select
              $scope.optionsSelectSites = [];
              for(var i=0; i<$scope.activeSites.length; i++) {
                var obj = { name: $scope.activeSites[i], value: i };
                $scope.optionsSelectSites.push(obj);
              }

              if(util.defined($scope,"regProducts.CanadianTax.dMemberAmt")) {
                $scope.purchase.canadianDuty=$scope.regProducts.CanadianTax.dMemberAmt;
              }

              if($scope.regInfo.regType == "frm") {

                if(util.defined($scope,"regProducts.FRMPartOne")) {

                    $scope.purchase.enrollment = $scope.regProducts.FRMPartOne.dFRMOneEnrollmentAmount;

                    $scope.regInfo.book1Details = {};
                    $scope.regInfo.book1Details.price = $scope.regProducts.FRMPartOne.dFRMOneBookAmount;
                    $scope.regInfo.book1Details.glCode = $scope.regProducts.FRMPartOne.strFRMOneBookGLCode;
                    $scope.regInfo.book1Details.prodCode = $scope.regProducts.FRMPartOne.strFRMOneBookProdCode;

                    var exam = {
                      name: $scope.regProducts.FRMPartOne.strDisplayName,
                      price: $scope.regProducts.FRMPartOne.examPrice
                    };
                    $scope.examOptions.push(exam);

                    if(util.defined($scope,"regProducts.FRMPartTwo")) {

                        $scope.regInfo.book2Details = {};
                        $scope.regInfo.book2Details.price = $scope.regProducts.FRMPartTwo.dFRMTwoBookAmount;
                        $scope.regInfo.book2Details.glCode = $scope.regProducts.FRMPartTwo.strFRMTwoBookGLCode;
                        $scope.regInfo.book2Details.prodCode = $scope.regProducts.FRMPartTwo.strFRMTwoBookProdCode;

                        var exam = {
                          name: "FRM Exam Part I and II",
                          price: $scope.regProducts.FRMPartOne.examPrice + $scope.regProducts.FRMPartOne.examPrice
                        };
                        $scope.examOptions.push(exam);
                    }

                } else {

                    if(util.defined($scope,"regProducts.FRMPartTwo")) {
                        $scope.regInfo.book2Details = {};
                        $scope.regInfo.book2Details.price = $scope.regProducts.FRMPartTwo.dFRMTwoBookAmount;
                        $scope.regInfo.book2Details.glCode = $scope.regProducts.FRMPartTwo.strFRMTwoBookGLCode;
                        $scope.regInfo.book2Details.prodCode = $scope.regProducts.FRMPartTwo.strFRMTwoBookProdCode;

                        var exam = {
                          name: $scope.regProducts.FRMPartTwo.strDisplayName,
                          price: $scope.regProducts.FRMPartTwo.examPrice
                        };
                        $scope.examOptions.push(exam);
                    }

                }


              } else if($scope.regInfo.regType == "erp") {

                if(util.defined($scope,"regProducts.ERP")) {

                  $scope.purchase.enrollment = $scope.regProducts.ERP.dERPEnrollmentAmount;

                  $scope.regInfo.book1Details = {};
                  $scope.regInfo.book1Details.price = $scope.regProducts.ERP.dERPBookAmount;
                  $scope.regInfo.book1Details.glCode = $scope.regProducts.ERP.strERPBookGLCode;
                  $scope.regInfo.book1Details.prodCode = $scope.regProducts.ERP.strERPBookProdCode;

                  $scope.regInfo.exam = "ERP Exam";

                  var exam = {
                    name: "ERP Exam",
                    price: $scope.regProducts.ERP.examPrice
                  };
                  $scope.examOptions.push(exam);

                } else {
                  common.errorCheckBroadcast(500, common.ERRORS.errorNoExam.msg);
                }

              } else if($scope.regInfo.regType == "fbr") {

                if(util.defined($scope,"regProducts.FBR")) {

                  //$scope.purchase.enrollment = $scope.regProducts.ERP.dERPEnrollmentAmount;

                  $scope.regInfo.book1Details = {};
                  //$scope.regInfo.book1Details.price = $scope.regProducts.ERP.dERPBookAmount;
                  //$scope.regInfo.book1Details.glCode = $scope.regProducts.ERP.strERPBookGLCode;
                  //$scope.regInfo.book1Details.prodCode = $scope.regProducts.ERP.strERPBookProdCode;

                  $scope.regInfo.exam = "FBR Exam";

                  var exam = {
                    name: "FBR Exam",
                    price: $scope.regProducts.FBR.dFCBRNonMemberExamAmt
                  };
                  $scope.examOptions.push(exam);

                } else {
                  common.errorCheckBroadcast(500, common.ERRORS.errorNoExam.msg);
                }


              } else if($scope.regInfo.regType == "icbrr") {

                if(util.defined($scope,"regProducts.ICBRR")) {

                  //$scope.purchase.enrollment = $scope.regProducts.ERP.dERPEnrollmentAmount;

                  $scope.regInfo.book1Details = {};
                  //$scope.regInfo.book1Details.price = $scope.regProducts.ERP.dERPBookAmount;
                  //$scope.regInfo.book1Details.glCode = $scope.regProducts.ERP.strERPBookGLCode;
                  //$scope.regInfo.book1Details.prodCode = $scope.regProducts.ERP.strERPBookProdCode;

                  $scope.regInfo.exam = "ICBRR Exam";

                  var exam = {
                    name: "ICBRR Exam",
                    price: $scope.regProducts.ICBRR.dCBRNonMemberExamAmt
                  };
                  $scope.examOptions.push(exam);

                } else {
                  common.errorCheckBroadcast(500, common.ERRORS.errorNoExam.msg);
                }

              } else if($scope.regInfo.regType == "individual") {

                if(util.defined($scope,"regProducts.MEMI")) {

                  //$scope.regInfo.regType = "Individual Membership";
                  var membership = {
                    name: "Individual Membership",
                    price: $scope.regProducts.MEMI.dMemberAmt
                  };
                  $scope.membershipOptions.push(membership);
                }

              } else if($scope.regInfo.regType == "student") {

                if(util.defined($scope,"regProducts.MEMS")) {

                  //$scope.regInfo.regType = "Individual Membership";
                  var membership = {
                    name: "Student Membership",
                    price: $scope.regProducts.MEMS.dMemberAmt
                  };
                  $scope.membershipOptions.push(membership);

                }

              }

              if($scope.regInfo.regType != "individual" && $scope.regInfo.regType != "student" && $scope.examOptions.length == 0) {
                common.errorCheckBroadcast(500, common.ERRORS.errorNoExam.msg);
              } else {
                $scope.loaded=1;                
              }

            });
          });
        });
      });
    });    

    $scope.getProcessingFeePrice = function() {
      if(!util.defined($scope,"regProducts.DeferredPayment.dMemberAmt")) {
        return 0;
      } else {
        if($scope.regInfo.payment != "cc")
          return $scope.regProducts.DeferredPayment.dMemberAmt;
        else return 0;        
      }
    }


    $scope.getSelectedExamPrice = function() {

      if(!util.defined($scope,"regInfo.exam") || !util.defined($scope,"regProducts"))
        return 0;

      if($scope.regInfo.exam == "FRM Exam Part I and II")
        return $scope.regProducts.FRMPartOne.examPrice + $scope.regProducts.FRMPartTwo.examPrice;
      else if($scope.regInfo.exam == "FRM Part I")
        return $scope.regProducts.FRMPartOne.examPrice;
      else if($scope.regInfo.exam == "FRM Part II")
        return $scope.regProducts.FRMPartTwo.examPrice;
      else if($scope.regInfo.exam == "ERP Exam")
        return $scope.regProducts.ERP.examPrice;
      else if($scope.regInfo.exam == "FBR Exam" && $scope.regInfo.membership == false)
        return $scope.regProducts.FBR.dFCBRNonMemberExamAmt;
      else if($scope.regInfo.exam == "FBR Exam" && $scope.regInfo.membership == true)
        return $scope.regProducts.FBR.dFCBRMemberExamAmt;
      else if($scope.regInfo.exam == "ICBRR Exam" && $scope.regInfo.membership == false)
        return $scope.regProducts.ICBRR.dCBRNonMemberExamAmt;
      else if($scope.regInfo.exam == "ICBRR Exam" && $scope.regInfo.membership == true)
        return $scope.regProducts.ICBRR.dCBRMemberExamAmt;
      else return 0;
    } 

    $scope.getSelectedMembershipPrice = function() {
      if($scope.regInfo.regType == 'frm' || $scope.regInfo.regType == 'erp') {
        return 0;
      } else if($scope.regInfo.regType == 'individual' && util.defined($scope,"regProducts.MEMI.dMemberAmt")) {
        return $scope.regProducts.MEMI.dMemberAmt;
      } else if($scope.regInfo.regType == 'student' && util.defined($scope,"regProducts.MEMS.dMemberAmt")) {
        return $scope.regProducts.MEMS.dMemberAmt;
      } else {
        if(util.defined($scope,"regProducts.MEMI.dMemberAmt") && $scope.regInfo.membership) {
          return $scope.regProducts.MEMI.dMemberAmt;
        } else {
          return 0;
        }
      }
    }

    $scope.getCanadianDutyPrice = function() {
      var statePropName = 'billcountry';
      if($scope.regInfo.billshipsame == false) {
        var statePropName = 'country';
      }
      if($scope.regInfo[statePropName] == 'CA') {
        return util.CANADIAIN_DUTY_PRICE;
      } else {
        return 0;
      }
    }

    $scope.getSelectedMaterialsPrice = function() {
      var total = 0;
      if($scope.regInfo.book1)
        total+=$scope.regInfo.book1Details.price;
      if($scope.regInfo.book2)
        total+=$scope.regInfo.book2Details.price;

      $scope.purchase.materials = total;
      return total;
    }

    $scope.getSelectedWileyPrice = function() {
      var total = 0;
      if($scope.regInfo.wiley && util.defined($scope,"regProducts.WILEY.dMemberAmt"))
        total+=$scope.regProducts.WILEY.dMemberAmt;
      return total;
    }


    $scope.getSelectedShippingCountry = function() {
      var statePropName = 'billcountry';
      if($scope.regInfo.billshipsame == false) {
        var statePropName = 'country';
      }
      return $scope.regInfo[statePropName];
    }

    $scope.getSelectedShippingPrice = function() {
      if(!util.defined($scope,"shippingOptions") || !util.defined($scope,"regInfo.shipping") || !$scope.isAddressSame()) {
        return 0;
      } else {
        var option = _.findWhere($scope.shippingOptions, {name: $scope.regInfo.shipping});
        if(util.defined(option))
          return option.dPrice;
        else return 0;
      }
    }

    $scope.calcTax = function(amount) {
      var statePropName = 'billstate';
      if($scope.regInfo.billshipsame == false) {
        var statePropName = 'state';
      }
      if(util.defined(amount) && util.defined($scope,"regInfo." + statePropName)) {
        if( $scope.regInfo[statePropName] == 'New Jersey' && $scope.getSelectedShippingCountry() == 'US')
          return util.calcTax(amount);
        else return 0;        
      }
      else return 0;
    }


    $scope.isAddressEntered = function() {
      if($scope.regInfo.billshipsame == false) {

        if(util.defined($scope,"regInfo.addr1.length") && $scope.regInfo.addr1.length > 0 &&
          util.defined($scope,"regInfo.city.length") && $scope.regInfo.city.length > 0 &&
          util.defined($scope,"regInfo.country.length") && $scope.regInfo.country.length > 0 &&
          util.defined($scope,"regInfo.state.length") && $scope.regInfo.state.length > 0 &&
          util.defined($scope,"regInfo.zip.length") && $scope.regInfo.zip.length > 0)
          return true;
        else return false;
      
      } else {

        if(util.defined($scope,"regInfo.billaddr1.length") && $scope.regInfo.billaddr1.length > 0 &&
          util.defined($scope,"regInfo.billcity.length") && $scope.regInfo.billcity.length > 0 &&
          util.defined($scope,"regInfo.billcountry.length") && $scope.regInfo.billcountry.length > 0 &&
          util.defined($scope,"regInfo.billstate.length") && $scope.regInfo.billstate.length > 0 &&
          util.defined($scope,"regInfo.billzip.length") && $scope.regInfo.billzip.length > 0)
          return true;
        else return false;

      }
    }


    $scope.getEpochDateText = function(epochDate) {
        return getEpochDateText(epochDate);
    }

    $scope.toProperCase = function(str) {
        return str.toProperCase();
    }

    $scope.formatAmountDisplay = function(amount) {
      return util.formatAmountDisplay(amount);
    }

    $scope.examSelect = function() {
      var option = _.findWhere($scope.examOptions, {name: $scope.regInfo.exam});
      if(defined(option)) {
        $scope.purchase.exam = option.price
      }
    }

    $scope.isAddressSame = function() {
      if(!util.defined($scope,"shippingAddressData"))
        return false;

      if($scope.regInfo.billshipsame == true) {

        if($scope.regInfo.billaddr1 == $scope.shippingAddressData.addr1 &&
          $scope.regInfo.billaddr2 == $scope.shippingAddressData.addr2 &&
          $scope.regInfo.billcity == $scope.shippingAddressData.city &&
          $scope.regInfo.billcountry == $scope.shippingAddressData.country &&
          $scope.regInfo.billstate == $scope.shippingAddressData.state &&
          $scope.regInfo.billzip == $scope.shippingAddressData.zip &&
          $scope.regInfo.book1 == $scope.shippingAddressData.book1 &&
          $scope.regInfo.book2 == $scope.shippingAddressData.book2)
          return true;
        else return false;

      } else {

        if($scope.regInfo.addr1 == $scope.shippingAddressData.addr1 &&
          $scope.regInfo.addr2 == $scope.shippingAddressData.addr2 &&
          $scope.regInfo.city == $scope.shippingAddressData.city &&
          $scope.regInfo.country == $scope.shippingAddressData.country &&
          $scope.regInfo.state == $scope.shippingAddressData.state &&
          $scope.regInfo.zip == $scope.shippingAddressData.zip &&
          $scope.regInfo.book1 == $scope.shippingAddressData.book1 &&
          $scope.regInfo.book2 == $scope.shippingAddressData.book2)
          return true;
        else return false;

      }

    }

    $scope.shippingSelect = function() {
      //if(!$scope.regForm.main.$invalid) {
        //debugger;

        if($scope.isAddressSame()) {
          return;
        }
          
        $scope.regInfo.looking=1;
        $scope.shippingError=0;

        var prods = [];
        if($scope.regInfo.book1 && util.defined($scope,"regInfo.book1Details.prodCode")) {
          prods.push($scope.regInfo.book1Details.prodCode)
        }
        if($scope.regInfo.book2 && util.defined($scope,"regInfo.book2Details.prodCode")) {
          prods.push($scope.regInfo.book2Details.prodCode)
        }

        var addr1 = $scope.regInfo.addr1;
        var addr2 = $scope.regInfo.addr2;
        var city = $scope.regInfo.city;
        var country = $scope.regInfo.country;
        var state = $scope.regInfo.state;
        var zip = $scope.regInfo.zip;

        if($scope.regInfo.billshipsame == true) {

          addr1 = $scope.regInfo.billaddr1;
          addr2 = $scope.regInfo.billaddr2;
          city = $scope.regInfo.billcity;
          country = $scope.regInfo.billcountry;
          state = $scope.regInfo.billstate;
          zip = $scope.regInfo.billzip;

        }

        remoteDataService.getUPSPrice(addr1,addr2,city,country,state,zip, prods, function(err, data) {
          if(util.errorCheckBroadcast(err, common.ERRORS.errorRetrieve.msg)) {return;}
          if(util.defined(data,"result.length") && !util.defined(data.result[0],"lstMatchingAddress")) {

            //$scope.shippingAddressData = jQuery.extend(true, {}, $scope.regInfo); 
            $scope.shippingAddressData = {};

            $scope.shippingAddressData.book1 = $scope.regInfo.book1;
            $scope.shippingAddressData.book2 = $scope.regInfo.book2;

            $scope.shippingAddressData.addr1 = $scope.regInfo.addr1;
            $scope.shippingAddressData.addr2 = $scope.regInfo.addr2;
            $scope.shippingAddressData.city = $scope.regInfo.city;
            $scope.shippingAddressData.country = $scope.regInfo.country;
            $scope.shippingAddressData.state = $scope.regInfo.state;
            $scope.shippingAddressData.zip = $scope.regInfo.zip;

            if($scope.regInfo.billshipsame == true) {

              $scope.shippingAddressData.addr1 = $scope.regInfo.billaddr1;
              $scope.shippingAddressData.addr2 = $scope.regInfo.billaddr2;
              $scope.shippingAddressData.city = $scope.regInfo.billcity;
              $scope.shippingAddressData.country = $scope.regInfo.billcountry;
              $scope.shippingAddressData.state = $scope.regInfo.billstate;
              $scope.shippingAddressData.zip = $scope.regInfo.billzip;

            }

            var shippingOptions = data.result;
            
            // for(var i=0; i<shippingOptions.length; i++) {
            //   shippingOptions[i].id = i+1;
            //   shippingOptions[i].origUPSDesc = shippingOptions[i].strUPSDesc;
            //   shippingOptions[i].strUPSDesc = shippingOptions[i].strUPSDesc + '($' + parseFloat(Math.round(shippingOptions[i].dPrice * 100) / 100).toFixed(2) + ')';
            // }   

            $rootScope.$apply(function(){

              $scope.shippingOptions = [];
              for(var i=0; i<shippingOptions.length; i++) {
                var obj = {};
                obj.id = i+1;
                obj.name = shippingOptions[i].strUPSDesc + '($' + parseFloat(Math.round(shippingOptions[i].dPrice * 100) / 100).toFixed(2) + ')';
                obj.dPrice = shippingOptions[i].dPrice;
                obj.origUPSDesc = shippingOptions[i].strUPSDesc;
                $scope.shippingOptions.push(obj);
              }   

              // $scope.selTest = [
              // {id: 1, name: 'bob'},
              // {id: 1, name: 'fred'}
              // ]
              //$scope.shippingOptions = shippingOptions;

              $scope.regInfo.looking=0;
            });
          } else {
            $rootScope.$apply(function(){              
              $scope.shippingOptions = null;
              $scope.regInfo.looking=0;
              $scope.shippingError=1;
            });
          }
        });
      //} 
    }


    function setProducts(tempAccountIn, leadIdIn) {
      var tempAccount = tempAccountIn;
      tempAccount.Id = leadIdIn;

      // Save to cookies
      // for (var property in $scope.regInfo) {
      //     util.createCookie(property, $scope.regInfo[property], 5);
      // }


      // Setup Required Fields
      tempAccount.productcode1 = [];
      tempAccount.sameShip = true

      tempAccount.isFrmChecked = false;
      tempAccount.isErpChecked = false;
      tempAccount.isIcbrChecked = false;
      tempAccount.isFBRChecked = false;

      if(!util.defined($scope,"regInfo.regType") || $scope.regInfo.regType=='frm') {
        tempAccount.isFrmChecked = true;
      } else if(!util.defined($scope,"regInfo.regType") || $scope.regInfo.regType=='erp') {
        tempAccount.isErpChecked = true;
      } else if(!util.defined($scope,"regInfo.regType") || $scope.regInfo.regType=='fbr') {
        tempAccount.isFBRChecked = true;
      } else if(!util.defined($scope,"regInfo.regType") || $scope.regInfo.regType=='icbrr') {
        tempAccount.isIcbrChecked = true;
      }

      // Set Auto-Renw
      tempAccount.autoRenew = $scope.regInfo.autorenew;

      //Exam
      tempAccount.examName = $scope.regInfo.exam;
      tempAccount.siteName = $scope.regInfo.examsite;

      tempAccount.Email = $scope.regInfo.email;
      tempAccount.FirstName = $scope.regInfo.fname;
      tempAccount.LastName = $scope.regInfo.lname;

      tempAccount.BillingStreet = $scope.regInfo.billaddr1;
      tempAccount.BillingStreetTwo = $scope.regInfo.billaddr2;
      tempAccount.BillingStreetThree = $scope.regInfo.billaddr3;
      tempAccount.BillingCity = $scope.regInfo.billcity;
      tempAccount.BillingPostalCode = $scope.regInfo.billzip;
      tempAccount.BillingState = $scope.regInfo.billstate;
      tempAccount.BillingCountry = $scope.regInfo.billcountry;
      tempAccount.BillingPhoneNumber = $scope.regInfo.billphone;
      tempAccount.BillingCompany = $scope.regInfo.billcompany;

      if($scope.regInfo.billshipsame == true) {

        tempAccount.MailingStreet = $scope.regInfo.billaddr1;
        tempAccount.MailingStreetTwo = $scope.regInfo.billaddr2;
        tempAccount.MailingStreetThree = $scope.regInfo.billaddr3;
        tempAccount.MailingCity = $scope.regInfo.billcity;
        tempAccount.MailingPostalCode = $scope.regInfo.billzip;
        tempAccount.MailingState = $scope.regInfo.billstate;
        tempAccount.MailingCountry = $scope.regInfo.billcountry;
        tempAccount.MailingCompany = $scope.regInfo.billcompany;
        tempAccount.HomePhone = $scope.regInfo.billphone;

      } else {

        tempAccount.MailingStreet = $scope.regInfo.addr1;
        tempAccount.MailingStreetTwo = $scope.regInfo.addr2;
        tempAccount.MailingStreetThree = $scope.regInfo.addr3;
        tempAccount.MailingCity = $scope.regInfo.city;
        tempAccount.MailingPostalCode = $scope.regInfo.zip;
        tempAccount.MailingState = $scope.regInfo.state;
        tempAccount.MailingCountry = $scope.regInfo.country;
        tempAccount.MailingCompany = $scope.regInfo.company;
        tempAccount.HomePhone = $scope.regInfo.phone;

      }

      tempAccount.ShippingOptionsString = $scope.regInfo.shipping ? 'dPrice:' + util.formatAmount($scope.getSelectedShippingPrice()) + ',' + 'strUPSDesc:' + $scope.regInfo.shipping : null;

      if(calcTax($scope.getSelectedShippingPrice()) > 0)
        tempAccount.taxPrice = util.formatAmount(calcTax($scope.getSelectedShippingPrice()));

      // Setup products
      // public string GLCode { get; set; }
      // public string ProductCode { get; set; }        

      var customsObject = {
          'ProductCode': $scope.regProducts.CanadianTax.strCanadianTaxProdCode,
          'GLCode': $scope.regProducts.CanadianTax.strCanadianTaxGLCode
      };
      if (tempAccount.MailingState === 'NJ') {
          var materialPrice = 0;
          if ($scope.regInfo.book1) {
              materialPrice = $scope.regInfo.book1Details.price;
          }
          if ($scope.regInfo.book2) {
              materialPrice += $scope.regInfo.book2Details.price;
          }
          tempAccount.productcode1.push({
              'GLCode': $scope.regProducts.TAX.strTaxGLCode,
              'ProductCode': $scope.regProducts.TAX.strTaxProdCode
          });
      }
      if ($scope.regInfo.book1 || $scope.regInfo.book2) {
          tempAccount.productcode1.push({
              'GLCode': $scope.regProducts.Shipping.strShippingGLCode,
              'ProductCode': $scope.regProducts.Shipping.strShippingProdCode
          });
      }
      if (tempAccount.MailingCountry === 'CA' && ($scope.regInfo.book1 || $scope.regInfo.book2)) {
          tempAccount.productcode1.push(customsObject);
      }
      // FRM Product Codes
      if (tempAccount.isFrmChecked || tempAccount.isErpChecked) {
          var freeMembershipObject = {
              'ProductCode': $scope.regProducts.FreeMembership.strFreeIndividualProdCode,
              'GLCode': $scope.regProducts.FreeMembership.strFreeIndividualGLCode
          };
      }
      if (tempAccount.isFrmChecked) {
          var frmEnrollmentInfo = {
              'GLCode': $scope.regProducts.FRMPartOne.strFRMOneEnrollmentGLCode,
              'ProductCode': $scope.regProducts.FRMPartOne.strFRMOneEnrollmentProdCode
          };
          var frmExamOneInfo = {
              'GLCode': $scope.regProducts.FRMPartOne.strGLCode,
              'ProductCode': $scope.regProducts.FRMPartOne.strProductCode
          };
          var frmExamTwoInfo = {
              'GLCode': $scope.regProducts.FRMPartTwo.strGLCode,
              'ProductCode': $scope.regProducts.FRMPartTwo.strProductCode
          };
          tempAccount.productcode1.push(frmEnrollmentInfo);
          tempAccount.productcode1.push(freeMembershipObject);

          if($scope.regInfo.exam == $scope.regProducts.FRMPartOne.strDisplayName || $scope.regInfo.exam == "FRM Exam Part I and II") {
            tempAccount.productcode1.push(frmExamOneInfo);                    
          }
          if($scope.regInfo.exam == $scope.regProducts.FRMPartTwo.strDisplayName || $scope.regInfo.exam == "FRM Exam Part I and II") {
            tempAccount.productcode1.push(frmExamTwoInfo);                    
          }
      }

      // ERP Product Codes
      if (tempAccount.isErpChecked) {
          var erpEnrollmentInfo = {
              'GLCode': $scope.regProducts.ERP.strGLCode,
              'ProductCode': $scope.regProducts.ERP.strProductCode
          };
          var erpExamInfo = {
              'GLCode': $scope.regProducts.ERP.strERPEnrollmentGLCode,
              'ProductCode': $scope.regProducts.ERP.strERPEnrollmentProdCode
          };
          tempAccount.productcode1.push(erpEnrollmentInfo);
          tempAccount.productcode1.push(erpExamInfo);
          tempAccount.productcode1.push(freeMembershipObject);
      }

      // FBR Product Codes
      if (tempAccount.isFbrChecked) {
          var erpExamInfo = {
              'GLCode': $scope.regProducts.FBR.strFCBRNonMemberGlCode,
              'ProductCode': $scope.regProducts.FBR.strFCBRNonMemberProdCode
          };
          tempAccount.productcode1.push(erpExamInfo);
      }

      // ICBRR Product Codes
      if (tempAccount.isIcbrChecked) {
          var erpExamInfo = {
              'GLCode': $scope.regProducts.ICBRR.strCBRNonMemberGlCode,
              'ProductCode': $scope.regProducts.ICBRR.strCBRNonMemberProdCode
          };
          tempAccount.productcode1.push(erpExamInfo);
      }

      // Materials Product Codes
      if ($scope.regInfo.book1) {  
          if (tempAccount.isFrmChecked) {

              var frmMaterialsInfo = {
                  'GLCode': $scope.regProducts.FRMPartOne.strFRMOneBookGLCode,
                  'ProductCode': $scope.regProducts.FRMPartOne.strFRMOneBookProdCode
              };
              tempAccount.productcode1.push(frmMaterialsInfo);
          }
          if (tempAccount.isErpChecked) {
              var erpMaterialsInfo = {
                  'GLCode': $scope.regProducts.ERP.strERPBookGLCode,
                  'ProductCode': $scope.regProducts.ERP.strERPBookProdCode
              };
              tempAccount.productcode1.push(erpMaterialsInfo);
          }
          tempAccount.hasBooks = true;
      }
      if ($scope.regInfo.book2) {
          var frmMaterialsTwoInfo = {
              'GLCode': $scope.regProducts.FRMPartTwo.strFRMTwoBookGLCode,
              'ProductCode': $scope.regProducts.FRMPartTwo.strFRMTwoBookProdCode
          };
          tempAccount.productcode1.push(frmMaterialsTwoInfo);
          tempAccount.hasBooks = true;
      }

      if($scope.regInfo.payment != "cc") {
          var deferredPaymentInfo = {
              'ProductCode': $scope.regProducts.DeferredPayment.strDeferrePaymentProdCode,
              'GLCode': $scope.regProducts.DeferredPayment.strDeferredPaymentGLCode
          }
          tempAccount.productcode1.push(deferredPaymentInfo);
      }

      if (tempAccount.isFbrChecked || tempAccount.isIcbrChecked) {

        if($scope.regInfo.membership) {
          var individualMembershipObject = {
              'ProductCode': $scope.regProducts.MEMI.strMemberProdCode,
              'GLCode': $scope.regProducts.MEMI.strMemberGLCode
          };
          tempAccount.productcode1.push(individualMembershipObject);   
        } else {
          var affiliateMembershipObject = {
              'ProductCode': $scope.regProducts.Affiliate.strAffiliateProdCode,
              'GLCode': $scope.regProducts.Affiliate.strAffiliateGLCode
          };
          tempAccount.productcode1.push(affiliateMembershipObject);   
        }

      }

      if($scope.regInfo.regType == 'individual') {
        var individualMembershipObject = {
          'ProductCode': $scope.regProducts.MEMI.strMemberProdCode,
          'GLCode': $scope.regProducts.MEMI.strMemberGLCode
        };
        tempAccount.productcode1.push(individualMembershipObject);   

        if($scope.regInfo.wiley) {
          tempAccount.Wiley = true;
          var wileyObject = {
            'ProductCode': $scope.regProducts.WILEY.strWileyProdCode,
            'GLCode': $scope.regProducts.WILEY.strWileyGLCode
          };
          tempAccount.productcode1.push(wileyObject);   
        }
      }
      if($scope.regInfo.regType == 'student') {
        var studentMembershipObject = {
          'ProductCode': $scope.regProducts.MEMS.strMemberProdCode,
          'GLCode': $scope.regProducts.MEMS.strMemberGLCode
        };
        tempAccount.productcode1.push(studentMembershipObject);   

        if($scope.regInfo.wiley) {
          tempAccount.Wiley = true;
          var wileyObject = {
            'ProductCode': $scope.regProducts.WILEY.strWileyProdCode,
            'GLCode': $scope.regProducts.WILEY.strWileyGLCode
          };
          tempAccount.productcode1.push(wileyObject);   
        }
      }
      return tempAccount;
    }


    $scope.submitForm = function(formState) {

      // check to make sure the form is completely valid
      var country = _.findWhere($scope.countries, {code: $scope.regInfo.billcountry});
      
      $scope.finalValidationPass = true;
      $scope.finalValidationPassErrorMsg = "";

      if(util.defined(country) && (country.name === 'Iran' ||
        country.name === 'Libya' ||
        country.name === 'Syria' ||
        country.name === 'North Korea' ||
        country.name === 'Sudan' ||
        country.name === 'Somalia')) {

          $scope.finalValidationPass = false;
          $scope.finalValidationPassErrorMsg = "There was an issue processing your registration please contact support.";        

      } else if((util.defined($scope,"regInfo.addr1.length") && util.defined($scope,"regInfo.addr2.length") && $scope.regInfo.addr1.length > 0 && $scope.regInfo.addr2.length > 0 && $scope.regInfo.addr1 == $scope.regInfo.addr2) ||
        (util.defined($scope,"regInfo.addr1.length") && util.defined($scope,"regInfo.addr3.length") && $scope.regInfo.addr1.length > 0 && $scope.regInfo.addr3.length > 0 && $scope.regInfo.addr1 == $scope.regInfo.addr3) ||
        (util.defined($scope,"regInfo.addr2.length") && util.defined($scope,"regInfo.addr3.length") && $scope.regInfo.addr2.length > 0 && $scope.regInfo.addr3.length > 0 && $scope.regInfo.addr2 == $scope.regInfo.addr3) ||
        (util.defined($scope,"regInfo.billaddr1.length") && util.defined($scope,"regInfo.billaddr2.length") && $scope.regInfo.billaddr1.length > 0 && $scope.regInfo.billaddr2.length > 0 && $scope.regInfo.billaddr1 == $scope.regInfo.billaddr2) ||
        (util.defined($scope,"regInfo.billaddr1.length") && util.defined($scope,"regInfo.billaddr3.length") && $scope.regInfo.billaddr1.length > 0 && $scope.regInfo.billaddr3.length > 0 && $scope.regInfo.billaddr1 == $scope.regInfo.billaddr3) ||
        (util.defined($scope,"regInfo.billaddr2.length") && util.defined($scope,"regInfo.billaddr3.length") && $scope.regInfo.billaddr2.length > 0 && $scope.regInfo.billaddr3.length > 0 && $scope.regInfo.billaddr2 == $scope.regInfo.billaddr3)) {

          $scope.finalValidationPass = false;
          $scope.finalValidationPassErrorMsg = "Please do not repeat your street address multiple times.";

      }


      if($scope.finalValidationPass) {
        $scope.submitted = true;
        if(!$scope.isAddressSame() && ($scope.regInfo.book1 || $scope.regInfo.book1)) {
          // error
        } else {

          if (formState.$valid) {
            $scope.save();
          }
        }
      }
    };

    $scope.save = function() {
      //var pid="a0Yf0000001mYHH";

      var exdate = new Date();
      var minutes = 5;
      exdate.setTime(exdate.getTime() + (minutes * 60 * 1000));
      var exp = ";expires="+exdate.toGMTString();
      //var path = "; Path=/reg;";
      var path = "";

      //debugger;

      $scope.ccProcess = 1;
      //util.disableToggleForm("#formArea", true);
      var selector = '#spin';
      $scope.spinner = util.startSpinner(selector, '#8b8989')

      // Check for existing Contact
      remoteDataService.CheckExistingMember($scope.regInfo.email, function(err, data) {        

        if(!util.defined(data,"result.tempAccount")) {
          // Throw error
          $scope.spinner.stop();
          $('#myGlobalErrorModal p').html("Your registration could not be completed. Please contact support.");
          $("#myGlobalErrorModal").modal();

          for (var property in $scope.regInfo) {
            util.delete_cookie(property);
          }    
          $rootScope.$apply(function(){
            $scope.ccProcess = 0;
          });
          return;
        }

        // Set Temp Account
        $scope.tempAccount = jQuery.extend(true, {}, data.result.tempAccount);

        // if(!util.defined($scope,"regInfo.contactId")) {
        //   if(util.defined(data,"result.contactId")) {
        //     $scope.regInfo.contactId = data.result.contactId;
        //   }          
        // }

        // PID && Contact Exists
        if(util.defined($scope,"regInfo.pid") && util.defined(data,"result.contactId")) {

          $scope.tempAccount.contactId = $scope.regInfo.contactId = data.result.contactId;
          $scope.tempAccount = setProducts($scope.tempAccount, null);

          // Remove Order
          remoteDataService.removeOrder($scope.tempAccount, $scope.regInfo.pid, function(err, data) {

            if(!util.defined(data,"result") || data.result == false) {
              // Throw error
              util.disableToggleForm("#formArea", false);
              $scope.spinner.stop();
              $('#myGlobalErrorModal p').html("Your registration could not be completed. Please contact support.");
              $("#myGlobalErrorModal").modal();

              for (var property in $scope.regInfo) {
                util.delete_cookie(property);
              }    
              $rootScope.$apply(function(){
                $scope.ccProcess = 0;
              });

              return;
            }

            remoteDataService.createOrder($scope.tempAccount, function(err, data) {

              if(!util.defined(data,"result.contactId") || !util.defined(data,"result.paymentId")) {
                // Throw error
                util.disableToggleForm("#formArea", false);
                $scope.spinner.stop();
                $('#myGlobalErrorModal p').html("Your registration could not be completed. Please contact support.");
                $("#myGlobalErrorModal").modal();

                for (var property in $scope.regInfo) {
                  util.delete_cookie(property);
                }    


              } else {

                $scope.regInfo.pid = data.result.paymentId;
                $scope.regInfo.contactId = data.result.contactId;

                // Save to cookies
                for (var property in $scope.regInfo) {
                    util.createCookie(property, $scope.regInfo[property], 5);
                }

                if($scope.regInfo.payment == 'cc') {

                  if($scope.regInfo.autorenew == true) {
                    $window.location.href = 'https://' + paymentDom  + '/pymt__SiteSubscribePRB?ppid=' + data.result.paymentId + '&context=website&finish_url=https%3A%2F%2Fregister';    
                  } else {
                    $window.location.href = 'https://' + paymentDom  + '?pid=' + data.result.paymentId + '&context=website&finish_url=https%3A%2F%2Fregister';      
                  }

                } else {
                  //util.routePage("registerInfo", {contactId: data.result.contactId});
                  document.location="/reg#!/registerInfo" + data.result.contactId;
                }
                  
              }                
            });

          })

        } else if(!util.defined($scope,"regInfo.pid") && util.defined(data,"result.contactId")) {

            // Throw error
            util.disableToggleForm("#formArea", false);
            $scope.spinner.stop();
            $('#myGlobalErrorModal p').html("You are already a member please login to register.");
            $("#myGlobalErrorModal").modal();

            for (var property in $scope.regInfo) {
              util.delete_cookie(property);
            }    
            $rootScope.$apply(function(){
              $scope.ccProcess = 0;
            });

        } else {

          // Set Lead
          remoteDataService.setLead($scope.regInfo.email, $scope.regInfo.fname, $scope.regInfo.lname, "Individual", function(err, data) {

            if(!util.defined(data,"result")) {
              // Throw error
              util.disableToggleForm("#formArea", false);
              $scope.spinner.stop();
              $('#myGlobalErrorModal p').html("Your registration could not be completed. Please contact support.");
              $("#myGlobalErrorModal").modal();
              for (var property in $scope.regInfo) {
                util.delete_cookie(property);
              }    
              $rootScope.$apply(function(){
                $scope.ccProcess = 0;
              });

              return;
            }

            // Init tempAccount
            $scope.tempAccount = setProducts($scope.tempAccount, data.result);

            remoteDataService.createOrder($scope.tempAccount, function(err, data) {

              if(!util.defined(data,"result.contactId") || !util.defined(data,"result.paymentId")) {
                // Throw error
                util.disableToggleForm("#formArea", false);
                $scope.spinner.stop();
                $('#myGlobalErrorModal p').html("Your registration could not be completed. Please contact support.");
                $("#myGlobalErrorModal").modal();
                for (var property in $scope.regInfo) {
                  util.delete_cookie(property);
                }    
                $rootScope.$apply(function(){
                  $scope.ccProcess = 0;
                });


              } else {

                $scope.regInfo.pid = data.result.paymentId;
                $scope.regInfo.contactId = data.result.contactId;

                // Save to cookies
                for (var property in $scope.regInfo) {
                    util.createCookie(property, $scope.regInfo[property], 5);
                }

                if($scope.regInfo.payment == 'cc') {

                  if($scope.regInfo.autorenew == true) {
                    $window.location.href = 'https://' + paymentDom  + '/pymt__SiteSubscribePRB?ppid=' + data.result.paymentId + '&context=website&finish_url=https%3A%2F%2Fregister';    
                  } else {
                    $window.location.href = 'https://' + paymentDom  + '?pid=' + data.result.paymentId + '&context=website&finish_url=https%3A%2F%2Fregister';      
                  }
                  
                } else {
                  //util.routePage("registerInfo", {contactId: data.result.contactId});                
                  document.location="/reg#!/registerInfo" + data.result.contactId;
                }
              }                
            });
          });
        }
      });
    }
  }
]);
