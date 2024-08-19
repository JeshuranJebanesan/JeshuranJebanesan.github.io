const getHexFromRGB = (rgb) => `#${Number(rgb[0]).toString(16).padStart(2, "0")}${Number(rgb[1]).toString(16).padStart(2, "0")}${Number(rgb[2]).toString(16).padStart(2, "0")}`;

const getFakeResult = () => {
    const palettesCount = 4;
    const colorsCounts = 16;
    const palettes = [];
    for (let i = 0; i < palettesCount; i++) {
        const colors = [];
        for (let j = 0; j < colorsCounts; j++) {
            colors.push({
                rgb: [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)]
            });
        }
        palettes.push({
            colors
        });
    }
    return palettes;
}

const handleResult = (palettes) => {
    const palettesElement = document.getElementById("palettes");
    palettesElement.innerHTML = "";
    palettes.forEach((palette, paletteIndex) => {
        const paletteElement = document.createElement("div");
        palettesElement.appendChild(paletteElement);
        const paletteLabelElement = document.createElement("span");
        paletteLabelElement.innerText = `Palette ${paletteIndex + 1}:`
        paletteLabelElement.style.lineHeight = "1";
        paletteLabelElement.style.display = "block";
        paletteLabelElement.style.marginBottom = ".125em";
        paletteElement.appendChild(paletteLabelElement);
        const paletteColorsElement = document.createElement("div");
        paletteColorsElement.style.display = "flex";
        paletteColorsElement.style.flexWrap = "wrap";
        paletteColorsElement.style.marginBottom = ".25em";
        paletteElement.appendChild(paletteColorsElement);
        for (const color of palette) {
            const hex = getHexFromRGB(color);
            const paletteColorElement = document.createElement("div");
            paletteColorElement.addEventListener("click", () => {
                const detailsColor = document.getElementById("details-color");
                const detailsHex = document.getElementById("details-hex");
                const detailsRGB = document.getElementById("details-rgb");
                detailsColor.style.backgroundColor = hex;
                detailsHex.innerText = `Hex: ${hex}`;
                detailsRGB.innerText = `RGB: (${color[0]}, ${color[1]}, ${color[2]})`;
            });
            paletteColorElement.style.backgroundColor = hex;
            paletteColorElement.style.width = "2em";
            paletteColorElement.style.height = "2em";
            paletteColorsElement.appendChild(paletteColorElement);
        }
    });
}
