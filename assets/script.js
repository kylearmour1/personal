document.addEventListener("DOMContentLoaded", function(){
    var pages = document.querySelectorAll(".page");
    var currentPage = 0; 
    var timeLeft = 90;
    var timerInterval;
    var score = 0;
    
  
    pages[currentPage].style.display = "block";
  //creating start button and making sure page is hidden when clicked//
    var startButton = document.createElement("button");
    startButton.innerHTML = "Start";
    startButton.classList.add("start-button");
    startButton.addEventListener("click", function(){
      pages[currentPage].style.display = "none";
      currentPage++;
      pages[currentPage].style.display = "block";
      //start the timer//
      timerInterval = setInterval(function() {
        if(currentPage === 6) {
          clearInterval(timerInterval);
        }    
        timeLeft--;
        document.querySelector("#time-left").innerHTML = timeLeft;
        if(timeLeft <= 0 ){
          pages[currentPage].style.display = "none";
         
          clearInterval(timerInterval);
          currentPage = 6;
          pages[currentPage].style.display = "block";
        alert("Times Up!");
      } else{
  
      }
        
      
        
      }, 1000);
      
  
    });
    
    document.querySelector(".page").appendChild(startButton);
  
    for (var i = 1; i < pages.length; i++) {
      var timeLeft = 90;
      var answerButtons = pages[i].querySelectorAll(".answer-button");
      for(var j = 0; j < answerButtons.length; j++) {
        answerButtons[j].addEventListener("click", function() {
          if (this.id ==="correct"){
            score++;
            var alert = document.querySelector("#alert-box");
            alert.innerHTML = "Correct!";
            alert.classList.add("alert-success");
            alert.style.display = "block";
            setTimeout(function(){
              alert.style.display = "none";
              alert.classList.remove("alert-success");
            }, 1000);
          }else{
            timeLeft -=5;
            var alert = document.querySelector("#alert-box");
            alert.innerHTML = "Incorrect!";
            alert.classList.add("alert-error");
            alert.style.display = "block";
            setTimeout(function(){
              alert.style.display = "none";
              alert.classList.remove("alert-error");
              
            }, 1000);
          }
  
          pages[currentPage].style.display = "none";
          currentPage++;
          pages[currentPage].style.display = "block";
          if(currentPage === 6) {
            var finalScore = document.getElementById("final-score");
            finalScore.innerHTML = "your final score is: " +score;
            document.getElementById("submit-button").addEventListener("click", function(){
              var initials = document.getElementById("initials").value;
              
              storedLeaderboardData.push({initials: initials, score: score});
              localStorage.setItem("leaderboardData", JSON.stringify(storedLeaderboardData));
           
            
  
          });
          }
          if(currentPage === 6) {
            var storedLeaderboardData = JSON.parse(localStorage.getItem("leaderboardData")) || [];
            storedLeaderboardData.sort(function(a, b) {
              return b.score - a.score;
            });
            var leaderboard = document.getElementById("leaderboard");
            for (var i = 0; i < storedLeaderboardData.length; i ++){
              var leaderboardItem = document.createElement("div");
              leaderboardItem.innerHTML = storedLeaderboardData[i].initials + ": " + storedLeaderboardData[i].score;
              leaderboard.appendChild(leaderboardItem);
              
            }
          }
         
        });
        
      }
          
      pages[i].style.display = "none";
      
      
  
    }});
    