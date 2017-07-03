(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var buyCtrl = this;
    buyCtrl.items = ShoppingListCheckOffService.getBuyItems();

    buyCtrl.moveItem = function (itemIndex) {
      ShoppingListCheckOffService.moveItem(itemIndex);
      }
    }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtCtrl = this;
    boughtCtrl.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService () {
    var shoppingService = this;
    var buy = [
      {name: 'cherries',
       quantity: '3 lb of'},
      {name: 'Black Forest cake',
       quantity: '1'},
      {name: 'cucumbers',
       quantity: '2'},
      {name: 'milk',
       quantity: '4 L of'},
      {name: 'potatoes',
       quantity: '10'},
      {name: 'sugar',
       quantity: '2 bags of'},
      {name: 'cherry sundae',
       quantity: 'a bowl of'},
      {name: 'pineapple',
       quantity: '1'}
    ];
    var bought = [];

    shoppingService.moveItem = function (itemIndex) {
      var item = buy.splice(itemIndex, 1)[0];
      bought.push(item);
    };

    shoppingService.getBuyItems = function () {
      return buy;
    };

    shoppingService.getBoughtItems = function () {
      return bought;
    };
  }

})();
