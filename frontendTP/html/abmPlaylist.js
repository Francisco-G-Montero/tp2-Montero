$(document).ready(function () {
    listarPlaylists();
    getCanciones();
});
var playlistUrlImage='/uploads/playlist_6965112210.png';
function listarPlaylists(){
    var html='';
    var htmlPlaylistSelect=''
    $.ajax({
        type: "GET",
        url: "http://localhost:1337/playlists",
        dataType: "json",
        success: function (data) {
            data.forEach(playlist => {
                html+=`
                <tr id="row${playlist.id}">
                    <th scope="row">${playlist.id}</th>
                    <td>${playlist.nombre}</td>
                    <td id="cantidad${playlist.id}">${playlist.cancions.length}</td>
                    <td>
                        <button id="${playlist.id}" type="button" class="btn btn-danger" onclick="borrarPlaylist(this.id);">Eliminar</button>
                    </td>
                </tr>
                `;
                htmlPlaylistSelect+=`<option value="${playlist.id}">${playlist.nombre}</option>`
            });   
         $("#playlistTabla").append(html);
         $("#playlistSelect").append(htmlPlaylistSelect);
        }
           
    });
}
function borrarPlaylist(playlist_id){
    $.ajax({
        type: "DELETE",
        url: `http://localhost:1337/playlists/${playlist_id}`,
        success: function (response) {
            $(`#row${playlist_id}`).remove();
            $(`#option${playlist_id}`).remove();
        },error: function(err){
            console.log(err);
        }
    });
}
function getCanciones(){
    var html='';
    $.ajax({
        type: "GET",
        url: "http://localhost:1337/cancions/",
        dataType: "json",
        success: function (data) {
            data.forEach(cancion => {
                html+=`<option value="${cancion.id}">${cancion.nombre} ${cancion.artista}</option>`;
            });
            $("#cancionSelect").append(html)
        }
    });
}
function crearPlaylist(){
    var nombre=$("#crearPlaylistNombre").val();
    $("#crearPlaylistNombre").val("");
    if(nombre!=''){
        $.ajax({
            type: "POST",
            url: "http://localhost:1337/playlists/",
            data:{
                nombre: nombre,
                imagen: playlistUrlImage,
            },
            success: function (playlist) {
                var html=`
                <tr id="row${playlist.id}">
                    <th scope="row">${playlist.id}</th>
                    <td>${playlist.nombre}</td>
                    <td id="cantidad${playlist.id}">${playlist.cancions.length}</td>
                    <td>
                        <button id="${playlist.id}" type="button" class="btn btn-danger" onclick="borrarPlaylist(this.id);">Eliminar</button>
                    </td>
                </tr>
                `;
                $("#playlistSelect").append(`<option id="option${playlist.id}" value="${playlist.id}">${playlist.nombre}</option>`);
                $("#playlistTabla").append(html);
            },error: function(err){
                console.log(err);
            }
        });
    }
}
function asignarCanciones(){
    var datos={
        cancions: $("#cancionSelect").val(),
    }
    var playlist_id=$("#playlistSelect").val();
    if(playlist_id!=''){
        $.ajax({
            type: "PUT",
            url: `http://localhost:1337/playlists/${playlist_id}`,
            data: datos,
            success: function (data) {
                $(`#cantidad${playlist_id}`).html(data.cancions.length);
                 console.log(data);
                 console.log(data.cancions.length)
            }
        });
    }
  
}