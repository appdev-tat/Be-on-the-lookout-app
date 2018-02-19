// Ionic Starter App

// as soon as we can, show a notice that the user is about to access content regarding human trafficking.
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  if ( navigator.notification ) {
    if ( localStorage.getItem('doNotShow') === 'on' ) {
      return;
    }

    navigator.notification.confirm( 'This app contains information about human trafficking and may not be suitable for all audiences.', function( buttonIndex ) {
      // buttonIndex 2 equates to 'Do not show again'
      // 1 == Continue, 0 == Dismissed (clicked outside). In both these cases, do nothing.
      if ( buttonIndex === 2 ) {
        localStorage.setItem( 'doNotShow', 'on' );
      }
    }, 'Notice', ['Continue', 'Do not show again'] );

  }

  // use the InAppBrowser plugin to make mailto and tel links work
  window.open = cordova.InAppBrowser.open;
}

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    /* // failed attempt to prevent the app from 'remembering' how far I scrolled on a page when I switch out then switch back.
    $rootScope.$on("$locationChangeSuccess", function(event, next, current) { 
        var scrolls  = document.querySelectorAll('.scroll');
        scrolls.forEach( function(content) { content.style.transform = 'translate3d(0px, 0px, 0px) scale(1)'; });
    });
    */
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.main', {
    url: '/main',
    views: {
      'tab-main': {
        templateUrl: 'templates/tab-main.html',
        controller: 'MainCtrl'
      }
    }
  })

  .state('tab.report', {
    url: '/report',
    views: {
      'tab-report': {
        templateUrl: 'templates/tab-report.html',
        controller: 'ReportCtrl'
      }
    }
  })

  .state('tab.red-flags', {
    url: '/red-flags',
    views: {
      'tab-red-flags': {
        templateUrl: 'templates/tab-red-flags.html',
        controller: 'RedFlagsCtrl'
      }
    }
  })
  
  .state('tab.about-trafficking', {
    url: '/about-trafficking',
    views: {
      'tab-about-trafficking': {
        templateUrl: 'templates/tab-about-trafficking.html',
        controller: 'AboutTraffickingCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/main');


});
