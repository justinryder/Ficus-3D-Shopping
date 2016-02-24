var mouse = {
	x: 0,
	y: 0,
	dX: 0,
	dY: 0
};

document.onmousemove = function(event) {
	mouse.x = event.pageX;
	mouse.y = event.pageY;
	mouse.dX = event.movementX;
	mouse.dY = event.movementY;
};
