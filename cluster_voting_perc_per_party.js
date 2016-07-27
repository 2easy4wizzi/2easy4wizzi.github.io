function transitionPartyVotingPercentPerCluster(partyName) {
    console.log("transitionPartyVotingPercentPerCluster, cluster:" + partyName);

    showPercent  = checkShowPercent();

    d3.selectAll('input[name="mode"]')
        .on("change", function() { transitionPartyVotingPercentPerCluster(partyName) });

    d3.json("data-set-elections/electionAndEconomicData.json", function(error, data) {
        header_data = data.splice(0,3);
        console.log(data);
        var totalVotesForParty = d3.sum(data, function (d, i) { return data[i][partyName] });
        var avgForParty = 0;    //TODO line

        var votingDataByCluster = d3.nest()
            .key(function (d) {return d.cluster;})
            .rollup(function (cities) {
                var totalVotesForPartyForCluster = d3.sum(cities, function(g) {return g[partyName]});
                var totalVotesForCluster = d3.sum(cities, function(g) {return g.votes});
                var votingPercForClusterForParty = totalVotesForPartyForCluster / totalVotesForCluster;
                var rightAttributeForCluster = d3.sum(cities, function(g) {return g.right_attitude}) / totalVotesForCluster;
                return {
                    voting: showPercent ? votingPercForClusterForParty : totalVotesForPartyForCluster,
                    votingTotal: totalVotesForPartyForCluster,
                    rightAttribute: rightAttributeForCluster
                };
            })
            .entries(data);

        console.log(votingDataByCluster);

        xScale.domain(d3.range(1, 11, 1));   // social classes [1,...,10]
        yScale.domain(showPercent
            ? [0, d3.max(votingDataByCluster, function (d) {return d.values.voting})]
            : [0, d3.max(votingDataByCluster, function(g) { return g.values.voting })]);

        changeAxis();

        // var line = svg.select(".perc-line").data(votingDataByCluster);
        // line.enter();
        // line.transition()
        //     .duration(TRANSITION_TIME)
        //     .attr("x1", 0)
        //     .attr("y1", yScale(averageVotingPerc))
        //     .attr("x2", width)
        //     .attr("y2", yScale(averageVotingPerc))
        //     .attr("style", 'stroke:grey;stroke-width:2;stroke-dasharray: 10;')
        // ;

        parent_svg.on("click", function (d,i) { // the "return button" - click on background
            generateVotingPercentage();
        });

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
        ;

        bars.on('click', function (d,i) {
            transitionPartyVotingPerc(d.key);
            d3.event.stopPropagation();
        });

        // the "UPDATE" set:
        bars.transition()
            .duration(TRANSITION_TIME)
            .attr("x", function(d) { return xScale(d.key); })
            .attr("width", xScale.rangeBand())
            .attr("y", function(d) { return yScale(d.values.voting); })
            .attr("height", function(d) { return height - yScale(d.values.voting); })
            .style("fill", function (d) {return d3.interpolateGnBu(d.values.rightAttribute)})

    });
}