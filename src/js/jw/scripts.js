var stage,
	container, 
	t = 0;

function init() {
	
	// 1. create the "stage" (root container)
	stage = Sprite3D.createCenteredContainer();
	
	// 2. create the container that will be used to rotate its children, and add it to the stage
	container = new Sprite3D().setZ(-500).update();
	stage.addChild( container );
  
  var boxDepth = 280;
  var boxHeight = 1172;
  var boxWidth = 900;
  
  container.addChild(
    new Sprite3D()
      .setClassName("boxFront")
      .setPosition(-1*(boxWidth/2), -1*(boxHeight/2), 0)
      .setRotateFirst(true)
      .update()
  );
  
  container.addChild(
    new Sprite3D()
      .setClassName("boxRight")
      .setTransformOrigin( 0, 0 )
      .setPosition(0, -1*(boxHeight/2), (boxWidth/2))
      .rotateY(90)
      .setRotateFirst(true)
      .update()
  );
  
  container.addChild(
    new Sprite3D()
      .setClassName("boxLeft")
      .setTransformOrigin( 0, 0 )
      .setPosition(-280, -1*(boxHeight/2), (boxWidth/2))
      .rotateY(-90)
      .setRotateFirst(true)
      .update()
  );
  
  container.addChild(
    new Sprite3D()
      .setClassName("boxBack")
      .setTransformOrigin( 0, 0 )
      .setPosition(-1*(boxWidth/2), -1*(boxHeight/2), boxDepth)
      .rotateY(-180)
      .setRotateFirst(true)
      .update()
  );
  
  container.addChild(
    new Sprite3D()
      .setClassName("boxTop")
      .setTransformOrigin( 0, 0 )
      .setPosition(-1*(boxWidth/2), 0, (boxHeight/2))
      .rotateX(90)
      .rotateY(180)
      .setRotateFirst(true)
      .update()
  );
  
  container.addChild(
    new Sprite3D()
      .setClassName("boxBottom")
      .setTransformOrigin( 0, 0 )
      .setPosition(-1*(boxWidth/2), -1*boxDepth, boxHeight/2)
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
		.setRotationX( Math.cos(t) * 30 - 30 )
		.update();
}