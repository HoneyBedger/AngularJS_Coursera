(function () {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    // home state
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.template.html'
    })

    // categories state
    .state('categories', {
      url: '/categories',
      templateUrl: 'templates/category-list.template.html',
      controller: 'CategoriesController as categoryList',
      resolve: {
        categoryListItems: ['MenuDataService', function(MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    // items state
    .state('categories.items', {
      url: '/{category}/items',
      templateUrl: 'templates/item-list.template.html',
      controller: 'ItemsController as itemList',
      resolve: {
       itemListItems: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
         return MenuDataService.getItemsForCategory($stateParams.category);
       }]
      }
    });

  }

})();
