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
    $scope.userInfo
    $scope.orders = {}
    $scope.price = {}
    $scope.totalPrice

    function getAllUsers() {
      console.log('I\'m getting all Users')
      return ['apple', 'ford', 'nike', 'unilever', 'others']
    }

    $scope.getUserInfo = () => {
      $http.get('http://localhost:3000/userInfo/' + $scope.selectedUser.toLowerCase())
        .error((err) => {
          console.log('why is it failing here - ', err)
        })
        .success((data) => {
          console.log('this is the data received', data)
          $scope.userInfo = data.userInfo
        })
    }

    function getAllProducts() {
      console.log('I\'m getting all products')
      return [{
        sku: 'classic',
        name: 'Classic Ad',
        price : 269.99,
        description: 'Basic level of advertisement',
        discountPromo: {
        }
      }, {
        sku: 'standout',
        name: 'Standout Ad',
        price: 322.99,
        description: 'Able to use company logo and longer presentation texts'
      }, {
        sku: 'premium',
        name: 'Premium Ad',
        price: 394.99,
        description: 'Higher visibility plus benefits as Standout Ad'
      }]
    }

    $scope.calculate = function(product) {
      console.log('LOOK !! I\'m calculating something for', product, $scope.orders[product])
      // Get element id
      let productId

      for (let i in $scope.products) {
        if($scope.products[i].sku === product) {
          productId = i
        }
      }

      // Get basic price
      let price = $scope.products[productId].price

      // Get discounted price
      // If we meet minimum, set discount
      if ($scope.userInfo && $scope.userInfo.discountPromo[product] && $scope.orders[product] >= $scope.userInfo.discountPromo[product].minimumOrder) {
        price = $scope.userInfo.discountPromo[product].newPrice
      }

      $scope.price[product] = price * $scope.orders[product]

      // Any free

      console.log($scope.price)
    }
  })