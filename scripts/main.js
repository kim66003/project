window.onload = function() {

  var input = "../data/json/country.json"
  var input2 = "../data/json/world_countries.json"
  var input3 = "../data/json/group.json"
  var input4 = "../data/json/killsandwound.json"
  var input5 = "../data/json/attacktypes.json"
  var input6 = "../data/json/targettypes.json"
  var input7 = "../data/json/weapontypes.json"
  var input8 = "../data/json/success.json"

  var requests = [d3.json(input), d3.json(input2), d3.json(input3), d3.json(input4), d3.json(input5), d3.json(input6), d3.json(input7), d3.json(input8)]

  Promise.all(requests).then(function(response) {
      var attacks = response[0]
      var world_countries = response[1]
      var group = response[2]
      var kw = response[3]
      var attacktype = response[4]
      var targets = response[5]
      var weapons = response[6]
      var success = response[7]

      window.currentCountry = "Afghanistan"
      window.year = 2000
      window.variable = group


      // load javascripts here
      showHeatMap(attacks, world_countries, kw, window.currentCountry, window.year)
      showLineGraph(kw, window.currentCountry)
      showDonut(window.variable, window.currentCountry, window.year, 0)

          d3.selectAll('#countries a')
              .on("click", function () {
                section = this.getAttribute("value")

                window.currentCountry = section
                document.getElementById('currentCountry').textContent = window.currentCountry;

                showDonut(group, section, window.year, 1)

                showLineGraph(kw, section)

                jQuery('h1.page-header').html(section);
              });

          d3.selectAll('#variables a')
              .on("click", function () {
                section = this.getAttribute("value")
                window.variable = section
                document.getElementById('currentVar').textContent = window.variable;

                if (section == "Group name") {
                  window.variable = group
                  showDonut(group, window.currentCountry, window.year, 1)
                } else if (section == "Attack type") {
                  window.variable = attacktype
                  showDonut(attacktype, window.currentCountry, window.year, 1)
                } else if (section == "Target type") {
                  window.variable = targets
                  showDonut(targets, window.currentCountry, window.year, 1)
                } else if (section == "Weapon type") {
                  window.variable = weapons
                  showDonut(weapons, window.currentCountry, window.year, 1)
                }

                  });

  }).catch(function(e){
      throw(e);
  });

};
