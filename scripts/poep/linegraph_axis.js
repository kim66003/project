function showAxis() {


var margin = {top:50, left:50, bottom:50, right:50 }
var width = 200 - (margin.left + margin.right)
var height = 200 - (margin.top + margin.bottom)

axisUpdateExample2()

function axisUpdateExample2() {
    var svg = d3.select("#line").append("svg").attr("width", width + (margin.left + margin.right)).attr("height", height + (margin.top + margin.bottom))

    var xScale = d3.scaleLinear()
    var yScale = d3.scaleLinear()

    var xAxisCall = d3.axisBottom()
    var yAxisCall = d3.axisLeft()

    setScale1()
    drawAxis()

    setInterval(toggle(
        function(){
            setScale2()
            drawAxis()
        },
        function(){
            setScale1()
            drawAxis()

        }), 2000)

    function setScale1(){
        xScale.domain([0, 1000]).range([0, width])
        yScale.domain([0, 1000]).range([height, 0])
        xAxisCall.scale(xScale)
        yAxisCall.scale(yScale)
    }

    function setScale2(){
        xScale.domain([0, 100]).range([0, width])
        yScale.domain([0, 100]).range([height, 0])
        xAxisCall.scale(xScale)
        yAxisCall.scale(yScale)
    }


    function drawAxis(){
        var t = d3.transition()
            .duration(500)

        var x = svg.selectAll(".x")
            .data(["dummy"])

        var newX = x.enter().append("g")
            .attr("class", "x axis")
            .attr("transform", "translate("+[height-margin.top, margin.left]+")")

        x.merge(newX).transition(t).call(xAxisCall)

        var y = svg.selectAll(".y")
            .data(["dummy"])

        var newY = y.enter().append("g")
            .attr("class", "y axis")
            .attr("transform", "translate("+[margin.top, margin.left]+")")

        y.merge(newY).transition(t).call(yAxisCall)


    }
}




function toggle(){
    var fn = arguments;
    var l = arguments.length;
    var i = 0;
    return function(){
        if(l <= i) i=0;
        fn[i++]();
    }
}

}
