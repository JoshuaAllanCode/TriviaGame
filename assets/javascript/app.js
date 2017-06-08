
var questionAnswer = [

	{
		question: 'Bobs father has 4 children. Momo, Meme, and Mumu are the first three, who is the fourth?',
		answers: ['Momo Jr.', 'Mama', 'Jebediah', 'Bob'],
		correct: 'Bob'
	},

	{
		question: 'I have three apples. If you take away two from me, how many do you have?',
		answers: ['2', '3', '0', 'Depends on the weather'],
		correct: '2'
	},

	{
		question: 'You have a match and you enter a wagon with a candle, a lamp and a fireplace. Which one do you light first?',	
		answers: ['A Lamp', 'A Candle', 'A Match', 'the fireplace'],
		correct: 'A Match'
	},

	{
		question: 'Before Mount Everest was discovered, what was the highest mountain in the world?',	
		answers: ['Mount Kilamanjaro', 'Mount Fuji', 'Mount Denali', 'Mount Everest'],
		correct: 'Mount Everest'
	},

	{
		question: 'A rooster laid an egg on top of the barn roof. Which way did it roll?',	
		answers: ['Roosters do not lay eggs', 'Down', 'Rooster eggs are square and do not roll', 'Left'],
		correct: 'Roosters do not lay eggs'
	},

	{
		question: 'If a plane crashes on the border between the USA and Mexico, where do they bury the survivors?',	
		answers: ['Mexico', 'Survivors are not burried', 'USA! USA! USA!', 'the ground'],
		correct: '8'
	},

	{
		question: 'How much dirt is there in a hole 3 feet deep, 6 ft long and 4 ft wide?',	
		answers: ['10 Pounds of dirt', '0 Pounds of dirt', 'Trick Question: Holes are illegal', 'There is no hole'],
		correct: '0 Pounds of dirt'
	},

	{
		question: 'Some months have 31 days, others have 30 days. How many have 28 days?',	
		answers: ['12', '7', '0', '1'],
		correct: '12'
	},

	{
		question: 'A girl kicks a soccer ball. It goes 10 feet and comes back to her. How is this possible?',	
		answers: ['she has magical powers', 'the soccer ball is in love with the girl', 'she kicked it up in the air', 'the ball drank red bull'],
		correct: 'she kicked it up in the air'
	},

	{
		question: 'Imagine you are in a sinking row boat surrounded by sharks. How would you survive?',	
		answers: ['Engage the sharks in conversation and force them to see you as a person', 'Kung Fu', 'Stop imagining sharks and get back to work', 'Yodeling'],
		correct: 'Kung Fu'
	},

	{
		question: 'What is your favorite color?',	
		answers: ['red', 'blue', 'purple', 'yellow'],
		correct: 'blue'
	}
];

var time = 10;

var questionCount = 0;

var correct = 0;

var incorrect = 0;

var unAnswered = 0;

var click = 0;

// FUNCTIONS
// =================================================================================================

// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleAnswers(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function countDown() {
	$('#timer').html('Timer: ' + time);
	time --;
	if (time < 0) {
		unAnswered++;
		$('#result').html('Time is up! The correct answer is ' + questionAnswer[questionCount].correct);
		reset();
	}
}

function getQuestion() {
	$('#timer').html('Timer: ' + time);
	$('#start').css('display', 'none');
	$('#startText').css('display', 'none');
	$('#timer').removeClass('displayNone');
	timer = setInterval(countDown, 1000);
	console.log(questionAnswer[questionCount].answers);
	shuffleAnswers(questionAnswer[questionCount].answers);
	console.log(questionAnswer[questionCount].answers);
	$('#question').append(questionAnswer[questionCount].question);
	for (var i = 0; i < questionAnswer[questionCount].answers.length; i++) {
		var b = $('<button class="btn pill">');
		b.text(questionAnswer[questionCount].answers[i]);
		b.appendTo('#button'+i);
	}
	checkAnswer();
}

function nextQuestion() {
	time = 10;
	$('#timer').html('Timer: ' + time);
	getQuestion();
}

function checkFinalAnswer() {
	if (questionCount === questionAnswer.length -1){
		displayResults();
	}
}

function checkAnswer() {

	$('button').on('click', function() {
		if ($(this).text() == questionAnswer[questionCount].correct) {
			$('#result').html('That was the correct answer');
			correct++;
			reset();
		} 
		else {
			$('#result').html('That answer was incorrect the correct answer is ' + questionAnswer[questionCount].correct);
			incorrect++;
			reset();
		}
	});
	console.log(questionCount);
	checkFinalAnswer();
}

function empty() {
	for (var i = 0; i < 4; i++) {
		$('#button'+i).empty();
	}
	$('#question').empty();
	$('#result').empty();
}

function reset() {
	questionCount++;
	clearInterval(timer);
	setTimeout(empty, 3000);
	setTimeout(nextQuestion, 3000);
}

function displayResults() {
	$('#timer').addClass('displayNone');
	$('#result').html('Correct Answers: ' + correct);
	$('#question').html('Incorrect Answers: ' + incorrect);
	$('#answers').html('Unanswered:' + unAnswered);
	clearInterval(timer);
}

function resetGame() {
	
	time = 5;
	questionCount = 0;
	correct = 0;
	incorrect = 0;
	unAnswered = 0;
	setTimeout(getQuestion, 500);
}