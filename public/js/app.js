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
    $scope.users = getAllUsers()
    $scope.products = getAllProducts()
    $scope.userInfo
    $scope.orders = {}
    $scope.totalPrice

    function getAllUsers() {
      console.log('I\'m getting all Users')
      return ['Please choose your username', 'apple', 'ford', 'nike', 'unilever', 'others']
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

    $scope.getUserInfo = () => {
      // TEMP HACK UNTIL WE CAN FIGURE OUT DISABLE
      if ($scope.selectedUser === 'Please choose your username') {
        $scope.userInfo = null
        return
      }

      $http.get('http://localhost:3000/userInfo/' + $scope.selectedUser.toLowerCase())
        .error((err) => {
          console.log('why is it failing here - ', err)
        })
        .success((data) => {
          console.log('this is the data received', data)
          $scope.userInfo = data.userInfo
        })
    }

    $scope.calculate = function(product) {
      // Get element id
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

      $scope.orders[product].price = (pricePerAd * $scope.orders[product].quantity).toFixed(2)

      console.log($scope.orders)
    }

    $scope.determineFreeAds = (product) => {
      // Do we get free stuff
      if ($scope.userInfo && $scope.userInfo.freePromo && $scope.userInfo.freePromo[product] && $scope.orders[product]) {

        // We need to do the logic here. But what, hmmm ...
        return Math.floor($scope.orders[product].quantity/$scope.userInfo.freePromo[product].minimumOrder)
      }

      return 0
    }

    $scope.checkout = () => {
      console.log('this is ordes', $scope.orders)
      let products = Object.keys($scope.price)

      for(let i in products) {

      }

    }
  })