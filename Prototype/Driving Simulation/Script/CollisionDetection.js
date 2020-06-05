inlets = 2;
outlets = 1;

//driver Dimensions width = 0.35, height = 0.1
//car dimensions width = 0.35, height = 0.5

halfWidth = 0.35;
halfHeight = 0.5;

halfDriverHeight = 0.1;

car = {
  centerX: 0.0,
  centerY: 0.0
};
driver = {
  centerX: 0.0,
  centerY: 0.0
};

function positionData() {
  val = arrayfromargs(arguments);
  switch (inlet) {
    case 0:
      car.centerX = val[0];
      car.centerY = val[1];
      detectCollision();
      break;
    case 1:
      driver.centerX = val[0];
      driver.centerY = val[1];
      break;
    default:
  }
}

function detectCollision() {
  driverTopY = driver.centerY + halfDriverHeight;
  driverBottomY = driver.centerY - halfDriverHeight;
  carBottomY = car.centerY - halfHeight;
  carTopY = car.centerY + halfHeight;

  if (carBottomY <= driverTopY && driverBottomY <= carTopY) {
    carLeftX = car.centerX - halfWidth;
    carRightX = car.centerX + halfWidth;
    driverLeftX = driver.centerX - halfWidth;
    driverRightX = driver.centerX + halfWidth;
    if (!(carLeftX > driverRightX || carRightX < driverLeftX)) {
      outlet(0, 1);
		//post ("collision\n")
      return;
    }
  }
  outlet(0, 0);
}
