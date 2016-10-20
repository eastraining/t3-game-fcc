$(document).ready(function() {
	// global variables
	var humanPlayer = "";
	var compPlayer = "";
	var initTitleHtml = "Choose <a class='color-red'>X</a> or <a class='color-blue'>O</a>";
	var gameTitleHtml = "You chose ";
	var titleTag = $(".top-title");
	var tagRed = "<a class='color-red'>";
	var tagBlue = "<a class='color-blue'>";
	var humanTag = "";
	var compTag = "";
	var closeTag = "</a>";
	var currentPlayer = "";
	var running = false;
	var humanPlaying = true;
	var gameCell = $(".square-grid__cell");
	var numCells = 9;
	var allCells = {};
	var allRows = [["0", "1", "2"], ["3", "4", "5"], ["6", "7", "8"]];
	var allColumns = [["0", "3", "6"], ["1", "4", "7"], ["2", "5", "8"]];
	var allDiagonals = [["0", "4", "8"], ["2", "4", "6"], ["0", "4", "8"]]; // extra diagonal for ease

	// function for reading html
	function readHTML(tag) {
		return tag.html();
	}

	// closure for updating html
	function writeHTML(tag) {
		function inserter(content) {
			return tag.html(content);
		}
		return inserter;
	}

	// initial setup
	function initialise() {
		writeHTML(titleTag)(initTitleHtml);
		$("a").click(function() {
			humanPlayer = $(this).html();
			if (humanPlayer == "X") {
				compPlayer = "O";
				humanTag = tagRed + humanPlayer + closeTag;
				compTag = tagBlue + compPlayer + closeTag;

			}
			else if (humanPlayer == "O") {
				compPlayer = "X";
				humanTag = tagBlue + humanPlayer + closeTag;
				compTag = tagRed + compPlayer + closeTag;
			}
			running = true;
			writeHTML(titleTag)(gameTitleHtml + humanTag);
			gameCell.click(function() {
				var that = $(this);
				if (readHTML(that) == "") {
					if (humanPlaying == true) {
						writeHTML(that)(humanTag);
						humanPlaying = false;
					}
				}
			});
		});
	}

	/* 
	 *	Win Conditions:
	 *	Returns a string.
	 *	Returns the winning player if game complete.
	 *	Else returns "N".
	 */
	function isGameComplete() {
		// determine state of board
		for (var i = 0; i < numCells; i++) {
			var temp = "cell" + i.toString();
			allCells[i] = $("#" + temp).text();
		}

		// determine if any win condition is met
		for (var j = 0; j < allRows.length; j++) {
			if (allCells[allRows[j][0]] != "") {
				if (allCells[allRows[j][0]] == allCells[allRows[j][1]] && allCells[allRows[j][1]] == allCells[allRows[j][2]]) {
					return allCells[allRows[j][0]];
				}
			}
			if (allCells[allColumns[j][0]] != "") {
				if (allCells[allColumns[j][0]] == allCells[allColumns[j][1]] && allCells[allColumns[j][1]] == allCells[allColumns[j][2]]) {
					return allCells[allColumns[j][0]];
				}
			}
			if (allCells[allDiagonals[j][0]] != "") {
				if (allCells[allDiagonals[j][0]] == allCells[allDiagonals[j][1]] && allCells[allDiagonals[j][1]] == allCells[allDiagonals[j][2]]) {
					return allCells[allDiagonals[j][0]];
				}
			}
		}

		// return "N" for no winner
		return "N";
	}

	// start game
	initialise();

});