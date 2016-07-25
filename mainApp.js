const TRANSITION_TIME = 300;


var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var xScale = d3.scale.ordinal()
    .rangeRoundBands([0, width], .3);

var yScale = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(10, "%");

var parent_svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

var svg = parent_svg
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        return "<span style='color:red'>" + parseInt(d.values.votingPerc*100) + "%" + "</span><strong> :אחוזי הצבעה</strong>";
    });

svg.call(tip);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Voting Percentage");

svg.append("line")
    .attr("class", "perc-line");

generateVotingPercentage();