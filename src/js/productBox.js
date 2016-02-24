var xAngle = -25;
var xOrigin = xAngle;
var yAngle = 25;
var yOrigin = yAngle;
var scale = 1;
var scaleOrigin = scale;
var moveRate = 10;
var snapToOn = false;

function smoothRotate(direction) {
  // transition duration is varied between rotation types (1s for snap-to, 10ms for manual)
  if (key.shift && !snapToOn) {
    $(".productBox--cornpops").css("-webkit-transition", "-webkit-transform 750ms linear");
    snapToOn = true;
  } else if (!key.shift && snapToOn) {
    $(".productBox--cornpops").css("webkit-transition", "-webkit-transform 500ms linear");
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
      break;
  }

  $(".productBox--cornpops").css("-webkit-transform", "rotateX(" + xAngle + "deg) " +
                                    "rotateY(" + yAngle + "deg) " +
                                    "scale3d(" + scale + ", " + scale + ", " + scale + ")");

  // log key event and resulting coordinates
  console.log(direction + " : x=" + xAngle + " : y=" + yAngle + " : scale=" + scale);
}

// free rotate & zoom
key('up, down, left, right, ctrl+=, ctrl+-', function(event, handler) {
    event.preventDefault();
    smoothRotate(handler.shortcut);
});

// snap-to
key('shift+up, shift+down, shift+left, shift+right', function(event, handler) {
    event.preventDefault();
    smoothRotate(handler.shortcut);
});

key('shift+enter', function(event, handler) {
    event.preventDefault();
    smoothRotate(handler.shortcut);
});
