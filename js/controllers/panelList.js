sfdcControllers.controller('SFDCAppPanelListAddCtrl', ['util','common','$scope', '$rootScope','$state','$timeout','$stateParams','remoteDataService','sfdcPanelFieldsService',
  function(util,common, $scope, $rootScope, $state, $timeout, $stateParams, remoteDataService, sfdcPanelFieldsService) {

    $scope.envPath = envPath;
    $scope.userData = remoteDataService.userData;

    if(defined(sfdcPanelFieldsService,"panelFieldRecords") && defined($stateParams,"fieldRecord")) {
      $scope.panelRecord = sfdcPanelFieldsService.panelFieldRecords[$stateParams.fieldRecord];      
    } else {
      $state.go('dash');
    }

  }
]);

sfdcControllers.controller('SFDCAppPanelListViewCtrl', ['util','common','$scope', '$rootScope','$state','$timeout','$stateParams','remoteDataService','sfdcPanelFieldsService',
  function(util,common, $scope, $rootScope, $state, $timeout, $stateParams, remoteDataService, sfdcPanelFieldsService) {

    $scope.envPath = envPath;
    $scope.userData = remoteDataService.userData;

    $scope.showSubmission = false;

    $scope.page = {};

    $scope.page.essay = '';
    $scope.page.atest = false;

    var params = $stateParams.fieldRecord.split(':');
    if(params.length > 2) {
      $scope.fieldRecord = params[0];
      $scope.type = params[1];
      $scope.objectId = params[2];
    }

    if(!util.defined(sfdcPanelFieldsService,"panelFieldRecords") || !util.defined($scope,"fieldRecord") || 
        !util.defined(sfdcPanelFieldsService.panelFieldRecords[$scope.fieldRecord])) {
      util.navigate('badges');
      return;
    }

    if(defined(sfdcPanelFieldsService,"panelFieldRecords") && defined($scope,"fieldRecord")) {
      $scope.panelRecord = sfdcPanelFieldsService.panelFieldRecords[$scope.fieldRecord];      
      var panelValues = _.where($scope.panelRecord.recordData, {Id: $scope.objectId});
      if(util.defined(panelValues,"length") && panelValues.length > 0)
        $scope.panelValues = panelValues[0];
    } else {
      // Error
    }

    $scope.IframeSrc = null;

    if($scope.type == 'Post__c') {

      remoteDataService.fetchObjectShareDetails($scope.type, $scope.objectId, function(err, data) {
        if(util.errorCheckBroadcast(err, common.ERRORS.errorRetrieve.msg)) {return;}
        $rootScope.$apply(function(){
          $scope.users = data.result.recordUsers;
          $scope.IframeSrc = util.contactsURL + util.contentFeedURL + $scope.objectId;
        });      
      });

    } else {

      remoteDataService.fetchObjectMembers($scope.type, $scope.objectId, function(err, data) {
        if(util.errorCheckBroadcast(err, common.ERRORS.errorRetrieve.msg)) {return;}
        $rootScope.$apply(function(){
          $scope.users = data.result.memberUsers;
          $scope.members = data.result.members;
          $scope.memberAttachments = data.result.memberAttachments;
          $scope.IframeSrc = util.contactsURL + util.contentFeedURL + $scope.objectId;

          $scope.myShare = _.findWhere($scope.members, {Contact__c: $scope.userData.contactData.Id, Badge__c: $scope.objectId});

          var add = [];
          if(util.defined($scope,"memberAttachments") && util.defined($scope,"memberAttachments.length")) {
            for(var i=0; i<$scope.memberAttachments.length; i++)
              if($scope.memberAttachments[i].ParentId == $scope.myShare.Id)
                add.push($scope.memberAttachments[i]);          
          }
          $scope.attachments = add;

          if($scope.type == 'Badge__c' && util.defined($scope,"myShare.Status__c")) {
            $scope.attachIFrameSrc = 'https://' + util.contactsURL + util.uploadURL + $scope.myShare.Id;        

            if(!util.defined($scope,"myShare.Status__c") || $scope.myShare.Status__c == 'Invite Sent') {
              remoteDataService.setBadgeStatus($scope.objectId, 'Invite Opened', function(err, data) {
              });              
            }

          }
        });      
      });
    }


    $scope.removeAttachment = function(attachmentId) {
      remoteDataService.removeAttachment(attachmentId, function(err, data) {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
      });
    }

    $scope.isName = function(fieldName) {
      return ($scope.panelRecord.nameFieldAPIname == fieldName);
    }

    $scope.submitBadge = function() {
      $scope.showSubmission = true;
    }

    $scope.attestBadge = function() {
      $scope.showSubmission = true;
      remoteDataService.attestBadge($scope.objectId, $scope.page.essay, function(err, data) {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
      });
    }

    $scope.updateBadge = function(status) {
      remoteDataService.setBadgeStatus($scope.objectId, status, function(err, data) {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
      })
    }

    $scope.getFieldHTML = function(fieldId, fieldValue) {
      var field = _.findWhere($scope.panelRecord.fields, {sfdcAPIName: fieldId});
      if(util.defined(field,"returnHTML")) 
        return field.returnHTML(fieldValue);
      else return null;
    }


    $scope.navigate = function(route, params) {
      util.navigate(route, params);
    }

    $scope.getEpochDateTimeText = function(epochDate) {
      return util.getEpochDateTimeText(epochDate);
    }

    $scope.sharePanel = function() {
      util.navigate('panelListShare',{fieldRecord: $scope.panelRecord.name, type:'Post__c', id: $scope.objectId});
    }

    $scope.done = function() {
      util.navigate($scope.panelRecord.onRoute);
    }

    $scope.isShared = function(user) {
      if(util.defined(user))
        return _.indexOf($scope.contactShares, user.Id ) + 1;
      else return null;
    }


    $scope.criteriaMatch = function(value) {
      return function( item ) {

        if(item.hidden || ($scope.panelRecord.mode!='view' && item.readOnly)) { return 0; }
        
        if(util.defined($scope,"panelRecord.fieldFilter")) {

          var pv = jQuery.extend(true, {}, $scope.panelValues);
          var pr = jQuery.extend(true, {}, $scope.panelRecord);

          return $scope.panelRecord.fieldFilter(item, pv, pr);

        } else {

          if(item.view) {
            return 1;
          } else {
            return 0;
          }
          
        }

      }
    }


  }
]);

sfdcControllers.controller('SFDCAppPanelListMembersCtrl', ['util','common','$scope', '$rootScope','$state','$timeout','$stateParams','remoteDataService','sfdcPanelFieldsService',
  function(util,common, $scope, $rootScope, $state, $timeout, $stateParams, remoteDataService, sfdcPanelFieldsService) {

    $scope.envPath = envPath;
    $scope.userData = remoteDataService.userData;
    $scope.screenMode='view';
    $scope.searchTerms = '';
    $scope.searchType = '';
    $scope.contactMembers = [];

    $scope.members = null;
    $scope.currentMember = null;

    $scope.params = $stateParams.fieldRecord.split(':');
    if($scope.params.length > 2) {
      $scope.fieldRecord = $scope.params[0];
      $scope.type = $scope.params[1];
      $scope.objectId = $scope.params[2];
    }

    if(defined(sfdcPanelFieldsService,"panelFieldRecords") && defined($scope,"fieldRecord")) {
      $scope.panelRecord = sfdcPanelFieldsService.panelFieldRecords[$scope.fieldRecord]; 
      $scope.recordData = _.findWhere($scope.panelRecord.recordData, {Id: $scope.objectId});
    } else {
      // Error
    }

    remoteDataService.fetchObjectMembers($scope.type, $scope.objectId, function(err, data) {
      if(util.errorCheckBroadcast(err, common.ERRORS.errorRetrieve.msg)) {return;}
      $rootScope.$apply(function(){
        $scope.members = data.result.members;
        $scope.memberAttachments = data.result.memberAttachments;
        $scope.contactMembers = _.pluck($scope.members, 'Contact__c');

        if($scope.params.length > 3) {
          $scope.currentMember = _.findWhere($scope.members, {Contact__c: $scope.params[3]})
        }

      });      
    });


    $scope.reviewBadge = function() {
      remoteDataService.setOthersBadgeStatus($scope.objectId, $scope.currentMember.Contact__c, 'Badge Under Review', function(err, data) {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
      })
    }

    $scope.acceptBadge = function() {
      remoteDataService.setOthersBadgeStatus($scope.objectId, $scope.currentMember.Contact__c, 'Badge Approved', function(err, data) {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
      })
    }

    $scope.denyBadge = function() {
      remoteDataService.setOthersBadgeStatus($scope.objectId, $scope.currentMember.Contact__c, 'Badge Denied', function(err, data) {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
      })
    }

    $scope.getMemberAttachment = function(memberBadge) {
      var match = _.findWhere($scope.memberAttachments, {ParentId : memberBadge.Id});
      if(util.defined(match))
        return match.Id
      else return null;
    }

    $scope.isPreview = function(member) {
      if($scope.currentMember != null)
        return member.Id == $scope.currentMember.Id;
      else return false;
    }

    $scope.preview = function(member) {
      $scope.currentMember = member;
    }

    $scope.navigate = function(route, params) {
      util.navigate(route, params);
    }

    $scope.addUsers = function(share) {
      $scope.screenMode='search';
    }

    $scope.doneAddUsers = function(share) {
      $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
      });      
    }

    $scope.searchUsers = function() {
      remoteDataService.searchUsers($scope.searchTerms, $scope.searchType, function(err, data) {
        if(util.errorCheckBroadcast(err, common.ERRORS.errorRetrieve.msg)) {return;}
        $rootScope.$apply(function(){
          $scope.users = data.result;
        });      
      });
    }

    $scope.isMember = function(user) {
      //return _.findWhere($scope.shares, {Contact__c: user.Id}) + 1;
      return _.indexOf($scope.contactMembers, user.Id ) + 1;
    }

    $scope.addMemberUser = function(user) {
      remoteDataService.addObjectMember($scope.type, $scope.objectId, user.Id, function(err, data) {
        if(util.errorCheckBroadcast(err, common.ERRORS.errorRetrieve.msg)) {return;}
          if(data.result == true) {
            $rootScope.$apply(function(){
                $scope.contactMembers.push(user.Id);
            });                  
          }
      });
    }

    $scope.deleteMemberUser = function(user) {
      remoteDataService.deleteObjectMember($scope.type, $scope.objectId, user.Id, function(err, data) {
        if(util.errorCheckBroadcast(err, common.ERRORS.errorRetrieve.msg)) {return;}
        if(data.result == true) {
          $rootScope.$apply(function(){
            var fnd = _.indexOf($scope.contactMembers, user.Id);
            if(fnd > -1)
              $scope.contactMembers.splice(fnd,1);                      
          });      
        }
      });
    }
    
    $scope.deleteMember = function(member) {
      remoteDataService.deleteObjectMember($scope.type, $scope.objectId, member.Contact__c, function(err, data) {
        if(util.errorCheckBroadcast(err, common.ERRORS.errorRetrieve.msg)) {return;}
        if(data.result == true) {
          $rootScope.$apply(function(){
            $scope.members = _.reject($scope.members, function(obj){ return obj.Contact__c == member.Contact__c });

            var fnd = _.indexOf($scope.contactMembers, member.Contact__c);
            if(fnd > -1)
              $scope.contactMembers.splice(fnd,1);                      

          });      
        }
      });
    }


  }
]);


sfdcControllers.controller('SFDCAppPanelListShareCtrl', ['util','common','$scope', '$rootScope','$state','$timeout','$stateParams','remoteDataService','sfdcPanelFieldsService',
  function(util,common, $scope, $rootScope, $state, $timeout, $stateParams, remoteDataService, sfdcPanelFieldsService) {

    $scope.envPath = envPath;
    $scope.userData = remoteDataService.userData;
    $scope.shareMode='view';
    $scope.shareSearchTerms = '';
    $scope.shareSearchType = '';
    $scope.contactShares = [];
    $scope.userGroups = [];
    $scope.userGroupSelect = {
      select: null
    };

    var params = $stateParams.fieldRecord.split(':');
    if(params.length > 2) {
      $scope.fieldRecord = params[0];
      $scope.type = params[1];
      $scope.objectId = params[2];
    }

    if(defined(sfdcPanelFieldsService,"panelFieldRecords") && defined($scope,"fieldRecord")) {
      $scope.panelRecord = sfdcPanelFieldsService.panelFieldRecords[$scope.fieldRecord];      
    } else {
      // Error
    }

    remoteDataService.fetchUserGroups(function(err, data) {
      if(util.errorCheckBroadcast(err, common.ERRORS.errorRetrieve.msg)) {return;}
      $rootScope.$apply(function(){
        $scope.userGroups = data.result;
      });      
    });


    remoteDataService.fetchObjectShares($scope.type, $scope.objectId, function(err, data) {
      if(util.errorCheckBroadcast(err, common.ERRORS.errorRetrieve.msg)) {return;}
      $rootScope.$apply(function(){
        $scope.shares = data.result;
        $scope.contactShares = _.pluck($scope.shares, 'Contact__c');
      });      
    });

    $scope.navigate = function(route, params) {
      util.navigate(route, params);
    }

    $scope.addUsers = function(share) {
      $scope.shareMode='search';
    }

    $scope.addUserGroups = function() {
      //$scope.userGroupSelect.select;
      remoteDataService.addUserGroupShare($scope.userGroupSelect.select.Id, $scope.objectId, function(err, data) {
        if(util.errorCheckBroadcast(err, common.ERRORS.errorRetrieve.msg)) {return;}
        $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
        });
      });
    }

    $scope.doneAddUsers = function(share) {
      $state.transitionTo($state.current, $stateParams, {
          reload: true,
          inherit: false,
          notify: true
      });      
    }

    $scope.searchUsers = function() {
      remoteDataService.searchUsers($scope.shareSearchTerms, $scope.shareSearchType, function(err, data) {
        if(util.errorCheckBroadcast(err, common.ERRORS.errorRetrieve.msg)) {return;}
        $rootScope.$apply(function(){
          $scope.users = data.result;
        });      
      });
    }

    $scope.isShared = function(user) {
      //return _.findWhere($scope.shares, {Contact__c: user.Id}) + 1;
      return _.indexOf($scope.contactShares, user.Id ) + 1;
    }

    $scope.addShareUser = function(user) {
      remoteDataService.addObjectShare($scope.type, $scope.objectId, user.Id, function(err, data) {
        if(util.errorCheckBroadcast(err, common.ERRORS.errorRetrieve.msg)) {return;}
          if(data.result == true) {
            $rootScope.$apply(function(){
                $scope.contactShares.push(user.Id);
            });                  
          }
      });
    }

    $scope.deleteShareUser = function(user) {
      remoteDataService.deleteObjectShare($scope.type, $scope.objectId, user.Id, function(err, data) {
        if(util.errorCheckBroadcast(err, common.ERRORS.errorRetrieve.msg)) {return;}
        if(data.result == true) {
          $rootScope.$apply(function(){
            var fnd = _.indexOf($scope.contactShares, user.Id);
            if(fnd > -1)
              $scope.contactShares.splice(fnd,1);                      
          });      
        }
      });
    }
    
    $scope.deleteShare = function(share) {
      remoteDataService.deleteObjectShare($scope.type, $scope.objectId, share.Contact__c, function(err, data) {
        if(util.errorCheckBroadcast(err, common.ERRORS.errorRetrieve.msg)) {return;}
        if(data.result == true) {
          $rootScope.$apply(function(){
            $scope.shares = _.reject($scope.shares, function(obj){ return obj.Contact__c == share.Contact__c });

            var fnd = _.indexOf($scope.contactShares, share.Contact__c);
            if(fnd > -1)
              $scope.contactShares.splice(fnd,1);                      

          });      
        }
      });
    }


  }
]);


sfdcControllers.controller('SFDCAppPanelListCtrl', ['util','common','$scope', '$rootScope','$state','$timeout','$stateParams','$filter','remoteDataService','sfdcPanelFieldsService',
  function(util,common, $scope, $rootScope, $state, $timeout, $stateParams, $filter, remoteDataService, sfdcPanelFieldsService) {

    $scope.envPath = envPath;
    $scope.userData = remoteDataService.userData;

    var orderBy = $filter('orderBy');
    var lastSort = '';

    
    $('#fieldListArea').hide();
    var selector = '#fieldListSpin';
    var obj = $(selector)
    if(obj !== null && typeof obj !== "undefined" && obj.length > 0) {
      $scope.spinner = new Spinner(opts).spin(obj[0]);
    }   

    $scope.$on('handlePanelListDisplayError', function() {
      $rootScope.$apply(function(){
        $scope.spinner.stop();
        $('#myGlobalErrorModal p').html(common.ERRORS.errorLoad.msg)
        $("#myGlobalErrorModal").modal();        
      });
    });

    $scope.$on('handlePanelListDisplay', function() {

      $rootScope.$apply(function(){
        $scope.panelInfo = sfdcPanelFieldsService.panelFieldRecords[$scope.recordName];  
        $scope.panelRecord = jQuery.extend(true, {}, sfdcPanelFieldsService.panelFieldRecords[$scope.recordName]); 
        $scope.panelRecordBackup = jQuery.extend(true, {}, $scope.panelRecord); 
        //$scope.panelListData = sfdcPanelFieldsService.panelFieldRecords[$scope.fieldPanel.name].panelListData;
           
        if($scope.panelInfo.fieldRecords.length > 0 && defined($scope,"panelInfo.defaultSort")) {
          var reverse = false;
          if(util.defined($scope,"panelInfo.defaultSortReverse"))
            reverse = $scope.panelInfo.defaultSortReverse;

          $scope.panelInfo.recordData = orderBy($scope.panelInfo.recordData, $scope.panelInfo.defaultSort, reverse);
          lastSort = $scope.panelInfo.defaultSort;
        }
        $scope.reverse = false;

        if($scope.panelRecord !== null && typeof $scope.panelRecord !== "undefined") {

          if(util.defined($scope,"panelRecord.addRecordData")) {
            $scope.panelValues = $scope.panelRecord.addRecordData[$scope.recordIndex];
          } else {
            if(util.defined($scope,"panelRecord.recordData")) {  
              $scope.panelValues = $scope.panelRecord.recordData[$scope.recordIndex];  
            }
          }
        }

        if(util.defined($scope,"spinner")) {
          $scope.spinner.stop();
        }

      });

      $timeout(function() {
        $rootScope.$broadcast('handlePanelDisplay');        
        $('#fieldListArea').show();
      },1000);
      
    });

    $scope.showTextArea = function(label, value) {
      $scope.textareaModalLabel = label;
      $scope.textareaModalValue = value;
      $("#myTextAreaModal").modal();
    }

    $scope.order = function(fname) {
      if(lastSort == fname) {
        $scope.reverse = !$scope.reverse;
      } else {
        $scope.reverse = false;
      }
      $scope.panelInfo.recordData = orderBy($scope.panelInfo.recordData, fname, $scope.reverse);
      lastSort = fname;
    }

    $scope.addRecord = function() {
      var recordData = sfdcPanelFieldsService.panelFieldRecords[$scope.recordName].addRecordData = [{}];
      var fieldRecords = sfdcPanelFieldsService.panelFieldRecords[$scope.recordName].fieldRecords;
      var fetchPanelFieldsParams = sfdcPanelFieldsService.panelFieldRecords[$scope.recordName];

      $('#fieldlist').hide();

      // Initialize Record
      for(var i=0; i<fieldRecords.length; i++) {
          var found = 0;
          for (var property in recordData[0]) {
            if(property == fieldRecords[i].name)
              found=1;
          }
          if(found == 0) {
            var field = _.findWhere(fetchPanelFieldsParams.fields, {sfdcAPIName: fieldRecords[i].name});
            if(util.defined(field,"defaultValue")) {
              recordData[0][fieldRecords[i].name]=field.defaultValue;
            } else {
              recordData[0][fieldRecords[i].name]=null;  
            }
            
          }
      }
      recordData[0].Id='';

      var parentField = '';
      var parentId = '';

      if(defined(fetchPanelFieldsParams, "parentField") && defined(fetchPanelFieldsParams, "parentId")) {

          parentField = fetchPanelFieldsParams.parentField;
          parentId = fetchPanelFieldsParams.parentId;

          recordData[0][parentField] = parentId;
          var rec = {
            name: parentField,
            type: 'LOOKUP'
          }
          fieldRecords.push(rec);
      } else {
        // Error
      }


      sfdcPanelFieldsService.panelFieldRecords[$scope.recordName].mode='add';
      $state.go('panelListAdd',{fieldRecord:$scope.panelInfo.name});
      //$rootScope.$broadcast('handlePanelDisplay');        

    }


    $scope.criteriaMatch = function(value) {
      return function( item ) {

        var fetchPanelFieldsParams = sfdcPanelFieldsService.panelFieldRecords[$scope.recordName].fetchPanelFieldsParams;
        if(defined(fetchPanelFieldsParams,"listFilter")) {

          return fetchPanelFieldsParams.listFilter(item, $scope.userData);

        } else {

          return 1;
        }

      }
    }

    $scope.criteriaFieldMatch = function(value) {
      return function( item ) {

        if(item.hidden || ($scope.panelRecord.mode!='view' && item.readOnly)) { return 0; }

        if($scope.panelRecord.mode=='view') {
          // Check View Fields if given
          if(defined($scope,"panelRecord.fetchPanelFieldsParams.viewFields")) {
            for(var i=0; i< $scope.panelRecord.fetchPanelFieldsParams.viewFields.length; i++) {
              if($scope.panelRecord.fetchPanelFieldsParams.viewFields[i] == item.name) {
                return 1;
              }
            }
            return 0;
          }
        }
        
        if($scope.panelRecord.fetchPanelFieldsParams !== null && typeof $scope.panelRecord.fetchPanelFieldsParams !== "undefined" &&
           $scope.panelRecord.fetchPanelFieldsParams.fieldFilter !== null && typeof $scope.panelRecord.fetchPanelFieldsParams.fieldFilter !== "undefined") {

          return $scope.panelRecord.fetchPanelFieldsParams.fieldFilter(item, $scope.panelValues, $scope.panelRecord);

        } else {

          return 1;
        }

      }
    }


  }
]);