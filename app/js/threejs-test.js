var scene,
    camera,
    renderer,
    cube;

function initScene() {
  scene = new THREE.Scene();
  //camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  //camera.position.z = 5;
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.z = 250;

  var ambient = new THREE.AmbientLight(0x444444);
	scene.add(ambient);

	var directionalLight = new THREE.DirectionalLight(0xffeedd);
	directionalLight.position.set(0, 0, 1).normalize();
	scene.add(directionalLight);


  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}
initScene();

var onProgress = function (xhr) {
  if (xhr.lengthComputable) {
    var percentComplete = xhr.loaded / xhr.total * 100;
    console.log(Math.round(percentComplete, 2) + '% downloaded');
  }
};

var onError = function (xhr) { };

THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setBaseUrl('obj/male02/');
mtlLoader.setPath('obj/male02/');
mtlLoader.load('male02_dds.mtl', function(materials) {

  materials.preload();

  var objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);
  objLoader.setPath('obj/male02/');
  objLoader.load('male02.obj', function (object) {
    cube = object;

    object.position.y = - 95;
    scene.add(object);

  }, onProgress, onError);

});

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

gameLoop(function renderFrame (deltaTime) {
  handleInput(deltaTime);

  renderer.render(scene, camera);
});
