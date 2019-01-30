/* Javascript file to draw donut
   Name: Kimberley Boersma
   Student no.: 11003464 */

// Source: https://codepen.io/zakariachowdhury/pen/EZeGJy

function showDonut (data, country, year, bool) {
// Calls functions to draw donutchart

  // Removes donutchart svg when function is called after first time
  if (bool === 1) {
    d3.select('#donutchart').remove();
  }
    // Get data for donutchart
    events = getData(data, country, year)
    // Draw donut chart
    drawDonut(data, events, country)
}

function drawDonut (data, events, country) {
  // Draws donut

  // Define margins, width and height
  var margin = {top: 30, right: 5, bottom: 30, left: 5},
       width = 500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  // Define donut variables
  var thickness = 50;
  var duration = 750;
  var radius = Math.min(width, height) / 2;
  // Define color with orginal scheme
  var color = d3.scaleOrdinal(d3.schemeSet3);

  // Append svg to donut column
  var svg = d3.select('#donut')
           .append('svg')
           .attr('id', 'donutchart')
           .attr('class', 'pie')
           .attr('viewBox', [0, 0, (width + margin.right + margin.left),
                         (height + margin.top + margin.bottom)].join(' '));

  // Append g to svg
  var g = svg.append('g')
           .attr('transform', 'translate(' + (width/2) + ',' + (height/2) + ')');

  // Get abbreviation for country with long name, otherwise returns standard name
  var countryAbv = getAbv(window.currentCountry)

  // If there is no data available, display text and return
  if (typeof events === 'string') {
    g.append('text')
    .attr('class', 'no-data')
    .text(events)
    .attr('text-anchor', 'middle')
    .attr('dy', '1em');

    g.append('text')
    .attr('class', 'no-data')
    .text(' for ' + countryAbv)
    .attr('text-anchor', 'middle')
    .attr('dy', '2em');

    return;
  }

  // Get donut data in right format
  var donutDict = makeDonutDict(events)

  // Define arc
  var arc = d3.arc()
              .innerRadius(radius - thickness)
              .outerRadius(radius)
              // Add rounded corners
              .cornerRadius(3)
              // Add some space between donut parts
              .padAngle(0.0015);

  // Define pie and return the percentages
  var pie = d3.pie()
              .value(function(d) { if (d.country_txt == country) {
                return (d.percentage); }})
              .sort(null);

  // Define path and add hover functions
  var path = g.selectAll('path')
              .data(pie(donutDict))
              .enter()
              .append('g')
              .on('mouseover', function(d) {
                  // Select donut part and show pointer cursor
                  let g = d3.select(this)
                    .style('cursor', 'pointer')
                    .append('g')
                    .attr('class', 'text-group');
                  // Show text with category name e.g. 'Bombing'
                  g.append('text')
                    .attr('class', 'name-text')
                    .text(`${d.data.varname}`)
                    .attr('dy', '-1.2em');
                  // Show text with percentage
                  g.append('text')
                    .attr('class', 'value-text')
                    .text(`${(d.data.percentage * 100).toFixed(2)}%`)
                    .attr('dy', '.6em');
                  })
              // Remove text on mouseout
              .on('mouseout', function(d) {
                  d3.select(this)
                    .style('cursor', 'none')
                    .select('.text-group').remove();
                });

  // Append donut parts to path with color according to colorscale
  path.append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => color(i))
      // Change cursor and opacity on hover
      .on('mouseover', function(d) {
          d3.select(this)
            .style('cursor', 'pointer')
            .style('opacity', 0.5);
        })
      .on('mouseout', function(d) {
          d3.select(this)
            .style('cursor', 'none')
            .style('opacity', 1.0);
        })
      .each(function(d, i) { this._current = i; });

  // Add countryname/ID to donutchart
  g.append('text')
   .attr('class', 'country-text')
   .text(countryAbv)
   .attr('dy', '-1.5em');

   // Add title for specific country
   // TO DOOOOO
   svg.append('g')
      .append('text')
      .attr('class', 'title')
      .attr('x', width / 2)
      .attr('y', 10)
      .text('Percentage of terrorist groups for ' + country)

}

function makeDonutDict (events) {
  // Returns dictionary with the right data (4 types)

  // Get keys of first element of data
  var keys = Object.keys(events[0]);

  var donutDict = [];

  // Determine the type of data
  // and save this in variable
  events.forEach(function(d){
    if (keys.includes('attacktype1_txt')) {
      var arcName = d.attacktype1_txt;
    } else if (keys.includes('gname')) {
      var arcName = d.gname;
    } else if (keys.includes('targtype1_txt')) {
      var arcName = d.targtype1_txt;
    } else if (keys.includes('weaptype1_txt')) {
      var arcName = d.weaptype1_txt;
    }

  // Push every datapoint to donutdict
  donutDict.push({
    iyear: d.iyear,
    country_txt: d.country_txt,
    // With the correct data type
    varname: arcName,
    frequency: d.frequency,
    percentage: d.percentage
  });
});
  return donutDict;
}

function getData (data, country, year) {
  // Returns data for specific country and year

  values = Object.values(data);
  events = [];

  // Add datapoints to list for given year and country
  values.forEach(function(d) {
    if (d.iyear == year && d.country_txt == country) {
      events.push(d);
    };
  });

  // Sort values from high to low
  events.sort(function(a, b) {
    return a.percentage - b.percentage;
  });
  // If no data is available, return string
  if (events.length === 0) {
    return 'No data available'
  } // Else return data
  return events;
}

function getAbv(country) {
  // Returns (abbreviated) country name

  var count = 0;
  var countryName = null;

  // Loops through list of countrynames and country ID's
  window.countryID.forEach(function(d){
      // Determine whether country has more than 2 spaces in name
      if (d.name.includes(country)){
        for (i in country){
          if (country[i] == ' ') {
              count += 1; };
          // 2 or more spaces: return country ID
          if (count == 2 || count > 2) {
            countryName = d.id;
            break; };
        }; };
    });
  // Less than 2 spaces: return full countryname
  if (count < 2){
   countryName = country; }
  return countryName;
}
