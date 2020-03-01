function searchMovie() {
    $('#movie-list').html('');
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : '3ff1e3f0',
            's' : $('#search-input').val()
        },
        
        success: function(result) {
            if(result.Response == "True") {

                let movies = result.Search;

                $.each(movies, function(i, data) {
                    $('#movie-list').append(`
                    <div class="col-md-4">
                        <div class="card mb-3">
                            <img src="`+ data.Poster +`" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">`+ data.Title +`</h5>
                            <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="text-primary see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID +`">See Detail</a>
                            </div>
                        </div>
                    </div>
                    `) 
                });

                $('#search-input').val('')

            } else {
                $('#movie-list').html(`
                    <h1 class="text-center">`+ result.Error +`</h1>
                `)
            }
        }
    });
}

$('#search-button').on('click', function() {
    searchMovie();
});

$('#search-input').on('keyup', function(e) {
    if(e.which === 13) {
        searchMovie();
    }
});

$('#movie-list').on('click', '.see-detail', function() {
    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey': '3ff1e3f0',
            'i': $(this).data('id')
        },
        success: function(movie) {
            if( movie.Response === "True") {

                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+ movie.Poster +`" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item"><h3>`+ movie.Title +`</h3></li>
                                <li class="list-group-item">Released : `+ movie.Released +`</li>
                                <li class="list-group-item">Genre : `+ movie.Genre +`</li>
                                <li class="list-group-item">Director : `+ movie.Director +`</li>
                                <li class="list-group-item">Writer : `+ movie.Writer +`</li>
                                <li class="list-group-item">Actors : `+ movie.Actors +`</li>
                                <li class="list-group-item">Language : `+ movie.Language +`</li>
                                <li class="list-group-item">Country : `+ movie.Country +`</li>
                                <li class="list-group-item">Awards : `+ movie.Awards +`</li>
                                <li class="list-group-item">IMDb Rating : `+ movie.imdbRating +`</li>
                            </ul>
                            </div>
                        </div>
                    </div>
                `)

            }
        }
    })
});