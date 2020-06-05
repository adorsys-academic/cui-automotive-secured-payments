inlets = 1
outlets = 3

var flashTimestamp
var lastFlashDirection
var lastDrivingDirection
var directionTimeStamp

const flashDirection = {
    left: 1,
    right: 2,
    unknown: 3
  }

const drivingDirection = {
    left: 1,
    right: 2,
    unknown: 3
  }

function loadbang() {
    
}

function registerFlashing(s) {
    flashTimestamp = new Date()
    if (s === 'left') {
        lastFlashDirection = flashDirection.left
    } else {
        lastFlashDirection = flashDirection.right
    }
    
}

function registerDirection(s) {
    directionTimeStamp = new Date()
    if (s === 'driveRight') {
        lastDrivingDirection = drivingDirection.right
    } else {
        lastDrivingDirection = drivingDirection.left
    }
}

function crossingLane() {
    if ((new Date().getTime() - flashTimestamp.getTime()) < 5000) {
        // all great
        if (lastDrivingDirection == lastFlashDirection) {
            outlet(0, 'bang')
        } else {
            outlet(2, 'bang')
        }
    } else {
        outlet(1, 'bang')
    }
}




function postDebug() {
    post('\n')
    post('**********************', '\n')
    
    post('**********************', '\n')
    post('\n')
}
