//var utils = angular.module('utils', ['ngResource']);

commonServices = angular.module('sfdcServices');

commonServices.factory('common', ['$resource','$http','$location','$window','$localStorage','$state','$stateParams','$rootScope',
  function($resource, $http, $location, $window, $localStorage, $state, $stateParams,$rootScope){

    var common = {};
    common.$http = $http;
    common.$location=$location;
    common.$localStorage = $localStorage;
    common.$state = $state;
    common.$stateParams = $stateParams;

    common.ERRORS = {
      errorLoad: {
        code: 100,
        msg: "There was an error loading your account. Please logout and try again. If this error persists please contact support at memberservices@garp.com"
      },
      errorPerform: {
        code: 110,
        msg: "There was an error performing this operation. Please logout and try again. If this error persists please contact support at memberservices@garp.com"
      },
      errorSave: {
        code: 120,
        msg: "There was an error saving your data. Please logout and try again. If this error persists please contact support at memberservices@garp.com"
      },
      errorDelete: {
        code: 130,
        msg: "There was an error deleting your data. Please logout and try again. If this error persists please contact support at memberservices@garp.com"
      },
      errorRetrieve: {
        code: 140,
        msg: "There was an error retrieving your data. Please logout and try again. If this error persists please contact support at memberservices@garp.com"
      },
      errorNoExam: {
        code: 140,
        msg: "There are no exams available to register for. Please check back soon."
      },      

    };

    common.errorCheck = function(err) {
      if(this.defined(err)) {
        return true;
      } else {
        return false;
      }
    }

    common.errorCheckBroadcast = function(err, msg) {
      if(this.defined(err)) {
        if(!this.defined(msg))
          msg = common.ERRORS.errorPerform.msg;
        $rootScope.$broadcast('appError', msg);
        return true;
      } else {
        return false;
      }
    }

    common.serviceErrorCheck = function(data) {
      if(this.defined(data,"event.status") && data.event.status == false) {
        this.logError(JSON.stringify(data.event), null, null, null);
        return data.event.statusCode;
      } else {
        return null;
      }
    }

    common.logError = function(errorObj, msg, file, method) {
      if(!defined(errorObj))
        errorObj="";      
      if(!defined(msg))
        msg="";
      if(!defined(file))
        file="";
      if(!defined(method))
        method="";

      sfdcService.logError(errorObj, msg, file, method, function(err, data) {
      });
    }

    common.defined = function(ref, strNames) {
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


    common.isRecordType = function(recordTypes, recordTypeName, obj) {
      if(this.defined(recordTypes) && this.defined(recordTypeName) && this.defined(obj)) {
        var actObj = _.findWhere(recordTypes, {Name: recordTypeName});
        if(this.defined(actObj))
          return (actObj.Id == obj.RecordTypeId);
        else return false;
      } else {
        return false;
      }
    }


    // Mod signutre
    common.findAllContract = function(recordTypeName, remoteDataService) {

      var recordTypeId = _.findWhere(remoteDataService.userData.contractRecordTypes, {Name: recordTypeName});
      if(this.defined(recordTypeId)) {
        var conts = _.where(remoteDataService.userData.contractData, {RecordTypeId: recordTypeId.Id});
        if(this.defined(conts)) {
          return conts;
        }
      }
      return null;
    }

    // Mod signutre
    common.findDraftContract = function(recordTypeName, remoteDataService) {

      var recordTypeId = _.findWhere(remoteDataService.userData.contractRecordTypes, {Name: recordTypeName});
      if(this.defined(recordTypeId)) {
        var conts = _.where(remoteDataService.userData.contractData, {RecordTypeId: recordTypeId.Id});
        if(this.defined(conts)) {
          for(var i=0; i<conts.length; i++) {
            var cont = conts[i];
            if(cont.Status.indexOf('Draft') > -1) {
              return cont;
            }
          }
        }
      }
      return null;
    }

    // Mod signutre
    common.findActiveContract = function(recordTypeName, remoteDataService) {

      var recordTypeId = _.findWhere(remoteDataService.userData.contractRecordTypes, {Name: recordTypeName});
      if(this.defined(recordTypeId)) {
        var conts = _.where(remoteDataService.userData.contractData, {RecordTypeId: recordTypeId.Id});
        if(this.defined(conts)) {
          for(var i=0; i<conts.length; i++) {
            var cont = conts[i];
            if(cont.Status.indexOf('Activated') > -1) {
              return cont;
            }
          }
        }
      }
      return null;
    }

    // Mod signutre
    common.findCurrentContract = function(recordTypeName, remoteDataService) {

      var recordTypeId = _.findWhere(remoteDataService.userData.contractRecordTypes, {Name: recordTypeName});
      if(this.defined(recordTypeId)) {
        var conts = _.where(remoteDataService.userData.contractData, {RecordTypeId: recordTypeId.Id});
        if(this.defined(conts)) {
          var lastCont = null;
          for(var i=0; i<conts.length; i++) {
            var cont = conts[i];
            if(cont.Status.indexOf('Expired') > -1 || cont.Status.indexOf('Activated') > -1 || cont.Status.indexOf('Draft') > -1 ||  cont.Status.indexOf('Completed') > -1) {
              if(lastCont == null || cont.StartDate > lastCont.StartDate)
                lastCont = cont;
            }
          }
          if(lastCont != null) {
            return lastCont;
          }
        }
      }
      return null;
    }

  return common;
}]);