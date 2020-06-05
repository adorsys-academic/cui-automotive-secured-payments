inlets = 1;
outlets = 2;

var lanesDict = new Dict("CarLanes")
var claimedLane = -1
var entityId = -1

function loadbang() {
    if (jsarguments.length >= 2) {
        if (jsarguments[1] < 1) {
            post('WARNING :: LANE_CHOOSER :: the entity ID has to be > 0!\nInstance is not set up correctly!', jsarguments[1], '\n')
            return
        }
        setId(jsarguments[1])
    }
}

// should be called by the loadbang .... 
function setId(i) {
    // if it is in initial state (-1) and the value to be assigned is >0
    if (entityId < 0 && i > 0) {
        entityId = i
    }
}

function claimLane(i) {
    if (i < 0 || i > 2) {
        post('WARNING :: LANE_CHOOSER :: this lane is not supported', i, '\n')
        return
    }
    if (entityId < 1) {
        post('WARNING :: LANE_CHOOSER :: instance is not set up correctly', entityId, '\n')
        return
    }
    freeLane()
    if (isLaneAvailable(i)) {
        lanesDict.set("Lane"+i, entityId)
        claimedLane = i
        outlet(0, 'bang')
    } else {
        outlet(1, 'bang')
    }
}

function freeLane() {
    if (claimedLane >= 0 && isCorrespondingLane(claimedLane)) {
        lanesDict.set("Lane"+claimedLane, 0)
        claimedLane = -1
    }
}

function postDebug() {
    post('\n')
    post('**********************', '\n')
    post('entity-ID :: ', entityId, '\n')
    post('claimedLane :: ', claimedLane, '\n')
    if (claimedLane >= 0) {
        post('lane is claimed :: ', claimedLane, lanesDict.get("Lane"+claimedLane) === entityId ? 'yes' : 'no', '\n')
    }
    post('**********************', '\n')
    post('\n')
}

// private calls
function isLaneAvailable(i) {
    return lanesDict.get("Lane"+i) === 0
}

function isCorrespondingLane(i) {
    return lanesDict.get("Lane"+i) === entityId
}