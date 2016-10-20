$(document).ready(function() {
	var humanPlayer = "";
	var compPlayer = "";
	var initTitleHtml = "Choose <a class='color-red'>X</a> or <a class='color-blue'>O</a>";
	var gameTitleHtml = "You chose ";
	var titleTag = $(".top-title");
	var tagRed = "<a class='color-red'>";
	var tagBlue = "<a class='color-blue'>";
	var closeTag = "</a>";

	// closure for updating html
	function updater(tag) {
		function inserter(content) {
			return tag.html(content);
		}
		return inserter;
	}

	// initial setup
	function initialise() {
		updater(titleTag)(initTitleHtml);
		$("a").click(function() {
			humanPlayer = $(this).html();
			if (humanPlayer == "X") {
				compPlayer = "O";
				updater(titleTag)(gameTitleHtml + tagRed + humanPlayer + closeTag);
			}
			else if (humanPlayer == "O") {
				compPlayer = "X";
				updater(titleTag)(gameTitleHtml + tagBlue + humanPlayer + closeTag);
			}
		});
	}

	initialise();
	
});