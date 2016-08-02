qTipView3Text =  [
    "זה מידע על הויו השלישי !!!!!!! שלנו.\<br\> בלה בלה." ,
    "this is information on our 33 view\<br\>tralala"
];



function generateVotingPercentage() {

    d3.selectAll('input[name="lan"]').on("change", function() {
        onLanguageChange(qTipView3Text[checkLanguage()]);
        generateVotingPercentage();
    });

    changeToolQuestionMarkTipText(qTipView3Text[checkLanguage()]); // need to set QTip to info about this view
    showPercent = checkShowPercent();

    var precentView = showPercent ? "precentView" : "absoluteView";
    var description = "תוצאות כלליות של בחירות 2015 לפי אשכולות";
    console.log("view 3");
    console.log(precentView + ": generateVotingPercentage - " + description );

    d3.selectAll('input[name="mode"]')
        .on("change", function() { generateVotingPercentage() });

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
                var rightAttributeForCluster = d3.sum(cities, function(g) {return g.right_attitude}) / totalVotesForCluster;
                return {
                    voting: showPercent ? votingPercForCluster : totalVotesForCluster,
                    rightAttribute: rightAttributeForCluster,
                };
            })
            .entries(data);
        //console.log(votingDataByCluster);
        xScale.domain(d3.range(1, 11, 1));   // social classes [1,...,10]
        yScale.domain(showPercent ? [0, 1] : [0, d3.max(votingDataByCluster, function(g) { return g.values.voting })]);

        var averageLine = showPercent
            ? d3.sum(data, function (d) { return d.votes}) / d3.sum(data, function(d) { return d.eligible})
            : d3.sum(data, function (d) { return d.votes}) / 10;

        var line = svg.select(".perc-line").data(votingDataByCluster);
        line.enter();
        line.transition()
            .duration(TRANSITION_TIME)
            .attr("x1", 0)
            .attr("y1", yScale(averageLine))
            .attr("x2", width)
            .attr("y2", yScale(averageLine))
            .attr("style", 'stroke:' + dashedLineAverageColor + ';stroke-width:2;stroke-dasharray: 10;')
        ;

        var text = [["(אחוזי הצבעה ארציים(לפי אשכולות" , "(מספר הצבעות ארצי(לפי אשכולות"],["Country voting precentage(by clusters)","Country number of votes(by clusters)"]];
        var miniTitle = showPercent ? text[language][0] : text[language][1];

        title.transition()
            .duration(TRANSITION_TIME)
            .text(miniTitle);

        changeAxis();

        parent_svg.on("click", function () {transitionPartyVotingPerc(0)}); // click on background from main screen gives election results nationwide.

        var bars = svg.selectAll(".bar").data(votingDataByCluster);

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
            transitionPartyVotingPerc(i+1);
            d3.event.stopPropagation();
        });

        bars.transition()
            .duration(TRANSITION_TIME)
            .attr("x", function(d) { return xScale(d.key); })
            .attr("width", xScale.rangeBand())
            .attr("y", function(d) { return yScale(d.values.voting); })
            .attr("height", function(d) { return height - yScale(d.values.voting); })
            .style("fill", function (d) {return colorIntrepulate(d.values.rightAttribute)})
        ;

        d3.selectAll(".tick")
            .style("opacity", 1);
    });
}