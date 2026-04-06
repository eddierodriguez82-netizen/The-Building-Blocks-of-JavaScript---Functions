/*
  code.js - Higher or Lower Card Game Logic
  ------------------------------------------
  This file runs the Higher or Lower game.
  It reads the player's guess from the form in game.html
  and writes all output to the page using .innerHTML.
*/

// Wait until the full page has loaded before running any code.
// This makes sure all the HTML elements exist before JS looks for them.
window.onload = function () {

  // -- SCORE VARIABLES --
  var wins   = 0; // tracks how many rounds the player won
  var losses = 0; // tracks how many rounds the player lost
  var ties   = 0; // tracks how many rounds ended in a tie

  // -- CURRENT CARD --
  // Stores the card currently shown on screen.
  // Starts at 0 meaning no card has been dealt yet.
  var currentCard = 0;

  // Deal the first card right away when the page loads
  currentCard = getRandomCard();           // pick a random starting card
  showCard(currentCard);                   // display it on the page

  // ---------------------------------------------------
  // FUNCTION: getRandomCard
  // Returns a random card value between 1 and 13.
  // 1 = Ace, 2-10 = face value, 11 = Jack, 12 = Queen, 13 = King
  //
  // Math.random() gives a decimal from 0 to 0.999
  // Multiplying by 13 gives 0 to 12.999
  // Math.floor rounds it down to a whole number (0 to 12)
  // Adding 1 shifts it to the range 1 to 13
  // ---------------------------------------------------
  function getRandomCard() {
    return Math.floor(Math.random() * 13) + 1; // returns 1 through 13
  }

  // ---------------------------------------------------
  // FUNCTION: getCardName
  // Takes a card number as a parameter and returns
  // the card's display name as a string.
  //
  // Parameter:
  //   num - a number from 1 to 13 representing the card
  // ---------------------------------------------------
  function getCardName(num) {
    // Check for face cards and Ace using if/else if/else
    if (num === 1) {
      return "Ace";      // 1 is the Ace
    } else if (num === 11) {
      return "Jack";     // 11 is the Jack
    } else if (num === 12) {
      return "Queen";    // 12 is the Queen
    } else if (num === 13) {
      return "King";     // 13 is the King
    } else {
      return String(num); // all other cards just show their number
    }
  }

  // ---------------------------------------------------
  // FUNCTION: showCard
  // Takes a card number and updates the card display
  // on the page using .innerHTML.
  //
  // Parameter:
  //   num - the card number to display (1 to 13)
  // ---------------------------------------------------
  function showCard(num) {
    // Update the big card emoji area using .innerHTML
    document.getElementById("cardDisplay").innerHTML = "🃏";

    // Update the card name text below the emoji using .innerHTML
    document.getElementById("cardName").innerHTML = getCardName(num);
  }

  // ---------------------------------------------------
  // FUNCTION: playRound
  // This is the main game function. It runs when the
  // player submits the form by clicking Higher or Lower.
  //
  // What it does:
  //   1. Stops the form from refreshing the page
  //   2. Reads the player's guess from the hidden input
  //   3. Validates the guess using .innerHTML (no alerts)
  //   4. Draws a new random card
  //   5. Compares cards to determine win, loss, or tie
  //   6. Updates score and writes results using .innerHTML
  //   7. Updates the current card to the new card
  // ---------------------------------------------------
  function playRound(event) {

    // Stop the form from reloading the page on submit
    event.preventDefault();

    // Get the result div where all output will be written
    var resultDiv = document.getElementById("result");

    // Read the player's guess from the hidden input field
    var guess = document.getElementById("guessInput").value;

    // -- INPUT VALIDATION (uses .innerHTML, not alerts) --
    // If no button was clicked yet, guess will be empty
    if (guess === "") {
      resultDiv.innerHTML = "<p style='color:#ff6060;'>⚠ Please click Higher or Lower to make a guess!</p>";
      return; // stop the function early
    }

    // Draw the next card by generating a new random number
    var nextCard = getRandomCard(); // the new card being revealed

    // -- DETERMINE OUTCOME using if/else if/else --
    var outcome; // will hold "win", "loss", or "tie"

    if (nextCard > currentCard && guess === "higher") {
      outcome = "win";  // player guessed higher and card went up

    } else if (nextCard < currentCard && guess === "lower") {
      outcome = "win";  // player guessed lower and card went down

    } else if (nextCard === currentCard) {
      outcome = "tie";  // same card value = tie regardless of guess

    } else {
      outcome = "loss"; // guess was wrong
    }

    // -- UPDATE SCORES AND BUILD MESSAGE --
    var message; // the text result shown to the player
    var color;   // the color used for the result message

    if (outcome === "win") {
      wins = wins + 1;                      // add one to the win count
      message = "✅ Correct! You win!";
      color = "#50e090";                    // green for a win

    } else if (outcome === "tie") {
      ties = ties + 1;                      // add one to the tie count
      message = "🤝 Same card — it's a tie!";
      color = "#f0c040";                    // yellow for a tie

    } else {
      losses = losses + 1;                  // add one to the loss count
      message = "❌ Wrong! You lose this round.";
      color = "#ff6060";                    // red for a loss
    }

    // -- UPDATE SCOREBOARD using .innerHTML --
    document.getElementById("wins").innerHTML   = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("ties").innerHTML   = ties;

    // -- SHOW THE NEW CARD on screen using .innerHTML --
    showCard(nextCard);

    // -- WRITE ROUND RESULT to the page using .innerHTML --
    resultDiv.innerHTML =
      "<p>Your guess: <strong>" + guess + "</strong></p>" +
      "<p>New card: <strong>" + getCardName(nextCard) + " (" + nextCard + ")</strong></p>" +
      "<p style='font-size:1.2rem; color:" + color + ";'><strong>" + message + "</strong></p>";

    // -- UPDATE CURRENT CARD --
    // The new card becomes the current card for the next round
    currentCard = nextCard;

    // Reset the hidden input so the player must click a button again
    document.getElementById("guessInput").value = "";
  }

  // ---------------------------------------------------
  // BUTTON CLICK HANDLERS
  // These set the hidden input value to "higher" or "lower"
  // before the form submits, so playRound knows the guess.
  // ---------------------------------------------------

  // When the Higher button is clicked, set the guess to "higher"
  document.getElementById("btnHigher").onclick = function () {
    document.getElementById("guessInput").value = "higher";
  };

  // When the Lower button is clicked, set the guess to "lower"
  document.getElementById("btnLower").onclick = function () {
    document.getElementById("guessInput").value = "lower";
  };

  // ---------------------------------------------------
  // FORM SUBMIT LISTENER
  // Connects the form to the playRound function.
  // Runs playRound every time the form is submitted.
  // ---------------------------------------------------
  document.getElementById("gameForm").addEventListener("submit", playRound);

}; // end of window.onload
