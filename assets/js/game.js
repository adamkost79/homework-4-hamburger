var game = {
  targetValue: 0,
  burgerValues: [],
  score: 0,
  wins: 0,
  losses: 0,
  numberOfBurgers: 4,

  generateRandomTargetValue: function generateRandomTargetValue() {
    this.targetValue = Math.floor(Math.random() * 102 + 19);
    $("#targetScore").html(this.targetValue);
  },

  generateRandomBurgerValues: function generateRandomBurgerValues() {
    for (var i = 0; i < this.numberOfBurgers; i++) {
      var randomNumber = Math.floor(Math.random() * 12 + 1);
      while (this.burgerValues.indexOf(randomNumber) != -1) {
        var randomNumber = Math.floor(Math.random() * 12 + 1);
      }
      this.burgerValues.push(randomNumber);
    }
  },

  attachValuesToBurger: function attachValuesToBurger() {
    // Attaching each burger with a value from burgerValues
    $('.burger').each(function() {
      $(this).data("crystalvalue", game.burgerValues.pop());
    });
  },

  checkScore: function checkScore(burgerValue) {
    this.score = burgerValue + this.score;
    $("#score").html(this.score);
    // If score = targetValue
    if (this.score == this.targetValue) {
      this.wins++;
      $("#wins").html(this.wins);
      this.reset();
    }
    if (this.score > this.targetValue) {
      this.losses++;
      $("#losses").html(this.losses);
      this.reset();
    }
  },

  reset: function reset() {
    this.targetValue = 0;
    this.burgerValues = [];
    this.score = 0;
    $("#score").html(this.score);
    this.generateRandomTargetValue();
    this.generateRandomBurgerValues();
    this.attachValuesToBurger();
  }
};

$(document).ready(function() {

  game.generateRandomTargetValue();

  game.generateRandomBurgerValues();

  // Call function to attach values from burgerValues to each burger
  game.attachValuesToBurger();

  $('.burger').on("click", function() {
    var value = $(this).data("crystalvalue");
    game.checkScore(value);
  });

});
