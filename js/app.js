function gridCtrl ($scope) {

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

  $scope.addrow = function  () {
    var newrow = {
      row:[{
        md : 1
      }]
    }

    $scope.model.push(newrow);
  }

  $scope.showEditor = function  () {
    console.log("Show Editor");
  }
}