var elements = currentMap.nodes.models;

var circles = currentMap.nodes.models.map(model => {
  var obj = {};
  obj.id = model.entity.attributes._id;
  obj.label = model.entity.attrs.attributes.label;
  obj.x = model.position.x;
  obj.y = model.position.y;
  obj.radius = model.style.radius;
  return obj;
});

function detectCollision(thisCircle, thatCircle) {
  return Math.hypot(thatCircle.x - thisCircle.x, thatCircle.y - thisCircle.y) < (thisCircle.radius + thatCircle.radius);
}

circles = circles.map((c, i, a) => {
  var otherCircles;
  if (i === 0) {
    otherCircles = a.slice(1);
  } else if(i === a.length) {
    otherCircles = a.slice(0, a.length);
  } else {
    otherCircles = a.slice(0, i).concat(a.slice(i + 1));
  }

  var collisions = otherCircles.reduce((a, b) => {
    if(detectCollision(c, b)) {
      a++;
    }


    return a;
  }, 0)

  c.collisions = collisions;
  return c;
});

function calculateCollisionPercentage(circles) {
  var total = circles.length;
  var colliders = circles.filter(circle => circle.collisions > 0).length;
  return Math.round(
    (colliders * 10000) / total
  ) / 100;
}

function summarize(circles) {
  var obj = {};
  obj['Total elements'] = circles.length;
  obj['Percent of elements colliding'] = calculateCollisionPercentage(circles);
  return obj;
}

summarize(circles);
