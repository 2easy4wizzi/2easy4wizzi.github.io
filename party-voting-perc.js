function transitionPartyVotingPerc(inputClusterNumber) {
    d3.json("data-set-elections/electionAndEconomicData.json", function(error, data) {
        if (error) throw error;
        header_data = data.splice(0,3);
        var p = header_data[0];
        var partiesHeaders = [];
        var filterFields = ["city" , "eligible" , "", "votes","population","cluster", "right_attitude"];

        for(var key in p) {
            if (filterFields.indexOf(key) == -1){
                var pair = [key , p[key]];
                partiesHeaders.push(pair);
            }};

        var p2 = header_data[2];
        var partiesDistribution = [];

        for(var key in p2) {
            if (filterFields.indexOf(key) == -1){
                var pair = [key , p2[key]];
                partiesDistribution.push(pair);
            }}

        var dataOfClusterRequested = data.filter(function(d){return d.cluster == inputClusterNumber });

        console.log("data Of Cluster Requested:");
        console.log(dataOfClusterRequested);
        var totalPeopleInCluster = d3.sum(dataOfClusterRequested,function(d) { return d.votes});
        console.log("total people in cluster number " + inputClusterNumber +" : " + totalPeopleInCluster);
        var sumsVotesArray = [];
        for(var i=0; i < partiesHeaders.length ; i++){
            var tempSum = d3.sum(dataOfClusterRequested,function(d) { return d[partiesHeaders[i][0]]});
            var pair = {key: partiesHeaders[i][1] , values:{
                votingPerc: tempSum/totalPeopleInCluster,
                right_dist: partiesDistribution[i][1]}};
            sumsVotesArray.push(pair);
        }
        console.log("sumsVotesArray");
        console.log(sumsVotesArray);
        xScale.domain(partiesHeaders.map(function (d) {
            return d[1];
        }));

        yScale.domain([0, d3.max(sumsVotesArray, function (d) {return d.values.votingPerc})]);
        var colorScale = d3.scale.linear()
            .range(["#90EE90", "#006400"])
            .domain([0, 1]);

        svg.select('.x.axis').transition().duration(500).call(xAxis);
        svg.select(".y.axis").transition().duration(500).call(yAxis);

        var bars = svg.selectAll(".bar").data(sumsVotesArray);

        bars.exit()
            .transition()
            .duration(300)
            .attr("y", yScale(0))
            .attr("height", height - yScale(0))
            .style('fill-opacity', 1e-6)
            .remove();

        // data that needs DOM = enter() (a set/selection, not an event!)
        bars.enter().append("rect")
            .attr("class", "bar")
            .attr("y", yScale(0))
            .attr("height", height - yScale(0))
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        // the "UPDATE" set:
        bars.transition()
            .duration(300)
            .attr("x", function(d) { return xScale(d.key); })
            .attr("width", xScale.rangeBand())
            .attr("y", function(d) { return yScale(d.values.votingPerc); })
            .attr("height", function(d) { return height - yScale(d.values.votingPerc); })
            .attr("style", function (d) {return "fill:" + colorScale(d.values.right_dist)});

    });
}
