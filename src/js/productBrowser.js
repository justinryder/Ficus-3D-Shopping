$(function () {
  var hammertime = new Hammer($('body')[0], { domEvents: false });

  var productBoxControls = new ProductBox(hammertime);

  // target selection logic
  function focusProduct (event) {
    // console.log("product tap");
    event.gesture.srcEvent.stopPropagation();

    productBoxControls.resetFocus();
    productBoxControls.focusProduct($(this));
  }

  $('.productBox').hammer().bind("tap", focusProduct);

  // clear focused on blur
  $('body').hammer().bind("tap", function (event) {
    // console.log("body tap");
    if(event.target && event.target.className.indexOf('productBox') == -1 ) {
      productBoxControls.resetFocus();
    }
  });

  // product display navigation
  var $shoppingScene = $('.scene'),
      $productDisplays = $('.productDisplay')
      $activeDisplay = $productDisplays.first(),
      moveDistance = 800;

  function canMove (direction) {
    console.log($activeDisplay.index());
    if (direction == 'left') {
      return $activeDisplay.index() != 0;
    } else {
      return $activeDisplay.index()-1 !== $activeDisplay.siblings().length;
    }
  }

  hammertime.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
  hammertime.on('swipeleft swiperight', function(event) {
    var sceneOffset = moveDistance;

    if (event.type == 'swiperight' && canMove('left')) {
      $activeDisplay = $activeDisplay.prev();
      sceneOffset = 0;
      $shoppingScene.css('margin-left', sceneOffset);
    } else if (event.type == 'swipeleft' && canMove('right')) {
      $activeDisplay = $activeDisplay.next();
      sceneOffset = moveDistance * -1;
      $shoppingScene.css('margin-left', sceneOffset);
    }

    productBoxControls.resetFocus();
  });
});
