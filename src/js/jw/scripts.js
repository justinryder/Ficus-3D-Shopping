var stage,
	container,
	t = 0;

function init() {

	// 1. create the "stage" (root container)
	stage = Sprite3D.createCenteredContainer();

	// 2. create the container that will be used to rotate its children, and add it to the stage
	container = new Sprite3D().setZ(-3500).update();
	stage.addChild( container );
  
  container.addChild(new Sprite3D()
    .setClassName("backboard")
    .setPosition(-2500, -2500, -1250)
    .setRotateFirst(true)
    .update()
  );
  
  // Row of Shreddies
  container.addChild(new Shreddies()).setPosition(-1600, -1300, 0).update();
  container.addChild(new Shreddies()).setPosition(-1600, -1300, -375).update();
  container.addChild(new Shreddies()).setPosition(-750, -1300, 0).update();
  container.addChild(new Shreddies()).setPosition(-750, -1300, -375).update();
  container.addChild(new Shreddies()).setPosition(100, -1300, 0).update();
  container.addChild(new Shreddies()).setPosition(100, -1300, -375).update();
  container.addChild(new Shreddies()).setPosition(950, -1300, 0).update();
  container.addChild(new Shreddies()).setPosition(950, -1300, -375).update();
  
  // Row of CornPops
  container.addChild(new CornPops()).setPosition(-1600, 0, 0).update();
  container.addChild(new CornPops()).setPosition(-1600, 0, -500).update();
  container.addChild(new CornPops()).setPosition(-800, 0, 0).update();
  container.addChild(new CornPops()).setPosition(-800, 0, -500).update();
  container.addChild(new CornPops()).setPosition(0, 0, 0).update();
  container.addChild(new CornPops()).setPosition(0, 0, -500).update();
  container.addChild(new CornPops()).setPosition(800, 0, 0).update();
  container.addChild(new CornPops()).setPosition(800, 0, -500).update();
  
  // Row of CocoPops
  container.addChild(new CocoPops()).setPosition(-1500, 1300, 0).update();
  container.addChild(new CocoPops()).setPosition(-1500, 1300, -375).update();
  container.addChild(new CocoPops()).setPosition(-500, 1300, 0).update();
  container.addChild(new CocoPops()).setPosition(-500, 1300, -375).update();
  container.addChild(new CocoPops()).setPosition(500, 1300, 0).update();
  container.addChild(new CocoPops()).setPosition(500, 1300, -375).update();
  
  gameLoop(move);
}

function move(deltaTime) {
	// increment the t value, used for angle calculation
	t += deltaTime;

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
  
	if (key.ctrl) {
		rotY = mouse.dX * rotationSpeed;
		rotX = mouse.dY * rotationSpeed;
	}

	// rotate the container around the X and Y axis, then apply these transformations
	container
		.rotateX(rotX)
		.rotateY(rotY)
		.rotateZ(rotZ)
		.moveX(x)
		.moveY(y)
		.moveZ(z)
		.update();
}
