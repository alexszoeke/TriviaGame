$(document).ready(function () {

    $("#start").on('click', function () {
        $("#start").remove();
        $("#taylorsnl").remove();
        game.loadQuestion();
        console.log("start is working! step 1");
    });

    $(document).on('click', '.answer-button', function (e) {
        game.clickedButton(e);
    });

    $(document).on('click', '#replay', function () {
        game.reset();
    });

    var questions = [{
        question: "When is Taylor's birthday?",
        answers: ["March 11, 1992", "November 30, 1992", "December 13, 1989", "February 21, 1991"],
        correctAnswer: "December 13, 1989",
        imageURL: '<img src="./assets/images/1989.gif" alt="1989 Album">'
    },
    {
        question: "In 2012, Taylor made the Guinness World Records for the Fastest Selling Single in Digital History. Which song broke the internet?",
        answers: ["Love Story", "We Are Never Getting Back Together", "Blank Space", "Bad Blood"],
        correctAnswer: "We Are Never Getting Back Together",
        imageURL: '<img src="./assets/images/wangbt.gif" alt="We Are Never Getting Back Together">'
    },

    {
        question: "Taylor has two cats named after which two popular TV characters?",
        answers: ["Olivia Benson & Meredith Gray", "Pam Beasley & Rachel Green", "Carrie Bradshaw & Liz Lemon", "Bart Simpson & Michael Scott"],
        correctAnswer: "Olivia Benson & Meredith Gray",
        imageURL: '<img src="./assets/images/cats.gif" alt="Olivia and Meredith">'
    },
    {
        question: "What is Taylor's lucky number?",
        answers: ["7", "21", "13", "44"],
        correctAnswer: "13",
        imageURL: '<img src="./assets/images/13.gif" alt="Lucky 13">'
    },
    {
        question: "Finish the lyric: <br> So it's gonna be forever or...",
        answers: ["it's gonna blow up today", "it's gonna go down in flames", "i'm going to run away", "None of these are correct."],
        correctAnswer: "it's gonna go down in flames",
        imageURL: '<img src="./assets/images/blankspace.gif" alt="Blank Space">'
    },
    {
        question: "Which of the following is the correct name for the various meet & greets Taylor has after her concerts?",
        answers: ["The T-Party Room","Club Red", "Loft 89", "All of the above"],
        correctAnswer: "All of the above",
        imageURL:'<img src="./assets/images/loft89.gif" alt="Loft 89">'
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
                $("#timer").html("<h2> Time Remaining: <span id='counter'>" + game.counter + " Seconds</span></h2>");
                if (game.counter <= 0) {
                    game.timeUp();
                }
            },
            loadQuestion: function () {
                timer = setInterval(game.countDown, 1000);
                $("#timer").show().html("<h2> Time Remaining: <span id='counter'>" + game.counter + " Seconds</span></h2>");
                $("#wrapper").html("<br><h2>" + game.questions[game.currentQuestion].question + "</h2>");
                for (i = 0; i < game.questions[game.currentQuestion].answers.length; i++) {
                $("#wrapper").append('<br><button class="answer-button" id="button-' + i + '" data-name="' + game.questions[game.currentQuestion].answers[i] + '">' + game.questions[game.currentQuestion].answers[i] + "</button>");
                }
            },
            nextQuestion: function () {
                game.counter = 20;
                $("#timer").show().html("<h2> Time Remaining: <span id='counter'>" + game.counter + " Seconds</span></h2>");
                game.currentQuestion++;
                game.loadQuestion();
            },
            timeUp: function () {
                clearInterval(timer);
                game.unanswered++;
                $("#wrapper").html("<h2>Out of time!</h2>");
                $("#wrapper").append("<h3>The correct Answer was: " + game.questions[game.currentQuestion].correctAnswer + "</h3>");
                $("#wrapper").append(game.questions[game.currentQuestion].imageURL);
                if (game.currentQuestion == game.questions.length - 1) {
                    setTimeout(game.results, 3000);
                } else {
                    setTimeout(game.nextQuestion, 3000);
                }
            },

            results: function () {
                $("#timer").hide();
                $("#wrapper").html("<h2>All done!</h2>");
                $("#wrapper").append("<h3>Correct: " + game.correct + "</h3>");
                $("#wrapper").append("<h3>Incorrect: " + game.incorrect + "</h3>");
                $("#wrapper").append("<h3>Unanswered: " + game.unanswered + "</h3>");
                $("#wrapper").append("<button id='replay'>Play it again?</button>")
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
                $("#wrapper").append(game.questions[game.currentQuestion].imageURL);
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
                $("#wrapper").append(game.questions[game.currentQuestion].imageURL);
                if (game.currentQuestion == game.questions.length - 1) {
                    setTimeout(game.results, 3000);
                } else {
                    setTimeout(game.nextQuestion, 3000);
                }
            },

            reset: function () {
                game.currentQuestion = 0,
                game.counter = 20,
                game.correct = 0,
                game.incorrect = 0
                game.unanswered = 0;
                game.loadQuestion();
            }

            

        }

});
