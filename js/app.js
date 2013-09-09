/*!
** Bootstrap Grid Builder
** Licensed under the Apache License v2.0
** http://www.apache.org/licenses/LICENSE-2.0
** Built by Jay Kanakiya ( @techiejayk )
**/

var app = angular.module('bootstrap-grid-builder',['ngDragDrop']);
var pckry ;

app.controller('gridCtrl',function  ($scope) {

  /* Models */
  $scope.model = [
    {
      lg : 3 ,
      md : 3 ,
      sm : 3 ,
      xs : 12 ,
      offset_lg : 0,
      offset_md : 0,
      offset_sm : 0,
      offset_xs : 0,
      content : 'Logo'
    },
    {
      lg : 9 ,
      md : 9 ,
      sm : 9 ,
      xs : 12 ,
      offset_lg : 0,
      offset_md : 0,
      offset_sm : 0,
      offset_xs : 0,
      content : 'Navigation'
    },
    {
      lg : 12 ,
      md : 12 ,
      sm : 12 ,
      xs : 12 ,
      offset_lg : 0,
      offset_md : 0,
      offset_sm : 0,
      offset_xs : 0,
      content : 'Marketing Talk'
    },
    {
      lg : 4 ,
      md : 6 ,
      sm : 6 ,
      xs : 6 ,
      offset_lg : 0,
      offset_md : 0,
      offset_sm : 0,
      offset_xs : 0,
      content : 'Info 1'
    },
    {
      lg : 4 ,
      md : 6 ,
      sm : 6 ,
      xs : 6 ,
      offset_lg : 0,
      offset_md : 0,
      offset_sm : 0,
      offset_xs : 0,
      content : 'Info 2'
    },
    {
      lg : 4 ,
      md : 6 ,
      sm : 6 ,
      xs : 6 ,
      offset_lg : 0,
      offset_md : 0,
      offset_sm : 0,
      offset_xs : 0,
      content : 'Info 3'
    }
  ]

  $scope.current = {
    prefix : "lg" , //Start with Desktop
    index : 0 , // First Element
    dragEnabled : true ,
    stamped : false ,
    element : document.querySelector('.screen .item')
  }

  $scope.emptyCol = {
    four : {
        lg : 4 ,
        md : 4 ,
        sm : 4 ,
        xs : 6 ,
        offset_lg : 0,
        offset_md : 0,
        offset_sm : 0,
        offset_xs : 0,
        content : '.col-lg-4'
      },
      eight : {
        lg : 8,
        md : 8,
        sm : 8,
        xs : 12,
        offset_lg : 0,
        offset_md : 0,
        offset_sm : 0,
        offset_xs : 0,
        content : '.col-lg-8'
      },
      twelve : {
        lg : 12 ,
        md : 12 ,
        sm : 12 ,
        xs : 12,
        offset_lg : 0,
        offset_md : 0,
        offset_sm : 0,
        offset_xs : 0,
        content : '.col-lg-12'
      }
    } ;

  /* Functions */
  $scope.dropped = function  () {
    $scope.$digest();
    var elem = $('.item').last().get()[0] ; // !!
      pckry.appended(elem) ;
       var draggie = new Draggabilly( elem ,{
        containment : '.dabblet' ,
        handle : '.handle'
      });

    pckry.bindDraggabillyEvents( draggie );
  }

  $scope.showEditor = function  ($index,col,e) {

    this.current.index = $index ;
    //Change its Position using jQuery Position
    setTimeout(function  () {
      $scope.current.element = e.target ;
    },50);

  }

  $scope.col = {
    getData : function  () {
      return $scope.model[$scope.current.index] ;
    } ,
    increaseWidth : function  () {
      var col = this.getData() ;
      if (col[$scope.current.prefix]===12) {
        $.bootstrapGrowl("Oops ! Can't increase beyond 12") ;
      }
      else{
        col[$scope.current.prefix] += 1 ;
        if ($scope.current.dragEnabled) {
          setTimeout(function  () {
            // If expanding Fit it
            pckry.fit($scope.current.element) ;
          },50) ;
        }
      }
    } ,
    decreaseWidth : function  () {
      var col = this.getData() ;
      if (col[$scope.current.prefix]===1) {
        $.bootstrapGrowl("Oops ! U can't increase beyond 1") ;
        $.bootstrapGrowl("Oops ! U should delete the element") ;
      }
      else{
        col[$scope.current.prefix] -= 1 ;
        if ($scope.current.dragEnabled) {
          setTimeout(function  () {
            // If contracting Layout it
            pckry.layout() ;
          },50) ;
        }
      }
    } ,
    increaseOffset : function  () {
      var spanWidth = $('.packery').width() / 12 ;
      var $item = $(pckry.getItemElements()[$scope.current.index]) ;
      var permit = nearestNum(parseFloat($item.css('left')) / spanWidth ) ;
      /* No Offset if the element is first col*/
      if (permit) {
        var col = this.getData() ;
        if (col['offset_'+$scope.current.prefix]===12) {
          $.bootstrapGrowl("Cant increase beyond 12") ;
        }
        else{
          col['offset_'+$scope.current.prefix] += 1 ;
          if ($scope.current.dragEnabled) {
            setTimeout(function  () {
              // If expanding Fit it
              pckry.fit($scope.current.element) ;
            },50) ;
          }
        }
      }
      else{
        $.bootstrapGrowl("Oops ! U can't apply offset to first Col");
      }
    },
    decreaseOffset : function  () {
      var col = this.getData() ;
      if (col['offset_'+$scope.current.prefix]===0) {
        $.bootstrapGrowl("Cant decrease beyond 0",{type:'error'}) ;
      }
      else{
        col['offset_'+$scope.current.prefix] -= 1 ;
        if ($scope.current.dragEnabled) {
          setTimeout(function  () {
            // If contracting Layout it
            pckry.layout() ;
          },50) ;
        }
      }
    }
  }

  $scope.getColClass = function  ($index,col) {
    var className = 'item' ;
    //className += 'col-' + this.current.prefix + '-' + col[this.current.prefix] ;
    className += ' col-lg-' + col[this.current.prefix] ;
    className += ' col-lg-offset-' + col['offset_'+this.current.prefix] ;
    if (this.current.index === $index ) className += ' ineditor';
    return className ;
  }

  $scope.getFixClass = function  ($index,col) {
    var className ="" ;
    if (col[this.current.prefix]===12) {
      className += " clearfix"
    };
    return className
  }
  $scope.getDeviceClass = function  () {

    var className  = "device-mockup ";
    switch (this.current.prefix)
    {
      case "xs": className += "iphone5 portrait black" ; break;
      case "sm": className += "ipad portrait black" ; break;
      case "md": className += "ipad landscape black" ; break ;
      case "lg": className += "imac" ; break ;
    }
    return className;
  }

  $scope.getColInfo = function  (col) {
    return {
      lg : col.lg ,
      md : col.md ,
      sm : col.sm ,
      xs : col.xs ,
      offset_lg : col.offset_lg ,
      offset_md :  col.offset_md ,
      offset_sm :  col.offset_sm ,
      offset_xs :  col.offset_xs
    }
  }

  $scope.showInstructions = function  () {
    console.log("Using Chardin-js");
    $('body').chardinJs('start');
  }

  $scope.changeViewport = function  (prefix) {

    this.current.prefix = prefix ;

    if (prefix === "lg" ) {
      this.current.dragEnabled = true ;
      setTimeout(function  () {
        var container = document.querySelector('.packery');
        pckry = new Packery( container, {
          itemSelector: '.item',
          columnWidth: '#grid-sizer',
          gutter : 0,
          rowHeight: 60
        });
      },100)
    }
    else{
      if (this.current.dragEnabled) {

          pckry.destroy();
          setTimeout(function  () {

              var itemElems = pckry.getItemElements()
              , totalWidth = $('.packery').width()
              , colWidth = totalWidth / 12
              , $item ;

              for ( var i=0, len = itemElems.length; i < len; i++ ) {
                var x = $(itemElems[i]).data('index');
                $scope.model[i].reorder = x ;
              }


              $scope.model.sort(function(a,b) {
                return a.reorder - b.reorder ;
              });

              $scope.$apply ($scope.model);
          })
        }
      this.current.dragEnabled = false ;
      };
  };

  $scope.generateHtml = function  () {

    var itemElements = pckry.getItemElements()
     , totalWidth = $('.packery').width()
     , colWidth = totalWidth / 12
     , html = ''
     , prevRow = -1
     , prefixes = [ 'xs' , 'sm' , 'md' , 'lg']
     , offsets = [ 'offset_xs' , 'offset_sm' , 'offset_md' , 'offset_lg']
     , prev = '';

    for (var i = 0; i < itemElements.length; i++) {

      var $item = $(itemElements[i])
        , $itemData = $item.data('info')
        , currentRow = nearestNum(parseFloat($item.css('top')) / 60 ) ;
      /* Check here whether it is different Row */
      if(prevRow !== currentRow)
      {
        if( prevRow !== -1 ) html += '</div>\n' ;  // Not the first time
        html += '<div class="row">\n' ;
        prevRow = currentRow ;
      }

      html += '\t<div class="' ;

      prefixes.forEach(function  (shortcode) {
          if (prev !== parseInt($itemData[shortcode])) {
            html += ' col-' + shortcode + '-' + $itemData[shortcode] ;
            prev = $itemData[shortcode] ;
          };
      });

      offsets.forEach(function  (shortcode,j) {
        var offset = $itemData[shortcode] ;

        if (offset!==0 && prev !== offset) {
              html += ' col-' + prefixes[j] + '-offset-' + offset ;
              prev = offset ;
        }

      });

      html += '>\n\t\t' + $item.children('p').text()+'\n\t</div>\n';

      /*
      console.log(" Row Number ",nearestNum(parseFloat($item.css('top')) / 60 ));
      console.log(" Left ",nearestNum(parseFloat($item.css('left')) / colWidth ));
      console.log(" Span ",nearestNum(parseFloat($item.width()) / colWidth ));
      */
    };
    html += '</div>' ;
    $('#showHtml').text(html) ;
  }

  $scope.init = function  () {

    var docElem = document.documentElement;

    docReady( function() {
      var container = document.querySelector('.packery');
      pckry = new Packery( container, {
        itemSelector: '.item',
        columnWidth: '#grid-sizer',
        gutter : 0,
        rowHeight: 60
      });
      var itemElems = pckry.getItemElements();
      // for each item element
      for ( var i=0, len = itemElems.length; i < len; i++ ) {
        var elem = itemElems[i];
        // make element draggable with Draggabilly
        var draggie = new Draggabilly( elem ,{
          containment : '.dabblet' ,
          handle : '.handle'
        });
        // bind Draggabilly events to Packery
        pckry.bindDraggabillyEvents( draggie );
        function onLayout() {
        }
        // bind event listener
        pckry.on( 'layoutComplete', onLayout );
      }

      gridOverlay();
      $.bootstrapGrowl("Bootstrap Grid Builder v2<sub>Beta</sub>")
    });
  }
});

function nearestNum (number) {
  var larger = Math.ceil(number) ;
  var smaller = Math.floor(number) ;
  larger - number > number - smaller ? number = smaller : number = larger ;
  return number ;
}

/*
  http://packery.metafizzy.co/packery.pkgd.js
  http://draggabilly.desandro.com/draggabilly.pkgd.js
  http://codepen.io/desandro/pen/mdJnF
  https://github.com/metafizzy/packery/issues/56
  https://github.com/codef0rmer/angular-dragdrop/issues/37
  http://stackoverflow.com/questions/15256600/passing-2-index-values-within-nested-ng-repeat
  http://stackoverflow.com/questions/12430820/accessing-clicked-element-in-angularjs
  http://stackoverflow.com/questions/15458609/angular-js-how-to-execute-function-on-page-load
  http://stackoverflow.com/questions/17982561/using-angular-templates-to-generate-exportable-html
  http://stackoverflow.com/questions/15112584/using-scope-watch-and-scope-apply
  http://stackoverflow.com/questions/14183614/in-angularjs-how-do-i-dynamically-assign-ng-model
  http://gregpike.net/demos/angular-local-storage/demo.html
  http://stackoverflow.com/questions/16900050/angular-js-ng-repeat-across-multiple-elements
  http://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
  http://html5-demos.appspot.com/static/css/webkit-canvas.html
  http://stackoverflow.com/questions/15453979/how-do-i-delete-an-item-or-object-from-an-array-using-ng-click
*/