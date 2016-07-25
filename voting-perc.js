function generateVotingPercentage() {
    console.log("generateVotingPercentage");
    d3.json("data-set-elections/electionAndEconomicData.json", function(error, data) {
        if (error) throw error;

        header_data = data.splice(0,3);
        // console.log(data);
        // console.log(header_data);

        var votingDataByCluster = d3.nest()
            .key(function (d) {return d.cluster;})
            .rollup(function (cities) {
                var totalVotesForCluster = d3.sum(cities, function(g) {return g.votes});
                var votingPercForCluster = totalVotesForCluster / d3.sum(cities, function(g) {return g.eligible});
                var rightAttributeForCluster = d3.sum(cities, function(g) {return g.right_attitude}) / totalVotesForCluster
                return { votingPerc: votingPercForCluster, rightAttribute: rightAttributeForCluster };
            })
            .entries(data);
        // console.log(votingDataByCluster);
        xScale.domain(d3.range(1, 11, 1));   // social classes [1,...,10]
        yScale.domain([0, 1]);

        // generateCityPopulationTableData(data);

        var averageVotingPerc = d3.sum(data, function (d) { return d.votes}) / d3.sum(data, function(d) { return d.eligible});

        // console.log(averageVotingPerc);
        var colorScale = d3.scale.linear()
            .range(["#ffe6e6", "#990000"])
            .domain(d3.extent(votingDataByCluster, function (d) { return d.values.rightAttribute }));

        svg.select('.x.axis').transition().duration(TRANSITION_TIME).call(xAxis);
        svg.select(".y.axis").transition().duration(TRANSITION_TIME).call(yAxis);

        var line = svg.select(".perc-line").data(votingDataByCluster);
        line.enter();
        line.transition()
            .duration(TRANSITION_TIME)
            .attr("x1", 0)
            .attr("y1", yScale(averageVotingPerc))
            .attr("x2", width)
            .attr("y2", yScale(averageVotingPerc))
            .attr("style", 'stroke:grey;stroke-width:2;stroke-dasharray: 10;')
        ;

        var bars = svg.selectAll(".bar").data(votingDataByCluster);

        // data that needs DOM = enter() (a set/selection, not an event!)
        bars.exit()
            .transition()
            .duration(TRANSITION_TIME)
            .attr("y", yScale(0))
            .attr("height", height - yScale(0))
            .style('fill-opacity', 1e-6)
            .remove();

        bars.enter().append("rect")
            .attr("class", "bar")
            .attr("y", yScale(0))
            .attr("height", height - yScale(0))
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            .on('click', function (d,i) {
                transitionPartyVotingPerc(i+1);
                d3.event.stopPropagation();
            });

        // the "UPDATE" set:
        bars.transition()
            .duration(TRANSITION_TIME)
            .attr("x", function(d) { return xScale(d.key); })
            .attr("width", xScale.rangeBand())
            .attr("y", function(d) { return yScale(d.values.votingPerc); })
            .attr("height", function(d) { return height - yScale(d.values.votingPerc); })
            .style("fill", function (d) {return d3.interpolateGnBu(d.values.rightAttribute)})
        ;
    });
}

function generateCityPopulationTableData(data){
    var cityPopulationTableData = data.map(function(d){ return [d.city , d.population];}); //filtering data
    console.log("cityPopulationTableData data:");
    console.log(cityPopulationTableData);
    var table = document.getElementById("myTable");

    for(var i = 0; i < cityPopulationTableData.length ; i++){ //generating table rows
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = cityPopulationTableData.length - i;
        cell2.innerHTML = cityPopulationTableData[i][0];
        cell3.innerHTML = cityPopulationTableData[i][1];
        //cell2.innerHTML = "NEW CELL2";
    }

    var header = table.createTHead(); //generating table headers
    var row = header.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    //cell1.setAttribute("data-priority","1");
    cell1.innerHTML = "<b>מספר</b>";
    cell2.innerHTML = "<b>עיר</b>";
    cell3.innerHTML = "<b>אוכלוסיה</b>";
}
/*

<thead>
<tr>
<th data-priority="6">מספר</th>
    <th>מספר</th>
    <th data-priority="1">ContactName</th>
    <th data-priority="2">Address</th>
    <th data-priority="3">City</th>
    <th data-priority="4">PostalCode</th>
    <th data-priority="5">Country</th>
    </tr>
    </thead>

 http://www.w3schools.com/jquerymobile/tryit.asp?filename=tryjqmob_filters_tables

*/

