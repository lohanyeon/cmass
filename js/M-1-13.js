class PizzaGame {
    constructor() {
        this.questions = [
            {
                type: "OX",
                text: "컴퓨팅 시스템을 이용하여 문제를 해결하면 사람이 직접 해결할 때보다 더 많은 양의 데이터를 더 빠르게 처리할 수 있다",
                correctAnswer: "O",
                ingredients: ["떡볶이 소스", "떡"],
            },
            {
                type: "OX",
                text: "컴퓨팅 시스템에서 정보는 “입력 -> 출력 -> 처리” 순으로 작업이 이루어진다",
                correctAnswer: "X",
                ingredients: ["어묵"],
            },
            {
                type: "MULTI",
                text: "사용자가 컴퓨터를 편리하게 사용할 수 있도록 도와주는 소프트웨어이다.",
                correctAnswer: "2",
                options: ["센서", "운영체제"],
                ingredients: ["파"],
            },
            {
                type: "MULTI",
                text: "주변 환경의 상태를 감지하는 피지컬 컴퓨팅 시스템의 입력 장치이다",
                correctAnswer: "1",
                options: ["센서", "LED 디스플레이"],
                ingredients: ["치즈"],
            },
            {
                type: "MULTI",
                text: "피지컬 컴퓨팅 시스템에서 구동기는 OO 장치이다. ",
                correctAnswer: "2",
                options: ["처리", "출력"],
                ingredients: ["삶은 달걀"],
            },
        ];
        this.currentIndex = 0;
        this.collectedIngredients = [];
  
        this.init();
    }
  
    init() {
        document.querySelector('.btn_start').addEventListener('click', () => this.startGame());
        document.querySelector('.btn_ex').addEventListener('click', () => this.showElement('.ex_wrap'));
        document.querySelector('.btn_close').addEventListener('click', () => this.hideElement('.ex_wrap'));
  
        this.hideElement('.game_wrap');
        this.hideElement('.ex_wrap');
        this.hideElement('.qs_main .item_wrap .item_list li .item dt img');
        this.hideElement('.btn_cook');
        this.hideElement('.pop_01');
        this.hideElement('.pop_02');
        this.hideElement('.pop_03');
        
        this.updateItemList();
    }

    updateItemList() {
        const itemList = document.querySelectorAll('.item_list li');
        const allIngredients = [
            "떡볶이 소스",
            "떡",
            "어묵",
            "파",
            "치즈",
            "삶은 달걀"
        ];
    
        itemList.forEach((li, index) => {
            const ingredient = allIngredients[index];
            const img = li.querySelector('img');
            const dd = li.querySelector('dd');
    
            if (img) img.alt = ingredient;
            if (dd) dd.textContent = ingredient;
        });
    }
  
    startGame() {
        this.hideElement('.intro_wrap');
        this.showElement('.game_wrap', 'question');
        this.showQuestion();
    }
  
    showQuestion() {
        const q = this.questions[this.currentIndex];
    
        document.querySelector('.qs_title').innerHTML = `첫번째 시도로 문제를 맞출 시 <span class="font_red">${q.ingredients.join('</span>와 <span class=\"font_red\">')}</span> 획득`;
        document.querySelector('.qs_txt .qs_num').textContent = this.currentIndex + 1;
        document.querySelector('.qs_txt p').textContent = q.text;
    
        const oldResult = document.querySelector('.qs_txt .check_o, .qs_txt .check_x');
        const checkWrap = document.querySelector('.check_wrap');
        checkWrap.innerHTML = '';

        if (oldResult) {
            oldResult.remove();
        }
    
        if (q.type === "OX") {
            checkWrap.innerHTML = `
                <div class="btn_check">
                    <button class="btn_o" aria-label="오">오</button>
                </div>
                <div class="btn_check">
                    <button class="btn_x" aria-label="엑스">엑스</button>
                </div>
            `;
    
            document.querySelector('.btn_o').addEventListener('click', () => this.submitAnswer('O'));
            document.querySelector('.btn_x').addEventListener('click', () => this.submitAnswer('X'));
        } else if (q.type === "MULTI") {
            q.options.forEach((option, index) => {
                const div = document.createElement('div');
                div.className = 'btn_check';
                div.innerHTML = `<button class="btn_bg" data-index="${index + 1}" aria-label="${option}">${option}</button>`;
                checkWrap.appendChild(div);
                // document.querySelector('.btn_bg').addEventListener('click', () => this.submitAnswer(index+1));
            });
    
            document.querySelectorAll('.btn_bg').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.submitAnswer(e.target.getAttribute('data-index'));
                });
            });
        }
    }
  
    submitAnswer(userAnswer) {
        const correct = this.questions[this.currentIndex].correctAnswer;
        const questionListItems = document.querySelectorAll('.qs_list li');
        const currentLi = questionListItems[this.currentIndex];
        const qsTxt = document.querySelector('.qs_txt');
        const qsNum = qsTxt.querySelector('.qs_num');
        const oldResult = qsTxt.querySelector('.check_o, .check_x');

        currentLi.classList.add('pass'); // 문제 풀었으면 .pass 추가
        if (oldResult) {
            oldResult.remove();
        }
        
        if (userAnswer === correct) {
            // 정답 처리
            this.collectedIngredients.push(...this.questions[this.currentIndex].ingredients);

            // li에 pass_o 추가
            const span = document.createElement('span');
            span.className = 'pass_o';
            currentLi.prepend(span);

            // 문제 영역에 check_o 추가
            const checkSpan = document.createElement('span');
            checkSpan.className = 'check_o';
            checkSpan.textContent = '정답';
            qsNum.insertAdjacentElement('afterend', checkSpan);
            this.showCollectedIngredients();
        } else {
            // 오답 처리
            const span = document.createElement('span');
            span.className = 'pass_x';
            currentLi.prepend(span);

            const checkSpan = document.createElement('span');
            checkSpan.className = 'check_x';
            checkSpan.textContent = '오답';
            qsNum.insertAdjacentElement('afterend', checkSpan);

            // MULTI 문제일 경우 오답 버튼 스타일 변경
            const selectedButton = document.querySelector(`.btn_bg[data-index="${userAnswer}"]`);
            if (selectedButton) {
                selectedButton.classList.remove('btn_bg');
                selectedButton.classList.add('btn_bg_x');
            }
        }

        // 정답/오답과 상관없이 무조건 1초 뒤 다음 문제로
        setTimeout(() => {
            this.currentIndex++;
            if (this.currentIndex < this.questions.length) {
                this.showQuestion();
            } else {
                this.finishGame();
            }
        }, 1000);
    }

    showGameGuide() {
        this.showElement('.ex_wrap');
    }
    
    hideGameGuide() {
        this.hideElement('.ex_wrap');
    }
  
    finishGame() {
        alert('문제를 모두 풀었습니다! 음식 만들기를 누르세요.');
        this.hideElement('.game_wrap', 'question');
        this.showElement('.game_wrap', 'cook')
        this.showElement('.btn_cook');
    }
  
    showElement(selector, filterClass = null) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (!filterClass || el.classList.contains(filterClass)) {
                el.style.opacity = 0;
                el.style.display = 'block';
                el.style.transition = 'opacity 0.5s';
                requestAnimationFrame(() => {
                    el.style.opacity = 1;
                });
            }
        });
    }
    
    hideElement(selector, filterClass = null) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (!filterClass || el.classList.contains(filterClass)) {
                el.style.transition = 'opacity 0.5s';
                el.style.opacity = 0;
                setTimeout(() => {
                    el.style.display = 'none';
                }, 500);
            }
        });
    }      

    showCollectedIngredients() {
        const itemImages = document.querySelectorAll('.item_list li img');
    
        if (this.currentIndex === 0) {
            // 1단계: 떡볶이 소스(0) + 떡(1)
            this.showElement('.item_list li:nth-child(1) img');
            this.showElement('.item_list li:nth-child(2) img');
        } else {
            // 2단계부터는 한 개씩
            const targetIndex = this.currentIndex + 1; // 2단계(currentIndex=1)이면 2번째 이미지 보여야 함
            this.showElement(`.item_list li:nth-child(${targetIndex + 1}) img`);
        }
    }
}
  
// 페이지 로딩 완료 후 게임 인스턴스 생성
window.addEventListener('DOMContentLoaded', () => {
    new PizzaGame();
});