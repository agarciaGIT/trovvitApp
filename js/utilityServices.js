//var utils = angular.module('utils', ['ngResource']);

utilityServices = angular.module('sfdcServices');

utilityServices.factory('util', ['$resource','$http','$location','$window','$localStorage','$state','$stateParams','remoteDataService','common',
  function($resource, $http, $location, $window, $localStorage, $state, $stateParams, remoteDataService, common){

    var util = {};
    util.$http = $http;
    util.$location=$location;
    util.$localStorage = $localStorage;
    util.$state = $state;
    util.$stateParams = $stateParams;
    util.$window = $window;
    util.remoteDataService = remoteDataService;
    util.spinner = null;
    util.disableToggleFormSelector = null;

    util.spinnerOptions = {
      lines: 13, // The number of lines to draw
      length: 20, // The length of each line
      width: 10, // The line thickness
      radius: 30, // The radius of the inner circle
      corners: 0.5, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#8b8989', // #rgb or #rrggbb or array of colors
      speed: 1, // Rounds per second
      trail: 60, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: '10', // Top position relative to parent in px
      left: 'auto' // Left position relative to parent in px
    };

    util.frmRegistrationURL = "/apex/websiteUtilities#!/exams/frmMemberRegister";
    util.erpRegistrationURL = "/apex/websiteUtilities#!/exams/erpMemberRegister";
    util.frmSwitchRegistrationURL = "/apex/websiteUtilities#!/exams/frmMemberSwitchRegister";
    util.erpSwitchRegistrationURL = "/apex/websiteUtilities#!/exams/erpMemberSwitchRegister";
    util.membershipRegistrationURL = "/apex/websiteUtilities#!/";

    util.communityDom = window.location.hostname;
    util.dashboardURL = communityDom + "/apex/sfdcApp#!/";

    if(util.communityDom.indexOf("build") > -1) {
      util.membershipURL = "http://build-altest.cs16.force.com";
      util.contactsURL = "https://build-garpbuild.cs16.force.com";
      util.paymentURL = "https://build-altest.cs16.force.com?req="
    } else if(util.communityDom.indexOf("uat") > -1) {
      util.membershipURL = "http://uat-altest.cs15.force.com";
      util.contactsURL = "https://uat-garp.cs15.force.com";
      util.paymentURL = "https://uat-altest.cs15.force.com?req="
    }

    util.digitalBadgeFrmURL = "/test/DigitalBadgeFRM";
    util.digitalBadgeErpURL = "/test/DigitalBadgeERP";
    util.publicProfile = "/test#!/frm/contacts/contacts/15773";
    util.bookStoreURL = "/apex/websiteUtilities#!/store/list";
    util.directoryOptOptURL = "/test/DirectoryOptOut";
    util.contentFeedURL = "/apex/contentChatter?contentId=";
    util.deepLinkURL = "/apex/sfdcApp?start=";
    util.uploadURL = "/apex/uploadAttachment?parentId=";
    util.chatterProfileURL = "/_ui/core/userprofile/UserProfilePage?u={0}&tab=sfdc.ProfilePlatformFeed";

    util.photoUpload = "/apex/uploadPhoto";

    util.mediaDom = "ec2-54-186-51-192.us-west-2.compute.amazonaws.com";


    util.CERT_REPLACE_PRICE = 100;
    util.CANADIAIN_DUTY_PRICE = 16;
    util.ADDRESS_LINES_ALLOWED = 3;
    util.SIZE_ADDRESS_LINE_MAX = 32;
    util.TAX_RATE = .07;

    util.FRM1_PROD_KEY = "FRM1H";
    util.FRM2_PROD_KEY = "FRM2H";
    util.ERP_PROD_KEY = "ENC";
    util.MISC_PROD_CODE = 'MISC';
    util.DEFERAL_FRM_PROD_CODE = 'FRM1';
    util.DEFERAL_ERP_PROD_CODE = 'ENC';
    util.FBR_MEM_PROD_CODE = 'FCBR';
    util.FBR_NONMEM_PROD_CODE = 'FBRNM';
    util.FBR_BOOK_PROD_CODE = 'FBRHB';
    util.ICBRR_NONMEM_PROD_CODE = 'CBRNM';
    util.ICBRR_MEM_PROD_CODE = 'CBR';
    util.ICBRR_RETAKE_PROD_CODE = 'CBR2A';
    util.ICBRR_BOOK_PROD_CODE = 'CBRHB';
    // Make same as ICBRR book above
    util.CERT_PROD_CODE = 'CBRHB';

    util.FRMPart2BooksNonCandidate = "FRM2N"
    util.FRMPracticeExamsCandidate="FRMCP"
    util.EnergyCertificateCoursePackCandidate="ENCCP"
    util.FRMPart2BooksCandidate="FRM2H"
    util.FRMPart1BooksCandidate="FRM1H"
    util.FoundationHandbook="FBRHB"
    util.ICBRRHandBooks="CBRHB"
    util.ICBRRHandBooksIndividual="CBRHI"
    util.FRMPart1BooksNonCandidate="FRM1N"
    util.FRMPracticeExamsNonCandidate="FRMCN"
    util.EnergyCertificateCoursePackNonCandidate="ENCBN"    

    util.FRMExamPart1Late="FRM1L"
    util.FRMExamPart1Standard="FRM1S"
    util.FRMExamPart1Early="FRM1E"
    util.FRMExamPart2Late="FRM2L"
    util.FRMExamPart2Standard="FRM2S"
    util.FRMExamPart2Early="FRM2E"
    util.ERPExamLate="ENCL"
    util.ERPExamStandard="ENCS"
    util.ERPExamEarly="ENCE"
    
    
    util.MEMBER_FREE_PROD_CODE = 'MEMF';
    util.MEMBER_PROD_CODE = 'MEMI';
    util.MEMBER_STUDENT_PROD_CODE = 'MEMS';
    util.SHIP_PROD_CODE = 'SHIP';
    util.TAX_PROD_CODE = 'SLSTX';
    util.PAY_DEFERRED_PROD_CODE = "PRFEE";
    util.JWILEY_PROD_CODE = 'MEMW';

    util.MAY_EXAM_REG_GL = "4001";
    util.NOV_EXAM_REG_GL = "4002";
    util.FBR_GL = "4000";


    util.MISC_GL = '4999';
    util.FBR_GL = "4000";
    util.IND_GL = "4040";
    util.ICBRR_GL = "4000";
    util.JWILEY_GL = '2007';
    util.DEFERRED_GL = "4020";
    util.PAY_DEFERRED_GL = "6110";
    util.SHIP_GL = "4999";
    util.TAX_GL = "2819";

    util.ERRORS = {
      errorLoad: {
        code: 100,
        msg: "There was an error loading your account. Please logout and try again. If this error persists please contact support at memberservices@garo.com"
      }
    }

    util.idTypes = [
      "Driver's License",
      "Passport"
    ]

    util.errorCheck = function(err) {
      return common.errorCheck(err);
    }

    util.errorCheckBroadcast = function(err) {
      var retError = common.errorCheckBroadcast(err);
      if(retError == true) {
        if(this.defined(util,"spinner"))
          this.spinner.stop();

        if(this.defined(util,"disableToggleFormSelector"))
          this.disableToggleForm(this.disableToggleFormSelector,false);
      }
      return retError;
    }

    util.routePage = function(route, params) {
      if(this.defined(params)) {
        var pStr="";
        for (var property in params) {
            if (params.hasOwnProperty(property)) {
                // do stuff
                if(pStr=="")
                  pStr = params[property];
                else pStr = pStr + "," + params[property];
            }
        }

        $location.path('/'+route+pStr)
        //$state.go(route, params);     
      } else {
        $state.go(route);   
      }
    }

    // Mod signutre
    util.navigate = function(route, params) {
      $('.row').hide();
      $('.panel').hide();
      var selector = '#spin';
      var obj = $(selector)
      if(obj !== null && typeof obj !== "undefined" && obj.length > 0) {
        util.spinner = new Spinner(this.spinnerOptions).spin(obj[0]);
      }   
      this.routePage(route, params);
    }

    util.defined = function(ref, strNames) {
        var name;
        
        if(ref === null || typeof ref === "undefined") {
          return false;
        }

        if(strNames !== null && typeof strNames !== "undefined") {
          var arrNames = strNames.split('.');
          while (name = arrNames.shift()) {        
              if (ref[name] === null || typeof ref[name] === "undefined" || !ref.hasOwnProperty(name)) return false;
              ref = ref[name];
          } 
        }
        return true;
    }

    util.getCookie = function(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length == 2) return parts.pop().split(";").shift();
    }

    util.delete_cookie = function(name) {
      document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    util.createCookie = function(name,value,min) {
      if (min) {
          var date = new Date();
          date.setTime(date.getTime()+(min*60*1000));
          var expires = "; expires="+date.toGMTString();
      }
      else var expires = "";
      document.cookie = name+"="+value+expires+"; path=/";
    }


    util.isRecordType = function(recordTypes, recordTypeName, obj) {
      if(this.defined(recordTypes) && this.defined(recordTypeName) && this.defined(obj)) {
        var actObj = _.findWhere(recordTypes, {Name: recordTypeName});
        if(this.defined(actObj))
          return (actObj.Id == obj.RecordTypeId);
        else return false;
      } else {
        return false;
      }
    }

    util.isContentType = function(obj, recordTypeName) {
      if(this.defined(obj)) {
        var actObj = _.findWhere(remoteDataService.userData.contentRecordTypeData, {DeveloperName: recordTypeName});
        if(this.defined(actObj))
          return (actObj.Id == obj.RecordTypeId);
        else return false;
      } else {
        return false;
      }
    }

    util.getContentTypeId = function(recordTypeName) {
      var actObj = _.findWhere(remoteDataService.userData.contentRecordTypeData, {DeveloperName: recordTypeName});
      if(this.defined(actObj))
        return actObj.Id;
      else return '';
    }

    util.getContentTypeName = function(recordTypeId) {
      var actObj = _.findWhere(remoteDataService.userData.contentRecordTypeData, {Id: recordTypeId});
      if(this.defined(actObj))
        return actObj.Name;
      else return '';
    }

    util.getActivityName = function(id) {
      var actObj = _.findWhere(remoteDataService.userData.activityTypeData, {Id: id});
      if(this.defined(actObj))
        return actObj.Name;
      else return '';
    }

    util.getProviderName = function(id) {
      var actObj = _.findWhere(remoteDataService.userData.providerData, {Id: id});
      if(this.defined(actObj))
        return actObj.Name;
      else return '';
    }

    util.getImageURL = function(imageURL) {
      if(imageURL.indexOf('%') > -1)
        imageURL="";
      return imageURL;
    }

    util.logError = function(errorObj, msg, file, method) {
      if(!defined(msg))
        msg="";
      if(!defined(file))
        file="";
      if(!defined(method))
        method="";

      this.remoteDataService.logError(JSON.stringify(errorObj), msg, file, method, function() {
      });
    }


    util.disableToggleForm = function(selectorClass, disabled) {
      util.disableToggleFormSelector = selectorClass;
      $(selectorClass + ' input').attr('disabled',disabled);
      $(selectorClass + ' select').attr('disabled',disabled);
      $(selectorClass + ' textarea').attr('disabled',disabled);
      $(selectorClass + ' button').attr('disabled',disabled);
    }

    util.startSpinner = function(selector, color, top, radius) {
      var obj = $(selector);
      var spinOptions = jQuery.extend(true, {}, this.spinnerOptions);       

      if(this.defined(obj,"length") && obj.length > 0) {
        if(this.defined(color))
          spinOptions.color = color;
        if(this.defined(top))
          spinOptions.top = top;
        if(this.defined(top))
          spinOptions.radius = radius;
        util.spinner = new Spinner(spinOptions).spin(obj[0]);
        return util.spinner;
      } else {
        return null;
      }
    }

    // Mod signutre
    util.declineOrderByCountry = function() {

      var country = '';
      for(var i=0; i<2; i++) {
        switch(i) {    
          case 0: country = this.remoteDataService.userData.contactData.MailingCountry;
          break;
          case 1: country = this.remoteDataService.userData.accountData.BillingCountry;
          break;
        }

        switch(country) {
          case 'Iran':
          case 'Libya':
          case 'North Korea':
          case 'Sudan':
          case 'Somalia':
            return true;
            break;

        }    
      }
      return false;
    }

    // Mod signutre
    util.convertCPECreditFieldLable = function(panelValues, panelRecord, item, labelText) {

      var pd = this.remoteDataService.userData.providerData;
      var val = panelValues['CPE_Activity_Type__c'];
      var match = _.findWhere(panelRecord.fieldRecords, {name: item.name});
      var matchId = _.findWhere(this.remoteDataService.userData.activityTypeData, {Name: val});
      if(this.defined(matchId)) {
        if(this.defined(matchId,labelText)) {
          var match = _.findWhere(panelRecord.fieldRecords, {name: item.name});
          match.label = matchId[labelText];
          match.isNillable=false;
          return 1;
        }    
      }
      match.isNillable=true;
      return 0;

    }

    util.getChargentId = function(linkSting) {
        var payLink = linkSting;
        var idx = payLink.indexOf("null?req=");
        var id = "";
        if(idx > -1) {
          id=payLink.substring(idx+9,payLink.length);
        }
        return id;
    }

    util.isOppPaid = function(oppStageName) {
      return oppStageName.indexOf("Closed")+1;
    }

    util.isPaid = function(contract) {
      if(this.defined(contract,"Opportunity__r.StageName")) {
        var stage = contract.Opportunity__r.StageName;
        return stage.indexOf('Closed')+1;
      }  else {
        return false;
      }
    }

    // Mod signutre
    util.payOpportunity = function(contractOpp) {
      if(this.defined(contractOpp,"Opportunity__c")) {
        var payId = findOpportunityPaymentId(contractOpp, this.remoteDataService);    
      } else if(this.defined(contractOpp,"pymt__Payments__r.length") && contractOpp.pymt__Payments__r.length > 0) {
        var payId = contractOpp.pymt__Payments__r[0].Id
      } else if(typeof contractOpp == "string") {
        var payId = contractOpp;
      } else {
        alert("This order was not processed properly please contact member services at memberservices@garp.com!");
        return;
      }
      this.$window.location.href = 'http://' + paymentDom  + '?pid=' + payId + '&context=website&finish_url=https%3A%2F%2F' + dashboardURL;
    }

    // Mod signutre
    util.findOpportunityPaymentId = function(contract) {

      if(this.defined(contract,"Opportunity__c")) {
        for(var i=0; i<this.remoteDataService.userData.opportunityData.length; i++) {
          var opp = this.remoteDataService.userData.opportunityData[i];
          if(opp.Id == contract.Opportunity__c) {
            if(this.defined(opp,"pymt__Payments__r.length") && opp.pymt__Payments__r.length > 0) {
              return opp.pymt__Payments__r[0].Id;  
            }
          }
        }
      } else {
        return null;
      }
    }

    // Mod signutre
    util.getUPSPrice = function(prods, countryCode, callback) {
      var shippingOptions = [];
      var contactData = this.remoteDataService.contactData;
      this.remoteDataService.getUPSPrice(contactData.MailingStreet,'',contactData.MailingCity,countryCode,contactData.MailingState,contactData.MailingPostalCode, prods, function(err, data) {
        if(this.errorCheckBroadcast(err, common.ERRORS.errorRetrieve.msg)) {return;}
        if(this.defined(data,"result")) {
          shippingOptions = data.result;
          for(var i=0; i<shippingOptions.length; i++) {
            shippingOptions[i].id = i+1;
            shippingOptions[i].origUPSDesc = shippingOptions[i].strUPSDesc;
            shippingOptions[i].strUPSDesc = shippingOptions[i].strUPSDesc + '($' + parseFloat(Math.round(shippingOptions[i].dPrice * 100) / 100).toFixed(2) + ')';
          }          
        }
        callback(null, shippingOptions);
      });
    }

    util.calcTax = function(amount) {
      if(this.defined(amount)) {
        return amount * TAX_RATE;  
      }
    }

    util.validateAddress = function(recordData, streetField) {
        var addr = recordData[streetField].split("\n");
        if(addr.length > ADDRESS_LINES_ALLOWED) {
          return "No more than " + ADDRESS_LINES_ALLOWED + " Address lines are allowed.";
        }
        for(var i=0; i<addr.length; i++) {
          if(addr[i].length > SIZE_ADDRESS_LINE_MAX) {
            return "Address lines must be less than " + SIZE_ADDRESS_LINE_MAX + " characters.";
          }
          for(var j=0; j<addr.length; j++) {
            if(j != i && addr[j] == addr[i]) {
              return "The same address line is not allowed multiple times."
            }
          }
        }
        return "";
    }

    util.textToHTML = function(text) {
      if(this.defined(text))
        return text.replace(/(?:\r\n|\r|\n)/g, '<br />');
      else return "";
    }

    util.decodeEntities = function(s){
      var str, temp= document.createElement('p');
      temp.innerHTML= s;
      str= temp.textContent || temp.innerText;
      temp=null;
      return str;
    }


    util.getEpochShortDateTimeText = function(epochDate) {
      if(epochDate !== null && typeof epochDate !== "undefined") {

        var mdate = moment(epochDate);
        return mdate.format("M/D/YYYY h:mm a");

      } else {
        return "";
      }
    }

    util.getEpochText = function(epochDate, format) {
      if(epochDate !== null && typeof epochDate !== "undefined") {

        var mdate = moment(epochDate);
        return mdate.format(format);

      } else {
        return "";
      }
    }

    util.getEpochLongMonth = function(epochDate) {
      if(epochDate !== null && typeof epochDate !== "undefined") {

        var mdate = moment(epochDate);
        return mdate.format("MMMM");

      } else {
        return "";
      }
    }

    util.getEpochShortMonth = function(epochDate) {
      if(epochDate !== null && typeof epochDate !== "undefined") {

        var mdate = moment(epochDate);
        return mdate.format("MMM");

      } else {
        return "";
      }
    }

    util.getEpochDay = function(epochDate) {
      if(epochDate !== null && typeof epochDate !== "undefined") {

        var mdate = moment(epochDate);
        return mdate.format("DD");

      } else {
        return "";
      }
    }


    util.getEpochSimpleDateTimeText = function(epochDate) {
      if(epochDate !== null && typeof epochDate !== "undefined") {

        var mdate = moment(epochDate);
        return mdate.format("MMM DD h:mm a");

      } else {
        return "";
      }
    }

    util.getEpochSimpleTimeText = function(epochDate) {
      if(epochDate !== null && typeof epochDate !== "undefined") {

        var mdate = moment(epochDate);
        return mdate.format("h:mm a");

      } else {
        return "";
      }
    }

    util.getEpochDateTimeText = function(epochDate) {
      if(epochDate !== null && typeof epochDate !== "undefined") {

        var mdate = moment(epochDate);
        return mdate.format("dddd, MMMM Do, YYYY h:mm a");

      } else {
        return "";
      }
    }

    util.getEpochDateText = function(epochDate) {
      if(epochDate !== null && typeof epochDate !== "undefined") {

        var mdate = moment.tz(epochDate,'GMT');
        return mdate.format("dddd, MMMM Do, YYYY");

      } else {
        return "";
      }
    }

    util.getEpochDateTimeTextTime = function(epochDate) {
      if(epochDate !== null && typeof epochDate !== "undefined") {

        var mdate = moment(epochDate);
        return mdate.format("h:mm a");

      } else {
        return "";
      }
    }


    util.formatAmountDisplay = function(amount) {
      if(!this.defined(amount)) {
        amount=0;
      }
      return parseFloat(Math.round(amount * 100) / 100).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    util.formatAmount = function(amount) {
      if(!this.defined(amount)) {
        amount=0;
      }
      return parseFloat(Math.round(amount * 100) / 100).toFixed(2);  
    }


    util.paymentOptions = [
      {
        name: "Credit Card",
        value: "creditCard",
        allCountires: true,
        fee: false
      },
      {
        name: "Credit Card by Fax",
        value: "deferredCreditCardFax",
        allCountires: false,
        fee: true
      },
      {
        name: "Check",
        value: "deferredCheck",
        allCountires: false,
        fee: true
      },
      {
        name: "Wire Transfer",
        value: "deferredWireTransfer",
        allCountires: true,
        fee: true
      },
    ];

    // usData.s[x].n/v

    util.countries = [
    {
        "name": "Afghanistan",
        "nativeName": "Af\u0121\u0101nist\u0101n",
        "tld": [".af"],
        "cca2": "AF",
        "ccn3": "004",
        "cca3": "AFG",
        "currency": ["AFN"],
        "callingCode": ["93"],
        "capital": "Kabul",
        "altSpellings": ["AF", "Af\u0121\u0101nist\u0101n"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Southern Asia",
        "language": ["Pashto", "Dari"],
        "languagesCodes": ["ps", "uz", "tk"],
        "translations": {
          "de": "Afghanistan",
          "en": "Afghanistan",
          "es": "Afganist\u00e1n",
          "fr": "Afghanistan",
          "it": "Afghanistan",
          "ja": "\u30a2\u30d5\u30ac\u30cb\u30b9\u30bf\u30f3",
          "nl": "Afghanistan"
        },
        "population": 25500100,
        "latlng": [33, 65],
        "demonym": "Afghan",
        "borders": ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"]
      },
      {
        "name": "\u00c5land Islands",
        "nativeName": "\u00c5land",
        "tld": [".ax"],
        "cca2": "AX",
        "ccn3": "248",
        "cca3": "ALA",
        "currency": ["EUR"],
        "callingCode": ["358"],
        "capital": "Mariehamn",
        "altSpellings": ["AX", "Aaland", "Aland", "Ahvenanmaa"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Northern Europe",
        "language": ["Swedish"],
        "languagesCodes": ["sv"],
        "translations": {
          "de": "\u00c5land",
          "en": "\u00c5land Islands",
          "es": "Alandia",
          "fr": "\u00c5land",
          "it": "Isole Aland",
          "ja": "\u30aa\u30fc\u30e9\u30f3\u30c9\u8af8\u5cf6",
          "nl": "\u00c5landeilanden"
        },
        "population": 28502,
        "latlng": [60.116667, 19.9],
        "demonym": "\u00c5landish",
        "borders": []
      },
      {
        "name": "Albania",
        "nativeName": "Shqip\u00ebria",
        "tld": [".al"],
        "cca2": "AL",
        "ccn3": "008",
        "cca3": "ALB",
        "currency": ["ALL"],
        "callingCode": ["355"],
        "capital": "Tirana",
        "altSpellings": ["AL", "Shqip\u00ebri", "Shqip\u00ebria", "Shqipnia"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Southern Europe",
        "language": ["Albanian"],
        "languagesCodes": ["sq"],
        "translations": {
          "de": "Albanien",
          "en": "Albania",
          "es": "Albania",
          "fr": "Albanie",
          "it": "Albania",
          "ja": "\u30a2\u30eb\u30d0\u30cb\u30a2",
          "nl": "Albani\u00eb"
        },
        "population": 2821977,
        "latlng": [41, 20],
        "demonym": "Albanian",
        "borders": ["MNE", "GRC", "MKD", "KOS"]
      },
      {
        "name": "Algeria",
        "nativeName": "al-Jaz\u0101\u02bcir",
        "tld": [".dz"],
        "cca2": "DZ",
        "ccn3": "012",
        "cca3": "DZA",
        "currency": ["DZD"],
        "callingCode": ["213"],
        "capital": "Algiers",
        "altSpellings": ["DZ", "Dzayer", "Alg\u00e9rie"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Northern Africa",
        "language": ["Arabic"],
        "languagesCodes": ["ar"],
        "translations": {
          "de": "Algerien",
          "en": "Algeria",
          "es": "Argelia",
          "fr": "Alg\u00e9rie",
          "it": "Algeria",
          "ja": "\u30a2\u30eb\u30b8\u30a7\u30ea\u30a2",
          "nl": "Algerije"
        },
        "population": 37900000,
        "latlng": [28, 3],
        "demonym": "Algerian",
        "borders": ["TUN", "LDY", "NER", "ESH", "MRT", "MLI", "MAR"]
      },
      {
        "name": "American Samoa",
        "nativeName": "American Samoa",
        "tld": [".as"],
        "cca2": "AS",
        "ccn3": "016",
        "cca3": "ASM",
        "currency": ["USD"],
        "callingCode": ["1684"],
        "capital": "Pago Pago",
        "altSpellings": ["AS", "Amerika S\u0101moa", "Amelika S\u0101moa", "S\u0101moa Amelika"],
        "relevance": "0.5",
        "region": "Oceania",
        "subregion": "Polynesia",
        "language": ["English", "Samoan"],
        "languagesCodes": ["en", "sm"],
        "translations": {
          "de": "Amerikanisch-Samoa",
          "en": "American Samoa",
          "es": "Samoa Americana",
          "fr": "Samoa am\u00e9ricaines",
          "it": "Samoa Americane",
          "ja": "\u30a2\u30e1\u30ea\u30ab\u9818\u30b5\u30e2\u30a2",
          "nl": "Amerikaans Samoa"
        },
        "population": 55519,
        "latlng": [-14.33333333, -170],
        "demonym": "American Samoan",
        "borders": []
      },
      {
        "name": "Andorra",
        "nativeName": "Andorra",
        "tld": [".ad"],
        "cca2": "AD",
        "ccn3": "020",
        "cca3": "AND",
        "currency": ["EUR"],
        "callingCode": ["376"],
        "capital": "Andorra la Vella",
        "altSpellings": ["AD", "Principality of Andorra", "Principat d'Andorra"],
        "relevance": "0.5",
        "region": "Europe",
        "subregion": "Southern Europe",
        "language": ["Catalan"],
        "languagesCodes": ["ca"],
        "translations": {
          "de": "Andorra",
          "en": "Andorre",
          "es": "Andorra",
          "fr": "Andorre",
          "it": "Andorra",
          "ja": "\u30a2\u30f3\u30c9\u30e9",
          "nl": "Andorra"
        },
        "population": 76246,
        "latlng": [42.5, 1.5],
        "demonym": "Andorran",
        "borders": ["FRA", "ESP"]
      },
      {
        "name": "Angola",
        "nativeName": "Angola",
        "tld": [".ao"],
        "cca2": "AO",
        "ccn3": "024",
        "cca3": "AGO",
        "currency": ["AOA"],
        "callingCode": ["244"],
        "capital": "Luanda",
        "altSpellings": ["AO", "Rep\u00fablica de Angola", "\u0281\u025bpublika de an'\u0261\u0254la"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Middle Africa",
        "language": ["Portuguese"],
        "languagesCodes": ["pt"],
        "translations": {
          "de": "Angola",
          "en": "Angola",
          "es": "Angola",
          "fr": "Angola",
          "it": "Angola",
          "ja": "\u30a2\u30f3\u30b4\u30e9",
          "nl": "Angola"
        },
        "population": 20609294,
        "latlng": [-12.5, 18.5],
        "demonym": "Angolan",
        "borders": ["COG", "COD", "ZMB", "NAM"]
      },
      {
        "name": "Anguilla",
        "nativeName": "Anguilla",
        "tld": [".ai"],
        "cca2": "AI",
        "ccn3": "660",
        "cca3": "AIA",
        "currency": ["XCD"],
        "callingCode": ["1264"],
        "capital": "The Valley",
        "altSpellings": ["AI"],
        "relevance": "0.5",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Anguilla",
          "en": "Anguilla",
          "es": "Anguilla",
          "fr": "Anguilla",
          "it": "Anguilla",
          "ja": "\u30a2\u30f3\u30ae\u30e9",
          "nl": "Anguilla"
        },
        "population": 13452,
        "latlng": [18.25, -63.16666666],
        "demonym": "Anguillian",
        "borders": []
      },
      {
        "name": "Antarctica",
        "nativeName": "",
        "tld": [".aq"],
        "cca2": "AQ",
        "ccn3": "010",
        "cca3": "ATA",
        "currency": [""],
        "callingCode": [""],
        "capital": "",
        "altSpellings": ["AQ"],
        "relevance": "0",
        "region": "",
        "subregion": "",
        "language": [""],
        "languagesCodes": [],
        "translations": {
          "de": "Antarktis",
          "en": "Antarctica",
          "es": "Ant\u00e1rtida",
          "fr": "Antarctique",
          "it": "Antartide",
          "ja": "\u5357\u6975",
          "nl": "Antarctica"
        },
        "population": -1,
        "latlng": [-90, 0],
        "demonym": "",
        "borders": []
      },
      {
        "name": "Antigua and Barbuda",
        "nativeName": "Antigua and Barbuda",
        "tld": [".ag"],
        "cca2": "AG",
        "ccn3": "028",
        "cca3": "ATG",
        "currency": ["XCD"],
        "callingCode": ["1268"],
        "capital": "Saint John's",
        "altSpellings": ["AG"],
        "relevance": "0.5",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Antigua und Barbuda",
          "en": "Antigua and Barbuda",
          "es": "Antigua y Barbuda",
          "fr": "Antigua-et-Barbuda",
          "it": "Antigua e Barbuda",
          "ja": "\u30a2\u30f3\u30c6\u30a3\u30b0\u30a2\u30fb\u30d0\u30fc\u30d6\u30fc\u30c0",
          "nl": "Antigua en Barbuda"
        },
        "population": 86295,
        "latlng": [17.05, -61.8],
        "demonym": "Antiguan, Barbudan",
        "borders": []
      },
      {
        "name": "Argentina",
        "nativeName": "Argentina",
        "tld": [".ar"],
        "cca2": "AR",
        "ccn3": "032",
        "cca3": "ARG",
        "currency": ["ARS"],
        "callingCode": ["54"],
        "capital": "Buenos Aires",
        "altSpellings": ["AR", "Argentine Republic", "Rep\u00fablica Argentina"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "South America",
        "language": ["Spanish"],
        "languagesCodes": ["es", "gn"],
        "translations": {
          "de": "Argentinien",
          "en": "Argentina",
          "es": "Argentina",
          "fr": "Argentine",
          "it": "Argentina",
          "ja": "\u30a2\u30eb\u30bc\u30f3\u30c1\u30f3",
          "nl": "Argentini\u00eb"
        },
        "population": 40117096,
        "latlng": [-34, -64],
        "demonym": "Argentinean",
        "borders": ["BOL", "BRA", "CHL", "PRY", "URY"]
      },
      {
        "name": "Armenia",
        "nativeName": "\u0540\u0561\u0575\u0561\u057d\u057f\u0561\u0576",
        "tld": [".am"],
        "cca2": "AM",
        "ccn3": "051",
        "cca3": "ARM",
        "currency": ["AMD"],
        "callingCode": ["374"],
        "capital": "Yerevan",
        "altSpellings": ["AM", "Hayastan", "Republic of Armenia", "\u0540\u0561\u0575\u0561\u057d\u057f\u0561\u0576\u056b \u0540\u0561\u0576\u0580\u0561\u057a\u0565\u057f\u0578\u0582\u0569\u0575\u0578\u0582\u0576"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Western Asia",
        "language": ["Armenian"],
        "languagesCodes": ["hy", "ru"],
        "translations": {
          "de": "Armenien",
          "en": "Armenia",
          "es": "Armenia",
          "fr": "Arm\u00e9nie",
          "it": "Armenia",
          "ja": "\u30a2\u30eb\u30e1\u30cb\u30a2",
          "nl": "Armeni\u00eb"
        },
        "population": 3024100,
        "latlng": [40, 45],
        "demonym": "Armenian",
        "borders": ["AZE", "GEO", "IRN", "TUR"]
      },
      {
        "name": "Aruba",
        "nativeName": "Aruba",
        "tld": [".aw"],
        "cca2": "AW",
        "ccn3": "533",
        "cca3": "ABW",
        "currency": ["AWG"],
        "callingCode": ["297"],
        "capital": "Oranjestad",
        "altSpellings": ["AW"],
        "relevance": "0.5",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["Dutch", "Papiamento"],
        "languagesCodes": ["nl"],
        "translations": {
          "de": "Aruba",
          "en": "Aruba",
          "es": "Aruba",
          "fr": "Aruba",
          "it": "Aruba",
          "ja": "\u30a2\u30eb\u30d0",
          "nl": "Aruba"
        },
        "population": 101484,
        "latlng": [12.5, -69.96666666],
        "demonym": "Aruban",
        "borders": []
      },
      {
        "name": "Australia",
        "nativeName": "Australia",
        "tld": [".au"],
        "cca2": "AU",
        "ccn3": "036",
        "cca3": "AUS",
        "currency": ["AUD"],
        "callingCode": ["61"],
        "capital": "Canberra",
        "altSpellings": ["AU"],
        "relevance": "1.5",
        "region": "Oceania",
        "subregion": "Australia and New Zealand",
        "language": ["English"],
        "languagesCodes": [],
        "translations": {
          "de": "Australien",
          "en": "Australia",
          "es": "Australia",
          "fr": "Australie",
          "it": "Australia",
          "ja": "\u30aa\u30fc\u30b9\u30c8\u30e9\u30ea\u30a2",
          "nl": "Australi\u00eb"
        },
        "population": 23254142,
        "latlng": [-27, 133],
        "demonym": "Australian",
        "borders": []
      },
      {
        "name": "Austria",
        "nativeName": "\u00d6sterreich",
        "tld": [".at"],
        "cca2": "AT",
        "ccn3": "040",
        "cca3": "AUT",
        "currency": ["EUR"],
        "callingCode": ["43"],
        "capital": "Vienna",
        "altSpellings": ["AT", "\u00d6sterreich", "Osterreich", "Oesterreich"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Western Europe",
        "language": ["German"],
        "languagesCodes": ["de"],
        "translations": {
          "de": "\u00d6sterreich",
          "en": "Austria",
          "es": "Austria",
          "fr": "Autriche",
          "it": "Austria",
          "ja": "\u30aa\u30fc\u30b9\u30c8\u30ea\u30a2",
          "nl": "Oostenrijk"
        },
        "population": 8501502,
        "latlng": [47.33333333, 13.33333333],
        "demonym": "Austrian",
        "borders": ["CZE", "DEU", "HUN", "ITA", "LIE", "SVK", "SVN", "CHE"]
      },
      {
        "name": "Azerbaijan",
        "nativeName": "Az\u0259rbaycan",
        "tld": [".az"],
        "cca2": "AZ",
        "ccn3": "031",
        "cca3": "AZE",
        "currency": ["AZN"],
        "callingCode": ["994"],
        "capital": "Baku",
        "altSpellings": ["AZ", "Republic of Azerbaijan", "Az\u0259rbaycan Respublikas\u0131"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Western Asia",
        "language": ["Azerbaijani"],
        "languagesCodes": ["az", "hy"],
        "translations": {
          "de": "Aserbaidschan",
          "en": "Azerbaijan",
          "es": "Azerbaiy\u00e1n",
          "fr": "Azerba\u00efdjan",
          "it": "Azerbaijan",
          "ja": "\u30a2\u30bc\u30eb\u30d0\u30a4\u30b8\u30e3\u30f3",
          "nl": "Azerbeidzjan"
        },
        "population": 9235100,
        "latlng": [40.5, 47.5],
        "demonym": "Azerbaijani",
        "borders": ["ARM", "GEO", "IRN", "RUS", "TUR"]
      },
      {
        "name": "Bahamas",
        "nativeName": "Bahamas",
        "tld": [".bs"],
        "cca2": "BS",
        "ccn3": "044",
        "cca3": "BHS",
        "currency": ["BSD"],
        "callingCode": ["1242"],
        "capital": "Nassau",
        "altSpellings": ["BS", "Commonwealth of the Bahamas"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Bahamas",
          "en": "Bahamas",
          "es": "Bahamas",
          "fr": "Bahamas",
          "it": "Bahamas",
          "ja": "\u30d0\u30cf\u30de",
          "nl": "Bahama\u2019s"
        },
        "population": -1,
        "latlng": [24.25, -76],
        "demonym": "Bahamian",
        "borders": []
      },
      {
        "name": "Bahrain",
        "nativeName": "al-Ba\u1e25rayn",
        "tld": [".bh"],
        "cca2": "BH",
        "ccn3": "048",
        "cca3": "BHR",
        "currency": ["BHD"],
        "callingCode": ["973"],
        "capital": "Manama",
        "altSpellings": ["BH", "Kingdom of Bahrain", "Mamlakat al-Ba\u1e25rayn"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Western Asia",
        "language": ["Arabic"],
        "languagesCodes": ["ar"],
        "translations": {
          "de": "Bahrain",
          "en": "Bahrain",
          "es": "Bahrein",
          "fr": "Bahre\u00efn",
          "it": "Bahrein",
          "ja": "\u30d0\u30fc\u30ec\u30fc\u30f3",
          "nl": "Bahrein"
        },
        "population": 1234571,
        "latlng": [26, 50.55],
        "demonym": "Bahraini",
        "borders": []
      },
      {
        "name": "Bangladesh",
        "nativeName": "Bangladesh",
        "tld": [".bd"],
        "cca2": "BD",
        "ccn3": "050",
        "cca3": "BGD",
        "currency": ["BDT"],
        "callingCode": ["880"],
        "capital": "Dhaka",
        "altSpellings": ["BD", "People's Republic of Bangladesh", "G\u00f4n\u00f4pr\u00f4jat\u00f4ntri Bangladesh"],
        "relevance": "2",
        "region": "Asia",
        "subregion": "Southern Asia",
        "language": ["Bangla"],
        "languagesCodes": ["bn"],
        "translations": {
          "de": "Bangladesch",
          "en": "Bangladesh",
          "es": "Bangladesh",
          "fr": "Bangladesh",
          "it": "Bangladesh",
          "ja": "\u30d0\u30f3\u30b0\u30e9\u30c7\u30b7\u30e5",
          "nl": "Bangladesh"
        },
        "population": 152518015,
        "latlng": [24, 90],
        "demonym": "Bangladeshi",
        "borders": ["MMR", "IND"]
      },
      {
        "name": "Barbados",
        "nativeName": "Barbados",
        "tld": [".bb"],
        "cca2": "BB",
        "ccn3": "052",
        "cca3": "BRB",
        "currency": ["BBD"],
        "callingCode": ["1246"],
        "capital": "Bridgetown",
        "altSpellings": ["BB"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Barbados",
          "en": "Barbade",
          "es": "Barbados",
          "fr": "Barbade",
          "it": "Barbados",
          "ja": "\u30d0\u30eb\u30d0\u30c9\u30b9",
          "nl": "Barbados"
        },
        "population": 274200,
        "latlng": [13.16666666, -59.53333333],
        "demonym": "Barbadian",
        "borders": []
      },
      {
        "name": "Belarus",
        "nativeName": "\u0411\u0435\u043b\u0430\u0440\u0443\u0301\u0441\u044c",
        "tld": [".by"],
        "cca2": "BY",
        "ccn3": "112",
        "cca3": "BLR",
        "currency": ["BYR"],
        "callingCode": ["375"],
        "capital": "Minsk",
        "altSpellings": ["BY", "Bielaru\u015b", "Republic of Belarus", "\u0411\u0435\u043b\u043e\u0440\u0443\u0441\u0441\u0438\u044f", "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u0435\u043b\u0430\u0440\u0443\u0441\u044c", "Belorussiya", "Respublika Belarus\u2019"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Eastern Europe",
        "language": ["Belarusian", "Russian"],
        "languagesCodes": ["be", "ru"],
        "translations": {
          "de": "Wei\u00dfrussland",
          "en": "Belarus",
          "es": "Bielorrusia",
          "fr": "Bi\u00e9lorussie",
          "it": "Bielorussia",
          "ja": "\u30d9\u30e9\u30eb\u30fc\u30b7",
          "nl": "Wit-Rusland"
        },
        "population": 9465500,
        "latlng": [53, 28],
        "demonym": "Belarusian",
        "borders": ["LVA", "LTU", "POL", "RUS", "UKR"]
      },
      {
        "name": "Belgium",
        "nativeName": "Belgi\u00eb",
        "tld": [".be"],
        "cca2": "BE",
        "ccn3": "056",
        "cca3": "BEL",
        "currency": ["EUR"],
        "callingCode": ["32"],
        "capital": "Brussels",
        "altSpellings": ["BE", "Belgi\u00eb", "Belgie", "Belgien", "Belgique", "Kingdom of Belgium", "Koninkrijk Belgi\u00eb", "Royaume de Belgique", "K\u00f6nigreich Belgien"],
        "relevance": "1.5",
        "region": "Europe",
        "subregion": "Western Europe",
        "language": ["Dutch", "French", "German"],
        "languagesCodes": ["nl", "fr", "de"],
        "translations": {
          "de": "Belgien",
          "en": "Belgium",
          "es": "B\u00e9lgica",
          "fr": "Belgique",
          "it": "Belgio",
          "ja": "\u30d9\u30eb\u30ae\u30fc",
          "nl": "Belgi\u00eb"
        },
        "population": 11175653,
        "latlng": [50.83333333, 4],
        "demonym": "Belgian",
        "borders": ["FRA", "DEU", "LUX", "NLD"]
      },
      {
        "name": "Belize",
        "nativeName": "Belize",
        "tld": [".bz"],
        "cca2": "BZ",
        "ccn3": "084",
        "cca3": "BLZ",
        "currency": ["BZD"],
        "callingCode": ["501"],
        "capital": "Belmopan",
        "altSpellings": ["BZ"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Central America",
        "language": ["English"],
        "languagesCodes": ["en", "es"],
        "translations": {
          "de": "Belize",
          "en": "Belize",
          "es": "Belice",
          "fr": "Belize",
          "it": "Belize",
          "ja": "\u30d9\u30ea\u30fc\u30ba",
          "nl": "Belize"
        },
        "population": 312971,
        "latlng": [17.25, -88.75],
        "demonym": "Belizean",
        "borders": ["GTM", "MEX"]
      },
      {
        "name": "Benin",
        "nativeName": "B\u00e9nin",
        "tld": [".bj"],
        "cca2": "BJ",
        "ccn3": "204",
        "cca3": "BEN",
        "currency": ["XOF"],
        "callingCode": ["229"],
        "capital": "Porto-Novo",
        "altSpellings": ["BJ", "Republic of Benin", "R\u00e9publique du B\u00e9nin"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Western Africa",
        "language": ["French"],
        "languagesCodes": ["fr"],
        "translations": {
          "de": "Benin",
          "en": "Benin",
          "es": "Ben\u00edn",
          "fr": "B\u00e9nin",
          "it": "Benin",
          "ja": "\u30d9\u30ca\u30f3",
          "nl": "Benin"
        },
        "population": 10323000,
        "latlng": [9.5, 2.25],
        "demonym": "Beninese",
        "borders": ["BFA", "NER", "NGA", "TGO"]
      },
      {
        "name": "Bermuda",
        "nativeName": "Bermuda",
        "tld": [".bm"],
        "cca2": "BM",
        "ccn3": "060",
        "cca3": "BMU",
        "currency": ["BMD"],
        "callingCode": ["1441"],
        "capital": "Hamilton",
        "altSpellings": ["BM", "The Islands of Bermuda", "The Bermudas", "Somers Isles"],
        "relevance": "0.5",
        "region": "Americas",
        "subregion": "Northern America",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Bermuda",
          "en": "Bermuda",
          "es": "Bermudas",
          "fr": "Bermudes",
          "it": "Bermuda",
          "ja": "\u30d0\u30df\u30e5\u30fc\u30c0",
          "nl": "Bermuda"
        },
        "population": 64237,
        "latlng": [32.33333333, -64.75],
        "demonym": "Bermudian",
        "borders": []
      },
      {
        "name": "Bhutan",
        "nativeName": "\u02bcbrug-yul",
        "tld": [".bt"],
        "cca2": "BT",
        "ccn3": "064",
        "cca3": "BTN",
        "currency": ["BTN", "INR"],
        "callingCode": ["975"],
        "capital": "Thimphu",
        "altSpellings": ["BT", "Kingdom of Bhutan"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Southern Asia",
        "language": ["Dzongkha"],
        "languagesCodes": ["dz"],
        "translations": {
          "de": "Bhutan",
          "en": "Bhutan",
          "es": "But\u00e1n",
          "fr": "Bhoutan",
          "it": "Bhutan",
          "ja": "\u30d6\u30fc\u30bf\u30f3",
          "nl": "Bhutan"
        },
        "population": 740990,
        "latlng": [27.5, 90.5],
        "demonym": "Bhutanese",
        "borders": ["CHN", "IND"]
      },
      {
        "name": "Bolivia",
        "nativeName": "Bolivia",
        "tld": [".bo"],
        "cca2": "BO",
        "ccn3": "068",
        "cca3": "BOL",
        "currency": ["BOB", "BOV"],
        "callingCode": ["591"],
        "capital": "Sucre",
        "altSpellings": ["BO", "Buliwya", "Wuliwya", "Plurinational State of Bolivia", "Estado Plurinacional de Bolivia", "Buliwya Mamallaqta", "Wuliwya Suyu", "Tet\u00e3 Vol\u00edvia"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "South America",
        "language": ["Spanish", "Quechua", "Aymara", "Guaran\u00ed"],
        "languagesCodes": ["es", "ay", "qu"],
        "translations": {
          "de": "Bolivien",
          "en": "Bolivia",
          "es": "Bolivia",
          "fr": "Bolivie",
          "it": "Bolivia",
          "ja": "\u30dc\u30ea\u30d3\u30a2\u591a\u6c11\u65cf\u56fd",
          "nl": "Bolivia"
        },
        "population": 10027254,
        "latlng": [-17, -65],
        "demonym": "Bolivian",
        "borders": ["ARG", "BRA", "CHL", "PRY", "PRU"]
      },
      {
        "name": "Bonaire",
        "nativeName": "Bonaire",
        "tld": [".an", ".nl"],
        "cca2": "BQ",
        "ccn3": "535",
        "cca3": "BES",
        "currency": ["USD"],
        "callingCode": ["5997"],
        "capital": "Kralendijk",
        "altSpellings": ["BQ", "Boneiru"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["Dutch"],
        "languagesCodes": [],
        "translations": {},
        "population": -1,
        "latlng": [12.15, -68.266667],
        "demonym": "Dutch",
        "borders": []
      },
      {
        "name": "Bosnia and Herzegovina",
        "nativeName": "Bosna i Hercegovina",
        "tld": [".ba"],
        "cca2": "BA",
        "ccn3": "070",
        "cca3": "BIH",
        "currency": ["BAM"],
        "callingCode": ["387"],
        "capital": "Sarajevo",
        "altSpellings": ["BA", "Bosnia-Herzegovina", "\u0411\u043e\u0441\u043d\u0430 \u0438 \u0425\u0435\u0440\u0446\u0435\u0433\u043e\u0432\u0438\u043d\u0430"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Southern Europe",
        "language": ["Bosnian", "Croatian", "Serbian"],
        "languagesCodes": ["bs", "hr", "sr"],
        "translations": {
          "de": "Bosnien und Herzegowina",
          "en": "Bosnia and Herzegovina",
          "es": "Bosnia y Herzegovina",
          "fr": "Bosnie-Herz\u00e9govine",
          "it": "Bosnia ed Erzegovina",
          "ja": "\u30dc\u30b9\u30cb\u30a2\u30fb\u30d8\u30eb\u30c4\u30a7\u30b4\u30d3\u30ca",
          "nl": "Bosni\u00eb en Herzegovina"
        },
        "population": 3791622,
        "latlng": [44, 18],
        "demonym": "Bosnian, Herzegovinian",
        "borders": ["HRV", "MNE", "SRB"]
      },
      {
        "name": "Botswana",
        "nativeName": "Botswana",
        "tld": [".bw"],
        "cca2": "BW",
        "ccn3": "072",
        "cca3": "BWA",
        "currency": ["BWP"],
        "callingCode": ["267"],
        "capital": "Gaborone",
        "altSpellings": ["BW", "Republic of Botswana", "Lefatshe la Botswana"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Southern Africa",
        "language": ["English", "Setswana"],
        "languagesCodes": ["en", "tn"],
        "translations": {
          "de": "Botswana",
          "en": "Botswana",
          "es": "Botswana",
          "fr": "Botswana",
          "it": "Botswana",
          "ja": "\u30dc\u30c4\u30ef\u30ca",
          "nl": "Botswana"
        },
        "population": 2024904,
        "latlng": [-22, 24],
        "demonym": "Motswana",
        "borders": ["NAM", "ZAF", "ZMB", "ZWE"]
      },
      {
        "name": "Bouvet Island",
        "nativeName": "Bouvet\u00f8ya",
        "tld": [".bv"],
        "cca2": "BV",
        "ccn3": "074",
        "cca3": "BVT",
        "currency": ["NOK"],
        "callingCode": [""],
        "capital": "",
        "altSpellings": ["BV", "Bouvet\u00f8ya", "Bouvet-\u00f8ya"],
        "relevance": "0",
        "region": "",
        "subregion": "",
        "language": [""],
        "languagesCodes": [],
        "translations": {
          "de": "Bouvetinsel",
          "en": "Bouvet Island",
          "es": "Isla Bouvet",
          "fr": "\u00cele Bouvet",
          "it": "Isola Bouvet",
          "ja": "\u30d6\u30fc\u30d9\u5cf6",
          "nl": "Bouveteiland"
        },
        "population": -1,
        "latlng": [-54.43333333, 3.4],
        "demonym": "",
        "borders": []
      },
      {
        "name": "Brazil",
        "nativeName": "Brasil",
        "tld": [".br"],
        "cca2": "BR",
        "ccn3": "076",
        "cca3": "BRA",
        "currency": ["BRL"],
        "callingCode": ["55"],
        "capital": "Bras\u00edlia",
        "altSpellings": ["BR", "Brasil", "Federative Republic of Brazil", "Rep\u00fablica Federativa do Brasil"],
        "relevance": "2",
        "region": "Americas",
        "subregion": "South America",
        "language": ["Portuguese"],
        "languagesCodes": ["pt"],
        "translations": {
          "de": "Brasilien",
          "en": "Brazil",
          "es": "Brasil",
          "fr": "Br\u00e9sil",
          "it": "Brasile",
          "ja": "\u30d6\u30e9\u30b8\u30eb",
          "nl": "Brazili\u00eb"
        },
        "population": 201032714,
        "latlng": [-10, -55],
        "demonym": "Brazilian",
        "borders": ["ARG", "BOL", "COL", "GUF", "GUY", "PRY", "PER", "SUR", "URY", "VEN"]
      },
      {
        "name": "British Indian Ocean Territory",
        "nativeName": "British Indian Ocean Territory",
        "tld": [".io"],
        "cca2": "IO",
        "ccn3": "086",
        "cca3": "IOT",
        "currency": ["USD"],
        "callingCode": ["246"],
        "capital": "Diego Garcia",
        "altSpellings": ["IO"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Eastern Africa",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Britisches Territorium im Indischen Ozean",
          "en": "British Indian Ocean Territory",
          "es": "Territorio Brit\u00e1nico del Oc\u00e9ano \u00cdndico",
          "fr": "Territoire britannique de l'oc\u00e9an Indien",
          "it": "Territorio britannico dell'oceano indiano",
          "ja": "\u30a4\u30ae\u30ea\u30b9\u9818\u30a4\u30f3\u30c9\u6d0b\u5730\u57df",
          "nl": "Britse Gebieden in de Indische Oceaan"
        },
        "population": -1,
        "latlng": [-6, 71.5],
        "demonym": "Indian",
        "borders": []
      },
      {
        "name": "British Virgin Islands",
        "nativeName": "British Virgin Islands",
        "tld": [".vg"],
        "cca2": "VG",
        "ccn3": "092",
        "cca3": "VGB",
        "currency": ["USD"],
        "callingCode": ["1284"],
        "capital": "Road Town",
        "altSpellings": ["VG"],
        "relevance": "0.5",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Britische Jungferninseln",
          "en": "British Virgin Islands",
          "es": "Islas V\u00edrgenes del Reino Unido",
          "fr": "\u00celes Vierges britanniques",
          "it": "Isole Vergini Britanniche",
          "ja": "\u30a4\u30ae\u30ea\u30b9\u9818\u30f4\u30a1\u30fc\u30b8\u30f3\u8af8\u5cf6",
          "nl": "Britse Maagdeneilanden"
        },
        "population": 29537,
        "latlng": [18.431383, -64.62305],
        "demonym": "Virgin Islander",
        "borders": []
      },
      {
        "name": "Brunei",
        "nativeName": "Negara Brunei Darussalam",
        "tld": [".bn"],
        "cca2": "BN",
        "ccn3": "096",
        "cca3": "BRN",
        "currency": ["BND"],
        "callingCode": ["673"],
        "capital": "Bandar Seri Begawan",
        "altSpellings": ["BN", "Nation of Brunei", " the Abode of Peace"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "South-Eastern Asia",
        "language": ["Malay"],
        "languagesCodes": ["ms"],
        "translations": {},
        "population": 393162,
        "latlng": [4.5, 114.66666666],
        "demonym": "Bruneian",
        "borders": ["MYS"]
      },
      {
        "name": "Bulgaria",
        "nativeName": "\u0411\u044a\u043b\u0433\u0430\u0440\u0438\u044f",
        "tld": [".bg"],
        "cca2": "BG",
        "ccn3": "100",
        "cca3": "BGR",
        "currency": ["BGN"],
        "callingCode": ["359"],
        "capital": "Sofia",
        "altSpellings": ["BG", "Republic of Bulgaria", "\u0420\u0435\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0411\u044a\u043b\u0433\u0430\u0440\u0438\u044f"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Eastern Europe",
        "language": ["Bulgarian"],
        "languagesCodes": ["bg"],
        "translations": {
          "de": "Bulgarien",
          "en": "Bulgaria",
          "es": "Bulgaria",
          "fr": "Bulgarie",
          "it": "Bulgaria",
          "ja": "\u30d6\u30eb\u30ac\u30ea\u30a2",
          "nl": "Bulgarije"
        },
        "population": 7282041,
        "latlng": [43, 25],
        "demonym": "Bulgarian",
        "borders": ["GRC", "MKD", "ROU", "SRB", "TUR"]
      },
      {
        "name": "Burkina Faso",
        "nativeName": "Burkina Faso",
        "tld": [".bf"],
        "cca2": "BF",
        "ccn3": "854",
        "cca3": "BFA",
        "currency": ["XOF"],
        "callingCode": ["226"],
        "capital": "Ouagadougou",
        "altSpellings": ["BF"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Western Africa",
        "language": ["French"],
        "languagesCodes": ["fr", "ff"],
        "translations": {
          "de": "Burkina Faso",
          "en": "Burkina Faso",
          "es": "Burkina Faso",
          "fr": "Burkina Faso",
          "it": "Burkina Faso",
          "ja": "\u30d6\u30eb\u30ad\u30ca\u30d5\u30a1\u30bd",
          "nl": "Burkina Faso"
        },
        "population": 17322796,
        "latlng": [13, -2],
        "demonym": "Burkinabe",
        "borders": ["BEN", "CIV", "GHA", "MLI", "NER", "TGO"]
      },
      {
        "name": "Burundi",
        "nativeName": "Burundi",
        "tld": [".bi"],
        "cca2": "BI",
        "ccn3": "108",
        "cca3": "BDI",
        "currency": ["BIF"],
        "callingCode": ["257"],
        "capital": "Bujumbura",
        "altSpellings": ["BI", "Republic of Burundi", "Republika y'Uburundi", "R\u00e9publique du Burundi"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Eastern Africa",
        "language": ["Kirundi", "French"],
        "languagesCodes": ["fr", "rn"],
        "translations": {
          "de": "Burundi",
          "en": "Burundi",
          "es": "Burundi",
          "fr": "Burundi",
          "it": "Burundi",
          "ja": "\u30d6\u30eb\u30f3\u30b8",
          "nl": "Burundi"
        },
        "population": 10163000,
        "latlng": [-3.5, 30],
        "demonym": "Burundian",
        "borders": ["COD", "RWA", "TZA"]
      },
      {
        "name": "Cambodia",
        "nativeName": "K\u00e2mp\u016dch\u00e9a",
        "tld": [".kh"],
        "cca2": "KH",
        "ccn3": "116",
        "cca3": "KHM",
        "currency": ["KHR"],
        "callingCode": ["855"],
        "capital": "Phnom Penh",
        "altSpellings": ["KH", "Kingdom of Cambodia"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "South-Eastern Asia",
        "language": ["Khmer"],
        "languagesCodes": [],
        "translations": {},
        "population": 15135000,
        "latlng": [13, 105],
        "demonym": "Cambodian",
        "borders": ["LAO", "THA", "VNM"]
      },
      {
        "name": "Cameroon",
        "nativeName": "Cameroon",
        "tld": [".cm"],
        "cca2": "CM",
        "ccn3": "120",
        "cca3": "CMR",
        "currency": ["XAF"],
        "callingCode": ["237"],
        "capital": "Yaound\u00e9",
        "altSpellings": ["CM", "Republic of Cameroon", "R\u00e9publique du Cameroun"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Middle Africa",
        "language": ["French", "English"],
        "languagesCodes": ["en", "fr"],
        "translations": {
          "de": "Kamerun",
          "en": "Cameroon",
          "es": "Camer\u00fan",
          "fr": "Cameroun",
          "it": "Camerun",
          "ja": "\u30ab\u30e1\u30eb\u30fc\u30f3",
          "nl": "Kameroen"
        },
        "population": 20386799,
        "latlng": [6, 12],
        "demonym": "Cameroonian",
        "borders": ["CAF", "TCD", "COG", "GNQ", "GAB", "NGA"]
      },
      {
        "name": "Canada",
        "nativeName": "Canada",
        "tld": [".ca"],
        "cca2": "CA",
        "ccn3": "124",
        "cca3": "CAN",
        "currency": ["CAD"],
        "callingCode": ["1"],
        "capital": "Ottawa",
        "altSpellings": ["CA"],
        "relevance": "2",
        "region": "Americas",
        "subregion": "Northern America",
        "language": ["English", "French"],
        "languagesCodes": ["en", "fr"],
        "translations": {
          "de": "Kanada",
          "en": "Canada",
          "es": "Canad\u00e1",
          "fr": "Canada",
          "it": "Canada",
          "ja": "\u30ab\u30ca\u30c0",
          "nl": "Canada"
        },
        "population": 35158304,
        "latlng": [60, -95],
        "demonym": "Canadian",
        "borders": ["USA"]
      },
      {
        "name": "Cape Verde",
        "nativeName": "Cabo Verde",
        "tld": [".cv"],
        "cca2": "CV",
        "ccn3": "132",
        "cca3": "CPV",
        "currency": ["CVE"],
        "callingCode": ["238"],
        "capital": "Praia",
        "altSpellings": ["CV", "Republic of Cabo Verde", "Rep\u00fablica de Cabo Verde"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Western Africa",
        "language": ["Portuguese"],
        "languagesCodes": ["pt"],
        "translations": {
          "de": "Kap Verde",
          "en": "Cape Verde",
          "es": "Cabo Verde",
          "fr": "Cap Vert",
          "it": "Capo Verde",
          "ja": "\u30ab\u30fc\u30dc\u30d9\u30eb\u30c7",
          "nl": "Kaapverdi\u00eb"
        },
        "population": 491875,
        "latlng": [16, -24],
        "demonym": "Cape Verdian",
        "borders": []
      },
      {
        "name": "Cayman Islands",
        "nativeName": "Cayman Islands",
        "tld": [".ky"],
        "cca2": "KY",
        "ccn3": "136",
        "cca3": "CYM",
        "currency": ["KYD"],
        "callingCode": ["1345"],
        "capital": "George Town",
        "altSpellings": ["KY"],
        "relevance": "0.5",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Kaimaninseln",
          "en": "Cayman Islands",
          "es": "Islas Caim\u00e1n",
          "fr": "\u00celes Ca\u00efmans",
          "it": "Isole Cayman",
          "ja": "\u30b1\u30a4\u30de\u30f3\u8af8\u5cf6",
          "nl": "Caymaneilanden"
        },
        "population": 55456,
        "latlng": [19.5, -80.5],
        "demonym": "Caymanian",
        "borders": []
      },
      {
        "name": "Central African Republic",
        "nativeName": "K\u00f6d\u00f6r\u00f6s\u00ease t\u00ee B\u00eaafr\u00eeka",
        "tld": [".cf"],
        "cca2": "CF",
        "ccn3": "140",
        "cca3": "CAF",
        "currency": ["XAF"],
        "callingCode": ["236"],
        "capital": "Bangui",
        "altSpellings": ["CF", "Central African Republic", "R\u00e9publique centrafricaine"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Middle Africa",
        "language": ["Sango", "French"],
        "languagesCodes": ["fr", "sg"],
        "translations": {
          "de": "Zentralafrikanische Republik",
          "en": "Central African Republic",
          "es": "Rep\u00fablica Centroafricana",
          "fr": "R\u00e9publique centrafricaine",
          "it": "Repubblica Centrafricana",
          "ja": "\u4e2d\u592e\u30a2\u30d5\u30ea\u30ab\u5171\u548c\u56fd",
          "nl": "Centraal-Afrikaanse Republiek"
        },
        "population": 4616000,
        "latlng": [7, 21],
        "demonym": "Central African",
        "borders": ["CMR", "TCD", "COD", "COG", "SSD", "SDN"]
      },
      {
        "name": "Chad",
        "nativeName": "Tchad",
        "tld": [".td"],
        "cca2": "TD",
        "ccn3": "148",
        "cca3": "TCD",
        "currency": ["XAF"],
        "callingCode": ["235"],
        "capital": "N'Djamena",
        "altSpellings": ["TD", "Tchad", "Republic of Chad", "R\u00e9publique du Tchad"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Middle Africa",
        "language": ["French", "Arabic"],
        "languagesCodes": ["ar", "fr"],
        "translations": {
          "de": "Tschad",
          "en": "Chad",
          "es": "chad",
          "fr": "Tchad",
          "it": "Ciad",
          "ja": "\u30c1\u30e3\u30c9",
          "nl": "Tsjaad"
        },
        "population": 12825000,
        "latlng": [15, 19],
        "demonym": "Chadian",
        "borders": ["CMR", "CAF", "LBY", "NER", "NGA", "SSD"]
      },
      {
        "name": "Chile",
        "nativeName": "Chile",
        "tld": [".cl"],
        "cca2": "CL",
        "ccn3": "152",
        "cca3": "CHL",
        "currency": ["CLF", "CLP"],
        "callingCode": ["56"],
        "capital": "Santiago",
        "altSpellings": ["CL", "Republic of Chile", "Rep\u00fablica de Chile"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "South America",
        "language": ["Spanish"],
        "languagesCodes": ["es"],
        "translations": {
          "de": "Chile",
          "en": "Chile",
          "es": "Chile",
          "fr": "Chili",
          "it": "Cile",
          "ja": "\u30c1\u30ea",
          "nl": "Chili"
        },
        "population": 16634603,
        "latlng": [-30, -71],
        "demonym": "Chilean",
        "borders": ["ARG", "BOL", "PER"]
      },
      {
        "name": "China",
        "nativeName": "\u4e2d\u56fd",
        "tld": [".cn"],
        "cca2": "CN",
        "ccn3": "156",
        "cca3": "CHN",
        "currency": ["CNY"],
        "callingCode": ["86"],
        "capital": "Beijing",
        "altSpellings": ["CN", "Zh\u014dnggu\u00f3", "Zhongguo", "Zhonghua", "People's Republic of China", "\u4e2d\u534e\u4eba\u6c11\u5171\u548c\u56fd", "Zh\u014dnghu\u00e1 R\u00e9nm\u00edn G\u00f2ngh\u00e9gu\u00f3"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Eastern Asia",
        "language": ["Standard Chinese"],
        "languagesCodes": ["zh"],
        "translations": {
          "de": "China",
          "en": "China",
          "es": "China",
          "fr": "Chine",
          "it": "Cina",
          "ja": "\u4e2d\u56fd",
          "nl": "China"
        },
        "population": 1361170000,
        "latlng": [35, 105],
        "demonym": "Chinese",
        "borders": ["AFG", "BTN", "MMR", "HKG", "IND", "KAZ", "PRK", "KGZ", "LAO", "MAC", "MNG", "PAK", "RUS", "TJK", "VNM"]
      },
      {
        "name": "Christmas Island",
        "nativeName": "Christmas Island",
        "tld": [".cx"],
        "cca2": "CX",
        "ccn3": "162",
        "cca3": "CXR",
        "currency": ["AUD"],
        "callingCode": ["61"],
        "capital": "Flying Fish Cove",
        "altSpellings": ["CX", "Territory of Christmas Island"],
        "relevance": "0.5",
        "region": "Oceania",
        "subregion": "Australia and New Zealand",
        "language": ["English"],
        "languagesCodes": [],
        "translations": {},
        "population": 2072,
        "latlng": [-10.5, 105.66666666],
        "demonym": "Christmas Island",
        "borders": []
      },
      {
        "name": "Cocos (Keeling) Islands",
        "nativeName": "Cocos (Keeling) Islands",
        "tld": [".cc"],
        "cca2": "CC",
        "ccn3": "166",
        "cca3": "CCK",
        "currency": ["AUD"],
        "callingCode": ["61"],
        "capital": "West Island",
        "altSpellings": ["CC", "Territory of the Cocos (Keeling) Islands", "Keeling Islands"],
        "relevance": "0",
        "region": "Oceania",
        "subregion": "Australia and New Zealand",
        "language": ["English"],
        "languagesCodes": [],
        "translations": {},
        "population": 550,
        "latlng": [-12.5, 96.83333333],
        "demonym": "Cocos Islander",
        "borders": []
      },
      {
        "name": "Colombia",
        "nativeName": "Colombia",
        "tld": [".co"],
        "cca2": "CO",
        "ccn3": "170",
        "cca3": "COL",
        "currency": ["COP"],
        "callingCode": ["57"],
        "capital": "Bogot\u00e1",
        "altSpellings": ["CO", "Republic of Colombia", "Rep\u00fablica de Colombia"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "South America",
        "language": ["Spanish"],
        "languagesCodes": ["es"],
        "translations": {
          "de": "Kolumbien",
          "en": "Colombia",
          "es": "Colombia",
          "fr": "Colombie",
          "it": "Colombia",
          "ja": "\u30b3\u30ed\u30f3\u30d3\u30a2",
          "nl": "Colombia"
        },
        "population": 47330000,
        "latlng": [4, -72],
        "demonym": "Colombian",
        "borders": ["BRA", "ECU", "PAN", "PER", "VEN"]
      },
      {
        "name": "Comoros",
        "nativeName": "Komori",
        "tld": [".km"],
        "cca2": "KM",
        "ccn3": "174",
        "cca3": "COM",
        "currency": ["KMF"],
        "callingCode": ["269"],
        "capital": "Moroni",
        "altSpellings": ["KM", "Union of the Comoros", "Union des Comores", "Udzima wa Komori", "al-Itti\u1e25\u0101d al-Qumur\u012b"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Eastern Africa",
        "language": ["Comorian", "Arabic", "French"],
        "languagesCodes": ["ar", "fr"],
        "translations": {
          "de": "Union der Komoren",
          "en": "Comoros",
          "es": "Comoras",
          "fr": "Comores",
          "it": "Comore",
          "ja": "\u30b3\u30e2\u30ed",
          "nl": "Comoren"
        },
        "population": 724300,
        "latlng": [-12.16666666, 44.25],
        "demonym": "Comoran",
        "borders": []
      },
      {
        "name": "Republic of the Congo",
        "nativeName": "R\u00e9publique du Congo",
        "tld": [".cg"],
        "cca2": "CG",
        "ccn3": "178",
        "cca3": "COG",
        "currency": ["XAF"],
        "callingCode": ["242"],
        "capital": "Brazzaville",
        "altSpellings": ["CG", "Congo-Brazzaville"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Middle Africa",
        "language": ["French"],
        "languagesCodes": ["fr", "ln"],
        "translations": {
          "de": "Kongo",
          "en": "Congo",
          "es": "Congo",
          "fr": "Congo",
          "it": "Congo",
          "ja": "\u30b3\u30f3\u30b4\u5171\u548c\u56fd",
          "nl": "Congo [Republiek]"
        },
        "population": 4448000,
        "latlng": [-1, 15],
        "demonym": "Congolese",
        "borders": ["AGO", "CMR", "CAF", "COD", "GAB"]
      },
      {
        "name": "Democratic Republic of the Congo",
        "nativeName": "R\u00e9publique d\u00e9mocratique du Congo",
        "tld": [".cd"],
        "cca2": "CD",
        "ccn3": "180",
        "cca3": "COD",
        "currency": ["CDF"],
        "callingCode": ["243"],
        "capital": "Kinshasa",
        "altSpellings": ["CD", "DR Congo", "Congo-Kinshasa", "DRC"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Middle Africa",
        "language": ["French"],
        "languagesCodes": ["fr", "ln", "kg", "sw", "lu"],
        "translations": {
          "de": "Kongo (Dem. Rep.)",
          "en": "Congo (Dem. Rep.)",
          "es": "Congo (Rep. Dem.)",
          "fr": "Congo (R\u00e9p. d\u00e9m.)",
          "it": "Congo (Rep. Dem.)",
          "ja": "\u30b3\u30f3\u30b4\u6c11\u4e3b\u5171\u548c\u56fd",
          "nl": "Congo [DRC]"
        },
        "population": 67514000,
        "latlng": [0, 25],
        "demonym": "Congolese",
        "borders": ["AGO", "BDI", "CAF", "COG", "RWA", "SSD", "TZA", "UGA", "ZMB"]
      },
      {
        "name": "Cook Islands",
        "nativeName": "Cook Islands",
        "tld": [".ck"],
        "cca2": "CK",
        "ccn3": "184",
        "cca3": "COK",
        "currency": ["NZD"],
        "callingCode": ["682"],
        "capital": "Avarua",
        "altSpellings": ["CK", "K\u016bki '\u0100irani"],
        "relevance": "0.5",
        "region": "Oceania",
        "subregion": "Polynesia",
        "language": ["English", "Cook Islands M\u0101ori"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Cookinseln",
          "en": "Cook Islands",
          "es": "Islas Cook",
          "fr": "\u00celes Cook",
          "it": "Isole Cook",
          "ja": "\u30af\u30c3\u30af\u8af8\u5cf6",
          "nl": "Cookeilanden"
        },
        "population": 14974,
        "latlng": [-21.23333333, -159.76666666],
        "demonym": "Cook Islander",
        "borders": []
      },
      {
        "name": "Costa Rica",
        "nativeName": "Costa Rica",
        "tld": [".cr"],
        "cca2": "CR",
        "ccn3": "188",
        "cca3": "CRI",
        "currency": ["CRC"],
        "callingCode": ["506"],
        "capital": "San Jos\u00e9",
        "altSpellings": ["CR", "Republic of Costa Rica", "Rep\u00fablica de Costa Rica"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Central America",
        "language": ["Spanish"],
        "languagesCodes": ["es"],
        "translations": {
          "de": "Costa Rica",
          "en": "Costa Rica",
          "es": "Costa Rica",
          "fr": "Costa Rica",
          "it": "Costa Rica",
          "ja": "\u30b3\u30b9\u30bf\u30ea\u30ab",
          "nl": "Costa Rica"
        },
        "population": 4667096,
        "latlng": [10, -84],
        "demonym": "Costa Rican",
        "borders": ["NIC", "PAN"]
      },
      {
        "name": "C\u00f4te d'Ivoire",
        "nativeName": "C\u00f4te d'Ivoire",
        "tld": [".ci"],
        "cca2": "CI",
        "ccn3": "384",
        "cca3": "CIV",
        "currency": ["XOF"],
        "callingCode": ["225"],
        "capital": "Yamoussoukro",
        "altSpellings": ["CI", "Ivory Coast", "Republic of C\u00f4te d'Ivoire", "R\u00e9publique de C\u00f4te d'Ivoire"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Western Africa",
        "language": ["French"],
        "languagesCodes": ["fr"],
        "translations": {
          "de": "Elfenbeink\u00fcste",
          "en": "C\u00f4te D'Ivoire",
          "es": "Costa de Marfil",
          "fr": "C\u00f4te d'Ivoire",
          "it": "Costa D'Avorio",
          "ja": "\u30b3\u30fc\u30c8\u30b8\u30dc\u30ef\u30fc\u30eb",
          "nl": "Ivoorkust"
        },
        "population": -1,
        "latlng": [8, -5],
        "demonym": "Ivorian",
        "borders": ["BFA", "GHA", "GIN", "LBR", "MLI"]
      },
      {
        "name": "Croatia",
        "nativeName": "Hrvatska",
        "tld": [".hr"],
        "cca2": "HR",
        "ccn3": "191",
        "cca3": "HRV",
        "currency": ["HRK"],
        "callingCode": ["385"],
        "capital": "Zagreb",
        "altSpellings": ["HR", "Hrvatska", "Republic of Croatia", "Republika Hrvatska"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Southern Europe",
        "language": ["Croatian"],
        "languagesCodes": ["hr"],
        "translations": {
          "de": "Kroatien",
          "en": "Croatia",
          "es": "Croacia",
          "fr": "Croatie",
          "it": "Croazia",
          "ja": "\u30af\u30ed\u30a2\u30c1\u30a2",
          "nl": "Kroati\u00eb"
        },
        "population": 4290612,
        "latlng": [45.16666666, 15.5],
        "demonym": "Croatian",
        "borders": ["BIH", "HUN", "MNE", "SRB", "SVN"]
      },
      {
        "name": "Cuba",
        "nativeName": "Cuba",
        "tld": [".cu"],
        "cca2": "CU",
        "ccn3": "192",
        "cca3": "CUB",
        "currency": ["CUC", "CUP"],
        "callingCode": ["53"],
        "capital": "Havana",
        "altSpellings": ["CU", "Republic of Cuba", "Rep\u00fablica de Cuba"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["Spanish"],
        "languagesCodes": ["es"],
        "translations": {
          "de": "Kuba",
          "en": "Cuba",
          "es": "Cuba",
          "fr": "Cuba",
          "it": "Cuba",
          "ja": "\u30ad\u30e5\u30fc\u30d0",
          "nl": "Cuba"
        },
        "population": 11167325,
        "latlng": [21.5, -80],
        "demonym": "Cuban",
        "borders": []
      },
      {
        "name": "Cura\u00e7ao",
        "nativeName": "Cura\u00e7ao",
        "tld": [".cw"],
        "cca2": "CW",
        "ccn3": "531",
        "cca3": "CUW",
        "currency": ["ANG"],
        "callingCode": ["5999"],
        "capital": "Willemstad",
        "altSpellings": ["CW", "Curacao", "K\u00f2rsou", "Country of Cura\u00e7ao", "Land Cura\u00e7ao", "Pais K\u00f2rsou"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["Dutch", "Papiamentu", "English"],
        "languagesCodes": [],
        "translations": {},
        "population": 150563,
        "latlng": [12.116667, -68.933333],
        "demonym": "Dutch",
        "borders": []
      },
      {
        "name": "Cyprus",
        "nativeName": "\u039a\u03cd\u03c0\u03c1\u03bf\u03c2",
        "tld": [".cy"],
        "cca2": "CY",
        "ccn3": "196",
        "cca3": "CYP",
        "currency": ["EUR"],
        "callingCode": ["357"],
        "capital": "Nicosia",
        "altSpellings": ["CY", "K\u00fdpros", "K\u0131br\u0131s", "Republic of Cyprus", "\u039a\u03c5\u03c0\u03c1\u03b9\u03b1\u03ba\u03ae \u0394\u03b7\u03bc\u03bf\u03ba\u03c1\u03b1\u03c4\u03af\u03b1", "K\u0131br\u0131s Cumhuriyeti"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Western Asia",
        "language": ["Greek", "Turkish"],
        "languagesCodes": ["el", "tr", "hy"],
        "translations": {
          "de": "Zypern",
          "en": "Cyprus",
          "es": "Chipre",
          "fr": "Chypre",
          "it": "Cipro",
          "ja": "\u30ad\u30d7\u30ed\u30b9",
          "nl": "Cyprus"
        },
        "population": 865878,
        "latlng": [35, 33],
        "demonym": "Cypriot",
        "borders": [ "GBR" ]
      },
      {
        "name": "Czech Republic",
        "nativeName": "\u010cesk\u00e1 republika",
        "tld": [".cz"],
        "cca2": "CZ",
        "ccn3": "203",
        "cca3": "CZE",
        "currency": ["CZK"],
        "callingCode": ["420"],
        "capital": "Prague",
        "altSpellings": ["CZ", "\u010cesk\u00e1 republika", "\u010cesko"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Eastern Europe",
        "language": ["Czech"],
        "languagesCodes": ["cs", "sk"],
        "translations": {
          "de": "Tschechische Republik",
          "en": "Czech Republic",
          "es": "Rep\u00fablica Checa",
          "fr": "R\u00e9publique tch\u00e8que",
          "it": "Repubblica Ceca",
          "ja": "\u30c1\u30a7\u30b3",
          "nl": "Tsjechi\u00eb"
        },
        "population": 10512900,
        "latlng": [49.75, 15.5],
        "demonym": "Czech",
        "borders": ["AUT", "DEU", "POL", "SVK"]
      },
      {
        "name": "Denmark",
        "nativeName": "Danmark",
        "tld": [".dk"],
        "cca2": "DK",
        "ccn3": "208",
        "cca3": "DNK",
        "currency": ["DKK"],
        "callingCode": ["45"],
        "capital": "Copenhagen",
        "altSpellings": ["DK", "Danmark", "Kingdom of Denmark", "Kongeriget Danmark"],
        "relevance": "1.5",
        "region": "Europe",
        "subregion": "Northern Europe",
        "language": ["Danish"],
        "languagesCodes": ["da"],
        "translations": {
          "de": "D\u00e4nemark",
          "en": "Denmark",
          "es": "Dinamarca",
          "fr": "Danemark",
          "it": "Danimarca",
          "ja": "\u30c7\u30f3\u30de\u30fc\u30af",
          "nl": "Denemarken"
        },
        "population": 5623501,
        "latlng": [56, 10],
        "demonym": "Danish",
        "borders": ["DEU"]
      },
      {
        "name": "Djibouti",
        "nativeName": "Djibouti",
        "tld": [".dj"],
        "cca2": "DJ",
        "ccn3": "262",
        "cca3": "DJI",
        "currency": ["DJF"],
        "callingCode": ["253"],
        "capital": "Djibouti",
        "altSpellings": ["DJ", "Jabuuti", "Gabuuti", "Republic of Djibouti", "R\u00e9publique de Djibouti", "Gabuutih Ummuuno", "Jamhuuriyadda Jabuuti"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Eastern Africa",
        "language": ["French", "Arabic"],
        "languagesCodes": ["ar", "fr"],
        "translations": {
          "de": "Dschibuti",
          "en": "Djibouti",
          "es": "Yibuti",
          "fr": "Djibouti",
          "it": "Gibuti",
          "ja": "\u30b8\u30d6\u30c1",
          "nl": "Djibouti"
        },
        "population": 864618,
        "latlng": [11.5, 43],
        "demonym": "Djibouti",
        "borders": ["ERI", "ETH", "SOM"]
      },
      {
        "name": "Dominica",
        "nativeName": "Dominica",
        "tld": [".dm"],
        "cca2": "DM",
        "ccn3": "212",
        "cca3": "DMA",
        "currency": ["XCD"],
        "callingCode": ["1767"],
        "capital": "Roseau",
        "altSpellings": ["DM", "Dominique", "Wai\u2018tu kubuli", "Commonwealth of Dominica"],
        "relevance": "0.5",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Dominica",
          "en": "Dominica",
          "es": "Dominica",
          "fr": "Dominique",
          "it": "Dominica",
          "ja": "\u30c9\u30df\u30cb\u30ab\u56fd",
          "nl": "Dominica"
        },
        "population": 71293,
        "latlng": [15.41666666, -61.33333333],
        "demonym": "Dominican",
        "borders": []
      },
      {
        "name": "Dominican Republic",
        "nativeName": "Rep\u00fablica Dominicana",
        "tld": [".do"],
        "cca2": "DO",
        "ccn3": "214",
        "cca3": "DOM",
        "currency": ["DOP"],
        "callingCode": ["1809", "1829", "1849"],
        "capital": "Santo Domingo",
        "altSpellings": ["DO"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["Spanish"],
        "languagesCodes": ["es"],
        "translations": {
          "de": "Dominikanische Republik",
          "en": "Dominican Republic",
          "es": "Rep\u00fablica Dominicana",
          "fr": "R\u00e9publique dominicaine",
          "it": "Repubblica Dominicana",
          "ja": "\u30c9\u30df\u30cb\u30ab\u5171\u548c\u56fd",
          "nl": "Dominicaanse Republiek"
        },
        "population": 9445281,
        "latlng": [19, -70.66666666],
        "demonym": "Dominican",
        "borders": ["HTI"]
      },
      {
        "name": "Ecuador",
        "nativeName": "Ecuador",
        "tld": [".ec"],
        "cca2": "EC",
        "ccn3": "218",
        "cca3": "ECU",
        "currency": ["USD"],
        "callingCode": ["593"],
        "capital": "Quito",
        "altSpellings": ["EC", "Republic of Ecuador", "Rep\u00fablica del Ecuador"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "South America",
        "language": ["Spanish"],
        "languagesCodes": ["es"],
        "translations": {
          "de": "Ecuador",
          "en": "Ecuador",
          "es": "Ecuador",
          "fr": "\u00c9quateur",
          "it": "Ecuador",
          "ja": "\u30a8\u30af\u30a2\u30c9\u30eb",
          "nl": "Ecuador"
        },
        "population": 15617900,
        "latlng": [-2, -77.5],
        "demonym": "Ecuadorean",
        "borders": ["COL", "PER"]
      },
      {
        "name": "Egypt",
        "nativeName": "Mi\u1e63r",
        "tld": [".eg"],
        "cca2": "EG",
        "ccn3": "818",
        "cca3": "EGY",
        "currency": ["EGP"],
        "callingCode": ["20"],
        "capital": "Cairo",
        "altSpellings": ["EG", "Arab Republic of Egypt"],
        "relevance": "1.5",
        "region": "Africa",
        "subregion": "Northern Africa",
        "language": ["Egyptian Arabic"],
        "languagesCodes": ["ar"],
        "translations": {
          "de": "\u00c4gypten",
          "en": "Egypt",
          "es": "Egipto",
          "fr": "\u00c9gypte",
          "it": "Egitto",
          "ja": "\u30a8\u30b8\u30d7\u30c8",
          "nl": "Egypte"
        },
        "population": 83661000,
        "latlng": [27, 30],
        "demonym": "Egyptian",
        "borders": ["ISR", "LBY", "SDN"]
      },
      {
        "name": "El Salvador",
        "nativeName": "El Salvador",
        "tld": [".sv"],
        "cca2": "SV",
        "ccn3": "222",
        "cca3": "SLV",
        "currency": ["SVC", "USD"],
        "callingCode": ["503"],
        "capital": "San Salvador",
        "altSpellings": ["SV", "Republic of El Salvador", "Rep\u00fablica de El Salvador"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Central America",
        "language": ["Castilian"],
        "languagesCodes": ["es"],
        "translations": {
          "de": "El Salvador",
          "en": "El Salvador",
          "es": "El Salvador",
          "fr": "Salvador",
          "it": "El Salvador",
          "ja": "\u30a8\u30eb\u30b5\u30eb\u30d0\u30c9\u30eb",
          "nl": "El Salvador"
        },
        "population": 6340000,
        "latlng": [13.83333333, -88.91666666],
        "demonym": "Salvadoran",
        "borders": ["GTM", "HND"]
      },
      {
        "name": "Equatorial Guinea",
        "nativeName": "Guinea Ecuatorial",
        "tld": [".gq"],
        "cca2": "GQ",
        "ccn3": "226",
        "cca3": "GNQ",
        "currency": ["XAF"],
        "callingCode": ["240"],
        "capital": "Malabo",
        "altSpellings": ["GQ", "Republic of Equatorial Guinea", "Rep\u00fablica de Guinea Ecuatorial", "R\u00e9publique de Guin\u00e9e \u00e9quatoriale", "Rep\u00fablica da Guin\u00e9 Equatorial"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Middle Africa",
        "language": ["Spanish", "French", "Portuguese"],
        "languagesCodes": ["es", "fr"],
        "translations": {
          "de": "\u00c4quatorial-Guinea",
          "en": "Equatorial Guinea",
          "es": "Guinea Ecuatorial",
          "fr": "Guin\u00e9e-\u00c9quatoriale",
          "it": "Guinea Equatoriale",
          "ja": "\u8d64\u9053\u30ae\u30cb\u30a2",
          "nl": "Equatoriaal-Guinea"
        },
        "population": 1622000,
        "latlng": [2, 10],
        "demonym": "Equatorial Guinean",
        "borders": ["CMR", "GAB"]
      },
      {
        "name": "Eritrea",
        "nativeName": "\u12a4\u122d\u1275\u122b",
        "tld": [".er"],
        "cca2": "ER",
        "ccn3": "232",
        "cca3": "ERI",
        "currency": ["ERN"],
        "callingCode": ["291"],
        "capital": "Asmara",
        "altSpellings": ["ER", "State of Eritrea", "\u1203\u1308\u1228 \u12a4\u122d\u1275\u122b", "Dawlat Iritriy\u00e1", "\u02beErtr\u0101", "Iritriy\u0101", ""],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Eastern Africa",
        "language": ["Tigrinya", "Arabic", "English"],
        "languagesCodes": ["en", "ar", "ti"],
        "translations": {
          "de": "Eritrea",
          "en": "Eritrea",
          "es": "Eritrea",
          "fr": "\u00c9rythr\u00e9e",
          "it": "Eritrea",
          "ja": "\u30a8\u30ea\u30c8\u30ea\u30a2",
          "nl": "Eritrea"
        },
        "population": 6333000,
        "latlng": [15, 39],
        "demonym": "Eritrean",
        "borders": ["DJI", "ETH", "SDN"]
      },
      {
        "name": "Estonia",
        "nativeName": "Eesti",
        "tld": [".ee"],
        "cca2": "EE",
        "ccn3": "233",
        "cca3": "EST",
        "currency": ["EUR"],
        "callingCode": ["372"],
        "capital": "Tallinn",
        "altSpellings": ["EE", "Eesti", "Republic of Estonia", "Eesti Vabariik"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Northern Europe",
        "language": ["Estonian"],
        "languagesCodes": ["et"],
        "translations": {
          "de": "Estland",
          "en": "Estonia",
          "es": "Estonia",
          "fr": "Estonie",
          "it": "Estonia",
          "ja": "\u30a8\u30b9\u30c8\u30cb\u30a2",
          "nl": "Estland"
        },
        "population": 1286540,
        "latlng": [59, 26],
        "demonym": "Estonian",
        "borders": ["LVA", "RUS"]
      },
      {
        "name": "Ethiopia",
        "nativeName": "\u12a2\u1275\u12ee\u1335\u12eb",
        "tld": [".et"],
        "cca2": "ET",
        "ccn3": "231",
        "cca3": "ETH",
        "currency": ["ETB"],
        "callingCode": ["251"],
        "capital": "Addis Ababa",
        "altSpellings": ["ET", "\u02be\u012aty\u014d\u1e57\u1e57y\u0101", "Federal Democratic Republic of Ethiopia", "\u12e8\u12a2\u1275\u12ee\u1335\u12eb \u134c\u12f4\u122b\u120b\u12ca \u12f2\u121e\u12ad\u122b\u1232\u12eb\u12ca \u122a\u1350\u1265\u120a\u12ad"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Eastern Africa",
        "language": ["Amharic"],
        "languagesCodes": ["am"],
        "translations": {
          "de": "\u00c4thiopien",
          "en": "Ethiopia",
          "es": "Etiop\u00eda",
          "fr": "\u00c9thiopie",
          "it": "Etiopia",
          "ja": "\u30a8\u30c1\u30aa\u30d4\u30a2",
          "nl": "Ethiopi\u00eb"
        },
        "population": 86613986,
        "latlng": [8, 38],
        "demonym": "Ethiopian",
        "borders": ["DJI", "ERI", "KEN", "SOM", "SSD", "SDN"]
      },
      {
        "name": "Falkland Islands",
        "nativeName": "Falkland Islands",
        "tld": [".fk"],
        "cca2": "FK",
        "ccn3": "238",
        "cca3": "FLK",
        "currency": ["FKP"],
        "callingCode": ["500"],
        "capital": "Stanley",
        "altSpellings": ["FK", "Islas Malvinas"],
        "relevance": "0.5",
        "region": "Americas",
        "subregion": "South America",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Falklandinseln",
          "en": "Falkland Islands",
          "es": "Islas Malvinas",
          "fr": "\u00celes Malouines",
          "it": "Isole Falkland o Isole Malvine",
          "ja": "\u30d5\u30a9\u30fc\u30af\u30e9\u30f3\u30c9\uff08\u30de\u30eb\u30d3\u30ca\u30b9\uff09\u8af8\u5cf6",
          "nl": "Falklandeilanden [Islas Malvinas]"
        },
        "population": 2563,
        "latlng": [-51.75, -59],
        "demonym": "Falkland Islander",
        "borders": []
      },
      {
        "name": "Faroe Islands",
        "nativeName": "F\u00f8royar",
        "tld": [".fo"],
        "cca2": "FO",
        "ccn3": "234",
        "cca3": "FRO",
        "currency": ["DKK"],
        "callingCode": ["298"],
        "capital": "T\u00f3rshavn",
        "altSpellings": ["FO", "F\u00f8royar", "F\u00e6r\u00f8erne"],
        "relevance": "0.5",
        "region": "Europe",
        "subregion": "Northern Europe",
        "language": ["Faroese", "Danish"],
        "languagesCodes": ["fo"],
        "translations": {
          "de": "F\u00e4r\u00f6er-Inseln",
          "en": "Faroe Islands",
          "es": "Islas Faroe",
          "fr": "\u00celes F\u00e9ro\u00e9",
          "it": "Isole Far Oer",
          "ja": "\u30d5\u30a7\u30ed\u30fc\u8af8\u5cf6",
          "nl": "Faer\u00f6er"
        },
        "population": 48509,
        "latlng": [62, -7],
        "demonym": "Faroese",
        "borders": []
      },
      {
        "name": "Fiji",
        "nativeName": "Fiji",
        "tld": [".fj"],
        "cca2": "FJ",
        "ccn3": "242",
        "cca3": "FJI",
        "currency": ["FJD"],
        "callingCode": ["679"],
        "capital": "Suva",
        "altSpellings": ["FJ", "Viti", "Republic of Fiji", "Matanitu ko Viti", "Fij\u012b Ga\u1e47ar\u0101jya"],
        "relevance": "0",
        "region": "Oceania",
        "subregion": "Melanesia",
        "language": ["English", "Fijian", "Fiji Hindi"],
        "languagesCodes": ["en", "fj", "hi", "ur"],
        "translations": {
          "de": "Fidschi",
          "en": "Fiji",
          "es": "Fiyi",
          "fr": "Fidji",
          "it": "Figi",
          "ja": "\u30d5\u30a3\u30b8\u30fc",
          "nl": "Fiji"
        },
        "population": 858038,
        "latlng": [-18, 175],
        "demonym": "Fijian",
        "borders": []
      },
      {
        "name": "Finland",
        "nativeName": "Suomi",
        "tld": [".fi"],
        "cca2": "FI",
        "ccn3": "246",
        "cca3": "FIN",
        "currency": ["EUR"],
        "callingCode": ["358"],
        "capital": "Helsinki",
        "altSpellings": ["FI", "Suomi", "Republic of Finland", "Suomen tasavalta", "Republiken Finland"],
        "relevance": "0.5",
        "region": "Europe",
        "subregion": "Northern Europe",
        "language": ["Finnish", "Swedish"],
        "languagesCodes": ["fi", "sv"],
        "translations": {
          "de": "Finnland",
          "en": "Finland",
          "es": "Finlandia",
          "fr": "Finlande",
          "it": "Finlandia",
          "ja": "\u30d5\u30a3\u30f3\u30e9\u30f3\u30c9",
          "nl": "Finland"
        },
        "population": 5445883,
        "latlng": [64, 26],
        "demonym": "Finnish",
        "borders": ["NOR", "SWE", "RUS"]
      },
      {
        "name": "France",
        "nativeName": "France",
        "tld": [".fr"],
        "cca2": "FR",
        "ccn3": "250",
        "cca3": "FRA",
        "currency": ["EUR"],
        "callingCode": ["33"],
        "capital": "Paris",
        "altSpellings": ["FR", "French Republic", "R\u00e9publique fran\u00e7aise"],
        "relevance": "2.5",
        "region": "Europe",
        "subregion": "Western Europe",
        "language": ["French"],
        "languagesCodes": ["fr"],
        "translations": {
          "de": "Frankreich",
          "en": "France",
          "es": "Francia",
          "fr": "France",
          "it": "Francia",
          "ja": "\u30d5\u30e9\u30f3\u30b9",
          "nl": "Frankrijk"
        },
        "population": 65806000,
        "latlng": [46, 2],
        "demonym": "French",
        "borders": ["AND", "BEL", "DEU", "ITA", "LUX", "MCO", "ESP", "CHE"]
      },
      {
        "name": "French Guiana",
        "nativeName": "Guyane fran\u00e7aise",
        "tld": [".gf"],
        "cca2": "GF",
        "ccn3": "254",
        "cca3": "GUF",
        "currency": ["EUR"],
        "callingCode": ["594"],
        "capital": "Cayenne",
        "altSpellings": ["GF", "Guiana", "Guyane"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "South America",
        "language": ["French"],
        "languagesCodes": ["fr"],
        "translations": {
          "de": "Franz\u00f6sisch Guyana",
          "en": "French Guiana",
          "es": "Guayana Francesa",
          "fr": "Guayane",
          "it": "Guyana francese",
          "ja": "\u30d5\u30e9\u30f3\u30b9\u9818\u30ae\u30a2\u30ca",
          "nl": "Frans-Guyana"
        },
        "population": 229040,
        "latlng": [4, -53],
        "demonym": "",
        "borders": ["BRA", "SUR"]
      },
      {
        "name": "French Polynesia",
        "nativeName": "Polyn\u00e9sie fran\u00e7aise",
        "tld": [".pf"],
        "cca2": "PF",
        "ccn3": "258",
        "cca3": "PYF",
        "currency": ["XPF"],
        "callingCode": ["689"],
        "capital": "Papeet\u0113",
        "altSpellings": ["PF", "Polyn\u00e9sie fran\u00e7aise", "French Polynesia", "P\u014dr\u012bnetia Far\u0101ni"],
        "relevance": "0",
        "region": "Oceania",
        "subregion": "Polynesia",
        "language": ["French"],
        "languagesCodes": ["fr"],
        "translations": {
          "de": "Franz\u00f6sisch-Polynesien",
          "en": "French Polynesia",
          "es": "Polinesia Francesa",
          "fr": "Polyn\u00e9sie fran\u00e7aise",
          "it": "Polinesia Francese",
          "ja": "\u30d5\u30e9\u30f3\u30b9\u9818\u30dd\u30ea\u30cd\u30b7\u30a2",
          "nl": "Frans-Polynesi\u00eb"
        },
        "population": 268270,
        "latlng": [-15, -140],
        "demonym": "French Polynesian",
        "borders": []
      },
      {
        "name": "French Southern and Antarctic Lands",
        "nativeName": "Territoire des Terres australes et antarctiques fran\u00e7aises",
        "tld": [".tf"],
        "cca2": "TF",
        "ccn3": "260",
        "cca3": "ATF",
        "currency": ["EUR"],
        "callingCode": [""],
        "capital": "Port-aux-Fran\u00e7ais",
        "altSpellings": ["TF"],
        "relevance": "0",
        "region": "",
        "subregion": "",
        "language": ["French"],
        "languagesCodes": ["fr"],
        "translations": {
          "de": "Franz\u00f6sische S\u00fcd- und Antarktisgebiete",
          "en": "French Southern Territories",
          "es": "Tierras Australes y Antárticas Francesas",
          "fr": "Terres australes et antarctiques fran\u00e7aises",
          "it": "Territori Francesi del Sud",
          "ja": "\u30d5\u30e9\u30f3\u30b9\u9818\u5357\u65b9\u30fb\u5357\u6975\u5730\u57df",
          "nl": "Franse Gebieden in de zuidelijke Indische Oceaan"
        },
        "population": -1,
        "latlng": [],
        "demonym": "French",
        "borders": []
      },
      {
        "name": "Gabon",
        "nativeName": "Gabon",
        "tld": [".ga"],
        "cca2": "GA",
        "ccn3": "266",
        "cca3": "GAB",
        "currency": ["XAF"],
        "callingCode": ["241"],
        "capital": "Libreville",
        "altSpellings": ["GA", "Gabonese Republic", "R\u00e9publique Gabonaise"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Middle Africa",
        "language": ["French"],
        "languagesCodes": ["fr"],
        "translations": {
          "de": "Gabun",
          "en": "Gabon",
          "es": "Gab\u00f3n",
          "fr": "Gabon",
          "it": "Gabon",
          "ja": "\u30ac\u30dc\u30f3",
          "nl": "Gabon"
        },
        "population": 1672000,
        "latlng": [-1, 11.75],
        "demonym": "Gabonese",
        "borders": ["CMR", "COG", "GNQ"]
      },
      {
        "name": "Gambia",
        "nativeName": "Gambia",
        "tld": [".gm"],
        "cca2": "GM",
        "ccn3": "270",
        "cca3": "GMB",
        "currency": ["GMD"],
        "callingCode": ["220"],
        "capital": "Banjul",
        "altSpellings": ["GM", "Republic of the Gambia"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Western Africa",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Gambia",
          "en": "Gambia",
          "es": "Gambia",
          "fr": "Gambie",
          "it": "Gambia",
          "ja": "\u30ac\u30f3\u30d3\u30a2",
          "nl": "Gambia"
        },
        "population": -1,
        "latlng": [13.46666666, -16.56666666],
        "demonym": "Gambian",
        "borders": ["SEN"]
      },
      {
        "name": "Georgia",
        "nativeName": "\u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd",
        "tld": [".ge"],
        "cca2": "GE",
        "ccn3": "268",
        "cca3": "GEO",
        "currency": ["GEL"],
        "callingCode": ["995"],
        "capital": "Tbilisi",
        "altSpellings": ["GE", "Sakartvelo"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Western Asia",
        "language": ["Georgian"],
        "languagesCodes": ["ka"],
        "translations": {
          "de": "Georgien",
          "en": "Georgia",
          "es": "Georgia",
          "fr": "G\u00e9orgie",
          "it": "Georgia",
          "ja": "\u30b0\u30eb\u30b8\u30a2",
          "nl": "Georgi\u00eb"
        },
        "population": -1,
        "latlng": [42, 43.5],
        "demonym": "Georgian",
        "borders": ["ARM", "AZE", "RUS", "TUR"]
      },
      {
        "name": "Germany",
        "nativeName": "Deutschland",
        "tld": [".de"],
        "cca2": "DE",
        "ccn3": "276",
        "cca3": "DEU",
        "currency": ["EUR"],
        "callingCode": ["49"],
        "capital": "Berlin",
        "altSpellings": ["DE", "Federal Republic of Germany", "Bundesrepublik Deutschland"],
        "relevance": "3",
        "region": "Europe",
        "subregion": "Western Europe",
        "language": ["German"],
        "languagesCodes": ["de"],
        "translations": {
          "de": "Deutschland",
          "en": "Germany",
          "es": "Alemania",
          "fr": "Allemagne",
          "it": "Germania",
          "ja": "\u30c9\u30a4\u30c4",
          "nl": "Duitsland"
        },
        "population": 80523700,
        "latlng": [51, 9],
        "demonym": "German",
        "borders": ["AUT", "BEL", "CZE", "DNK", "FRA", "LUX", "NLD", "POL", "CHE"]
      },
      {
        "name": "Ghana",
        "nativeName": "Ghana",
        "tld": [".gh"],
        "cca2": "GH",
        "ccn3": "288",
        "cca3": "GHA",
        "currency": ["GHS"],
        "callingCode": ["233"],
        "capital": "Accra",
        "altSpellings": ["GH"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Western Africa",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Ghana",
          "en": "Ghana",
          "es": "Ghana",
          "fr": "Ghana",
          "it": "Ghana",
          "ja": "\u30ac\u30fc\u30ca",
          "nl": "Ghana"
        },
        "population": 24658823,
        "latlng": [8, -2],
        "demonym": "Ghanaian",
        "borders": ["BFA", "CIV", "TGO"]
      },
      {
        "name": "Gibraltar",
        "nativeName": "Gibraltar",
        "tld": [".gi"],
        "cca2": "GI",
        "ccn3": "292",
        "cca3": "GIB",
        "currency": ["GIP"],
        "callingCode": ["350"],
        "capital": "Gibraltar",
        "altSpellings": ["GI"],
        "relevance": "0.5",
        "region": "Europe",
        "subregion": "Southern Europe",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Gibraltar",
          "en": "Gibraltar",
          "es": "Gibraltar",
          "fr": "Gibraltar",
          "it": "Gibilterra",
          "ja": "\u30b8\u30d6\u30e9\u30eb\u30bf\u30eb",
          "nl": "Gibraltar"
        },
        "population": 29752,
        "latlng": [36.13333333, -5.35],
        "demonym": "Gibraltar",
        "borders": ["ESP"]
      },
      {
        "name": "Greece",
        "nativeName": "\u0395\u03bb\u03bb\u03ac\u03b4\u03b1",
        "tld": [".gr"],
        "cca2": "GR",
        "ccn3": "300",
        "cca3": "GRC",
        "currency": ["EUR"],
        "callingCode": ["30"],
        "capital": "Athens",
        "altSpellings": ["GR", "Ell\u00e1da", "Hellenic Republic", "\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ae \u0394\u03b7\u03bc\u03bf\u03ba\u03c1\u03b1\u03c4\u03af\u03b1"],
        "relevance": "1.5",
        "region": "Europe",
        "subregion": "Southern Europe",
        "language": ["Greek"],
        "languagesCodes": ["el"],
        "translations": {
          "de": "Griechenland",
          "en": "Greece",
          "es": "Grecia",
          "fr": "Gr\u00e8ce",
          "it": "Grecia",
          "ja": "\u30ae\u30ea\u30b7\u30e3",
          "nl": "Griekenland"
        },
        "population": 10815197,
        "latlng": [39, 22],
        "demonym": "Greek",
        "borders": ["ALB", "BGR", "TUR", "MKD"]
      },
      {
        "name": "Greenland",
        "nativeName": "Kalaallit Nunaat",
        "tld": [".gl"],
        "cca2": "GL",
        "ccn3": "304",
        "cca3": "GRL",
        "currency": ["DKK"],
        "callingCode": ["299"],
        "capital": "Nuuk",
        "altSpellings": ["GL", "Gr\u00f8nland"],
        "relevance": "0.5",
        "region": "Americas",
        "subregion": "Northern America",
        "language": ["Greenlandic"],
        "languagesCodes": ["kl"],
        "translations": {
          "de": "Gr\u00f6nland",
          "en": "Greenland",
          "es": "Groenlandia",
          "fr": "Groenland",
          "it": "Groenlandia",
          "ja": "\u30b0\u30ea\u30fc\u30f3\u30e9\u30f3\u30c9",
          "nl": "Groenland"
        },
        "population": 56370,
        "latlng": [72, -40],
        "demonym": "Greenlandic",
        "borders": []
      },
      {
        "name": "Grenada",
        "nativeName": "Grenada",
        "tld": [".gd"],
        "cca2": "GD",
        "ccn3": "308",
        "cca3": "GRD",
        "currency": ["XCD"],
        "callingCode": ["1473"],
        "capital": "St. George's",
        "altSpellings": ["GD"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Grenada",
          "en": "Grenada",
          "es": "Grenada",
          "fr": "Grenade",
          "it": "Grenada",
          "ja": "\u30b0\u30ec\u30ca\u30c0",
          "nl": "Grenada"
        },
        "population": 103328,
        "latlng": [12.11666666, -61.66666666],
        "demonym": "Grenadian",
        "borders": []
      },
      {
        "name": "Guadeloupe",
        "nativeName": "Guadeloupe",
        "tld": [".gp"],
        "cca2": "GP",
        "ccn3": "312",
        "cca3": "GLP",
        "currency": ["EUR"],
        "callingCode": ["590"],
        "capital": "Basse-Terre",
        "altSpellings": ["GP", "Gwadloup"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["French"],
        "languagesCodes": ["fr"],
        "translations": {
          "de": "Guadeloupe",
          "en": "Guadeloupe",
          "es": "Guadalupe",
          "fr": "Guadeloupe",
          "it": "Guadeloupa",
          "ja": "\u30b0\u30a2\u30c9\u30eb\u30fc\u30d7",
          "nl": "Guadeloupe"
        },
        "population": 403355,
        "latlng": [16.25, -61.583333],
        "demonym": "Guadeloupian",
        "borders": []
      },
      {
        "name": "Guam",
        "nativeName": "Guam",
        "tld": [".gu"],
        "cca2": "GU",
        "ccn3": "316",
        "cca3": "GUM",
        "currency": ["USD"],
        "callingCode": ["1671"],
        "capital": "Hag\u00e5t\u00f1a",
        "altSpellings": ["GU", "Gu\u00e5h\u00e5n"],
        "relevance": "0",
        "region": "Oceania",
        "subregion": "Micronesia",
        "language": ["English", "Chamorro"],
        "languagesCodes": ["en", "ch", "es"],
        "translations": {
          "de": "Guam",
          "en": "Guam",
          "es": "Guam",
          "fr": "Guam",
          "it": "Guam",
          "ja": "\u30b0\u30a2\u30e0",
          "nl": "Guam"
        },
        "population": 159358,
        "latlng": [13.46666666, 144.78333333],
        "demonym": "Guamanian",
        "borders": []
      },
      {
        "name": "Guatemala",
        "nativeName": "Guatemala",
        "tld": [".gt"],
        "cca2": "GT",
        "ccn3": "320",
        "cca3": "GTM",
        "currency": ["GTQ"],
        "callingCode": ["502"],
        "capital": "Guatemala City",
        "altSpellings": ["GT"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Central America",
        "language": ["Spanish"],
        "languagesCodes": ["es"],
        "translations": {
          "de": "Guatemala",
          "en": "Guatemala",
          "es": "Guatemala",
          "fr": "Guatemala",
          "it": "Guatemala",
          "ja": "\u30b0\u30a2\u30c6\u30de\u30e9",
          "nl": "Guatemala"
        },
        "population": 15438384,
        "latlng": [15.5, -90.25],
        "demonym": "Guatemalan",
        "borders": ["BLZ", "SLV", "HND", "MEX"]
      },
      {
        "name": "Guernsey",
        "nativeName": "Guernsey",
        "tld": [".gg"],
        "cca2": "GG",
        "ccn3": "831",
        "cca3": "GGY",
        "currency": ["GBP"],
        "callingCode": ["44"],
        "capital": "St. Peter Port",
        "altSpellings": ["GG", "Bailiwick of Guernsey", "Bailliage de Guernesey"],
        "relevance": "0.5",
        "region": "Europe",
        "subregion": "Northern Europe",
        "language": ["English", "French"],
        "languagesCodes": ["en", "fr"],
        "translations": {
          "de": "Guernsey",
          "en": "Guernsey",
          "es": "Guernsey",
          "fr": "Guernesey",
          "it": "Guernsey",
          "ja": "\u30ac\u30fc\u30f3\u30b8\u30fc",
          "nl": "Guernsey"
        },
        "population": 62431,
        "latlng": [49.46666666, -2.58333333],
        "demonym": "Channel Islander",
        "borders": []
      },
      {
        "name": "Guinea",
        "nativeName": "Guin\u00e9e",
        "tld": [".gn"],
        "cca2": "GN",
        "ccn3": "324",
        "cca3": "GIN",
        "currency": ["GNF"],
        "callingCode": ["224"],
        "capital": "Conakry",
        "altSpellings": ["GN", "Republic of Guinea", "R\u00e9publique de Guin\u00e9e"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Western Africa",
        "language": ["French"],
        "languagesCodes": ["fr", "ff"],
        "translations": {
          "de": "Guinea",
          "en": "Guinea",
          "es": "Guinea",
          "fr": "Guin\u00e9e",
          "it": "Guinea",
          "ja": "\u30ae\u30cb\u30a2",
          "nl": "Guinee"
        },
        "population": 10824200,
        "latlng": [11, -10],
        "demonym": "Guinean",
        "borders": ["CIV", "GNB", "LBR", "MLI", "SEN", "SLE"]
      },
      {
        "name": "Guinea-Bissau",
        "nativeName": "Guin\u00e9-Bissau",
        "tld": [".gw"],
        "cca2": "GW",
        "ccn3": "624",
        "cca3": "GNB",
        "currency": ["XOF"],
        "callingCode": ["245"],
        "capital": "Bissau",
        "altSpellings": ["GW", "Republic of Guinea-Bissau", "Rep\u00fablica da Guin\u00e9-Bissau"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Western Africa",
        "language": ["Portuguese"],
        "languagesCodes": ["pt"],
        "translations": {
          "de": "Guinea-Bissau",
          "en": "Guinea-Bissau",
          "es": "Guinea-Bis\u00e1u",
          "fr": "Guin\u00e9e-Bissau",
          "it": "Guinea-Bissau",
          "ja": "\u30ae\u30cb\u30a2\u30d3\u30b5\u30a6",
          "nl": "Guinee-Bissau"
        },
        "population": 1704000,
        "latlng": [12, -15],
        "demonym": "Guinea-Bissauan",
        "borders": ["GIN", "SEN"]
      },
      {
        "name": "Guyana",
        "nativeName": "Guyana",
        "tld": [".gy"],
        "cca2": "GY",
        "ccn3": "328",
        "cca3": "GUY",
        "currency": ["GYD"],
        "callingCode": ["592"],
        "capital": "Georgetown",
        "altSpellings": ["GY", "Co-operative Republic of Guyana"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "South America",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Guyana",
          "en": "Guyana",
          "es": "Guyana",
          "fr": "Guyane",
          "it": "Guyana",
          "ja": "\u30ac\u30a4\u30a2\u30ca",
          "nl": "Guyana"
        },
        "population": 784894,
        "latlng": [5, -59],
        "demonym": "Guyanese",
        "borders": ["BRA", "SUR", "VEN"]
      },
      {
        "name": "Haiti",
        "nativeName": "Ha\u00efti",
        "tld": [".ht"],
        "cca2": "HT",
        "ccn3": "332",
        "cca3": "HTI",
        "currency": ["HTG", "USD"],
        "callingCode": ["509"],
        "capital": "Port-au-Prince",
        "altSpellings": ["HT", "Republic of Haiti", "R\u00e9publique d'Ha\u00efti", "Repiblik Ayiti"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["French", "Haitian Creole"],
        "languagesCodes": ["fr", "ht"],
        "translations": {
          "de": "Haiti",
          "en": "Haiti",
          "es": "Haiti",
          "fr": "Ha\u00efti",
          "it": "Haiti",
          "ja": "\u30cf\u30a4\u30c1",
          "nl": "Ha\u00efti"
        },
        "population": 10413211,
        "latlng": [19, -72.41666666],
        "demonym": "Haitian",
        "borders": ["DOM"]
      },
      {
        "name": "Heard Island and McDonald Islands",
        "nativeName": "Heard Island and McDonald Islands",
        "tld": [".hm", ".aq"],
        "cca2": "HM",
        "ccn3": "334",
        "cca3": "HMD",
        "currency": ["AUD"],
        "callingCode": [""],
        "capital": "",
        "altSpellings": ["HM"],
        "relevance": "0",
        "region": "",
        "subregion": "",
        "language": [""],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Heard und die McDonaldinseln",
          "en": "Heard and McDonald Islands",
          "es": "Islas Heard y McDonald",
          "fr": "\u00celes Heard-et-MacDonald",
          "it": "Isole Heard e McDonald",
          "ja": "\u30cf\u30fc\u30c9\u5cf6\u3068\u30de\u30af\u30c9\u30ca\u30eb\u30c9\u8af8\u5cf6",
          "nl": "Heard- en McDonaldeilanden"
        },
        "population": -1,
        "latlng": [-53.1, 72.51666666],
        "demonym": "Heard and McDonald Islander",
        "borders": []
      },
      {
        "name": "Vatican City",
        "nativeName": "Vaticano",
        "tld": [".va"],
        "cca2": "VA",
        "ccn3": "336",
        "cca3": "VAT",
        "currency": ["EUR"],
        "callingCode": ["39066", "379"],
        "capital": "Vatican City",
        "altSpellings": ["VA", "Vatican City State", "Stato della Citt\u00e0 del Vaticano"],
        "relevance": "0.5",
        "region": "Europe",
        "subregion": "Southern Europe",
        "language": ["Italian"],
        "languagesCodes": ["it", "la"],
        "translations": {
          "de": "Vatikanstadt",
          "en": "Vatican City",
          "es": "Ciudad del Vaticano",
          "fr": "Cit\u00e9 du Vatican",
          "it": "Citt\u00e0 del Vaticano",
          "ja": "\u30d0\u30c1\u30ab\u30f3\u5e02\u56fd",
          "nl": "Vaticaanstad"
        },
        "population": 800,
        "latlng": [41.9, 12.45],
        "demonym": "Italian",
        "borders": ["ITA"]
      },
      {
        "name": "Honduras",
        "nativeName": "Honduras",
        "tld": [".hn"],
        "cca2": "HN",
        "ccn3": "340",
        "cca3": "HND",
        "currency": ["HNL"],
        "callingCode": ["504"],
        "capital": "Tegucigalpa",
        "altSpellings": ["HN", "Republic of Honduras", "Rep\u00fablica de Honduras"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Central America",
        "language": ["Spanish"],
        "languagesCodes": ["es"],
        "translations": {
          "de": "Honduras",
          "en": "Honduras",
          "es": "Honduras",
          "fr": "Honduras",
          "it": "Honduras",
          "ja": "\u30db\u30f3\u30b8\u30e5\u30e9\u30b9",
          "nl": "Honduras"
        },
        "population": 8555072,
        "latlng": [15, -86.5],
        "demonym": "Honduran",
        "borders": ["GTM", "SLV", "NIC"]
      },
      {
        "name": "Hong Kong",
        "nativeName": "Hong Kong",
        "tld": [".hk"],
        "cca2": "HK",
        "ccn3": "344",
        "cca3": "HKG",
        "currency": ["HKD"],
        "callingCode": ["852"],
        "capital": "City of Victoria",
        "altSpellings": ["HK", "\u9999\u6e2f"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Eastern Asia",
        "language": ["English", "Chinese"],
        "languagesCodes": ["en", "zh"],
        "translations": {
          "de": "Hong Kong",
          "en": "Hong Kong",
          "es": "Hong Kong",
          "fr": "Hong Kong",
          "it": "Hong Kong",
          "ja": "\u9999\u6e2f",
          "nl": "Hongkong"
        },
        "population": 7184000,
        "latlng": [22.25, 114.16666666],
        "demonym": "Chinese",
        "borders": ["CHN"]
      },
      {
        "name": "Hungary",
        "nativeName": "Magyarorsz\u00e1g",
        "tld": [".hu"],
        "cca2": "HU",
        "ccn3": "348",
        "cca3": "HUN",
        "currency": ["HUF"],
        "callingCode": ["36"],
        "capital": "Budapest",
        "altSpellings": ["HU"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Eastern Europe",
        "language": ["Hungarian"],
        "languagesCodes": ["hu"],
        "translations": {
          "de": "Ungarn",
          "en": "Hungary",
          "es": "Hungr\u00eda",
          "fr": "Hongrie",
          "it": "Ungheria",
          "ja": "\u30cf\u30f3\u30ac\u30ea\u30fc",
          "nl": "Hongarije"
        },
        "population": 9906000,
        "latlng": [47, 20],
        "demonym": "Hungarian",
        "borders": ["AUT", "HRV", "ROU", "SRB", "SVK", "SVN", "UKR"]
      },
      {
        "name": "Iceland",
        "nativeName": "\u00cdsland",
        "tld": [".is"],
        "cca2": "IS",
        "ccn3": "352",
        "cca3": "ISL",
        "currency": ["ISK"],
        "callingCode": ["354"],
        "capital": "Reykjavik",
        "altSpellings": ["IS", "Island", "Republic of Iceland", "L\u00fd\u00f0veldi\u00f0 \u00cdsland"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Northern Europe",
        "language": ["Icelandic"],
        "languagesCodes": ["is"],
        "translations": {
          "de": "Island",
          "en": "Iceland",
          "es": "Islandia",
          "fr": "Islande",
          "it": "Islanda",
          "ja": "\u30a2\u30a4\u30b9\u30e9\u30f3\u30c9",
          "nl": "IJsland"
        },
        "population": 325010,
        "latlng": [65, -18],
        "demonym": "Icelander",
        "borders": []
      },
      {
        "name": "India",
        "nativeName": "\u092d\u093e\u0930\u0924",
        "tld": [".in"],
        "cca2": "IN",
        "ccn3": "356",
        "cca3": "IND",
        "currency": ["INR"],
        "callingCode": ["91"],
        "capital": "New Delhi",
        "altSpellings": ["IN", "Bh\u0101rat", "Republic of India", "Bharat Ganrajya"],
        "relevance": "3",
        "region": "Asia",
        "subregion": "Southern Asia",
        "language": ["Hindi", "English"],
        "languagesCodes": ["hi", "en"],
        "translations": {
          "de": "Indien",
          "en": "India",
          "es": "India",
          "fr": "Inde",
          "it": "India",
          "ja": "\u30a4\u30f3\u30c9",
          "nl": "India"
        },
        "population": 1236670000,
        "latlng": [20, 77],
        "demonym": "Indian",
        "borders": ["AFG", "BGD", "BTN", "MMR", "CHN", "NPL", "PAK", "LKA"]
      },
      {
        "name": "Indonesia",
        "nativeName": "Indonesia",
        "tld": [".id"],
        "cca2": "ID",
        "ccn3": "360",
        "cca3": "IDN",
        "currency": ["IDR"],
        "callingCode": ["62"],
        "capital": "Jakarta",
        "altSpellings": ["ID", "Republic of Indonesia", "Republik Indonesia"],
        "relevance": "2",
        "region": "Asia",
        "subregion": "South-Eastern Asia",
        "language": ["Indonesian"],
        "languagesCodes": ["id"],
        "translations": {},
        "population": 237641326,
        "latlng": [-5, 120],
        "demonym": "Indonesian",
        "borders": ["TLS", "MYS", "PNG"]
      },
      {
        "name": "Iran",
        "nativeName": "Ir\u0101n",
        "tld": [".ir"],
        "cca2": "IR",
        "ccn3": "364",
        "cca3": "IRN",
        "currency": ["IRR"],
        "callingCode": ["98"],
        "capital": "Tehran",
        "altSpellings": ["IR", "Islamic Republic of Iran", "Jomhuri-ye Esl\u0101mi-ye Ir\u0101n"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Southern Asia",
        "language": ["Persian"],
        "languagesCodes": ["fa"],
        "translations": {
          "de": "Iran",
          "en": "Iran",
          "es": "Iran",
          "fr": "Iran",
          "ja": "\u30a4\u30e9\u30f3\u30fb\u30a4\u30b9\u30e9\u30e0\u5171\u548c\u56fd",
          "nl": "Iran"
        },
        "population": 77068000,
        "latlng": [32, 53],
        "demonym": "Iranian",
        "borders": ["AFG", "ARM", "AZE", "IRQ", "PAK", "TUR", "TKM"]
      },
      {
        "name": "Iraq",
        "nativeName": "Ir\u0101q",
        "tld": [".iq"],
        "cca2": "IQ",
        "ccn3": "368",
        "cca3": "IRQ",
        "currency": ["IQD"],
        "callingCode": ["964"],
        "capital": "Baghdad",
        "altSpellings": ["IQ", "Republic of Iraq", "Jumh\u016briyyat al-\u2018Ir\u0101q"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Western Asia",
        "language": ["Arabic", "Kurdish"],
        "languagesCodes": ["ar"],
        "translations": {
          "de": "Irak",
          "en": "Iraq",
          "es": "Irak",
          "fr": "Irak",
          "it": "Iraq",
          "ja": "\u30a4\u30e9\u30af",
          "nl": "Irak"
        },
        "population": 34035000,
        "latlng": [33, 44],
        "demonym": "Iraqi",
        "borders": ["IRN", "JOR", "KWT", "SAU", "SYR", "TUR"]
      },
      {
        "name": "Ireland",
        "nativeName": "\u00c9ire",
        "tld": [".ie"],
        "cca2": "IE",
        "ccn3": "372",
        "cca3": "IRL",
        "currency": ["EUR"],
        "callingCode": ["353"],
        "capital": "Dublin",
        "altSpellings": ["IE", "\u00c9ire", "Republic of Ireland", "Poblacht na h\u00c9ireann"],
        "relevance": "1.2",
        "region": "Europe",
        "subregion": "Northern Europe",
        "language": ["Irish", "English"],
        "languagesCodes": ["en", "ga"],
        "translations": {
          "de": "Irland",
          "en": "Ireland",
          "es": "Irlanda",
          "fr": "Irlande",
          "it": "Irlanda",
          "ja": "\u30a2\u30a4\u30eb\u30e9\u30f3\u30c9",
          "nl": "Ierland"
        },
        "population": -1,
        "latlng": [53, -8],
        "demonym": "Irish",
        "borders": ["GBR"]
      },
      {
        "name": "Isle of Man",
        "nativeName": "Isle of Man",
        "tld": [".im"],
        "cca2": "IM",
        "ccn3": "833",
        "cca3": "IMN",
        "currency": ["GBP"],
        "callingCode": ["44"],
        "capital": "Douglas",
        "altSpellings": ["IM", "Ellan Vannin", "Mann", "Mannin"],
        "relevance": "0.5",
        "region": "Europe",
        "subregion": "Northern Europe",
        "language": ["English", "Manx"],
        "languagesCodes": ["en", "gv"],
        "translations": {
          "de": "Insel Man",
          "en": "Isle of Man",
          "es": "Isla de Man",
          "fr": "\u00cele de Man",
          "it": "Isola di Man",
          "ja": "\u30de\u30f3\u5cf6",
          "nl": "Isle of Man"
        },
        "population": 84497,
        "latlng": [54.25, -4.5],
        "demonym": "Manx",
        "borders": []
      },
      {
        "name": "Israel",
        "nativeName": "Yisr\u0101'el",
        "tld": [".il"],
        "cca2": "IL",
        "ccn3": "376",
        "cca3": "ISR",
        "currency": ["ILS"],
        "callingCode": ["972"],
        "capital": "Jerusalem",
        "altSpellings": ["IL", "State of Israel", "Med\u012bnat Yisr\u0101'el"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Western Asia",
        "language": ["Hebrew", "Arabic"],
        "languagesCodes": ["he", "ar"],
        "translations": {
          "de": "Israel",
          "en": "Israel",
          "es": "Israel",
          "fr": "Isra\u00ebl",
          "it": "Israele",
          "ja": "\u30a4\u30b9\u30e9\u30a8\u30eb",
          "nl": "Isra\u00ebl"
        },
        "population": 8092700,
        "latlng": [31.5, 34.75],
        "demonym": "Israeli",
        "borders": ["EGY", "JOR", "LBN", "SYR"]
      },
      {
        "name": "Italy",
        "nativeName": "Italia",
        "tld": [".it"],
        "cca2": "IT",
        "ccn3": "380",
        "cca3": "ITA",
        "currency": ["EUR"],
        "callingCode": ["39"],
        "capital": "Rome",
        "altSpellings": ["IT", "Italian Republic", "Repubblica italiana"],
        "relevance": "2",
        "region": "Europe",
        "subregion": "Southern Europe",
        "language": ["Italian"],
        "languagesCodes": ["it"],
        "translations": {
          "de": "Italien",
          "en": "Italy",
          "es": "Italia",
          "fr": "Italie",
          "it": "Italia",
          "ja": "\u30a4\u30bf\u30ea\u30a2",
          "nl": "Itali\u00eb"
        },
        "population": 59829079,
        "latlng": [42.83333333, 12.83333333],
        "demonym": "Italian",
        "borders": ["AUT", "FRA", "SMR", "SVN", "CHE", "VAT"]
      },
      {
        "name": "Jamaica",
        "nativeName": "Jamaica",
        "tld": [".jm"],
        "cca2": "JM",
        "ccn3": "388",
        "cca3": "JAM",
        "currency": ["JMD"],
        "callingCode": ["1876"],
        "capital": "Kingston",
        "altSpellings": ["JM"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["Jamaican English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Jamaika",
          "en": "Jamaica",
          "es": "Jamaica",
          "fr": "Jama\u00efque",
          "it": "Giamaica",
          "ja": "\u30b8\u30e3\u30de\u30a4\u30ab",
          "nl": "Jamaica"
        },
        "population": 2711476,
        "latlng": [18.25, -77.5],
        "demonym": "Jamaican",
        "borders": []
      },
      {
        "name": "Japan",
        "nativeName": "\u65e5\u672c",
        "tld": [".jp"],
        "cca2": "JP",
        "ccn3": "392",
        "cca3": "JPN",
        "currency": ["JPY"],
        "callingCode": ["81"],
        "capital": "Tokyo",
        "altSpellings": ["JP", "Nippon", "Nihon"],
        "relevance": "2.5",
        "region": "Asia",
        "subregion": "Eastern Asia",
        "language": ["Japanese"],
        "languagesCodes": ["ja"],
        "translations": {
          "de": "Japan",
          "en": "Japan",
          "es": "Jap\u00f3n",
          "fr": "Japon",
          "it": "Giappone",
          "ja": "\u65e5\u672c",
          "nl": "Japan"
        },
        "population": 127290000,
        "latlng": [36, 138],
        "demonym": "Japanese",
        "borders": []
      },
      {
        "name": "Jersey",
        "nativeName": "Jersey",
        "tld": [".je"],
        "cca2": "JE",
        "ccn3": "832",
        "cca3": "JEY",
        "currency": ["GBP"],
        "callingCode": ["44"],
        "capital": "Saint Helier",
        "altSpellings": ["JE", "Bailiwick of Jersey", "Bailliage de Jersey", "Bailliage d\u00e9 J\u00e8rri"],
        "relevance": "0.5",
        "region": "Europe",
        "subregion": "Northern Europe",
        "language": ["English", "French"],
        "languagesCodes": ["en", "fr"],
        "translations": {
          "de": "Jersey",
          "en": "Jersey",
          "es": "Jersey",
          "fr": "Jersey",
          "it": "Isola di Jersey",
          "ja": "\u30b8\u30e3\u30fc\u30b8\u30fc",
          "nl": "Jersey"
        },
        "population": 97857,
        "latlng": [49.25, -2.16666666],
        "demonym": "Channel Islander",
        "borders": []
      },
      {
        "name": "Jordan",
        "nativeName": "al-Urdun",
        "tld": [".jo"],
        "cca2": "JO",
        "ccn3": "400",
        "cca3": "JOR",
        "currency": ["JOD"],
        "callingCode": ["962"],
        "capital": "Amman",
        "altSpellings": ["JO", "Hashemite Kingdom of Jordan", "al-Mamlakah al-Urdun\u012byah al-H\u0101shim\u012byah"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Western Asia",
        "language": ["Arabic"],
        "languagesCodes": ["ar"],
        "translations": {
          "de": "Jordanien",
          "en": "Jordan",
          "es": "Jordania",
          "fr": "Jordanie",
          "it": "Giordania",
          "ja": "\u30e8\u30eb\u30c0\u30f3",
          "nl": "Jordani\u00eb"
        },
        "population": 6512600,
        "latlng": [31, 36],
        "demonym": "Jordanian",
        "borders": ["IRQ", "ISR", "SAU", "SYR"]
      },
      {
        "name": "Kazakhstan",
        "nativeName": "\u049a\u0430\u0437\u0430\u049b\u0441\u0442\u0430\u043d",
        "tld": [".kz", ".\u049b\u0430\u0437"],
        "cca2": "KZ",
        "ccn3": "398",
        "cca3": "KAZ",
        "currency": ["KZT"],
        "callingCode": ["76", "77"],
        "capital": "Astana",
        "altSpellings": ["KZ", "Qazaqstan", "\u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d", "Republic of Kazakhstan", "\u049a\u0430\u0437\u0430\u049b\u0441\u0442\u0430\u043d \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0441\u044b", "Qazaqstan Respubl\u00efkas\u0131", "\u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d", "Respublika Kazakhstan"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Central Asia",
        "language": ["Kazakh", "Russian"],
        "languagesCodes": ["kk", "ru"],
        "translations": {
          "de": "Kasachstan",
          "en": "Kazakhstan",
          "es": "Kazajist\u00e1n",
          "fr": "Kazakhstan",
          "it": "Kazakistan",
          "ja": "\u30ab\u30b6\u30d5\u30b9\u30bf\u30f3",
          "nl": "Kazachstan"
        },
        "population": 17099000,
        "latlng": [48, 68],
        "demonym": "Kazakhstani",
        "borders": ["CHN", "KGZ", "RUS", "TKM", "UZB"]
      },
      {
        "name": "Kenya",
        "nativeName": "Kenya",
        "tld": [".ke"],
        "cca2": "KE",
        "ccn3": "404",
        "cca3": "KEN",
        "currency": ["KES"],
        "callingCode": ["254"],
        "capital": "Nairobi",
        "altSpellings": ["KE", "Republic of Kenya", "Jamhuri ya Kenya"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Eastern Africa",
        "language": ["Swahili", "English"],
        "languagesCodes": ["en", "sw"],
        "translations": {
          "de": "Kenia",
          "en": "Kenya",
          "es": "Kenia",
          "fr": "Kenya",
          "it": "Kenya",
          "ja": "\u30b1\u30cb\u30a2",
          "nl": "Kenia"
        },
        "population": 44354000,
        "latlng": [1, 38],
        "demonym": "Kenyan",
        "borders": ["ETH", "SOM", "SSD", "TZA", "UGA"]
      },
      {
        "name": "Kiribati",
        "nativeName": "Kiribati",
        "tld": [".ki"],
        "cca2": "KI",
        "ccn3": "296",
        "cca3": "KIR",
        "currency": ["AUD"],
        "callingCode": ["686"],
        "capital": "South Tarawa",
        "altSpellings": ["KI", "Republic of Kiribati", "Ribaberiki Kiribati"],
        "relevance": "0",
        "region": "Oceania",
        "subregion": "Micronesia",
        "language": ["English", "Gilbertese"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Kiribati",
          "en": "Kiribati",
          "es": "Kiribati",
          "fr": "Kiribati",
          "it": "Kiribati",
          "ja": "\u30ad\u30ea\u30d0\u30b9",
          "nl": "Kiribati"
        },
        "population": 106461,
        "latlng": [1.41666666, 173],
        "demonym": "I-Kiribati",
        "borders": []
      },
      {
        "name": "Kuwait",
        "nativeName": "al-Kuwayt",
        "tld": [".kw"],
        "cca2": "KW",
        "ccn3": "414",
        "cca3": "KWT",
        "currency": ["KWD"],
        "callingCode": ["965"],
        "capital": "Kuwait City",
        "altSpellings": ["KW", "State of Kuwait", "Dawlat al-Kuwait"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Western Asia",
        "language": ["Arabic"],
        "languagesCodes": ["ar"],
        "translations": {
          "de": "Kuwait",
          "en": "Kuwait",
          "es": "Kuwait",
          "fr": "Kowe\u00eft",
          "it": "Kuwait",
          "ja": "\u30af\u30a6\u30a7\u30fc\u30c8",
          "nl": "Koeweit"
        },
        "population": 3582054,
        "latlng": [29.5, 45.75],
        "demonym": "Kuwaiti",
        "borders": ["IRN", "SAU"]
      },
      {
        "name": "Kyrgyzstan",
        "nativeName": "\u041a\u044b\u0440\u0433\u044b\u0437\u0441\u0442\u0430\u043d",
        "tld": [".kg"],
        "cca2": "KG",
        "ccn3": "417",
        "cca3": "KGZ",
        "currency": ["KGS"],
        "callingCode": ["996"],
        "capital": "Bishkek",
        "altSpellings": ["KG", "\u041a\u0438\u0440\u0433\u0438\u0437\u0438\u044f", "Kyrgyz Republic", "\u041a\u044b\u0440\u0433\u044b\u0437 \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0441\u044b", "Kyrgyz Respublikasy"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Central Asia",
        "language": ["Kyrgyz", "Russian"],
        "languagesCodes": ["ky", "ru"],
        "translations": {
          "de": "Kirgisistan",
          "en": "Kyrgyzstan",
          "es": "Kirguizist\u00e1n",
          "fr": "Kirghizistan",
          "it": "Kirghizistan",
          "ja": "\u30ad\u30eb\u30ae\u30b9",
          "nl": "Kirgizi\u00eb"
        },
        "population": 5551900,
        "latlng": [41, 75],
        "demonym": "Kirghiz",
        "borders": ["CHN", "KAZ", "TJK", "UZB"]
      },
      {
        "name": "Laos",
        "nativeName": "\u0eaa\u0e9b\u0e9b\u0ea5\u0eb2\u0ea7",
        "tld": [".la"],
        "cca2": "LA",
        "ccn3": "418",
        "cca3": "LAO",
        "currency": ["LAK"],
        "callingCode": ["856"],
        "capital": "Vientiane",
        "altSpellings": ["LA", "Lao", "Lao People's Democratic Republic", "Sathalanalat Paxathipatai Paxaxon Lao"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "South-Eastern Asia",
        "language": ["Lao"],
        "languagesCodes": [],
        "translations": {},
        "population": 6580800,
        "latlng": [18, 105],
        "demonym": "Laotian",
        "borders": ["MMR", "KHM", "CHN", "THA", "VNM"]
      },
      {
        "name": "Latvia",
        "nativeName": "Latvija",
        "tld": [".lv"],
        "cca2": "LV",
        "ccn3": "428",
        "cca3": "LVA",
        "currency": ["LVL"],
        "callingCode": ["371"],
        "capital": "Riga",
        "altSpellings": ["LV", "Republic of Latvia", "Latvijas Republika"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Northern Europe",
        "language": ["Latvian"],
        "languagesCodes": ["lv"],
        "translations": {
          "de": "Lettland",
          "en": "Latvia",
          "es": "Letonia",
          "fr": "Lettonie",
          "it": "Lettonia",
          "ja": "\u30e9\u30c8\u30d3\u30a2",
          "nl": "Letland"
        },
        "population": 2014000,
        "latlng": [57, 25],
        "demonym": "Latvian",
        "borders": ["BLR", "EST", "LTU", "RUS"]
      },
      {
        "name": "Lebanon",
        "nativeName": "Libn\u0101n",
        "tld": [".lb"],
        "cca2": "LB",
        "ccn3": "422",
        "cca3": "LBN",
        "currency": ["LBP"],
        "callingCode": ["961"],
        "capital": "Beirut",
        "altSpellings": ["LB", "Lebanese Republic", "Al-Jumh\u016br\u012byah Al-Libn\u0101n\u012byah"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Western Asia",
        "language": ["Arabic", "French"],
        "languagesCodes": ["ar", "fr"],
        "translations": {
          "de": "Libanon",
          "en": "Lebanon",
          "es": "L\u00edbano",
          "fr": "Liban",
          "it": "Libano",
          "ja": "\u30ec\u30d0\u30ce\u30f3",
          "nl": "Libanon"
        },
        "population": 4822000,
        "latlng": [33.83333333, 35.83333333],
        "demonym": "Lebanese",
        "borders": ["ISR", "SYR"]
      },
      {
        "name": "Lesotho",
        "nativeName": "Lesotho",
        "tld": [".ls"],
        "cca2": "LS",
        "ccn3": "426",
        "cca3": "LSO",
        "currency": ["LSL", "ZAR"],
        "callingCode": ["266"],
        "capital": "Maseru",
        "altSpellings": ["LS", "Kingdom of Lesotho", "Muso oa Lesotho"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Southern Africa",
        "language": ["Sesotho", "English"],
        "languagesCodes": ["en", "st"],
        "translations": {
          "de": "Lesotho",
          "en": "Lesotho",
          "es": "Lesotho",
          "fr": "Lesotho",
          "it": "Lesotho",
          "ja": "\u30ec\u30bd\u30c8",
          "nl": "Lesotho"
        },
        "population": 2074000,
        "latlng": [-29.5, 28.5],
        "demonym": "Mosotho",
        "borders": ["ZAF"]
      },
      {
        "name": "Liberia",
        "nativeName": "Liberia",
        "tld": [".lr"],
        "cca2": "LR",
        "ccn3": "430",
        "cca3": "LBR",
        "currency": ["LRD"],
        "callingCode": ["231"],
        "capital": "Monrovia",
        "altSpellings": ["LR", "Republic of Liberia"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Western Africa",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Liberia",
          "en": "Liberia",
          "es": "Liberia",
          "fr": "Liberia",
          "it": "Liberia",
          "ja": "\u30ea\u30d9\u30ea\u30a2",
          "nl": "Liberia"
        },
        "population": 4294000,
        "latlng": [6.5, -9.5],
        "demonym": "Liberian",
        "borders": ["GIN", "CIV", "SLE"]
      },
      {
        "name": "Libya",
        "nativeName": "L\u012bby\u0101",
        "tld": [".ly"],
        "cca2": "LY",
        "ccn3": "434",
        "cca3": "LBY",
        "currency": ["LYD"],
        "callingCode": ["218"],
        "capital": "Tripoli",
        "altSpellings": ["LY", "State of Libya", "Dawlat Libya"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Northern Africa",
        "language": ["Arabic"],
        "languagesCodes": ["ar"],
        "translations": {
          "de": "Libyen",
          "en": "Libya",
          "es": "Libia",
          "fr": "Libye",
          "it": "Libia",
          "ja": "\u30ea\u30d3\u30a2",
          "nl": "Libi\u00eb"
        },
        "population": 6202000,
        "latlng": [25, 17],
        "demonym": "Libyan",
        "borders": ["DZA", "TCD", "EGY", "NER", "SDN", "TUN"]
      },
      {
        "name": "Liechtenstein",
        "nativeName": "Liechtenstein",
        "tld": [".li"],
        "cca2": "LI",
        "ccn3": "438",
        "cca3": "LIE",
        "currency": ["CHF"],
        "callingCode": ["423"],
        "capital": "Vaduz",
        "altSpellings": ["LI", "Principality of Liechtenstein", "F\u00fcrstentum Liechtenstein"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Western Europe",
        "language": ["German"],
        "languagesCodes": ["de"],
        "translations": {
          "de": "Liechtenstein",
          "en": "Liechtenstein",
          "es": "Liechtenstein",
          "fr": "Liechtenstein",
          "it": "Liechtenstein",
          "ja": "\u30ea\u30d2\u30c6\u30f3\u30b7\u30e5\u30bf\u30a4\u30f3",
          "nl": "Liechtenstein"
        },
        "population": 36842,
        "latlng": [47.26666666, 9.53333333],
        "demonym": "Liechtensteiner",
        "borders": ["AUT", "CHE"]
      },
      {
        "name": "Lithuania",
        "nativeName": "Lietuva",
        "tld": [".lt"],
        "cca2": "LT",
        "ccn3": "440",
        "cca3": "LTU",
        "currency": ["LTL"],
        "callingCode": ["370"],
        "capital": "Vilnius",
        "altSpellings": ["LT", "Republic of Lithuania", "Lietuvos Respublika"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Northern Europe",
        "language": ["Lithuanian"],
        "languagesCodes": ["lt"],
        "translations": {
          "de": "Litauen",
          "en": "Lithuania",
          "es": "Lituania",
          "fr": "Lituanie",
          "it": "Lituania",
          "ja": "\u30ea\u30c8\u30a2\u30cb\u30a2",
          "nl": "Litouwen"
        },
        "population": 2950684,
        "latlng": [56, 24],
        "demonym": "Lithuanian",
        "borders": ["BLR", "LVA", "POL", "RUS"]
      },
      {
        "name": "Luxembourg",
        "nativeName": "Luxembourg",
        "tld": [".lu"],
        "cca2": "LU",
        "ccn3": "442",
        "cca3": "LUX",
        "currency": ["EUR"],
        "callingCode": ["352"],
        "capital": "Luxembourg",
        "altSpellings": ["LU", "Grand Duchy of Luxembourg", "Grand-Duch\u00e9 de Luxembourg", "Gro\u00dfherzogtum Luxemburg", "Groussherzogtum L\u00ebtzebuerg"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Western Europe",
        "language": ["French", "German", "Luxembourgish"],
        "languagesCodes": ["fr", "de", "lb"],
        "translations": {
          "de": "Luxemburg",
          "en": "Luxembourg",
          "es": "Luxemburgo",
          "fr": "Luxembourg",
          "it": "Lussemburgo",
          "ja": "\u30eb\u30af\u30bb\u30f3\u30d6\u30eb\u30af",
          "nl": "Luxemburg"
        },
        "population": 537000,
        "latlng": [49.75, 6.16666666],
        "demonym": "Luxembourger",
        "borders": ["BEL", "FRA", "DEU"]
      },
      {
        "name": "Macau",
        "nativeName": "\u6fb3\u9580",
        "tld": [".mo"],
        "cca2": "MO",
        "ccn3": "446",
        "cca3": "MAC",
        "currency": ["MOP"],
        "callingCode": ["853"],
        "capital": "",
        "altSpellings": ["MO", "\u6fb3\u95e8", "Macao Special Administrative Region of the People's Republic of China", "\u4e2d\u83ef\u4eba\u6c11\u5171\u548c\u570b\u6fb3\u9580\u7279\u5225\u884c\u653f\u5340", "Regi\u00e3o Administrativa Especial de Macau da Rep\u00fablica Popular da China"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Eastern Asia",
        "language": ["Traditional Chinese", "Portuguese"],
        "languagesCodes": ["zh", "pt"],
        "translations": {
          "de": "Macao",
          "en": "Macao",
          "es": "Macao",
          "fr": "Macao",
          "it": "Macao",
          "ja": "\u30de\u30ab\u30aa",
          "nl": "Macao"
        },
        "population": -1,
        "latlng": [22.16666666, 113.55],
        "demonym": "Chinese",
        "borders": ["CHN"]
      },
      {
        "name": "Macedonia",
        "nativeName": "\u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0438\u0458\u0430",
        "tld": [".mk"],
        "cca2": "MK",
        "ccn3": "807",
        "cca3": "MKD",
        "currency": ["MKD"],
        "callingCode": ["389"],
        "capital": "Skopje",
        "altSpellings": ["MK", "Republic of Macedonia", "\u0420\u0435\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0438\u0458\u0430"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Southern Europe",
        "language": ["Macedonian"],
        "languagesCodes": ["mk"],
        "translations": {
          "de": "Mazedonien",
          "en": "Macedonia",
          "es": "Macedonia",
          "fr": "Mac\u00e9doine",
          "it": "Macedonia",
          "ja": "\u30de\u30b1\u30c9\u30cb\u30a2\u65e7\u30e6\u30fc\u30b4\u30b9\u30e9\u30d3\u30a2\u5171\u548c\u56fd",
          "nl": "Macedoni\u00eb [FYROM]"
        },
        "population": -1,
        "latlng": [41.83333333, 22],
        "demonym": "Macedonian",
        "borders": ["ALB", "BGR", "GRC", "KOS", "SRB"]
      },
      {
        "name": "Madagascar",
        "nativeName": "Madagasikara",
        "tld": [".mg"],
        "cca2": "MG",
        "ccn3": "450",
        "cca3": "MDG",
        "currency": ["MGA"],
        "callingCode": ["261"],
        "capital": "Antananarivo",
        "altSpellings": ["MG", "Republic of Madagascar", "Repoblikan'i Madagasikara", "R\u00e9publique de Madagascar"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Eastern Africa",
        "language": ["Malagasy", "French"],
        "languagesCodes": ["fr", "mg"],
        "translations": {
          "de": "Madagaskar",
          "en": "Madagascar",
          "es": "Madagascar",
          "fr": "Madagascar",
          "it": "Madagascar",
          "ja": "\u30de\u30c0\u30ac\u30b9\u30ab\u30eb",
          "nl": "Madagaskar"
        },
        "population": 20696070,
        "latlng": [-20, 47],
        "demonym": "Malagasy",
        "borders": []
      },
      {
        "name": "Malawi",
        "nativeName": "Malawi",
        "tld": [".mw"],
        "cca2": "MW",
        "ccn3": "454",
        "cca3": "MWI",
        "currency": ["MWK"],
        "callingCode": ["265"],
        "capital": "Lilongwe",
        "altSpellings": ["MW", "Republic of Malawi"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Eastern Africa",
        "language": ["Chichewa", "English"],
        "languagesCodes": ["en", "ny"],
        "translations": {
          "de": "Malawi",
          "en": "Malawi",
          "es": "Malawi",
          "fr": "Malawi",
          "it": "Malawi",
          "ja": "\u30de\u30e9\u30a6\u30a4",
          "nl": "Malawi"
        },
        "population": 16363000,
        "latlng": [-13.5, 34],
        "demonym": "Malawian",
        "borders": ["MOZ", "TZA", "ZMB"]
      },
      {
        "name": "Malaysia",
        "nativeName": "Malaysia",
        "tld": [".my"],
        "cca2": "MY",
        "ccn3": "458",
        "cca3": "MYS",
        "currency": ["MYR"],
        "callingCode": ["60"],
        "capital": "Kuala Lumpur",
        "altSpellings": ["MY"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "South-Eastern Asia",
        "language": ["Malaysian"],
        "languagesCodes": [],
        "translations": {},
        "population": 29793600,
        "latlng": [2.5, 112.5],
        "demonym": "Malaysian",
        "borders": ["BRN", "IDN", "THA"]
      },
      {
        "name": "Maldives",
        "nativeName": "Maldives",
        "tld": [".mv"],
        "cca2": "MV",
        "ccn3": "462",
        "cca3": "MDV",
        "currency": ["MVR"],
        "callingCode": ["960"],
        "capital": "Mal\u00e9",
        "altSpellings": ["MV", "Maldive Islands", "Republic of the Maldives", "Dhivehi Raajjeyge Jumhooriyya"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Southern Asia",
        "language": ["Maldivian"],
        "languagesCodes": ["dv"],
        "translations": {
          "de": "Malediven",
          "en": "Maldives",
          "es": "Maldivas",
          "fr": "Maldives",
          "it": "Maldive",
          "ja": "\u30e2\u30eb\u30c7\u30a3\u30d6",
          "nl": "Maldiven"
        },
        "population": 317280,
        "latlng": [3.25, 73],
        "demonym": "Maldivan",
        "borders": []
      },
      {
        "name": "Mali",
        "nativeName": "Mali",
        "tld": [".ml"],
        "cca2": "ML",
        "ccn3": "466",
        "cca3": "MLI",
        "currency": ["XOF"],
        "callingCode": ["223"],
        "capital": "Bamako",
        "altSpellings": ["ML", "Republic of Mali", "R\u00e9publique du Mali"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Western Africa",
        "language": ["French"],
        "languagesCodes": ["fr"],
        "translations": {
          "de": "Mali",
          "en": "Mali",
          "es": "Mali",
          "fr": "Mali",
          "it": "Mali",
          "ja": "\u30de\u30ea",
          "nl": "Mali"
        },
        "population": 15302000,
        "latlng": [17, -4],
        "demonym": "Malian",
        "borders": ["DZA", "BFA", "GIN", "CIV", "MRT", "NER", "SEN"]
      },
      {
        "name": "Malta",
        "nativeName": "Malta",
        "tld": [".mt"],
        "cca2": "MT",
        "ccn3": "470",
        "cca3": "MLT",
        "currency": ["EUR"],
        "callingCode": ["356"],
        "capital": "Valletta",
        "altSpellings": ["MT", "Republic of Malta", "Repubblika ta' Malta"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Southern Europe",
        "language": ["Maltese", "English"],
        "languagesCodes": ["mt", "en"],
        "translations": {
          "de": "Malta",
          "en": "Malta",
          "es": "Malta",
          "fr": "Malte",
          "it": "Malta",
          "ja": "\u30de\u30eb\u30bf",
          "nl": "Malta"
        },
        "population": 416055,
        "latlng": [35.83333333, 14.58333333],
        "demonym": "Maltese",
        "borders": []
      },
      {
        "name": "Marshall Islands",
        "nativeName": "M\u0327aje\u013c",
        "tld": [".mh"],
        "cca2": "MH",
        "ccn3": "584",
        "cca3": "MHL",
        "currency": ["USD"],
        "callingCode": ["692"],
        "capital": "Majuro",
        "altSpellings": ["MH", "Republic of the Marshall Islands", "Aolep\u0101n Aor\u014dkin M\u0327aje\u013c"],
        "relevance": "0.5",
        "region": "Oceania",
        "subregion": "Micronesia",
        "language": ["Marshallese", "English"],
        "languagesCodes": ["en", "mh"],
        "translations": {
          "de": "Marshallinseln",
          "en": "Marshall Islands",
          "es": "Islas Marshall",
          "fr": "\u00celes Marshall",
          "it": "Isole Marshall",
          "ja": "\u30de\u30fc\u30b7\u30e3\u30eb\u8af8\u5cf6",
          "nl": "Marshalleilanden"
        },
        "population": 56086,
        "latlng": [9, 168],
        "demonym": "Marshallese",
        "borders": []
      },
      {
        "name": "Martinique",
        "nativeName": "Martinique",
        "tld": [".mq"],
        "cca2": "MQ",
        "ccn3": "474",
        "cca3": "MTQ",
        "currency": ["EUR"],
        "callingCode": ["596"],
        "capital": "Fort-de-France",
        "altSpellings": ["MQ"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["French"],
        "languagesCodes": ["fr"],
        "translations": {
          "de": "Martinique",
          "en": "Martinique",
          "es": "Martinica",
          "fr": "Martinique",
          "it": "Martinica",
          "ja": "\u30de\u30eb\u30c6\u30a3\u30cb\u30fc\u30af",
          "nl": "Martinique"
        },
        "population": 394173,
        "latlng": [14.666667, -61],
        "demonym": "French",
        "borders": []
      },
      {
        "name": "Mauritania",
        "nativeName": "M\u016br\u012bt\u0101ny\u0101",
        "tld": [".mr"],
        "cca2": "MR",
        "ccn3": "478",
        "cca3": "MRT",
        "currency": ["MRO"],
        "callingCode": ["222"],
        "capital": "Nouakchott",
        "altSpellings": ["MR", "Islamic Republic of Mauritania", "al-Jumh\u016briyyah al-\u02beIsl\u0101miyyah al-M\u016br\u012bt\u0101niyyah"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Western Africa",
        "language": ["Arabic"],
        "languagesCodes": ["ar", "fr"],
        "translations": {
          "de": "Mauretanien",
          "en": "Mauritania",
          "es": "Mauritania",
          "fr": "Mauritanie",
          "it": "Mauritania",
          "ja": "\u30e2\u30fc\u30ea\u30bf\u30cb\u30a2",
          "nl": "Mauritani\u00eb"
        },
        "population": 3461041,
        "latlng": [20, -12],
        "demonym": "Mauritanian",
        "borders": ["DZA", "MLI", "SEN", "ESH"]
      },
      {
        "name": "Mauritius",
        "nativeName": "Maurice",
        "tld": [".mu"],
        "cca2": "MU",
        "ccn3": "480",
        "cca3": "MUS",
        "currency": ["MUR"],
        "callingCode": ["230"],
        "capital": "Port Louis",
        "altSpellings": ["MU", "Republic of Mauritius", "R\u00e9publique de Maurice"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Eastern Africa",
        "language": ["French"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Mauritius",
          "en": "Mauritius",
          "es": "Mauricio",
          "fr": "\u00cele Maurice",
          "it": "Mauritius",
          "ja": "\u30e2\u30fc\u30ea\u30b7\u30e3\u30b9",
          "nl": "Mauritius"
        },
        "population": 1257900,
        "latlng": [-20.28333333, 57.55],
        "demonym": "Mauritian",
        "borders": []
      },
      {
        "name": "Mayotte",
        "nativeName": "Mayotte",
        "tld": [".yt"],
        "cca2": "YT",
        "ccn3": "175",
        "cca3": "MYT",
        "currency": ["EUR"],
        "callingCode": ["262"],
        "capital": "Mamoudzou",
        "altSpellings": ["YT", "Department of Mayotte", "D\u00e9partement de Mayotte"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Eastern Africa",
        "language": ["French"],
        "languagesCodes": ["fr"],
        "translations": {
          "de": "Mayotte",
          "en": "Mayotte",
          "es": "Mayotte",
          "fr": "Mayotte",
          "it": "Mayotte",
          "ja": "\u30de\u30e8\u30c3\u30c8",
          "nl": "Mayotte"
        },
        "population": 212600,
        "latlng": [-12.83333333, 45.16666666],
        "demonym": "French",
        "borders": []
      },
      {
        "name": "Mexico",
        "nativeName": "M\u00e9xico",
        "tld": [".mx"],
        "cca2": "MX",
        "ccn3": "484",
        "cca3": "MEX",
        "currency": ["MXN"],
        "callingCode": ["52"],
        "capital": "Mexico City",
        "altSpellings": ["MX", "Mexicanos", "United Mexican States", "Estados Unidos Mexicanos"],
        "relevance": "1.5",
        "region": "Americas",
        "subregion": "Central America",
        "language": ["Spanish"],
        "languagesCodes": ["es"],
        "translations": {
          "de": "Mexiko",
          "en": "Mexico",
          "es": "M\u00e9xico",
          "fr": "Mexique",
          "it": "Messico",
          "ja": "\u30e1\u30ad\u30b7\u30b3",
          "nl": "Mexico"
        },
        "population": 118395054,
        "latlng": [23, -102],
        "demonym": "Mexican",
        "borders": ["BLZ", "GTM", "USA"]
      },
      {
        "name": "Micronesia",
        "nativeName": "Micronesia",
        "tld": [".fm"],
        "cca2": "FM",
        "ccn3": "583",
        "cca3": "FSM",
        "currency": ["USD"],
        "callingCode": ["691"],
        "capital": "Palikir",
        "altSpellings": ["FM", "Federated States of Micronesia"],
        "relevance": "0",
        "region": "Oceania",
        "subregion": "Micronesia",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Mikronesien",
          "en": "Micronesia",
          "es": "Micronesia",
          "fr": "Micron\u00e9sie",
          "it": "Micronesia",
          "ja": "\u30df\u30af\u30ed\u30cd\u30b7\u30a2\u9023\u90a6",
          "nl": "Micronesi\u00eb"
        },
        "population": -1,
        "latlng": [6.91666666, 158.25],
        "demonym": "Micronesian",
        "borders": []
      },
      {
        "name": "Moldova",
        "nativeName": "Moldova",
        "tld": [".md"],
        "cca2": "MD",
        "ccn3": "498",
        "cca3": "MDA",
        "currency": ["MDL"],
        "callingCode": ["373"],
        "capital": "Chi\u0219in\u0103u",
        "altSpellings": ["MD", "Republic of Moldova", "Republica Moldova"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Eastern Europe",
        "language": ["Moldovan"],
        "languagesCodes": ["ro"],
        "translations": {
          "de": "Moldawie",
          "en": "Moldova",
          "es": "Moldavia",
          "fr": "Moldavie",
          "it": "Moldavia",
          "ja": "\u30e2\u30eb\u30c9\u30d0\u5171\u548c\u56fd",
          "nl": "Moldavi\u00eb"
        },
        "population": 3559500,
        "latlng": [47, 29],
        "demonym": "Moldovan",
        "borders": ["ROU", "UKR"]
      },
      {
        "name": "Monaco",
        "nativeName": "Monaco",
        "tld": [".mc"],
        "cca2": "MC",
        "ccn3": "492",
        "cca3": "MCO",
        "currency": ["EUR"],
        "callingCode": ["377"],
        "capital": "Monaco",
        "altSpellings": ["MC", "Principality of Monaco", "Principaut\u00e9 de Monaco"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Western Europe",
        "language": ["French"],
        "languagesCodes": ["fr"],
        "translations": {
          "de": "Monaco",
          "en": "Monaco",
          "es": "M\u00f3naco",
          "fr": "Monaco",
          "it": "Principato di Monaco",
          "ja": "\u30e2\u30ca\u30b3",
          "nl": "Monaco"
        },
        "population": 36136,
        "latlng": [43.73333333, 7.4],
        "demonym": "Monegasque",
        "borders": ["FRA"]
      },
      {
        "name": "Mongolia",
        "nativeName": "\u041c\u043e\u043d\u0433\u043e\u043b \u0443\u043b\u0441",
        "tld": [".mn"],
        "cca2": "MN",
        "ccn3": "496",
        "cca3": "MNG",
        "currency": ["MNT"],
        "callingCode": ["976"],
        "capital": "Ulan Bator",
        "altSpellings": ["MN"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Eastern Asia",
        "language": ["Mongolian"],
        "languagesCodes": ["mn"],
        "translations": {
          "de": "Mongolei",
          "en": "Mongolia",
          "es": "Mongolia",
          "fr": "Mongolie",
          "it": "Mongolia",
          "ja": "\u30e2\u30f3\u30b4\u30eb",
          "nl": "Mongoli\u00eb"
        },
        "population": 2754685,
        "latlng": [46, 105],
        "demonym": "Mongolian",
        "borders": ["CHN", "RUS"]
      },
      {
        "name": "Montenegro",
        "nativeName": "\u0426\u0440\u043d\u0430 \u0413\u043e\u0440\u0430",
        "tld": [".me"],
        "cca2": "ME",
        "ccn3": "499",
        "cca3": "MNE",
        "currency": ["EUR"],
        "callingCode": ["382"],
        "capital": "Podgorica",
        "altSpellings": ["ME", "Crna Gora"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Southern Europe",
        "language": ["Montenegrin"],
        "languagesCodes": ["sr", "bs", "sq", "hr"],
        "translations": {
          "de": "Montenegro",
          "en": "Crna Gora",
          "es": "Montenegro",
          "fr": "Mont\u00e9n\u00e9gro",
          "it": "Montenegro",
          "ja": "\u30e2\u30f3\u30c6\u30cd\u30b0\u30ed",
          "nl": "Montenegro"
        },
        "population": 620029,
        "latlng": [42.5, 19.3],
        "demonym": "Montenegrin",
        "borders": ["ALB", "BIH", "HRV", "KOS", "SRB"]
      },
      {
        "name": "Montserrat",
        "nativeName": "Montserrat",
        "tld": [".ms"],
        "cca2": "MS",
        "ccn3": "500",
        "cca3": "MSR",
        "currency": ["XCD"],
        "callingCode": ["1664"],
        "capital": "Plymouth",
        "altSpellings": ["MS"],
        "relevance": "0.5",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Montserrat",
          "en": "Montserrat",
          "es": "Montserrat",
          "fr": "Montserrat",
          "it": "Montserrat",
          "ja": "\u30e2\u30f3\u30c8\u30bb\u30e9\u30c8",
          "nl": "Montserrat"
        },
        "population": 4922,
        "latlng": [16.75, -62.2],
        "demonym": "Montserratian",
        "borders": []
      },
      {
        "name": "Morocco",
        "nativeName": "al-Ma\u0121rib",
        "tld": [".ma"],
        "cca2": "MA",
        "ccn3": "504",
        "cca3": "MAR",
        "currency": ["MAD"],
        "callingCode": ["212"],
        "capital": "Rabat",
        "altSpellings": ["MA", "Kingdom of Morocco", "Al-Mamlakah al-Ma\u0121ribiyah"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Northern Africa",
        "language": ["Arabic", "Tamazight"],
        "languagesCodes": ["ar"],
        "translations": {
          "de": "Marokko",
          "en": "Morocco",
          "es": "Marruecos",
          "fr": "Maroc",
          "it": "Marocco",
          "ja": "\u30e2\u30ed\u30c3\u30b3",
          "nl": "Marokko"
        },
        "population": 33087700,
        "latlng": [32, -5],
        "demonym": "Moroccan",
        "borders": ["DZA", "ESH", "ESP"]
      },
      {
        "name": "Mozambique",
        "nativeName": "Mo\u00e7ambique",
        "tld": [".mz"],
        "cca2": "MZ",
        "ccn3": "508",
        "cca3": "MOZ",
        "currency": ["MZN"],
        "callingCode": ["258"],
        "capital": "Maputo",
        "altSpellings": ["MZ", "Republic of Mozambique", "Rep\u00fablica de Mo\u00e7ambique"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Eastern Africa",
        "language": ["Portuguese"],
        "languagesCodes": ["pt"],
        "translations": {
          "de": "Mosambik",
          "en": "Mozambique",
          "es": "Mozambique",
          "fr": "Mozambique",
          "it": "Mozambico",
          "ja": "\u30e2\u30b6\u30f3\u30d3\u30fc\u30af",
          "nl": "Mozambique"
        },
        "population": 23700715,
        "latlng": [-18.25, 35],
        "demonym": "Mozambican",
        "borders": ["MWI", "ZAF", "SWZ", "TZA", "ZMB", "ZWE"]
      },
      {
        "name": "Myanmar",
        "nativeName": "Myanma",
        "tld": [".mm"],
        "cca2": "MM",
        "ccn3": "104",
        "cca3": "MMR",
        "currency": ["MMK"],
        "callingCode": ["95"],
        "capital": "Naypyidaw",
        "altSpellings": ["MM", "Burma", "Republic of the Union of Myanmar", "Pyidaunzu Thanm\u0103da My\u0103ma Nainngandaw"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "South-Eastern Asia",
        "language": ["Burmese"],
        "languagesCodes": [],
        "translations": {},
        "population": -1,
        "latlng": [22, 98],
        "demonym": "Myanmarian",
        "borders": []
      },
      {
        "name": "Namibia",
        "nativeName": "Namibia",
        "tld": [".na"],
        "cca2": "NA",
        "ccn3": "516",
        "cca3": "NAM",
        "currency": ["NAD", "ZAR"],
        "callingCode": ["264"],
        "capital": "Windhoek",
        "altSpellings": ["NA", "Namibi\u00eb", "Republic of Namibia"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Southern Africa",
        "language": ["English"],
        "languagesCodes": ["en", "af"],
        "translations": {
          "de": "Namibia",
          "en": "Namibia",
          "es": "Namibia",
          "fr": "Namibie",
          "it": "Namibia",
          "ja": "\u30ca\u30df\u30d3\u30a2",
          "nl": "Namibi\u00eb"
        },
        "population": 2113077,
        "latlng": [-22, 17],
        "demonym": "Namibian",
        "borders": ["AGO", "BWA", "ZAF", "ZMB"]
      },
      {
        "name": "Nauru",
        "nativeName": "Nauru",
        "tld": [".nr"],
        "cca2": "NR",
        "ccn3": "520",
        "cca3": "NRU",
        "currency": ["AUD"],
        "callingCode": ["674"],
        "capital": "Yaren",
        "altSpellings": ["NR", "Naoero", "Pleasant Island", "Republic of Nauru", "Ripublik Naoero"],
        "relevance": "0.5",
        "region": "Oceania",
        "subregion": "Micronesia",
        "language": ["Nauruan", "English"],
        "languagesCodes": ["en", "na"],
        "translations": {
          "de": "Nauru",
          "en": "Nauru",
          "es": "Nauru",
          "fr": "Nauru",
          "it": "Nauru",
          "ja": "\u30ca\u30a6\u30eb",
          "nl": "Nauru"
        },
        "population": 9945,
        "latlng": [-0.53333333, 166.91666666],
        "demonym": "Nauruan",
        "borders": []
      },
      {
        "name": "Nepal",
        "nativeName": "\u0928\u092a\u0932",
        "tld": [".np"],
        "cca2": "NP",
        "ccn3": "524",
        "cca3": "NPL",
        "currency": ["NPR"],
        "callingCode": ["977"],
        "capital": "Kathmandu",
        "altSpellings": ["NP", "Federal Democratic Republic of Nepal", "Lokt\u0101ntrik Ganatantra Nep\u0101l"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Southern Asia",
        "language": ["Nepali"],
        "languagesCodes": ["ne"],
        "translations": {
          "de": "N\u00e9pal",
          "en": "Nepal",
          "es": "Nepal",
          "fr": "N\u00e9pal",
          "it": "Nepal",
          "ja": "\u30cd\u30d1\u30fc\u30eb",
          "nl": "Nepal"
        },
        "population": 26494504,
        "latlng": [28, 84],
        "demonym": "Nepalese",
        "borders": ["CHN", "IND"]
      },
      {
        "name": "Netherlands",
        "nativeName": "Nederland",
        "tld": [".nl"],
        "cca2": "NL",
        "ccn3": "528",
        "cca3": "NLD",
        "currency": ["EUR"],
        "callingCode": ["31"],
        "capital": "Amsterdam",
        "altSpellings": ["NL", "Holland", "Nederland"],
        "relevance": "1.5",
        "region": "Europe",
        "subregion": "Western Europe",
        "language": ["Dutch"],
        "languagesCodes": ["nl"],
        "translations": {
          "de": "Niederlande",
          "en": "Netherlands",
          "es": "Pa\u00edses Bajos",
          "fr": "Pays-Bas",
          "it": "Paesi Bassi",
          "ja": "\u30aa\u30e9\u30f3\u30c0",
          "nl": "Nederland"
        },
        "population": 16807300,
        "latlng": [52.5, 5.75],
        "demonym": "Dutch",
        "borders": ["BEL", "DEU"]
      },
      {
        "name": "New Caledonia",
        "nativeName": "Nouvelle-Cal\u00e9donie",
        "tld": [".nc"],
        "cca2": "NC",
        "ccn3": "540",
        "cca3": "NCL",
        "currency": ["XPF"],
        "callingCode": ["687"],
        "capital": "Noum\u00e9a",
        "altSpellings": ["NC"],
        "relevance": "0.5",
        "region": "Oceania",
        "subregion": "Melanesia",
        "language": ["French"],
        "languagesCodes": ["fr"],
        "translations": {
          "de": "Neukaledonien",
          "en": "New Caledonia",
          "es": "Nueva Caledonia",
          "fr": "Nouvelle-Cal\u00e9donie",
          "it": "Nuova Caledonia",
          "ja": "\u30cb\u30e5\u30fc\u30ab\u30ec\u30c9\u30cb\u30a2",
          "nl": "Nieuw-Caledoni\u00eb"
        },
        "population": 258958,
        "latlng": [-21.5, 165.5],
        "demonym": "New Caledonian",
        "borders": []
      },
      {
        "name": "New Zealand",
        "nativeName": "New Zealand",
        "tld": [".nz"],
        "cca2": "NZ",
        "ccn3": "554",
        "cca3": "NZL",
        "currency": ["NZD"],
        "callingCode": ["64"],
        "capital": "Wellington",
        "altSpellings": ["NZ", "Aotearoa"],
        "relevance": "0",
        "region": "Oceania",
        "subregion": "Australia and New Zealand",
        "language": ["English", "M\u0101ori", "New Zealand Sign Language"],
        "languagesCodes": [],
        "translations": {},
        "population": 4478810,
        "latlng": [-41, 174],
        "demonym": "New Zealander",
        "borders": []
      },
      {
        "name": "Nicaragua",
        "nativeName": "Nicaragua",
        "tld": [".ni"],
        "cca2": "NI",
        "ccn3": "558",
        "cca3": "NIC",
        "currency": ["NIO"],
        "callingCode": ["505"],
        "capital": "Managua",
        "altSpellings": ["NI", "Republic of Nicaragua", "Rep\u00fablica de Nicaragua"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Central America",
        "language": ["Spanish"],
        "languagesCodes": ["es"],
        "translations": {
          "de": "Nicaragua",
          "en": "Nicaragua",
          "es": "Nicaragua",
          "fr": "Nicaragua",
          "it": "Nicaragua",
          "ja": "\u30cb\u30ab\u30e9\u30b0\u30a2",
          "nl": "Nicaragua"
        },
        "population": 6071045,
        "latlng": [13, -85],
        "demonym": "Nicaraguan",
        "borders": ["CRI", "HND"]
      },
      {
        "name": "Niger",
        "nativeName": "Niger",
        "tld": [".ne"],
        "cca2": "NE",
        "ccn3": "562",
        "cca3": "NER",
        "currency": ["XOF"],
        "callingCode": ["227"],
        "capital": "Niamey",
        "altSpellings": ["NE", "Nijar", "Republic of Niger", "R\u00e9publique du Niger"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Western Africa",
        "language": ["French"],
        "languagesCodes": ["fr"],
        "translations": {
          "de": "Niger",
          "en": "Niger",
          "es": "N\u00edger",
          "fr": "Niger",
          "it": "Niger",
          "ja": "\u30cb\u30b8\u30a7\u30fc\u30eb",
          "nl": "Niger"
        },
        "population": 17129076,
        "latlng": [16, 8],
        "demonym": "Nigerian",
        "borders": ["DZA", "BEN", "BFA", "TCD", "LBY", "MLI", "NGA"]
      },
      {
        "name": "Nigeria",
        "nativeName": "Nigeria",
        "tld": [".ng"],
        "cca2": "NG",
        "ccn3": "566",
        "cca3": "NGA",
        "currency": ["NGN"],
        "callingCode": ["234"],
        "capital": "Abuja",
        "altSpellings": ["NG", "Nijeriya", "Na\u00edj\u00edr\u00ed\u00e0", "Federal Republic of Nigeria"],
        "relevance": "1.5",
        "region": "Africa",
        "subregion": "Western Africa",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Nigeria",
          "en": "Nigeria",
          "es": "Nigeria",
          "fr": "Nig\u00e9ria",
          "it": "Nigeria",
          "ja": "\u30ca\u30a4\u30b8\u30a7\u30ea\u30a2",
          "nl": "Nigeria"
        },
        "population": 173615000,
        "latlng": [10, 8],
        "demonym": "Nigerian",
        "borders": ["BEN", "CMR", "TCD", "NER"]
      },
      {
        "name": "Niue",
        "nativeName": "Niu\u0113",
        "tld": [".nu"],
        "cca2": "NU",
        "ccn3": "570",
        "cca3": "NIU",
        "currency": ["NZD"],
        "callingCode": ["683"],
        "capital": "Alofi",
        "altSpellings": ["NU"],
        "relevance": "0.5",
        "region": "Oceania",
        "subregion": "Polynesia",
        "language": ["Niuean", "English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Niue",
          "en": "Niue",
          "es": "Niue",
          "fr": "Niue",
          "it": "Niue",
          "ja": "\u30cb\u30a6\u30a8",
          "nl": "Niue"
        },
        "population": 1613,
        "latlng": [-19.03333333, -169.86666666],
        "demonym": "Niuean",
        "borders": []
      },
      {
        "name": "Norfolk Island",
        "nativeName": "Norfolk Island",
        "tld": [".nf"],
        "cca2": "NF",
        "ccn3": "574",
        "cca3": "NFK",
        "currency": ["AUD"],
        "callingCode": ["672"],
        "capital": "Kingston",
        "altSpellings": ["NF", "Territory of Norfolk Island", "Teratri of Norf'k Ailen"],
        "relevance": "0.5",
        "region": "Oceania",
        "subregion": "Australia and New Zealand",
        "language": ["English", "Norfuk"],
        "languagesCodes": [],
        "translations": {},
        "population": 2302,
        "latlng": [-29.03333333, 167.95],
        "demonym": "Norfolk Islander",
        "borders": []
      },
      {
        "name": "North Korea",
        "nativeName": "\ubd81\ud55c",
        "tld": [".kp"],
        "cca2": "KP",
        "ccn3": "408",
        "cca3": "PRK",
        "currency": ["KPW"],
        "callingCode": ["850"],
        "capital": "Pyongyang",
        "altSpellings": ["KP", "Democratic People's Republic of Korea", "\uc870\uc120\ubbfc\uc8fc\uc8fc\uc758\uc778\ubbfc\uacf5\ud654\uad6d", "Chos\u014fn Minjuju\u016di Inmin Konghwaguk"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Eastern Asia",
        "language": ["Korean"],
        "languagesCodes": ["ko"],
        "translations": {
          "de": "Nordkorea",
          "en": "Korea (North)",
          "es": "Corea del Norte",
          "fr": "Cor\u00e9e du Nord",
          "it": "Corea del Nord",
          "ja": "\u671d\u9bae\u6c11\u4e3b\u4e3b\u7fa9\u4eba\u6c11\u5171\u548c\u56fd",
          "nl": "Noord-Korea"
        },
        "population": 24895000,
        "latlng": [40, 127],
        "demonym": "North Korean",
        "borders": [ "CHN", "KOR", "RUS"]
      },
      {
        "name": "Northern Mariana Islands",
        "nativeName": "Northern Mariana Islands",
        "tld": [".mp"],
        "cca2": "MP",
        "ccn3": "580",
        "cca3": "MNP",
        "currency": ["USD"],
        "callingCode": ["1670"],
        "capital": "Saipan",
        "altSpellings": ["MP", "Commonwealth of the Northern Mariana Islands", "Sankattan Siha Na Islas Mari\u00e5nas"],
        "relevance": "0.5",
        "region": "Oceania",
        "subregion": "Micronesia",
        "language": ["English", "Chamorro", "Carolinian"],
        "languagesCodes": ["en", "ch"],
        "translations": {
          "de": "N\u00f6rdliche Marianen",
          "en": "Northern Mariana Islands",
          "es": "Islas Marianas del Norte",
          "fr": "\u00celes Mariannes du Nord",
          "it": "Isole Marianne Settentrionali",
          "ja": "\u5317\u30de\u30ea\u30a2\u30ca\u8af8\u5cf6",
          "nl": "Noordelijke Marianeneilanden"
        },
        "population": 53883,
        "latlng": [15.2, 145.75],
        "demonym": "American",
        "borders": []
      },
      {
        "name": "Norway",
        "nativeName": "Norge",
        "tld": [".no"],
        "cca2": "NO",
        "ccn3": "578",
        "cca3": "NOR",
        "currency": ["NOK"],
        "callingCode": ["47"],
        "capital": "Oslo",
        "altSpellings": ["NO", "Norge", "Noreg", "Kingdom of Norway", "Kongeriket Norge", "Kongeriket Noreg"],
        "relevance": "1.5",
        "region": "Europe",
        "subregion": "Northern Europe",
        "language": ["Norwegian"],
        "languagesCodes": ["no"],
        "translations": {
          "de": "Norwegen",
          "en": "Norway",
          "es": "Noruega",
          "fr": "Norv\u00e8ge",
          "it": "Norvegia",
          "ja": "\u30ce\u30eb\u30a6\u30a7\u30fc",
          "nl": "Noorwegen"
        },
        "population": 5077798,
        "latlng": [62, 10],
        "demonym": "Norwegian",
        "borders": ["FIN", "SWE", "RUS"]
      },
      {
        "name": "Oman",
        "nativeName": "\u02bbUm\u0101n",
        "tld": [".om"],
        "cca2": "OM",
        "ccn3": "512",
        "cca3": "OMN",
        "currency": ["OMR"],
        "callingCode": ["968"],
        "capital": "Muscat",
        "altSpellings": ["OM", "Sultanate of Oman", "Sal\u1e6danat \u02bbUm\u0101n"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Western Asia",
        "language": ["Arabic"],
        "languagesCodes": ["ar"],
        "translations": {
          "de": "Oman",
          "en": "Oman",
          "es": "Om\u00e1n",
          "fr": "Oman",
          "it": "oman",
          "ja": "\u30aa\u30de\u30fc\u30f3",
          "nl": "Oman"
        },
        "population": 3929000,
        "latlng": [21, 57],
        "demonym": "Omani",
        "borders": ["SAU", "ARE", "YEM"]
      },
      {
        "name": "Pakistan",
        "nativeName": "Pakistan",
        "tld": [".pk"],
        "cca2": "PK",
        "ccn3": "586",
        "cca3": "PAK",
        "currency": ["PKR"],
        "callingCode": ["92"],
        "capital": "Islamabad",
        "altSpellings": ["PK", "P\u0101kist\u0101n", "Islamic Republic of Pakistan", "Isl\u0101m\u012b Jumh\u016briya'eh P\u0101kist\u0101n"],
        "relevance": "2",
        "region": "Asia",
        "subregion": "Southern Asia",
        "language": ["English", "Urdu"],
        "languagesCodes": ["en", "ur"],
        "translations": {
          "de": "Pakistan",
          "en": "Pakistan",
          "es": "Pakist\u00e1n",
          "fr": "Pakistan",
          "it": "Pakistan",
          "ja": "\u30d1\u30ad\u30b9\u30bf\u30f3",
          "nl": "Pakistan"
        },
        "population": 184845000,
        "latlng": [30, 70],
        "demonym": "Pakistani",
        "borders": ["AFG", "CHN", "IND", "IRN"]
      },
      {
        "name": "Palau",
        "nativeName": "Palau",
        "tld": [".pw"],
        "cca2": "PW",
        "ccn3": "585",
        "cca3": "PLW",
        "currency": ["USD"],
        "callingCode": ["680"],
        "capital": "Ngerulmud",
        "altSpellings": ["PW", "Republic of Palau", "Beluu er a Belau"],
        "relevance": "0.5",
        "region": "Oceania",
        "subregion": "Micronesia",
        "language": ["English", "Palauan"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Palau",
          "en": "Palau",
          "es": "Palau",
          "fr": "Palaos",
          "it": "Palau",
          "ja": "\u30d1\u30e9\u30aa",
          "nl": "Palau"
        },
        "population": 20901,
        "latlng": [7.5, 134.5],
        "demonym": "Palauan",
        "borders": []
      },
      {
        "name": "Palestine",
        "nativeName": "Filas\u1e6din",
        "tld": [".ps"],
        "cca2": "PS",
        "ccn3": "275",
        "cca3": "PSE",
        "currency": ["ILS"],
        "callingCode": ["970"],
        "capital": "Ramallah",
        "altSpellings": ["PS", "State of Palestine", "Dawlat Filas\u1e6din"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Western Asia",
        "language": ["Arabic"],
        "languagesCodes": ["ar", "he", "en"],
        "translations": {
          "de": "Pal\u00e4stina",
          "en": "Palestine",
          "es": "Palestina",
          "fr": "Palestine",
          "it": "Palestina",
          "ja": "\u30d1\u30ec\u30b9\u30c1\u30ca",
          "nl": "Palestijnse gebieden"
        },
        "population": -1,
        "latlng": [31.9, 35.2],
        "demonym": "Palestinian",
        "borders": [ "ISR", "EGY", "JOR" ]
      },
      {
        "name": "Panama",
        "nativeName": "Panam\u00e1",
        "tld": [".pa"],
        "cca2": "PA",
        "ccn3": "591",
        "cca3": "PAN",
        "currency": ["PAB", "USD"],
        "callingCode": ["507"],
        "capital": "Panama City",
        "altSpellings": ["PA", "Republic of Panama", "Rep\u00fablica de Panam\u00e1"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Central America",
        "language": ["Spanish"],
        "languagesCodes": ["es"],
        "translations": {
          "de": "Panama",
          "en": "Panama",
          "es": "Panam\u00e1",
          "fr": "Panama",
          "it": "Panama",
          "ja": "\u30d1\u30ca\u30de",
          "nl": "Panama"
        },
        "population": 3405813,
        "latlng": [9, -80],
        "demonym": "Panamanian",
        "borders": ["COL", "CRI"]
      },
      {
        "name": "Papua New Guinea",
        "nativeName": "Papua Niugini",
        "tld": [".pg"],
        "cca2": "PG",
        "ccn3": "598",
        "cca3": "PNG",
        "currency": ["PGK"],
        "callingCode": ["675"],
        "capital": "Port Moresby",
        "altSpellings": ["PG", "Independent State of Papua New Guinea", "Independen Stet bilong Papua Niugini"],
        "relevance": "0",
        "region": "Oceania",
        "subregion": "Melanesia",
        "language": ["Hiri Motu", "Tok Pisin", "English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Papua-Neuguinea",
          "en": "Papua New Guinea",
          "es": "Pap\u00faa Nueva Guinea",
          "fr": "Papouasie-Nouvelle-Guin\u00e9e",
          "it": "Papua Nuova Guinea",
          "ja": "\u30d1\u30d7\u30a2\u30cb\u30e5\u30fc\u30ae\u30cb\u30a2",
          "nl": "Papoea-Nieuw-Guinea"
        },
        "population": 7059653,
        "latlng": [-6, 147],
        "demonym": "Papua New Guinean",
        "borders": ["IDN"]
      },
      {
        "name": "Paraguay",
        "nativeName": "Paraguay",
        "tld": [".py"],
        "cca2": "PY",
        "ccn3": "600",
        "cca3": "PRY",
        "currency": ["PYG"],
        "callingCode": ["595"],
        "capital": "Asunci\u00f3n",
        "altSpellings": ["PY", "Republic of Paraguay", "Rep\u00fablica del Paraguay", "Tet\u00e3 Paragu\u00e1i"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "South America",
        "language": ["Spanish", "Guaran\u00ed"],
        "languagesCodes": ["es", "gn"],
        "translations": {
          "de": "Paraguay",
          "en": "Paraguay",
          "es": "Paraguay",
          "fr": "Paraguay",
          "it": "Paraguay",
          "ja": "\u30d1\u30e9\u30b0\u30a2\u30a4",
          "nl": "Paraguay"
        },
        "population": 6783374,
        "latlng": [-23, -58],
        "demonym": "Paraguayan",
        "borders": ["ARG", "BOL", "BRA"]
      },
      {
        "name": "Peru",
        "nativeName": "Per\u00fa",
        "tld": [".pe"],
        "cca2": "PE",
        "ccn3": "604",
        "cca3": "PER",
        "currency": ["PEN"],
        "callingCode": ["51"],
        "capital": "Lima",
        "altSpellings": ["PE", "Republic of Peru", " Rep\u00fablica del Per\u00fa"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "South America",
        "language": ["Spanish", "Quechua", "Aymara"],
        "languagesCodes": ["es"],
        "translations": {
          "de": "Peru",
          "en": "Peru",
          "es": "Per\u00fa",
          "fr": "P\u00e9rou",
          "it": "Per\u00f9",
          "ja": "\u30da\u30eb\u30fc",
          "nl": "Peru"
        },
        "population": 30475144,
        "latlng": [-10, -76],
        "demonym": "Peruvian",
        "borders": ["BOL", "BRA", "CHL", "COL", "ECU"]
      },
      {
        "name": "Philippines",
        "nativeName": "Pilipinas",
        "tld": [".ph"],
        "cca2": "PH",
        "ccn3": "608",
        "cca3": "PHL",
        "currency": ["PHP"],
        "callingCode": ["63"],
        "capital": "Manila",
        "altSpellings": ["PH", "Republic of the Philippines", "Rep\u00fablika ng Pilipinas"],
        "relevance": "1.5",
        "region": "Asia",
        "subregion": "South-Eastern Asia",
        "language": ["Filipino", "English"],
        "languagesCodes": [],
        "translations": {},
        "population": 98678000,
        "latlng": [13, 122],
        "demonym": "Filipino",
        "borders": []
      },
      {
        "name": "Pitcairn Islands",
        "nativeName": "Pitcairn Islands",
        "tld": [".pn"],
        "cca2": "PN",
        "ccn3": "612",
        "cca3": "PCN",
        "currency": ["NZD"],
        "callingCode": ["64"],
        "capital": "Adamstown",
        "altSpellings": ["PN", "Pitcairn Henderson Ducie and Oeno Islands"],
        "relevance": "0.5",
        "region": "Oceania",
        "subregion": "Polynesia",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Pitcairn",
          "en": "Pitcairn",
          "es": "Islas Pitcairn",
          "fr": "\u00celes Pitcairn",
          "it": "Isole Pitcairn",
          "ja": "\u30d4\u30c8\u30b1\u30a2\u30f3",
          "nl": "Pitcairneilanden"
        },
        "population": 56,
        "latlng": [-25.06666666, -130.1],
        "demonym": "Pitcairn Islander",
        "borders": []
      },
      {
        "name": "Poland",
        "nativeName": "Polska",
        "tld": [".pl"],
        "cca2": "PL",
        "ccn3": "616",
        "cca3": "POL",
        "currency": ["PLN"],
        "callingCode": ["48"],
        "capital": "Warsaw",
        "altSpellings": ["PL", "Republic of Poland", "Rzeczpospolita Polska"],
        "relevance": "1.25",
        "region": "Europe",
        "subregion": "Eastern Europe",
        "language": ["Polish"],
        "languagesCodes": ["pl"],
        "translations": {
          "de": "Polen",
          "en": "Poland",
          "es": "Polonia",
          "fr": "Pologne",
          "it": "Polonia",
          "ja": "\u30dd\u30fc\u30e9\u30f3\u30c9",
          "nl": "Polen"
        },
        "population": 38533299,
        "latlng": [52, 20],
        "demonym": "Polish",
        "borders": ["BLR", "CZE", "DEU", "LTU", "RUS", "SVK", "UKR"]
      },
      {
        "name": "Portugal",
        "nativeName": "Portugal",
        "tld": [".pt"],
        "cca2": "PT",
        "ccn3": "620",
        "cca3": "PRT",
        "currency": ["EUR"],
        "callingCode": ["351"],
        "capital": "Lisbon",
        "altSpellings": ["PT", "Portuguesa", "Portuguese Republic", "Rep\u00fablica Portuguesa"],
        "relevance": "1.5",
        "region": "Europe",
        "subregion": "Southern Europe",
        "language": ["Portuguese"],
        "languagesCodes": ["pt"],
        "translations": {
          "de": "Portugal",
          "en": "Portugal",
          "es": "Portugal",
          "fr": "Portugal",
          "it": "Portogallo",
          "ja": "\u30dd\u30eb\u30c8\u30ac\u30eb",
          "nl": "Portugal"
        },
        "population": 10562178,
        "latlng": [39.5, -8],
        "demonym": "Portuguese",
        "borders": ["ESP"]
      },
      {
        "name": "Puerto Rico",
        "nativeName": "Puerto Rico",
        "tld": [".pr"],
        "cca2": "PR",
        "ccn3": "630",
        "cca3": "PRI",
        "currency": ["USD"],
        "callingCode": ["1787", "1939"],
        "capital": "San Juan",
        "altSpellings": ["PR", "Commonwealth of Puerto Rico", "Estado Libre Asociado de Puerto Rico"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["Spanish", "English"],
        "languagesCodes": ["es", "en"],
        "translations": {
          "de": "Puerto Rico",
          "en": "Puerto Rico",
          "es": "Puerto Rico",
          "fr": "Porto Rico",
          "it": "Porto Rico",
          "ja": "\u30d7\u30a8\u30eb\u30c8\u30ea\u30b3",
          "nl": "Puerto Rico"
        },
        "population": 3667084,
        "latlng": [18.25, -66.5],
        "demonym": "Puerto Rican",
        "borders": []
      },
      {
        "name": "Qatar",
        "nativeName": "Qa\u1e6dar",
        "tld": [".qa"],
        "cca2": "QA",
        "ccn3": "634",
        "cca3": "QAT",
        "currency": ["QAR"],
        "callingCode": ["974"],
        "capital": "Doha",
        "altSpellings": ["QA", "State of Qatar", "Dawlat Qa\u1e6dar"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Western Asia",
        "language": ["Arabic"],
        "languagesCodes": ["ar"],
        "translations": {
          "de": "Katar",
          "en": "Qatar",
          "es": "Catar",
          "fr": "Qatar",
          "it": "Qatar",
          "ja": "\u30ab\u30bf\u30fc\u30eb",
          "nl": "Qatar"
        },
        "population": 2024707,
        "latlng": [25.5, 51.25],
        "demonym": "Qatari",
        "borders": ["SAU"]
      },
      {
        "name": "Republic of Kosovo",
        "nativeName": "Republika e Kosov\u00ebs",
        "tld": [""],
        "cca2": "XK",
        "ccn3": "780",
        "cca3": "KOS",
        "currency": ["EUR"],
        "callingCode": ["377", "381", "386"],
        "capital": "Pristina",
        "altSpellings": ["XK", "\u0420\u0435\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u041a\u043e\u0441\u043e\u0432\u043e"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Eastern Europe",
        "language": ["Albanian", "Serbian"],
        "languagesCodes": ["sq", "sr"],
        "translations": {},
        "population": 1733842,
        "latlng": [42.666667, 21.166667],
        "demonym": "Kosovar",
        "borders": [ "ALB", "MKD", "MNE", "SRB"]
      },
      {
        "name": "R\u00e9union",
        "nativeName": "La R\u00e9union",
        "tld": [".re"],
        "cca2": "RE",
        "ccn3": "638",
        "cca3": "REU",
        "currency": ["EUR"],
        "callingCode": ["262"],
        "capital": "Saint-Denis",
        "altSpellings": ["RE", "Reunion"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Eastern Africa",
        "language": ["French"],
        "languagesCodes": ["fr"],
        "translations": {
          "de": "R\u00e9union",
          "en": "R\u00e9union",
          "es": "Reuni\u00f3n",
          "fr": "R\u00e9union",
          "it": "Riunione",
          "ja": "\u30ec\u30e6\u30cb\u30aa\u30f3",
          "nl": "R\u00e9union"
        },
        "population": 821136,
        "latlng": [-21.15, 55.5],
        "demonym": "French",
        "borders": []
      },
      {
        "name": "Romania",
        "nativeName": "Rom\u00e2nia",
        "tld": [".ro"],
        "cca2": "RO",
        "ccn3": "642",
        "cca3": "ROU",
        "currency": ["RON"],
        "callingCode": ["40"],
        "capital": "Bucharest",
        "altSpellings": ["RO", "Rumania", "Roumania", "Rom\u00e2nia"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Eastern Europe",
        "language": ["Romanian"],
        "languagesCodes": ["ro"],
        "translations": {
          "de": "Rum\u00e4nien",
          "en": "Romania",
          "es": "Rumania",
          "fr": "Roumanie",
          "it": "Romania",
          "ja": "\u30eb\u30fc\u30de\u30cb\u30a2",
          "nl": "Roemeni\u00eb"
        },
        "population": 20121641,
        "latlng": [46, 25],
        "demonym": "Romanian",
        "borders": ["BGR", "HUN", "MDA", "SRB", "UKR"]
      },
      {
        "name": "Russia",
        "nativeName": "\u0420\u043e\u0441\u0441\u0438\u044f",
        "tld": [".ru"],
        "cca2": "RU",
        "ccn3": "643",
        "cca3": "RUS",
        "currency": ["RUB"],
        "callingCode": ["7"],
        "capital": "Moscow",
        "altSpellings": ["RU", "Rossiya", "Russian Federation", "\u0420\u043e\u0441\u0441\u0438\u0439\u0441\u043a\u0430\u044f \u0424\u0435\u0434\u0435\u0440\u0430\u0446\u0438\u044f", "Rossiyskaya Federatsiya"],
        "relevance": "2.5",
        "region": "Europe",
        "subregion": "Eastern Europe",
        "language": ["Russian"],
        "languagesCodes": ["ru"],
        "translations": {
          "de": "Russland",
          "en": "Russia",
          "es": "Rusia",
          "fr": "Russie",
          "it": "Russia",
          "ja": "\u30ed\u30b7\u30a2\u9023\u90a6",
          "nl": "Rusland"
        },
        "population": 143500000,
        "latlng": [60, 100],
        "demonym": "Russian",
        "borders": ["AZE", "BLR", "CHN", "EST", "FIN", "GEO", "KAZ", "PRK", "LVA", "LTU", "MNG", "NOR", "POL", "UKR"]
      },
      {
        "name": "Rwanda",
        "nativeName": "Rwanda",
        "tld": [".rw"],
        "cca2": "RW",
        "ccn3": "646",
        "cca3": "RWA",
        "currency": ["RWF"],
        "callingCode": ["250"],
        "capital": "Kigali",
        "altSpellings": ["RW", "Republic of Rwanda", "Repubulika y'u Rwanda", "R\u00e9publique du Rwanda"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Eastern Africa",
        "language": ["Kinyarwanda", "French", "English"],
        "languagesCodes": ["rw", "en", "fr"],
        "translations": {
          "de": "Ruanda",
          "en": "Rwanda",
          "es": "Ruanda",
          "fr": "Rwanda",
          "it": "Ruanda",
          "ja": "\u30eb\u30ef\u30f3\u30c0",
          "nl": "Rwanda"
        },
        "population": 10537222,
        "latlng": [-2, 30],
        "demonym": "Rwandan",
        "borders": ["BDI", "COD", "TZA", "UGA"]
      },
      {
        "name": "Saint Barth\u00e9lemy",
        "nativeName": "Saint-Barth\u00e9lemy",
        "tld": [".bl"],
        "cca2": "BL",
        "ccn3": "652",
        "cca3": "BLM",
        "currency": ["EUR"],
        "callingCode": ["590"],
        "capital": "Gustavia",
        "altSpellings": ["BL", "St. Barthelemy", "Collectivity of Saint Barth\u00e9lemy", "Collectivit\u00e9 de Saint-Barth\u00e9lemy"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["French"],
        "languagesCodes": ["fr"],
        "translations": {
          "de": "Saint-Barth\u00e9lemy",
          "en": "Saint Barth\u00e9lemy",
          "es": "San Bartolom\u00e9",
          "fr": "Saint-Barth\u00e9lemy",
          "it": "Antille Francesi",
          "ja": "\u30b5\u30f3\u30fb\u30d0\u30eb\u30c6\u30eb\u30df\u30fc",
          "nl": "Saint Barth\u00e9lemy"
        },
        "population": 8938,
        "latlng": [18.5, -63.41666666],
        "demonym": "Saint Barth\u00e9lemy Islander",
        "borders": []
      },
      {
        "name": "Saint Helena",
        "nativeName": "Saint Helena",
        "tld": [".sh"],
        "cca2": "SH",
        "ccn3": "654",
        "cca3": "SHN",
        "currency": ["SHP"],
        "callingCode": ["290"],
        "capital": "Jamestown",
        "altSpellings": ["SH"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Western Africa",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Sankt Helena",
          "en": "Saint Helena",
          "es": "Santa Helena",
          "fr": "Sainte-H\u00e9l\u00e8ne",
          "it": "Sant'Elena",
          "ja": "\u30bb\u30f3\u30c8\u30d8\u30ec\u30ca\u30fb\u30a2\u30bb\u30f3\u30b7\u30e7\u30f3\u304a\u3088\u3073\u30c8\u30ea\u30b9\u30bf\u30f3\u30c0\u30af\u30fc\u30cb\u30e3",
          "nl": "Sint-Helena"
        },
        "population": -1,
        "latlng": [-15.95, -5.7],
        "demonym": "Saint Helenian",
        "borders": []
      },
      {
        "name": "Saint Kitts and Nevis",
        "nativeName": "Saint Kitts and Nevis",
        "tld": [".kn"],
        "cca2": "KN",
        "ccn3": "659",
        "cca3": "KNA",
        "currency": ["XCD"],
        "callingCode": ["1869"],
        "capital": "Basseterre",
        "altSpellings": ["KN", "Federation of Saint Christopher and Nevis"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "St. Kitts und Nevis",
          "en": "Saint Kitts and Nevis",
          "es": "San Crist\u00f3bal y Nieves",
          "fr": "Saint-Christophe-et-Ni\u00e9v\u00e8s",
          "it": "Saint Kitts e Nevis",
          "ja": "\u30bb\u30f3\u30c8\u30af\u30ea\u30b9\u30c8\u30d5\u30a1\u30fc\u30fb\u30cd\u30a4\u30d3\u30b9",
          "nl": "Saint Kitts en Nevis"
        },
        "population": 54000,
        "latlng": [17.33333333, -62.75],
        "demonym": "Kittian and Nevisian",
        "borders": []
      },
      {
        "name": "Saint Lucia",
        "nativeName": "Saint Lucia",
        "tld": [".lc"],
        "cca2": "LC",
        "ccn3": "662",
        "cca3": "LCA",
        "currency": ["XCD"],
        "callingCode": ["1758"],
        "capital": "Castries",
        "altSpellings": ["LC"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Saint Lucia",
          "en": "Saint Lucia",
          "es": "Santa Luc\u00eda",
          "fr": "Saint-Lucie",
          "it": "Santa Lucia",
          "ja": "\u30bb\u30f3\u30c8\u30eb\u30b7\u30a2",
          "nl": "Saint Lucia"
        },
        "population": 166526,
        "latlng": [13.88333333, -60.96666666],
        "demonym": "Saint Lucian",
        "borders": []
      },
      {
        "name": "Saint Martin",
        "nativeName": "Saint-Martin",
        "tld": [".mf", ".fr", ".gp"],
        "cca2": "MF",
        "ccn3": "663",
        "cca3": "MAF",
        "currency": ["EUR"],
        "callingCode": ["590"],
        "capital": "Marigot",
        "altSpellings": ["MF", "Collectivity of Saint Martin", "Collectivit\u00e9 de Saint-Martin"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["French"],
        "languagesCodes": ["en", "fr", "nl"],
        "translations": {
          "de": "Saint Martin",
          "en": "Saint Martin",
          "es": "Saint Martin",
          "fr": "Saint-Martin",
          "it": "Saint Martin",
          "ja": "\u30b5\u30f3\u30fb\u30de\u30eb\u30bf\u30f3\uff08\u30d5\u30e9\u30f3\u30b9\u9818\uff09",
          "nl": "Saint-Martin"
        },
        "population": -1,
        "latlng": [18.08333333, -63.95],
        "demonym": "Saint Martin Islander",
        "borders": ["SXM", "NLD"]
      },
      {
        "name": "Saint Pierre and Miquelon",
        "nativeName": "Saint-Pierre-et-Miquelon",
        "tld": [".pm"],
        "cca2": "PM",
        "ccn3": "666",
        "cca3": "SPM",
        "currency": ["EUR"],
        "callingCode": ["508"],
        "capital": "Saint-Pierre",
        "altSpellings": ["PM", "Collectivit\u00e9 territoriale de Saint-Pierre-et-Miquelon"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Northern America",
        "language": ["French"],
        "languagesCodes": ["fr"],
        "translations": {
          "de": "Saint-Pierre und Miquelon",
          "en": "Saint Pierre and Miquelon",
          "es": "San Pedro y Miquel\u00f3n",
          "fr": "Saint-Pierre-et-Miquelon",
          "it": "Saint-Pierre e Miquelon",
          "ja": "\u30b5\u30f3\u30d4\u30a8\u30fc\u30eb\u5cf6\u30fb\u30df\u30af\u30ed\u30f3\u5cf6",
          "nl": "Saint Pierre en Miquelon"
        },
        "population": 6081,
        "latlng": [46.83333333, -56.33333333],
        "demonym": "French",
        "borders": []
      },
      {
        "name": "Saint Vincent and the Grenadines",
        "nativeName": "Saint Vincent and the Grenadines",
        "tld": [".vc"],
        "cca2": "VC",
        "ccn3": "670",
        "cca3": "VCT",
        "currency": ["XCD"],
        "callingCode": ["1784"],
        "capital": "Kingstown",
        "altSpellings": ["VC"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Saint Vincent und die Grenadinen",
          "en": "Saint Vincent and the Grenadines",
          "es": "San Vicente y Granadinas",
          "fr": "Saint-Vincent-et-les-Grenadines",
          "it": "Saint Vincent e Grenadine",
          "ja": "\u30bb\u30f3\u30c8\u30d3\u30f3\u30bb\u30f3\u30c8\u304a\u3088\u3073\u30b0\u30ec\u30ca\u30c7\u30a3\u30fc\u30f3\u8af8\u5cf6",
          "nl": "Saint Vincent en de Grenadines"
        },
        "population": 109000,
        "latlng": [13.25, -61.2],
        "demonym": "Saint Vincentian",
        "borders": []
      },
      {
        "name": "Samoa",
        "nativeName": "Samoa",
        "tld": [".ws"],
        "cca2": "WS",
        "ccn3": "882",
        "cca3": "WSM",
        "currency": ["WST"],
        "callingCode": ["685"],
        "capital": "Apia",
        "altSpellings": ["WS", "Independent State of Samoa", "Malo Sa\u02bboloto Tuto\u02bbatasi o S\u0101moa"],
        "relevance": "0",
        "region": "Oceania",
        "subregion": "Polynesia",
        "language": ["Samoan", "English"],
        "languagesCodes": ["sm", "en"],
        "translations": {
          "de": "Samoa",
          "en": "Samoa",
          "es": "Samoa",
          "fr": "Samoa",
          "it": "Samoa",
          "ja": "\u30b5\u30e2\u30a2",
          "nl": "Samoa"
        },
        "population": 187820,
        "latlng": [-13.58333333, -172.33333333],
        "demonym": "Samoan",
        "borders": []
      },
      {
        "name": "San Marino",
        "nativeName": "San Marino",
        "tld": [".sm"],
        "cca2": "SM",
        "ccn3": "674",
        "cca3": "SMR",
        "currency": ["EUR"],
        "callingCode": ["378"],
        "capital": "City of San Marino",
        "altSpellings": ["SM", "Republic of San Marino", "Repubblica di San Marino"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Southern Europe",
        "language": ["Italian"],
        "languagesCodes": ["it"],
        "translations": {
          "de": "San Marino",
          "en": "San Marino",
          "es": "San Marino",
          "fr": "Saint-Marin",
          "it": "San Marino",
          "ja": "\u30b5\u30f3\u30de\u30ea\u30ce",
          "nl": "San Marino"
        },
        "population": 32509,
        "latlng": [43.76666666, 12.41666666],
        "demonym": "Sammarinese",
        "borders": ["ITA"]
      },
      {
        "name": "S\u00e3o Tom\u00e9 and Pr\u00edncipe",
        "nativeName": "S\u00e3o Tom\u00e9 e Pr\u00edncipe",
        "tld": [".st"],
        "cca2": "ST",
        "ccn3": "678",
        "cca3": "STP",
        "currency": ["STD"],
        "callingCode": ["239"],
        "capital": "S\u00e3o Tom\u00e9",
        "altSpellings": ["ST", "Democratic Republic of S\u00e3o Tom\u00e9 and Pr\u00edncipe", "Rep\u00fablica Democr\u00e1tica de S\u00e3o Tom\u00e9 e Pr\u00edncipe"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Middle Africa",
        "language": ["Portuguese"],
        "languagesCodes": ["pt"],
        "translations": {
          "de": "S\u00e3o Tom\u00e9 und Pr\u00edncipe",
          "en": "S\u00e3o Tom\u00e9 and Pr\u00edncipe",
          "es": "Santo Tom\u00e9 y Pr\u00edncipe",
          "fr": "Sao Tom\u00e9-et-Principe",
          "it": "S\u00e3o Tom\u00e9 e Pr\u00edncipe",
          "ja": "\u30b5\u30f3\u30c8\u30e1\u30fb\u30d7\u30ea\u30f3\u30b7\u30da",
          "nl": "Sao Tom\u00e9 en Principe"
        },
        "population": 187356,
        "latlng": [1, 7],
        "demonym": "Sao Togarp",
        "borders": []
      },
      {
        "name": "Saudi Arabia",
        "nativeName": "as-Su\u2018\u016bdiyyah",
        "tld": [".sa"],
        "cca2": "SA",
        "ccn3": "682",
        "cca3": "SAU",
        "currency": ["SAR"],
        "callingCode": ["966"],
        "capital": "Riyadh",
        "altSpellings": ["SA", "Kingdom of Saudi Arabia", "Al-Mamlakah al-\u2018Arabiyyah as-Su\u2018\u016bdiyyah"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Western Asia",
        "language": ["Arabic"],
        "languagesCodes": ["ar"],
        "translations": {
          "de": "Saudi-Arabien",
          "en": "Saudi Arabia",
          "es": "Arabia Saud\u00ed",
          "fr": "Arabie Saoudite",
          "it": "Arabia Saudita",
          "ja": "\u30b5\u30a6\u30b8\u30a2\u30e9\u30d3\u30a2",
          "nl": "Saoedi-Arabi\u00eb"
        },
        "population": 29994272,
        "latlng": [25, 45],
        "demonym": "Saudi Arabian",
        "borders": ["IRQ", "JOR", "KWT", "OMN", "QAT", "ARE", "YEM"]
      },
      {
        "name": "Senegal",
        "nativeName": "S\u00e9n\u00e9gal",
        "tld": [".sn"],
        "cca2": "SN",
        "ccn3": "686",
        "cca3": "SEN",
        "currency": ["XOF"],
        "callingCode": ["221"],
        "capital": "Dakar",
        "altSpellings": ["SN", "Republic of Senegal", "R\u00e9publique du S\u00e9n\u00e9gal"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Western Africa",
        "language": ["French"],
        "languagesCodes": ["fr"],
        "translations": {
          "de": "Senegal",
          "en": "Senegal",
          "es": "Senegal",
          "fr": "S\u00e9n\u00e9gal",
          "it": "Senegal",
          "ja": "\u30bb\u30cd\u30ac\u30eb",
          "nl": "Senegal"
        },
        "population": 13567338,
        "latlng": [14, -14],
        "demonym": "Senegalese",
        "borders": ["The Gambia", "GIN", "GNB", "MLI", "MRT"]
      },
      {
        "name": "Serbia",
        "nativeName": "\u0421\u0440\u0431\u0438\u0458\u0430",
        "tld": [".rs"],
        "cca2": "RS",
        "ccn3": "688",
        "cca3": "SRB",
        "currency": ["RSD"],
        "callingCode": ["381"],
        "capital": "Belgrade",
        "altSpellings": ["RS", "Srbija", "Republic of Serbia", "\u0420\u0435\u043f\u0443\u0431\u043b\u0438\u043a\u0430 \u0421\u0440\u0431\u0438\u0458\u0430", "Republika Srbija"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Southern Europe",
        "language": ["Serbian"],
        "languagesCodes": ["sr"],
        "translations": {
          "de": "Serbien",
          "en": "Serbia",
          "es": "Serbia",
          "fr": "Serbie",
          "it": "Serbia",
          "ja": "\u30bb\u30eb\u30d3\u30a2",
          "nl": "Servi\u00eb"
        },
        "population": 7181505,
        "latlng": [44, 21],
        "demonym": "Serbian",
        "borders": ["BIH", "BGR", "HRV", "HUN", "KOS", "MKD", "MNE", "ROU"]
      },
      {
        "name": "Seychelles",
        "nativeName": "Seychelles",
        "tld": [".sc"],
        "cca2": "SC",
        "ccn3": "690",
        "cca3": "SYC",
        "currency": ["SCR"],
        "callingCode": ["248"],
        "capital": "Victoria",
        "altSpellings": ["SC", "Republic of Seychelles", "Repiblik Sesel", "R\u00e9publique des Seychelles"],
        "relevance": "0.5",
        "region": "Africa",
        "subregion": "Eastern Africa",
        "language": ["French", "English", "Seychellois Creole"],
        "languagesCodes": ["fr", "en"],
        "translations": {
          "de": "Seychellen",
          "en": "Seychelles",
          "es": "Seychelles",
          "fr": "Seychelles",
          "it": "Seychelles",
          "ja": "\u30bb\u30fc\u30b7\u30a7\u30eb",
          "nl": "Seychellen"
        },
        "population": 90945,
        "latlng": [-4.58333333, 55.66666666],
        "demonym": "Seychellois",
        "borders": []
      },
      {
        "name": "Sierra Leone",
        "nativeName": "Sierra Leone",
        "tld": [".sl"],
        "cca2": "SL",
        "ccn3": "694",
        "cca3": "SLE",
        "currency": ["SLL"],
        "callingCode": ["232"],
        "capital": "Freetown",
        "altSpellings": ["SL", "Republic of Sierra Leone"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Western Africa",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Sierra Leone",
          "en": "Sierra Leone",
          "es": "Sierra Leone",
          "fr": "Sierra Leone",
          "it": "Sierra Leone",
          "ja": "\u30b7\u30a8\u30e9\u30ec\u30aa\u30cd",
          "nl": "Sierra Leone"
        },
        "population": 6190280,
        "latlng": [8.5, -11.5],
        "demonym": "Sierra Leonean",
        "borders": ["GIN", "LBR"]
      },
      {
        "name": "Singapore",
        "nativeName": "Singapore",
        "tld": [".sg"],
        "cca2": "SG",
        "ccn3": "702",
        "cca3": "SGP",
        "currency": ["SGD"],
        "callingCode": ["65"],
        "capital": "Singapore",
        "altSpellings": ["SG", "Singapura", "Republik Singapura", "\u65b0\u52a0\u5761\u5171\u548c\u56fd"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "South-Eastern Asia",
        "language": ["English", "Malay", "Mandarin", "Tamil"],
        "languagesCodes": ["en", "ms", "ta", "zh"],
        "translations": {},
        "population": 5399200,
        "latlng": [1.36666666, 103.8],
        "demonym": "Singaporean",
        "borders": []
      },
      {
        "name": "Sint Maarten",
        "nativeName": "Sint Maarten",
        "tld": [".sx"],
        "cca2": "SX",
        "ccn3": "534",
        "cca3": "SXM",
        "currency": ["ANG"],
        "callingCode": ["1721"],
        "capital": "Philipsburg",
        "altSpellings": ["SX"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["Dutch", "English"],
        "languagesCodes": [],
        "translations": {},
        "population": 37429,
        "latlng": [18.033333, -63.05],
        "demonym": "Dutch",
        "borders": [ "MAF" ]
      },
      {
        "name": "Slovakia",
        "nativeName": "Slovensko",
        "tld": [".sk"],
        "cca2": "SK",
        "ccn3": "703",
        "cca3": "SVK",
        "currency": ["EUR"],
        "callingCode": ["421"],
        "capital": "Bratislava",
        "altSpellings": ["SK", "Slovak Republic", "Slovensk\u00e1 republika"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Eastern Europe",
        "language": ["Slovak"],
        "languagesCodes": ["sk"],
        "translations": {
          "de": "Slowakei",
          "en": "Slovakia",
          "es": "Rep\u00fablica Eslovaca",
          "fr": "Slovaquie",
          "it": "Slovacchia",
          "ja": "\u30b9\u30ed\u30d0\u30ad\u30a2",
          "nl": "Slowakije"
        },
        "population": 5412008,
        "latlng": [48.66666666, 19.5],
        "demonym": "Slovak",
        "borders": ["AUT", "CZE", "HUN", "POL", "UKR"]
      },
      {
        "name": "Slovenia",
        "nativeName": "Slovenija",
        "tld": [".si"],
        "cca2": "SI",
        "ccn3": "705",
        "cca3": "SVN",
        "currency": ["EUR"],
        "callingCode": ["386"],
        "capital": "Ljubljana",
        "altSpellings": ["SI", "Republic of Slovenia", "Republika Slovenija"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Southern Europe",
        "language": ["Slovene"],
        "languagesCodes": ["sl"],
        "translations": {
          "de": "Slowenien",
          "en": "Slovenia",
          "es": "Eslovenia",
          "fr": "Slov\u00e9nie",
          "it": "Slovenia",
          "ja": "\u30b9\u30ed\u30d9\u30cb\u30a2",
          "nl": "Sloveni\u00eb"
        },
        "population": 2061405,
        "latlng": [46.11666666, 14.81666666],
        "demonym": "Slovene",
        "borders": ["AUT", "HRV", "ITA", "HUN"]
      },
      {
        "name": "Solomon Islands",
        "nativeName": "Solomon Islands",
        "tld": [".sb"],
        "cca2": "SB",
        "ccn3": "090",
        "cca3": "SLB",
        "currency": ["SDB"],
        "callingCode": ["677"],
        "capital": "Honiara",
        "altSpellings": ["SB"],
        "relevance": "0",
        "region": "Oceania",
        "subregion": "Melanesia",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Salomonen",
          "en": "Solomon Islands",
          "es": "Islas Salom\u00f3n",
          "fr": "\u00celes Salomon",
          "it": "Isole Salomone",
          "ja": "\u30bd\u30ed\u30e2\u30f3\u8af8\u5cf6",
          "nl": "Salomonseilanden"
        },
        "population": 561000,
        "latlng": [-8, 159],
        "demonym": "Solomon Islander",
        "borders": []
      },
      {
        "name": "Somalia",
        "nativeName": "Soomaaliya",
        "tld": [".so"],
        "cca2": "SO",
        "ccn3": "706",
        "cca3": "SOM",
        "currency": ["SOS"],
        "callingCode": ["252"],
        "capital": "Mogadishu",
        "altSpellings": ["SO", "a\u1e63-\u1e62\u016bm\u0101l", "Federal Republic of Somalia", "Jamhuuriyadda Federaalka Soomaaliya", "Jumh\u016briyyat a\u1e63-\u1e62\u016bm\u0101l al-Fider\u0101liyya"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Eastern Africa",
        "language": ["Somali", "Arabic"],
        "languagesCodes": ["so", "ar"],
        "translations": {
          "de": "Somalia",
          "en": "Somalia",
          "es": "Somalia",
          "fr": "Somalie",
          "it": "Somalia",
          "ja": "\u30bd\u30de\u30ea\u30a2",
          "nl": "Somali\u00eb"
        },
        "population": 10496000,
        "latlng": [10, 49],
        "demonym": "Somali",
        "borders": ["DJI", "ETH", "KEN"]
      },
      {
        "name": "South Africa",
        "nativeName": "South Africa",
        "tld": [".za"],
        "cca2": "ZA",
        "ccn3": "710",
        "cca3": "ZAF",
        "currency": ["ZAR"],
        "callingCode": ["27"],
        "capital": "Cape Town",
        "altSpellings": ["ZA", "RSA", "Suid-Afrika", "Republic of South Africa"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Southern Africa",
        "language": ["Afrikaans", "English", "Southern Ndebele", "Northern Sotho", "Southern Sotho", "Swazi", "Tsonga", "Tswana", "Venda", "Xhosa", "Zulu"],
        "languagesCodes": ["af", "en", "nr", "st", "ss", "tn", "ts", "ve", "xh", "zu"],
        "translations": {
          "de": "Republik S\u00fcdafrika",
          "en": "South Africa",
          "es": "Rep\u00fablica de Sud\u00e1frica",
          "fr": "Afrique du Sud",
          "it": "Sud Africa",
          "ja": "\u5357\u30a2\u30d5\u30ea\u30ab",
          "nl": "Zuid-Afrika"
        },
        "population": 52981991,
        "latlng": [-29, 24],
        "demonym": "South African",
        "borders": ["BWA", "LSO", "MOZ", "NAM", "SWZ", "ZWE"]
      },
      {
        "name": "South Georgia",
        "nativeName": "South Georgia",
        "tld": [".gs"],
        "cca2": "GS",
        "ccn3": "239",
        "cca3": "SGS",
        "currency": ["GBP"],
        "callingCode": ["500"],
        "capital": "King Edward Point",
        "altSpellings": ["GS", "South Georgia and the South Sandwich Islands"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "South America",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "S\u00fcdgeorgien und die S\u00fcdlichen Sandwichinseln",
          "en": "South Georgia and the South Sandwich Islands",
          "es": "Islas Georgias del Sur y Sandwich del Sur",
          "fr": "G\u00e9orgie du Sud-et-les \u00celes Sandwich du Sud",
          "it": "Georgia del Sud e Isole Sandwich Meridionali",
          "ja": "\u30b5\u30a6\u30b9\u30b8\u30e7\u30fc\u30b8\u30a2\u30fb\u30b5\u30a6\u30b9\u30b5\u30f3\u30c9\u30a6\u30a3\u30c3\u30c1\u8af8\u5cf6",
          "nl": "Zuid-Georgia en Zuidelijke Sandwicheilanden"
        },
        "population": -1,
        "latlng": [-54.5, -37],
        "demonym": "South Georgia and the South Sandwich Islander",
        "borders": []
      },
      {
        "name": "South Korea",
        "nativeName": "\ub300\ud55c\ubbfc\uad6d",
        "tld": [".kr"],
        "cca2": "KR",
        "ccn3": "410",
        "cca3": "KOR",
        "currency": ["KRW"],
        "callingCode": ["82"],
        "capital": "Seoul",
        "altSpellings": ["KR", "Republic of Korea"],
        "relevance": "1.5",
        "region": "Asia",
        "subregion": "Eastern Asia",
        "language": ["Korean"],
        "languagesCodes": ["ko"],
        "translations": {
          "de": "S\u00fcdkorea",
          "en": "Korea (South)",
          "es": "Corea del Sur",
          "fr": "Cor\u00e9e du Sud",
          "it": "Corea del Sud",
          "ja": "\u5927\u97d3\u6c11\u56fd",
          "nl": "Zuid-Korea"
        },
        "population": 50219669,
        "latlng": [37, 127.5],
        "demonym": "South Korean",
        "borders": ["PRK"]
      },
      {
        "name": "South Sudan",
        "nativeName": "South Sudan",
        "tld": [".ss"],
        "cca2": "SS",
        "ccn3": "728",
        "cca3": "SSD",
        "currency": ["SSP"],
        "callingCode": ["211"],
        "capital": "Juba",
        "altSpellings": ["SS"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Middle Africa",
        "language": ["English"],
        "languagesCodes": [],
        "translations": {},
        "population": 11296000,
        "latlng": [7, 30],
        "demonym": "South Sudanese",
        "borders": ["CAF", "COD", "ETH", "KEN", "SDN", "UGA"]
      },
      {
        "name": "Spain",
        "nativeName": "Espa\u00f1a",
        "tld": [".es"],
        "cca2": "ES",
        "ccn3": "724",
        "cca3": "ESP",
        "currency": ["EUR"],
        "callingCode": ["34"],
        "capital": "Madrid",
        "altSpellings": ["ES", "Kingdom of Spain", "Reino de Espa\u00f1a"],
        "relevance": "2",
        "region": "Europe",
        "subregion": "Southern Europe",
        "language": ["Spanish"],
        "languagesCodes": ["es"],
        "translations": {
          "de": "Spanien",
          "en": "Spain",
          "es": "Espa\u00f1a",
          "fr": "Espagne",
          "it": "Spagna",
          "ja": "\u30b9\u30da\u30a4\u30f3",
          "nl": "Spanje"
        },
        "population": 46704314,
        "latlng": [40, -4],
        "demonym": "Spanish",
        "borders": ["AND", "FRA", "GIB", "PRT", "MAR"]
      },
      {
        "name": "Sri Lanka",
        "nativeName": "\u015br\u012b la\u1e43k\u0101va",
        "tld": [".lk"],
        "cca2": "LK",
        "ccn3": "144",
        "cca3": "LKA",
        "currency": ["LKR"],
        "callingCode": ["94"],
        "capital": "Colombo",
        "altSpellings": ["LK", "ila\u1e45kai", "Democratic Socialist Republic of Sri Lanka"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Southern Asia",
        "language": ["Sinhala", "Tamil"],
        "languagesCodes": ["si", "ta"],
        "translations": {
          "de": "Sri Lanka",
          "en": "Sri Lanka",
          "es": "Sri Lanka",
          "fr": "Sri Lanka",
          "it": "Sri Lanka",
          "ja": "\u30b9\u30ea\u30e9\u30f3\u30ab",
          "nl": "Sri Lanka"
        },
        "population": 20277597,
        "latlng": [7, 81],
        "demonym": "Sri Lankan",
        "borders": ["IND"]
      },
      {
        "name": "Sudan",
        "nativeName": "as-S\u016bd\u0101n",
        "tld": [".sd"],
        "cca2": "SD",
        "ccn3": "729",
        "cca3": "SDN",
        "currency": ["SDG"],
        "callingCode": ["249"],
        "capital": "Khartoum",
        "altSpellings": ["SD", "Republic of the Sudan", "Jumh\u016br\u012byat as-S\u016bd\u0101n"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Northern Africa",
        "language": ["Arabic", "English"],
        "languagesCodes": ["ar", "en"],
        "translations": {
          "de": "Sudan",
          "en": "Sudan",
          "es": "Sud\u00e1n",
          "fr": "Soudan",
          "it": "Sudan",
          "ja": "\u30b9\u30fc\u30c0\u30f3",
          "nl": "Soedan"
        },
        "population": 37964000,
        "latlng": [15, 30],
        "demonym": "Sudanese",
        "borders": ["CAF", "TCD", "EGY", "ERI", "ETH", "LBY", "SSD"]
      },
      {
        "name": "Suriname",
        "nativeName": "Suriname",
        "tld": [".sr"],
        "cca2": "SR",
        "ccn3": "740",
        "cca3": "SUR",
        "currency": ["SRD"],
        "callingCode": ["597"],
        "capital": "Paramaribo",
        "altSpellings": ["SR", "Sarnam", "Sranangron", "Republic of Suriname", "Republiek Suriname"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "South America",
        "language": ["Dutch"],
        "languagesCodes": ["nl"],
        "translations": {
          "de": "Suriname",
          "en": "Suriname",
          "es": "Surinam",
          "fr": "Surinam",
          "it": "Suriname",
          "ja": "\u30b9\u30ea\u30ca\u30e0",
          "nl": "Suriname"
        },
        "population": 534189,
        "latlng": [4, -56],
        "demonym": "Surinamer",
        "borders": ["BRA", "GUF", "FRA", "GUY"]
      },
      {
        "name": "Svalbard and Jan Mayen",
        "nativeName": "Svalbard og Jan Mayen",
        "tld": [".sj"],
        "cca2": "SJ",
        "ccn3": "744",
        "cca3": "SJM",
        "currency": ["NOK"],
        "callingCode": ["4779"],
        "capital": "Longyearbyen",
        "altSpellings": ["SJ", "Svalbard and Jan Mayen Islands"],
        "relevance": "0.5",
        "region": "Europe",
        "subregion": "Northern Europe",
        "language": ["Norwegian"],
        "languagesCodes": ["no"],
        "translations": {
          "de": "Svalbard und Jan Mayen",
          "en": "Svalbard and Jan Mayen",
          "es": "Islas Svalbard y Jan Mayen",
          "fr": "Svalbard et Jan Mayen",
          "it": "Svalbard e Jan Mayen",
          "ja": "\u30b9\u30f4\u30a1\u30fc\u30eb\u30d0\u30eb\u8af8\u5cf6\u304a\u3088\u3073\u30e4\u30f3\u30de\u30a4\u30a8\u30f3\u5cf6",
          "nl": "Svalbard en Jan Mayen"
        },
        "population": 2655,
        "latlng": [78, 20],
        "demonym": "Norwegian",
        "borders": []
      },
      {
        "name": "Swaziland",
        "nativeName": "Swaziland",
        "tld": [".sz"],
        "cca2": "SZ",
        "ccn3": "748",
        "cca3": "SWZ",
        "currency": ["SZL"],
        "callingCode": ["268"],
        "capital": "Lobamba",
        "altSpellings": ["SZ", "weSwatini", "Swatini", "Ngwane", "Kingdom of Swaziland", "Umbuso waseSwatini"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Southern Africa",
        "language": ["Swazi", "English"],
        "languagesCodes": ["en", "ss"],
        "translations": {
          "de": "Swasiland",
          "en": "Swaziland",
          "es": "Suazilandia",
          "fr": "Swaziland",
          "it": "Swaziland",
          "ja": "\u30b9\u30ef\u30b8\u30e9\u30f3\u30c9",
          "nl": "Swaziland"
        },
        "population": 1250000,
        "latlng": [-26.5, 31.5],
        "demonym": "Swazi",
        "borders": ["MOZ", "ZAF"]
      },
      {
        "name": "Sweden",
        "nativeName": "Sverige",
        "tld": [".se"],
        "cca2": "SE",
        "ccn3": "752",
        "cca3": "SWE",
        "currency": ["SEK"],
        "callingCode": ["46"],
        "capital": "Stockholm",
        "altSpellings": ["SE", "Kingdom of Sweden", "Konungariket Sverige"],
        "relevance": "1.5",
        "region": "Europe",
        "subregion": "Northern Europe",
        "language": ["Swedish"],
        "languagesCodes": ["sv"],
        "translations": {
          "de": "Schweden",
          "en": "Sweden",
          "es": "Suecia",
          "fr": "Su\u00e8de",
          "it": "Svezia",
          "ja": "\u30b9\u30a6\u30a7\u30fc\u30c7\u30f3",
          "nl": "Zweden"
        },
        "population": 9625444,
        "latlng": [62, 15],
        "demonym": "Swedish",
        "borders": ["FIN", "NOR"]
      },
      {
        "name": "Switzerland",
        "nativeName": "Schweiz",
        "tld": [".ch"],
        "cca2": "CH",
        "ccn3": "756",
        "cca3": "CHE",
        "currency": ["CHE", "CHF", "CHW"],
        "callingCode": ["41"],
        "capital": "Bern",
        "altSpellings": ["CH", "Swiss Confederation", "Schweiz", "Suisse", "Svizzera", "Svizra"],
        "relevance": "1.5",
        "region": "Europe",
        "subregion": "Western Europe",
        "language": ["German", "French", "Italian", "Romansh"],
        "languagesCodes": ["de", "fr", "it"],
        "translations": {
          "de": "Schweiz",
          "en": "Switzerland",
          "es": "Suiza",
          "fr": "Suisse",
          "it": "Svizzera",
          "ja": "\u30b9\u30a4\u30b9",
          "nl": "Zwitserland"
        },
        "population": 8085300,
        "latlng": [47, 8],
        "demonym": "Swiss",
        "borders": ["AUT", "FRA", "ITA", "LIE", "DEU"]
      },
      {
        "name": "Syria",
        "nativeName": "S\u016briy\u0101",
        "tld": [".sy"],
        "cca2": "SY",
        "ccn3": "760",
        "cca3": "SYR",
        "currency": ["SYP"],
        "callingCode": ["963"],
        "capital": "Damascus",
        "altSpellings": ["SY", "Syrian Arab Republic", "Al-Jumh\u016br\u012byah Al-\u02bbArab\u012byah As-S\u016br\u012byah"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Western Asia",
        "language": ["Arabic"],
        "languagesCodes": ["ar"],
        "translations": {
          "de": "Syrien",
          "en": "Syria",
          "es": "Siria",
          "fr": "Syrie",
          "it": "Siria",
          "ja": "\u30b7\u30ea\u30a2\u30fb\u30a2\u30e9\u30d6\u5171\u548c\u56fd",
          "nl": "Syri\u00eb"
        },
        "population": 21898000,
        "latlng": [35, 38],
        "demonym": "Syrian",
        "borders": ["IRQ", "ISR", "JOR", "LBN", "TUR"]
      },
      {
        "name": "Taiwan",
        "nativeName": "\u81fa\u7063",
        "tld": [".tw"],
        "cca2": "TW",
        "ccn3": "158",
        "cca3": "TWN",
        "currency": ["TWD"],
        "callingCode": ["886"],
        "capital": "Taipei",
        "altSpellings": ["TW", "T\u00e1iw\u0101n", "Republic of China", "\u4e2d\u83ef\u6c11\u570b", "Zh\u014dnghu\u00e1 M\u00edngu\u00f3"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Eastern Asia",
        "language": ["Standard Chinese"],
        "languagesCodes": ["zh"],
        "translations": {
          "de": "Taiwan",
          "en": "Taiwan",
          "es": "Taiw\u00e1n",
          "fr": "Ta\u00efwan",
          "it": "Taiwan",
          "ja": "\u53f0\u6e7e\uff08\u53f0\u6e7e\u7701\/\u4e2d\u83ef\u6c11\u56fd\uff09",
          "nl": "Taiwan"
        },
        "population": 23361147,
        "latlng": [23.5, 121],
        "demonym": "Taiwanese",
        "borders": []
      },
      {
        "name": "Tajikistan",
        "nativeName": "\u0422\u043e\u04b7\u0438\u043a\u0438\u0441\u0442\u043e\u043d",
        "tld": [".tj"],
        "cca2": "TJ",
        "ccn3": "762",
        "cca3": "TJK",
        "currency": ["TJS"],
        "callingCode": ["992"],
        "capital": "Dushanbe",
        "altSpellings": ["TJ", "To\u00e7ikiston", "Republic of Tajikistan", "\u04b6\u0443\u043c\u04b3\u0443\u0440\u0438\u0438 \u0422\u043e\u04b7\u0438\u043a\u0438\u0441\u0442\u043e\u043d", "\u00c7umhuriyi To\u00e7ikiston"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Central Asia",
        "language": ["Tajik"],
        "languagesCodes": ["tg", "ru"],
        "translations": {
          "de": "Tadschikistan",
          "en": "Tajikistan",
          "es": "Tayikist\u00e1n",
          "fr": "Tadjikistan",
          "it": "Tagikistan",
          "ja": "\u30bf\u30b8\u30ad\u30b9\u30bf\u30f3",
          "nl": "Tadzjikistan"
        },
        "population": 8000000,
        "latlng": [39, 71],
        "demonym": "Tadzhik",
        "borders": ["AFG", "CHN", "KGZ", "UZB"]
      },
      {
        "name": "Tanzania",
        "nativeName": "Tanzania",
        "tld": [".tz"],
        "cca2": "TZ",
        "ccn3": "834",
        "cca3": "TZA",
        "currency": ["TZS"],
        "callingCode": ["255"],
        "capital": "Dodoma",
        "altSpellings": ["TZ", "United Republic of Tanzania", "Jamhuri ya Muungano wa Tanzania"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Eastern Africa",
        "language": ["Swahili", "English"],
        "languagesCodes": ["sw", "en"],
        "translations": {
          "de": "Tansania",
          "en": "Tanzania",
          "es": "Tanzania",
          "fr": "Tanzanie",
          "it": "Tanzania",
          "ja": "\u30bf\u30f3\u30b6\u30cb\u30a2",
          "nl": "Tanzania"
        },
        "population": 44928923,
        "latlng": [-6, 35],
        "demonym": "Tanzanian",
        "borders": ["BDI", "COD", "KEN", "MWI", "MOZ", "RWA", "UGA", "ZMB"]
      },
      {
        "name": "Thailand",
        "nativeName": "\u0e1b\u0e23\u0e30\u0e40\u0e17\u0e28\u0e44\u0e17\u0e22",
        "tld": [".th"],
        "cca2": "TH",
        "ccn3": "764",
        "cca3": "THA",
        "currency": ["THB"],
        "callingCode": ["66"],
        "capital": "Bangkok",
        "altSpellings": ["TH", "Prathet", "Thai", "Kingdom of Thailand", "\u0e23\u0e32\u0e0a\u0e2d\u0e32\u0e13\u0e32\u0e08\u0e31\u0e01\u0e23\u0e44\u0e17\u0e22", "Ratcha Anachak Thai"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "South-Eastern Asia",
        "language": ["Thai"],
        "languagesCodes": [],
        "translations": {},
        "population": 65926261,
        "latlng": [15, 100],
        "demonym": "Thai",
        "borders": ["Burma", "KHM", "LAO", "MYS"]
      },
      {
        "name": "Timor-Leste",
        "nativeName": "Timor-Leste",
        "tld": [".tl"],
        "cca2": "TL",
        "ccn3": "626",
        "cca3": "TLS",
        "currency": ["USD"],
        "callingCode": ["670"],
        "capital": "Dili",
        "altSpellings": ["TL", "East Timor", "Democratic Republic of Timor-Leste", "Rep\u00fablica Democr\u00e1tica de Timor-Leste", "Rep\u00fablika Demokr\u00e1tika Tim\u00f3r-Leste"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "South-Eastern Asia",
        "language": ["Portuguese", "Tetum"],
        "languagesCodes": [],
        "translations": {},
        "population": -1,
        "latlng": [-8.83333333, 125.91666666],
        "demonym": "East Timorese",
        "borders": [ "IDN" ]
      },
      {
        "name": "Togo",
        "nativeName": "Togo",
        "tld": [".tg"],
        "cca2": "TG",
        "ccn3": "768",
        "cca3": "TGO",
        "currency": ["XOF"],
        "callingCode": ["228"],
        "capital": "Lom\u00e9",
        "altSpellings": ["TG", "Togolese", "Togolese Republic", "R\u00e9publique Togolaise"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Western Africa",
        "language": ["French"],
        "languagesCodes": ["fr"],
        "translations": {
          "de": "Togo",
          "en": "Togo",
          "es": "Togo",
          "fr": "Togo",
          "it": "Togo",
          "ja": "\u30c8\u30fc\u30b4",
          "nl": "Togo"
        },
        "population": 6191155,
        "latlng": [8, 1.16666666],
        "demonym": "Togolese",
        "borders": ["BEN", "BFA", "GHA"]
      },
      {
        "name": "Tokelau",
        "nativeName": "Tokelau",
        "tld": [".tk"],
        "cca2": "TK",
        "ccn3": "772",
        "cca3": "TKL",
        "currency": ["NZD"],
        "callingCode": ["690"],
        "capital": "Fakaofo",
        "altSpellings": ["TK"],
        "relevance": "0.5",
        "region": "Oceania",
        "subregion": "Polynesia",
        "language": ["Tokelauan", "English", "Samoan"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Tokelau",
          "en": "Tokelau",
          "es": "Islas Tokelau",
          "fr": "Tokelau",
          "it": "Isole Tokelau",
          "ja": "\u30c8\u30b1\u30e9\u30a6",
          "nl": "Tokelau"
        },
        "population": 1411,
        "latlng": [-9, -172],
        "demonym": "Tokelauan",
        "borders": []
      },
      {
        "name": "Tonga",
        "nativeName": "Tonga",
        "tld": [".to"],
        "cca2": "TO",
        "ccn3": "776",
        "cca3": "TON",
        "currency": ["TOP"],
        "callingCode": ["676"],
        "capital": "Nuku'alofa",
        "altSpellings": ["TO"],
        "relevance": "0",
        "region": "Oceania",
        "subregion": "Polynesia",
        "language": ["Tongan", "English"],
        "languagesCodes": ["en", "to"],
        "translations": {
          "de": "Tonga",
          "en": "Tonga",
          "es": "Tonga",
          "fr": "Tonga",
          "it": "Tonga",
          "ja": "\u30c8\u30f3\u30ac",
          "nl": "Tonga"
        },
        "population": 103036,
        "latlng": [-20, -175],
        "demonym": "Tongan",
        "borders": []
      },
      {
        "name": "Trinidad and Tobago",
        "nativeName": "Trinidad and Tobago",
        "tld": [".tt"],
        "cca2": "TT",
        "ccn3": "780",
        "cca3": "TTO",
        "currency": ["TTD"],
        "callingCode": ["1868"],
        "capital": "Port of Spain",
        "altSpellings": ["TT", "Republic of Trinidad and Tobago"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Trinidad und Tobago",
          "en": "Trinidad and Tobago",
          "es": "Trinidad y Tobago",
          "fr": "Trinit\u00e9 et Tobago",
          "it": "Trinidad e Tobago",
          "ja": "\u30c8\u30ea\u30cb\u30c0\u30fc\u30c9\u30fb\u30c8\u30d0\u30b4",
          "nl": "Trinidad en Tobago"
        },
        "population": 1328019,
        "latlng": [11, -61],
        "demonym": "Trinidadian",
        "borders": []
      },
      {
        "name": "Tunisia",
        "nativeName": "T\u016bnis",
        "tld": [".tn"],
        "cca2": "TN",
        "ccn3": "788",
        "cca3": "TUN",
        "currency": ["TND"],
        "callingCode": ["216"],
        "capital": "Tunis",
        "altSpellings": ["TN", "Republic of Tunisia", "al-Jumh\u016briyyah at-T\u016bnisiyyah"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Northern Africa",
        "language": ["Arabic"],
        "languagesCodes": ["ar", "fr"],
        "translations": {
          "de": "Tunesien",
          "en": "Tunisia",
          "es": "T\u00fanez",
          "fr": "Tunisie",
          "it": "Tunisia",
          "ja": "\u30c1\u30e5\u30cb\u30b8\u30a2",
          "nl": "Tunesi\u00eb"
        },
        "population": 10833431,
        "latlng": [34, 9],
        "demonym": "Tunisian",
        "borders": ["DZA", "LBY"]
      },
      {
        "name": "Turkey",
        "nativeName": "T\u00fcrkiye",
        "tld": [".tr"],
        "cca2": "TR",
        "ccn3": "792",
        "cca3": "TUR",
        "currency": ["TRY"],
        "callingCode": ["90"],
        "capital": "Ankara",
        "altSpellings": ["TR", "Turkiye", "Republic of Turkey", "T\u00fcrkiye Cumhuriyeti"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Western Asia",
        "language": ["Turkish"],
        "languagesCodes": ["tr"],
        "translations": {
          "de": "T\u00fcrkei",
          "en": "Turkey",
          "es": "Turqu\u00eda",
          "fr": "Turquie",
          "it": "Turchia",
          "ja": "\u30c8\u30eb\u30b3",
          "nl": "Turkije"
        },
        "population": 75627384,
        "latlng": [39, 35],
        "demonym": "Turkish",
        "borders": ["ARM", "AZE", "BGR", "GEO", "GRC", "IRN", "IRQ", "SYR"]
      },
      {
        "name": "Turkmenistan",
        "nativeName": "T\u00fcrkmenistan",
        "tld": [".tm"],
        "cca2": "TM",
        "ccn3": "795",
        "cca3": "TKM",
        "currency": ["TMT"],
        "callingCode": ["993"],
        "capital": "Ashgabat",
        "altSpellings": ["TM"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Central Asia",
        "language": ["Turkmen"],
        "languagesCodes": ["tk", "ru"],
        "translations": {
          "de": "Turkmenistan",
          "en": "Turkmenistan",
          "es": "Turkmenist\u00e1n",
          "fr": "Turkm\u00e9nistan",
          "it": "Turkmenistan",
          "ja": "\u30c8\u30eb\u30af\u30e1\u30cb\u30b9\u30bf\u30f3",
          "nl": "Turkmenistan"
        },
        "population": 5240000,
        "latlng": [40, 60],
        "demonym": "Turkmen",
        "borders": ["AFG", "IRN", "KAZ", "UZB"]
      },
      {
        "name": "Turks and Caicos Islands",
        "nativeName": "Turks and Caicos Islands",
        "tld": [".tc"],
        "cca2": "TC",
        "ccn3": "796",
        "cca3": "TCA",
        "currency": ["USD"],
        "callingCode": ["1649"],
        "capital": "Cockburn Town",
        "altSpellings": ["TC"],
        "relevance": "0.5",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Turks- und Caicosinseln",
          "en": "Turks and Caicos Islands",
          "es": "Islas Turks y Caicos",
          "fr": "\u00celes Turques-et-Ca\u00efques",
          "it": "Isole Turks e Caicos",
          "ja": "\u30bf\u30fc\u30af\u30b9\u30fb\u30ab\u30a4\u30b3\u30b9\u8af8\u5cf6",
          "nl": "Turks- en Caicoseilanden"
        },
        "population": 31458,
        "latlng": [21.75, -71.58333333],
        "demonym": "Turks and Caicos Islander",
        "borders": []
      },
      {
        "name": "Tuvalu",
        "nativeName": "Tuvalu",
        "tld": [".tv"],
        "cca2": "TV",
        "ccn3": "798",
        "cca3": "TUV",
        "currency": ["AUD"],
        "callingCode": ["688"],
        "capital": "Funafuti",
        "altSpellings": ["TV"],
        "relevance": "0.5",
        "region": "Oceania",
        "subregion": "Polynesia",
        "language": ["Tuvaluan", "English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Tuvalu",
          "en": "Tuvalu",
          "es": "Tuvalu",
          "fr": "Tuvalu",
          "it": "Tuvalu",
          "ja": "\u30c4\u30d0\u30eb",
          "nl": "Tuvalu"
        },
        "population": 11323,
        "latlng": [-8, 178],
        "demonym": "Tuvaluan",
        "borders": []
      },
      {
        "name": "Uganda",
        "nativeName": "Uganda",
        "tld": [".ug"],
        "cca2": "UG",
        "ccn3": "800",
        "cca3": "UGA",
        "currency": ["UGX"],
        "callingCode": ["256"],
        "capital": "Kampala",
        "altSpellings": ["UG", "Republic of Uganda", "Jamhuri ya Uganda"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Eastern Africa",
        "language": ["English", "Swahili"],
        "languagesCodes": ["en", "sw"],
        "translations": {
          "de": "Uganda",
          "en": "Uganda",
          "es": "Uganda",
          "fr": "Uganda",
          "it": "Uganda",
          "ja": "\u30a6\u30ac\u30f3\u30c0",
          "nl": "Oeganda"
        },
        "population": 35357000,
        "latlng": [1, 32],
        "demonym": "Ugandan",
        "borders": ["COD", "KEN", "RWA", "SSD", "TZA"]
      },
      {
        "name": "Ukraine",
        "nativeName": "\u0423\u043a\u0440\u0430\u0457\u043d\u0430",
        "tld": [".ua"],
        "cca2": "UA",
        "ccn3": "804",
        "cca3": "UKR",
        "currency": ["UAH"],
        "callingCode": ["380"],
        "capital": "Kiev",
        "altSpellings": ["UA", "Ukrayina"],
        "relevance": "0",
        "region": "Europe",
        "subregion": "Eastern Europe",
        "language": ["Ukrainian"],
        "languagesCodes": ["uk"],
        "translations": {
          "de": "Ukraine",
          "en": "Ukraine",
          "es": "Ucrania",
          "fr": "Ukraine",
          "it": "Ucraina",
          "ja": "\u30a6\u30af\u30e9\u30a4\u30ca",
          "nl": "Oekra\u00efne"
        },
        "population": 45461627,
        "latlng": [49, 32],
        "demonym": "Ukrainian",
        "borders": ["BLR", "HUN", "MDA", "POL", "ROU", "RUS", "SVK"]
      },
      {
        "name": "United Arab Emirates",
        "nativeName": "Dawlat al-\u02beIm\u0101r\u0101t al-\u02bfArabiyyah al-Mutta\u1e25idah",
        "tld": [".ae"],
        "cca2": "AE",
        "ccn3": "784",
        "cca3": "ARE",
        "currency": ["AED"],
        "callingCode": ["971"],
        "capital": "Abu Dhabi",
        "altSpellings": ["AE", "UAE"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Western Asia",
        "language": ["Arabic"],
        "languagesCodes": ["ar"],
        "translations": {
          "de": "Vereinigte Arabische Emirate",
          "en": "United Arab Emirates",
          "es": "Emiratos \u00c1rabes Unidos",
          "fr": "\u00c9mirats arabes unis",
          "it": "Emirati Arabi Uniti",
          "ja": "\u30a2\u30e9\u30d6\u9996\u9577\u56fd\u9023\u90a6",
          "nl": "Verenigde Arabische Emiraten"
        },
        "population": 8264070,
        "latlng": [24, 54],
        "demonym": "Emirian",
        "borders": ["OMN", "SAU"]
      },
      {
        "name": "United Kingdom",
        "nativeName": "United Kingdom",
        "tld": [".uk"],
        "cca2": "GB",
        "ccn3": "826",
        "cca3": "GBR",
        "currency": ["GBP"],
        "callingCode": ["44"],
        "capital": "London",
        "altSpellings": ["GB", "UK", "Great Britain"],
        "relevance": "2.5",
        "region": "Europe",
        "subregion": "Northern Europe",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Vereinigtes K\u00f6nigreich",
          "en": "United Kingdom",
          "es": "Reino Unido",
          "fr": "Royaume-Uni",
          "it": "Regno Unito",
          "ja": "\u30a4\u30ae\u30ea\u30b9",
          "nl": "Verenigd Koninkrijk"
        },
        "population": 63705000,
        "latlng": [54, -2],
        "demonym": "British",
        "borders": ["IRL"]
      },
      {
        "name": "United States",
        "nativeName": "United States",
        "tld": [".us"],
        "cca2": "US",
        "ccn3": "840",
        "cca3": "USA",
        "currency": ["USD", "USN", "USS"],
        "callingCode": ["1"],
        "capital": "Washington D.C.",
        "altSpellings": ["US", "USA", "United States of America"],
        "relevance": "3.5",
        "region": "Americas",
        "subregion": "Northern America",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Vereinigte Staaten von Amerika",
          "en": "United States of America",
          "es": "Estados Unidos",
          "fr": "\u00c9tats-Unis",
          "it": "Stati Uniti D'America",
          "ja": "\u30a2\u30e1\u30ea\u30ab\u5408\u8846\u56fd",
          "nl": "Verenigde Staten"
        },
        "population": 317101000,
        "latlng": [38, -97],
        "demonym": "American",
        "borders": ["CAN", "MEX"]
      },
      {
        "name": "United States Minor Outlying Islands",
        "nativeName": "United States Minor Outlying Islands",
        "tld": [".us"],
        "cca2": "UM",
        "ccn3": "581",
        "cca3": "UMI",
        "currency": ["USD"],
        "callingCode": [""],
        "capital": "",
        "altSpellings": ["UM"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "Northern America",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Kleinere Inselbesitzungen der Vereinigten Staaten",
          "en": "United States Minor Outlying Islands",
          "es": "Islas Ultramarinas Menores de Estados Unidos",
          "fr": "\u00celes mineures \u00e9loign\u00e9es des \u00c9tats-Unis",
          "it": "Isole minori esterne degli Stati Uniti d'America",
          "ja": "\u5408\u8846\u56fd\u9818\u6709\u5c0f\u96e2\u5cf6",
          "nl": "Kleine afgelegen eilanden van de Verenigde Staten"
        },
        "population": -1,
        "latlng": [],
        "demonym": "American",
        "borders": []
      },
      {
        "name": "United States Virgin Islands",
        "nativeName": "United States Virgin Islands",
        "tld": [".vi"],
        "cca2": "VI",
        "ccn3": "850",
        "cca3": "VIR",
        "currency": ["USD"],
        "callingCode": ["1340"],
        "capital": "Charlotte Amalie",
        "altSpellings": ["VI"],
        "relevance": "0.5",
        "region": "Americas",
        "subregion": "Caribbean",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Amerikanische Jungferninseln",
          "en": "Virgin Islands of the United States",
          "es": "Islas V\u00edrgenes de los Estados Unidos",
          "fr": "\u00celes Vierges des \u00c9tats-Unis",
          "it": "Isole Vergini americane",
          "ja": "\u30a2\u30e1\u30ea\u30ab\u9818\u30f4\u30a1\u30fc\u30b8\u30f3\u8af8\u5cf6",
          "nl": "Amerikaanse Maagdeneilanden"
        },
        "population": 106405,
        "latlng": [18.35, -64.933333],
        "demonym": "Virgin Islander",
        "borders": []
      },
      {
        "name": "Uruguay",
        "nativeName": "Uruguay",
        "tld": [".uy"],
        "cca2": "UY",
        "ccn3": "858",
        "cca3": "URY",
        "currency": ["UYI", "UYU"],
        "callingCode": ["598"],
        "capital": "Montevideo",
        "altSpellings": ["UY", "Oriental Republic of Uruguay", "Rep\u00fablica Oriental del Uruguay"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "South America",
        "language": ["Spanish"],
        "languagesCodes": ["es"],
        "translations": {
          "de": "Uruguay",
          "en": "Uruguay",
          "es": "Uruguay",
          "fr": "Uruguay",
          "it": "Uruguay",
          "ja": "\u30a6\u30eb\u30b0\u30a2\u30a4",
          "nl": "Uruguay"
        },
        "population": 3286314,
        "latlng": [-33, -56],
        "demonym": "Uruguayan",
        "borders": ["ARG", "BRA"]
      },
      {
        "name": "Uzbekistan",
        "nativeName": "O\u2018zbekiston",
        "tld": [".uz"],
        "cca2": "UZ",
        "ccn3": "860",
        "cca3": "UZB",
        "currency": ["UZS"],
        "callingCode": ["998"],
        "capital": "Tashkent",
        "altSpellings": ["UZ", "Republic of Uzbekistan", "O\u2018zbekiston Respublikasi", "\u040e\u0437\u0431\u0435\u043a\u0438\u0441\u0442\u043e\u043d \u0420\u0435\u0441\u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0441\u0438"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Central Asia",
        "language": ["Uzbek"],
        "languagesCodes": ["uz", "ru"],
        "translations": {
          "de": "Usbekistan",
          "en": "Uzbekistan",
          "es": "Uzbekist\u00e1n",
          "fr": "Ouzb\u00e9kistan",
          "it": "Uzbekistan",
          "ja": "\u30a6\u30ba\u30d9\u30ad\u30b9\u30bf\u30f3",
          "nl": "Oezbekistan"
        },
        "population": 30183400,
        "latlng": [41, 64],
        "demonym": "Uzbekistani",
        "borders": ["AFG", "KAZ", "KGZ", "TJK", "TKM"]
      },
      {
        "name": "Vanuatu",
        "nativeName": "Vanuatu",
        "tld": [".vu"],
        "cca2": "VU",
        "ccn3": "548",
        "cca3": "VUT",
        "currency": ["VUV"],
        "callingCode": ["678"],
        "capital": "Port Vila",
        "altSpellings": ["VU", "Republic of Vanuatu", "Ripablik blong Vanuatu", "R\u00e9publique de Vanuatu"],
        "relevance": "0",
        "region": "Oceania",
        "subregion": "Melanesia",
        "language": ["Bislama", "French", "English"],
        "languagesCodes": ["bi", "en", "fr"],
        "translations": {
          "de": "Vanuatu",
          "en": "Vanuatu",
          "es": "Vanuatu",
          "fr": "Vanuatu",
          "it": "Vanuatu",
          "ja": "\u30d0\u30cc\u30a2\u30c4",
          "nl": "Vanuatu"
        },
        "population": 264652,
        "latlng": [-16, 167],
        "demonym": "Ni-Vanuatu",
        "borders": []
      },
      {
        "name": "Venezuela",
        "nativeName": "Venezuela",
        "tld": [".ve"],
        "cca2": "VE",
        "ccn3": "862",
        "cca3": "VEN",
        "currency": ["VEF"],
        "callingCode": ["58"],
        "capital": "Caracas",
        "altSpellings": ["VE", "Bolivarian Republic of Venezuela", "Rep\u00fablica Bolivariana de Venezuela"],
        "relevance": "0",
        "region": "Americas",
        "subregion": "South America",
        "language": ["Spanish"],
        "languagesCodes": ["es"],
        "translations": {
          "de": "Venezuela",
          "en": "Venezuela",
          "es": "Venezuela",
          "fr": "Venezuela",
          "it": "Venezuela",
          "ja": "\u30d9\u30cd\u30ba\u30a8\u30e9\u30fb\u30dc\u30ea\u30d0\u30eb\u5171\u548c\u56fd",
          "nl": "Venezuela"
        },
        "population": 28946101,
        "latlng": [8, -66],
        "demonym": "Venezuelan",
        "borders": ["BRA", "COL", "GUY"]
      },
      {
        "name": "Vietnam",
        "nativeName": "Vi\u1ec7t Nam",
        "tld": [".vn"],
        "cca2": "VN",
        "ccn3": "704",
        "cca3": "VNM",
        "currency": ["VND"],
        "callingCode": ["84"],
        "capital": "Hanoi",
        "altSpellings": ["VN", "Socialist Republic of Vietnam", "C\u1ed9ng h\u00f2a X\u00e3 h\u1ed9i ch\u1ee7 ngh\u0129a Vi\u1ec7t Nam"],
        "relevance": "1.5",
        "region": "Asia",
        "subregion": "South-Eastern Asia",
        "language": ["Vietnamese"],
        "languagesCodes": ["vi"],
        "translations": {},
        "population": 90388000,
        "latlng": [16.16666666, 107.83333333],
        "demonym": "Vietnamese",
        "borders": ["KHM", "CHN", "LAO"]
      },
      {
        "name": "Wallis and Futuna",
        "nativeName": "Wallis et Futuna",
        "tld": [".wf"],
        "cca2": "WF",
        "ccn3": "876",
        "cca3": "WLF",
        "currency": ["XPF"],
        "callingCode": ["681"],
        "capital": "Mata-Utu",
        "altSpellings": ["WF", "Territory of the Wallis and Futuna Islands", "Territoire des \u00eeles Wallis et Futuna"],
        "relevance": "0.5",
        "region": "Oceania",
        "subregion": "Polynesia",
        "language": ["French"],
        "languagesCodes": ["fr"],
        "translations": {
          "de": "Wallis und Futuna",
          "en": "Wallis and Futuna",
          "es": "Wallis y Futuna",
          "fr": "Wallis-et-Futuna",
          "it": "Wallis e Futuna",
          "ja": "\u30a6\u30a9\u30ea\u30b9\u30fb\u30d5\u30c4\u30ca",
          "nl": "Wallis en Futuna"
        },
        "population": 13135,
        "latlng": [-13.3, -176.2],
        "demonym": "Wallis and Futuna Islander",
        "borders": []
      },
      {
        "name": "Western Sahara",
        "nativeName": "A\u1e63-\u1e62a\u1e25r\u0101\u2019 al-\u0120arbiyya",
        "tld": [".eh"],
        "cca2": "EH",
        "ccn3": "732",
        "cca3": "ESH",
        "currency": ["MAD", "DZD", "MRO"],
        "callingCode": ["212"],
        "capital": "El Aai\u00fan",
        "altSpellings": ["EH", "Tane\u1e93roft Tutrimt"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Northern Africa",
        "language": ["Berber", "Hassaniya"],
        "languagesCodes": ["es", "fr"],
        "translations": {
          "de": "Westsahara",
          "en": "Western Sahara",
          "es": "Sahara Occidental",
          "fr": "Sahara Occidental",
          "it": "Sahara Occidentale",
          "ja": "\u897f\u30b5\u30cf\u30e9",
          "nl": "Westelijke Sahara"
        },
        "population": 567000,
        "latlng": [24.5, -13],
        "demonym": "Sahrawi",
        "borders": ["DZA", "MRT", "MAR"]
      },
      {
        "name": "Yemen",
        "nativeName": "al-Yaman",
        "tld": [".ye"],
        "cca2": "YE",
        "ccn3": "887",
        "cca3": "YEM",
        "currency": ["YER"],
        "callingCode": ["967"],
        "capital": "Sana'a",
        "altSpellings": ["YE", "Yemeni Republic", "al-Jumh\u016briyyah al-Yamaniyyah"],
        "relevance": "0",
        "region": "Asia",
        "subregion": "Western Asia",
        "language": ["Arabic"],
        "languagesCodes": ["ar"],
        "translations": {
          "de": "Jemen",
          "en": "Yemen",
          "es": "Yemen",
          "fr": "Y\u00e9men",
          "it": "Yemen",
          "ja": "\u30a4\u30a8\u30e1\u30f3",
          "nl": "Jemen"
        },
        "population": 24527000,
        "latlng": [15, 48],
        "demonym": "Yemeni",
        "borders": ["OMN", "SAU"]
      },
      {
        "name": "Zambia",
        "nativeName": "Zambia",
        "tld": [".zm"],
        "cca2": "ZM",
        "ccn3": "894",
        "cca3": "ZMB",
        "currency": ["ZMK"],
        "callingCode": ["260"],
        "capital": "Lusaka",
        "altSpellings": ["ZM", "Republic of Zambia"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Eastern Africa",
        "language": ["English"],
        "languagesCodes": ["en"],
        "translations": {
          "de": "Sambia",
          "en": "Zambia",
          "es": "Zambia",
          "fr": "Zambie",
          "it": "Zambia",
          "ja": "\u30b6\u30f3\u30d3\u30a2",
          "nl": "Zambia"
        },
        "population": 13092666,
        "latlng": [-15, 30],
        "demonym": "Zambian",
        "borders": ["AGO", "BWA", "COD", "MWI", "MOZ", "NAM", "TZA", "ZWE"]
      },
      {
        "name": "Zimbabwe",
        "nativeName": "Zimbabwe",
        "tld": [".zw"],
        "cca2": "ZW",
        "ccn3": "716",
        "cca3": "ZWE",
        "currency": ["ZWL"],
        "callingCode": ["263"],
        "capital": "Harare",
        "altSpellings": ["ZW", "Republic of Zimbabwe"],
        "relevance": "0",
        "region": "Africa",
        "subregion": "Eastern Africa",
        "language": ["Chewa", "Chibarwe", "English", "Kalanga", "Koisan", "Nambya", "Ndau", "Ndebele", "Shangani", "Shona", "Zimbabwean sign language", "Sotho", "Tonga", "Tswana", "Venda", "Xhosa"],
        "languagesCodes": ["en", "sn", "nd"],
        "translations": {
          "de": "Simbabwe",
          "en": "Zimbabwe",
          "es": "Zimbabue",
          "fr": "Zimbabwe",
          "it": "Zimbabwe",
          "ja": "\u30b8\u30f3\u30d0\u30d6\u30a8",
          "nl": "Zimbabwe"
        },
        "population": 12973808,
        "latlng": [-20, 30],
        "demonym": "Zimbabwean",
        "borders": ["BWA", "MOZ", "ZAF", "ZMB"]
      }
    ];

    util.STATES = 
    {
      "Countries": [
        {
          "n":"Canada",
          "v":"CA",
          "s": [
            {
              "n":"Alberta",
              "v":"AB"
            },
            {
              "n":"British Columbia",
              "v":"BC"
            },
            {
              "n":"Manitoba", 
              "v":"MB"
            },
            {
              "n":"New Brunswick",
              "v":"NB"
            },
            {
              "n":"Newfoundland",
              "v":"NL"
            },
            {
              "n":"Northwest Territories",
              "v":"NT"
            },
            {
              "n":"Nova Scotia",
              "v":"NS"
            },
            {
              "n":"Nunavut",
              "v":"NU"
            },
            {
              "n":"Ontario",
              "v":"ON"
            },
            {
              "n":"Prince Edward Island",
              "v":"PE"
            },
            {
              "n":"Quebec",
              "v":"QC"
            },
            {
              "n":"Saskatchewan",
              "v":"SK"
            },
            {
              "n":"Yukon Territory",
              "v":"YT"
            }
          ]
        },
        {
          "n":"UnitedStates",
          "v":"US",
          "s": [
            {
              "n":"Alabama",
              "v":"AL"
            },
            {
              "n":"Alaska",
              "v":"AK"
            },
            {
              "n":"Arizona",
              "v":"AZ"
            },
            {
              "n":"Arkansas",
              "v":"AR"
            },
            {
              "n":"California",
              "v":"CA"
            },
            {
              "n":"Colorado",
              "v":"NC"
            },
            {
              "n":"Connecticut",
              "v":"CT"
            },
            {
              "n":"Delaware",
              "v":"DE"
            },
            {
              "n":"District of Columbia",
              "v":"DC"
            },
            {
              "n":"Florida",
              "v":"FL"
            },
            {
              "n":"Georgia",
              "v":"GA"
            },
            {
              "n":"Hawaii",
              "v":"HI"
            },
            {
              "n":"Idaho",
              "v":"ID"
            },
            {
              "n":"Illinois",
              "v":"IL"
            },
            {
              "n":"Indiana",
              "v":"IN"
            },
            {
              "n":"Iowa",
              "v":"IA"
            },
            {
              "n":"Kansas",
              "v":"KS"
            },
            {
              "n":"Kentucky",
              "v":"KY"
            },
            {
              "n":"Louisiana",
              "v":"LA"
            },
            {
              "n":"Maine",
              "v":"ME"
            },
            {
              "n":"Maryland",
              "v":"MD"
            },
            {
              "n":"Massachusetts",
              "v":"MA"
            },
            {
              "n":"Michigan",
              "v":"MI"
            },
            {
              "n":"Minnesota",
              "v":"Mn"
            },
            {
              "n":"Mississippi",
              "v":"MS"
            },
            {
              "n":"Missouri",
              "v":"MO"
            },
            {
              "n":"Montana",
              "v":"MT"
            },
            {
              "n":"Nebraska",
              "v":"NE"
            },
            {
              "n":"Nevada",
              "v":"NV"
            },
            {
              "n":"New Hampshire",
              "v":"NH"
            },
            {
              "n":"New Jersey",
              "v":"NJ"
            },
            {
              "n":"New Mexico",
              "v":"NM"
            },
            {
              "n":"New York",
              "v":"NY"
            },
            {
              "n":"North Carolina",
              "v":"NC"
            },
            {
              "n":"North Dakota",
              "v":"ND"
            },
            {
              "n":"Ohio",
              "v":"OH"
            },
            {
              "n":"Oklahoma",
              "v":"OK"
            },
            {
              "n":"Oregon",
              "v":"OR"
            },
            {
              "n":"Pennsylvania",
              "v":"PA"
            },
            {
              "n":"Rhode Island",
              "v":"RI"
            },
            {
              "n":"South Carolina",
              "v":"SC"
            },
            {
              "n":"South Dakota",
              "v":"SD"
            },
            {
              "n":"Tennessee",
              "v":"TN"
            },
            {
              "n":"Texas",
              "v":"TX"
            },
            {
              "n":"Utah",
              "v":"UT"
            },
            {
              "n":"Vermont",
              "v":"VT"
            },
            {
              "n":"Virginia",
              "v":"VA"
            },
            {
              "n":"Washington",
              "v":"WA"
            },
            {
              "n":"West Virginia",
              "v":"WV"
            },
            {
              "n":"Wisconsin",
              "v":"WI"
            },
            {
              "n":"Wyoming",
              "v":"WY"
            }
          ]
        },
        {
          "n":"Australia",
          "v":"AU",
          "s": [
            {
              "n":"Australian Capital Territory",
              "v":"ACT"
            },
            {
              "n":"New South Wales",
              "v":"NSW"
            },
            {
              "n":"Northern Territory",
              "v":"NT" 
            },
            {
              "n":"Queensland",
              "v":"QLD"
            },
            {
              "n":"SA",
              "v":"South Australia"
            },
            {
              "n":"Tasmania",
              "v":"TAS"
            },
            { 
              "n":"Victoria",
              "v":"VIC"
            },
            { 
              "n":"Western Australia",
              "v":"WA"
            }
          ]
        }
      ]
    }


    util.caData = util.STATES.Countries[0].s;
    util.usData = util.STATES.Countries[1].s;

    // Setup Country Select
    util.countriesObj = [];
    for(var i=0; i < countries.length; i++) {
      var item = countries[i];
      var obj = {
        name: item.name,
        code: item.cca2
      }
      util.countriesObj.push(obj);
    }

    util.countriesFieldPanel = [];
    for(var i=0; i < countries.length; i++) {
      var item = countries[i];
      var obj = {
        name: item.name,
        code: item.name
      }
      util.countriesFieldPanel.push(obj);
    }

    // Setup Country Select
    util.usStatesFieldPanel = [];
    for(var i=0; i < usData.length; i++) {
      var item = usData[i];

      var obj = {
        name: item.n,
        code: item.n
      }
      util.usStatesFieldPanel.push(obj);
    }
    // Setup Country Select
    util.caProvenceFieldPanel = [];
    for(var i=0; i < caData.length; i++) {
      var item = caData[i];

      var obj = {
        name: item.n,
        code: item.n
      }
      util.caProvenceFieldPanel.push(obj);
    }

  return util;
}]);