angular.module('onlineAdsApp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('users', {
        url: '/users',
        templateUrl: 'html/users.html',
        controller: 'MainController'
      })
      .state('orders', {
        url: '/orders',
        templateUrl: 'html/orders.html',
        controller: 'MainController'
      })
    $urlRouterProvider.otherwise('orders')
  })
  .controller('MainController', function($scope, $http, $state) {
    const url = window.location.protocol + "//" + window.location.host + window.location.pathname

    $scope.products = getAllProducts()
    $scope.users = ['Choose username']
    $scope.orders = {}
    $scope.totalOrders = {}
    $scope.totalPrice = 0

    getAllUsers()

    function getAllUsers() {
      $http.get(url + 'users')
        .error((err) => {
          console.log('why is it failing here - ', err)
          const retry = confirm('We can\'t seem to get users. Do you wish to retry?')
          if (retry) {
            location.reload(true)
          }
        })
        .success((data) => {
          $scope.users = $scope.users.concat(data)
        })
    }

    function getAllProducts() {
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

    $scope.getUserInfo = () => {
      $http.get(url + 'userInfo/' + $scope.selectedUser.toLowerCase())
        .error((err) => {
          console.log('why is it failing here - ', err)
        })
        .success((data) => {
          $scope.userInfo = data.userInfo
        })
    }

    $scope.calculate = function(product) {
      let productId

      for (let i in $scope.products) {
        if($scope.products[i].sku === product) {
          productId = i
        }
      }

      // Get basic price
      let pricePerAd = $scope.products[productId].price

      // Get discounted price
      // If we meet minimum, set discount
      if ($scope.userInfo && $scope.userInfo.discountPromo && $scope.userInfo.discountPromo[product] && $scope.orders[product].quantity >= $scope.userInfo.discountPromo[product].minimumOrder) {
        pricePerAd = $scope.userInfo.discountPromo[product].newPrice
      }

      $scope.orders[product].price = (pricePerAd * $scope.orders[product].quantity)
    }

    $scope.determineFreeAds = (product) => {
      // Do we get free stuff
      if ($scope.userInfo && $scope.userInfo.freePromo && $scope.userInfo.freePromo[product] && $scope.orders[product]) {
        // Calculate the extra free ads
        return Math.floor($scope.orders[product].quantity/$scope.userInfo.freePromo[product].minimumOrder)
      }

      return 0
    }

    $scope.checkout = () => {
      // reset the total price everytime we checkout
      $scope.totalPrice = 0

      const products = Object.keys($scope.orders)

      if (products.length === 0) {
        alert('Please make an order before checking out')
        return
      }

      for (let i in products) {
        $scope.totalPrice += $scope.orders[products[i]].price
        $scope.totalOrders[products[i]] = $scope.orders[products[i]].quantity + $scope.determineFreeAds(products[i])
      }
    }
  })