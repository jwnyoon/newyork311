var width = $(window).width(),
    height = $(window).height(),
    padding = 2, // separation between nodes
    maxRadius = 9;

var text_neighborhoods = ["Astoria", "Bronx", "Brooklyn",
          "Corona", "Far Rockaway", "Flushing", "Jamaica", "New York",
          "Ridgewood", "Staten Island"];


var tooltip = d3.select("body")
  .append("div")
  .attr("id", "tooltip");

var svg = d3.select("#viz").append("svg")
    .attr("width", width)
    .attr("height", height);


// Load Data
queue()
    .defer(d3.csv, 'complain10.csv')
    .await(makeViz);

var x = d3.scale.linear()
  .domain([0,4])
  .range([100, width -120]);


var y = d3.scale.linear()
  .domain([0,1])
  .range([height*0.30, height*0.70]);



function makeViz(error, complain10) {

  makeGuide_Complain();


  num = complain10.length;

  nodes = d3.range(num).map(function(j) {

    var x_value = x( getX( complain10[j].City ) );
    var c = getColor( complain10[j].City );
    var v = Math.sqrt(complain10[j].Num)*0.5;
    var y_value = y( getY( complain10[j].City));

    return {
      Neighborhood: complain10[j].City,
      type: complain10[j].Complaint_Type,
      value: complain10[j].Num,
      radius: v,
      color: c,
      cx: x_value,
      cy: y_value
    };
  });

  force = d3.layout.force()
      .nodes(nodes)
      .size([width, height])
      .gravity(0)
      .charge(0)
      .on("tick", tick)
      .start();

  circle = svg.selectAll("circle")
      .data(nodes)
    .enter().append("circle")
      .attr("r", function(d) { return d.radius; })
      .style("fill", function(d) { return d.color; })
      .on("mouseover", function(d) {
        // console.log(d);
        tooltip.text(d.type +": "+d.value);
        tooltip.style("visibility", "visible");
      })
      .on("mousemove", function() {

        tooltip.style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 12) + "px");
      })
      .on("mouseout", function() {

        tooltip.style("visibility", "hidden");
      })
      .call(force.drag);

}

function tick(e) {
  circle
      .each(gravity(.08 * e.alpha)) //0.2
      .each(collide(.15))//0.5
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}

// Move nodes toward cluster focus.
function gravity(alpha) {
  return function(d) {
    d.y += (d.cy - d.y) * alpha;
    d.x += (d.cx - d.x) * alpha;
  };
}

// Resolve collisions between nodes.
function collide(alpha) {

  var quadtree = d3.geom.quadtree(nodes);
  return function(d) {
    var r = d.radius + maxRadius + padding,
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + quad.point.radius + (d.color !== quad.point.color) * padding;
        if (l < r) {
          l = (l - r) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
}

// 
function getX(Neighborhood) {

  if(Neighborhood == 'Astoria') { return 0; }
  else if(Neighborhood == 'Bronx') { return 1; }
  else if(Neighborhood == 'Brooklyn') { return 2; }
  else if(Neighborhood == 'Corona') { return 3; }
  else if(Neighborhood == 'Far Rockaway') { return 4; }
  else if(Neighborhood == 'Flushing') { return 0; }
  else if(Neighborhood == 'Jamaica') { return 1; }
  else if(Neighborhood == 'New York') { return 2; }
  else if(Neighborhood == 'Ridgewood') { return 3; }
    else if(Neighborhood == 'Staten Island') { return 4; }
}





function getY(Neighborhood) {

  if(Neighborhood == 'Astoria') { return 0; }
  else if(Neighborhood == 'Bronx') { return 0; }
  else if(Neighborhood == 'Brooklyn') { return 0; }
  else if(Neighborhood == 'Corona') { return 0; }
  else if(Neighborhood == 'Far Rockaway') { return 0; }


  else if(Neighborhood == 'Flushing') { return 1; }
  else if(Neighborhood == 'Jamaica'){ return 1; }
  else if(Neighborhood == 'New York'){ return 1; }
  else if(Neighborhood == 'Ridgewood'){ return 1; }
 else if(Neighborhood == 'Staten Island'){ return 1; }

}


function getColor(Neighborhood) {



   if(Neighborhood == 'Astoria') { return '#468966'; }
  else if(Neighborhood == 'Bronx') { return '#FFF0A5'; }
  else if(Neighborhood == 'Brooklyn') { return '#FFB03B'; }
  else if(Neighborhood == 'Corona') { return '#B64926'; }
  else if(Neighborhood == 'Far Rockaway') { return '#8E2800'; }
  else if(Neighborhood == 'Flushing') { return '#fcfff5'; }
  else if(Neighborhood == 'Jamaica') { return '#d1dbbd'; }
  else if(Neighborhood == 'New York') { return '#91aa9d'; }
  else if(Neighborhood == 'Ridgewood') { return '#3e606f'; }
    else if(Neighborhood == 'Staten Island') { return '#193441'; }
}

function makeGuide_Complain() {

  guide_complain = svg.selectAll("text")
      .data(text_neighborhoods)
    .enter().append("text")
      .attr("class", "guide_complain")
      .text(function(d) { return d; })
      .attr("text-anchor", "middle")
      .attr("x", function(d) { return  x( getX(d) ); })
      .attr("y", function(d) { return y(getY(d))+120; });


}
