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





    });
}




//find out why is table shrinking(CSS)
$(function() {
    var text = $('#filter').val();

    $('#filter').keyup(function() {
        if ($('#filter').val() != text) {
            text = $('#filter').val();
            console.log('Content has been changed ' + text);
            var rows = document.getElementById("myTable").rows;
            //var str = rows[1].cells[1].innerHTML.indexOf("s");
            filterRows(text, rows);
        }
    });
});

function filterRows(text, rows) { //attach to 'changed()' event , and filter rows that doesnt contain form.input.innerText
    //iterate through all row while this is the LAST call to the function
    for (var i = 0; i < rows.length; ++i) {
        var keepRow = false;// keep row only if substring exist in the row
        for (var j = 0; j < rows[i].cells.length && !keepRow; ++j) {
            if (rows[i].cells[j].innerHTML.indexOf(text) !== -1){
                keepRow = true;// found the substring in one of the columns
            }
        }
        if (i != 0) {
            if (keepRow) {
                rows[i].style.display = "inherit";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}
