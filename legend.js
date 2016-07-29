function legend() {

    /*rect(surrounding legend) attributes and style */
    var rectTransfrom = "translate(" + (margin.left + width - 100 ) + "," + (margin.top - 10) + ")";
    var rectBorderColor = "rgb(87, 114, 234)";
    var rectBorderWidth = 2;
    var rectOpacity = 0.0001;
    var rectWidth = 95;
    var rectHeight = 160;

    /*legend attributes and style*/
    var fontFamily = "Times New Roman";
    var legendLabels = ["ימין-", "שמאל-"];
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
    legendGroupTag.append('text')
        .attr('x', -24)
        .attr('y', 12)
        .style("font-family", fontFamily)
        .text(legendLabels[0]);

    legendGroupTag.append('text')
        .attr('x', -37)
        .attr('y', legendHeight - 3)
        .style("font-family", fontFamily)
        .text(legendLabels[1]);

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
            colorIntrepulate(0)
        ])
        .enter().append("stop")
        .attr("offset", function (d, i) {
            return i / 4;
        })
        .attr("stop-color", function (d) {
            return d;
        });
}

