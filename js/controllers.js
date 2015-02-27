'use strict';

/* Controllers */
var sfdcControllers = angular.module('sfdcControllers', []);

sfdcControllers.controller('SFDCAppTimelineCtrl', ['util','common','$scope','$rootScope','$stateParams','$state','remoteDataService','sfdcPanelFieldsService',
  function(util, common, $scope, $rootScope, $stateParams, $state, remoteDataService, sfdcPanelFieldsService) {

    $scope.userData = remoteDataService.userData;
    $scope.currentAccount = remoteDataService.currentAccount;
    $scope.envPath = envPath;

    var now = new Date();

    $scope.fieldPanel = {
      objectType: 'Post__c', 
      obectId: '', 
      name: 'timelineposts',
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
      onRoute: 'timeline',
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
      $rootScope.$apply(function(){
        $scope.posts = panelListData.recordData;
        $scope.attachments = panelListData.attachments;
        $scope.recordShares = panelListData.recordShares;
        $scope.contactShares = _.pluck($scope.recordShares, 'Contact__c');
      });
    });


    $scope.getEpochDateTimeText = function(epochDate) {
      return util.getEpochDateTimeText(epochDate);
    }

    $scope.getAttachmentId = function(postId) {
      var att = _.findWhere($scope.attachments, {ParentId: postId});
      if(util.defined(att,"Id"))
        return att.Id;
      else return null;
    }

    $scope.isShared = function(postId) {
      return _.findWhere($scope.recordShares, {Post__c: postId});
    }

    $scope.getSharedCount = function(postId) {
      var fnd = _.where($scope.recordShares, {Post__c: postId});
      if(util.defined(fnd,"length"))
        return fnd.length;
      else return 0;
    }

    $scope.viewPanel = function(postId) {
      util.navigate('panelListView',{fieldRecord: 'timelineposts', type:'Post__c', id: postId});
    }


}]);

sfdcControllers.controller('SFDCAppRegisterInfoCtrl', ['util','common','$scope','$rootScope','$stateParams','$state','remoteDataService',
  function(util, common, $scope, $rootScope, $stateParams, $state, remoteDataService) {

    $scope.regInfo = {
      idname: '',
      idnum: '',
      idtype: 'pass',
      employed: "working",
      company: '',
      industry: '',
      title:'',
      jobfunction:'',
      worked: '0-1',
      cfa: false,
      cpa: false,
      pmp: false,
      acca: false,
      cma: false,
      ca: false,
      other: false,
      school: '',
      degree: '',
      help: false,
      offers: false,
      regType: ''
    }

    $scope.regExamInfo = {
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
      country: null,
      city: '',
      state: null,
      zip: '',
      phone: '',
      billcompany: '',
      billaddr1: '',
      billaddr2: '',
      billaddr3: '',
      billcountry: null,
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
      // regType: null, Leave in cookies !!
      ccError: null
    };

    $scope.companies = [];    
    remoteDataService.fetchCompanies(function(err, data) {        

      if(util.defined(data,"result.length")) {
        for(var i=0; i<data.result.length; i++) {
          $scope.companies.push(data.result[i].Name);
        }
      }

    });

    $scope.industries = [
      {name: 'Accounting', id: 1},
      {name: 'Analytics', id: 2},
      {name: 'Asset Liability Management', id: 3},
      {name: 'Audit', id: 4},
      {name: 'Commodities Risk', id: 5},
      {name: 'Consulting', id: 6},
      {name: 'Corporate Finance', id: 7},
      {name: 'Corporate Risk Management', id: 8},
      {name: 'Credit Risk', id: 9},
      {name: 'Derivatives', id: 10},
      {name: 'Derivatives Risk', id: 11},
      {name: 'Economics', id: 12},
      {name: 'Education/Training', id: 13},
      {name: 'Emerging Markets Risk', id: 14},
      {name: 'Energy Risk', id: 15},
      {name: 'Equities Risk', id: 16},
      {name: 'Finance/Banking', id: 17},
      {name: 'Financial Administration', id: 18},
      {name: 'Financial Control', id: 19},
      {name: 'Financial Engineering', id: 20},
      {name: 'Financial Services', id: 21},
      {name: 'Firm-Wide Risk Management', id: 22},
      {name: 'Fixed Income Risk', id: 23},
      {name: 'Foreign Exchange Risk', id: 24},
      {name: 'General Management', id: 25},
      {name: 'Insurance Risk', id: 26},
      {name: 'International Finance', id: 27},
      {name: 'Investment Banking', id: 28},
      {name: 'Investment Management', id: 29},
      {name: 'Legal/Compliance', id: 30},
      {name: 'Market Risk', id: 31},
      {name: 'Model Risk', id: 32},
      {name: 'Operational Risk', id: 33},
      {name: 'Operations', id: 34},
      {name: 'Regulation', id: 36},
      {name: 'Research', id: 37},
      {name: 'Risk Management', id: 38},
      {name: 'Sales/Trading', id: 39},
      {name: 'Structured Products', id: 40},
      {name: 'Technology', id: 41},
      {name: 'Accounting', id: 42},
      {name: 'Asset Management', id: 43},
      {name: 'Audit', id: 44},
      {name: 'Capital Markets', id: 45},
      {name: 'Commodities', id: 46},
      {name: 'Compliance', id: 47},
      {name: 'Consulting', id: 48},
      {name: 'Corporate Banking', id: 49},
      {name: 'Credit Risk', id: 50},
      {name: 'Derivatives', id: 51},
      {name: 'Energy', id: 52},
      {name: 'Finance', id: 53},
      {name: 'Fixed Income', id: 54},
      {name: 'Investment Banking', id: 55},
      {name: 'Investment Management', id: 56},
      {name: 'IT', id: 57},
      {name: 'Management', id: 58},
      {name: 'Market risk', id: 59},
      {name: 'Operational Risk', id: 60},
      {name: 'Operations', id: 61},
      {name: 'Retail Banking', id: 62},
      {name: 'Research', id: 63},
      {name: 'Risk Management', id: 64},
      {name: 'Trading', id: 65},
      {name: 'Training', id: 66},
      {name: 'Treasury', id: 67},
      {name: 'Wealth Management', id: 68},
      {name: 'Other', id: 69}
    ];

    $scope.titles = [
      {name: 'C-Level', id: 1},
      {name: 'SVP', id: 2},
      {name: 'VP', id: 3},
      {name: 'AVP', id: 4},
      {name: 'Associate', id: 5}
    ];

    $scope.jobs = [
      {name: 'Accountant', id: 1},
      {name: 'Analyst', id: 2},
      {name: 'Auditor', id: 3},
      {name: 'Banker', id: 4},
      {name: 'Consultant', id: 5},
      {name: 'Developer', id: 6},
      {name: 'Engineer', id: 7},
      {name: 'Manager', id: 8},
      {name: 'Researcher', id: 9},
      {name: 'Trader', id: 10},
      {name: 'Trainer/Instructor', id: 11},
      {name: 'Other', id: 12}

    ];

    var regType = util.getCookie('regType');
    if(util.defined(regType) && regType != "null") {
      $scope.regInfo.regType = regType;
    }


    for (var property in $scope.regExamInfo) {
        util.delete_cookie(property);
    }    

    if(!defined($stateParams,"contactId.length") || $stateParams.contactId.length == 0) {
      $scope.contactNotFound=1;
    } else {

      $scope.contactId = $stateParams.contactId;

      var data = {
        result: [{
          Company__c: 'IBM',
          Corporate_Title__c: 'CFO',
          Area_of_Concentration__c: 'Computing'
        }]
      }
      remoteDataService.getContactInfo($scope.contactId, function(err, data) {
        if(util.defined(data,"result.contactReturnData") && util.defined(data,"result.tempAccount")) {

          $rootScope.$apply(function(){
            // Set Current Contact Values
            $scope.contact = data.result.contactReturnData;
            $scope.tempAccount = jQuery.extend(true, {}, data.result.tempAccount);
            $scope.tempAccount.id = $scope.contact.Id;

            if(util.defined($scope,"regInfo.regType")) {
              if(defined($scope,"contact.Name_As_it_Appears_On_ID__c")) {
                $scope.regInfo.idname = $scope.contact.Name_As_it_Appears_On_ID__c;     
              }
              if(defined($scope,"contact.ID_Type__c")) {
                if($scope.contact.ID_Type__c=='Driver\'s License')
                  $scope.regInfo.idtype = 'drive'
                if($scope.contact.ID_Type__c=='Passport')
                  $scope.regInfo.idtype = 'pass'
              }
              if(defined($scope,"contact.ID_Number__c")) {
                $scope.regInfo.idnum = $scope.contact.ID_Number__c;     
              }              
            }

            if(defined($scope,"contact.Company__c")) {
              $scope.regInfo.company = $scope.contact.Company__c;     
            }
            if(defined($scope,"contact.Corporate_Title__c")) {
              var find = _.findWhere($scope.titles, {name: $scope.contact.Corporate_Title__c});
              $scope.regInfo.title = find;     
            }
            if(defined($scope,"contact.Job_Function__c")) {
              var find = _.findWhere($scope.jobs, {name: $scope.contact.Job_Function__c});
              $scope.regInfo.jobfunction = find;     
            }
            if(defined($scope,"contact.Area_of_Concentration__c")) {
              var find = _.findWhere($scope.industries, {name: $scope.contact.Area_of_Concentration__c});
              $scope.regInfo.industry = find;     
            }
            if(defined($scope,"contact.Years_of_Experience__c")) {
              $scope.regInfo.worked = $scope.contact.Years_of_Experience__c;     
            }
            if(defined($scope,"contact.Professional_Designation_CA__c")) {
              $scope.regInfo.ca = $scope.contact.Professional_Designation_CA__c;     
            }
            if(defined($scope,"contact.Professional_Designation_CFA__c")) {
              $scope.regInfo.cfa = $scope.contact.Professional_Designation_CFA__c;     
            }
            if(defined($scope,"contact.Professional_Designation_CMA__c")) {
              $scope.regInfo.cma = $scope.contact.Professional_Designation_CMA__c;     
            }
            if(defined($scope,"contact.Professional_Designation_CPA__c")) {
              $scope.regInfo.cpa = $scope.contact.Professional_Designation_CPA__c;     
            }

            // OTHER MISSING??
            if(defined($scope,"contact.School_Name__c")) {
              $scope.regInfo.school = $scope.contact.School_Name__c;     
            }
            if(defined($scope,"contact.Degree_Program_Name__c")) {
              $scope.regInfo.degree = $scope.contact.Degree_Program_Name__c;     
            }
          });

        } else {
          common.errorCheckBroadcast(500, common.ERRORS.errorRetrieve.msg)
        }
      });

    }

    $scope.submitForm = function(formState) {
      $scope.submitted = true;
      if (formState.$valid) {
        //alert('our form is amazing');
        $scope.save();
      }
    };


    $scope.save = function() {
      // save to contact
      if(util.defined($scope,"regInfo.regType") && ($scope.regInfo.regType=='frm' || $scope.regInfo.regType=='erp')) {

        $scope.tempAccount.idName = $scope.regInfo.idname;

        if($scope.regInfo.idtype=='drive')
          $scope.tempAccount.idType = 'Driver\'s License';
        if($scope.regInfo.idtype=='pass')
          $scope.tempAccount.idType = 'Passport';

        $scope.tempAccount.idNumber = $scope.regInfo.idnum;
      }

      $scope.tempAccount.Company = $scope.regInfo.company;

      if($scope.regInfo.employed == 'notworking') {

        // Do we remove??

      } else {
        
        $scope.tempAccount.Company = $scope.regInfo.company;

        if(defined($scope,"regInfo.title.name"))
          $scope.tempAccount.Title = $scope.regInfo.title.name;

        if(defined($scope,"regInfo.jobfunction.name"))
          $scope.tempAccount.JobFunction = $scope.regInfo.jobfunction.name;
    
        if(defined($scope,"regInfo.industry.name"))
          $scope.tempAccount.Organization = $scope.regInfo.industry.name;

        $scope.tempAccount.Years_of_Experience = $scope.regInfo.worked;
        $scope.tempAccount.CA = $scope.regInfo.ca;
        $scope.tempAccount.CFA = $scope.regInfo.cfa;
        $scope.tempAccount.CMA = $scope.regInfo.cma;
        $scope.tempAccount.CPA = $scope.regInfo.cpa;
        // OTHER MISSING??
      }

      $scope.tempAccount.School = $scope.regInfo.school;
      $scope.tempAccount.Degree_Program_Name = $scope.regInfo.degree;

      console.dir($scope.tempAccount);

      //$state.go("registerThanks");

      remoteDataService.setContactInfo($scope.tempAccount, function(err, data) {
        if(util.defined(data,"result")) {
          //Done!!
          $state.go("registerThanks");
        } else {
          common.errorCheckBroadcast(500, common.ERRORS.errorSave.msg)
        }
      });
    }

    $scope.skip = function() {
      $state.go("registerThanks");
    }

  }
]);



sfdcControllers.controller('SFDCAppRegisterThanksCtrl', ['util','common','$scope', '$rootScope', '$state','remoteDataService','$window',
  function(util,common, $scope, $rootScope, $state, remoteDataService, $window) {

    $scope.userInfo = remoteDataService.userData;
    $scope.currentAccount = remoteDataService.currentAccount;

    $scope.envPath = envPath;

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
      country: null,
      city: '',
      state: null,
      zip: '',
      phone: '',
      billcompany: '',
      billaddr1: '',
      billaddr2: '',
      billaddr3: '',
      billcountry: null,
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
    }

    var regType = util.getCookie('regType');
    if(util.defined(regType) && regType != "null") {
      $scope.regType = regType;
    }


    for (var property in $scope.regInfo) {
        util.delete_cookie(property);
    }    
    
  }
]);


sfdcControllers.controller('SFDCAppMemberRegistrationCtrl', ['util','common','$scope', '$rootScope', '$state','$stateParams','$location','$anchorScroll','$q','$interval','$window','remoteDataService',
  function(util,common, $scope, $rootScope, $state, $stateParams, $location, $anchorScroll, $q, $interval, $window, remoteDataService) {

    $scope.userData = remoteDataService.userData;
    $scope.currentAccount = remoteDataService.currentAccount;
    $scope.envPath = envPath;

    $scope.user = {
        sameShip: true
    };
    $scope.garp = {};
    var todaysDate = new Date();
    $scope.todaysDate = todaysDate.getTime();
    $scope.validationErrors = false;
    $scope.backend = BackEnd;
    $scope.countries = util.countries;
    var Countries = util.countries;
    $scope.canadaStates = util.caData;
    $scope.USstates = util.usData;
    $scope.password_REGEXP = /^.*(?=.{6,})(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).*$/i;
    $scope.EMAIL_REGEXP = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    $scope.NAME_REGEXP = /^[a-zA-Z\-]*$/;
    $scope.phoneNumberPattern = /\d{3}-\d{3}-\d{4}|\d{10}/;
    $scope.addressPattern = /^[A-Za-z0-9 .-]{1,32}$/;
    //console.log($scope.backend.isEnrolled);
    $scope.formInfo = {};
    tempAccount.isFrmChecked = false;
    tempAccount.isErpChecked = false;
    tempAccount.isFbrChecked = false;
    tempAccount.isIcbrChecked = false;
    tempAccount.frmSwitch = BackEnd.frmSwitch || false;
    tempAccount.erpSwitch = BackEnd.erpSwitch || false;
    tempAccount.switchFeeEnabled = BackEnd.switchEnable || false;
    $scope.testTotal = 0;
    tempAccount.hasBooks = false;
    tempAccount.autoRenew = false;
    $scope.backend.contactInfo = BackEnd.contactInfo ? BackEnd.contactInfo : {};
    if(util.defined($scope,"backend.contactInfo")) {
      tempAccount.MailingStreet = $scope.backend.contactInfo.MailingStreet;
      tempAccount.MailingStreet2 = $scope.backend.contactInfo.MailingStreet2 || null;

      for(var i=0; i< $scope.USstates.length; i++) {
        if($scope.USstates[i].n.toLowerCase() == $scope.backend.contactInfo.MailingState.toLowerCase()) {
          tempAccount.MailingState = $scope.USstates[i].v;
          break;
        }
      }

      tempAccount.MailingCity = $scope.backend.contactInfo.MailingCity;
      tempAccount.MailingPostalCode = $scope.backend.contactInfo.MailingPostalCode;
      tempAccount.MailingCountry = $scope.backend.contactInfo.MailingCountry;
    }

    switch (BackEnd.ExamName) {
        case 'FRM':
            {
                $scope.Headline = "Become a Certified FRM";
                $scope.Headline2 = "Register for the FRM Exam Today";
                $scope.examName = "FRM";
                tempAccount.TestNumber = null;
                tempAccount.isFrmChecked = true;
                break;
            }
        case 'ERP':
            {
                $scope.Headline = "Become a Certified ERP";
                $scope.Headline2 = "Register for the ERP Exam Today";
                $scope.examName = "ERP";
                tempAccount.TestNumber = "testOne";
                tempAccount.isErpChecked = true;
                break;
            }
    }
    //console.log(tempAccount.TestNumber);
    /* All of this can be binded to Salesforce */
    $scope.AccordionGroups = [{
        title: "1. Exam and Materials",
        content: envPath + '/partials/registration/memberRegistrationForm/fieldSetThree.html',
        open: true
    }];

    $scope.toggelMaterials = function() {
      if(tempAccount.MaterialsOne) {
        tempAccount.sameShip=true;
        $scope.getNewAddressUPS();
      } 
    }

    $scope.toggleShip = function() {
      for(var i=0; i< $scope.USstates.length; i++) {
        if($scope.USstates[i].n.toLowerCase() == $scope.backend.contactInfo.MailingState.toLowerCase()) {
          tempAccount.MailingState = $scope.USstates[i].v;
          break;
        }
      }      
    }

    $scope.selectAltAddress = function() {
      var idx = parseInt($scope.garp.alternateAddress)
      var alt = $scope.alternateAddresses[idx];      

      tempAccount.MailingStreet = alt.strAddress;
      tempAccount.MailingStreet2 = null;
      tempAccount.MailingState = alt.strStateCode;
      tempAccount.MailingCity = alt.strCity;
      tempAccount.MailingPostalCode = alt.strZipCode;
    }

    $scope.getNewAddressUPS = function() {
        var listProdCodes = [];
        if(util.defined($scope,"user.MaterialsOne") && tempAccount.MaterialsOne == true) {
            listProdCodes.push(BackEnd.materialsCodes.ProductCode);
        }
        if(util.defined($scope,"user.MaterialsTwo") && tempAccount.MaterialsTwo == true) {            
            listProdCodes.push(BackEnd.materialsCodesTwo.ProductCode);
        }
        if(util.defined($scope,"user.MaterialsOne") && util.defined($scope,"user.MaterialsTwo") &&
           tempAccount.MaterialsTwo && tempAccount.MaterialsOne) {
            listProdCodes.push(BackEnd.materialsCodes.ProductCode);
            listProdCodes.push(BackEnd.materialsCodesTwo.ProductCode);
        }
        if(tempAccount.isFbrChecked || tempAccount.isIcbrChecked) {
            listProdCodes.push(BackEnd.examCodes.ProductCode);
        }
        var mailingCountryCode;
        for (var i = 0; i < Countries.length; i++) {
            if (tempAccount.MailingCountry === Countries[i].name) {

                mailingCountryCode = Countries[i].cca2;
                //console.log(mailingCountryCode);
            }
        }
        $scope.addressForShipping = {
            'MailingStreet': tempAccount.MailingStreet,
            'MailingStreet2': tempAccount.MailingStreet2,
            'MailingCity': tempAccount.MailingCity,
            'MailingCountry': mailingCountryCode,
            'MailingState': tempAccount.MailingState,
            'MailingPostalCode': tempAccount.MailingPostalCode,
            'products': listProdCodes
        }
        BackEnd.getUPSPrice($q, $scope.addressForShipping).then(function(resp) {
            if(!util.defined(resp) || (util.defined(resp[0],"lstMatchingAddress.length") && resp[0].lstMatchingAddress.length == 0)) {
              $scope.upsOptions = null;
              tempAccount.ShippingOptions = null;
              tempAccount.sameShip=false;
              $scope.alternateAddresses = null;
              return;
            } else {
              tempAccount.sameShip=true;
            }
            //console.log(resp[0].lstMatchingAddress);
            if(util.defined(resp[0],"lstMatchingAddress.length") && tempAccount.sameShip == true) {
              tempAccount.sameShip = false;
            }
            $scope.garp.alternateAddress=-1;
            tempAccount.ShippingOptions = null;
            $scope.upsOptions = resp[0].lstMatchingAddress ? null : resp;
            $scope.alternateAddresses = resp[0].lstMatchingAddress ? resp[0].lstMatchingAddress : null;

            if(defined($scope,"upsOptions")) {
                $scope.colors=[];
                for(var i=0; i<$scope.upsOptions.length; i++) {
                    var opt = {
                        id: i,
                        strUPSDesc: $scope.upsOptions[i].strUPSDesc,
                        strUPSDescForm: $scope.upsOptions[i].strUPSDesc + '($' + parseFloat(Math.round($scope.upsOptions[i].dPrice * 100) / 100).toFixed(2) + ')',
                        dPrice: $scope.upsOptions[i].dPrice
                    }
                    $scope.colors.push(opt);
                }
            }            
        }, function(err) {
            $scope.upsOptions = null;
            tempAccount.ShippingOptions = null;
        });
    };

    $scope.$watch('user.MaterialsOne', function(oldval, newVal) {
        $scope.getNewAddressUPS();
    });
    $scope.$watch('user.MaterialsTwo', function(oldval, newVal) {
        $scope.getNewAddressUPS();
    });
    $scope.$watch('garp.alternateAddress', $scope.getNewAddressUPS());
    $scope.isCollapsed = false;
    $scope.sectionOneNotValid = function() {
        return $scope.userForm.pageThree.$invalid || tempAccount.MaterialsOne && !tempAccount.ShippingOptions || tempAccount.MaterialsTwo && !tempAccount.ShippingOptions;
    };

    $scope.testTotal = function() {
        switch (tempAccount.TestNumber) {
            case null:
              return 0;
            case 'bothExams':
              return BackEnd.testOne.examPrice + BackEnd.testTwo.examPrice;
            default:
              if (BackEnd.testOne)
                  return BackEnd.testOne.examPrice;
              else return null;
        }
    };
    $scope.materialsOneTotal = function() {
        return tempAccount.MaterialsOne ? BackEnd.prices.materials : 0;
    };
    $scope.materialsTwoTotal = function() {
        return tempAccount.MaterialsTwo ? BackEnd.prices.materialsTwo : 0;
    };
    var paymentMethodexamPrice = function() {
        return (util.defined($scope,"user.paymentMethod") && (tempAccount.paymentMethod === 'deferredCreditCardFax' || 'deferredCheck' || 'deferredWireTransfer')) ? BackEnd.deferredPayment.dMemberAmt : 0;
    };
    var enrollmentPrice = function() {
        return !BackEnd.isEnrolled ? BackEnd.prices.enrollment : 0;
    };
    var switchPrice = function() {
        return BackEnd.switchEnable ? BackEnd.switchFee : 0;
    };
    $scope.allTotal = function() {

        return $scope.materialsOneTotal() + $scope.materialsTwoTotal() + $scope.testTotal() + paymentMethodexamPrice() + enrollmentPrice() + switchPrice();

        // return $scope.materialsOneTotal() + (tempAccount.TestNumber !== 'testOne' ? $scope.materialsTwoTotal() : 0) +
        //     $scope.testTotal() + (!BackEnd.isEnrolled ? BackEnd.prices.enrollment : 0) +
        //     (tempAccount.paymentMethod && tempAccount.paymentMethod !== 'creditCard' && tempAccount.paymentMethod !== 'selectPayMethod' ? BackEnd.deferredPayment.dMemberAmt : 0) +
        //     (BackEnd.switchEnable ? BackEnd.switchFee : 0);
    };
    var gotoField = function(fieldId) {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash(fieldId);
        // call $anchorScroll()
        $anchorScroll();
    };

    $scope.open = function() {
        tempAccount.MailingStreet = $scope.backend.contactInfo.MailingStreet;
        tempAccount.MailingCountry = $scope.backend.contactInfo.MailingCountry;
        if ($scope.sectionOneNotValid() || !BackEnd.contactDetails && !tempAccount.idVerify) {
            $scope.validationErrors = true;
            gotoField('examReg');
            //console.log('Checkpoint 1');
            return;
        }

        if (!tempAccount.paymentMethod && $scope.allTotal() > 0) {
            $scope.validationErrors = true;
            gotoField('paymentMethod');
            //console.log('Checkpoint 2');
            return;
        }
        if (!tempAccount.ShippingOptions && tempAccount.MaterialsOne || !tempAccount.ShippingOptions && tempAccount.MaterialsTwo) {
            $scope.validationErrors = true;
            gotoField('shippingOptions');
            return;
        }
        if (BackEnd.userCountry === 'Iran' ||
            BackEnd.userCountry === 'Libya' ||
            BackEnd.userCountry === 'Syria' ||
            BackEnd.userCountry === 'North Korea' ||
            BackEnd.userCountry === 'Sudan' ||
            BackEnd.userCountry === 'Somalia' ||
            BackEnd.shippingCountry === 'Iran' ||
            BackEnd.shippingCountry === 'Libya' ||
            BackEnd.shippingCountry === 'Syria' ||
            BackEnd.shippingCountry === 'North Korea' ||
            BackEnd.shippingCountry === 'Sudan' ||
            BackEnd.shippingCountry === 'Somalia') {
            $scope.blackListedCountry = true;
            return;
        }
        //console.log('Checkpoint 3');
        $scope.validationErrors = false;
        $scope.complexConfirmation = true;
        var sessionStamp = new Date();
        //$localStorage.garp = {};
        //$localStorage.garp.timeStamp = sessionStamp.getTime();
        tempAccount.productcode = [];
        tempAccount.productcode1 = [];
        //console.log(BackEnd.isEnrolled);
        tempAccount.isStudentChecked = false;
        tempAccount.taxPrice = 0;

        // Sales Tax
        if (tempAccount.MailingState === 'NJ') {
            if (tempAccount.MaterialsOne)
                tempAccount.taxPrice = (tempAccount.ShippingOptions.dPrice + BackEnd.prices.materials) * 0.07;

            if (tempAccount.MaterialsTwo)
                tempAccount.taxPrice += (tempAccount.ShippingOptions.dPrice + BackEnd.prices.materialsTwo) * 0.07;

            if (tempAccount.MaterialsOne || tempAccount.MaterialsTwo) {
                tempAccount.productcode1.push({
                    'GLCode': BackEnd.taxCodes.strTaxGLCode,
                    'ProductCode': BackEnd.taxCodes.strTaxProdCode
                });

            }
        }

        // Shipping
        if (tempAccount.ShippingOptions) {
            tempAccount.productcode1.push({
                'GLCode': BackEnd.shippingCodes.strShippingGLCode,
                'ProductCode': BackEnd.shippingCodes.strShippingProdCode
            });
            tempAccount.ShippingOptionsString = tempAccount.ShippingOptions ? 'dPrice:' + tempAccount.ShippingOptions.dPrice + ', ' + 'strUPSDesc:' + tempAccount.ShippingOptions.strUPSDesc : null;
        }
        if ((BackEnd.userCountry === 'CA' && tempAccount.MaterialsOne) || (tempAccount.MailingCountry === 'CA' && tempAccount.MaterialsTwo) || (tempAccount.MailingCountry === 'CA' && tempAccount.isIcbrChecked) || (tempAccount.MailingCountry === 'CA' && tempAccount.isFbrChecked)) {
            tempAccount.productcode1.push(BackEnd.canadianTaxCodes);
        }

        // Materials
        if (tempAccount.MaterialsOne) {
            tempAccount.productcode1.push(BackEnd.materialsCodes);
            tempAccount.hasBooks = true;
        }
        if (tempAccount.MaterialsTwo) {
            tempAccount.productcode1.push(BackEnd.materialsCodesTwo);
            tempAccount.hasBooks = true;
        }
        if (tempAccount.TestNumber === 'testOne') {
            tempAccount.MaterialsTwo = false;
        }

        // Exam 
        // Non-switch logic
        tempAccount.examName = $scope.examName;

        if(tempAccount.TestNumber === 'testOne') {
          tempAccount.productcode1.push(BackEnd.examCodes);
          if(tempAccount.isFrmChecked)
             tempAccount.examName = 'FRM Part 1';
        }
          
        if(tempAccount.TestNumber === 'testTwo') {
          tempAccount.productcode1.push(BackEnd.examCodesTwo);
          if(tempAccount.isFrmChecked)
             tempAccount.examName = 'FRM Part 2';
        }

        if(tempAccount.TestNumber === 'bothExams') {
          tempAccount.productcode1.push(BackEnd.examCodes);
          tempAccount.productcode1.push(BackEnd.examCodesTwo);
          tempAccount.examName = 'FRM Part 1 & 2';
        }

        if (!BackEnd.isEnrolled) {
            tempAccount.productcode1.push(BackEnd.enrollmentCodes);
            tempAccount.productcode1.push(BackEnd.freeMembershipCodes);
        }

        // Defer Payment Fee
        if (tempAccount.paymentMethod !== 'creditCard') {
            tempAccount.productcode1.push(BackEnd.deferredPaymentCodes);
        }

        tempAccount.siteName = tempAccount.TestLocation;
        tempAccount.examName = tempAccount.TestNumber;
        //console.log($scope.user);
        $scope.register = function(user) {
            //console.log(user);
            //debugger
            //$state.go('frm.splash');
            user.id = BackEnd.contactInfo.Id;
            var communityDom = window.location.hostname;
            var dashboardURL = communityDom + "/apex/sfdcApp#!/";
            BackEnd.CreateOrderPortal($q, $interval, user).then(function(resp) {
                //console.log(user);
                //debugger
                //$localStorage.$reset();
                if (BackEnd.allTotal === 0 || user.paymentMethod && user.paymentMethod.indexOf("deferred") != -1) {
                    $window.location.href = BackEnd.portalUrl;
                    return;
                } else {
                    if (user.autoRenew) {
                        $window.location.href = BackEnd.renewUrl + resp + '&context=website&finish_url=https%3A%2F%2F' + BackEnd.baseUrl;
                    } else
                        $window.location.href = BackEnd.endUrl + resp + '&context=website&finish_url=https%3A%2F%2F' + dashboardURL;
                }
            }, function(error) {
                spinner.stop();
                disableToggleForm('#formArea',false);
                util.logError(error);
                $scope.errorMessage = "There was an issue processing your order, please contact support at memberservivces@garp.com";
                
            }, function(notification) {
            });
            //console.log(user);
        };
        BackEnd.allTotal = $scope.allTotal();

        disableToggleForm('#formArea',true);
        var spinner = util.startSpinner('#subSpin','#8b8989');

        $scope.register($scope.user);
    };


  }
]);

sfdcControllers.controller('SFDCAppCtrl', ['util','common','$scope', '$rootScope', '$state','remoteDataService',
  function(util,common, $scope, $rootScope, $state, remoteDataService) {

  	$scope.userInfo = remoteDataService.userData;
  	$scope.currentAccount = remoteDataService.currentAccount;

    $scope.envPath = envPath;

  	$scope.toProperCase = function(str) {
  		return str.toProperCase();
  	}

    var currentYear = moment().year();
    var currentMonth = moment().month();

    $scope.events = [
      {
        title: 'Event 1',
        type: 'warning',
        starts_at: new Date(currentYear,currentMonth,25,8,30),
        ends_at: new Date(currentYear,currentMonth,25,9,30)
      },
      {
        title: 'Event 2',
        type: 'info',
        starts_at: new Date(currentYear,currentMonth,19,7,30),
        ends_at: new Date(currentYear,currentMonth,25,9,30)
      },
      {
        title: 'This is a really long event title',
        type: 'important',
        starts_at: new Date(currentYear,currentMonth,25,6,30),
        ends_at: new Date(currentYear,currentMonth,25,6,60)
      },
    ];

    $scope.calendarView = 'month';
    $scope.calendarDay = new Date();


  }
]);

sfdcControllers.controller('SFDCAppVerifyAuthCtrl', ['util','common','$scope', '$rootScope', '$state','remoteDataService',
  function(util,common, $scope, $rootScope, $state, remoteDataService) {

    $scope.userData = remoteDataService.userData;
    $scope.currentAccount = remoteDataService.currentAccount;

    $scope.envPath = envPath;

    if(util.defined($scope,"userData.frmContract.completedDate") || util.defined($scope,"userData.erpContract.completedDate")) {

      remoteDataService.encodeString($scope.userData.contactData.GARP_Member_ID__c, function(err, data) {
        document.location.href = 'http://dailylimit.garp.org/GateWay.php?p=956&sfdc=1&ID=' + data.result;  
      });      

    }
    
  }
]);

sfdcControllers.controller('SFDCAppChatterProfileCtrl', ['util','common','$scope', '$rootScope', '$state','remoteDataService',
  function(util,common, $scope, $rootScope, $state, remoteDataService) {

    $scope.userData = remoteDataService.userData;
    $scope.currentAccount = remoteDataService.currentAccount;

    $scope.envPath = envPath;

    var chURL = String.format(chatterProfileURL, remoteDataService.userData.userData.Id);

    $scope.iFrameSrc = contactsURL + chURL;
  }
]);

sfdcControllers.controller('SFDCAppErrorCtrl', ['util','common','$scope', '$rootScope', '$state','remoteDataService',
  function(util,common, $scope, $rootScope, $state, remoteDataService) {

    $scope.$on("appError", function (event, msg) {
      $('#myGlobalErrorModal p').html(msg)
      $("#myGlobalErrorModal").modal();
    });


  }
]);