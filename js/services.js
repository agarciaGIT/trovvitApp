'use strict';

/* Services */

var sfdcServices = angular.module('sfdcServices', ['ngResource']);

sfdcServices.factory('sfdcSocialService', ['$resource','$http','remoteDataService',
  function($resource, $http, remoteDataService){

    var sfdcSocialService = {};
    sfdcSocialService.$http = $http;
    sfdcSocialService.userData = {};

    return sfdcSocialService;

}]);

sfdcServices.factory('sfdcCPESelectService', ['$resource','$http','remoteDataService',
  function($resource, $http, remoteDataService){

  var sfdcCPESelectService = {};

  return sfdcCPESelectService;

}]);


sfdcServices.factory('remoteDataService', ['$resource','$http','$rootScope','$timeout','$q','$location','common',
  function($resource, $http, $rootScope, $timeout,$q,$location,common){

    var remoteDataService = {};
    remoteDataService.$http = $http;
    remoteDataService.userData = {};
    remoteDataService.examRegData = {};

    remoteDataService.logError = function(errorObject, msg, file, method, callback) {
      sfdcService.logError(errorObject, msg, file, method, function(err, data) {
        callback(err, data);
      });
    }

    
    remoteDataService.attestBadge = function(badgeId, essay, callback) {
      sfdcService.attestBadge(badgeId, essay, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }


    remoteDataService.setOthersBadgeStatus = function(badgeId, memberId, status, callback) {
      sfdcService.setBadgeStatus(badgeId, memberId, status, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.setBadgeStatus = function(badgeId, status, callback) {
      sfdcService.setBadgeStatus(badgeId, null, status, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.addUserGroupShare = function(userGroupId, postId, callback) {
      sfdcService.addUserGroupShare(userGroupId, postId, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.fetchUserGroups = function(callback) {
      sfdcService.fetchUserGroups(function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.getPostFolders = function(callback) {
      sfdcService.getPostFolders(function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.deleteObjectMember = function(parentObject, groupId, contactId, callback) {
      sfdcService.deleteObjectMember(parentObject, groupId, contactId, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.deleteObjectShare = function(parentObject, objectId, contactId, callback) {
      sfdcService.deleteObjectShare(parentObject, objectId, contactId, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.addObjectMember = function(parentObject, groupId, contactId, callback) {
      sfdcService.addObjectMember(parentObject, groupId, contactId, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.addObjectShare = function(parentObject, objectId, contactId, callback) {
      sfdcService.addObjectShare(parentObject, objectId, contactId, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.searchUsers = function(searchText, searchType, callback) {
      sfdcService.searchUsers(searchText, searchType, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }


    remoteDataService.fetchObjectShareDetails = function(parentObject, parentID, callback) {
      sfdcService.fetchObjectShareDetails(parentObject, parentID, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.fetchObjectMembers = function(parentObject, parentID, callback) {
      sfdcService.fetchObjectMembers(parentObject, parentID, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.fetchObjectShares = function(parentObject, parentID, callback) {
      sfdcService.fetchObjectShares(parentObject, parentID, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.getInvoicePayments = function(oppId, callback) {
      sfdcService.getInvoicePayments(oppId, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.getChapterMeetingDetail = function(meetingId, callback) {
      sfdcService.getChapterMeetingDetail(meetingId, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    
    remoteDataService.getContentRegistrations = function(productCodes, callback) {
      sfdcService.getContentRegistrations(productCodes, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.getEventContentDocs = function(month, year, upcoming, callback) {
      sfdcService.getEventContentDocs(month, year, upcoming, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.getChapterMeetingDetails = function(month, year, upcoming, callback) {
      sfdcService.getChapterMeetingDetails(month, year, upcoming, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.getUserContactDetails = function(callback) {
      sfdcService.getUserContactDetails(function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.unsubscribe = function(callback) {
      sfdcService.unsubscribe(function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.removeOrder = function(tempAccount, paymentId, callback) {
      sfdcService.removeOrder(tempAccount, paymentId, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.setContactInfo = function(contact, callback) {
      sfdcService.setContactInfo(contact, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.getContactInfo = function(contactId, callback) {
      sfdcService.getContactInfo(contactId, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.createOrder = function(obj, callback) {
      sfdcService.CreateOrder(obj, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.setLead = function(email, firstName, lastName, garpMembershipType, callback) {
      sfdcService.setLead(email, firstName, lastName, garpMembershipType, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.CheckExistingMember = function(email, callback) {
      sfdcService.CheckExistingMember(email, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.fetchPanel = function(objectType, recordId, fields, callback) {
      sfdcService.fetchPanel(objectType, recordId, fields, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });      
    }

    remoteDataService.fetchPanelList = function(objectType, parentField, parentId, fields, callback) {
      sfdcService.fetchPanelList(objectType, parentField, parentId, fields, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });      
    }

    remoteDataService.savePanel = function(objectType, recordId, fields, callback) {
      sfdcService.savePanel(objectType, recordId, fields, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });      
    }

    remoteDataService.deletePanel = function(panelInfo, recordIndex, callback) {
      sfdcService.deletePanel(panelInfo, recordIndex, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });      
    }

    remoteDataService.submitCreditContent = function(activityTypeId,cpeCandidateRequirementId,callback) {
      sfdcService.submitCreditContent(activityTypeId, cpeCandidateRequirementId, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.createContract = function(status, accountId, opportunityId, term, recordType,callback) {
      sfdcService.createContract(status, accountId, opportunityId, term, recordType,function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.encodeString = function(before,callback) {
      sfdcService.encodeString(before,function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.autoRenew = function(bIsCurrentDay,strProductCode,callback) {
      sfdcService.autoRenew(bIsCurrentDay,strProductCode,function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.autoRenewOff = function(bAutoOff,callback) {
      sfdcService.autoRenewOff(bAutoOff,function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.getUPSPrice = function(strAddress1,strAddress2,strCity,strCountry,strStateCode,strZip,products,callback) {
      sfdcService.getUPSPrice(strAddress1,strAddress2,strCity,strCountry,strStateCode,strZip,products,function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.updateId = function(idName,idType,idNumber,callback) {
      sfdcService.updateId(idName,idType,idNumber,function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.renewContractcheck = function(callback) {
      sfdcService.renewContractcheck(function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.createcontractextension = function(strProductCode, callback) {
      sfdcService.createcontractextension(strProductCode, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.sendDirectoryMessage = function(templateName, text, recptContactId, callback) {
      sfdcService.sendDirectoryMessage(templateName, text, recptContactId, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }


    remoteDataService.searchDirectory = function(searchText, searchType, sortField, sortOrder, pageSize, pageCurrent, callback) {
      sfdcService.searchDirectory(searchText, searchType, sortField, sortOrder, pageSize, pageCurrent, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.deferExams = function(examAttemptId, productCode, glCode, callback) {
      sfdcService.deferExams(examAttemptId, productCode, glCode, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.getUnDefferedExams = function(examAttemptId, productCode, glCode, callback) {
      sfdcService.getUnDefferedExams(examAttemptId, productCode, glCode, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.createOtherexams = function(lstProdCodeWithAmount, callback) {
      sfdcService.createOtherexams(lstProdCodeWithAmount, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.getOtherexamcodes = function(callback) {
      sfdcService.getOtherexamcodes(function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }


    remoteDataService.getProduct = function(prodCode, glCode, callback) {
      sfdcService.getProduct(prodCode, glCode, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.getProductCodes = function(callback) {
      sfdcService.getProductCodes(function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.getDefferedExams = function(callback) {
      sfdcService.getDefferedExams(function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.updateProctorExamShippingAddress = function(registrationId, addressData, callback) {
      sfdcService.updateProctorExamShippingAddress(registrationId, addressData, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.updateProctorBoxShippingAddress = function(registrationId, addressData, callback) {
      sfdcService.updateProctorBoxShippingAddress(registrationId, addressData, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.confirmProctor = function(proctorApplicationId, callback) {
      sfdcService.confirmProctor(proctorApplicationId, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.selectProctor = function(siteId, contactId, selected, callback) {
      sfdcService.selectProctor(siteId, contactId, selected, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }
    remoteDataService.workedProctor = function(siteId, contactId, selected, callback) {
      sfdcService.workedProctor(siteId, contactId, selected, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }


    remoteDataService.getProctorsBySite = function(siteId, callback) {
      sfdcService.getProctorsBySite(siteId, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.attestProctorApplication = function(proctorApplicationId, callback) {
      sfdcService.attestProctorApplication(proctorApplicationId, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.getProctorSiteRoster = function(proctorApplicationId, callback) {
      sfdcService.attestProctorApplication(proctorApplicationId, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.attestCPE = function(contractReqId, callback) {
      sfdcService.attestCPE(contractReqId, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.submitClaimFromMeeting = function(meetingId, contactId, cpeActivityTypeId, providerId, attended, callback) {
      sfdcService.submitClaimFromMeeting(meetingId, contactId, cpeActivityTypeId, providerId, attended, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.toggelAttendance = function(chapterMeetingId, registrationId, callback) {
      sfdcService.toggelAttendance(chapterMeetingId, registrationId, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }


    remoteDataService.fetchChapterMeetingRegister = function(chapterMeetingId, callback) {
      sfdcService.fetchChapterMeetingRegister(chapterMeetingId, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.chapterMeetingRegister = function(chapterMeetingId, isComing, callback) {
      sfdcService.chapterMeetingRegister(chapterMeetingId, isComing, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.setChapterMeetingConfirm = function(registrationId, callback) {
      sfdcService.setChapterMeetingConfirm(registrationId, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.getChapterMeetingRegistrations = function(callback) {
      sfdcService.getChapterMeetingRegistrations(function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }


    remoteDataService.signDirectorCode = function(chapterId, callback) {
      sfdcService.signDirectorCode(chapterId, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.buyProductsByCode = function(products, opportunityName, callback) {
      sfdcService.buyProductsByCode(products, opportunityName, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.buyProducts = function(products, callback) {
      sfdcService.buyProducts(products, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.getFRMStudyProducts = function(callback) {

      sfdcService.getFRMStudyProducts(function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.getERPStudyProducts = function(callback) {
      sfdcService.getERPStudyProducts(function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.getFolderDocs = function(name, callback) {
      sfdcService.getFolderDocs(name, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.getLibraryDocs = function(name, callback) {
      sfdcService.getLibraryDocs(name, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.getCPEActivities = function(callback) {
      sfdcService.getCPEActivities(function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.getContentPopularDocs = function(folderName, callback) {
      sfdcService.getContentPopularDocs(folderName, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.getContentBrowseDocs = function(folderName, contentTypes, callback) {
      sfdcService.getContentBrowseDocs(folderName, contentTypes, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.getContentDoc = function(docId, callback) {
      sfdcService.getContentDoc(docId, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.getContentDocs = function(folderName, callback) {
      sfdcService.getContentDocs(folderName, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.getContentOverviewDocs = function(folderName, contentType, callback) {
      sfdcService.getContentOverviewDocs(folderName, contentType, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.requestNewChapter = function(name, type, location, callback) {
      sfdcService.requestNewChapter(name, type, location, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.requestChapterDirector = function(chapterMemberId, callback) {
      sfdcService.requestChapterDirector(chapterMemberId, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.removeAttachment = function(attachmentId, callback) {
      sfdcService.removeAttachment(attachmentId, function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.uploadAttachment = function(name, fileData, record, callback) {
      sfdcService.uploadAttachment(name, fileData, record, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    }

    remoteDataService.setChapters = function(chap1, chap2, callback) {
      sfdcService.setChapters(chap1, chap2, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    };

    remoteDataService.changeCycle = function(recordId, callback) {
      sfdcService.changeCycle(recordId, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    };


    remoteDataService.fetchFRMData = function(recordId, callback) {
      sfdcService.fetchFRMData(recordId, function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    };

    remoteDataService.fetchAcademicInstitutions = function(callback) {
      sfdcService.fetchAcademicInstitutions(function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    };

    remoteDataService.fetchCompanies = function(callback) {
      sfdcService.fetchCompanies(function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    };

    remoteDataService.fetchInvoice = function(invoiceId, callback) {
      sfdcService.fetchCompanies(function(err, data) {
        err = common.serviceErrorCheck(data);
				callback(err, data);
      });
    };

    remoteDataService.getExamProducts = function(examCode, callback) {
      sfdcService.getExamProducts(examCode,function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.getTestDate = function(callback) {
      sfdcService.getTestDate(function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.getActiveSites = function(callback) {
      sfdcService.getActiveSites(function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.getRegistrationDate = function(callback) {
      sfdcService.getRegistrationDate(function(err, data) {
        err = common.serviceErrorCheck(data);
        callback(err, data);
      });
    }

    remoteDataService.fetchRegistrationDataKnown = function(q,$http,examName) {

      BackEnd.ExamName = examName;
      BackEnd.isERP = BackEnd.ExamName == 'ERP' ? true : false;
      BackEnd.isFRM = BackEnd.ExamName == 'FRM' ? true : false;
      BackEnd.switchEnable = false;
      BackEnd.isMember = true;

      var endUrl;
      var urlPath = $location.absUrl();
      if (urlPath.indexOf('garpt3') !== -1){
          BackEnd.endUrl = '//garpt3-altest.cs16.force.com/pmtx?pid=';
          BackEnd.baseUrl = 'garpt3-altest.cs16.force.com/test';
          BackEnd.renewUrl = '//garpt3-altest.cs16.force.com/pmtx?pid=';
      }
      if (urlPath.indexOf('build') !== -1){
          BackEnd.endUrl = '//build-altest.cs16.force.com/pmtx?pid=';
          BackEnd.renewUrl = '//build-altest.cs16.force.com/pmtx/pymt__SiteSubscribePRB?ppid=';
          BackEnd.baseUrl = 'build-altest.cs16.force.com/test';
          BackEnd.portalUrl = '//build-garpbuild.cs16.force.com/apex/sfdcApp#!/';
          BackEnd.loginUrl = '//build-garpbuild.cs16.force.com/login';
      }
      if (urlPath.indexOf('uat') !== -1){
          BackEnd.endUrl = '//uat-altest.cs15.force.com/pmtx?pid=';
          BackEnd.baseUrl = 'uat-altest.cs15.force.com/test';
          BackEnd.renewUrl = '//uat-altest.cs15.force.com/pmtx/pymt__SiteSubscribePRB?ppid=';
          BackEnd.portalUrl = '//uat-altest.cs15.force.com/apex/sfdcApp#!/';
          BackEnd.loginUrl = '//uat-altest.cs15.force.com/login';
      }
      if (urlPath.indexOf('uat2') !== -1 || urlPath.indexOf('uat2-altest.cs16') !== -1){
          BackEnd.endUrl = '//uat2-altest.cs16.force.com/pmtx?pid=';
          BackEnd.baseUrl = 'uat2-altest.cs16.force.com/test';
          BackEnd.renewUrl = '//uat2-altest.cs16.force.com/pmtx/pymt__SiteSubscribePRB?ppid=';
      }
      var path = urlPath.split('#!')[1];
      BackEnd.path = path;

      switch (BackEnd.ExamName) {
          case 'FRM':
            BackEnd.isERP = false;
            BackEnd.isFRM = true;
            break;
          case 'ERP':
            BackEnd.isERP = true;
            BackEnd.isFRM = false;
            break;
      }      

      BackEnd.prices = {
        'exams': 0,
        'materials': 0
      };

      BackEnd.examCodes = {
        'ProductCode': '',
        'GLCode': ''
      }

      var promises = []
      promises.push(BackEnd.getProductCodes($q));
      promises.push(BackEnd.getEnrollmentStatus($q));
      promises.push(BackEnd.getContactDetails($q));
      promises.push(BackEnd.getTestDate($q));

      //promises.push(BackEnd.GetExamProducts($q,BackEnd.ExamName));

      promises.push(BackEnd.getActiveSites($q));
      promises.push(BackEnd.Registrationdate($q));
      promises.push(BackEnd.getTestDate($q));

      promises.push(BackEnd.fetchUserData($q));

      $q.all(promises).then(function(responses) {
        console.log(responses);

        for(i=0; i<responses.length; i++) {
          var resp = responses[i];

          switch(i) {
            case 0:

              if(BackEnd.ExamName == 'FRM') {
                if(common.defined(resp,"FRMPartOne"))
                  BackEnd.testOne = resp.FRMPartOne;

                if(common.defined(resp,"FRMPartTwo"))
                  BackEnd.testTwo = resp.FRMPartTwo;

                BackEnd.frmExam = resp;

                BackEnd.canadaCustoms = resp.CanadianTax;
                BackEnd.taxCodes = resp.TAX;
                BackEnd.shippingCodes = resp.Shipping;

                if(common.defined(resp,"FRMPartOne.strGLCode") && common.defined(resp,"FRMPartOne.strProductCode"))
                  BackEnd.examCodes = {
                    'GLCode': resp.FRMPartOne.strGLCode,
                    'ProductCode': resp.FRMPartOne.strProductCode
                  };

                if(common.defined(resp,"FRMPartOne.strFRMOneEnrollmentGLCode") && common.defined(resp,"FRMPartOne.strFRMOneEnrollmentProdCode"))
                  BackEnd.enrollmentCodes = {
                    'GLCode': resp.FRMPartOne.strFRMOneEnrollmentGLCode,
                    'ProductCode': resp.FRMPartOne.strFRMOneEnrollmentProdCode
                  }

                if(common.defined(resp,"FRMPartTwo.strGLCode") && common.defined(resp,"FRMPartTwo.strProductCode"))                  
                  BackEnd.examCodesTwo = {
                    'GLCode': resp.FRMPartTwo.strGLCode,
                    'ProductCode': resp.FRMPartTwo.strProductCode
                  };

                if(common.defined(resp,"FRMPartOne.strFRMOneBookGLCode") && common.defined(resp,"FRMPartOne.strFRMOneBookProdCode"))
                  BackEnd.materialsCodes = {
                    'GLCode': resp.FRMPartOne.strFRMOneBookGLCode,
                    'ProductCode': resp.FRMPartOne.strFRMOneBookProdCode
                  };

                if(common.defined(resp,"FRMPartTwo.strFRMTwoBookGLCode") && common.defined(resp,"FRMPartTwo.strFRMTwoBookProdCode"))
                  BackEnd.materialsCodesTwo = {
                    'GLCode': resp.FRMPartTwo.strFRMTwoBookGLCode,
                    'ProductCode': resp.FRMPartTwo.strFRMTwoBookProdCode
                  };

                BackEnd.prices = {};

                if(common.defined(resp,"FRMPartOne.dFRMOneBookAmount"))
                   BackEnd.prices.materials = resp.FRMPartOne.dFRMOneBookAmount;
                if(common.defined(resp,"FRMPartTwo.dFRMTwoBookAmount"))
                   BackEnd.prices.materialsTwo = resp.FRMPartTwo.dFRMTwoBookAmount;
                if(common.defined(resp,"FRMPartOne.examPrice"))
                   BackEnd.prices.exam = resp.FRMPartOne.examPrice;
                if(common.defined(resp,"FRMPartTwo.examPrice"))
                   BackEnd.prices.examTwo = resp.FRMPartTwo.examPrice;
                if(common.defined(resp,"FRMPartOne.dFRMOneEnrollmentAmount"))
                   BackEnd.prices.enrollment = resp.FRMPartOne.dFRMOneEnrollmentAmount;

              } else if(BackEnd.ExamName == 'ERP') {

                  BackEnd.erpExam = resp.ERP;

                  BackEnd.canadaCustoms = resp.CanadianTax;
                  BackEnd.taxCodes = resp.TAX;
                  BackEnd.shippingCodes = resp.Shipping;

                  BackEnd.examCodes = {
                    'GLCode': resp.ERP.strGLCode,
                    'ProductCode': resp.ERP.strProductCode
                  };
                  BackEnd.enrollmentCodes = {
                    'GLCode': resp.ERP.strERPEnrollmentGLCode,
                    'ProductCode': resp.ERP.strERPEnrollmentProdCode
                  };
                  BackEnd.materialsCodes = {
                    'GLCode': resp.ERP.strERPBookGLCode,
                    'ProductCode': resp.ERP.strERPBookProdCode
                  };
                  BackEnd.prices = {
                    'materials': resp.ERP.dERPBookAmount,
                    'exam': resp.ERP.examPrice,
                    'enrollment': resp.ERP.dERPEnrollmentAmount,
                    'deferred': resp.DeferredPayment.dMemberAmt
                  };
              }

              BackEnd.freeIndividualMembership = resp.FreeMembership;
              BackEnd.deferredPayment = resp.DeferredPayment;

              BackEnd.freeMembershipCodes = {
                  'ProductCode': BackEnd.freeIndividualMembership.strFreeIndividualProdCode,
                  'GLCode': BackEnd.freeIndividualMembership.strFreeIndividualGLCode
              };
              BackEnd.deferredPaymentCodes = {
                  'ProductCode': BackEnd.deferredPayment.strDeferrePaymentProdCode,
                  'GLCode': BackEnd.deferredPayment.strDeferredPaymentGLCode
              }
              BackEnd.canadianTaxCodes = {
                  'ProductCode': BackEnd.canadaCustoms.strCanadianTaxProdCode,
                  'GLCode': BackEnd.canadaCustoms.strCanadianTaxGLCode
              };        

              break;

            case 1:
              if(resp == 'none') {
                BackEnd.isEnrolled = false;
              } else {
                if (resp === BackEnd.ExamName.toLowerCase()) {
                  BackEnd.isEnrolled = true;
                } else {
                  BackEnd.isEnrolled = false;
                }
              }                
              break;

            case 2:
              BackEnd.contactDetails = resp;
              break;

            case 3:
              BackEnd.testDate = resp;
              break;

            // case 4:
            //   BackEnd.prices = {};
            //   if(BackEnd.ExamName == 'FRM') {
            //     BackEnd.frmExam = resp;
            //     BackEnd.freeIndividualMembership = resp.FreeMembership;
            //     BackEnd.deferredPayment = resp.DeferredPayment;
            //     BackEnd.testOnePrice = resp.FRMPartOne.examPrice;
            //     BackEnd.testTwoPrice = resp.FRMPartTwo.examPrice;
            //     BackEnd.materialsOnePrice = resp.FRMPartOne.dFRMOneBookAmount;
            //     BackEnd.materialsTwoPrice = resp.FRMPartTwo.dFRMTwoBookAmount;
            //     BackEnd.materialsOneProductCode = resp.FRMPartOne.strFRMOneBookProdCode;
            //     BackEnd.materialsTwoProductCode = resp.FRMPartTwo.strFRMTwoBookProdCode;
            //     BackEnd.enrollmentFee = resp.FRMPartOne.dFRMOneEnrollmentAmount;
            //     BackEnd.canadaCustoms = resp.CanadianTax;
            //     BackEnd.taxCodes = resp.TAX;
            //     BackEnd.shippingCodes = resp.Shipping;


            //     BackEnd.prices = {
            //       'materials': resp.FRMPartOne.dFRMOneBookAmount,
            //       'materialsTwo': resp.FRMPartTwo.dFRMTwoBookAmount,
            //       'exam': resp.FRMPartOne.examPrice,
            //       'examTwo': resp.FRMPartOne.examPrice + resp.FRMPartTwo.examPrice,
            //       'enrollment': resp.FRMPartOne.dFRMOneEnrollmentAmount,
            //       'deferred': resp.DeferredPayment.dMemberAmt
            //       // 'membership': resp.MEMI.dMemberAmt
            //     };

            //   } else if(BackEnd.ExamName == 'ERP') {
            //     BackEnd.erpExam = resp.ERP;
            //     BackEnd.deferredPayment = resp.DeferredPayment;
            //     BackEnd.testOnePrice = resp.ERP.examPrice;
            //     BackEnd.materialsOnePrice = resp.ERP.dERPBookAmount;
            //     BackEnd.enrollmentFee = resp.ERP.dERPEnrollmentAmount;
            //     BackEnd.materialsOneProductCode = resp.ERP.strERPBookProdCode;
            //     BackEnd.canadaCustoms = resp.CanadianTax;
            //     BackEnd.taxCodes = resp.TAX;
            //     BackEnd.shippingCodes = resp.Shipping;

            //     BackEnd.prices = {
            //       'materials': resp.ERP.dERPBookAmount,
            //       'exam': resp.ERP.examPrice,
            //       'enrollment': resp.ERP.dERPEnrollmentAmount,
            //       'deferred': resp.DeferredPayment.dMemberAmt
                  
            //     };

            //   }

            //   BackEnd.customsCodes = {
            //     'ProductCode': resp.CanadianTax.strCanadianTaxProdCode,
            //     'GLCode': resp.CanadianTax.strCanadianTaxGLCode
            //   };
            //   BackEnd.shippingCodes = {
            //     'GLCode': resp.Shipping.strShippingGLCode,
            //     'ProductCode': resp.Shipping.strShippingProdCode
            //   };
            //   BackEnd.taxCodes = {
            //     'GLCode': resp.TAX.strTaxGLCode,
            //     'ProductCode': resp.TAX.strTaxProdCode
            //   };
            //   BackEnd.freeMembershipCodes = {
            //     'ProductCode': resp.FreeMembership.strFreeIndividualProdCode,
            //     'GLCode': resp.FreeMembership.strFreeIndividualGLCode
            //   };
            //   BackEnd.deferredCodes = {
            //     'ProductCode': resp.DeferredPayment.strDeferrePaymentProdCode,
            //     'GLCode': resp.DeferredPayment.strDeferredPaymentGLCode
            //   };
            //   BackEnd.affiliateMembershipCodes = {
            //     'GLCode': resp.Affiliate.strAffiliateGLCode,
            //     'ProductCode': resp.Affiliate.strProductCode
            //   };
            //   break;       

            case 4:
              BackEnd.locations = resp;
              break;
            case 5:
              BackEnd.registrationDate = resp;
              break;
            case 6:
              BackEnd.testDate = resp;
              break;
            case 7:
              BackEnd.contactInfo = resp.contactData[0];
              break;
          }
        }
        q.resolve();

      }, function(err) {
            q.resolve();
      });
      
    }

    //our service accepts a promise object which 
    //it will resolve on behalf of the calling function
    remoteDataService.fetchData = function(q, callback) {

  		$http({method:'GET',url:envPath + '/data/user.json'}).success(function(data){

        remoteDataService.userData = data;

        $http({method:'GET',url:envPath + '/data/events.json'}).success(function(data){
          remoteDataService.events = data;

          sfdcService.fetchUserData(function(err, data) {
            
            err = common.serviceErrorCheck(data);
            if(common.defined(err) || !common.defined(data,"result.userData.length") || data.result.userData.length == 0) {
              q.reject(err);
              $rootScope.$broadcast('resolveAppError', common.ERRORS.errorLoad.msg);
              return;
            }

            remoteDataService.userData.Id = data.result.userData[0].Id;
            remoteDataService.userData.userData = data.result.userData[0];
            remoteDataService.userData.contactData = data.result.contactData[0];

            remoteDataService.userData.accountData = data.result.accountData[0];
            remoteDataService.userData.opportunityData = data.result.opportunityData;
            if(defined(remoteDataService,"userData.opportunityData")) {

              for(var i=0; i<remoteDataService.userData.opportunityData.length; i++) {
                var opp = remoteDataService.userData.opportunityData[i];
                if(opp.StageName.indexOf('Closed')==-1) {

                  if(opp.Renew_Membership__c && defined(opp,"pymt__Payments__r.length") && opp.pymt__Payments__r.length > 0) {
                    remoteDataService.userData.renewOppPending = opp.pymt__Payments__r[0].Id;  
                  }

                  if(opp.Name.indexOf('Certificate') > -1) {
                    remoteDataService.userData.replaceCertPending = opp.pymt__Payments__r[0].Id;  
                  }
                  
                }
              }
            }

            $rootScope.$broadcast('handleGetUserInfo',remoteDataService.userData);
            q.resolve();

            if(defined(callback)) {
              callback(null, remoteDataService.userData);
            }
            
    			});
    		}).error(function(data, status, headers, config) {
          var err = "Unable to load user.json";
          q.reject(err);
          common.logError(status, err, 'services.js', 'fetchData')
          $rootScope.$broadcast('resolveAppError', common.ERRORS.errorLoad.msg);
        });     
      }).error(function(data, status, headers, config) {
        var err = "Unable to load user.json";
        q.reject(err);
        common.logError(status, err, 'services.js', 'fetchData')
        $rootScope.$broadcast('resolveAppError', common.ERRORS.errorLoad.msg);
      });    
    };


   remoteDataService.commitData = function() {
      //localStorage.lessonData = JSON.stringify(remoteDataService.lessonData);
      localStorage.userMeta = JSON.stringify(remoteDataService.userMeta);
      localStorage.userSession = JSON.stringify(remoteDataService.userSession);

   }

   remoteDataService.clearData = function() {
      localStorage.lessonData = null;
      localStorage.userMeta = null;
      localStorage.userSession = {};
   }

	return remoteDataService;
}]);