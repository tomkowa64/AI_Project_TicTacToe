var currentTurnOwner;
var firstMove = true;
var turns = [];
var currentGameState = [1,1,1,1,1,1,1,1,1];
var whoStartedGame;
var getRandomized = false;
var canUp = true;
var canRight = true;
var canDown = true;
var canLeft = true;

function mirror(getPositionToMirror){
    var mirroredPosition;

    var mirror = new Map();
    mirror.set('0','8');
    mirror.set('1','7');
    mirror.set('2','6');
    mirror.set('3','5');
    mirror.set('9','4');
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
        whoStartedGame = "Gracz";
    }
    else{
        //Computer
        currentTurnOwner = "Gracz 2";
        whoStartedGame = "Komputer";
    }
}

whoStartsFirst();

function bot(turnOwner){
    var goodMoveProbability = Math.round(Math.random() * (100 - 1) + 1);
    var previousMove = turns.pop();
    if(turnOwner == "Gracz 2"){
        if(goodMoveProbability < 40 && getRandomized == false){
            //Normal behaviour when computer starting
            if(currentGameState[4] == 1 && firstMove == true){

                document.getElementById("4").style.color = "blue";

                setTimeout(function(){document.getElementById("4").innerHTML="X";}, 1500);
                $('#4').off('click');

                currentGameState[4] = 0;

                turns.push('4');

                firstMove = false;
                console.log("Pierwszy ruch na środek");
            }
            else if(currentGameState[4] == 1 && firstMove == false){
                var nextMove = mirror(previousMove);

                document.getElementById(nextMove).style.color = "blue";

                setTimeout(function(){document.getElementById(nextMove).innerHTML="X";}, 1500);
                $('#'+nextMove).off('click');

                currentGameState[nextMove] = 0;

                turns.push(nextMove);
                console.log("Taktyka lustrzana");

            }
            else if(currentGameState[4] == 0 && firstMove == false ){
                
                var movetoSideFilled = false;

                while(movetoSideFilled == false){
                    var moveToSide = Math.round(Math.random() * (4 - 1) + 1);
                    if(moveToSide == 1 && currentGameState[1] == 1 && currentGameState[7] == 1 ){
                        document.getElementById('1').style.color = "blue";
                        movetoSideFilled = true;
                        setTimeout(function(){document.getElementById("1").innerHTML="X";}, 1500);
                        $('#1').off('click');
                        firstMove == false; 
                        canUp = false;
                        currentGameState[1] = 0;
                        console.log("Ruch w gore");
                        turns.push('1');
                    }
                    else if(moveToSide == 2 && currentGameState[5] == 1 && currentGameState[3] == 1 ){
                        document.getElementById('5').style.color = "blue";
                        movetoSideFilled = true;
                        setTimeout(function(){document.getElementById("5").innerHTML="X";}, 1500);
                        $('#5').off('click');
                        firstMove == false; 
                        currentGameState[5] = 0;
                        canRight = false;
                        console.log("Ruch w prawo");
                        turns.push('5');
                    }
                    else if(moveToSide == 3 && currentGameState[7] == 1 && currentGameState[1] == 1 ){
                        document.getElementById('7').style.color = "blue";
                        movetoSideFilled = true;
                        firstMove == false; 
                        canDown = false;
                        setTimeout(function(){document.getElementById("7").innerHTML="X";}, 1500);
                        $('#7').off('click');
                        console.log("Ruch w dol");
                        currentGameState[7] = 0;
        
                        turns.push('7');
                    }
                    else if(moveToSide == 4 && currentGameState[3] == 1 && currentGameState[5] == 1){
                        document.getElementById('3').style.color = "blue";
                        movetoSideFilled = true;
                        setTimeout(function(){document.getElementById("3").innerHTML="X";}, 1500);
                        $('#3').off('click');
                        firstMove == false; 
                        canLeft = false;
                        currentGameState[3] = 0;
                        console.log("Ruch w lewo");
                        turns.push('3');
                    }
                    else if(canRight == false && canDown == false  && currentGameState[0] == 1){
                        document.getElementById(0).style.color = "blue";
            
                        currentGameState[0] = 0;
            
                        setTimeout(function(){document.getElementById("0").innerHTML="X";}, 1500);
                        $('#0').off('click');

                        console.log("Lewy gorny");
        
                        turns.push('0');

                        break;
                    }
                    else if(canRight == false && canUp == false && currentGameState[6] == 1){
                        document.getElementById(6).style.color = "blue";
            
                        currentGameState[6] = 0;
            
                        setTimeout(function(){document.getElementById("6").innerHTML="X";}, 1500);
                        $('#6').off('click');
            
            
                        console.log("Lewy Dolny");
        
                        turns.push('6');
            
                        break;
                    }
                    else if(canLeft == false && canUp == false && currentGameState[8] == 1){
                        document.getElementById(8).style.color = "blue";
            
                        currentGameState[8] = 0;
            
                        setTimeout(function(){document.getElementById("8").innerHTML="X";}, 1500);
                        $('#8').off('click');
            
                        console.log("Prawy dolny");
        
                        turns.push('8');
            
                        break;
                    }
                    else if(canLeft == false && canDown == false  && currentGameState[2] == 1){
                        document.getElementById(2).style.color = "blue";
            
                        currentGameState[2] = 0;
            
                        setTimeout(function(){document.getElementById("2").innerHTML="X";}, 1500);
                        $('#2').off('click');
            
                        console.log("Prawy gorny");
        
                        turns.push('2');
            
                        break;
                    }
                    else{
                        var getRandomCell = Math.round(Math.random() * (8 - 0) + 0);
                        if(currentGameState[getRandomCell] != '0'){
            
                            document.getElementById(getRandomCell).style.color = "blue";
            
                            currentGameState[getRandomCell] = 0;
            
                            setTimeout(function(){document.getElementById(getRandomCell).innerHTML="X";}, 1500);
                            $('#'+getRandomCell).off('click');
            
                            console.log("randomowy ruch - bez mozliwosci");
        
                            turns.push(getRandomCell);
            
                            break;
                        }
                    }
                }
            }
            var gameEnd = looseConditionChecker();
            sidePanelStats();
            if(gameEnd == true){
                showEndgamePanel();
                console.log("Ruch komputera zakończył gre z korzysica dla gracza");
                document.getElementById("winner").innerHTML = "Gracz!";
            }

            currentTurnOwner = "Gracz 1"
        }
        else{
            //Random behaviour connected with game level
            var filled = false;
            while(filled == false){
                var getRandomCell = Math.round(Math.random() * (8 - 0) + 0);
                if(currentGameState[getRandomCell] != '0'){
    
                    document.getElementById(getRandomCell).style.color = "blue";
    
                    currentGameState[getRandomCell] = 0;
    
                    setTimeout(function(){document.getElementById(getRandomCell).innerHTML="X";}, 1500);
                    $('#'+getRandomCell).off('click');
    
    
                    console.log("randomowy ruch");

                    turns.push(getRandomCell);
                    sidePanelStats();
                    var gameEnd = looseConditionChecker();
                        
                    if(gameEnd == true){
                        showEndgamePanel();
                        console.log("Ruch komputera zakończył gre z korzysica dla gracza");
                        document.getElementById("winner").innerHTML = "Gracz!";
                    }
                    
                    currentTurnOwner = "Gracz 1";
                    getRandomized = true;
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
    $(".endgame-section").delay(2000).show("slow");
}

function getMiniTable(coordinate){
    
    if(coordinate == 0){
        return "<table>"+
                "<tr>"+
                    "<td>"+ "X" +
                    "</td>"+
                    "<td>"+
                    "</td>"+
                    "<td>"+
                    "</td>"+
                "</tr>"+
                "<tr>"+
                    "<td>"+
                    "</td>"+
                    "<td>"+
                    "</td>"+
                    "<td>"+
                    "</td>"+
                "</tr>"+
                "<tr>"+
                    "<td>"+
                    "</td>"+
                    "<td>"+
                    "</td>"+
                    "<td>"+
                    "</td>"+
                "</tr>"+
            "</table>";
    }
    else if(coordinate == 1){
        return "<table>"+
        "<tr>"+
            "<td>"+
            "</td>"+
            "<td>"+  "X" +
            "</td>"+
            "<td>"+
            "</td>"+
        "</tr>"+
        "<tr>"+
            "<td>"+
            "</td>"+
            "<td>"+
            "</td>"+
            "<td>"+
            "</td>"+
        "</tr>"+
        "<tr>"+
            "<td>"+
            "</td>"+
            "<td>"+
            "</td>"+
            "<td>"+
            "</td>"+
        "</tr>"+
    "</table>";
    }
    else if(coordinate == 2){
        return "<table>"+
        "<tr>"+
            "<td>"+
            "</td>"+
            "<td>"+ 
            "</td>"+
            "<td>"+  "X" +
            "</td>"+
        "</tr>"+
        "<tr>"+
            "<td>"+
            "</td>"+
            "<td>"+
            "</td>"+
            "<td>"+
            "</td>"+
        "</tr>"+
        "<tr>"+
            "<td>"+
            "</td>"+
            "<td>"+
            "</td>"+
            "<td>"+
            "</td>"+
        "</tr>"+
    "</table>";
    }
    else if(coordinate == 3){
        return "<table>"+
        "<tr>"+
            "<td>"+
            "</td>"+
            "<td>"+ 
            "</td>"+
            "<td>"+  
            "</td>"+
        "</tr>"+
        "<tr>"+
            "<td>"+ "X" +
            "</td>"+
            "<td>"+
            "</td>"+
            "<td>"+
            "</td>"+
        "</tr>"+
        "<tr>"+
            "<td>"+
            "</td>"+
            "<td>"+
            "</td>"+
            "<td>"+
            "</td>"+
        "</tr>"+
    "</table>";
    }
    else if(coordinate == 4){
        return "<table>"+
        "<tr>"+
            "<td>"+
            "</td>"+
            "<td>"+ 
            "</td>"+
            "<td>"+  
            "</td>"+
        "</tr>"+
        "<tr>"+
            "<td>"+ 
            "</td>"+
            "<td>"+ "X" +
            "</td>"+
            "<td>"+
            "</td>"+
        "</tr>"+
        "<tr>"+
            "<td>"+
            "</td>"+
            "<td>"+
            "</td>"+
            "<td>"+
            "</td>"+
        "</tr>"+
    "</table>";
    }
    else if(coordinate == 5){
        return "<table>"+
        "<tr>"+
            "<td>"+
            "</td>"+
            "<td>"+ 
            "</td>"+
            "<td>"+  
            "</td>"+
        "</tr>"+
        "<tr>"+
            "<td>"+ 
            "</td>"+
            "<td>"+ 
            "</td>"+
            "<td>"+ "X" +
            "</td>"+
        "</tr>"+
        "<tr>"+
            "<td>"+
            "</td>"+
            "<td>"+
            "</td>"+
            "<td>"+
            "</td>"+
        "</tr>"+
    "</table>";
    }
    else if(coordinate == 6){
        return "<table>"+
        "<tr>"+
            "<td>"+
            "</td>"+
            "<td>"+ 
            "</td>"+
            "<td>"+  
            "</td>"+
        "</tr>"+
        "<tr>"+
            "<td>"+ 
            "</td>"+
            "<td>"+ 
            "</td>"+
            "<td>"+ 
            "</td>"+
        "</tr>"+
        "<tr>"+
            "<td>"+ "X" +
            "</td>"+
            "<td>"+
            "</td>"+
            "<td>"+
            "</td>"+
        "</tr>"+
    "</table>";
    }
    else if(coordinate == 7){
        return "<table>"+
        "<tr>"+
            "<td>"+
            "</td>"+
            "<td>"+ 
            "</td>"+
            "<td>"+  
            "</td>"+
        "</tr>"+
        "<tr>"+
            "<td>"+ 
            "</td>"+
            "<td>"+ 
            "</td>"+
            "<td>"+ 
            "</td>"+
        "</tr>"+
        "<tr>"+
            "<td>"+ 
            "</td>"+
            "<td>"+ "X" +
            "</td>"+
            "<td>"+
            "</td>"+
        "</tr>"+
    "</table>";
    }
    else if(coordinate == 8){
        return "<table>"+
        "<tr>"+
            "<td>"+
            "</td>"+
            "<td>"+ 
            "</td>"+
            "<td>"+  
            "</td>"+
        "</tr>"+
        "<tr>"+
            "<td>"+ 
            "</td>"+
            "<td>"+ 
            "</td>"+
            "<td>"+ 
            "</td>"+
        "</tr>"+
        "<tr>"+
            "<td>"+ 
            "</td>"+
            "<td>"+ 
            "</td>"+
            "<td>"+ "X" +
            "</td>"+
        "</tr>"+
    "</table>";
    }
}

function sidePanelStats(){
    if(whoStartedGame == "Gracz"){
        document.getElementById("whoStarted").style.color = "red";
        document.getElementById("whoStarted").innerHTML = whoStartedGame;
    }
    else{
        document.getElementById("whoStarted").style.color = "blue";
        document.getElementById("whoStarted").innerHTML = whoStartedGame;
    }
    if(currentTurnOwner == "Gracz 1" && turns[0] != null){
        document.getElementById("moves").innerHTML += "<p style='color: red'>Gracz: Ruch na "+getMiniTable(turns[turns.length - 1])+"</p>";
    }
    else if(currentTurnOwner == "Gracz 2" && turns[0] != null){
        document.getElementById("moves").innerHTML;
        setTimeout(function(){document.getElementById("moves").innerHTML+= "<p style='color: blue'>Komputer: Ruch na "+getMiniTable(turns[turns.length - 1])+"</p>";}, 1500);
    }
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
            console.log("Ruch gracza zakończył gre z korzysica dla komputera");
            document.getElementById("winner").innerHTML = "Komputer!";
        }
        else{
        firstMove = false;      
        turns.push(cellId);
        sidePanelStats();
        currentTurnOwner = "Gracz 2";

        bot(currentTurnOwner);

        console.log(currentGameState);
        }
    }
});

$(document).ready(function(){
    $(".endgame-section").hide();
    sidePanelStats();
    bot(currentTurnOwner);
}); 