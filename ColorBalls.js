var canvas = document.querySelector("canvas");

// resize canvas
canvas.width = innerWidth;
canvas.height = innerHeight;

var c = canvas.getContext("2d");
const colArray = [["#949398FF", "#F4DF4EFF"], ["#FC766AFF", "#5B84B1FF"], ["#5F4B8BFF", "#E69A8DFF"], ["#42EADDFF", "#CDB599FF"], 
	["#000000FF", "#FFFFFFFF"], ["#00A4CCFF", "#F95700FF"], ["#00203FFF", "#ADEFD1FF"], ["#606060FF", "#D6ED17FF"], ["#ED2B33FF", "#D85A7FFF"], 
	["#2C5F2D", "#97BC62FF"], ["#00539CFF", "#EEA47FFF"], ["#0063B2FF", "#9CC3D5FF"], ["#D198C5FF", "#E0C568FF"], ["#101820FF", "#FEE715FF"],
	["#CBCE91FF", "#EA738DFF"], ["#B1624EFF", "#5CC8D7FF"], ["#89ABE3FF", "#FCF6F5FF"], ["#E3CD81FF", "#B1B3B3FF"], ["#101820FF", "#F2AA4CFF"],
	["#A07855FF", "#D4B996FF"], ["#195190FF", "#A2A2A1FF"], ["#603F83FF", "#C7D3D4FF"], ["#2BAE66FF", "#FCF6F5FF"], ["#FAD0C9FF", "#6E6E6DFF"], 
	["#2D2926FF", "#E94B3CFF"], ["#DAA03DFF", "#616247FF"], ["#990011FF", "#FCF6F5FF"], ["#435E55FF", "#D64161FF"], ["#CBCE91FF", "#76528BFF"], 
	["#FAEBEFFF", "#333D79FF"], ["#F93822FF", "#FDD20EFF"], ["#F2EDD7FF", "#755139FF"], ["#006B38FF", "#101820FF"], ["#F95700FF", "#FFFFFFFF"],
	["#FFD662FF", "#00539CFF"], ["#D7C49EFF", "#343148FF"], ["#FFA177FF", "#F5C7B8FF"], ["#DF6589FF", "#3C1053FF"], ["#FFE77AFF", "#2C5F2DFF"]];

function Circle(initX, initY, initRadius, initCol, initDx, initDy) {
	this.x = initX;
	this.y = initY;
	this.radius = initRadius;
	this.col = initCol;
	this.dx = initDx;
	this.dy = initDy;

	this.draw = function() {
		c.strokeStyle = this.col;
		c.fillStyle = this.col;

		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		c.fill();
		c.stroke();

	}
	this.update = function() {
		if (this.x - this.radius < 0 || this.x + this.radius > innerWidth) {
			this.dx = -this.dx;
		}
		if (this.y - this.radius < 0 || this.y + this.radius > innerHeight) {
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;

		this.draw();
	}
}

function generateCircle() {
	var circleArray = [];
	randColSet = Math.random() * colArray.length

	for (var i = 0; i < 1000; i++) {
		radius = Math.random() * 15;
		x = Math.random() * (innerWidth - 2 * radius) + radius;
		y = Math.random() * (innerHeight - 2 * radius) + radius;
		dx = Math.random() * 2 - 1;
		dy = Math.random() * 2 - 1;
		color = colArray[Math.floor(randColSet)][Math.floor(Math.random() * colArray[Math.floor(randColSet)].length)];

		circleArray.push(new Circle(x, y, radius, color, dx, dy));
	}

	return circleArray;
}

var circleArr = generateCircle();

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	for (var i = 0; i < circleArr.length; i++) {
		circleArr[i].update();
	}
}

animate();
