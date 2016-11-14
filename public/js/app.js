angular.module('onlineAdsApp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('checkout', {
        url: '/checkout',
        templateUrl: 'html/checkout.html',
        controller: 'MainController'
      });
    $urlRouterProvider.otherwise('checkout')
  })
  .controller('MainController', function($scope, $http, $state) {
    console.log('I\'m calling this MOFO!!')
  })