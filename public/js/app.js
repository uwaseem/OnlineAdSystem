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
    $scope.orders = {}
    $scope.price = {}
    $scope.totalPrice

    function getAllUsers() {
      console.log('I\'m getting all Users')
      return [{
        name: 'apple',
        discountPromo: {
          standout: {
            minimumOrder: 0,
            newPrice: 299.99
          }
        }
      }, {
        name: 'ford',
        discountPromo: {
          standout: {
            minimumOrder: 0,
            newPrice: 309.99
          },
          premium: {
            minimumOrder: 3,
            newPrice: 389.99
          }
        },
        freePromo: {
          classic: {
            minimumOrder: 4,
            freeQuantity: 1
          }
        }
      }, {
        name: 'nike',
        discountPromo: {
          premium: {
            minimumOrder: 4,
            newPrice: 379.99
          }
        }
      }, {
        name: 'unilever',
        freePromo: {
          classic: {
            minimumOrder: 2,
            freeQuantity: 1
          }
        }
      }, {
        name: 'other',
        discountPromo: {
          classic: {
            minimumOrder: 0,
            newPrice: 0
          },
          standout: {
            minimumOrder: 0,
            newPrice: 0
          },
          premium: {
            minimumOrder: 0,
            newPrice: 0
          }
        },
        freePromo: {
          classic: {
            minimumOrder: 0,
            freeQuantity: 0
          },
          standout: {
            minimumOrder: 0,
            freeQuantity: 0
          },
          premium: {
            minimumOrder: 0,
            freeQuantity: 0
          }}
      }]
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
      let id
      for (let i in $scope.products) {
        if($scope.products[i].sku === product) {
          id = i
        }
      }

      // Get basic price
      let price = $scope.products[id].price

      $scope.price[product] = price * $scope.orders[product]

      // Any discounts
      // Any free
      console.log($scope.price)
    }


  })