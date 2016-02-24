var stage,
	container, 
	t = 0;

function init() {
	
	// 1. create the "stage" (root container)
	stage = Sprite3D.createCenteredContainer();
	
	// 2. create the container that will be used to rotate its children, and add it to the stage
	container = new Sprite3D().setZ(-500).update();
	stage.addChild( container );
	
  container.addChild(
    new Sprite3D()
      .setClassName("boxFront")
      .setPosition(-450, -586, 0)
      // .rotateY(0)
      // .rotateX(0)
      .setRotateFirst(true)
      .update()
  );
  
  container.addChild(
    new Sprite3D()
      .setClassName("boxRight")
      .setTransformOrigin( 0, 0 )
      .setPosition(0, -586, 450)
      .rotateY(90)
      .setRotateFirst(true)
      .update()
  );
  
  container.addChild(
    new Sprite3D()
      .setClassName("boxLeft")
      .setTransformOrigin( 0, 0 )
      .setPosition(-280, -586, 450)
      .rotateY(-90)
      .setRotateFirst(true)
      .update()
  );
  
  container.addChild(
    new Sprite3D()
      .setClassName("boxBack")
      .setTransformOrigin( 0, 0 )
      .setPosition(-450, -586, 280)
      .rotateY(-180)
      .setRotateFirst(true)
      .update()
  );
  
  container.addChild(
    new Sprite3D()
      .setClassName("boxTop")
      .setTransformOrigin( 0, 0 )
      .setPosition(-450, 0, 586)
      .rotateX(90)
      .rotateY(180)
      .setRotateFirst(true)
      .update()
  );
  
  container.addChild(
    new Sprite3D()
      .setClassName("boxBottom")
      .setTransformOrigin( 0, 0 )
      .setPosition(-450, -280, 586)
      .rotateX(-90)
      .rotateY(-180)
      .setRotateFirst(true)
      .update()
  );
  
  // Set up an interval for rotating the container
  // Should be done using requestAnimationFrame
  setInterval( move, 1000 / 30 );
}

function move() {
	// increment the t value, used for angle calculation
	t += .05;
	
	// rotate the container around the X and Y axis, then apply these transformations
	container
		.rotateY( -1 )
		.setRotationX( Math.cos(t) * 30 + 30 )
		.update();
}