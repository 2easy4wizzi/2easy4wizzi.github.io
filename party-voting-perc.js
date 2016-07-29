function transitionPartyVotingPerc(inputClusterNumber) {
    showPercent = checkShowPercent();
    var precentView = showPercent ? "precentView" : "absoluteView";
    var description = " - תוצאות עבור אשכול בודד";
    console.log(precentView + ": transitionPartyVotingPerc, cluster:" + inputClusterNumber + description);
    d3.selectAll('input[name="mode"]')
        .on("change", function() { transitionPartyVotingPerc(inputClusterNumber) });

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
        var dataOfClusterRequested = data;
        if (inputClusterNumber != 0) {
            dataOfClusterRequested = data.filter(function(d){return d.cluster == inputClusterNumber });
        }

        /*console.log("data Of Cluster Requested:")
        console.log(dataOfClusterRequested);*/
        var totalPeopleInCluster = d3.sum(dataOfClusterRequested,function(d) { return d.votes});
        // console.log("total people in cluster number " + inputClusterNumber +" : " + totalPeopleInCluster);
        var sumsVotesArray = [];
        for(var i=0; i < partiesHeaders.length ; i++){
            var tempSum = d3.sum(dataOfClusterRequested,function(d) { return d[partiesHeaders[i][0]]});
            var pair = {
                key: partiesHeaders[i][1],
                values: {
                    voting: showPercent ? tempSum/totalPeopleInCluster : tempSum,
                    right_dist: partiesDistribution[i][1],
                    party_field_name: partiesHeaders[i][0]
                }
            };
            sumsVotesArray.push(pair);
        }
        // console.log("sumsVotesArray");
        xScale.domain(partiesHeaders.map(function (d) { return d[1] }));
        var domainMax = d3.max(sumsVotesArray, function (g) { return g.values.voting }) * 1.1;
        yScale.domain([0, domainMax]);
        changeAxis(domainMax);

        var titleText = (inputClusterNumber != 0
                ? " (אשכול " + inputClusterNumber
                : " (תוצאות ארציות")
            + " " + (showPercent
            ? "(אחוז התפלגות הצבעות למפלגות"
            : "(סך הצבעות למפלגות");

        title.transition()
            .duration(TRANSITION_TIME)
            .text(titleText);


        parent_svg.on("click", function (d,i) { // the "return button" - click on background
            generateVotingPercentage();
        });

        var ahuzHahasima = showPercent ? 0.0325 : 0.0325 * totalPeopleInCluster;
        svg.select(".perc-line")
            .transition()
            .duration(TRANSITION_TIME)
            .attr("x1", 0)
            .attr("y1", yScale(ahuzHahasima)) // ahuz hahasima
            .attr("x2", width)
            .attr("y2", yScale(ahuzHahasima)) // ahuz hahasima
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

        bars.enter().append("rect")
            .attr("class", "bar")
            .attr("y", yScale(0))
            .attr("height", height - yScale(0))
        ;

        bars
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            .on("click", function (d,i) {
                transitionPartyVotingPercentPerCluster(d.values.party_field_name);
                d3.event.stopPropagation();
            })
        ;

        bars.transition()
            .duration(TRANSITION_TIME)
            .attr("x", function(d) { return xScale(d.key); })
            .attr("width", xScale.rangeBand())
            .attr("y", function(d) { return yScale(d.values.voting); })
            .attr("height", function(d) { return height - yScale(d.values.voting); })
            .style("fill", function (d) {return d3.interpolateGnBu(d.values.right_dist)})
            .style("fill-opacity", 1)
            ;
    });
}
