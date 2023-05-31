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
const pairs = [];
const from = document.querySelector(".from");
const roundInput = document.querySelector(".round-input");
const player1Input = document.querySelector(".player1-input");
const player2Input = document.querySelector(".player2-input");
let firstPictureSelected = "";
let secondPictureSelected = "";
let rounds = 0;
let round = 1;
let player1 = "";
let player2 = "";
let score1 = 0;
let score2 = 0;

document.querySelector(".game").style.display = "none";
from.addEventListener("submit", handleOnSubmit);

function handleOnSubmit(event) {
	event.preventDefault();
	rounds = roundInput.value;
	player1 = player1Input.value;
	player2 = player2Input.value;
	document.querySelector(".game").style.display = "block";
	document.querySelector(".game-settings").style.display = "none";
	document.querySelector(".round").innerHTML = `Round: ${round}`;
	document.querySelector(".player1").innerHTML = player1;
	document.querySelector(".player2").innerHTML = player2;
	document.querySelector(".score1").innerHTML = score1;
	document.querySelector(".score2").innerHTML = score2;
}

function getImg() {
	arrSrc.forEach((i, index) => {
		let image = document.createElement("img");
		image.src = "./pictures/flipped.png";
		image.id = index;
		image.addEventListener("click", turnAround);
		img.push(image);
		pairs.push(false);
		document.querySelector(".img-container").append(image);
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
	console.log(arrSrc, img, pairs);
}

function check() {
	if (firstPictureSelected === secondPictureSelected) {
		match();
	} else {
		turnAllBack();
	}
	console.log(arrSrc, img, pairs);
}

function match() {
	img.map((i, index) => {
		if (firstPictureSelected === i.src) {
			pairs[index] === true;
		}
	});
	firstPictureSelected = "";
	secondPictureSelected = "";
	console.log(arrSrc, img, pairs);
}

function turnAllBack() {
	firstPictureSelected = "";
	secondPictureSelected = "";
	pairs.map((i, index) => {
		if (!i) {
			img[index].src = "./pictures/flipped.png";
		}
	});
	console.log(arrSrc, img, pairs);
}

getImg();
