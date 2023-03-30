const searchAnime = () => {
  $("#anime-list").html("");

  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "b60ea209",
      s: $("#search-input").val(),
    },
    success: (result) => {
      if (result.Response == "True") {
        let animes = result.Search;

        $.each(animes, (i, data) => {
          $("#anime-list").append(
            `
            <div class=" col-md-4">
                <div class="card border-info mb-2">
                    <img src="` +
              data.Poster +
              `" class="card-img-top img-fluid" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">` +
              data.Title +
              `</h5>
                  <h6 class="card-subtitle mb-3 text-body-primary">` +
              data.Year +
              `</h6>
                  <a href="#" class="card-link text-decoration-none detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id ="`+ data.imdbID +`">Detail</a>
                </div>
            </div>
          </div>
          `
          );
        });

        $("#search-input").val("");
      } else {
        $("#anime-list").html(
          `
        <div class="col">
            <h1 class="text-center">` +
            result.Error +
            `</h1>
        </div>
        `
        );
      }
    },
  });
};

$("#search-button").on("click", () => {
  searchAnime();
});

$("#search-input").on("keyup", (e) => {
  if (e.which === 13) {
    searchAnime();
  }
});


$('#anime-list').on('click','.detail' , function () {
 
  $.ajax ({
      url : 'http://omdbapi.com',
      type : 'get',
      dataType : 'json',
      data :{
        'apikey' : 'b60ea209',
        'i' : $(this).data('id')
      },
      success: function (anime) {
        if ( anime.Response == "True")


        $('.modal-body').html(`
        
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4">
                <img src="`+anime.Poster+`" class="img-fluid" alt="">
              </div>
              <div class="col-md-8">
                  <ul class="list-group">
                  <li class="list-group-item">Released : `+anime.Title+`</li>
                  <li class="list-group-item">Genre : `+anime.Genre+`</li>
                  <li class="list-group-item">Plot : `+anime.Plot+`</li>
                  <li class="list-group-item">Ratings : `+anime.Ratings[0].Value+`</li>
                    
                  </ul>
              </div>
            </div>
          </div>
        `)

      }


  })

})

