function Perceptron(n) {
//Create n number of initial weights which will be updated as the model learns
  this.weights = new Float32Array(n);
  for (var i = 0; i < this.weights.length; i++) {
    this.weights[i] = random(-1, 1);
  }
}

//Guess the classification
Perceptron.prototype.guess = function (inputs) {
  var sum = 0;
  for (var i = 0; i < inputs.length; i++) {
    sum += inputs[i] * this.weights[i];
  }

  if (sum >= 0) {
    return 1;
  }
  else {
    return -1;
  }
}


//Tune the weights based on error
Perceptron.prototype.train = function (inputs, target) {

  this.guessTarget = this.guess(inputs);
  this.error = target - this.guessTarget

  for (var i = 0; i < this.weights.length; i++) {
    this.weights[i] += this.error * inputs[i];
  }

}