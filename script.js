const quizData = [
      { question: "What is the capital of France?", options: ["London", "Paris", "Berlin", "Madrid"], answer: "Paris" },
      { question: "What is 5 + 3?", options: ["5", "8", "9", "7"], answer: "8" },
      { question: "Which language is used for web apps?", options: ["Python", "Java", "PHP", "JavaScript"], answer: "JavaScript" }
    ];

    let currentQuestion = 0;
    let score = 0;
    let timer;
    let timeLeft = 10;

    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const feedbackEl = document.getElementById("feedback");
    const nextBtn = document.getElementById("next-btn");
    const scoreBox = document.getElementById("score-box");
    const finalScore = document.getElementById("final-score");
    const timerEl = document.getElementById("time");
    const badgeEl = document.getElementById("badge");
    const correctSound = document.getElementById("correct-sound");
    const wrongSound = document.getElementById("wrong-sound");

    function loadQuestion() {
      clearInterval(timer);
      timeLeft = 10;
      timerEl.textContent = timeLeft;

      const q = quizData[currentQuestion];
      questionEl.textContent = q.question;
      optionsEl.innerHTML = "";
      feedbackEl.textContent = "";
      nextBtn.disabled = true;

      q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => checkAnswer(btn, q.answer);
        optionsEl.appendChild(btn);
      });

      timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft === 0) {
          clearInterval(timer);
          autoRevealAnswer(q.answer);
        }
      }, 1000);
    }

    function checkAnswer(selectedBtn, correctAnswer) {
      clearInterval(timer);
      const allButtons = optionsEl.querySelectorAll("button");
      allButtons.forEach(btn => btn.disabled = true);

      if (selectedBtn.textContent === correctAnswer) {
        selectedBtn.classList.add("correct");
        feedbackEl.textContent = "✅ Correct!";
        correctSound.play();
        score++;
      } else {
        selectedBtn.classList.add("wrong");
        feedbackEl.textContent = `❌ Wrong! Correct: ${correctAnswer}`;
        wrongSound.play();
        allButtons.forEach(btn => {
          if (btn.textContent === correctAnswer) btn.classList.add("correct");
        });
      }

      nextBtn.disabled = false;
    }

    function autoRevealAnswer(correctAnswer) {
      feedbackEl.textContent = `⏰ Time's up! Correct: ${correctAnswer}`;
      const allButtons = optionsEl.querySelectorAll("button");
      allButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correctAnswer) btn.classList.add("correct");
      });
      wrongSound.play();
      nextBtn.disabled = false;
    }

    nextBtn.onclick = () => {
      currentQuestion++;
      if (currentQuestion < quizData.length) {
        loadQuestion();
      } else {
        showScore();
      }
    };

    function showScore() {
      document.getElementById("quiz-box").classList.add("hidden");
      scoreBox.classList.remove("hidden");
      finalScore.textContent = `${score} / ${quizData.length}`;

      if (score === quizData.length) {
        badgeEl.textContent = "🏆 Excellent! You aced it!";
      } else if (score >= quizData.length / 2) {
        badgeEl.textContent = "👍 Good job! Try to improve more.";
      } else {
        badgeEl.textContent = "📘 Keep practicing and you'll get better!";
      }
    }

    loadQuestion();