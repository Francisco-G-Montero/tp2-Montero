var token='';
var audio;
$(document).ready(function(){
    $(".guardadoContainer").hide();
    $('#formBusqueda').on('submit', function (event) {
      event.preventDefault();
          
    });
 
    audio=$("#musicaBienvenida")[0];
    audio.volume=0.2;
    audio.loop=true;
    $.ajax({
        url:'http://localhost:1337/auth/local',
        method:"post",
        data:{
            identifier: 'api-user@example.com',
            password: '123456'
        },
        success:function(response){
            token=response.jwt;
        },
        error:function (req,status,err){
            console.log(err);

        }
    });   
    getSpotifyToken();
});
function reproducir(){
  audio.play();
}
function ocultar(element_id){
  $("#content > header").css({"visibility":"hidden"});  
  var id=element_id+"Container";
  $(`#${id}`).attr("hidden",false);
  console.log(element_id);
  $("#content > div").each(function(){
    if ($(this).attr("id")!=id) $(this).attr("hidden",true);
  });
  
  $("#verGraficosContainer").find("div object").remove()
  $("#ambPlaylistContainer").find("div object").remove()
  if(id=="verPlaylistsCancionesContainer"){
    getPlaylists();  
  }else if(id=="cancionesContainer"){
    $("#content > header").css({"visibility":"visible"});
    getTracks();
  }else if( id=="verGraficosContainer"){
    $("#verGraficosContainer").find("div").append(`<object data="html/graficos.html" type=""></object>`);
  }else if(id=="ambPlaylistContainer"){
    $("#ambPlaylistContainer").find("div").append(`<object data="html/abmPlaylist.html" type=""></object>`);
  }
}

var client_id = '91e749990e824925b57821ae3f4c4001'; // Mi client id
var client_secret = 'cb1a018daf454a3982f724ada821816b'; // Mi secret id

var spotifyToken='';
function getSpotifyToken(){
    var url = "https://accounts.spotify.com/api/token";
    var params = { grant_type: "client_credentials" };
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      headers: {
          'Authorization' : 'Basic ' + window.btoa(client_id+':'+client_secret) 
      },
      data: params,
      success: function(data) {
          spotifyToken=data.access_token;
      }
    });
} 
  $("#busquedaCancion").keyup = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      return false;
    }
  }
function getTracks(){
  var busqueda=$("#busquedaCancion").val();  
  console.log(busqueda);
  var url = `https://api.spotify.com/v1/search?q=${busqueda}&type=track`;
  $.ajax({
    url: url,
    type: 'get',
    dataType: 'json',
    content_type: "application/json",
    headers: {
        'Authorization' : 'Bearer '+spotifyToken
    },
    success: function(data) {
        console.log('success', data);
        var datos=data.tracks;
        var nombreArtista;
        var nombreCancion;
        var urlImagen;
        var html='<h2 style="color: rgb(145, 145, 145);">Para guardar la canción que le guste, solo hágale click al cartel</h2>';
        $("#urlImagen").attr("src",urlImagen);
        $("#nombreArtista").html(nombreArtista);
        $("#nombreCancion").text(nombreCancion);
        for (i=0;i<datos.items.length;i++){
          nombreArtista=datos.items[i].artists[0].name;
          nombreCancion=datos.items[i].name;
          urlImagen=datos.items[i].album.images[1].url;
          html+=
          `<div id="cancion${i}" class="cancion" onclick="guardarCancion(this.id)">
          <img src="img/check.png" class="check" hidden>
          <img id="urlImagen${i}" src="${urlImagen}" alt="">
          <span id="nombreArtista${i}">${nombreArtista}</span>
          <span class="track" id="nombreCancion${i}">${nombreCancion}</span>
          </div>`;
        }
        console.log('nombre artista',nombreArtista);
        console.log('nombre cancion',nombreCancion);
        console.log('imagen cancion',urlImagen);
        $(".cancionesContainer").html(html);
     
    }
  });
}

function guardarCancion(id){
  var cancion_id=id.charAt(id.length-1);
  datos={
    nombre:$(`#nombreCancion${cancion_id}`).text(),
    artista:$(`#nombreArtista${cancion_id}`).text(),
    imagen:$(`#urlImagen${cancion_id}`).attr("src")
  }
  console.log(datos);
  $.ajax({
    type: "POST",
    url: "http://localhost:1337/cancions/",
    data: datos,
    success: function (data) {
      guardadoExitoso(id);
    }
  });
}
function guardadoExitoso(cancion_id){
  $(`#${cancion_id}`).find(".check").attr("hidden",false);
  $(".guardadoContainer").slideDown();
  setTimeout(() => {
  $(".guardadoContainer").attr("bottom",$(window).height());
  $(".guardadoContainer").slideUp();
  }, 1500);
}