window.onload = init;

var backgroundJpg = "background.jpg";
var showCounter = 0;
var size = 10;
var firstCardIsOpen = false;
var cards = document.getElementsByTagName("img");
var cardBoard;
var correctAnswers = [];

function init() {
	cardBoard = new Array(2*size);
	fillCardBoard(cardBoard, size);
	
	hideCards(cards);
}

function fillCardBoard(cardBoard, size) {
	for (var i = 0; i < size; i++) {
		cardBoard[i] = i;
		cardBoard[i + size] = i;
	}
	shuffleArray(cardBoard);
	return cardBoard;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function hideCards(cards) {
	for (var i = 0; i < cards.length; i++) {
		if(!correctAnswers.includes(substringImageFileName(cards[i].src))){
			cards[i].src = backgroundJpg;
			cards[i].onclick = showAnswer;
		}
	}
	changeMessage();
}

function substringImageFileName(path) {
	var lastIndexOfSlash = path.lastIndexOf('/');
	var indexOfDot = path.lastIndexOf('.');
	return path.substring(lastIndexOfSlash + 1, indexOfDot);
}

function showAnswer(eventObj) {
	var image = eventObj.target;
	image.src = getReverse(image.id);
	if (firstCardIsOpen) {
		if(!checkAnswer()) {
			blockOnClick();
			setTimeout(timeHandler, 1500);
		} else {
			hideCards(cards);
		}
		showCounter++;
		firstCardIsOpen = false;
	} else {
		firstCardIsOpen = true;
	}
}

function getReverse(fileNameNumber) {
	return cardBoard[fileNameNumber] + ".jpg";
}

function checkAnswer() {
	var answers = [];
	for (var i = 0; i < cards.length; i++) {
		var cardName = substringImageFileName(cards[i].src);
		if(((cardName + ".jpg") != backgroundJpg) && !correctAnswers.includes(cardName)){
			answers.push(cardName);
		}
	}
	var firstCard = answers.pop();
	var secondCard = answers.pop();
	
	if(firstCard == secondCard) {
		correctAnswers.push(firstCard);
		return true;
	}
	return false;
}

function timeHandler() {
	hideCards(cards);
}

function blockOnClick() {
	for (var i = 0; i < cards.length; i++) {
		cards[i].onclick = null;
	}
}

function changeMessage() {
	var message = document.getElementById("messageArea");
	if(correctAnswers.length == 0) {
		message.innerHTML = "Znajdź pary!";
	}
	if(correctAnswers.length == size) {
		message.innerHTML = "GRATULACJE! Potrzebowałeś " + showCounter + " prób (" + (size/showCounter).toFixed(2) + " %)";
		alert("WYGRAŁEŚ!! Twoja skuteczność " + size + " na " + showCounter + " prób (" + (size/showCounter).toFixed(2) + " %)");
	} else {
		message.innerHTML = "Znalazłeś " + correctAnswers.length + " z " + size + "par";
	}
}