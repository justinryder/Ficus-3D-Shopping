var mouse = {
	// Current x/y
	x: 0,
	y: 0,
	// Delta x/y
	dX: 0,
	dY: 0,
	// Normalized x/y (-1 to +1)
	nX: 0,
	nY: 0
};

document.addEventListener('mousemove', function(event) {
	mouse.x = event.pageX;
	mouse.y = event.pageY;
	mouse.dX = event.movementX;
	mouse.dY = event.movementY;
	mouse.nX = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.nY = - ( event.clientY / window.innerHeight ) * 2 + 1;
});
