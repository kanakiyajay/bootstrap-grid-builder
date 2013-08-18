/** Bootstrap Grid Builder by Jay Kanakiya
**
**
**/

/*
* xs - Extra Small < 768px               >> 0
* sm - Small Devices >= 768px      >> 1
* md - Medium Devices >= 992px >> 2
* lg - Large Devices >= 1200px      >> 3
*/

var app = angular.module('bootstrap-grid-builder',[]);

app.controller('gridCtrl',function  ($scope) {

  /**
  * Models
  **/

  var prefixes = [ 'xs' , 'sm' , 'md' , 'lg'  , 'sm_offset' , 'md_offset' , 'lg_offset'];

  $scope.model = [
    {
      row : [
      {
        lg : 8,
        md : 6,
        sm : 3,
        xs : 12,
      },
      {
        lg : 3,
        lg_offset : 1,
        md : 5,
        md_offset : 1,
        sm : 8,
        sm_offset : 1,
        xs : 12
      }
      ]
    },{
      row : [{
        lg : 6,
        md : 6,
        sm : 6,
        xs : 6
      },{
        lg : 6,
        md : 6,
        sm : 6,
        xs : 6
      }]
  }];



  $scope.modes = [{
    size : 480,
    prefix : 'xs'
  },{
    size : 780,
    prefix : 'sm'
  },{
    size : 992,
    prefix : 'md'
  },{
    size : 1200,
    prefix : 'lg'
  }]

  $scope.deviceSizes = ['480','780','992','1200'];
  $scope.currentMode = 3;
  $scope.currentPrefix = $scope.modes[$scope.currentMode].prefix ;

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

  $scope.getHtmlClass = function  (rowNumber,colNumber,col) {

    var className = '';

    if (col.hasOwnProperty($scope.currentPrefix)) {
      className = 'col-' + $scope.currentPrefix + '-' +col[$scope.currentPrefix];
    };

    if (col.hasOwnProperty($scope.currentPrefix+'_offset')) {
      //.col-sm-offset-1
      className = className + " col-" + $scope.currentPrefix + '-offset-' + col[$scope.currentPrefix+'_offset'] ;
    };

    return className.replace('_','-');

    /*
    className = "" ;

    for (var i = prefixes.length - 1; i >= 0; i--) {
      var shortcode = prefixes[i];

      if (col.hasOwnProperty(shortcode)) {
        className = className + " col-"+shortcode+"-"+col[shortcode];
      };

      if ($scope.currentCol===colNumber && $scope.currentRow === rowNumber) {
        className = className + ' ineditor'
      };
    };

    return className.replace('_','-');
    */
  };

  $scope.getCurrentClass = function  (col) {

    /* Returns the current Active Class */
    var className = '';

    if (col.hasOwnProperty($scope.currentPrefix)) {
      className = 'col-' + $scope.currentPrefix + '-' +col[$scope.currentPrefix];
    };

    if (col.hasOwnProperty($scope.currentPrefix+'_offset')) {
      //.col-sm-offset-1
      className = className + " col-" + $scope.currentPrefix + '-offset-' + col[$scope.currentPrefix+'_offset'] ;
    };

    if (!className.length) className = "No Class";
    return className
  }

  $scope.showEditor = function  (rowNumber , colNumber) {

    $scope.showBtn = true;
    $scope.currentCol = colNumber ;
    $scope.currentRow = rowNumber;

  }

  $scope.changeViewport = function  (number) {

    number === 0 ? $scope.notxs = false : $scope.notxs = true ;

    $scope.currentMode = number;
    $scope.currentPrefix = $scope.modes[number].prefix;

    $('body').css('width',$scope.modes[number].size+'px');

  }

  $scope.getActive = function  (number) {
    if (number === $scope.currentMode) {
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
        md : 1 //Change according to Mode
      }]
    }
    $scope.model.push(newrow);
  }

  $scope.addCol = function  () {
      var newcol = {
        md : 1 //Change according to Mode
      };

      $scope.model[$scope.currentRow].row.push(newcol);
  }
  /**
  * widths and Offsets
  **/

  $scope.increaseWidth = function  () {
    //Should not be greater than 12

      if($scope.getModelData().hasOwnProperty($scope.currentPrefix))
      {
        if($scope.getModelData()[$scope.currentPrefix] !== 12 )
          {
           $scope.getModelData()[$scope.currentPrefix] += 1 ;
          }
      }
      else{
        $scope.getModelData()[$scope.currentPrefix] = 1 ;
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
    $scope.notxs = true;
  }
});

/* StackOverflow referred
  http://stackoverflow.com/questions/15256600/passing-2-index-values-within-nested-ng-repeat
  http://stackoverflow.com/questions/12430820/accessing-clicked-element-in-angularjs
  http://stackoverflow.com/questions/15458609/angular-js-how-to-execute-function-on-page-load
*/