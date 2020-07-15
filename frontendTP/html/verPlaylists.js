var song=[];
function getPlaylists(){
    $.ajax({
        type: "get",
        url: "http://localhost:1337/playlists",
        dataType: "json",
        success: function (datos) {
            song=[];
            console.log(datos);
            var html='<br><h1 style="margin-left: 35px;font-size: 36px;">Visualización de Playlists</h1>';
            for (i=0;i<datos.length;i++){
                for (j=0;j<datos[i].cancions.length;j++){
                    song.push([i,datos[i].cancions[j]]);
                }
                nombrePlaylist=datos[i].nombre;
                urlImagen="http://localhost:1337"+datos[i].imagen;
                html+=
                `<div id="${i}" class="playlist" onclick="getPlaylistSongs(this.id,' ${nombrePlaylist}')">
                <img id="imagen${i}" src="img/playlist.png" alt="">
                <span class="track" id="nombre${i}">${nombrePlaylist}</span>
                </div>`;
            }
            $("#verPlaylistsCancionesContainer").html(html)
        }
    });
}
function getPlaylistSongs(playlist_id,nombrePlaylist){
    var html=`<br><h1 style="margin-left: 35px; font-size: 36px;">Canciones de la Playlist: <span style="color:rgb(161, 50, 50);">${nombrePlaylist}</span></h1>`;
        $.each(song , function (index, value) {
            console.log( index + ' : ' + value );
        });
        for (i=0;i<song.length;i++){
            if(song[i][0]==playlist_id){
                nombreArtista=song[i][1].artista;
                nombreCancion=song[i][1].nombre;
                urlImagen=song[i][1].imagen;
                console.log("IMAGEN URL: "+urlImagen);
                html+=
                `<div class="cancion">
                <img id="urlImagen${i}" src="${urlImagen}" alt="">
                <span id="nombreArtista${i}">${nombreArtista}</span>
                <span class="track" id="nombreCancion${i}" data-filter-name=${nombreCancion}>${nombreCancion}</span>
                </div>`;
            }
        }
        $("#verPlaylistsCancionesContainer").html(html);
}