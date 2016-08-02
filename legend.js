var legendExist = false;
var legendLabels = [
    ["ימין-", "שמאל-" ,  "קו אדום" , "קו אפור"],
    ["right-", "left-", "red line" , "grey line"]
];


function legend() {


    if (!legendExist) { /*rect(surrounding legend) attributes and style */
        var rectTransfrom = "translate(" + (margin.left + width - 100 ) + "," + (margin.top - 10) + ")";
        var rectBorderColor = "rgb(87, 114, 234)";
        var rectBorderWidth = 2;
        var rectOpacity = 0.0001;
        var rectWidth = 95;
        var rectHeight = 220;

        /*legend attributes and style*/
        var fontFamily = "Times New Roman";

        var legendWidth = 20;
        var legendHeight = 140;
        var legendTransfrom = "translate(" + (margin.left + width - 40) + "," + (margin.top) + ")";

        var rectAboveLegend = parent_svg
            .append("g")
            .append("rect")
            .attr("transform", rectTransfrom)
            .style("width", rectWidth)
            .style("height", rectHeight)
            .style("stroke", rectBorderColor)
            .style("stroke-width", rectBorderWidth)
            .style("fill-opacity", rectOpacity);

        var legend = parent_svg
            .append("g")
            .attr("id", "legend")
            .attr("transform", legendTransfrom)
            .append("rect")
            .attr("width", legendWidth)
            .attr("height", legendHeight)
            .style("fill", "url(#linear-gradient)");



        var legendGroupTag = parent_svg.select("#legend");

        legendGroupTag.append('text') //right
            .attr('x', -27)
            .attr('y', 12)
            .attr('id', 'legendText0')
            .style("font-family", fontFamily)
            .text(legendLabels[language][0]);

        legendGroupTag.append('text') //left
            .attr('x', -37)
            .attr('y', legendHeight - 3)
            .attr('id', 'legendText1')
            .style("font-family", fontFamily)
            .text(legendLabels[language][1]);


        var dashedLineOneY = legendHeight + 23 - 5;
        var dashedLinesX1 = 0;
        var dashedLinesX2 = legendWidth + 5;

        legendGroupTag.append('text') //dashed line 1 text
            .attr('x', -37)
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
            .style("stroke", dashedLineAhuzHasimaColor);

        var dashedLineTwoY = legendHeight + 23;
        legendGroupTag.append('text') //dashed line 2 text
            .attr('x', -37)
            .attr('y', legendHeight + 42)
            .attr('id', 'legendText3')
            .style("font-family", fontFamily)
            .text(legendLabels[language][3]);

        legendGroupTag.append("line")//dashed line 2
            .attr("x1", dashedLinesX1)
            .attr("x2", dashedLinesX2)
            .attr("y1", dashedLineOneY + 20)
            .attr("y2", dashedLineOneY + 20)
            .style("stroke-dasharray","5,5")//dashed array for line
            .style("stroke", dashedLineAverageColor);


        var defs = parent_svg.append("defs");
        var linearGradient = defs.append("linearGradient")
                    .attr("id", "linear-gradient");

        linearGradient
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "0%")
                .attr("y2", "100%");
        linearGradient.selectAll("stop")
                .data([
                    colorIntrepulate(1),
                    colorIntrepulate(0.75),
                    colorIntrepulate(0.50),
                    colorIntrepulate(0.25),
                    colorIntrepulate(0)])
            .enter().append("stop")
            .attr("offset", function (d, i) {return i / 4;})
            .attr("stop-color", function (d) { return d; });

        legendExist = true;
    } else {
        $("#legendText0")[0].innerHTML = legendLabels[language][0];
        if(language == 0){//hebrew
            $("#legendText0").attr('x','-27');

        }else if(language == 1){ //english
            $("#legendText0").attr('x','-40');
        }
        $("#legendText1")[0].innerHTML = legendLabels[language][1];
        $("#legendText2")[0].innerHTML = legendLabels[language][2];
        $("#legendText3")[0].innerHTML = legendLabels[language][3];
    }
}

