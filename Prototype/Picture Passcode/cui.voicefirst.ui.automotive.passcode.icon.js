mgraphics.init();
mgraphics.relative_coords = 1;
mgraphics.autofill = 0;

inlets = 2;
outlets = 2;

var currentIcon = "cui.voicefirst.automotive.passcode.barcelona.svg";
var svgAspectRatio = 1.0 / 128;
var scaleFactor = 1.0;
var primaryIconIdentifier = "ar";
var secondaryIconIdentifier = "ar";
var index = 0;
var offsetX = -1.0;
var offsetY = 0.175;
var firstNumber = 0;
var secondNumber = 22;
var iterateIndex = 0;
var fontSize = 72.0;
var moduloNumber = 4;
//the viewbox of svg 595.3 841.9

function loadbang() {
  setup();
}

function setup() {
  hasTwoIcons = false;
  if (jsarguments.length >= 2) {
    index = jsarguments[1];
  }
  if (jsarguments.length >= 3) {
    primaryIconIdentifier = jsarguments[2];
  }
  if (jsarguments.length >= 4) {
    value = jsarguments[3];
    if (typeof value === "string") {
      secondaryIconIdentifier = value;
      hasTwoIcons = true;
    } else {
      firstNumber = value;
      moduloNumber = 2;
    }
  }
  if (jsarguments.length >= 5) {
    if (hasTwoIcons == true) {
      firstNumber = jsarguments[4];
    } else {
      secondNumber = jsarguments[4];
      moduloNumber = 3;
    }
  }

  if (jsarguments.length >= 6) {
    secondNumber = jsarguments[5];
  }
  setIcon(primaryIconIdentifier);
}

function setIcon(name) {
  currentIcon = "cui.voicefirst.automotive.passcode." + name + ".svg";
  mgraphics.redraw();
}

function bang() {
  setup();
  mgraphics.redraw();
}

function iterate(i) {
  iterateIndex = i % moduloNumber;
  if (moduloNumber == 4) {
    if (iterateIndex > 1) {
      setIcon(secondaryIconIdentifier);
    } else {
      setIcon(primaryIconIdentifier);
    }
  }
  mgraphics.redraw();
}

// drawing the button according to the states
function paint() {
  //var aspect = calcAspect();

  with(mgraphics) {
    width = this.box.rect[2] - this.box.rect[0];
    height = this.box.rect[3] - this.box.rect[1];
    scaleFactor = svgAspectRatio * width;
    // draw the center
    save();
    translate(offsetX, offsetY);
    scale(scaleFactor, scaleFactor);
    mgraphics.svg_render(currentIcon);
    post();
    restore();

    // get the initial offset and rotation
    //translate(aspect, 1.0);

    // return to normal
    identity_matrix();
    if (iterateIndex == 0 || (moduloNumber == 4 && iterateIndex == 2)) {
      return;
    }
    //set Layer
    set_source_rgba(0.047, 0.247, 0.365, 0.8);
    rectangle(-1, 1.0, 2.0, 2.0);
    fill();

    //set Numbers
    fontSize = width / 2;
    set_font_size(fontSize);
    select_font_face("Lato", "normal", "bold");
    numberText = "";
    if (iterateIndex == 1) {
      set_source_rgba(0.929, 0.824, 0.235, 1);
      numberText += firstNumber;
    } else if (
      (iterateIndex == 3 && moduloNumber == 4) ||
      (iterateIndex == 2 && moduloNumber == 3)
    ) {
      set_source_rgba(1.0, 1.0, 1.0, 1);
      numberText += secondNumber;
    }

    textInfo = text_measure(numberText);
    propotionalTextWidth = textInfo[0] / width;
    propotionalTextHeight = textInfo[1] / width;
    xOffset = -propotionalTextWidth;
    yOffset = -propotionalTextHeight + (propotionalTextHeight / 3);
    move_to(xOffset, yOffset);
    post("x:" + xOffset);
    post("y:" + yOffset);
    show_text(numberText);
  }
}

/*function calcAspect() {
  var width = this.box.rect[2] - this.box.rect[0];
  var height = this.box.rect[3] - this.box.rect[1];
  return width / height;
}*/