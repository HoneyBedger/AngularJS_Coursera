(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .constant('baseUrl', "https://davids-restaurant.herokuapp.com")
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrowCtrl = this;

    narrowCtrl.narrow = function () {
      // take care of empty search term
      if (!narrowCtrl.searchTerm || !narrowCtrl.searchTerm.trim()) {
        narrowCtrl.found = [];
        return;
      }
      var promise = MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm);
      promise.then(function (result) {
        narrowCtrl.found = result;
        console.log("items found:");
        console.log(narrowCtrl.found);
      }).catch(function (error) {
        console.log("Something went wrong when retriving filtered results from the service: " + error);
      });
    }

    narrowCtrl.removeItem = function (index) {
      console.log("removing item");
      MenuSearchService.removeItem(index);
    }
  }

  MenuSearchService.$inject = ['$http', 'baseUrl'];
  function MenuSearchService ($http, baseUrl) {
    var searchService = this;
    var filteredItems = [];

    searchService.getMatchedMenuItems = function (searchTerm) {
      // if the search term is empty, just return
      searchTerm = searchTerm.toLowerCase();
      return $http({
          method: "GET",
          url: (baseUrl + "/menu_items.json")
        }).then(function (result) {
          filteredItems = result.data.menu_items;
          for (var i = 0; i < filteredItems.length; i++) {
            if (filteredItems[i].description.toLowerCase().indexOf(searchTerm) == -1) {
              filteredItems.splice(i, 1);
              i--;
            }
          }
          return filteredItems;
        }).catch(function (error) {
          console.log("Something went wrong when filtering menu items: " + error);
        });
    }

    searchService.removeItem = function (index) {
      filteredItems.splice(index, 1);
    }
  }

  function FoundItemsDirective() {
    var ddo = {
      restrict: 'E',
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'foundCtrl',
      bindToController: true
    }
    return ddo;
  }

  function FoundItemsDirectiveController () {
    var foundCtrl = this;
    foundCtrl.isEmpty = function () {
      if (foundCtrl.found && foundCtrl.found.length === 0) {
        return true;
      }
    }
  }
})();
