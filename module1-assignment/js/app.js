(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {

    $scope.checkIfTooMuch = function() {
      // chech that the string is not empty
      if (!$scope.lunchItems) {
        $scope.message = "Please enter data first";
        return;
      }      
      // split the string into items and remove empty ones
      var lunchItemList = $scope.lunchItems.split(",");
      for (var i = 0; i < lunchItemList.length; i++) {
        if (lunchItemList[i].trim() == "") {
          lunchItemList.splice(i, 1);
          i--;
        }
      }
      // modify the message according to the number of items
      var numItems = lunchItemList.length;
      if (numItems == 0) {
        $scope.message = "Please enter data first";
      } else if (numItems <= 3) {
        $scope.message = "Enjoy!";
      } else {
        $scope.message = "Too much!";
      }

      return;
    }
  }

})();
