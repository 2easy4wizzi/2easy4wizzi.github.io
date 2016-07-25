function transitionPartyVotingPerc(inputClusterNumber) {
    console.log("transitionPartyVotingPerc, cluster:" + inputClusterNumber);
    d3.json("data-set-elections/electionAndEconomicData.json", function(error, data) {
        if (error) throw error;
        header_data = data.splice(0,3);
        var party_dictionary = header_data[0];
        var partiesHeaders = [];
        var filterFields = ["city" , "eligible" , "", "votes","population","cluster", "right_attitude"];

        for(var key in party_dictionary) {
            if (filterFields.indexOf(key) == -1){
                var pair = [key , party_dictionary[key]];
                partiesHeaders.push(pair);
            }
        }

        var right_attitude_dictionary = header_data[2];
        var partiesDistribution = [];

        for(var field in right_attitude_dictionary) {
            if (filterFields.indexOf(field) == -1){
                var pair = [field , right_attitude_dictionary[field]];
                partiesDistribution.push(pair);
            }
        }

        var dataOfClusterRequested = data.filter(function(d){return d.cluster == inputClusterNumber });

        console.log("data Of Cluster Requested:" + dataOfClusterRequested);
        var totalPeopleInCluster = d3.sum(dataOfClusterRequested,function(d) { return d.votes});
        // console.log("total people in cluster number " + inputClusterNumber +" : " + totalPeopleInCluster);
        var sumsVotesArray = [];
        for(var i=0; i < partiesHeaders.length ; i++){
            var tempSum = d3.sum(dataOfClusterRequested,function(d) { return d[partiesHeaders[i][0]]});
            var pair = {
                key: partiesHeaders[i][1],
                values: {
                    votingPerc: tempSum/totalPeopleInCluster,
                    right_dist: partiesDistribution[i][1],
                    party_field_name: partiesHeaders[i][0]
                }
            };
            sumsVotesArray.push(pair);
        }
        // console.log("sumsVotesArray");
        console.log(sumsVotesArray);
        xScale.domain(partiesHeaders.map(function (d) {
            return d[1];
        }));

        yScale.domain([0, d3.max(sumsVotesArray, function (d) {return d.values.votingPerc})]);

        svg.select('.x.axis').transition().duration(TRANSITION_TIME).call(xAxis);
        svg.select(".y.axis").transition().duration(TRANSITION_TIME).call(yAxis);


        parent_svg.on("click", function (d,i) { // the "return button" - click on background
            generateVotingPercentage();
        });

        svg.select(".perc-line")
            .transition()
            .duration(TRANSITION_TIME)
            .attr("x1", 0)
            .attr("y1", yScale(0.0325)) // ahuz hahasima
            .attr("x2", width)
            .attr("y2", yScale(0.0325)) // ahuz hahasima
            .attr("style", 'stroke:red;stroke-width:2;stroke-dasharray: 10;')
        ;

        var bars = svg.selectAll(".bar").data(sumsVotesArray);

        bars.exit()
            .transition()
            .duration(TRANSITION_TIME)
            .attr("y", yScale(0))
            .attr("height", height - yScale(0))
            .style('fill-opacity', 1e-6)
            .remove();

        // data that needs DOM = enter() (a set/selection, not an event!)
        bars.enter().append("rect")
            .attr("class", "bar")
            .attr("y", yScale(0))
            .attr("height", height - yScale(0))
        ;

        bars
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            // .on("click", function (d,i) {
            //     console.log("clicked");
            // })
        ;

        // the "UPDATE" set:
        bars.transition()
            .duration(TRANSITION_TIME)
            .attr("x", function(d) { return xScale(d.key); })
            .attr("width", xScale.rangeBand())
            .attr("y", function(d) { return yScale(d.values.votingPerc); })
            .attr("height", function(d) { return height - yScale(d.values.votingPerc); })
            .style("fill", function (d) {return d3.interpolateGnBu(d.values.right_dist)})
            ;

    });
}
