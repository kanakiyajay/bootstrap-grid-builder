/**
** Bootstrap Grid Builder by Jay Kanakiya
** http://jaykanakiya.com
** Licensed under BSD license
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

  $scope.currentMode = 0;
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

  /* IMP code */

  $scope.getHtmlClass = function  (rowNumber,colNumber,col) {

    var className = '';

    if (col.hasOwnProperty($scope.currentPrefix)) {
      className = 'col-' + $scope.currentPrefix + '-' +col[$scope.currentPrefix];
    };

    if (col.hasOwnProperty($scope.currentPrefix+'_offset')) {
      //.col-sm-offset-1
      className = className + " col-" + $scope.currentPrefix + '-offset-' + col[$scope.currentPrefix+'_offset'] ;
    };

      if ($scope.currentCol===colNumber && $scope.currentRow === rowNumber) {
        className = className + ' ineditor'
      };

    return className;

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
        lg : 3,
        md : 3 ,
        sm : 3,
        xs : 3
      }]
    }
    $scope.model.push(newrow);
  }

  $scope.addCol = function  () {
      var newcol = {
        lg : 3,
        md : 3 ,
        sm : 3,
        xs : 3
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

    if ($scope.getModelData().hasOwnProperty($scope.currentPrefix)) {

        if($scope.getModelData()[$scope.currentPrefix] === 1 )
        {
          //delete $scope.getModelData()[$scope.currentPrefix];
          //Use array.splice to remove the Col Object
         $scope.model[$scope.currentRow].row.splice($scope.currentCol);
         $scope.showBtn = false;
        }
        else{
         $scope.getModelData()[$scope.currentPrefix] -= 1;
        }
      }
    }

    $scope.increaseOffset = function  () {
    //Should not be greater than 10
    if (!$scope.getModelData().hasOwnProperty($scope.currentPrefix+'_offset')) {
      $scope.getModelData()[$scope.currentPrefix+'_offset'] = 1;
    }
    else{
      if($scope.getModelData()[$scope.currentPrefix+'_offset'] !== 10 )
      {
       $scope.getModelData()[$scope.currentPrefix+'_offset'] += 1 ;
      }
    }
    }

    $scope.decreaseOffset = function  () {
    //Delete if less than 1

    if ($scope.getModelData().hasOwnProperty($scope.currentPrefix+'_offset')) {

      if($scope.getModelData()[$scope.currentPrefix+'_offset'] === 1 )
      {
       delete $scope.getModelData()[$scope.currentPrefix+'_offset'];
      }
      else{
       $scope.getModelData()[$scope.currentPrefix+'_offset'] -= 1;
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
    $scope.changeViewport($scope.currentMode);
  }

  $scope.generateHtml = function  () {

    /* USE $compile here */
    // model = [ { row : [ { col } , ...  ] } , ... ]

    var html = '';
    prefixes = [ 'xs' , 'sm' , 'md' , 'lg'];
    offsets =   [ 'sm_offset' , 'md_offset' , 'lg_offset'];
    $scope.model.forEach(function  (i) {

      html += '<div class="row">\n' ;

        i.row.forEach(function  (col) {
          html += '\t<div class="';

          prefixes.forEach(function  (shortcode) {
            if (col.hasOwnProperty(shortcode)) {
              html += ' col-' + shortcode + '-' + col[shortcode] ;
            };
          });

          offsets.forEach(function  (shortcode) {
            if (col.hasOwnProperty(shortcode)) {
              html += ' col-' + shortcode.replace('_','-') + '-' + col[shortcode] ;
            };
          });

          html += '">\n\t</div>\n'
        });

      html += '</div>\n' ;
    });

    console.log(html);
  }
});

/* StackOverflow referred
  http://stackoverflow.com/questions/15256600/passing-2-index-values-within-nested-ng-repeat
  http://stackoverflow.com/questions/12430820/accessing-clicked-element-in-angularjs
  http://stackoverflow.com/questions/15458609/angular-js-how-to-execute-function-on-page-load
  http://stackoverflow.com/questions/17982561/using-angular-templates-to-generate-exportable-html
*/