inlets = 1;

playload = {
	iconNames: ['barcelona', 'berlin', 'NYC', 'sydney', 'rio', 'sanFrancisco', 'rom', 'london'],
	firstNumbers: [12, 3, 41, 2, 4, 21, 31, 1],
	secondNumbers: [3, 12, 4, 31, 21, 3, 2, 13]
}

function bang() {

	buttonGeneratorScript = this.patcher.getnamed("JsScript")
	buttonGeneratorScript.message("setBubbleTitle", "passcode")
	buttonGeneratorScript.message("setOptions", playload)
}