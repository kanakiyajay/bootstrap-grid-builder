function gridOverlay () {

  var container = $('.screen')[0] ;
  var supported = true;

  if (!!!document.getCSSCanvasContext) {
    supported = false;
  }

  var computedStyle = window.getComputedStyle(container);
  var WIDTH = parseInt(computedStyle.width);
  var HEIGHT = parseInt(computedStyle.height);

  if (supported) {
    var ctx = document.getCSSCanvasContext('2d', 'animation', WIDTH, HEIGHT);
    var canvas = ctx.canvas;

    var ratio = correctPixelRatio(ctx);

    WIDTH = ctx.canvas.width;
    HEIGHT = ctx.canvas.height;

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    var multiply = WIDTH / 12 ;
    var factor ;

    for (var i = 1; i < 12; i++) {
      factor = i * multiply ;
      ctx.beginPath();
      ctx.moveTo(factor, 0);
      ctx.lineTo(factor, WIDTH);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(12, 12, 12,0.25)';
      ctx.stroke();
    };
  }

  function correctPixelRatio(ctx, container) {
    var canvas = ctx.canvas;
    var ratio =  window.devicePixelRatio / ctx.webkitBackingStorePixelRatio;

    var oldWidth = canvas.width;
    var oldHeight = canvas.height;

    canvas.width = oldWidth * ratio;
    canvas.height = oldHeight * ratio;

    canvas.style.width = oldWidth + 'px';
    canvas.style.height = oldHeight + 'px';

    return ratio;
  }
}

gridOverlay();