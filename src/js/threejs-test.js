var scene,
    camera,
    renderer,
    cube;

function initScene() {
  scene = new THREE.Scene();
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
  var moveSpeed = 250 * deltaTime,
			rotationSpeed = 0.5 * deltaTime;

	if (key.isPressed('a')) {
		cube.position.x -= moveSpeed;
	}

	if (key.isPressed('d')) {
		cube.position.x += moveSpeed;
	}

	if (key.isPressed('w')) {
		cube.position.z -= moveSpeed;
	}

	if (key.isPressed('s')) {
		cube.position.z += moveSpeed;
	}

	if (key.isPressed('q')) {
		cube.position.y -= moveSpeed;
	}

	if (key.isPressed('e')) {
		cube.position.y += moveSpeed;
	}

	if (key.ctrl || key.shift) {
		cube.rotation.y += mouse.dX * rotationSpeed;
		cube.rotation.x += mouse.dY * rotationSpeed;
	}
}

gameLoop(function renderFrame (deltaTime) {
  handleInput(deltaTime);

  renderer.render(scene, camera);
});
