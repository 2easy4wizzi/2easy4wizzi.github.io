function transitionPartyVotingPerc(inputClusterNumber) {

    d3.selectAll('input[name="lan"]').on("change", function() {
        onLanguageChange(qTipViewText[checkLanguage()].view2);
        transitionPartyVotingPerc(inputClusterNumber);
    });

    changeToolQuestionMarkTipText(qTipViewText[checkLanguage()].view2); // need to set QTip to info about this view
    showPercent = checkShowPercent();
    var precentView = showPercent ? "precentView" : "absoluteView";
    var description = (inputClusterNumber ) ? " - תוצאות עבור אשכול בודד" : " - תוצאות כלליות של בחירות 2015 לפי מפלגות";
    // console.log("view 1");
    // console.log(precentView + ": transitionPartyVotingPerc, cluster:" + inputClusterNumber + description);
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
                var pair = [key , languagePartiesHeadersDictionary[key][language]];
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

        var prefixH = inputClusterNumber  ? " (אשכול " + inputClusterNumber : "(תוצאות ארציות סופיות";
        var suffixH = showPercent  ? "(אחוזים" : "(מספר הצבעות";
        var titleTextHebrew = prefixH + " " + suffixH;

        var prefixE = inputClusterNumber  ? "Cluster " + inputClusterNumber : "Nationwide election results";
        var suffixE = showPercent  ? "(percentage)" : "(number of votes)";
        var titleTextEnglish = prefixE + " " + suffixE;


        var titleText = [titleTextHebrew , titleTextEnglish];

        title.transition()
            .duration(TRANSITION_TIME)
            .text(titleText[language]);


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
            .attr("style", 'stroke:' + dashedLineAhuzHasimaColor + ';stroke-width:2;stroke-dasharray: 10;')
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
                transitionPartyVotingPercentPerCluster(d.values.party_field_name, inputClusterNumber);
                d3.event.stopPropagation();
            })
        ;

        bars.transition()
            .duration(TRANSITION_TIME)
            .attr("x", function(d) { return xScale(d.key); })
            .attr("width", xScale.rangeBand())
            .attr("y", function(d) { return yScale(d.values.voting); })
            .attr("height", function(d) { return height - yScale(d.values.voting); })
            .style("fill", function (d) {return colorIntrepulateFunc(d.values.right_dist)})
            .style("fill-opacity", 1)
            ;
    });
}
