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

let firstPictureSelected = "";
let secondPictureSelected = "";

function getImg() {
	arrSrc.forEach((i, index) => {
		let image = document.createElement("img");
		image.src = "./pictures/flipped.png";
		image.id = index;
		image.addEventListener("click", turnAround);
		img.push(image);
		pairs.push(false);
		document.getElementById("img-container").append(image);
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
