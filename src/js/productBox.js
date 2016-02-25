var xAngle = -25,
    xOrigin = 0;

var yAngle = 25,
    yOrigin = 0;

var xTranslateOrigin = 0,
    xTranslate = xTranslateOrigin;

var yTranslateOrigin = 0,
    yTranslate = yTranslateOrigin;

var scale = 1,
    scaleOrigin = scale;

var moveRate = 10;
var snapToOn = false;

var $focusedProduct = null;

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

// focuses product be scaling it up and positioning it in the view
function focusProduct ($newTarget) {
  $focusedProduct = $newTarget;
  scale = 2.5;

  determineFocusPosition();
  $focusedProduct.addClass("productBox--focused")
                  .css({
                    "z-index": "999",
                    "-webkit-transform":  getCurrentTransformValues()
                  });
}

// resets focused product by clearing its js-modified values
// nulls $focusedProduct to deactivate keyboard functions
function resetFocus () {
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
      xAngle = xAngle + moveRate;
      break;
    case "down":
      xAngle = xAngle - moveRate;
      break;
    case "left":
      yAngle = yAngle - moveRate;
      break;
    case "right":
      yAngle = yAngle + moveRate;
      break;
    case "ctrl+up":
      yTranslate -= moveRate;
      break;
    case "ctrl+down":
      yTranslate += moveRate;
      break;
    case "ctrl+left":
      xTranslate -= moveRate;
      break;
    case "ctrl+right":
      xTranslate += moveRate;
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
      // scale = scaleOrigin;
      // xTranslate = xTranslateOrigin;
      // yTranslate = yTranslateOrigin;
      break;
  }

  $focusedProduct.css("-webkit-transform", getCurrentTransformValues());
}

// keyboard controls for focused product
key('up, down, left, right, ctrl+=, ctrl+-', smoothRotate);
key('shift+up, shift+down, shift+left, shift+right', smoothRotate);
key('ctrl+up, ctrl+down, ctrl+left, ctrl+right', smoothRotate);
key('shift+enter', smoothRotate);
key('esc', resetFocus);

$(function () {
  // target selection logic
  $('.productBox').on('click', function (event) {
    event.preventDefault();
    event.stopPropagation();

    resetFocus();
    focusProduct($(this));
  });

  // clear focused on blur
  $('body').on('click', resetFocus);
});
