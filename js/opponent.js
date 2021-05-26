var currentTurnOwner;
var currentGameState = [1,1,1,1,1,1,1,1,1];
var whoStartedGame;

function mirror(getPositionToMirror){
    var mirroredPosition;

    var mirror = new Map();
    mirror.set('0','8');
    mirror.set('1','7');
    mirror.set('2','6');
    mirror.set('3','5');
    mirror.set('4','4');
    mirror.set('5','3');
    mirror.set('6','2');
    mirror.set('7','1');
    mirror.set('8','0');

    mirroredPosition = mirror.get(getPositionToMirror);
    return mirroredPosition;
}

function whoStartsFirst(){
    var currentTurnOwnerRandomGenerator = Math.round(Math.random() * (100 - 1) + 1);

    if(currentTurnOwnerRandomGenerator > 50){
        //Human
        currentTurnOwner = "Gracz 1";
        whoStartedGame = "Gracz"
    }
    else{
        //Computer
        currentTurnOwner = "Gracz 2";
        whoStartedGame = "Komputer"
    }
}

whoStartsFirst();

function bot(turnOwner, previousMove){
    var getRandomized = false;
    var goodMoveProbability = Math.round(Math.random() * (100 - 1) + 1);
    if(turnOwner == "Gracz 2"){
        if(goodMoveProbability < 90 ){
            //Normal behaviour when computer starting
            if(currentGameState == [1,1,1,1,1,1,1,1,1]){

            currentGameState[4] = 0;
            document.getElementById("4").style.color = "blue";

            document.getElementById("4").innerHTML = 'X';

            currentTurnOwner = "Gracz 1"
            sidePanelStats();
            }
            else{
                //Normal behaviour if computer starts after player
                if(currentGameState == [1,1,1,1,0,1,1,1,1]){
                    var randomMove = Math.round(Math.random() * (4 - 1) + 1);
                    if(randomMove == 1){
                        currentGameState[1] = 0;
                        document.getElementById("1").style.color = "blue";
                        document.getElementById("1").innerHTML = 'X';

                        currentTurnOwner = "Gracz 1";
                        sidePanelStats();
                    }
                    else if(randomMove == 2){
                        currentGameState[5] = 0;
                        document.getElementById("5").style.color = "blue";
                        document.getElementById("5").innerHTML = 'X';

                        currentTurnOwner = "Gracz 1";
                        sidePanelStats();
                    }
                    else if(randomMove == 3){
                        currentGameState[7] = 0;
                        document.getElementById("7").style.color = "blue";
                        document.getElementById("7").innerHTML = 'X';

                        currentTurnOwner = "Gracz 1";
                        sidePanelStats();
                    }
                    else{
                        currentGameState[3] = 0;
                        document.getElementById("3").style.color = "blue";
                        document.getElementById("3").innerHTML = 'X';

                        currentTurnOwner = "Gracz 1";
                        sidePanelStats();
                    }

                }
                else{
                    var nextMove = mirror(previousMove);

                    document.getElementById(nextMove).style.color = "blue";

                    document.getElementById(nextMove).innerHTML = 'X';

                    currentGameState[nextMove] = 0;


                    var gameEnd = looseConditionChecker();
                        
                    if(gameEnd == true){
                        showEndgamePanel();
                        document.getElementById("winner").innerHTML = currentTurnOwner;
                    }

                    currentTurnOwner = "Gracz 1"
                    sidePanelStats();
                }
            }
        }
        else{
            //Random behaviour connected with game level
            var filled = false;
            while(filled == false){
                var getRandomCell = Math.round(Math.random() * (8 - 0) + 0);
                if(currentGameState[getRandomCell] != '0'){

                    document.getElementById(getRandomCell).style.color = "blue";

                    currentGameState[getRandomCell] = 0;

                    document.getElementById(getRandomCell).innerHTML = 'X';

                    currentTurnOwner = "Gracz 1"

                    var gameEnd = looseConditionChecker();
                    
                    if(gameEnd == true){
                        showEndgamePanel();
                        document.getElementById("winner").innerHTML = currentTurnOwner;
                    }
                    getRandomized = true;
                    sidePanelStats();
                    break;
                }
            }
        }
    }
}

function looseConditionChecker(){
    //There will be 8 cases - 3 Vertical, 3 Horizontal and 2 Crosses

    var isGameEnded = false;
    //Case 1 - Horizontal 1
    if(currentGameState[0] == 0 && currentGameState[1] == 0 && currentGameState[2] == 0){
        isGameEnded = true;
    }
    //Case 2 - Horizontal 2
    else if(currentGameState[3] == 0 && currentGameState[4] == 0 && currentGameState[5] == 0){
        isGameEnded = true;
    }
    //Case 3 - Horizontal 3
    else if(currentGameState[6] == 0 && currentGameState[7] == 0 && currentGameState[8] == 0){
        isGameEnded = true;
    }
    //Case 4 - Vertical 1
    else if(currentGameState[0] == 0 && currentGameState[3] == 0 && currentGameState[6] == 0){
        isGameEnded = true;
    }
    //Case 5 - Vertical 2
    else if(currentGameState[1] == 0 && currentGameState[4] == 0 && currentGameState[7] == 0){
        isGameEnded = true;
    }
    //Case 6 - Vertical 3
    else if(currentGameState[2] == 0 && currentGameState[5] == 0 && currentGameState[8] == 0){
        isGameEnded = true;
    }
    //Case 7 - Cross 1
    else if(currentGameState[0] == 0 && currentGameState[4] == 0 && currentGameState[8] == 0){
        isGameEnded = true;;
    }
    //Case 8 - Cross 2
    else if(currentGameState[6] == 0 && currentGameState[4] == 0 && currentGameState[2] == 0){
        isGameEnded = true;
    }
    return isGameEnded;
}


function showEndgamePanel(){
    $(".endgame-section").show("slow");
}

function sidePanelStats(){
    document.getElementById("currentTurnOwner").innerHTML = currentTurnOwner;
}

$(".cell").one("click",function(){
    if(currentTurnOwner == "Gracz 1"){
        var cellId = this.id;
        this.style.color = "red";
        this.innerHTML = 'X';

        
        currentGameState[cellId] = 0;
        var gameEnd = looseConditionChecker();
        
        if(gameEnd == true){
            showEndgamePanel();
            document.getElementById("winner").innerHTML = currentTurnOwner;
        }

        currentTurnOwner = "Gracz 2";

        var positionToMirror = cellId;

        sidePanelStats();
        bot(currentTurnOwner, positionToMirror);

        console.log(currentGameState);

        
    }
    else{
        bot(currentTurnOwner, '4');

        currentTurnOwner = "Gracz 1";

        sidePanelStats();  
    }
});

$(document).ready(function(){
    $(".endgame-section").hide();
    sidePanelStats();  
    bot(currentTurnOwner, '4');
}); 



