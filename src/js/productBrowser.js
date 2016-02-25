$(function () {
  var hammertime = new Hammer($('.scene')[0], { domEvents: false });

  var productBoxControls = new ProductBox(hammertime);

  var $productDisplays = $('.productDisplay')
      $activeDisplay = $productDisplays.first();

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

  // hammertime.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
});
