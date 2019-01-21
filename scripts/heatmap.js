function showHeatMap () {

  var format = d3.format(",");

  // Set tooltips
  var tip = d3.tip()
              .attr("class", "d3-tip")
              .offset([-10, -50])
              .html(function(d) {
                return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Terrorist attacks: </strong><span class='details'>" + format(d.attacks) +"</span>";
              })

  var margin = {top: 0, right: 0, bottom: 0, left: 0},
              width = 1300 - margin.left - margin.right,
              height = 600 - margin.top - margin.bottom;

  var path = d3.geoPath();

  var svg = d3.select("#heatmap")
              .append("svg")
              .attr("viewBox", [0, 0, (width + margin.right + margin.left),
                        (height + margin.top + margin.bottom)].join(' '))
              .append("g")
              .attr("class", "map");

  var projection = d3.geoMercator()
                     .scale(140)
                    .translate( [width / 2, height / 1.4]);

  var path = d3.geoPath().projection(projection);

  svg.call(tip);


    input = "../data/country.json"
    input2 = "../data/world_countries.json"
    var requests = [d3.json(input), d3.json(input2), svg, path, tip];

    Promise.all(requests).then(function(response) {
        country = response[0]
        data = response[1]
        svg = response[2]
        path = response[3]
        tip = response[4]
        year = 2017
        counts = []
        counts2 = []
        events = Object.values(country)

        events.forEach(function(d) { if (d.iyear == year) { counts.push(d.count) }})
        var max = Math.max.apply(null, counts)
        max = Math.round(max/100)*100

        events.forEach(function(d) { counts2.push(d.count) })
        var min = 0;
        var max2 = Math.max.apply(null, counts2)
        max2 = Math.round(max2/1000)*1000

        var color = d3.scaleLinear()
                      .domain([1, max])
                      .range([d3.rgb("#fdd3a0"), d3.rgb("#800000")]);

    //     var color2 = d3.scaleThreshold()
    // .domain([0,5,10,25,50,100,250,500,1000,2500,5000])
    // .range(["#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#990000", "#7f0000"])


      drawMap(data, svg, path, color, tip, events, year)
      drawLegend(svg, color, max)

    }).catch(function(e){
        throw(e);
    });

}

function drawMap(data, svg, path, color, tip, events, year) {

  var attacksById = {};
  var countries = []
  var uniqueNames = []
  events.forEach(function(d) { if (d.iyear === year) { attacksById[d.iyear + d.country_txt] = +d.count
  countries.push(d.country_txt)}});
  $.each(countries, function(i, el){
    if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
});

  // attacks.forEach(function(d) { attacksById[d.id] = +d.attacks; });
  data.features.forEach(function(d) {
    if (uniqueNames.includes(d.properties.name)) {d.attacks = attacksById[year + d.properties.name]}
    else {d.attacks = 0} });

  svg.append("g")
      .attr("class", "countries")
    .selectAll("path")
      .data(data.features)
    .enter().append("path")
      .attr("d", path)
      .style("fill", function(d) { if (d.attacks === 0) { return "#fff3e5" } else { return color(d.attacks) }; })
      .style("stroke", "white")
      .style("stroke-width", 1.5)
      .style("opacity",0.8)
      // tooltips
        .style("stroke","white")
        .style("stroke-width", 0.3)
        .on("mouseover",function(d){
          tip.show(d);

          d3.select(this)
            .style("opacity", 1)
            .style("stroke","white")
            .style("stroke-width",3);
        })
        .on("mouseout", function(d){
          tip.hide(d);

          d3.select(this)
            .style("opacity", 0.8)
            .style("stroke","white")
            .style("stroke-width",0.3);
        });

      svg.append("path")
      .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
      .attr("class", "names")
      .attr("d", path);
}

function drawLegend(svg, color, max) {
  //Append a defs (for definition) element to your SVG
var defs = svg.append("defs");

//Append a linearGradient element to the defs and give it a unique id
var linearGradient = defs.append("linearGradient")
    .attr("id", "linear-gradient");

//Vertical gradient
linearGradient
    .attr("x1", "0%")
    .attr("y1", "100%")
    .attr("x2", "0%")
    .attr("y2", "0%");

    //Append multiple color stops by using D3's data/enter step
linearGradient.selectAll("stop")
    .data( color.range() )
    .enter().append("stop")
    .attr("offset", function(d,i) { return i/(color.range().length - 1); })
    .attr("stop-color", function(d) { return d; });

    width = 20;
    height = 550;

    //Draw the rectangle and fill with gradient
    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(120, 20)")
        .style("fill", "url(#linear-gradient)")
        .attr("opacity", 0.8);

        // yscale for axis
      var yScale = d3.scaleLinear()
              .range([0, height])
              .domain([max, 0]);
      // yaxis scaled
      var yAxis = d3.axisLeft()
              .scale(yScale)
              .ticks(9);

      // add axis
      svg.append("g")
        .attr("class", "yAxis")
        .attr("transform", "translate(120, 20)")
        .call(yAxis)
}
