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

  $scope.currentRow = 1;
  $scope.currentCol = 1;

  $scope.inEditor = [];

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

  /**
  * New Rows and Cols
  **/

  $scope.addRow = function  () {
    var newrow = {
      row:[{
        md : 1
      }]
    }
    $scope.model.push(newrow);
  }

  $scope.addCol = function  () {
      var newcol = {
        md : 1
      };

      $scope.model[$scope.currentRow].row.push(newcol);
  }
  /**
  * widths and Offsets
  **/

  $scope.increaseWidth = function  () {
    //Should not be greater than 12

    if($scope.getModelData().md !== 12 )
      {
       $scope.getModelData().md += 1 ;
      }
    }

    $scope.decreaseWidth = function  () {
    //Delele if less than 1
      if($scope.getModelData().md === 1 )
      {
       delete $scope.getModelData().md;
      }
      else{
       $scope.getModelData().md -= 1;
      }
    }

    $scope.increaseOffset = function  () {
    //Should not be greater than 10
    console.log($scope.getModelData().hasOwnProperty('md_offset'));

    if (!$scope.getModelData().hasOwnProperty('md_offset')) {
      $scope.getModelData().md_offset = 1;
    }
    else{
      if($scope.getModelData().md_offset !== 10 )
      {
       $scope.getModelData().md_offset += 1 ;
      }
    }
    }

    $scope.decreaseOffset = function  () {
    //Delete if less than 1
    console.log($scope.getModelData().hasOwnProperty('md_offset'));
    if ($scope.getModelData().hasOwnProperty('md_offset')) {

      if($scope.getModelData().md_offset === 1 )
      {
       delete $scope.getModelData().md_offset;
      }
      else{
       $scope.getModelData().md_offset -= 1;
      }
    };

  }


});

/* StackOverflow referred
  http://stackoverflow.com/questions/15256600/passing-2-index-values-within-nested-ng-repeat
  http://stackoverflow.com/questions/12430820/accessing-clicked-element-in-angularjs
*/