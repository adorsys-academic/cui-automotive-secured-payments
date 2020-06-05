inlets = 1;
outlets = 3;

var firstIconNames;
var secondIconNames;
var firstNumbers;
var secondNumbers;
var iconWidth = 346;

globalScreenInfo = new Global("GSI");

function calcHeight() {}

function setBubbleTitle(name) {
  bubbleTitle = name;
}

function setBubbleHint(name) {}

function setOptions(payload) {
  firstIconNames = payload.firstIconNames;
  firstNumbers = payload.firstNumbers;
  secondIconNames = payload.secondIconNames;
  secondNumbers = payload.secondNumbers;
}

function setFollowUp() {}

function setFile(index) {}

function bang() {
  createBubble();
}

function createBubble() {
  /*rect = globalScreenInfo.dimensions
	width = rect[2] - rect[0]
	height = rect[3] - rect[1]
	

	hcenter = (width * 0.5) + rect[0]*/
	height = 790
	

  xOffset = 0;
  yOffset = height/2 - iconWidth
  iterateCaller = this.patcher.getnamed("iterateCall");
  metro = this.patcher.getnamed("metro");
  for (i = 0; i < 4; i++) {
    for (j = 0; j < 2; j++) {
      index = 4 * j + i;
      argumentList = new Array();
      argumentList.push(index);
      argumentList.push(firstIconNames[index]);
      if (secondIconNames != undefined) {
        argumentList.push(secondIconNames[index]);
      }
      argumentList.push(firstNumbers[index]);
      if (secondNumbers != undefined) {
        argumentList.push(secondNumbers[index]);
      }
      iconView = this.patcher.newdefault(xOffset, yOffset,
        "jsui",
        "@patching_rect", xOffset + i * 346, yOffset + j * 346, iconWidth, iconWidth,
        "@presentation_rect", xOffset + i * 346, yOffset + j * 346, iconWidth, iconWidth,
        "@varname",
        "icon" + index,
        "@presentation","1",
		"@border","0",
        "@filename","cui.voicefirst.ui.automotive.passcode.icon.js",
        "@jsarguments",argumentList
      );
      this.patcher.connect(iterateCaller, 0, iconView, 0);
      iconView.bang();
    }
  }
  metro.bang();
}
