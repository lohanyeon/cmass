class PizzaGame {
    constructor() {
        this.stage = "01";
        this.title = "떡뽁이 만들기";
        this.food = "떡뽁이";
        this.firstStageName = "떡볶이가 담길 그릇";
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
        this.allIngredients = [
            "떡볶이 소스",
            "떡",
            "어묵",
            "파",
            "치즈",
            "삶은 달걀",
        ];
        this.currentIndex = 0;
        this.collectedIngredients = [];
  
        this.init();
    }
  
    init() {
        this.setIntro();
        this.setQsList();
        this.setItemList();
        this.setCookImages();

        document.querySelector('.btn_start').addEventListener('click', () => this.startGame());
        document.querySelector('.btn_ex').addEventListener('click', () => this.showElement('.ex_wrap'));
        document.querySelector('.btn_close').addEventListener('click', () => this.hideElement('.ex_wrap'));
  
        this.hideElement('.game_wrap');
        this.hideElement('.ex_wrap');
        this.hideElement('.qs_main .item_wrap .item_list li .item dt img');
        // this.hideElement('.btn_cook');
        this.hideElement('.pop_01');
        this.hideElement('.pop_02');
        this.hideElement('.pop_03');
        
        this.updateItemList();
    }

    setIntro() {
        const titleElement = document.querySelector('.intro_wrap h1');
        const subTitleElement = document.querySelector('.intro_wrap h2');
        const srOnlyElement = document.querySelector('.intro_wrap .sr-only');

        if (titleElement) {
            titleElement.textContent = this.title;
        }
        if (subTitleElement) {
            subTitleElement.textContent = `문제를 풀어 ${this.food}를 만들어 보세요.`;
        }
        if (srOnlyElement) {
            srOnlyElement.innerHTML = `
                이 활동은 문제를 풀어 다양한 재료를 모아 ${this.food}를 만드는 게임입니다. 
                게임 시작 버튼을 눌러 게임을 시작하거나, 게임 설명 버튼을 눌러 규칙을 확인할 수 있습니다.
            `;
        }
    }

    setQsList() {
        // 문제 수에 맞게 .qs_list 자동 생성
        const qsList = document.querySelectorAll('.qs_list');
        qsList.forEach(ul => {
            ul.innerHTML = ''; // 기존 항목 제거
            for (let i = 0; i < this.questions.length; i++) {
                const li = document.createElement('li');
                li.textContent = i + 1;
                ul.appendChild(li);
            }
        });
    }

    setItemList() {
        // 문제 수에 맞게 .item_list 자동 생성
        const itemLists = document.querySelectorAll('.item_list');
        itemLists.forEach(ul => {
            ul.innerHTML = '';
            for (let i = 0; i < this.allIngredients.length; i++) {
                const li = document.createElement('li');
                const dl = document.createElement('dl');
                dl.className = 'item';

                const dt = document.createElement('dt');
                const img = document.createElement('img');
                img.src = `img/item_${this.stage}_0${i+1}.png`; // 이미지 경로 규칙
                img.alt = this.allIngredients[i];
                dt.appendChild(img);

                const dd = document.createElement('dd');
                dd.textContent = this.allIngredients[i];

                dl.appendChild(dt);
                dl.appendChild(dd);
                li.appendChild(dl);
                ul.appendChild(li);
            }
        });
    }

    setCookImages() {
        const cookBox = document.querySelector('.cook_box');
    
        // 기존 기본 접시 이미지만 남기고 나머지 삭제
        cookBox.innerHTML = `
            <img src="img/cook_${this.stage}_00.png" alt="${this.firstStageName}">
        `;

        // allIngredients 기준으로 이미지 생성
        this.allIngredients.forEach((ingredient, index) => {
            const img = document.createElement('img');
            img.src = `img/cook_${this.stage}_0${index + 1}.png`; // 1부터 시작
            img.alt = ingredient;
            img.style.display = 'none'; // 처음엔 숨김
            img.style.opacity = 0;
            img.style.transform = 'scale(0.5)';
            cookBox.appendChild(img);
        });
    }

    updateItemList() {
        const itemList = document.querySelectorAll('.game_wrap .question .item_list li');
        const cookList = document.querySelectorAll('.game_wrap .cook .item_list li');
    
        itemList.forEach((li, index) => {
            const ingredient = allIngredients[index];
            const img = li.querySelector('img');
            const dd = li.querySelector('dd');
    
            if (img) img.alt = ingredient;
            if (dd) dd.textContent = ingredient;
        });

        cookList.forEach((li, index) => {
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
                // 홀짝에 따라 클래스 결정
                const btnClass = (index % 2 === 0) ? 'btn_bg_b' : 'btn_bg_r';
                div.innerHTML = `<button class="${btnClass}" data-index="${index + 1}" aria-label="${option}">${option}</button>`;
                checkWrap.appendChild(div);
                // document.querySelector('.btn_bg').addEventListener('click', () => this.submitAnswer(index+1));
            });
    
            checkWrap.querySelectorAll('button').forEach(btn => {
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
            this.playSound('correct');
        } else {
            // 오답 처리
            const span = document.createElement('span');
            span.className = 'pass_x';
            currentLi.prepend(span);

            const checkSpan = document.createElement('span');
            checkSpan.className = 'check_x';
            checkSpan.textContent = '오답';
            qsNum.insertAdjacentElement('afterend', checkSpan);

            const checkWrap = document.querySelector('.check_wrap');
            if (this.questions[this.currentIndex].type === 'OX') {
                if (userAnswer === 'O') {
                    const btn = checkWrap.querySelector('.btn_o');
                    if (btn) {
                        btn.classList.remove('btn_o');
                        btn.classList.add('btn_o_x');
                    }
                } else if (userAnswer === 'X') {
                    const btn = checkWrap.querySelector('.btn_x');
                    if (btn) {
                        btn.classList.remove('btn_x');
                        btn.classList.add('btn_x_x');
                    }
                }
            } else {
                const selectedButton = document.querySelector(`.btn_bg[data-index="${userAnswer}"]`);
                if (selectedButton) {
                    selectedButton.classList.remove('btn_bg');
                    selectedButton.classList.add('btn_bg_x');
                }
            }
            this.playSound('incorrect');
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
        this.hideElement('.game_wrap', 'question');
        this.showElement('.game_wrap', 'cook')
        // this.showElement('.btn_cook');
        // 요리판에 문제 상태 복제
        this.copyQuestionListStatus();
        this.initCookImages();
        document.querySelector('.btn_cook').addEventListener('click', () => this.makeFood());
        setTimeout(() => {
            alert('문제를 모두 풀었습니다! 음식 만들기를 누르세요.');
        }, 1000);
    }
  
    showElement(selector, filterClass = null) {
        let elements = [];
    
        if (typeof selector === 'string') {
            elements = document.querySelectorAll(selector);
        } else if (selector instanceof Element || selector instanceof HTMLImageElement) {
            elements = [selector]; // DOM객체면 바로 배열로 처리
        }
    
        elements.forEach(el => {
            if (!filterClass || el.classList.contains(filterClass)) {
                el.classList.add('show');
                el.style.visibility = 'visible';
                el.style.pointerEvents = 'auto';
                el.style.opacity = 0;
                el.style.transition = 'opacity 0.5s';
    
                // position이 fixed가 아니면 absolute로 세팅
                const computedPosition = window.getComputedStyle(el).position;
                if (computedPosition !== 'fixed') {
                    el.style.position = 'absolute';
                    el.style.top = '0';
                    el.style.left = '50%';
                    el.style.transform = 'translateX(-50%)';
                    el.style.zIndex = '1';
                }
    
                requestAnimationFrame(() => {
                    el.style.opacity = 1;
                });
            }
        });
    }
    
    hideElement(selector, filterClass = null) {
        let elements = [];
    
        if (typeof selector === 'string') {
            elements = document.querySelectorAll(selector);
        } else if (selector instanceof Element || selector instanceof HTMLImageElement) {
            elements = [selector];
        }
    
        elements.forEach(el => {
            if (!filterClass || el.classList.contains(filterClass)) {
                el.classList.add('show');
                el.style.transition = 'opacity 0.5s';
                el.style.opacity = 0;
                el.style.pointerEvents = 'none';
                el.style.visibility = 'hidden';
                // ★ 팝업은 z-index 유지해야 하니까
                if (!el.classList.contains('pop_01') && 
                    !el.classList.contains('pop_02') && 
                    !el.classList.contains('pop_03') && 
                    !el.classList.contains('dimmed')) {
                    el.style.zIndex = '0'; // 게임화면(intro, question, cook)만 z-index를 0으로
                }
            }
        });
    }     

    showCollectedIngredients() {
        const questionImages = document.querySelectorAll('.game_wrap.question .item_list li img');
        const cookImages = document.querySelectorAll('.game_wrap.cook .item_list li img');
    
        if (!this.questions[this.currentIndex]) return;
    
        const ingredients = this.questions[this.currentIndex].ingredients;
    
        ingredients.forEach(ingredient => {
            const index = this.allIngredients.indexOf(ingredient);
            if (index !== -1) {
                const qImg = questionImages[index];
                const cImg = cookImages[index];
    
                [qImg, cImg].forEach(img => {
                    if (img) {
                        img.style.visibility = 'visible';
                        img.style.pointerEvents = 'auto';
                        img.style.display = 'block';
                        img.style.opacity = 1;
                    }
                });
            }
        });
    }
    
    playSound(type) {
        let audio;
        if (type === 'correct') {
            audio = new Audio('sound/correct.mp3');
        } else if (type === 'incorrect') {
            audio = new Audio('sound/incorrect.mp3');
        }
        if (audio) {
            audio.play();
        }
    }    

    copyQuestionListStatus() {
        const originalListItems = document.querySelectorAll('.game_wrap.question .qs_list li');
        const cookListItems = document.querySelectorAll('.game_wrap.cook .qs_list li');
    
        originalListItems.forEach((originLi, index) => {
            const cookLi = cookListItems[index];
            if (!cookLi) return; // 방어
    
            // 기존 클래스(pass 등) 복사
            if (originLi.classList.contains('pass')) {
                cookLi.classList.add('pass');
            }
    
            // pass_o / pass_x 복사
            const passO = originLi.querySelector('.pass_o');
            const passX = originLi.querySelector('.pass_x');
    
            // 먼저 cook 쪽 li 안을 비우고 다시 세팅
            cookLi.innerHTML = originLi.innerHTML;
    
            if (passO) {
                const span = document.createElement('span');
                span.className = 'pass_o';
                cookLi.prepend(span);
            } else if (passX) {
                const span = document.createElement('span');
                span.className = 'pass_x';
                cookLi.prepend(span);
            }
        });
    }

    initCookImages() {
        const cookImages = document.querySelectorAll('.cook_box img');
    
        cookImages.forEach((img, index) => {
            if (index !== 0) {
                img.style.display = 'none';
                img.style.opacity = 0;
                img.style.transform = 'scale(0.5)';
            }
        });
    }

    makeFood() {
        // console.log('음식 만들기 시작!');
        const cookImages = document.querySelectorAll('.cook_box img');
        const ingredientMap = {};
        this.allIngredients.forEach((ingredient, index) => {
            ingredientMap[ingredient] = index + 1;
        });
    
        // 수집한 재료 순서대로 애니메이션 등장
        this.collectedIngredients.forEach((ingredient, i) => {
            const imgIndex = ingredientMap[ingredient];
            const targetImg = cookImages[imgIndex];
            if (targetImg) {
                setTimeout(() => {
                    targetImg.style.display = 'block';
                    requestAnimationFrame(() => {
                        targetImg.style.transition = 'opacity 0.5s, transform 0.5s';
                        targetImg.style.opacity = 1;
                        targetImg.style.transform = 'scale(1)';
                    });
                }, i * 500);
            }
        });

        setTimeout(() => {
            this.showResultPopup();
        }, this.collectedIngredients.length * 500 + 500); 
    }

    showDimmed() {
        if (!document.querySelector('.dimmed')) {
            const dim = document.createElement('div');
            dim.className = 'dimmed';
            document.body.appendChild(dim);
        }
    }
    
    hideDimmed() {
        const dim = document.querySelector('.dimmed');
        if (dim) {
            dim.remove();
        }
    }

    // 정답 수에 따라 팝업 표시
    showResultPopup() {
        const correctCount = this.collectedIngredients.length;
        this.showDimmed();

        let popupSelector = '';
        if (correctCount === 6) {
            popupSelector = '.pop_03';
        } else if (correctCount >= 2) {
            popupSelector = '.pop_02';
        } else {
            popupSelector = '.pop_01';
        }

        this.showElement(popupSelector);

        // 닫기 버튼 이벤트
        document.querySelectorAll('.btn_close_pop').forEach(btn => {
            btn.addEventListener('click', () => {
                this.hideElement(popupSelector);
                this.hideDimmed();
                this.changeToHomeButton(); // 홈으로 돌아가는 버튼 교체
            });
        });
    }
    
    changeToHomeButton() {
        const btnCook = document.querySelector('.btn_cook');
        if (btnCook) {
            btnCook.classList.remove('btn_cook');
            btnCook.classList.add('btn_home');
            btnCook.setAttribute('aria-label', '처음으로 돌아갑니다.');
            btnCook.innerText = ''; // 텍스트 제거 (배경이미지 사용)
            btnCook.style.background = "url('img/btn_home.png') no-repeat center center";
            btnCook.style.backgroundSize = "contain";
    
            btnCook.addEventListener('click', () => {
                this.restartGame();
            }, { once: true }); // 한번만 실행
        }
    }
    
    restartGame() {
        // 인트로 화면 보이기
        /* this.showElement('.intro_wrap');
        // 나머지 다 숨기기
        this.hideElement('.game_wrap');
        this.hideElement('.ex_wrap');
        this.hideElement('.pop_01');
        this.hideElement('.pop_02');
        this.hideElement('.pop_03');
        this.hideDimmed(); */
    
        location.reload(); // 새로고침(완전히 리셋하고 싶으면)
    }
    
}
  
// 페이지 로딩 완료 후 게임 인스턴스 생성
window.addEventListener('DOMContentLoaded', () => {
    new PizzaGame();
});
