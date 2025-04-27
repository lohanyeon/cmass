let current = 0; // 0 = intro, 1~5 = 문제
const total = 5;

const answers = {
  1: 'O',
  2: 'X',
  3: '운영체제',
  4: '센서',
  5: '출력'
};

function startGame() {
  document.getElementById('intro').classList.remove('active');
  document.getElementById('quiz1').classList.add('active');
  current = 1;
}

function showGuide() {
  alert("각 문제를 풀고 재료를 모아 피자를 만드는 게임입니다!");
}

function checkAnswer(num, userAnswer) {
  const correctAudio = document.getElementById('sound-correct');
  const incorrectAudio = document.getElementById('sound-incorrect');

  if (userAnswer === answers[num]) {
    correctAudio.currentTime = 0;
    correctAudio.play();
    showFeedback('잘 풀었어요!');
    document.querySelector(`.step[data-step="${num}"]`).classList.add('active');

    if (num < total) {
      setTimeout(() => {
        moveToNext(num);
      }, 1500);
    } else {
      setTimeout(() => {
        document.getElementById('quiz5').classList.remove('active');
        document.getElementById('make-food').classList.remove('hidden');
      }, 1500);
    }
  } else {
    incorrectAudio.currentTime = 0;
    incorrectAudio.play();
    showFeedback('다시 풀어 보세요!');
  }
}

function moveToNext(currentStep) {
  document.getElementById(`quiz${currentStep}`).classList.remove('active');
  document.getElementById(`quiz${currentStep + 1}`).classList.add('active');
}

function showFeedback(text) {
  const feedback = document.getElementById('feedback');
  feedback.textContent = text;
  feedback.style.display = 'block';
  setTimeout(() => {
    feedback.style.display = 'none';
  }, 1200);
}

function makeFood() {
  alert("🎉 축하합니다! 피자가 완성되었습니다!");
}

function showGuide() {
    document.getElementById('intro').classList.remove('active');
    document.getElementById('guide').classList.add('active');
  }
  
  function hideGuide() {
    document.getElementById('guide').classList.remove('active');
    document.getElementById('intro').classList.add('active');
  }
  