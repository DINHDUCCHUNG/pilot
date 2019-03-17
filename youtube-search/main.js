$(document).ready(() => {
  const textSearch = document.getElementById("keyword");
  textSearch.addEventListener("input", event => {
    document.getElementById("result-list").innerText = "";
  });

  //DEBOUNCE
  var typingTimer; //id settimeout
  var doneTypingInterval = 1000;

  //on keyup: start the countdown
  $("#keyword").on("keyup", () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  });

  //on keydown: clear the countdown
  $("#keyword").on("keydown", () => {
    clearTimeout(typingTimer);
  });

  //when donetyping:
  function doneTyping() {
    const keySearch = document.getElementById("search");
    const contentSearch = keySearch.keyword.value;
    console.log(contentSearch);
    $.ajax({
      url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${contentSearch}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
      type: "GET",
      success: data => {
        console.log(data);
        if (data != null) {
          data.items.forEach(item => {
            const itemLink = `
                    <a href="" class="result col-md-12">
                    <div class="row">
                        <div class='col-4'>
                            <img src="${
                              item.snippet.thumbnails.medium.url
                            }" alt="">
                        </div>
                        <div class="col-8">
                            <h2 class="title text-body">${
                              item.snippet.title
                            }</h2>
                            <p class="description">${
                              item.snippet.description
                            }</p>
                        </div>
                    </div>
                    </a>
                    `;
            $("#result-list").append(itemLink);
          });
        } else {
          document.getElementById("result-list").innerText = "NOT FOUND";
        }
        let nextPageToken = data.nextPageToken;
        // SCROLL PAGINATION
        let requiredContainerHeight = document.documentElement.offsetHeight;
        const viewportHeight = document.documentElement.clientHeight;
        let hiddenHeight = requiredContainerHeight - viewportHeight;
        let plusHeight = requiredContainerHeight - 1003;
        console.log(
          requiredContainerHeight,
          viewportHeight,
          hiddenHeight,
        );
        window.addEventListener("scroll", e => {
          e.preventDefault();
          console.log(window.scrollY);
          if (window.scrollY >= hiddenHeight) {
            $.ajax({
              url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${contentSearch}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${nextPageToken}`,
              type: "GET",
              success: data => {
                console.log(data);
                if (data != null) {
                  data.items.forEach(item => {
                    const itemLink = `
                      <a href="" class="result col-md-12">
                      <div class="row">
                          <div class='col-4'>
                              <img src="${
                                item.snippet.thumbnails.medium.url
                              }" alt="">
                          </div>
                          <div class="col-8">
                              <h2 class="title text-body">${
                                item.snippet.title
                              }</h2>
                              <p class="description">${
                                item.snippet.description
                              }</p>
                          </div>
                      </div>
                      </a>
                      `;
                    $("#result-list").append(itemLink);
                  });
                } else {
                  document.getElementById("result-list").innerText =
                    "NOT FOUND";
                }
                nextPageToken = data.nextPageToken;
                hiddenHeight += plusHeight;
              },
              error: error => {
                console.log(error);
              }
            });
          }
        });
      },
      error: error => {
        console.log(error);
      }
    });
  }
});
