function generateCityPopulationTableData(data){
    var cityPopulationTableData = data.map(function(d){ return [d.city , d.population];}); //filtering data
    console.log("cityPopulationTableData data:");
    console.log(cityPopulationTableData);

    var form = document.getElementById("filterTable-input");
    form.setAttribute("data-type","search");
    form.setAttribute("placeholder","placeholder");

    var table = document.getElementById("myTable");

    for(var i = 0; i < cityPopulationTableData.length ; i++){ //generating table rows
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = i;
        cell2.innerHTML = cityPopulationTableData[i][0];
        cell3.innerHTML = cityPopulationTableData[i][1];
    }

    var header = table.createTHead(); //generating table headers
    var row = header.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = "<b>מספר</b>";
    cell2.innerHTML = "<b>עיר</b>";
    cell3.innerHTML = "<b>אוכלוסיה</b>";
}
