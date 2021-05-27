const button = document.querySelector('button');

function randomizeColor() {
	const redSaturation = Math.floor(Math.random() * 255);
	const greenSaturation = Math.floor(Math.random() * 255);
	const blueSaturation = Math.floor(Math.random() * 255);
	const randomRgbaColor = `rgba(${redSaturation}, ${greenSaturation}, ${blueSaturation}, 1)`;
	return randomRgbaColor;
}

function changeBackgroundColor() {
	document.body.style.backgroundColor = randomizeColor();
}

button.addEventListener('click', changeBackgroundColor);
