$(document).ready(function () {
    google.charts.load('current', {'packages':['bar','corechart']});
   // google.charts.setOnLoadCallback(drawChartBar);
   // google.charts.setOnLoadCallback(drawChartPie);
    getPlaylists();
    getCanciones();
    
});
var flagBar=false;
var flagPie=false;
var datos;

function getPlaylists(){
     $.ajax({
        type: "get",
        url: "http://localhost:1337/playlists",
        dataType: "json",
        success: function (response) {
            flagBar=true;
            datos=response;
            google.charts.setOnLoadCallback(drawChartBar);
         }
    });
}
var datosPie='';
function getCanciones(){
    var html='';
    $.ajax({
        type: "GET",
        url: "http://localhost:1337/cancions/",
        dataType: "json",
        success: function (data) {
                flagPie=true;
                datosPie=data;
                google.charts.setOnLoadCallback(drawChartPie);
        }
    });
}

function drawChartBar() {
    
    var data = new google.visualization.DataTable();
    data.addColumn('string','Nombre de Playlist');
    data.addColumn('number','Cantidad de canciones');
      
    for(i in datos){
        data.addRow([datos[i].nombre,datos[i].cancions.length]);
    }

    var options = {
        chart: {
            title: 'Cantidad de canciones agregadas por playlist. ',
            subtitle: 'Preferencia de Playlist más usada según cantidad de canciones',
          },
        bars: 'horizontal' // Required for Material Bar Charts.
        };
        if(flagBar){
            flagBar=false;
            var chart = new google.charts.Bar(document.getElementById('barchart_material'));
            chart.draw(data, google.charts.Bar.convertOptions(options));
    }
        }
function drawChartPie() {
    var data = new google.visualization.DataTable();
    data.addColumn('string','Nombre de Playlist');
    data.addColumn('number','Cantidad de canciones');
    var artistas=new Array();
    var occurrencia=new Array();
    for(i=0;i<datosPie.length;i++){
        artistas[i]=datosPie[i].artista;
    }
    var artistasSet=new Set(artistas);
    artistasSet.forEach(artista => {
        contador=0;
        for(j=0;j<artistas.length;j++){
            if(artistas[j]==artista) contador++;
        }
        data.addRow([artista,contador]);
    });

    var options = {
      title: 'Artistas más gustados según canciones guardadas'
    };

    if(flagPie) {
        flagPie=false;
        var chart2 = new google.visualization.PieChart(document.getElementById('piechart'));

        chart2.draw(data, options);
    }
  }