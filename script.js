var grid = [];
var spotsLeft = [];

/***********************************************
	This is what happens when the page loads
***********************************************/
$(document).ready(function(){
	setUpBoard();
	printBoard();
});

function setUpBoard(){

	// initialize board to have all random values
	for(var i=0; i<4; i++){
		var innergrid = [];
		for(var j=0; j<4; j++){
			innergrid.push("x");
			spotsLeft.push(i.toString() + " " + j.toString());
		}
		grid.push(innergrid);
	}
	
	// pick 2 spots on board to have values
	var x = Math.round(Math.random()*3);
	var y = Math.round(Math.random()*3);
	grid[x][y] = "2";
	var val = x.toString() + " " + y.toString();
	var index = spotsLeft.indexOf(val);
	spotsLeft.splice(index, 1);
	
	x = Math.round(Math.random()*3);
	y = Math.round(Math.random()*3);
	grid[x][y] = "2";
	index = spotsLeft.indexOf(x.toString() + " " + y.toString());
	spotsLeft.splice(index, 1);
}


function printBoardConsole(){
	var board = '\n' + "*-----------------------*" + '\n';
	for(var i=0; i<grid.length; i++){
		board += "|  ";
		for(var j=0; j<grid[i].length; j++){
			board += grid[i][j] + "  |  ";
		}
		board += '\n';
		board += "*-----------------------*";
		board += '\n';
	}
	
	console.log(board);
}

/*
function printBoard(){
	var board = '<br/>' + "*--------------*" + '<br/>';
	for(var i=0; i<grid.length; i++){
		board += "|   ";
		for(var j=0; j<grid[i].length; j++){
			board += grid[i][j] + "   |   ";
		}
		board += '<br/>';
		board += "*--------------*";
		board += '<br/>';
	}
	
	//console.log(board);
	document.getElementById("container").innerHTML = board;
}*/

function printBoard(){
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			var boardID = "r"+i+"c"+j;
			if(grid[i][j] === "2"){
				document.getElementById(boardID).innerHTML = "2";
				document.getElementById(boardID).style.background = "#f0e5da";
			}
			else if(grid[i][j] === "4"){
				document.getElementById(boardID).innerHTML = "4";
				document.getElementById(boardID).style.background = "#ede2c8";
			}
			else if(grid[i][j] === "8"){
				document.getElementById(boardID).innerHTML = "8";
				document.getElementById(boardID).style.background = "#feb578";
			}
			else if(grid[i][j] === "16"){
				document.getElementById(boardID).innerHTML = "16";
				document.getElementById(boardID).style.background = "#ff9962";
			}
			else if(grid[i][j] === "32"){
				document.getElementById(boardID).innerHTML = "32";
				document.getElementById(boardID).style.background = "#ff8060";
			}
			else if(grid[i][j] === "64"){
				document.getElementById(boardID).innerHTML = "64";
				document.getElementById(boardID).style.background = "#ff613c";
			}
			else if(grid[i][j] === "128"){
				document.getElementById(boardID).innerHTML = "128";
				document.getElementById(boardID).style.background = "#efd26d";
			}
			else if(grid[i][j] === "256"){
				document.getElementById(boardID).innerHTML = "256";
				document.getElementById(boardID).style.background = "#efd15c";
			}
			else if(grid[i][j] === "512"){
				document.getElementById(boardID).innerHTML = "512";
				document.getElementById(boardID).style.background = "#efcd4a";
			}
			else if(grid[i][j] === "1024"){
				document.getElementById(boardID).innerHTML = "1024";
				document.getElementById(boardID).style.background = "#f0ca36";
			}
			else if(grid[i][j] === "2048"){
				document.getElementById(boardID).innerHTML = "2048";
				document.getElementById(boardID).style.background = "#ccc0b3";
			}
			else if(grid[i][j] === "x"){
				document.getElementById(boardID).innerHTML = "";
				document.getElementById(boardID).style.background = "rgba(238, 228, 218, 0.35)";
			}
			else{
			
			}
		}
	}
}

document.onkeydown = checkKey;

function updateSpotsLeft(row, col, oldrow, oldcol){
	var spot = row.toString() + " " + col.toString();
	var index = spotsLeft.indexOf(spot);
	if(index >= 0){
		spotsLeft.splice(index, 1);
	}

	var spotBack = oldrow.toString() + " " + oldcol.toString();
	spotsLeft.push(spotBack);
}

function mergeTiles(val1, val2, row, col, oldrow, oldcol){
	if(val1 !== val2){
		return;
	}
	var newVal = (parseInt(val1)+parseInt(val2)).toString();
	
	grid[oldrow][oldcol] = "x";
	grid[row][col] = newVal;
	
	updateSpotsLeft(row, col, oldrow, oldcol);
}

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        for(var row=0; row<grid.length; row++){
        	for(var col=0; col<grid[row].length; col++){
        		
        		var tile = grid[row][col];
        		if(tile === "x"){
        			continue;
        		}
        		// tile is important
        		
        		if(row === 0){
        			continue;
        		}
        		// tile is not next to topmost wall
        		
        		if(grid[row-1][col] === "x"){
        			// the next space over is empty
        			grid[row-1][col] = grid[row][col];
        			grid[row][col] = "x";
        			
        			updateSpotsLeft(row-1, col, row, col);
        		}
        		else{
        			// the next space over is a tile- merge?
        			mergeTiles(grid[row][col], grid[row-1][col], row-1, col, row, col);
        		}
        	}
        }
    }
    else if (e.keyCode == '40') {
        // down arrow
        for(var row=grid.length-1; row>=0; row--){
        	for(var col=0; col<grid[row].length; col++){
        		
        		var tile = grid[row][col];
        		if(tile === "x"){
        			continue;
        		}
        		// tile is important
        		
        		if(row === grid.length-1){
        			continue;
        		}
        		// tile is not next to leftmost wall
        		
        		if(grid[row+1][col] === "x"){
        			// the next space over is empty
        			grid[row+1][col] = grid[row][col];
        			grid[row][col] = "x";
        			
        			updateSpotsLeft(row+1, col, row, col);
        		}
        		else{
        			// the next space over is a tile- merge?
        			mergeTiles(grid[row][col], grid[row+1][col], row+1, col, row, col);
        		}
        	}
        }
    }
    else if (e.keyCode == '37') {
       // left arrow
        for(var row=0; row<grid.length; row++){
        	for(var col=0; col<grid.length; col++){
        		
        		var tile = grid[row][col];
        		if(tile === "x"){
        			continue;
        		}
        		// tile is important
        		
        		if(col === 0){
        			continue;
        		}
        		// tile is not next to leftmost wall
        		
        		if(grid[row][col-1] === "x"){
        			// the next space over is empty
        			grid[row][col-1] = grid[row][col];
        			grid[row][col] = "x";
        			
        			updateSpotsLeft(row, col-1, row, col);
					
        		}
        		else{
        			// the next space over is a tile- merge?
        			mergeTiles(grid[row][col], grid[row][col-1], row, col-1, row, col);
        		}
        	}
        }
    }
    else if (e.keyCode == '39') {
       // right arrow
        for(var row=0; row<grid.length; row++){
        	for(var col=grid[row].length-1; col>=0; col--){
        		
        		var tile = grid[row][col];
        		if(tile === "x"){
        			continue;
        		}
        		// tile is important
        		
        		if(col === grid[row].length-1){
        			continue;
        		}
        		// tile is not next to rightmost wall
        		
        		if(grid[row][col+1] === "x"){
        			// the next space over is empty
        			grid[row][col+1] = grid[row][col];
        			grid[row][col] = "x";
        			
        			updateSpotsLeft(row, col+1, row, col);
        		}
        		else{
        			// the next space over is a tile- merge?
        			mergeTiles(grid[row][col], grid[row][col+1], row, col+1, row, col);
        		}
        	}
        }
    }
    else{
    	return;
    }
    
    addTile();
}

function addTile(){

	if(spotsLeft.length === 0){
		console.log("*******GAME OVER*********");
		return;
	}
	var location = Math.round(Math.random() * (spotsLeft.length-1));
	var spot = spotsLeft[location];
	
	var x = spot.substring(0, 1);
	var y = spot.substring(2, 3);
	
	grid[x][y] = "2";
	spotsLeft.splice(spotsLeft.indexOf(spot), 1);
	
	printBoard();
	printBoardConsole();
}
