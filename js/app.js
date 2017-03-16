!function() {
  $(document).ready(function(){
    $("form").submit(function(event){
      event.preventDefault();
      var searched = $("#search").val();
      var data = {
          type : "album",
          query : searched,
          limit : 16,
          offset : 0
      };
      var url = "https://api.spotify.com/v1/search";
      function displayAlbums(data) {
        var printHTML = "";
        if (data.albums.items.length > 0) {
          $.each(data.albums.items, function(i, album) {
              printHTML += '<li><div class="album-wrap">';
              printHTML += '<a href="album.html?id='+ album.id +'">';
              printHTML += '<img class="album-art" src='+album.images[0].url+'></a></div>';
              printHTML += '<span class="album-title">'+album.name+'</span>';
              printHTML += '<span class="album-artist">';
              printHTML += album.artists[0].name;
              if (album.artists.length > 1) {
                for (var i = 1; i < album.artists.length; i++) {
                  printHTML += ', ' + album.artists[i].name;
                }
              }
              printHTML += '</span></li>';
          });
        } else {
          printHTML += '<li class="no-albums"><i class="material-icons icon-help">help_outline</i>';
          printHTML += 'No albums found that match: '+searched+'.</li>';
        }
        $("#albums").empty();
        $("#albums").append(printHTML);
      };
      $.getJSON(url, data, displayAlbums);
    });   //End submit EH
  });   //End ready
}(); //End function module
