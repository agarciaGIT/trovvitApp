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