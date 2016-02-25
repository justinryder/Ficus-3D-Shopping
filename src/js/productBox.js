window.ProductBox = function (hammertime) {
  var self = this;

  var xOrigin = 0,
  xAngle = xOrigin;

  var yOrigin = 5,
  yAngle = yOrigin;

  var xTranslateOrigin = 0,
  xTranslate = xTranslateOrigin;

  var yTranslateOrigin = 0,
  yTranslate = yTranslateOrigin;

  var scale = 1,
  scaleOrigin = scale;

  var keyboardMoveRate = 10;
  var touchMoveRate = 5;
  var snapToOn = false;
  var $focusedProduct = null;
  var focusedTraqball = null;

  function getCurrentTransformValues () {
    return "translateX(" + xTranslate + "%)" +
    "translateY(" + yTranslate + "%)" +
    "rotateX(" + xAngle + "deg) " +
    "rotateY(" + yAngle + "deg) " +
    "scale3d(" + scale + ", " + scale + ", " + scale + ")";
  }

  // uses transalateX/Y to offset focused product based on position on shelf
  //   to help ensure the focused product is fully visible
  function determineFocusPosition () {
    var productOrder = $focusedProduct.index(),
    productTotal = $focusedProduct.siblings().length + 1,
    parentOrder = $focusedProduct.parent().index();

    if (productOrder < 2) {
      xTranslate = 50;
    } else if (productOrder - productTotal <= 2) {
      xTranslate = -50;
    }

    if (parentOrder == 0) {
      yTranslate = 50;
    } else if (parentOrder == 1) {
      xTranslate = -50;
    }
  }

  // focuses product by scaling it up and positioning it in the view
  self.focusProduct = function ($newTarget) {
    $focusedProduct = $newTarget;
    scale = 2.5;

    // give slight angle to show off threedeeene  ss
    xAngle = -10;
    yAngle = 20;

    determineFocusPosition();
    $focusedProduct.addClass("productBox--focused")
    .css({
      "z-index": "999",
      "-webkit-transform":  getCurrentTransformValues()
    });

    // focusedTraqball = new Traqball({
    //                             stage: $focusedProduct.parent()[0],
    //                             axis: [xAngle, yAngle, 0]}
    //                           );
  }

  // resets focused product by clearing its js-modified values
  // nulls $focusedProduct to deactivate keyboard functions
  self.resetFocus = function () {
    if ($focusedProduct != null) {
      xAngle = xOrigin;
      yAngle = yOrigin;
      scale = scaleOrigin;
      xTranslate = xTranslateOrigin;
      yTranslate = yTranslateOrigin;

      $focusedProduct.removeClass("productBox--focused")
      .css({
        "z-index": "initial",
        "-webkit-transform": getCurrentTransformValues()
      });

      // focusedTraqball.disable();
      // focusedTraqball = null;
      $focusedProduct = null;
    }
  }

  // manages all keyboard interactions
  function smoothRotate (event, handler) {
    if (!$focusedProduct) {
      return;
    }

    event.preventDefault();
    var direction = handler.shortcut;

    // transition duration is varied between rotation types (1s for snap-to, 10ms for manual)
    if (key.shift && !snapToOn) {
      $focusedProduct.css("-webkit-transition", "-webkit-transform 750ms linear");
      snapToOn = true;
    } else if (!key.shift && snapToOn) {
      $focusedProduct.css("webkit-transition", "-webkit-transform 250ms linear");
      snapToOn = false;
    }

    var diff;
    // adjust perspective based on direction, rotation type and scale
    switch (direction) {
      case "up":
      xAngle = xAngle + keyboardMoveRate;
      break;
      case "down":
      xAngle = xAngle - keyboardMoveRate;
      break;
      case "left":
      yAngle = yAngle - keyboardMoveRate;
      break;
      case "right":
      yAngle = yAngle + keyboardMoveRate;
      break;
      case "ctrl+up":
      yTranslate -= keyboardMoveRate;
      break;
      case "ctrl+down":
      yTranslate += keyboardMoveRate;
      break;
      case "ctrl+left":
      xTranslate -= keyboardMoveRate;
      break;
      case "ctrl+right":
      xTranslate += keyboardMoveRate;
      break;
      case "shift+up":
      diff = xAngle % 90;
      if (0 !== diff) {
        xAngle += diff < 0 ? diff * -1 : 90 - diff;
      } else {
        xAngle += 90;
      }
      break;
      case "shift+down":
      diff = xAngle % 90;
      if (0 !== diff) {
        xAngle = diff < 0 ? xAngle + (diff * -1) - 90 : xAngle - diff;
      } else {
        xAngle -= 90;
      }
      break;
      case "shift+right":
      diff = yAngle % 90;
      if (0 !== diff) {
        yAngle += diff < 0 ? diff * -1 : 90 - diff;
      } else {
        yAngle += 90;
      }
      break;
      case "shift+left":
      diff = yAngle % 90;
      if (0 !== diff) {
        yAngle = diff < 0 ? yAngle + (diff * -1) - 90 : yAngle - diff;
      } else {
        yAngle -= 90;
      }
      break;
      case "ctrl+=":
      scale += 0.1;
      break;
      case "ctrl+-":
      scale -= 0.1;
      break;
      case "shift+enter":
      xAngle = xOrigin;
      yAngle = yOrigin;
      scale = scaleOrigin;
      // xTranslate = xTranslateOrigin;
      // yTranslate = yTranslateOrigin;
      break;
    }

    $focusedProduct.css("-webkit-transform", getCurrentTransformValues());
  }

  function productPanHandler (event) {
    if (!$focusedProduct) {
      return;
    }

    switch (event.type) {
      case "panup":
      xAngle = xAngle + touchMoveRate;
      break;
      case "pandown":
      xAngle = xAngle - touchMoveRate;
      break;
      case "panleft":
      yAngle = yAngle - touchMoveRate;
      break;
      case "panright":
      yAngle = yAngle + touchMoveRate;
      break;
    }

    $focusedProduct.css("-webkit-transform", getCurrentTransformValues());
  }

  function productPinchHandler (event) {
    if (!$focusedProduct) {
      return;
    }

    var newScale;

    switch (event.type) {
      case "pinchin":
      newScale = scale + 0.05;
      break;
      case "pinchout":
      newScale = scale - 0.05;
      break;
    }

    // prevent scale from getting out of hand
    if (newScale >= 0.5 && newScale <= 10) {
      scale = newScale;
      $focusedProduct.css("-webkit-transform", getCurrentTransformValues());
    }
  }

  // keyboard controls for focused product
  key('up, down, left, right, ctrl+=, ctrl+-', smoothRotate);
  key('shift+up, shift+down, shift+left, shift+right', smoothRotate);
  key('ctrl+up, ctrl+down, ctrl+left, ctrl+right', smoothRotate);
  key('shift+enter', smoothRotate);
  key('esc', self.resetFocus);

  // swipe controls for focused productBox
  hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
  hammertime.get('pinch').set({ enable: true });

  hammertime.on('panleft panright panup pandown', productPanHandler);
  hammertime.on('pinchin pinchout', productPinchHandler);
};
