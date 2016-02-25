var container;

function init() {
	var stage = Sprite3D.createCenteredContainer().setId('stage');
	container = new Sprite3D().setZ(-2000);
	stage.addChild(container);
  
  container.addChild(new Sprite3D()
    .setClassName("backboard")
    .setPosition(-4250, -2250, -500)
    .setRotateFirst(true)
  );
  
  container.addChild(new Sprite3D()
    .setClassName("arrow_box left")
    .setPosition(-1500, 0, 150)
    .setRotateFirst(true)
  );
  
  container.addChild(new Sprite3D()
    .setClassName("arrow_box right")
    .setPosition(-1500, 0, -150)
    .rotateY(180)
    .setRotateFirst(true)
  );
  
  //Generate rows of cereal boxes
  var rowCount = 2;
  var rowLength = 3;
  var rowYOffset = 1350;
  var rowXOffset = 850;
  var firstRowYOrigin = -700;
  var firstColumnXOrigin = -900;
  
  var boxes = [];
  for(var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    boxes.push([]);
    for(var columnIndex = 0; columnIndex < rowLength; columnIndex++) {
      boxes[rowIndex].push(new Shreddies());
      
      // Appending an item to the "cart"
      // Revealing absurd fees
      boxes[rowIndex][columnIndex].children[0].domElement.onclick = function() {
        var newRow = document.createElement('tr');
        var titleTd = document.createElement('td');
        titleTd.appendChild(document.createTextNode('Cereal: '));
        var costTd = document.createElement('td');
        costTd.appendChild(document.createTextNode('$1.00'));
        newRow.appendChild(titleTd);
        newRow.appendChild(costTd);
        
        document.querySelector('#items').appendChild(newRow);
        document.querySelector('#total').innerText = document.querySelectorAll('#items tr:not(.absurd-fee)').length + 20;
        
        var absurdFees = document.querySelectorAll('#items tr.absurd-fee');
        for(var i = 0; i < absurdFees.length; i++) {
          absurdFees[i].style.display = 'table-row';
        }
      };
      
      container.addChild(boxes[rowIndex][columnIndex]).setPosition(
        firstColumnXOrigin + (columnIndex * rowXOffset),
        firstRowYOrigin + (rowIndex * rowYOffset),
        0);
    }
  }
  
  container.updateWithChildren();
  
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
      rotationDampeningX = 400,
      rotationDampeningY = 300;

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
      (mouse.y - (document.body.clientHeight/2)) / rotationDampeningY,
      (mouse.x - (document.body.clientWidth/2)) / rotationDampeningX,
      0
    )
    .moveX(x)
    .moveY(y)
    .moveZ(z)
    .update();
}
