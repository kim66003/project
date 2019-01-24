window.onload = function() {

  var input = "../data/country.json"
  var input2 = "../data/world_countries.json"
  var input3 = "../data/group.json"
  var input4 = "../data/killsandwound.json"

  var requests = [d3.json(input), d3.json(input2), d3.json(input3), d3.json(input4)]

  Promise.all(requests).then(function(response) {
      var attacks = response[0]
      var world_countries = response[1]
      var group = response[2]
      var kw = response[3]

      country = "Iraq"
      window.year = 2000

      // load javascripts here
      showHeatMap(attacks, world_countries, group, kw, country, window.year)
      showLineGraph(kw, country)
      showDonut(group, country, window.year, 0)

          d3.selectAll('.dropdown-item')
              .on("click", function () {
                section = this.getAttribute("value")
                console.log(section)
                // var sect = document.getElementById("inds");
                // var section = sect.options[sect.selectedIndex].value;
                origData = Object.values(kw)
                data = Object.values(group)
                newData = makeDict(origData, section)
                newDataCountry = newData[1]
                newData = newData[0]

                newDataDonut = getData(data, section, window.year)

                window.currentCountry = section

                showDonut(group, section, window.year, 1)

                showLineGraph(kw, section)

                jQuery('h1.page-header').html(section);
              });

  }).catch(function(e){
      throw(e);
  });

};
