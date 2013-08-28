/*!
** Bootstrap Grid Builder
** Licensed under the Apache License v2.0
** http://www.apache.org/licenses/LICENSE-2.0
** Built by Jay Kanakiya ( @techiejayk )
**/

var app = angular.module('bootstrap-grid-builder',[]);

app.controller('gridCtrl',function  ($scope) {

  /**
  * Models
  **/

  var prefixes = [ 'xs' , 'sm' , 'md' , 'lg'  , 'sm_offset' , 'md_offset' , 'lg_offset'];

  //model = [ { row : [ { col } , ...  ] } , ... ]

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
    size : 430,
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

  $scope.currentRow = 0;
  $scope.currentCol = 0;

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

    colNumber === 0 ? $scope.showOffset = false : $scope.showOffset = true ;
    if ($scope.currentMode === 0 ) { $scope.showOffset = false };
    $scope.showBtn = true;
    $scope.currentCol = colNumber ;
    $scope.currentRow = rowNumber;

  }

  $scope.changeViewport = function  (number) {

    number === 0 ? $scope.showOffset = false : $scope.showOffset = true ;

    $scope.currentMode = number;
    $scope.currentPrefix = $scope.modes[number].prefix;

  }

  /*
  * xs - Extra Small < 768px               >> 0 >> iPhone 5
  * sm - Small Devices >= 768px      >> 1 >> iPad
  * md - Medium Devices >= 992px >> 2 >> iPad Landscape
  * lg - Large Devices >= 1200px      >> 3 >> iMac
  */

  $scope.deviceClass = function  () {
    var className  = "device-mockup ";
    switch ($scope.currentPrefix)
    {
      case "xs": className += "iphone5 portrait black" ; break;
      case "sm": className += "ipad portrait black" ; break;
      case "md": className += "ipad landscape black" ; break ;
      case "lg": className += "imac" ; break ;
    }

    return className;
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
      var cp = $scope.currentPrefix ;
      if($scope.getModelData().hasOwnProperty(cp))
      {
        if($scope.getModelData()[cp] !== 12 )
          {
           $scope.getModelData()[cp] += 1 ;
          }
      }
      else{
        $scope.getModelData()[cp] = 1 ;
      }
    }

    $scope.decreaseWidth = function  () {

      var cp = $scope.currentPrefix ;
      if ($scope.getModelData().hasOwnProperty(cp)) {

          if($scope.getModelData()[cp] === 1 )
          {
            //delete $scope.getModelData()[$scope.currentPrefix];
            //Use array.splice to remove the Col Object
           $scope.model[$scope.currentRow].row.splice($scope.currentCol);
           $scope.showBtn = false;
          }
          else{
           $scope.getModelData()[cp] -= 1;
          }
        }
    }

    $scope.increaseOffset = function  () {
    //Should not be greater than 10
    var cp = $scope.currentPrefix + '_offset' ;
    if (!$scope.getModelData().hasOwnProperty(cp)) {
      $scope.getModelData()[cp] = 1;
    }
    else{
      if($scope.getModelData()[cp] !== 10 )
      {
       $scope.getModelData()[cp] += 1 ;
      }
    }
    }

    $scope.decreaseOffset = function  () {
    //Delete if less than 1
    var cp = $scope.currentPrefix+'_offset' ;
    if ($scope.getModelData().hasOwnProperty(cp)) {

      if($scope.getModelData()[cp] === 1 )
      {
       delete $scope.getModelData()[cp];
      }
      else{
       $scope.getModelData()[cp] -= 1;
      }
    };

  }

  $scope.initSelection = function  () {
    $scope.showEditor(0,0);
  }

  $scope.init = function  () {
    $scope.initSelection();
    $scope.showBtn = false;
    $scope.showOffset = false;
    $scope.changeViewport($scope.currentMode);
  }

  $scope.generateHtml = function  () {

    /* USE $compile here

     model = [ { row : [ { col } , ...  ] } , ... ]
     If the larger ones has the same width or offset as the prev ones , delete the larger ones
     i.e. if xs has got the same col size as sm , no need for xs.

    */
    var html = '' , prev = 0;
    prefixes = [ 'xs' , 'sm' , 'md' , 'lg'];
    offsets =   [ 'sm_offset' , 'md_offset' , 'lg_offset'];
    $scope.model.forEach(function  (i) {

      html += '<div class="row">\n' ;

        i.row.forEach(function  (col) {
          html += '\t<div class="' ;
          prev = 0 ;
          prefixes.forEach(function  (shortcode) {

            if (col.hasOwnProperty(shortcode)) {
              if (prev !== col[shortcode]) {
                html += ' col-' + shortcode + '-' + col[shortcode] ;
                prev = col[shortcode] ;
              };
            };

          });
          prev = 0 ;
          offsets.forEach(function  (shortcode) {

            if (col.hasOwnProperty(shortcode)) {
              if (prev !== col[shortcode]) {
                html += ' col-' + shortcode.replace('_','-') + '-' + col[shortcode] ;
                prev = col[shortcode] ;
              };
            };

          });

          html += '">\n\t</div>\n'
        });

      html += '</div>\n' ;
    });

    $('#showHtml').text(html);
    Prism.highlightAll();
    k = html.toString().replace('<','&lt;') ;
  }
});

/* StackOverflow referred
  http://stackoverflow.com/questions/15256600/passing-2-index-values-within-nested-ng-repeat
  http://stackoverflow.com/questions/12430820/accessing-clicked-element-in-angularjs
  http://stackoverflow.com/questions/15458609/angular-js-how-to-execute-function-on-page-load
  http://stackoverflow.com/questions/17982561/using-angular-templates-to-generate-exportable-html
*/