const colorDivs = document.querySelectorAll(".color");
const generateButton = document.querySelector(".generate");
const slider = document.querySelectorAll("input[type='range']");
const currentHexes = document.querySelectorAll(".color h2");
let initialColors;

function generateHex() {
  const hexColor = chroma.random();
  return hexColor;
}
function randomColors() {
  colorDivs.forEach((div, index) => {
    const hexText = div.children[0];
    const randomColor = generateHex();
    const color = chroma(randomColor);
    const sliders = div.querySelectorAll(".sliders input");
    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];
    div.style.backgroundColor = randomColor;
    hexText.innerText = randomColor;
    checkTextContrast(randomColor, hexText);
    colorizeSliders(color, hue, brightness, saturation);
  });
}

function checkTextContrast(color, text) {
  const luminance = chroma(color).luminance();
  luminance > 0.5 ? (text.style.color = "black") : (text.style.color = "white");
}

function colorizeSliders(color, hue, brightness, saturation) {
  const noSaturation = color.set("hsl.s", 0);
  const fullSaturation = color.set("hsl.s", 1);
  const scaleSaturation = chroma.scale([noSaturation, color, fullSaturation]);
  const midBrightness = color.set("hsl.l", 0.5);
  const scaleBrightness = chroma.scale(["black", midBrightness, "white"]);
  saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSaturation(
    0
  )}, ${scaleSaturation(1)})`;
  brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBrightness(
    0
  )},${scaleBrightness(0.5)}, ${scaleBrightness(1)})`;
  hue.style.backgroundImage = `linear-gradient(to right, rgb(204, 75, 75), rgb(204, 204, 75), rgb(75, 204, 75), rgb(75, 204, 204), rgb(75, 75, 204), rgb(204, 75, 204), rgb(204, 75, 75))`;
}

randomColors();
