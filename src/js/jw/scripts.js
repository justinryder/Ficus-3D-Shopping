var stage,
	container,
  rotationDampening = 400;

function init() {

	// 1. create the "stage" (root container)
	stage = Sprite3D.createCenteredContainer();

	// 2. create the container that will be used to rotate its children, and add it to the stage
	container = new Sprite3D().setZ(-3500).update();
	stage.addChild( container );
  
  container.addChild(new Sprite3D()
    .setClassName("backboard")
    .setPosition(-2200, -3000, -500)
    .setRotateFirst(true)
    .update()
  );
  
  var rowCount = 3;
  var rowLength = 4;
  var rowYOffset = 1500;
  var rowXOffset = 850;
  
  var firstRowYOrigin = -1350;
  var firstColumnXOrigin = -1350;
  for(var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for(var columnIndex = 0; columnIndex < rowLength; columnIndex++) {
      var box = new Shreddies();
      
      box.domElement.onclick = function() {
        console.log(container.rotationX, container.rotationY, container.rotationZ);
      };
      
      container.addChild(box).setPosition(
        firstColumnXOrigin + (columnIndex * rowXOffset),
        firstRowYOrigin + (rowIndex * rowYOffset),
        0).update();
    }
  }
  
  gameLoop(move);
}

function move(deltaTime) {
	var x = 0,
			y = 0,
			z = 0,
			rotX = 0,
			rotY = 0,
			rotZ = 0,
			moveSpeed = 500 * deltaTime,
			rotationSpeed = 50 * deltaTime;

	if (key.isPressed('a')) {
		x -= moveSpeed;
	}

	if (key.isPressed('d')) {
		x += moveSpeed;
	}

	if (key.isPressed('w')) {
		z -= moveSpeed;
	}

	if (key.isPressed('s')) {
		z += moveSpeed;
	}

	if (key.isPressed('q')) {
		y += moveSpeed;
	}

	if (key.isPressed('e')) {
		y -= moveSpeed;
	}
  
	container
    .setRotation(
      (mouse.y - (document.body.clientHeight/2)) / rotationDampening,
      (mouse.x - (document.body.clientWidth/2)) / rotationDampening,
      0
    )
    .moveX(x)
    .moveY(y)
    .moveZ(z)
    .update();
}
