const arrSrc = [	"./pictures/tatum.webp",
	"./pictures/butler.webp",
	"./pictures/curry.webp",
	"./pictures/durant.webp",
	"./pictures/embiid.webp",
	"./pictures/jokic.webp",
	"./pictures/lebron.webp",
	"./pictures/rose.webp",
	"./pictures/tatum.webp",
	"./pictures/butler.webp",
	"./pictures/curry.webp",
	"./pictures/durant.webp",
	"./pictures/embiid.webp",
	"./pictures/jokic.webp",
	"./pictures/lebron.webp",
	"./pictures/rose.webp",
].sort(() => Math.random() - 0.5);
const img = [];
let pairs = [];
const from = document.querySelector(".from");
let roundInput = null;
let player1Input = null;
let player2Input = null;
const winnerMessage = document.querySelector(".winner");
const player1El = document.querySelector(".player1");
const player2El = document.querySelector(".player2");
const score1EL = document.querySelector(".score1");
const score2EL = document.querySelector(".score2");
const pairs1EL = document.querySelector(".pairs1");
const pairs2EL = document.querySelector(".pairs2");
const modeVSC = document.querySelector(".vsC");
const modeVSP = document.querySelector(".vsP");
let firstPictureSelected = "";
let secondPictureSelected = "";
let player1Turn = Math.floor(Math.random() * 2) === 1 ? true : false;
let rounds = 0;
let round = 1;
let player1 = "";
let player2 = "";
let score1 = 0;
let score2 = 0;
let pairs1 = 0;
let pairs2 = 0;
let gameMode = "";

document.querySelector(".game").style.display = "none";
from.addEventListener("submit", handleOnSubmit);

modeVSC.addEventListener("click", () => {
	gameMode = "vsC";
	from.innerHTML += `
		<div class="settings-container">
			<label class="round-label">
				How many rounds do you want to play?
				<input type="number" class="round-input" required>
			</label>
			<label class="player-label player1-label">
				What is your name?
				<input type="text" class="player-input player1-input" required>
			</label>
			<button type="submit" class="submit-settings">Start Game</button>
		</div>`;
});

modeVSP.addEventListener("click", () => {
	gameMode = "vsP";
	from.innerHTML += `
		<div class="settings-container">
			<label class="round-label">
				How many rounds do you want to play?
				<input type="number" class="round-input" required>
			</label>
			<label class="player-label player1-label">
				What is the name of the first player?
				<input type="text" class="player-input player1-input" required>
			</label>
			<label class="player-label player2-label">
				What is the name of the second player?
				<input type="text" class="player-input player2-input" required>
			</label>
			<button type="submit" class="submit-settings">Start Game</button>
		</div>`;
});

function handleOnSubmit(event) {
	roundInput = document.querySelector(".round-input");
	event.preventDefault();
	rounds = roundInput.value;
	if (gameMode === "vsP") {
		player2Input = document.querySelector(".player2-input");
		player1Input = document.querySelector(".player1-input");
		player1 = player1Input.value;
		player2 = player2Input.value;
	} else {
		player1Input = document.querySelector(".player1-input");
		player1 = player1Input.value;
	}
	document.querySelector(".game").style.display = "block";
	document.querySelector(".game-settings").style.display = "none";
	updateValues();
}

function updateValues() {
	document.querySelector(".round").innerHTML = `Round: ${round} of ${rounds}`;
	if (gameMode === "vsP") {
		player1El.innerHTML = player1;
		player2El.innerHTML = player2;
	} else {
		player1El.innerHTML = player1;
		player2El.innerHTML = "Computer";
	}
	score1EL.innerHTML = `Score: ${score1}`;
	score2EL.innerHTML = `Score: ${score2}`;
	pairs1EL.innerHTML = `Pairs: ${pairs1}`;
	pairs2EL.innerHTML = `Pairs: ${pairs2}`;
	if (player1Turn) {
		player1El.style.textDecoration = "underline";
		player2El.style.textDecoration = "none";
	} else {
		player2El.style.textDecoration = "underline";
		player1El.style.textDecoration = "none";
	}
}

function checkForShadow() {
	pairs.forEach((i, index) => {
		if (i) {
			if (
				player1Turn &&
				!document.querySelector(`.card${index}`).classList.contains("player2-shadow") &&
				!document.querySelector(`.card${index}`).classList.contains("player1-shadow")
			) {
				document.querySelector(`.card${index}`).classList.add("player1-shadow");
			} else if (
				!player1Turn &&
				!document.querySelector(`.card${index}`).classList.contains("player2-shadow") &&
				!document.querySelector(`.card${index}`).classList.contains("player1-shadow")
			) {
				document.querySelector(`.card${index}`).classList.add("player2-shadow");
			}
		}
	});
}

function getImg() {
	arrSrc.forEach((i, index) => {
		let div = document.createElement("div");
		div.classList.add(`card${index}`);
		div.classList.add("card");
		div.innerHTML = `
			<img id=${index} src="./pictures/flipped.png" alt="" />
		`;
		let image = div.childNodes[1];
		image.addEventListener("click", turnAround);
		img.push(image);
		pairs.push(false);
		document.querySelector(".img-container").append(div);
	});
}

function turnAround(event) {
	if (gameMode === "vsP" || (gameMode === "vsC" && player1Turn)) {
		event.target.src = arrSrc[event.target.id];
		if (firstPictureSelected === "") {
			firstPictureSelected = event.target.src;
		} else if (secondPictureSelected === "") {
			secondPictureSelected = event.target.src;
			setTimeout(check, 1000);
		}
	} else {
		check();
	}
}

function check() {
	if (gameMode === "vsP" || (gameMode === "vsC" && player1Turn)) {
		console.log("A");
		if (firstPictureSelected === secondPictureSelected) {
			match();
			if (player1Turn) {
				pairs1++;
			} else {
				pairs2++;
			}
			checkForShadow();
		} else {
			turnAllBack();
			player1Turn = !player1Turn;
		}
	} else {
		console.log(firstPictureSelected);
		let num = 0;
		pairs.forEach((i, index) => {
			if (num != 2) {
				if (!i && firstPictureSelected === "") {
					firstPictureSelected = arrSrc[index];
					img[index].src = firstPictureSelected;
					i = true;
					console.log(i);
				} else if (!i && secondPictureSelected === "") {
					if (arrSrc[index] === firstPictureSelected) {
						secondPictureSelected = arrSrc[index];
						img[index].src = secondPictureSelected;
						i = true;
						match();
						console.log(secondPictureSelected);
					}
				}
				num++;
			}
		});
	}

	if (pairs.every((i) => i === true)) {
		if (pairs1 > pairs2) {
			score1++;
		} else if (pairs1 < pairs2) {
			score2++;
		} else {
			score1 += 0.5;
			score2 += 0.5;
		}
		setTimeout(() => {
			if (round != rounds) {
				pairs = pairs.map((i, index) => {
					img[index].src = "./pictures/flipped.png";
					return false;
				});
				player1Turn = true;
				pairs1 = 0;
				pairs2 = 0;
				round++;
				pairs.forEach((i, index) => {
					if (document.querySelector(`.card${index}`).classList.contains("player2-shadow")) {
						document.querySelector(`.card${index}`).classList.remove("player2-shadow");
					} else {
						document.querySelector(`.card${index}`).classList.remove("player1-shadow");
					}
				});
				updateValues();
			} else {
				if (score1 > score2) {
					winnerMessage.innerHTML = `The winner is ${player1}!`;
				} else if (score1 < score2) {
					winnerMessage.innerHTML = `The winner is ${player2}!`;
				} else {
					winnerMessage.innerHTML = `It's a draw!`;
				}
			}
		}, 500);
	}
	updateValues();
}

function match() {
	img.map((i, index) => {
		if (firstPictureSelected === i.src) {
			pairs[index] = true;
		}
	});
	if (gameMode === "vsC") {
		player1Turn = !player1Turn;
	}
	firstPictureSelected = "";
	secondPictureSelected = "";
}

function turnAllBack() {
	firstPictureSelected = "";
	secondPictureSelected = "";
	pairs.map((i, index) => {
		if (!i) {
			img[index].src = "./pictures/flipped.png";
		}
	});
	if (gameMode === "vsC" && !player1Turn) {
		turnAround();
	}
}

getImg();
