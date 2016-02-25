var scene,
    camera,
    renderer,
    raycaster = new THREE.Raycaster(),
    dude,
    products = [],
    focus = null,
    oldFocuses = [];

function initScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);

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

function loadObjAndMtl(path, objName, mtlName, callback) {
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.setBaseUrl(path);
  mtlLoader.setPath(path);
  mtlLoader.load(mtlName, function(materials) {
    materials.preload();
    loadObj(path, objName, materials, callback);
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


function addShelf(xOffset) {
  loadObjAndMtl('obj/Shelf3/', 'Shelf3.obj', 'Shelf3.mtl', function (obj) {
    obj.position.x = xOffset || 0;
    obj.position.y = -95;
    obj.position.z = -200;
    scene.add(obj);
  });
}

function addCereal(name, xOffset, yOffset) {
  loadObjAndMtl('obj/3dCerealBoxes/' + name + '/', name + '.obj', name + '.mtl', function (obj) {
    obj.position.x = xOffset || 0;
    obj.position.y = yOffset || 0;
    obj.position.z = -200;
    obj.scale.multiplyScalar(1.5);
    products.push(obj);
    scene.add(obj);
    // console.log('load product', obj);
  });
}

function loadObjectsAndAddToScene() {
  loadObjAndMtl('obj/male02/', 'male02.obj', 'male02_dds.mtl', function (obj) {
    obj.position.y = -95;
    obj.rotation.y = THREE.Math.degToRad(180);
    dude = obj;
    scene.add(obj);

    loadObj('obj/cart_obj/', 'cart.obj', null, function (cart) {
      obj.add(cart);
      cart.position.z = 100;
      cart.position.x = -20;
    });
  });

  addShelf(-200);
  addShelf(-100);
  addShelf(0);
  addShelf(100);
  addShelf(200);

  addCereal('CocoPops', -225, 5);
  addCereal('CocoPops', -200, 5);
  addCereal('CocoPops', -175, 5);
  addCereal('CocoPops', -125, 5);
  addCereal('CocoPops', -100, 5);
  addCereal('CocoPops', -75, 5);
  addCereal('CocoPops', -25, 5);
  addCereal('CocoPops', 0, 5);
  addCereal('CocoPops', 25, 5);
  addCereal('CocoPops', 75, 5);
  addCereal('CocoPops', 100, 5);
  addCereal('CocoPops', 125, 5);
  addCereal('CocoPops', 175, 5);
  addCereal('CocoPops', 200, 5);
  addCereal('CocoPops', 225, 5);
}
loadObjectsAndAddToScene();

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

function moveTo(obj, pos, moveSpeed) {
  var deltaPos = pos.clone().sub(obj.position);
  if (deltaPos.length() > 1) {
    deltaPos.normalize();
    obj.position.add(deltaPos.multiplyScalar(moveSpeed));
    return false;
  } else {
    return true;
  }
}

function scaleTo(obj, scale, scaleSpeed) {
  var direction = scale.x - obj.scale.x;
  var distance = Math.abs(direction);
  var sign = Math.sign(direction);
  if (distance > scaleSpeed) {
    if (sign > 0) {
      obj.scale.add(new THREE.Vector3(scaleSpeed, scaleSpeed, scaleSpeed));
    }
    if (sign < 0) {
      obj.scale.sub(new THREE.Vector3(scaleSpeed, scaleSpeed, scaleSpeed));
    }
    return false;
  } else {
    return true;
  }
}

function FocusProduct(product) {
  var self = this,
      initialPosition = product.position.clone(),
      initialRotation = product.rotation.clone(),
      initialScale = product.scale.clone(),
      targetScale = initialScale.clone().multiplyScalar(2),
      moveSpeed = 100,
      scaleSpeed = 1,
      targetOffsetFromDude = new THREE.Vector3(-75, 150, 50),
      moving = true,
      targetOffsetFromCart = new THREE.Vector3(-20, 75, 75),
      addingToCart = false;

  console.log('click product', product.position, dude.position);

  self.isFocusedOn = function(obj) {
    return obj == product;
  };

  self.isInCart = function() {
    return addingToCart;
  };

  self.addToCart = function() {
    addingToCart = true;
    moving = true;
  };

  self.update = function(deltaTime) {
    var offset;

    if (addingToCart) {
      offset = targetOffsetFromCart.clone();
    } else {
      offset = targetOffsetFromDude.clone();
    }

    var dudeRotation = new THREE.Matrix4();
    dudeRotation.extractRotation(dude.matrix);
    offset.applyProjection(dudeRotation);
    var targetPosition = offset.add(dude.position);
    if (moving) {
      moving = !moveTo(product, targetPosition, moveSpeed * deltaTime);
    } else {
      product.position.copy(targetPosition);
    }

    if (addingToCart) {
      scaleTo(product, initialScale, scaleSpeed * deltaTime * 2);
    } else {
      scaleTo(product, targetScale, scaleSpeed * deltaTime);
    }
  };

  self.updateToDie = function (deltaTime) {
    // console.log('updateToDie', initialPosition, initialScale);
    if (moveTo(product, initialPosition, moveSpeed * deltaTime) &&
        scaleTo(product, initialScale, scaleSpeed * deltaTime)) {
      return true;
    }

    return false;
  };
}


$(function() {
  var $controlPanel = $('#controlPanel');

  $controlPanel.click(function(event) {
    event.preventDefault();
    event.stopPropagation();

    if (focus) {
      focus.addToCart();
    }
  }).hide();

  document.addEventListener('click', function(event) {
    var mousePosition = {
      x: mouse.nX,
      y: mouse.nY
    };
    raycaster.setFromCamera(mousePosition, camera);
    var intersects = raycaster.intersectObjects(products, true);
    if (intersects.length) {
      var obj = intersects[0].object.parent;
      console.log('clicked', intersects, obj);
      if (focus) {
        oldFocuses.push(focus);

        if (focus.isFocusedOn(obj)) {
          focus = null;
          return;
        }
      }

      focus = new FocusProduct(intersects[0].object.parent);
      $controlPanel.show();
    } else {
      console.log('clicked nothing');
    }
  });

  gameLoop(function renderFrame (deltaTime) {
    if (dude) {
      handleInput(deltaTime);
      follow(camera, dude, new THREE.Vector3(-30, 200, -200), new THREE.Vector3(-30, 150, 0));
    }

    if (focus) {
      focus.update(deltaTime);
    }

    for (var i = 0; i < oldFocuses.length; i++) {
      if (oldFocuses[i].isInCart()) {
        oldFocuses[i].update(deltaTime);
      } else if (oldFocuses[i].updateToDie(deltaTime)) {
        oldFocuses.splice(i, 1);
        i--;
      }
    }

    renderer.render(scene, camera);
  });
});
