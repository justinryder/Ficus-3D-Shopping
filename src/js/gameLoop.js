var gameLoop = function(frameUpdateCallback){
  var _lastRenderTime = 0;
  function computeDeltaTime(time) {
    var deltaTime = time - _lastRenderTime;
    _lastRenderTime = time;
    return deltaTime;
  }

  function renderLoop (time) {
    var deltaTime = computeDeltaTime(time / 1000); // divide by 1000 to get time in seconds
    frameUpdateCallback(deltaTime);
    requestAnimationFrame(renderLoop);
  }

  requestAnimationFrame(renderLoop);
};
