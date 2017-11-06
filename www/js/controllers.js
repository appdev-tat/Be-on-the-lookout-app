angular.module('starter.controllers', [])

.controller('MainCtrl', function($scope) {
  $scope.openExternalLink = openExternalLink;
})

.controller('ReportCtrl', function($scope) {
  $scope.openExternalLink = openExternalLink;
})

.controller('RedFlagsCtrl', function($scope) {
  $scope.openExternalLink = openExternalLink;
})

.controller('AboutTraffickingCtrl', function($scope) {})

.controller('AboutAppCtrl', function($scope) {
  $scope.openExternalLink = openExternalLink;
})

// for some reason I couldn't get the app to trigger mailto: and tel: links properly
// using the href attribute, so instead I open the link using window.open
// I also had issues opening external URLs in the default browser
var openExternalLink = function( url ) {
  window.open( url, '_system' );
};