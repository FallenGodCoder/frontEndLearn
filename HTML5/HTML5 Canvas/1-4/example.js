var canvas = document.getElementById("canvas"),
	readout = document.getElementById("readout"),
	context = canvas.getContext("2d"),
	spritesheet = new Image();

function windowToCanvas(canvas, x, y){
	var bbox = canvas.getBoundingClientRect();
	return {
		x: x - bbox.left * (canvas.width / bbox.width),
		y: y - bbox.top * (canvas.height / bbox.height)
	};
}

function drawBackground(){
	var VERTICAL_LINE_SPACING = 12,
		i = context.canvas.height;

	context.clearRect(0, 0, canvas.width, canvas.height);
	context.strokeStyle = "lightgray";
	context.lineWidth = 0.5;
	
	while(i > VERTICAL_LINE_SPACING*4)
	{
		context.beginPath();
		context.moveTo(0,i);
		context.lineTo(context.canvas.width, i);
		context.stroke();
		i -= VERTICAL_LINE_SPACING;
	}
}

function drawSpritesheet(){
	context.drawImage(spritesheet, 0, 0);
}

function drawGuidelines(x, y){
	context.strokeStyle = "rgba(245, 120, 0, 0.8)";
	context.lineWidth = 1;
	drawVerticalLine(x);
	drawHorizontalLine(y);
}

function drawVerticalLine(x){
	context.beginPath();
	context.moveTo(x + 0.5, 0);
	context.lineTo(x + 0.5, context.canvas.height);
	context.stroke();
}

function drawHorizontalLine(y){
	context.beginPath();
	context.moveTo(0, y + 0.5);
	context.lineTo(context.canvas.width, y + 0.5);
	context.stroke();
}

function updateReadout(x, y){
	readout.innerText = "(" + x.toFixed(0) + "," + y.toFixed(0) + ")";
}

canvas.onmousemove = function	(e){
	var loc = windowToCanvas(canvas, e.clientX, e.clientY);

	drawBackground();
	drawSpritesheet();
	drawGuidelines(loc.x, loc.y);
	updateReadout(loc.x, loc.y);
}

spritesheet.src = "../images/running-sprite-sheet.png";
spritesheet.onload = function(e){
	drawSpritesheet();
}

drawBackground();