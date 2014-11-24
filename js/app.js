'use strict';

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

String.format = function() {
    // The string containing the format items (e.g. "{0}")
    // will and always has to be the first argument.
    var theString = arguments[0];
    
    // start with the second argument (i = 1)
    for (var i = 1; i < arguments.length; i++) {
        // "gm" = RegEx options for Global search (more than one instance)
        // and for Multiline search
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }
    
    return theString;
}

angular.module('ErrorCatcher', [])
    .factory('$exceptionHandler', function () {
        return function errorCatcherHandler(exception, cause) {
            console.error(exception.stack);
            sfdcService.logError(exception.stack, exception.message, null, null, function(err, data) {
            });
            $('#myGlobalErrorModal p').html("There has been an unexpected error. Please logout and try again. If this error persists please contact support at memberservices@garp.com")
            $("#myGlobalErrorModal").modal();
        };
    });

/* App Module */
var myApp = angular.module('myApp', ['ErrorCatcher','mwl.calendar','ui.router','sfdcControllers','sfdcServices','ui.bootstrap', 'angularFileUpload','ui.bootstrap.datetimepicker','multi-select','ngSanitize','ngLocale','ngStorage','frapontillo.bootstrap-switch','ui.utils']);
// For Component users, it should look like this:
// var myApp = angular.module('myApp', [require('angular-ui-router')]);


angular.module('myApp').directive('addthisToolbox', ['$timeout', function($timeout) {
  return {
    restrict : 'A',
    transclude : true,
    replace : true,
    template : '<div ng-transclude></div>',
    link : function($scope, element, attrs) {
      $timeout(function () {
        addthis.init();
        addthis.toolbox($(element).get(), {}, {
          url: attrs.url,
          title : "GARP Content Share",
          description : 'Checkout this GARP content.'        
        });
      });
    }
  };
}]);

myApp.directive('tabbed', function($document) {
    // for tabbed navigation
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

          var parentEl = element.parent();        

          element.bind('mouseenter', activateTab);
          parentEl.bind('mouseleave', clearTab);    

          function clearTab() {
            angular.element( $document[0].querySelector( '.tabbed' ) ).removeClass('tabbed');
            console.log('clearTab() fired');
          };

          function activateTab() {
            clearTab();
            element.addClass('tabbed');
            console.log('activateTab() fired');        
          };

      }
  };  
});  

// myApp.directive('addthisToolbox', ['$timeout', function($timeout) {
//   return {
//     restrict : 'A',
//     transclude : true,
//     replace : true,
//     template : '<div ng-transclude></div>',
//     link : function(util,common, $scope, element, attrs) {
//       $timeout(function () {
//         addthis.init();
//         addthis.toolbox($(element).get(), {}, {
//           url: attrs.url,
//           title : "GARP Content Share",
//           description : 'Checkout this GARP content.'        
//         });
//       });
//     }
//   };
// }]);

// myApp.directive('addthisEventToolbox', ['$timeout', function($timeout) {
//   return {
//     restrict : 'A',
//     transclude : true,
//     replace : true,
//     template : '<div ng-transclude></div>',
//     link : function(util,common, $scope, element, attrs) {
//       $timeout(function () {
//         addthis.init();
//         addthis.toolbox($(element).get(), {}, {
//           url: attrs.url,
//           title : "GARP Content Share",
//           description : 'Checkout this GARP content.'        
//         });
//       });
//     }
//   };
// }]);

myApp.directive('visited', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            element.on('blur', function () {
                $(this).addClass('has-visited');
            });
           
        }
    };
});


myApp.directive('lateValidateForm', function () {
    return {
        restrict: 'AC',
        link: function (scope, element, attrs) {
            var $inputs = element.find('input, select, textarea');

            $inputs.on('blur', function () {
                $(this).addClass('has-visited');
            });

            element.on('submit', function () {
                $inputs.addClass('has-visited');
            });
        }
    };
});

myApp.directive('validateShow', function() {
    return {
        // restrict to an attribute type.
        restrict: 'A',
        
        // element must have ng-model attribute.
        require: 'ngModel',
        
        // scope = the parent scope
        // elem = the element the directive is on
        // attr = a dictionary of attributes on the element
        // ctrl = the controller for ngModel.
        link: function(scope, elem, attr, ctrl) {
            
            //console.log('Link Fire:' + attr.validateShow);

            var val = $('#'+attr.validateShow).value();


        }
    };
});



myApp.directive('regexValidate', function() {
    return {
        // restrict to an attribute type.
        restrict: 'A',
        
        // element must have ng-model attribute.
        require: 'ngModel',
        
        // scope = the parent scope
        // elem = the element the directive is on
        // attr = a dictionary of attributes on the element
        // ctrl = the controller for ngModel.
        link: function(scope, elem, attr, ctrl) {
            
            //console.log('Link Fire!');

            //get the regex flags from the regex-validate-flags="" attribute (optional)
            var flags = attr.regexValidateFlags || '';
            
            // create the regex obj.
            var regex = new RegExp(attr.regexValidate, flags);            
                        
            // add a parser that will process each time the value is 
            // parsed into the model when the user updates it.
            ctrl.$parsers.unshift(function(value) {
                // test and set the validity after update.
                var valid = regex.test(value);
                ctrl.$setValidity('regexValidate', valid);
                
                // if it's valid, return the value to the model, 
                // otherwise return undefined.
                return valid ? value : undefined;
            });
            
            // add a formatter that will process each time the value 
            // is updated on the DOM element.
            ctrl.$formatters.unshift(function(value) {
                // validate.
                ctrl.$setValidity('regexValidate', regex.test(value));
                
                // return the value or nothing will be written to the DOM.
                return value;
            });
        }
    };
});

myApp.controller("AppCtrl", function ($rootScope) {
  $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
    alert("There has been an error:" + rejection)
  });
});

 myApp.controller('MainCtrl', function ($scope, $modal) {

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

    function showModal(action, event) {
      $modal.open({
        templateUrl: 'modalContent.html',
        controller: function($scope, $modalInstance) {
          $scope.$modalInstance = $modalInstance;
          $scope.action = action;
          $scope.event = event;
        }
      });
    }

    $scope.eventClicked = function(event) {
      showModal('Clicked', event);
    };

    $scope.eventEdited = function(event) {
      showModal('Edited', event);
    };

    $scope.eventDeleted = function(event) {
      showModal('Deleted', event);
    };

    $scope.setCalendarToToday = function() {
      $scope.calendarDay = new Date();
    };

    $scope.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();

      event[field] = !event[field];
    };



  });

myApp.config( [
    '$compileProvider',
    function( $compileProvider )
    {   
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|webcal):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
]);

myApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {


    // For unmatched routes:
    if(defined(startPath)) {
      $urlRouterProvider.otherwise('/' + startPath);      
    } else {
      if(document.URL.indexOf('reg') > -1) {
        $('#navPublic').show();
        $urlRouterProvider.otherwise('/registration');
      } else {
        $('#nav').show();
        $urlRouterProvider.otherwise('/dash');  
      }
      
    }

    // Activate hashbang
    $locationProvider.hashPrefix('!');

    // states for my app
    $stateProvider
      .state('register', {
        url: '/registration:regType',
        templateUrl: envPath + "/partials/register.html",
        controller: 'SFDCAppRegisterCtrl'
      })
      .state('registerInfo', {
        url: '/registerInfo:contactId',
        templateUrl: envPath + "/partials/register.info.html",
        controller: 'SFDCAppRegisterInfoCtrl'
      })      
      .state('registerThanks', {
        url: '/registerThanks',
        templateUrl: envPath + "/partials/register.thanks.html",
        controller: 'SFDCAppRegisterThanksCtrl'
      })
      .state('dash', {
        url: '/dash',
        templateUrl: envPath + "/partials/dash.html",
        controller: 'SFDCAppDashCtrl',
        resolve: {
          myVar: function($q,$http,remoteDataService){
            //code to be executed before route change goes here
            var defer = $q.defer();
            remoteDataService.fetchData(defer);
            return defer.promise;
          }
        }
      })
      .state('posts', {
        url: '/posts',
        templateUrl: envPath + "/partials/posts.html",
        controller: 'SFDCAppPostsCtrl',
        resolve: {
          myVar: function($q,$http,remoteDataService){
            //code to be executed before route change goes here
            var defer = $q.defer();
            remoteDataService.fetchData(defer);
            return defer.promise;
          }
        }
      })
      .state('profileSettingsPersonalInformation', {
        url: '/profileSettingsPersonalInformation',
        templateUrl: envPath + "/partials/profileSettings.PersonalInformation.html",
        controller: 'SFDCAppProfileSettingsPersonalInformationCtrl',
        resolve: {
          myVar: function($q,$http,remoteDataService){
            //code to be executed before route change goes here
            var defer = $q.defer();
            remoteDataService.fetchData(defer);
            return defer.promise;
          }
        }
      })
      .state('profileSettingsMembership', {
        url: '/profileSettingsMembership',
        templateUrl: envPath + "/partials/profileSettings.membership.html",
        controller: 'SFDCAppProfileSettingsMembershipCtrl',
        resolve: {
          myVar: function($q,$http,remoteDataService){
            //code to be executed before route change goes here
            var defer = $q.defer();
            remoteDataService.fetchData(defer);
            return defer.promise;
          }
        }
      })
      .state('panelListAdd', {
        url: '/panelListAdd:fieldRecord',
        templateUrl: envPath + "/partials/panel.list.add.html",
        controller: 'SFDCAppPanelListAddCtrl',
        resolve: {
          myVar: function($q,$http,remoteDataService){
            //code to be executed before route change goes here
            var defer = $q.defer();
            remoteDataService.fetchData(defer);
            return defer.promise;
          }
        }
      })
      .state('invoice', {
        url: '/invoice:orderIdx',
        templateUrl: envPath + "/partials/invoice.html",
        controller: 'SFDCAppInvoiceCtrl',
        resolve: {
          myVar: function($q,$http,remoteDataService){
            //code to be executed before route change goes here
            var defer = $q.defer();
            remoteDataService.fetchData(defer);
            return defer.promise;
          }
        }
      })
  });