var perceptron;
var points;

function setup() {

    createCanvas(600, 600);

    perceptron = new Perceptron(3);
    var inputs = new Array(-1, .5, 1);
    var result = perceptron.guess(inputs);
    createPoints();
}

//To create a random point within the -1,-1 to 1,1 in a coordinate system
function Point() {
    this.x = random(-1, 1);
    this.y = random(-1, 1);
    this.bias = 1;
    this.lineY = lineEqn(this.x);
    if (this.y > this.lineY) {
        this.label = 1;
    }
    else {
        this.label = -1;
    }
    this.px = map(this.x, -1, 1, 0, width);
    this.py = map(this.y, -1, 1, height, 0);
}

Point.prototype.show = function () {
    stroke(0);
//Points below the line are in Black and above the line are in white - These are correct ones which help us compare the decision by perceptron.         
    if (this.label == 1) {
        fill(240, 248, 255);
    }
    else {
        fill(0);
    }
    ellipse(this.px, this.py, 22, 22);
}

//Create 100 random points
function createPoints() {
    points = new Array(100);
    for (var i = 0; i < points.length; i++) {
        points[i] = new Point();
    }
}


//Train Perceptron on mousepress
function mousePressed() {
    for (var i = 0; i < points.length; i++) {
        perceptron.train([points[i].x, points[i].y, points[i].bias], points[i].label);
    }

}

function draw() {
    background(255);
    for (var i = 0; i < points.length; i++) {
        points[i].show();
    }

//To Draw the line used for binary classification - Clean up this - For future    
    var linestart = {};
    var lineend = {};
    linestart.x = -1;
    linestart.y = lineEqn(linestart.x);
    lineend.x = 1;
    lineend.y = lineEqn(lineend.x);
    linestart.px = map(linestart.x, -1, 1, 0, width);
    linestart.py = map(linestart.y, -1, 1, height, 0);
    lineend.px = map(lineend.x, -1, 1, 0, width);
    lineend.py = map(lineend.y, -1, 1, height, 0);
    line(linestart.px, linestart.py, lineend.px, lineend.py);

//Correct Guess in Green and wrong guess in Red - Red points slowly turn to green as the model learns(fine tunes the weights based on error)
    for (var i = 0; i < points.length; i++) {
        var target = points[i].label;
        var guess = perceptron.guess([points[i].x, points[i].y, points[i].bias])
        if (guess == target) {
            fill(0, 255, 0);
        }
        else {
            fill(255, 0, 0);
        }
        noStroke();
        ellipse(points[i].px, points[i].py, 8, 8);
    }
}

//Equation of the line - To modify to accept any line drawn by user - for future.
function lineEqn(x) {
    return .4 * x + .01;
}

