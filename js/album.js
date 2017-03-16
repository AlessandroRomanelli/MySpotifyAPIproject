!function() {
  function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)  {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  }
  $(document).ready(function(){
    var queryStr = getUrlVars();
    var data = {};
    var url = "https://api.spotify.com/v1/albums/"+queryStr.id;
    function displayAlbums(albumData) {
      var albumTitle = albumData.name,
          albumArtist = albumData.artists[0].name,
          releaseDate = albumData.release_date.substring(0,4),
          albumUndertitle = albumArtist + " (" + releaseDate + ")",
          imgURL = albumData.images[0].url,
          albumURL = albumData.external_urls.spotify;
          titleHTML = "<h1>"+albumTitle+" ("+releaseDate+")</h1><span>"+albumArtist+"</span>",
          tracksHTML = "<ol><h2>Tracklist:</h2>";
      $.each(albumData.tracks.items, function(i, song) {
        tracksHTML += "<li>"+song.name+"</li>";
      });
      tracksHTML += "</ol>";
      $(".album-image a").attr("href", albumURL);
      $("#album-img").attr("src", imgURL);
      $("#main-title").html(titleHTML);
      $("#tracks").html(tracksHTML);
    }
    $.getJSON(url, data, displayAlbums);
  });   //End ready
}(); //End function module
