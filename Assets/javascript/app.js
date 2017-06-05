$(document).ready(function() {
    $("#introSection").hide();
    $("#messageSection").hide();
    $('#instructionModal').modal();
    $('.parallax').parallax(); 
    $('.tooltipped').tooltip({ 
        delay: 50
    });


    $("#introSection").fadeIn(1000 * 5, function() { 
    });

    $("#questionSpace").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;


    function countDown() {
        $('.pickAnswer').click(function() {
            $(this).data('clicked', true);
        });
        var i = 30;
        var myInterval = setInterval(function() {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", {
                    times: 25
                }, 1000 * 5);
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1000);
    }

    var questions = [
        // question 1
        {
            "q": "Bob's father has 4 children. Momo, Meme, and Mumu are three of them. Who's the fourth?",
            "c": ["Momo Jr.", "Jebediah", "Bob"],
            "answer": 2
        },
        // question 2
        {
            "q": "I have three apples. If you take away two from me, how many do you have?",
            "c": ["2", "1", "infinite"],
            "answer": 0
        },
        // question 3
        {
            "q": "You have a match and you enter a wagon with a candle, a lamp and a fireplace. Which one do you light first?",
            "c": ["A Lamp", "A Candle", "A Match"],
            "answer": 2
        },
        // question 4
        {
            "q": "Before Mount Everest was discovered, what was the highest mountain in the world?",
            "c": ["Mount Kilamanjaro", "Mount Fuji", "Mount Everest"],
            "answer": 2
        },
        // question 5
        {
            "q": "A rooster laid an egg on top of the barn roof. Which way did it roll?",
            "c": ["Roosters don't lay eggs", "Down", "Rooster eggs are square and do not roll"],
            "answer": 0
        },
        // question 6
        {
            "q": "If a plane crashes on the border between the USA and Mexico, where do they bury the survivors?",
            "c": ["Mexico", "Survivors are not burried", "USA! USA! USA!"],
            "answer": 1
        },
        // question 7
        {
            "q": "How much dirt is there in a hole 3 feet deep, 6 ft long and 4 ft wide?",
            "c": ["10 Pounds of dirt", "0 Pounds of dirt", "Trick Question: Holes are illegal"],
            "answer": 1
        },
        // question 8
        {
            "q": "A girl kicks a soccer ball. It goes 10 feet and comes back to her. How is this possible?",
            "c": ["she has magical powers", "the soccer ball is in love with the girl", "she kicked it up in the air"],
            "answer": 2
        },
        // question 9
        {
            "q": "Some months have 31 days, others have 30 days. How many have 28 days?",
            "c": ["12", "0", "1"],
            "answer": 0
        },
        // question 10
        {
            "q": "Imagine you are in a sinking row boat surrounded by sharks. How would you survive?",
            "c": ["Engage the sharks in conversation and force them to see you as a person", "Kung Fu", "Stop imagining sharks and get back to work"],
            "answer": 2
        }
    ];


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame(); 
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr('indexnum'); 
            userChoice = parseInt(userChoice);

            
            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++
                alert("Correct");

            } else {
                incorrectCounter++;
                currentQuestionIndex++;
                alert("Incorrect")

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You have completed the game!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");

        setTimeout(startTrivia, 1000 * 10);

    }



    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSpace").show();

        startTrivia();


    })


});