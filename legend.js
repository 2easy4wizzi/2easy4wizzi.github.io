function legend() {
    var legendLabels = ["ימין-", "שמאל-"];

    var legendWidth = 20;
    var legendHeight = 140;

    var rectAboveLegend = parent_svg
            .append("g")
            .append("rect")
            .attr("id", "x")
            .attr("transform", "translate(" + (margin.left + width - 100 ) + "," + (margin.top - 10) + ")")
            .style("width", "95")
            .style("height", "160px")
            .style("stroke", "rgb(87, 114, 234)")
            .style("stroke-width", "2")
            .style("fill", "white")
            .style("fill-opacity", "0.0001")
        ;

    var legend = parent_svg
        .append("g")
        .attr("id", "legend")
        .attr("transform", "translate(" + (margin.left + width - 40) + "," + (margin.top) + ")")
        .append("rect")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "url(#linear-gradient)")

    var legendGroupTag = parent_svg.select("#legend");
    legendGroupTag.append('text')
        .attr('x', -24)
        .attr('y', 12)
        .style("font-family", "Times New Roman")
        .text(legendLabels[0]);
    legendGroupTag.append('text')
        .attr('x', -37)
        .attr('y', legendHeight - 3)
        .style("font-family", "Times New Roman")
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

