const TRANSITION_TIME = 300;

var colorIntrepulate = d3.interpolateGnBu;

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
    .ticks(10)
    .tickFormat(d3.format("s"));

var parent_svg = d3.select("#vis").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var svg = parent_svg
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
        return "<span style='color:red'>"
            + (checkShowPercent()
                ? d3.format("%")(d.values.voting)
                : d3.format(".2s")(d.values.voting))
            + "</span><strong> :הצבעה</strong>";
    });

svg.call(tip);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .style("opacity", 1);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("id", "y-axis-text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Voters Absolute");

svg.append("line")
    .attr("class", "perc-line");

generateVotingPercentage();
// generateCityPopulationTableData();

function checkShowPercent() {
    return d3.select('input[name="mode"]:checked').property("value") == "percent";
}

function changeAxis() {
    showPercent = checkShowPercent();
    yAxis.tickFormat(d3.format(showPercent ? "%" : "s"));
    svg.select('.x.axis').transition().duration(TRANSITION_TIME).call(xAxis);
    svg.select('.y.axis').transition().duration(TRANSITION_TIME).call(yAxis);
    svg.select('#y-axis-text').text(showPercent ? "Voters Percentage" : "Voters Absolute");
}