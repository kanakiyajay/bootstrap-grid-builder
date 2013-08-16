var app = angular.module('bootstrap-grid-builder',[]);

app.controller('gridCtrl',function  ($scope) {

  /**
  * Models
  **/
  $scope.model = [
    {
      row : [
      {
        md : 9
      },
      {
        md : 2,
        md_offset : 1
      }
      ]
    },{
      row : [{
        md : 12
      }]
  }];

  $scope.inEditor = [];
  $scope.currentRow = 1;
  $scope.currentCol = 1;

  /**
  * Functions
  **/

  $scope.getModelData = function  () {
    return $scope.model[$scope.currentRow].row[$scope.currentCol];
  }

  $scope.getHtmlClass = function  (col) {

    devices = [ 'lg' , 'md' , 'xs' , 'sm' ,'md_offset'];
    className = "" ;

    for (var i = devices.length - 1; i >= 0; i--) {
      var shortcode = devices[i];

      if (col.hasOwnProperty(shortcode)) {
        className = className + " col-"+shortcode+"-"+col[shortcode];
      };

    };
    return className.replace('_','-');
  };


  $scope.showEditor = function  (rowNumber , colNumber , e) {
    if ($('.ineditor').length) $('.ineditor').removeClass('ineditor');

    $scope.inEditor = $(e.target);
    $scope.currentCol = colNumber ;
    $scope.currentRow = rowNumber;

    $scope.inEditor.addClass('ineditor');

  }

  $scope.addrow = function  () {
    var newrow = {
      row:[{
        md : 1
      }]
    }
    $scope.model.push(newrow);
  }

  $scope.increaseWidth = function  () {
    console.log($scope.getModelData());
  }


});

/* StackOverflow referred
  http://stackoverflow.com/questions/15256600/passing-2-index-values-within-nested-ng-repeat
  http://stackoverflow.com/questions/12430820/accessing-clicked-element-in-angularjs
*/