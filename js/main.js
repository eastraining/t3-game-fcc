$(document).ready(function() {
	// global variables
	var humanPlayer = "";
	var compPlayer = "";
	var initTitleHtml = "Choose <a class='color-red'>X</a> or <a class='color-blue'>O</a>";
	var gameTitleHtml = "You chose ";
	var titleTag = $(".top-title");
	var tagRed = "<a class='color-red'>";
	var tagBlue = "<a class='color-blue'>";
	var humanIcon = "";
	var compIcon = "";
	var closeTag = "</a>";
	var running = false;
	var humanPlaying = true;
	var gameCell = $(".square-grid__cell");
	var numCells = 9;
	var allCells = {};
	var allWins = [["0", "1", "2"], ["3", "4", "5"], ["6", "7", "8"], ["0", "3", "6"], ["1", "4", "7"], ["2", "5", "8"], ["0", "4", "8"], ["2", "4", "6"]];
	var endMessage = " has won! <a id='resetGame'>Play a new Game!</a>";

	// function for reading text content of html
	function readText(tag) {
		return tag.text();
	}

	// closure for updating html
	function writeHTML(tag) {
		function inserter(content) {
			return tag.html(content);
		}
		return inserter;
	}

	/*
	 *	initialise():
	 *	Gets player to choose X or O
	 *	Adds events to gameCells to allow them to respond to human interaction.
	 */
	function initialise() {
		writeHTML(titleTag)(initTitleHtml);
		$("a").click(function() {
			humanPlayer = $(this).html();
			if (humanPlayer == "X") {
				compPlayer = "O";
				humanIcon = tagRed + humanPlayer + closeTag;
				compIcon = tagBlue + compPlayer + closeTag;
			}
			else if (humanPlayer == "O") {
				compPlayer = "X";
				humanIcon = tagBlue + humanPlayer + closeTag;
				compIcon = tagRed + compPlayer + closeTag;
			}
			running = true;
			writeHTML(titleTag)(gameTitleHtml + humanIcon);
			gameCell.click(function() {
				var that = $(this);
				if (readText(that) == "") {
					if (humanPlaying == true) {
						writeHTML(that)(humanIcon);
						humanPlaying = false;
						resetGame(isGameComplete(allCells));
						computerTurn();
					}
				}
			});
		});
	}

	/* 
	 *	isGameComplete():
	 *	Determines if any player has won and returns a string.
	 *	Returns the winning player if game complete.
	 *	Returns "Nobody" if draw.
	 *	Else returns "N".
	 */
	function isGameComplete(board) {
		// determine state of board
		var filledCells = 0;
		if (board == allCells) {
			for (var i = 0; i < numCells; i++) {
				var temp = "cell" + i.toString();
				var tempStr = readText($("#" + temp));
				if (tempStr != "") {
					filledCells++;
				}
				allCells[i] = tempStr;
			}
		}
		else {
			for (var i = 0; i < numCells; i++) {
				if (board[i.toString()] != "") {
					filledCells++;
				}
			}
		}
		
		// determine if any win condition is met
		for (var j = 0; j < allWins.length; j++) {
			if (board[allWins[j][0]] != "") {
				if (board[allWins[j][0]] == board[allWins[j][1]] && board[allWins[j][1]] == board[allWins[j][2]]) {
					return board[allWins[j][0]];
				}
			}
		}

		// return "Nobody" if board is full and no winner
		if (filledCells == numCells) {
			return "Nobody";
		}
		// return "N" if moves left
		else {
			return "N";
		}
	}

	// clearBoard(): clears all gameCells and empties allCells
	function clearBoard() {
		writeHTML(gameCell)("");
		allCells = {};
		humanPlayer = "";
		humanIcon = "";
		compPlayer = "";
		compIcon = "";
	}

	/*
	 *	resetGame(indicator):
	 *	Accepts a string as an indicator.
	 *	Determines if game should be reset, i.e. if either player
	 *	has won, or if there is a draw.
	 *	Indicates the winner and resets the game upon request
	 */
	function resetGame(indicator) {
		if (indicator != "N") {
			running = false;
			writeHTML(titleTag)(indicator + endMessage);
			$("#resetGame").click(function() {
				clearBoard();
				humanPlaying = true;
				initialise();
			});
		}
	}

	/* ON HOLD: until I bother to make the minimax algorithm
	// scorer(): returns an integer score based on board ending
	function scorer(indicator) {
		if (indicator == humanPlayer) {
			return -1;
		}
		else if (indicator == compPlayer) {
			return 1;
		}
		else if (indicator == "Nobody") {
			return 0;
		}
		else {
			return null;
		}
	}
	*/

	/*
	 * computerTurn():
	 * TODO: Evalutes possible boards using minimax algorithm.
	 * Makes a (currently random) move.
	 * Invokes resetGame(isGameComplete()) at the end of turn.
	 */
	function computerTurn() {
		var tempBoard = $.extend({}, allCells);
		var allTempMoves = [];
		for (var i = 0; i < numCells; i++) {
			if (tempBoard[i.toString()] == "") {
				allTempMoves.push(i.toString());
			}
		}

		var compMove = "cell" + allTempMoves[Math.floor(Math.random() * allTempMoves.length)];
		writeHTML($("#" + compMove))(compIcon);
		resetGame(isGameComplete(allCells));
		humanPlaying = true;
	}

	// start game
	initialise();
});