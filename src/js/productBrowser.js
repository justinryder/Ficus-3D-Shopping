$(function () {
  var hammertime = new Hammer($('.scene')[0]);

  var productBoxControls = new ProductBox(hammertime);

  var $productDisplays = $('.productDisplay')
      $activeDisplay = $productDisplays.first();

  // target selection logic
  function focusProduct (event) {
    event.preventDefault();
    event.stopPropagation();

    productBoxControls.resetFocus();
    productBoxControls.focusProduct($(this));
  }

  $('.productBox').hammer().bind("tap", focusProduct);

  // $('.productBox', $activeDisplay).on('click', focusProduct);

  // clear focused on blur
  // $('body').on('click', productBoxControls.re setFocus);

  // hammertime.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
});
