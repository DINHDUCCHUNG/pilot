$(document).ready(() => {
  const pageURL = $(location).attr("href");
  let gameId = pageURL.split("/").pop();
  $.ajax({
    url: `/get-game-by-id/${gameId}`,
    type: "GET",
    success: data => {
      document.getElementById("player-name-1").innerText = data.player[0];
      document.getElementById("player-name-2").innerText = data.player[1];
      document.getElementById("player-name-3").innerText = data.player[2];
      document.getElementById("player-name-4").innerText = data.player[3];
    },
    error: error => {
      console.log(error);
    }
  });

  let count = 1;
  document.getElementById("add-round-button").addEventListener("click", e => {
    e.preventDefault();
    count = count + 1;
    const round = `<div class="row round-item">
        <div class="col-md-4">Round ${count}</div>
        <div class="col-md-2">
          <input type="text" aria-label="score1" class="input" name="player1round${count}score"/>
        </div>
        <div class="col-md-2">
          <input type="text" class="input" name="player2round${count}score" />
        </div>
        <div class="col-md-2">
          <input type="text" class="input" name="player3round${count}score" />
        </div>
        <div class="col-md-2">
          <input type="text" class="input" name="player4round${count}score"/>
        </div>
      </div>`;
    $("#round-list").append(round);
  });
  //listen round-list input
  const form = document.getElementById("round-list");
  let gameScore = [];
  document.getElementById("round-list").addEventListener("input", e => {
    gameScore = [];
    $("form#round-list :input").each(function() {
      var input = $(this); // This is the jquery object of the input, do what you will
      console.log(input);
      let result = input[0].value;
      gameScore.push(result);
    });
    console.log(gameScore);
    let score_1 = 0;
    let score_2 = 0;
    let score_3 = 0;
    let score_4 = 0;
    for(let i=0;i<gameScore.length;i++){
        if(i%4===0){
            score_1 = Number(score_1) + Number(gameScore[i]);
        }else if (i%4 ===1){
            score_2 = Number(score_2) + Number(gameScore[i]);
        }else if (i%4 == 2){
            score_3 = Number(score_3) + Number(gameScore[i]);
        }else{
            score_4 = Number(score_4) + Number(gameScore[i]);
        }
    }
    console.log('score',score_1,score_2,score_3,score_4);
    document.getElementById('score-1').innerText = score_1;
    document.getElementById('score-2').innerText = score_2;
    document.getElementById('score-3').innerText = score_3;
    document.getElementById('score-4').innerText = score_4;
  });
});
