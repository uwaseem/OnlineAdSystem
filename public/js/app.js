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
    $scope.users = getAllUsers()
    $scope.products = getAllProducts()
    $scope.quantity
    $scope.totalClassicPrice
    $scope.totalStandoutPrice
    $scope.totalPremiumPrice
    $scope.totalPrice

    function getAllUsers() {
      console.log('I\'m getting all Users')
      return ['Apple', 'Ford', 'Nike', 'Unilever', 'Others']
    }

    function getAllProducts() {
      console.log('I\'m getting all products')
      return [{
        sku: 'classic',
        name: 'Classic Ad',
        price : 269.99,
        description: 'Basic level of advertisement',
        calcFunction: 'classicCalculate()'
      }, {
        sku: 'standout',
        name: 'Standout Ad',
        price: 322.99,
        description: 'Able to use company logo and longer presentation texts',
        calcFunction: 'standoutCalculate()'
      }, {
        sku: 'premium',
        name: 'Premium Ad',
        price: 394.99,
        description: 'Higher visibility plus benefits as Standout Ad',
        calcFunction: 'premiumCalculate()'
      }]
    }

    $scope.classicCalculate = () => {
      console.log($scope)
      console.log('I\'m calling the calculate function from classic', $scope.quantity)
    }

    $scope.standoutCalculate = () => {
      console.log('I\'m calling the calculate function from standout')
    }

    $scope.premiumCalculate = () => {
      console.log('I\'m calling the calculate function from premium')
    }
  })