function generateVotingPercentage() {
    d3.json("data-set-elections/electionAndEconomicData.json", function(error, data) {
        if (error) throw error;

        header_data = data.splice(0,3);
        console.log(data);
        console.log(header_data);

        var votingDataByCluster = d3.nest()
            .key(function (d) {return d.cluster;})
            .rollup(function (cities) {
                var totalVotesForCluster = d3.sum(cities, function(g) {return g.votes});
                var votingPercForCluster = totalVotesForCluster / d3.sum(cities, function(g) {return g.eligible});
                var rightAttributeForCluster = d3.sum(cities, function(g) {return g.right_attitude}) / totalVotesForCluster
                return { votingPerc: votingPercForCluster, rightAttribute: rightAttributeForCluster };
            })
            .entries(data);
        console.log(votingDataByCluster);
        xScale.domain(d3.range(1, 11, 1));   // social classes [1,...,10]
        yScale.domain([0, 1]);
//        yScale.domain([0, d3.max(votingDataByCluster, function (d) { return d.values.votingPerc })]); // max percent is highest


        var averageVotingPerc = d3.sum(data, function (d) { return d.votes}) / d3.sum(data, function(d) { return d.eligible});

        console.log(averageVotingPerc);
        var colorScale = d3.scale.linear()
            .range(["#ffe6e6", "#990000"])
            .domain(d3.extent(votingDataByCluster, function (d) { return d.values.rightAttribute }));

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
            .attr("x1", 0)
            .attr("y1", yScale(averageVotingPerc))
            .attr("x2", width)
            .attr("y2", yScale(averageVotingPerc))
            .attr("style", 'stroke:red;stroke-width:2;stroke-dasharray: 10;');

        svg.selectAll(".bar")
            .data(votingDataByCluster)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return xScale(d.key); })
            .attr("width", xScale.rangeBand())
            .attr("y", function(d) { return yScale(d.values.votingPerc); })
            .attr("height", function(d) { return height - yScale(d.values.votingPerc); })
            .attr("style", function (d) {return "fill:" + colorScale(d.values.rightAttribute)})
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            .on("click", function (d,i) {transitionPartyVotingPerc(i+1)})
        ;
    });
};

