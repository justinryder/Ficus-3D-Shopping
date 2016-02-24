function init() {
	
	// 1. create the "stage" (root container)
	stage = Sprite3D.createCenteredContainer();
	
	// 2. create the container that will be used to rotate its children, and add it to the stage
	container = new Sprite3D().setZ(-00).rotateX(-20).update();
	stage.addChild( container );
	
	// 3. create front left face
	container.addChild( 
		new Sprite3D()
			.setClassName("imageLeft")
			.setTransformOrigin( 0, 0 )
			.setPosition( -100, -250, 100 )
			.rotateY( -45 )
			.setRotateFirst(true)
			.update()
	);
	
	// 4. create front right face
	container.addChild( 
		new Sprite3D()
			.setClassName("imageRight")
			.setTransformOrigin( 0, 0 )
			.setPosition( -100, -250, 100 )
			.rotateY( 45 )
			.setRotateFirst(true)
			.update()
	);
	
	// 5. create back left face
	container.addChild( 
		new Sprite3D()
			.setClassName("imageLeft")
			.setTransformOrigin( 0, 0 )
			.setPosition( -100, -250, 100 )
			.rotateY( 135 )
			.setRotateFirst(true)
			.update()
	);
	
	// 6. create back right face
	container.addChild( 
		new Sprite3D()
			.setClassName("imageRight")
			.setTransformOrigin( 0, 0 )
			.setPosition( -100, -250, 100 )
			.rotateY( -135 )
			.setRotateFirst(true)
			.update()
	);
	
	// 7. set up an interval for rotating the container
	// (should be done using requestAnimationFrame, but this page tries to keep the code very simple)
	setInterval( move, 1000 / 40 );
	
}