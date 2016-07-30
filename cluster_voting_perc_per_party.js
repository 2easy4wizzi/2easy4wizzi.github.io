function transitionPartyVotingPercentPerCluster(partyName) {
    showPercent  = checkShowPercent();
    var precentView = showPercent ? "precentView" : "absoluteView";
    var description = " - תוצאות עבור מפלגה";
    console.log(precentView + ": transitionPartyVotingPercentPerCluster, cluster:" + partyName + description);


    d3.selectAll('input[name="mode"]')
        .on("change", function() {transitionPartyVotingPercentPerCluster(partyName) });

    d3.json("data-set-elections/electionAndEconomicData.json", function(error, data) {
        header_data = data.splice(0,3);
        partyHebrewName = header_data[0][partyName];

        //console.log(data);
        var totalVotesForParty = d3.sum(data, function (d, i) { return data[i][partyName] });

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

        //console.log(votingDataByCluster);

        xScale.domain(d3.range(1, 11, 1));   // social classes [1,...,10]
        var domainMax = d3.max(votingDataByCluster, function (d){ return d.values.voting })* 1.1;
        yScale.domain(showPercent
            ? [0, Math.max(domainMax, 0.035)]
            : [0, domainMax]);

        changeAxis(domainMax);

        var lineVal = showPercent ? 0.0325 : totalVotesForParty / 10;
        var line = svg.select(".perc-line").data(votingDataByCluster);
        svg.select(".perc-line")
            .transition()
            .duration(TRANSITION_TIME)
            .attr("x1", 0)
            .attr("y1", yScale(lineVal))
            .attr("x2", width)
            .attr("y2", yScale(lineVal))
            .attr("style", 'stroke:' + (showPercent ? 'red' : 'grey') + ';stroke-width:2;stroke-dasharray: 10;');

        parent_svg.on("click", function (d,i) { // the "return button" - click on background
            generateVotingPercentage();
        });

        var bars = svg.selectAll(".bar").data(votingDataByCluster);

        var partyNameStr = partyHebrewName;
        if (language == 0) { //hebrew
            partyNameStr = "(" + languagePartiesHeadersDictionary[partyName][0] + " " + (showPercent
                ? "(אחוזי הצבעה מכל אשכול"
                : "(מספר הצבעות מכל אשכול");
        }else if (language == 1){ //english
            partyNameStr = languagePartiesHeadersDictionary[partyName][1] +
                (showPercent ? '(voting precentage' : '(number of votes') + ' from each cluster)' ;
        }

        title.transition()
            .duration(TRANSITION_TIME)
            .text(partyNameStr);


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

        bars.transition()
            .duration(TRANSITION_TIME)
            .attr("x", function(d) { return xScale(d.key); })
            .attr("width", xScale.rangeBand())
            .attr("y", function(d) { return yScale(d.values.voting); })
            .attr("height", function(d) { return height - yScale(d.values.voting); })
            .style("fill", function (d) {return colorIntrepulate(d.values.rightAttribute)})

    });
}