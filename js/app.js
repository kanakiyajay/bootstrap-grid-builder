/*!
** Bootstrap Grid Builder
** Licensed under the Apache License v2.0
** http://www.apache.org/licenses/LICENSE-2.0
** Built by Jay Kanakiya ( @techiejayk )
**/

var app = angular.module('bootstrap-grid-builder',['LocalStorageModule']);

app.controller('gridCtrl',['$scope','$http','localStorageService',function  ($scope,$http,localStorageService) {

  /**
  * Models
  **/

  var prefixes = [ 'xs' , 'sm' , 'md' , 'lg'  , 'sm_offset' , 'md_offset' , 'lg_offset'];

  //model = [ { row : [ { col } , ...  ] } , ... ]

  $http.get('data/templates.json').then(function  (res) {
    $scope.templates = res.data ;
  });

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

  $scope.showBtn = false ;
  $scope.showPopover = false ;
  /**
  * Functions
  **/
  $scope.$watch('model',function  (oldVal,newVal) {

      localStorageService.add('model_default',JSON.stringify(newVal));

    },true);

  $scope.getModelData = function  () {
    return $scope.model[$scope.currentRow].row[$scope.currentCol];
  }

  /* IMP code */

  $scope.getHtmlClass = function  (rowNumber,colNumber,col) {

    var cp =$scope.currentPrefix ;
    var className = '';
    if (col.hasOwnProperty(cp)) {
      className = 'col-' + cp + '-' +col[cp];
    };

    if (col.hasOwnProperty(cp+'_offset')) {
      //.col-sm-offset-1
      className = className + " col-" + cp + '-offset-' + col[cp+'_offset'] ;
    };

      if ($scope.currentCol===colNumber && $scope.currentRow === rowNumber) {
        className = className + ' ineditor'
      };

    return className;

  };

  $scope.getCurrentClass = function  (col) {

    /* Returns the current Active Class */
    var cp = $scope.currentPrefix ;
    var className = '';

    if (col.hasOwnProperty(cp)) {
      className = 'col-' + cp + '-' +col[cp];
    };

    if (col.hasOwnProperty(cp+'_offset')) {
      //.col-sm-offset-1
      className = className + " col-" + cp + '-offset-' + col[cp+'_offset'] ;
    };

    if (!className.length) className = "No Class";
    return className
  }

  $scope.showEditor = function  (rowNumber , colNumber , e) {

    colNumber === 0 ? $scope.showOffset = false : $scope.showOffset = true ;

    if ($scope.currentMode === 0 ) { $scope.showOffset = false };

    $scope.showPopover = true ;
    //http://api.jqueryui.com/position/
    $("#toolbar").position({
      my : "center top",
      at : "center bottom",
      of : $(e.target)
    });

    $scope.currentCol = colNumber ;
    $scope.currentRow = rowNumber;

  }

  $scope.changeTemplate = function  (index) {

    var path = "data/"+$scope.templates[index].path+'.json';
    $http.get(path).then(function  (res) {

      $scope.model = res.data;

    });
    $scope.showPopover = false ;

  }

  $scope.changeViewport = function  (number) {

    number === 0 ? $scope.showOffset = false : $scope.showOffset = true ;
    $scope.showPopover = false ;
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
    $scope.showPopover = false ;
  }

  //model = [ { row : [ { col } , ...  ] } , ... ]

  $scope.addCol = function  (currentRow) {
      var newcol = {
        lg : 3,
        md : 3 ,
        sm : 3,
        xs : 3
      };

      $scope.model[currentRow].row.push(newcol);
      $scope.showPopover = false ;
  }

  $scope.showCol = function  (row,col) {
    return $scope.model[row].row.length-1 === col;
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

  $scope.init = function  () {

    if (localStorageService.get('model_default')!==null) {
      console.log("Prev Model");
      $scope.model = JSON.parse(localStorageService.get('model_default'))
    }
    else
    {
      $http.get('data/default.json').then(function  (res) {
        $scope.model = res.data;
      });
    }

    $scope.showOffset = false ;
    $scope.showPopover = false ;
    $scope.changeViewport($scope.currentMode) ;

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
          //!!Add Check for empty rows
          html += '\t<div class="' ;
          prev = 0 ;
          prefixes.forEach(function  (shortcode) {

            if (col.hasOwnProperty(shortcode)) {
              if (prev !== col[shortcode]) {
                html += ' col-' + shortcode + '-' + col[shortcode] ;//!!Solve the extra space
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

          html += '">\n\t\t' ;

          if (col.content) {
            html+= col.content + '\n' ;
          };

          html += '\t</div>\n' ;

        });

      html += '</div>\n' ;
    });

    $('#showHtml').text(html);
    //$("#showJson").text(JSON.stringify($scope.model));
    Prism.highlightAll();
  }
}]);

/* Websites referred
  http://stackoverflow.com/questions/15256600/passing-2-index-values-within-nested-ng-repeat
  http://stackoverflow.com/questions/12430820/accessing-clicked-element-in-angularjs
  http://stackoverflow.com/questions/15458609/angular-js-how-to-execute-function-on-page-load
  http://stackoverflow.com/questions/17982561/using-angular-templates-to-generate-exportable-html
  http://stackoverflow.com/questions/15112584/using-scope-watch-and-scope-apply
  http://stackoverflow.com/questions/14183614/in-angularjs-how-do-i-dynamically-assign-ng-model
  http://gregpike.net/demos/angular-local-storage/demo.html
*/