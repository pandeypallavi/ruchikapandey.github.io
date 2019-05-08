// cards array holds all cards
const cards = document.querySelectorAll(".memory-card");
// declaring move variable
let moves = 0;
moveCount = document.getElementById("movecount");
// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");
let startRating = 3;
//variable for matching cards
let firstCard;
let secondCard;
let hasFlippedCard = false;
let lockCards = false;
let matchedcards = 0;
// body onload Function to shuffle the cards 
document.body.onload = shuffle();

function shuffle() {
	cards.forEach(element => {
		matchedcards = 0;
		let randomPos = Math.floor(Math.random() * 16);
		element.style.order = randomPos;
	});
}
// EventListeners
cards.forEach(element => element.addEventListener("click", flipTheCard));
cards.forEach(element => element.addEventListener("click", IncCount));
cards.forEach(element => element.addEventListener("click", congratulations));
// Function to flip the card
function flipTheCard() {
	if (lockCards) return;
	if (this === firstCard) return;
	this.classList.add("flip");
	if (hasFlippedCard != true) {
		firstCard = this;
		hasFlippedCard = true;
		return;
	}
	secondCard = this;
	checkForMatch();
}
// Function for Card Match 
function checkForMatch() {
	if (firstCard.dataset.name == secondCard.dataset.name) {
		// firstCard.classList.add("match");
		animate();
		// secondCard.classList.add("match");
		disableCards();
		matchedcards += 2;
		// console.log(matchedcards); 
		return;
	}
	unFlipCards()
}
// Function to diable the matched cards
function disableCards() {
	firstCard.removeEventListener('click', flipTheCard);
	secondCard.removeEventListener('click', flipTheCard);
	resetBoard();
}
// Function to unflip the unmatched cards
function unFlipCards() {
	lockCards = true;
	setTimeout(function() {
		firstCard.classList.remove("flip");
		secondCard.classList.remove("flip");
		resetBoard();
	}, 800)
}
// reset all
function resetBoard() {
	[hasFlippedCard, lockCards] = [false, false];
	[firstCard, secondCard] = [null, null];
	// console.log(firstCard);
}
// Reset / Restart Button
function reset() {
	moveCount = document.getElementById("movecount"),
		// reset the moves
		moves = 0;
	matchedcards = 0;
	moveCount.innerHTML = "Moves: " + 0;
	cards.forEach(element => element.classList.remove("flip"));
	resetBoard();
	//reset timer
	second = 0;
	minute = 0;
	hour = 0;
	var timer = document.querySelector(".timer");
	timer.innerHTML = "0 mins 0 secs";
	clearInterval(interval);
	//reset the star rating
	for (i = 0; i < 3; i++) {
		stars[i].style.visibility = "visible";
	}
	//shuff the cards on restart
	shuffle();
	cards.forEach(element => element.classList.remove("match"));
	cards.forEach(element => element.addEventListener("click", flipTheCard));
}
// Function to increment the move counts
function IncCount() {
	moves++;
	moveCount.innerHTML = "Move: " + moves;
	if (moves == 1) {
		// second = 0;
		// minute = 0; 
		// hour = 0;
		startTimer();
	}
	// star rating changes with moves count
	if (moves > 16 && moves < 24) {
		for (i = 0; i < 3; i++) {
			if (i > 1) {
				stars[i].style.visibility = "collapse";
				startRating = 2;
			};
		}
	} else if (moves > 25) {
		for (i = 0; i < 3; i++) {
			if (i > 0) {
				stars[i].style.visibility = "collapse";
				startRating = 1;
			}
		}
	} // console.log(moves);
}
// Game Time start with move 1
var second = 0,
	minute = 0,
	hour = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
	interval = setInterval(function() {
		timer.innerHTML = minute + " mins " + second + " secs";
		second++;
		if (second == 60) {
			minute++;
			second = 0;
		}
		if (minute == 60) {
			hour++;
			minute = 0;
		}
	}, 1000);
}

function congratulations() {
	if (matchedcards === 16) {
		setTimeout(function() {
			clearInterval(interval);
			swal({
				title: 'Congratulations',
				type: 'success',
				text: 'You have won the game . Moves conceded are ' + moves + '. You have got ' + startRating + ' Stars Time taken is ' + hour + ' Hours ' + minute + ' Minutes and ' + second + ' Seconds',
				allowOutsideClick: false,
				showCancelButton: true,
				confirmButtonText: 'Play Again',
				confirmButtonColor: '#0000FF',
				cancelButtonText: 'Close',
				cancelButtonColor: '#FF0000'
			}).then(function() {
				reset();
			}, function(dismiss) {});
		}, 2500)
	}
}

function animate() {
	firstCard.classList.add("match");
	secondCard.classList.add("match");
}
