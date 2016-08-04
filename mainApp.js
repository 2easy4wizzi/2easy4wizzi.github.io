var language = 0; // 0 is Hebrew , 1 is English

setHTMLtext(language);

const TRANSITION_TIME = 500;

var colorIntrepulateFunc = d3.interpolateGnBu;

const dashedLineAverageColor = "grey";
const dashedLineAhuzHasimaColor = "red";

const qTipViewText = [
    {
        view1: "<p style='direction: rtl'>" +
            "לחיצה על עמודה: התפלגות ההצבעה עבור אותו קלאסטר\<br\>לחיצה על הרקע: מעבר לתוצאות בחירות ארציות" +
            "</p>",
        view2: "<p style='direction: rtl'>" +
            "לחיצה על עמודה: התפלגות ההצבעה עבור אותה מפלגה\<br\>לחיצה על הרקע: חזרה" +
            "</p>",
        view3: "<p style='direction: rtl'>" +
            "לחיצה על עמודה: התפלגות ההצבעה עבור אותו קלאסטר\<br\>לחיצה על הרקע: חזרה" +
            "</p>"
    },
    {
        view1: "Click on bar: Election results for selected cluster\<br\>Click on background: Nationwide election results",
        view2: "Click on bar: Distribution of votes for selected party\<br\>Click on background: Back",
        view3: "Click on bar: Election results for selected cluster\<br\>Click on background: Back"
    }
];

var margin = {top: 35, right: 20, bottom: 30, left: 45},
    legendWidth = 100,
    width = 960 - margin.left - margin.right - legendWidth,
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
    .attr("width", width + legendWidth + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var title = parent_svg.append("text")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "22px")
    .style("text-decoration", "underline");

var svg = parent_svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var text = [" :הצבעה", "voting: "];
var str1;
var str2;

if (language == 0) { // hebrew - direction
    str1 = "";
    str2 = "\<strong\>" + text[0] + "\</strong\>";
} else if (language == 1) { //english - direction
    str1 = "\<strong\>" + text[1] + "\</strong\>";
    str2 = "";
}
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d) {
        var value = (checkShowPercent() ? d3.format(".1%")(d.values.voting) : d3.format(".2s")(d.values.voting));
        return str1 + "<span style='color:red'>"  + value  + "</span>" + str2 ;
    });
parent_svg.call(tip);

function changeToolTipText() {
    if (language == 0) { // hebrew
        str1 = "";
        str2 = "\<strong\>" + text[0] + "\</strong\>";
    } else if (language == 1) { //english
        str1 = "\<strong\>" + text[1] + "\</strong\>";
        str2 = "";
    }
}

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
legend();
generateCityPopulationTableData();

function checkShowPercent() {
    return d3.select('input[name="mode"]:checked').property("value") == "percent";
}

function checkLanguage() {
    var languageButton = d3.select('input[name="lan"]:checked').property("value");
    if(languageButton == "hebrew") return 0;
    else if(languageButton == "english") return 1;
    else return -1;
}

function changeAxis(domainMax) {
    showPercent = checkShowPercent();
    if (domainMax < 0.1) {
        yAxis.tickFormat(d3.format('.1%'));
    } else {
        yAxis.tickFormat(d3.format(showPercent ? "%" : "s"));
    }
    yAxis.outerTickSize(0);
    svg.select('.x.axis').transition().duration(TRANSITION_TIME).call(xAxis);
    svg.select('.y.axis').transition().duration(TRANSITION_TIME).call(yAxis);
    var text = [ ["מצביעים באחוזים" , "מצביעים"] ,["votes in percentage" , "votes"]];
    svg.select('#y-axis-text').text(showPercent ? text[language][0] : text[language][1]);
}

function onLanguageChange(toolText) {
    language = checkLanguage();
    setHTMLtext(language);
    generateCityPopulationTableData();
    changeToolTipText();
    changeToolQuestionMarkTipText(toolText);
    legend();
}