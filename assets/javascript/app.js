$(document).ready(function () {

    $("#start").on('click', function () {
        $("#start").remove();
        game.loadQuestion();
        console.log("start is working! step 1");
    });

    $(document).on('click', '.answer-button', function (e) {
        game.clickedButton(e);
    });

    var questions = [{
        question: "When is Taylor's birthday?",
        answers: ["April 15, 1989", "November 30, 1992", "December 13, 1989"],
        correctAnswer: "December 13, 1989",
    },
    {
        question: "In 2012, Taylor made the Guinness World Records for the Fastest Selling Single in Digital History. Which song broke the internet?",
        answers: ["Love Story", "We Are Never Getting Back Together", "Blank Space"],
        correctAnswer: "We Are Never Getting Back Together",
    },

    {
        question: "Taylor has two cats named after which two popular TV characters?",
        answers: ["Olivia Benson & Meredith Gray", "Pam Beasley & Rachel Green", "Carrie Bradshaw & Liz Lemon"],
        correctAnswer: "Olivia Benson & Meredith Gray",
    },
    {
        question: "What is Taylor's lucky number?",
        answers: ["7", "21", "13", "44"],
        correctAnswer: "13"
    },
    {
        question: "Finish the lyric: <br> So it's gonna be forever or...",
        answers: ["it's gonna blow up today", "it's gonna go down in flames", "i'm going to run away", "None of these are correct."],
        correctAnswer: "it's gonna go down in flames"
    }
];

    var game =
        {
            questions: $(questions),
            currentQuestion: 0,
            counter: 20,
            correct: 0,
            incorrect: 0,
            unanswered: 0,
            countDown: function () {
                game.counter--;
                $("#timer").html(game.counter);
                if (game.counter <= 0) {
                    game.timeUp();
                }
            },
            loadQuestion: function () {
                timer = setInterval(game.countDown, 1000);
                $("#wrapper").html("<br><h2>" + game.questions[game.currentQuestion].question + "</h2>");
                for (i = 0; i < game.questions[game.currentQuestion].answers.length; i++) {
                $("#wrapper").append('<button class="answer-button" id="button-' + i + '" data-name="' + game.questions[game.currentQuestion].answers[i] + '">' + game.questions[game.currentQuestion].answers[i] + "</button>").css("button{border-radius: 1rem;}");
                }
            },
            nextQuestion: function () {
                game.counter = 20;
                $("#timer").html(game.counter);
                game.currentQuestion++;
                game.loadQuestion();
            },
            timeUp: function () {
                clearInterval(timer);
                game.unanswered++;
                $("#wrapper").html("<h2>Out of time!</h2>");
                $("#wrapper").append("<h3>The correct Answer was: " + game.questions[game.currentQuestion].correctAnswer + "</h3>");
                if (game.currentQuestion == game.questions.length - 1) {
                    setTimeout(game.results, 3000);
                } else {
                    setTimeout(game.nextQuestion, 3000);
                }
            },

            results: function () {
                $("#timer").remove();
                $("#wrapper").html("<h2>All done!</h2>");
                $("#wrapper").append("<h3>Correct: " + game.correct + "</h3>");
                $("#wrapper").append("<h3>Inorrect: " + game.incorrect + "</h3>");
                $("#wrapper").append("<h3>Unanswered: " + game.unanswered + "</h3>");
            },

            clickedButton: function (e) {
                clearInterval(timer);
                if ($(e.target).data("name") == game.questions[game.currentQuestion].correctAnswer) {
                    game.answeredCorrectly(e);
                } else {
                    game.answeredIncorrectly(e);
                };
            },

            answeredCorrectly: function () {
                console.log("Correct");
                game.correct++;
                $("#wrapper").html("<h2>Correct!</h2>");
                if (game.currentQuestion == game.questions.length - 1) {
                    setTimeout(game.results, 3000);
                } else {
                    setTimeout(game.nextQuestion, 3000);
                };
            },

            answeredIncorrectly: function () {
                console.log("Incorrect");
                game.incorrect++;
                $("#wrapper").html("<h2>Wrong!</h2>");
                $("#wrapper").append("<h3>The correct Answer was: " + game.questions[game.currentQuestion].correctAnswer + "</h3>");
                if (game.currentQuestion == game.questions.length - 1) {
                    setTimeout(game.results, 3000);
                } else {
                    setTimeout(game.nextQuestion, 3000);
                }
            },

            reset: function () {

            }

            

        }

});