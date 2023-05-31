const arrSrc = [
	"./pictures/tatum.webp",
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
const roundInput = document.querySelector(".round-input");
const player1Input = document.querySelector(".player1-input");
const player2Input = document.querySelector(".player2-input");
const winnerMessage = document.querySelector(".winner");
const player1El = document.querySelector(".player1");
const player2El = document.querySelector(".player2");
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

document.querySelector(".game").style.display = "none";
from.addEventListener("submit", handleOnSubmit);

function handleOnSubmit(event) {
	event.preventDefault();
	rounds = roundInput.value;
	player1 = player1Input.value;
	player2 = player2Input.value;
	document.querySelector(".game").style.display = "block";
	document.querySelector(".game-settings").style.display = "none";
	updateValues();
}

function updateValues() {
	document.querySelector(".round").innerHTML = `Round: ${round} of ${rounds}`;
	document.querySelector(".player1").innerHTML = player1;
	document.querySelector(".player2").innerHTML = player2;
	document.querySelector(".score1").innerHTML = `Score: ${score1}`;
	document.querySelector(".score2").innerHTML = `Score: ${score2}`;
	document.querySelector(".pairs1").innerHTML = `Pairs: ${pairs1}`;
	document.querySelector(".pairs2").innerHTML = `Pairs: ${pairs2}`;
	if (player1Turn) {
		player1El.style.textDecoration = "underline";
		player2El.style.textDecoration = "none";
	} else {
		player2El.style.textDecoration = "underline";
		player1El.style.textDecoration = "none";
	}
}

function getImg() {
	arrSrc.forEach((i, index) => {
		let div = document.createElement("div");
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
	event.target.src = arrSrc[event.target.id];
	if (firstPictureSelected === "") {
		firstPictureSelected = event.target.src;
	} else if (secondPictureSelected === "") {
		secondPictureSelected = event.target.src;
		setTimeout(check, 1000);
	}
}

function check() {
	if (firstPictureSelected === secondPictureSelected) {
		match();
		if (player1Turn) {
			pairs1++;
		} else {
			pairs2++;
		}
	} else {
		turnAllBack();
		player1Turn = !player1Turn;
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
				updateValues();
				console.log(pairs);
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
}

getImg();
