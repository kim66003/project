  var format = d3.format(",");

  // Set tooltips
  var tip = d3.tip()
              .attr("class", "d3-tip")
              .offset([60, 120])
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
              // .attr("width", width)
              // .attr("height", height)
              .append("g")
              .attr("class", "map");

  var projection = d3.geoMercator()
                     .scale(140)
                    .translate( [width / 2, height / 1.4]);

  var path = d3.geoPath().projection(projection);

  svg.call(tip);

    function showHeatMap (data, dataMap, donutData, lineData, country, year) {

      multiData = getData2(data, year)
      events = multiData[0]
      max = multiData[1]
      color = multiData[2]
      country = drawMap(dataMap, events, color, donutData, lineData, country, year)
      drawSlider(data, dataMap, donutData, lineData, country)
      drawLegend(color, max)

}

function getData2(data, year) {
  counts = []
  events = Object.values(data)

  // events.forEach(function(d) { if (d.iyear == year) { counts.push(d.count) }})
  // var max = Math.max.apply(null, counts)
  // max = Math.round(max/100)*100

  events.forEach(function(d) { counts.push(d.count) })
  var min = 0;
  var max = Math.max.apply(null, counts)
  max = Math.round(max/1000)*1000
  max = 5000

  // var color = d3.scaleLinear()
  //               .domain([min, max])
  //               .range([d3.rgb("#fdd3a0"), d3.rgb("#800000")]);

  var color = d3.scaleThreshold()
                .domain([0,1,10,25,50,100,250,500,1000,2500,5000])
                .range(["#eeeeee", "#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#990000", "#7f0000"])


  return [events, max, color]

}

function drawMap(data, events, color, donutData, lineData, country, year) {
  d3.selectAll(".countries").remove()
  // d3.select("svg").remove()

  var attacksById = {};
  var countries = []
  var countries2 = []
  var uniqueNames = []
  var uniqueNames2 = []
  events.forEach(function(d) { if (d.iyear == year) { attacksById[d.iyear + d.country_txt] = +d.count
  countries.push(d.country_txt)}});
  $.each(countries, function(i, el){
    if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
});
  events.forEach(function(d) { countries2.push(d.country_txt) });
  $.each(countries2, function(i, el){
    if($.inArray(el, uniqueNames2) === -1) uniqueNames2.push(el);
  });
  // console.log(uniqueNames2)

  data.features.forEach(function(d) {
    if (uniqueNames.includes(d.properties.name)) {d.attacks = attacksById[year + d.properties.name]}
    else {d.attacks = 0} });


  svg.append("g")
      .attr("class", "countries")
    .selectAll("path")
      .data(data.features)
    .enter().append("path")
      .attr("d", path)
      .style("fill", function(d) {
        // if (d.attacks === 0) { return "#fff3e5" } else {
          return color(d.attacks)
        // };
      })
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
          tip.hide(d)

          d3.select(this)
            .style("opacity", 0.8)
            .style("stroke","white")
            .style("stroke-width",0.3);
        })
        .on("mousedown", function(d) {
          showDonut(donutData, d.properties.name, year, 1)
          showLineGraph(lineData, d.properties.name)
          country = d.properties.name
        });

      svg.append("path")
      .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
      .attr("class", "names")
      .attr("d", path);

      console.log(country)

      return country;
}

function drawLegend(color, max) {
  // d3.selectAll("defs").remove()
  // d3.select(".yAxis").remove()
  // d3.selectAll("#linear-gradient").remove()
  // d3.selectAll("rect").remove()
  //Append a defs (for definition) element to your SVG
// var defs = svg.append("defs");
//
// //Append a linearGradient element to the defs and give it a unique id
// var linearGradient = defs.append("linearGradient")
//     .attr("id", "linear-gradient");
//
// //Vertical gradient
// linearGradient
//     .attr("x1", "0%")
//     .attr("y1", "100%")
//     .attr("x2", "0%")
//     .attr("y2", "0%");
//
//     //Append multiple color stops by using D3's data/enter step
// linearGradient.selectAll("stop")
//     .data( color.range() )
//     .enter().append("stop")
//     .attr("offset", function(d,i) { return i/(color.range().length - 1); })
//     .attr("stop-color", function(d) { return d; });

    width = 20;
    height = 550;

    //Draw the rectangle and fill with gradient
    // svg.append("rect")
    //     .attr("width", width)
    //     .attr("height", height)
    //     .attr("transform", "translate(120, 20)")
    //     .style("fill", "url(#linear-gradient)")
    //     .attr("opacity", 0.8);

        var color = d3.scaleThreshold()
                      .domain([0,5,10,25,50,100,250,500,1000,2500,5000])
                      .range(["#7f0000", "#7f0000", "#990000", "#b30000", "#d7301f", "#ef6548", "#fc8d59", "#fdbb84", "#fdd49e", "#fee8c8", "#fff7ec", "#eeeeee"])

        var legend = svg.selectAll(".legend")
                        .data(color.domain())
                        .enter()
                        .append("g")
                        .attr("class", "legend")
                        .attr("transform", function(d, i) { return "translate(120," + ((i * (height / 11)) + 20) + ")"; });

  // draw legend colored rectangles
  legend.append("rect")
      .attr("x", 0)
      .attr("width", width)
      .attr("height", (height / 11))
      .style("fill", color);

      height2 = height / 11

      var yScale = d3.scaleLinear()
              .range([0, height2, (height2 * 2), (height2 * 3), (height2 * 4), (height2 * 5), (height2 * 6), (height2 * 7), (height2 * 8), (height2 * 9), (height2 * 10), height])
              .domain([5000,2500,1000,500, 250, 100,50,25,10,5, 1,0]);
      // yaxis scaled
      var yAxis = d3.axisLeft()
              .scale(yScale)
              .ticks(11)
              .tickValues([0,1, 5,10,25,50,100,250,500,1000,2500,5000]);

      // add axis
      svg.append("g")
        .attr("class", "yAxis")
        .attr("transform", "translate(120, 20)")
        .call(yAxis)
  //
  // // draw legend text
  // legend.append("text")
  //     .attr("x", width - 24)
  //     .attr("y", 9)
  //     .attr("dy", ".35em")
  //     .style("text-anchor", "end")
  //     .text(function(d) { return d;})

        // yscale for axis
      // var yScale = d3.scaleLinear()
      //         .range([0, height])
      //         .domain([max, 0]);
      // // yaxis scaled
      // var yAxis = d3.axisLeft()
      //         .scale(yScale)
      //         .ticks(9);
      //
      // // add axis
      // svg.append("g")
      //   .attr("class", "yAxis")
      //   .attr("transform", "translate(120, 20)")
      //   .call(yAxis)
}

function drawSlider(data, dataMap, donutData, lineData, country) {

  // Time
  var dataTime = d3.range(0, 18).map(function(d) {
    return new Date(2000 + d, 10, 4);
  });

  var sliderTime = d3
    .sliderBottom()
    .min(d3.min(dataTime))
    .max(d3.max(dataTime))
    .step(1000 * 60 * 60 * 24 * 365)
    .width(800)
    .tickFormat(d3.timeFormat('%Y'))
    .tickValues(dataTime)
    .default(new Date(2000, 10, 4))
    .on('onchange', val => {
      d3.select('p#value-time').text(d3.timeFormat('%Y')(val));
      year = d3.timeFormat('%Y')(val)
      multiData = getData2(data, year)
      events = multiData[0]
      max = multiData[1]
      color = multiData[2]
      // d3.select("svg").remove()
      drawMap(dataMap, events, color, donutData, lineData, country, year)
      // drawLegend(color, max)

    });

  var gTime = d3
    .select('div#slider-time')
    .append('svg')
    .attr('width', 900)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gTime.call(sliderTime);

  d3.select('p#value-time').text(d3.timeFormat('%Y')(sliderTime.value()));
}
