var scene,
    camera,
    renderer;

function initScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}
initScene();

function loadTexture(src) {
  var texture = new THREE.TextureLoader().load(src);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 1);
  return texture;
}

var catTexture = loadTexture('/img/catpattern.jpg');

function createCerealBox() {
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({
    color: '0xFFFFFF',
    map: catTexture
  });
  var cube = new THREE.Mesh(geometry, material);
  return cube;
}

var cube = createCerealBox();
scene.add(cube);

function handleInput(deltaTime) {
  var moveSpeed = 2 * deltaTime;
  if (key.isPressed('a')) {
    cube.rotation.y -= moveSpeed;
  }
  if (key.isPressed('d')) {
    cube.rotation.y += moveSpeed;
  }
  if (key.isPressed('s')) {
    cube.rotation.x += moveSpeed;
  }
  if (key.isPressed('w')) {
    cube.rotation.x -= moveSpeed;
  }
}

// Main render frame function
// deltaTime is time in ms since last frame was drawn
function renderFrame (deltaTime) {
  handleInput(deltaTime);

  renderer.render(scene, camera);
};

/**
* Render loop code below
*/

var _lastRenderTime = 0;
function computeDeltaTime(time) {
  var deltaTime = time - _lastRenderTime;
  _lastRenderTime = time;
  return deltaTime;
}

function renderLoop (time) {
  var deltaTime = computeDeltaTime(time / 1000); // divide by 1000 to get time in seconds
  renderFrame(deltaTime);
  requestAnimationFrame(renderLoop);
}
requestAnimationFrame(renderLoop);
