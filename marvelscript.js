
// Marvel Script


(function() {
  var questions = [{
    question: "What is Iron man's real Name?",
    choices: ["benny jones","john Smith","Tony Stark","Justin King"],
    correctAnswer: 2
  }, {
    question: "Black Panther Made his debut in which marvel Movie?",
    choices: ["Thor","Iron Man","Captain America:civil war","Iron Man 2"],
    correctAnswer: 2
  }, {
    question: "Johnny storm is also known as which member of the fantastic 4?",
    choices: ["Human torch","Mr.fantastic","Thing","Clark Kent"],
    correctAnswer: 0
  }, {
    question: "This hero resides in hells kitchen and works as lawyer by day",
    choices: ["The Hulk","Ant-Man","Hawk-Eye","Dare-devil"],
    correctAnswer: 3
  }, {
    question: "How many infinity stones are there?",
    choices: ["one","two","six","none"],
    correctAnswer: 2
  }, {
    question: "Which of these characters are members of the avengers?",
    choices: ["Black widow","Spider-Man","war machine","All of the Above"],
    correctAnswer: 3
  }, {
    question: "Bruce Banner is the brainy Scientist also known as who?",
    choices: ["The Hulk","Ant-Man","Hawk-Eye","Vision"],
    correctAnswer: 0
  }, {
    question: "Which marvel character is half vampire but hates vampires?",
    choices: ["Blade","Dracula","Blacula","Van Helseing"],
    correctAnswer: 0
  }, {
    question: "Which member of the x-men can control the weather?",
    choices: ["Fox","wolf","storm","rogue"],
    correctAnswer: 2
  }, {
    question: "What is Captain America's real name?",
    choices: ["John Thomas","Steve Rodgers","Steve Bannon","Clark Kent"],
    correctAnswer: 1
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) +  ' of 10:</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();