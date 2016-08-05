var legendExist = false;
var legendLabels = [
    ["ימין-", "שמאל-" ,  "ממוצע" , [ "אחוז","חסימה"]],
    ["right", "left", "average" , ["votes", "threshold"]]
];

var strQMarkTip;

function changeToolQuestionMarkTipText(text) {
    strQMarkTip = text;
}

var englishTextAlighnX = -54;
var hebrewRightX = -27;
var hebrewLefttX = -37;
var hebrewAVGX = -37;
var hebrewAhuzX = -32;
var hebrewHasimaX = -37;

function legend() {
    if (!legendExist) { /* rect(surrounding legend) attributes and style */

        var rectHeight = 220;

        /*legend attributes and style*/
        var fontFamily = "Times New Roman";

        var legendGroup = parent_svg
            .append("g")
            .attr("transform", "translate(" + (margin.left + width + 10) + "," + (50 + margin.top) + ")");
        legendGroup
            .append("rect")
            .style("width", 95)
            .style("height", 220)
            .style("stroke", "black")
            .style("stroke-width", 1)
            .style("fill-opacity", 0.0001)
        ;

        var legendWidth = 20;
        var legendHeight = 140;

        var legend = legendGroup
            .append("g")
            .attr("id", "legend")
            .attr("transform", "translate(" + (60) + "," + (15) + ")")
            .append("rect")
            .attr("width", legendWidth)
            .attr("height", legendHeight)
            .style("fill", "url(#linear-gradient)");

        var helpIconSize = 48;
        var helpIconBorderWidth = 1;
        var helpIconWidth = rectHeight/5;
        var helpIconBorderColor = "#55c1fd";
        var defs = parent_svg.append("defs");

        defs
            .append('svg:defs')
            .append("svg:pattern")
            .attr("id", "QMark")
            .attr("width", helpIconSize)
            .attr("height", helpIconSize)
            .append("svg:image")
            .attr("xlink:href", 'dependencies/images/QMark.gif')
            .attr("width", helpIconSize)
            .attr("height", helpIconSize)
            .attr("x", 0)
            .attr("y", 0);

        var qMarkTip = d3.tip()
            .attr('class', 'd3-tip-qmark')
            .offset([0, 0])
            .html(function(){return strQMarkTip})
            .direction('w');

        parent_svg.call(qMarkTip);

        parent_svg
            .append("circle")
            .attr("cx", (margin.left  + width + helpIconWidth))
            .attr("cy", (margin.top - 10 + 26))
            .attr("r", 25)
            .style("fill", "#fff")
            .style("fill", "url(#QMark)")
            .style("stroke-width", helpIconBorderWidth)
            .style("stroke", helpIconBorderColor)
            .on('mouseover', qMarkTip.show)
            .on('mouseout', qMarkTip.hide)
        ;

        var legendGroupTag = parent_svg.select("#legend");

        legendGroupTag.append('text') //right
            .attr('x', hebrewRightX)
            .attr('y', 12)
            .attr('id', 'legendText0')
            .style("font-family", fontFamily)
            .text(legendLabels[language][0]);

        legendGroupTag.append('text') //left
            .attr('x', hebrewLefttX)
            .attr('y', legendHeight - 3)
            .attr('id', 'legendText1')
            .style("font-family", fontFamily)
            .text(legendLabels[language][1]);


        var dashedLineOneY = legendHeight + 23 - 5;
        var dashedLinesX1 = 0;
        var dashedLinesX2 = legendWidth + 5;

        legendGroupTag.append('text') //dashed line 1 text
            .attr('x', hebrewAVGX)
            .attr('y', dashedLineOneY + 3)
            .attr('id', 'legendText2')
            .style("font-family", fontFamily)
            .text(legendLabels[language][2]);

        legendGroupTag.append("line")//dashed line 1
            .attr("x1", dashedLinesX1)
            .attr("x2", dashedLinesX2)
            .attr("y1", dashedLineOneY)
            .attr("y2", dashedLineOneY)
            .style("stroke-dasharray","5,5")//dashed array for line
            .style("stroke", dashedLineAverageColor);

        var dashedLineTwoY = legendHeight + 23;
        legendGroupTag.append('text') //dashed line 2 text
            .attr('x', hebrewAhuzX)
            .attr('y', legendHeight + 42)
            .attr('id', 'legendText3')
            .style("font-family", fontFamily)
            .text(legendLabels[language][3][0]);
        var dashedLineTwoY = legendHeight + 23;

        legendGroupTag.append('text') //dashed line 2 text - word number 2
            .attr('x', hebrewHasimaX)
            .attr('y', legendHeight + 54)
            .attr('id', 'legendText3word2')
            .style("font-family", fontFamily)
            .text(legendLabels[language][3][1]);

        legendGroupTag.append("line")//dashed line 2
            .attr("x1", dashedLinesX1)
            .attr("x2", dashedLinesX2)
            .attr("y1", dashedLineOneY + 20)
            .attr("y2", dashedLineOneY + 20)
            .style("stroke-dasharray","5,5")//dashed array for line
            .style("stroke", dashedLineAhuzHasimaColor);

        var linearGradient = defs.append("linearGradient")
                    .attr("id", "linear-gradient");

        linearGradient
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "0%")
                .attr("y2", "100%");
        linearGradient.selectAll("stop")
                .data([
                    colorIntrepulateFunc(1),
                    colorIntrepulateFunc(0.75),
                    colorIntrepulateFunc(0.50),
                    colorIntrepulateFunc(0.25),
                    colorIntrepulateFunc(0)])
            .enter().append("stop")
            .attr("offset", function (d, i) {return i / 4;})
            .attr("stop-color", function (d) { return d; });

        legendExist = true;
    } else {
        var rightText = $("#legendText0")[0];
        var leftText = $("#legendText1")[0];
        var averageText = $("#legendText2")[0];
        var ahuzText = $("#legendText3")[0];
        var hasimaText = $("#legendText3word2")[0];

        rightText.innerHTML = legendLabels[language][0];
        leftText.innerHTML = legendLabels[language][1];
        averageText.innerHTML = legendLabels[language][2];
        ahuzText.innerHTML = legendLabels[language][3][0];
        hasimaText.innerHTML = legendLabels[language][3][1];

        if(language == 0){//hebrew
            rightText.setAttribute('x',hebrewRightX);
            leftText.setAttribute('x',hebrewLefttX);
            averageText.setAttribute("x",hebrewAVGX);
            ahuzText.setAttribute("x",hebrewAhuzX);
            hasimaText.setAttribute("x",hebrewHasimaX);

        }else if(language == 1){ //english
            rightText.setAttribute('x',englishTextAlighnX);
            leftText.setAttribute('x',englishTextAlighnX);
            averageText.setAttribute("x",englishTextAlighnX);
            ahuzText.setAttribute("x",englishTextAlighnX);
            hasimaText.setAttribute("x",englishTextAlighnX);
        }
    }
}

