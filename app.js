const startBtn=document.querySelector('.btn-start');

function init(){
    const panels=document.querySelectorAll('.panel');
    const playerPanel=panels[0];
    const computerPanel=panels[1];
    const playerBtns=document.querySelectorAll('.player .btn');
    const computerBtns=document.querySelectorAll('.computer .btn');
    const playerScoreUI=document.querySelector('.player-score');
    const computerScoreUI=document.querySelector('.computer-score');
    const choices=['ROCK','PAPER','SCISSOR'];
    const gameOverUI=document.querySelector('.game-over');
    const gameOverContainer=document.querySelector('.game-over-container');
    const win=document.querySelector('.won');
    let playerImg=document.querySelector('.player img');
    let computerImg=document.querySelector('.computer img');
    let playerScore=0;
    let computerScore=0;
    let count=0;
    let gameOver=false;
    let playerChoice;
    let computerChoice;
    playerBtns.forEach(btn=>btn.addEventListener('click',choice));

    function choice(event){
        if(gameOver===false){
            if(playerPanel.classList.contains('active')){
                checkIfBtnActive(playerBtns);
                event.target.classList.add('btn-active');
                playerChoice= event.target.value;
                displayChoice(playerChoice,'player');
                setTimeout(computerChoiceMade,2000);
            }
        }
    }

    function computerChoiceMade(){
        checkIfBtnActive(computerBtns);
        let rand=randomChoice();
        computerChoice= choices[rand];
        //console.log(computerChoice);
        displayChoice(computerChoice,'computer');
    }

    function randomChoice(){
        let randChoice=Math.floor(Math.random() * choices.length) + 0;  
        return randChoice;
        
    }

    function displayChoice(choice,selector){
        if(selector==='player'){
            playerImg.src=`img/${choice}.png`;
            playerPanel.classList.remove('active');
            computerPanel.classList.add('active');
        }
        else{
            computerBtns.forEach(btn=>{
                //console.log(btn.textContent);
                if(choice===btn.textContent){
                    btn.classList.add('btn-active');
                }
            });
            computerImg.src=`img/${choice}.png`;
            updateScore();
            checkWhoWon();
            computerPanel.classList.remove('active');
            playerPanel.classList.add('active');
        }
    }

    function checkWhoWon(){
        if(count>=3){
            gameOver=true;
            gameOverUI.style.display = 'block';
            gameOverContainer.style.display = 'block';
            if(playerScore>computerScore){
                win.textContent='YOU WON';
                win.style.display='block';
            }
            else if(computerScore>playerScore){
                win.textContent='COMPUTER WON';
                win.style.display='block';
            }
            else{
                win.textContent='DRAW';
                win.style.display='block';
            }
        }
    }

    function checkIfBtnActive(button){
        button.forEach(btn=>{
            if(btn.classList.contains('btn-active')){
                btn.classList.remove('btn-active');
            }
        });      
    }

    function updateScore(){
        if(playerChoice==='rock' && computerChoice.toLowerCase()==='scissor'){
            playerScore++;
            updateScoreUI(playerScore,playerScoreUI);
        }
        else if(playerChoice==='scissor' && computerChoice.toLowerCase()==='rock'){
            computerScore++;
            updateScoreUI(computerScore,computerScoreUI);
        }
        else if(playerChoice==='rock' && computerChoice.toLowerCase()==='paper'){
            computerScore++;
            updateScoreUI(computerScore,computerScoreUI);
        }
        else if(playerChoice==='paper' && computerChoice.toLowerCase()==='rock'){
            playerScore++;
            updateScoreUI(playerScore,playerScoreUI);
        }
        else if(playerChoice==='scissor'&& computerChoice.toLowerCase()==='paper'){
            playerScore++;
            updateScoreUI(playerScore,playerScoreUI);
        }
        else if(playerChoice==='paper'&& computerChoice.toLowerCase()==='scissor'){
            computerScore++;
            updateScoreUI(computerScore,computerScoreUI);
        }
        count++;
    }

    function updateScoreUI(score,ui){
        ui.textContent=score;
    }
}

startBtn.addEventListener('click', init);