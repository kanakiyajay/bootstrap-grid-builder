/** Bootstrap Grid Builder by Jay Kanakiya
**
**
**/

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

  $scope.deviceSizes = ['480','767','979','1200'];
  $scope.currentSize = 3;

  $scope.currentRow = 1;
  $scope.currentCol = 1;

  $scope.inEditor = [];

  $scope.showBtn = false;

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

    $scope.showBtn = true;

    if ($('.ineditor').length) $('.ineditor').removeClass('ineditor');

    arguments.length===2  ? $scope.inEditor = $('#main').find('[class*=col]').first() : $scope.inEditor = $(e.target);

    $scope.currentCol = colNumber ;
    $scope.currentRow = rowNumber;

    $scope.inEditor.addClass('ineditor');

  }

  $scope.getActive = function  (number) {
    if (number === $scope.currentSize) {
      return "active"
    }
    else {

    }
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
        //Use array.splice to remove the Col Object
       $scope.model[$scope.currentRow].row.splice($scope.currentCol);
       $scope.showBtn = false;
      }
      else{
       $scope.getModelData().md -= 1;
      }
    }

    $scope.increaseOffset = function  () {
    //Should not be greater than 10
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

  $scope.initSelection = function  () {
    $scope.showEditor(1,1);
  }

  $scope.init = function  () {
    $scope.initSelection();
    $scope.showBtn = false;
  }
});

/* StackOverflow referred
  http://stackoverflow.com/questions/15256600/passing-2-index-values-within-nested-ng-repeat
  http://stackoverflow.com/questions/12430820/accessing-clicked-element-in-angularjs
  http://stackoverflow.com/questions/15458609/angular-js-how-to-execute-function-on-page-load
*/