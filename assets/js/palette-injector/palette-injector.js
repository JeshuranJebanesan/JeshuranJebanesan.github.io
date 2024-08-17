document.getElementById("colorForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const colorScheme = document.querySelector('input[name="colorScheme"]:checked');
    const colorCount = document.getElementById("colorCount");
    /*const paletteColor = document.getElementById("paletteColor");
    const paletteHex = document.getElementById("paletteHex");
    paletteColor.style.backgroundColor = "";
    paletteHex.innerText = "";*/
    const result = generatePalette(colorScheme.value, colorCount.value);
    //handleResult(result);
});

function generatePalette(COLOR_SCHEME, COLOR_COUNT) {
    let palette = [];

    let fixed = Math.random();

    let hueBase = 2 * Math.PI * Math.random();
    let hueStep = Lerp(0.33, 1, Math.random());

    let chromaBase = Lerp(0.01, 0.1, Math.random());
    let chromaStep = Lerp(0.075, 0.125 - chromaBase, Math.random());
    let chromaFixed = Lerp(0.01, 0.125, fixed);

    let lightnessBase = Lerp(0.3, 0.6, Math.random());
    let lightnessStep = Lerp(0.3, 1 - lightnessBase, Math.random);
    let lightnessFixed = Lerp(0.6, 0.9, fixed);

    let chromaConstant = true;
    if(COLOR_SCHEME == "monochromatic") chromaConstant = false;
    let lightnessConstant = !chromaConstant;

    for(let i = 0; i < COLOR_COUNT; i++) {
        let pos = i / (COLOR_COUNT - 1);
        let hueOffset = pos * hueStep * 2 * Math.PI + (Math.PI/4);

        if (COLOR_SCHEME == "monochromatic") hueOffset *= 0.0;
        if (COLOR_SCHEME == "analagous") hueOffset *= 0.25;
        if (COLOR_SCHEME == "complementary") hueOffset *= 0.33;
        if (COLOR_SCHEME != "monochromatic") hueOffset += (Math.random() * 2 - 1) * 0.01;

        let chroma = chromaBase + pos * chromaStep;
        let lightness = lightnessBase + pos * lightnessStep;
    
        if (chromaConstant) chroma = chromaFixed;
        if (lightnessConstant) lightness = lightnessFixed;

        let lab = oklch_to_oklab(lightness, chroma, hueBase + hueOffset);
        let rgb = oklab_to_linear_srgb(lab[0], lab[1], lab[2]);

        rgb[0] = Math.round(Math.max(0.0, Math.min(rgb[0], 1.0)) * 255);
        rgb[1] = Math.round(Math.max(0.0, Math.min(rgb[1], 1.0)) * 255);
        rgb[2] = Math.round(Math.max(0.0, Math.min(rgb[2], 1.0)) * 255);

        palette.push(rgb);
    }

    console.log(palette);
    return palette;
}

function Lerp(min, max, t) {
    return min + (max - min) * t;
  }

function oklch_to_oklab(L, c, h) {
    return [(L), (c * Math.cos(h)), (c * Math.sin(h))];
}

function oklab_to_linear_srgb(L, a, b) {
    let l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    let m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    let s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  
    let l = l_ * l_ * l_;
    let m = m_ * m_ * m_;
    let s = s_ * s_ * s_;
  
    return [
      (+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
      (-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
      (-0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s),
    ];
}