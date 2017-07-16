(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['itemListItems'];
  function ItemsController(itemListItems) {
    var itemList = this;
    itemList.items = itemListItems.data.menu_items;
    itemList.category = itemListItems.data.category.name;
  }

})();
