var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

var _lastRenderTime = 0;
function computeDeltaTime(time) {
  var deltaTime = time - _lastRenderTime;
  _lastRenderTime = time;
  return deltaTime;
}

function renderFrame (deltaTime) {
  cube.rotation.x += 4 * deltaTime;
  cube.rotation.y += 4 * deltaTime;

  renderer.render(scene, camera);
};

function renderLoop (time) {
  var deltaTime = computeDeltaTime(time / 1000); // divide by 1000 to get time in seconds
  renderFrame(deltaTime);
  requestAnimationFrame(renderLoop);
}
requestAnimationFrame(renderLoop);
