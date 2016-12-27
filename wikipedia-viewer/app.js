  // IIFE - Immediately Invoked Function Expression
  (function(index) {

      // The global jQuery object is passed as a parameter
      index(window.jQuery, window, document);

      }(function($, window, document) {
          var LIMIT = 10;
          var API_URL = "http://en.wikipedia.org/w/api.php?action=opensearch&namespace=0&format=json&profile=normal&limit=" + LIMIT + "&search="

          function makeSearchRequest(keyword) {
              var promises = $.ajax({
                  url: API_URL + keyword,
                  type: "GET",
                  dataType: "jsonp"
              });

              return promises;
          }

          function constructSearchResult(keyword){
              $('#loader').show();
              $('#search-result').empty();
              makeSearchRequest(keyword).done(function(data) {
                  var searchResult = "";
                  var title = data[1];
                  var description = data[2];
                  var link = data[3];
                  for (var i = 0; i < LIMIT; i++) {
                      searchResult = "";
                      searchResult = $([
                          '<a href="' + link[i] + '" target="_blank">',
                          '  <div class="card-panel hoverable z-depth-5">',
                          '    <h5>' + title[i] + '</h5>',
                          '    <p>' + description[i] + '</p>',
                          '  </div>',
                          '</a>'
                      ].join("\n"));
                      $('#search-result').append(searchResult[0]);
                  }
                  $('#loader').hide();
              });
          }

          // The DOM is ready!
          $(function() {
              $('#loader').hide();

              $('#search-button').click(function(){
                  var keyword = $('#search-text').val();
                  constructSearchResult(keyword);
              });

              $('#search-text').keyup(function(e) {
                  if (e.keyCode === 13) {
                    var keyword = $('#search-text').val();
                    constructSearchResult(keyword);
                  }
              })
          });

          // The rest of your code goes here!
      }
  ));