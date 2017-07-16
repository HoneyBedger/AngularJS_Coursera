(function () {
  angular.module('MenuApp')
  .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['categoryListItems'];
  function CategoriesController(categoryListItems) {
    var categoryList = this;
    categoryList.items = categoryListItems.data;
  }
})();
