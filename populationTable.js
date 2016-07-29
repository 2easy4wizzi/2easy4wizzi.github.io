function generateCityPopulationTableData(){
    console.log("generateCityPopulationTableData" + " - יצירת טבלת ערים");
    d3.json("data-set-elections/electionAndEconomicData.json", function(error, data) {
        if (error) throw error;



        header_data = data.splice(0,3);
        tableHeaders = [ "<b>מספר</b>" , "<b>עיר</b>" , "<b>אוכלוסיה</b>" ,"<b>קלאסטר</b>" ];
        var cityPopulationTableData = data.map(function(d,i){ return [i ,d.city , d.population , d.cluster];}); //filtering data
        cityPopulationTableData.unshift(tableHeaders);

        var table = document.getElementById("myTable");
        var header = table.createTHead();
        var body   = table.createTBody();

        for(var i = 0; i < cityPopulationTableData.length ; i++){ //generating table rows
            var row = (i==0) ?  header.insertRow(-1) : body.insertRow(-1);
            row.setAttribute("class", "tableRow");
            row.setAttribute("id", "idRow");
            for (var j = 0; j < cityPopulationTableData[i].length ; j++) {
                var cell = row.insertCell(j);
                cell.innerHTML = cityPopulationTableData[i][j];
            }
        }

        var classTableAndFilter = d3.select("#filterTag")
            .append("form")
            .append("input")
            .attr("id","filter")
            .attr("data-type","search")
            .attr("placeholder","gilad");



    });
}
function filterRows() { //attach to 'changed()' event , and filter rows that doesnt contain form.input.innerText


    var temprows = document.getElementById("mytab1").rows;
    console.log(temprows); // this is working
    var rows = document.getElementById("myTable").rows;
    console.log(rows); // this is givving HTML collection[0];


    //maybe its a problem of order of the script in comapareson to the table being built





    /*
     var substring = "קר";
     for (var i = 0; i < rows.length; ++i) {
     console.log(row[i]);
     if (rows[i].indexOf(substring) !== -1)
     rows[i].style.display = "inherit";
     else
     rows[i].style.display = "none";
     }
     */
}
