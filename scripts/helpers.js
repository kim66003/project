/* Javascript helpers file
   Name: Kimberley Boersma
   Student no.: 11003464 */

// Change text in countries dropdown menu onclick
$('#countries a').click(function(){
    $('#selected').text($(this).text());
  });

// Change text in donut category dropdown menu onclick
$('#donutvars a').click(function(){
    $('#selected2').text($(this).text());
  });

function countryDrop(group, kw, attacks, world_countries) {
  // Updates donut and linegraph when another country is chosen in dropdown

  d3.selectAll('#countries a')
      .on("click", function () {
        // Get country
        section = this.getAttribute("value");
        // Update current country
        window.currentCountry = section;
        // Update current country in navbar
        document.getElementById('currentCountry').textContent = window.currentCountry;
        // Update donut
        showDonut(group, section, window.year, 1);
        // Update linegraph
        showLineGraph(kw, attacks, world_countries, section);
      });
}

function catDrop(group, attacktype, targets, weapons){
  // Updates donutchart when another category is chosen in dropdown menu

  d3.selectAll('#donutvars a')
      .on("click", function () {
        // Get category
        section = this.getAttribute("value");
        // Update variablename
        window.variable = section;
        // Update category in navbar
        document.getElementById('currentVar').textContent = window.variable;

        // Update donut with right data based on dropdown value
        if (section == "Group name") {
          // Update donut with terrorist groups
          window.variable = group;
          showDonut(group, window.currentCountry, window.year, 1);
        } else if (section == "Attack type") {
          // Update donut with attack types
          window.variable = attacktype;
          showDonut(attacktype, window.currentCountry, window.year, 1);
        } else if (section == "Target type") {
          // Update donut with target types
          window.variable = targets;
          showDonut(targets, window.currentCountry, window.year, 1);
        } else if (section == "Weapon type") {
          // Update donut with weapon types
          window.variable = weapons;
          showDonut(weapons, window.currentCountry, window.year, 1);
        };
      });
}
