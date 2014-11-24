sfdcControllers.controller('SFDCAppInvoiceCtrl', ['util','common','$scope', '$rootScope', '$state','$stateParams','$location','remoteDataService', '$window', 
  function(util,common, $scope, $rootScope, $state, $stateParams, $location, remoteDataService, $window) {

    $scope.envPath = envPath;
    $scope.userData = remoteDataService.userData;

    for(var i=0; i<remoteDataService.userData.opportunityData.length; i++) {
      if(remoteDataService.userData.opportunityData[i].Id == $stateParams.orderIdx) {
        $scope.opportunityItem = remoteDataService.userData.opportunityData[i];
        break;
      }
    }

    // Find Exam Info
    var contract = _.findWhere($scope.userData.contractData, {Opportunity__c: $scope.opportunityItem.Id});
    if(util.defined(contract)) {
      var recordType = _.findWhere($scope.userData.candidateRequirementRecordTypes, {Name: 'Exam'});
      if(util.defined(recordType)) {
        var contractReq = _.findWhere($scope.userData.candidateRequirementData, {Candidate_Commitment__c: contract.Id, RecordTypeId: recordType.Id});  
        if(util.defined(contractReq)) {
          $scope.examReg = _.findWhere($scope.userData.examAttemptData, {Candidate_Requirement__c: contractReq.Id});  
        }
      }
    }

    $scope.status = 'Unpaid';
    $scope.paymentType = '';

    var total = $scope.opportunityItem.Amount;
    var countTotal = 0;
    var creditDebits = [];


    remoteDataService.getInvoicePayments($scope.opportunityItem.Id, function(err, data) {
      if(util.errorCheckBroadcast(err)) {return;}
      if(util.defined(data,"result.length")) {

        $rootScope.$apply(function(){ 
          $scope.payments=data.result;
          for(var i=0; i <data.result.length; i++) {
            var payment = data.result[i];

            if(defined(payment,"ChargentSFA__Type__c") && defined(payment,"ChargentSFA__Payment_Method__c") && defined(payment,"ChargentSFA__Amount__c")) {

              if(payment.ChargentSFA__Type__c == 'Charge') {
                
                $scope.payment = payment;

                countTotal+=payment.ChargentSFA__Amount__c;
                if($scope.paymentType == '') {
                  $scope.paymentType = payment.ChargentSFA__Payment_Method__c;
                } else if(defined(payment,"ChargentSFA__Payment_Method__c") && $scope.paymentType.indexOf(payment.ChargentSFA__Payment_Method__c) == -1) {
                  $scope.paymentType = $scope.paymentType + ',' + payment.ChargentSFA__Payment_Method__c;
                }                      
              }
            }        
          }

          if(defined($scope,"opportunityItem.Amount") && $scope.opportunityItem.Amount == countTotal) {
            $scope.status = 'Paid';
          }
          
        });

      }
    });

    if(defined($scope,"opportunityItem.OpportunityLineItems")) {
      for(var i=0; i<$scope.opportunityItem.OpportunityLineItems.length; i++) {
        oppLine = $scope.opportunityItem.OpportunityLineItems[i];

        var prod = null;
        var pbe = _.findWhere($scope.userData.priceBookEntryData, {Id: oppLine.PricebookEntryId});
        if(defined(pbe)) {
          prod = _.findWhere($scope.userData.productData, {Id: pbe.Product2Id});
        }

        if(defined(prod,"GL_Code__c")) {

          switch(prod.GL_Code__c) {

            case IND_GL:
              $scope.Membership=true;
              break;

            case NOV_EXAM_REG_GL:
            case MAY_EXAM_REG_GL:
              if(prod.ProductCode.toLowerCase().indexOf('frm') > -1) {
               $scope.FRM=true; 
              }
              if(prod.ProductCode.toLowerCase().indexOf('enc') > -1) {
               $scope.ERP=true; 
              }
              break;

            case FBR_GL:
              if(prod.ProductCode.toLowerCase().indexOf('cbr') == 0) {
               $scope.ICBRR=true; 
              }
              if(prod.ProductCode.toLowerCase().indexOf('fcbr') > -1 || prod.ProductCode.toLowerCase().indexOf('fbr') > -1) {
               $scope.FBR=true; 
              }
              break;


            case PAY_DEFERRED_GL:
              if(util.defined(oppLine,"Description")) {
                if(oppLine.Description.toLowerCase().indexOf("wire") > -1) {
                  $scope.Wire=true;
                } else if(oppLine.Description.toLowerCase().indexOf("check") > -1 || oppLine.Description.toLowerCase().indexOf("credit card by fax") > -1) {
                  $scope.CheckFax=true;
                }                
              }
              break;
          }
        }
      }
      if(defined($scope,"paymentType") && $scope.paymentType == 'Credit Card') {
        $scope.CreditCard=true;
        $scope.Wire=false;
        $scope.CheckFax=false;
      }

    }


    $scope.mySortFunction = function(item) {
      
      var prod = _.findWhere($scope.userData.priceBookEntryData, {Id: item.PricebookEntryId});
      var code =  prod.ProductCode;

      if(util.defined(code)) {

        if(code == util.DEFERAL_FRM_PROD_CODE || code == util.ERP_PROD_KEY || code == util.ICBRR_NONMEM_PROD_CODE ||
          code == util.ICBRR_MEM_PROD_CODE || code == util.ICBRR_RETAKE_PROD_CODE || 
          code == util.FBR_MEM_PROD_CODE || code == util.FBR_NONMEM_PROD_CODE)
            return 1;

        if(code == util.MEMBER_PROD_CODE || code == util.MEMBER_STUDENT_PROD_CODE || code == util.MEMBER_FREE_PROD_CODE)
            return 2;

        if(code == util.FRMExamPart1Late
          || code == util.FRMExamPart1Standard
          || code == util.FRMExamPart1Early
          || code == util.FRMExamPart2Late
          || code == util.FRMExamPart2Standard
          || code == util.FRMExamPart2Early
          || code == util.ERPExamLate
          || code == util.ERPExamStandard
          || code == util.ERPExamEarly)
            return 3;

        if(code == util.FRMPart2BooksNonCandidate
        || code == util.FRMPracticeExamsCandidate
        || code == util.EnergyCertificateCoursePackCandidate
        || code == util.FRMPart2BooksCandidate
        || code == util.FRMPart1BooksCandidate
        || code == util.FoundationHandbook
        || code == util.ICBRRHandBooks
        || code == util.ICBRRHandBooksIndividual
        || code == util.FRMPart1BooksNonCandidate
        || code == util.FRMPracticeExamsNonCandidate
        || code == util.EnergyCertificateCoursePackNonCandidate)
            return 4;

        if(code == util.SHIP_PROD_CODE)
            return 5;

        if(code == util.PAY_DEFERRED_PROD_CODE)
            return 6;

        if(code == util.TAX_PROD_CODE)
            return 7;

        if(code == util.MISC_PROD_CODE)
            return 7;

        return 99;

      } else {
        return 99;
      }
    };

    $scope.formatAmountDisplay = function(amount) {
      return util.formatAmountDisplay(amount);
    }

    $scope.getProductName = function(productId) {
       var product = _.findWhere($scope.userData.priceBookEntryData, {Id: productId});
       if(product !== null && typeof product !== "undefined") {
        return product.Name;
      } else {
        return "";
      }
    }

    $scope.sortPayments = function(payment) {
      return payment.ChargentSFA__Gateway_Date__c;
    }

    $scope.getEpochDateText = function(epochDate) {
      return getEpochDateText(epochDate);
    }

    $scope.getEpochShortDateTimeText = function(epochDate) {
      return getEpochShortDateTimeText(epochDate);
    }

    $scope.getEpochDateTimeText = function(epochDate) {
      return util.getEpochDateTimeText(epochDate);
    }
    
    $scope.downloadPDF = function(){
        $window.open("https://c.cs16.visual.force.com/apex/InvoicePrintAsPDF?id=" + $scope.opportunityItem.Id);
    }
    

  }
]);
