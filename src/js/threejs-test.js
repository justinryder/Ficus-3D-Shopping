var scene,
    camera,
    renderer,
    dude;

function initScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
  //camera.position.set(0, 0, 200);
  //camera.up = new THREE.Vector3(0, 1, 0);
  //camera.lookAt(new THREE.Vector3(0, 500, 0));

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

// var mtlLoader = new THREE.MTLLoader();
// // mtlLoader.setBaseUrl('obj/male02/');
// // mtlLoader.setPath('obj/male02/');
// // mtlLoader.load('male02_dds.mtl', function(materials) {
// mtlLoader.setBaseUrl('obj/Shelf/');
// mtlLoader.setPath('obj/Shelf/');
// mtlLoader.load('Shelfs.mtl', function(materials) {
//
//   materials.preload();
//
//   var objLoader = new THREE.OBJLoader();
//   objLoader.setMaterials(materials);
//   // objLoader.setPath('obj/male02/');
//   // objLoader.load('male02.obj', function (object) {
//   objLoader.setPath('obj/Shelf/');
//   objLoader.load('Shelfs.obj', function (object) {
//     cube = object;
//
//     object.position.y = - 95;
//     scene.add(object);
//
//   }, onProgress, onError);
//
// });

function loadObjAndMtl(path, objName, mtlName, callback) {
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.setBaseUrl(path);
  mtlLoader.setPath(path);
  mtlLoader.load(mtlName, function(materials) {
    materials.preload();
    loadObj(path, objName, materials, callback);
    // var objLoader = new THREE.OBJLoader();
    // objLoader.setMaterials(materials);
    // objLoader.setPath(path);
    // objLoader.load(objName, callback, onProgress, onError);
  });
}

function loadObj(path, objName, materials, callback) {
  var objLoader = new THREE.OBJLoader();
  if (materials) {
    objLoader.setMaterials(materials);
  }
  objLoader.setPath(path);
  objLoader.load(objName, callback, onProgress, onError);
}

loadObjAndMtl('obj/male02/', 'male02.obj', 'male02_dds.mtl', function (obj) {
  obj.position.y = - 95;
  obj.rotation.y = THREE.Math.degToRad(180);
  dude = obj;
  scene.add(obj);

  loadObj('obj/cart_obj/', 'cart.obj', null, function (cart) {
    obj.add(cart);
    cart.position.z = 100;
  });
});


function addShelf(xOffset) {
  loadObjAndMtl('obj/Shelf3/', 'Shelf3.obj', 'Shelf3.mtl', function (obj) {
    obj.position.x = xOffset || 0;
    obj.position.y = - 95;
    obj.position.z = -200;
    scene.add(obj);
  });
}

addShelf(-200);
addShelf(-100);
addShelf(0);
addShelf(100);
addShelf(200);

function follow(obj, toFollow, offset, lookPoint) {
  obj.position.copy(offset.applyMatrix4(toFollow.matrix));
  obj.lookAt(lookPoint.applyMatrix4(toFollow.matrix));
}

function handleInput(deltaTime) {
  var moveSpeed = 250 * deltaTime,
			rotationSpeed = 5 * deltaTime,
      deltaPosition = new THREE.Vector3(0, 0, 0);

	if (key.isPressed('a')) {
		dude.rotation.y += rotationSpeed;
	}

	if (key.isPressed('d')) {
		dude.rotation.y -= rotationSpeed;
	}

	if (key.isPressed('w')) {
		deltaPosition.z += 1;
	}

	if (key.isPressed('s')) {
		deltaPosition.z -= 1;
	}

	if (key.isPressed('q')) {
		deltaPosition.x += 1;
	}

	if (key.isPressed('e')) {
		deltaPosition.x -= 1;
	}

  if (deltaPosition.length()) {
    dude.translateOnAxis(deltaPosition.normalize(), moveSpeed);
  }
}

gameLoop(function renderFrame (deltaTime) {
  if (dude) {
    handleInput(deltaTime);
    //cameraFollow(dude);
    follow(camera, dude, new THREE.Vector3(-30, 200, -200), new THREE.Vector3(-30, 150, 0));
  }

  renderer.render(scene, camera);
});
