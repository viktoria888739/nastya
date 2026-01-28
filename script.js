document.addEventListener('DOMContentLoaded', () => {
    function createHoles() {
        // Только для горизонтальных пленок (screen1)
        const horizontalContainers = document.querySelectorAll('.film_wrapper:not(.vertical-film) .film_squares');
        const screenWidth = window.innerWidth;
        const holeWidth = 15;
        const holeGap = 3;
        const holeCount = Math.ceil(screenWidth / (holeWidth + holeGap));

        horizontalContainers.forEach(container => {
            container.innerHTML = '';
            for (let i = 0; i < holeCount; i++) {
                const hole = document.createElement('div');
                hole.className = 'film_square';
                container.appendChild(hole);
            }
        });

        // Создаем отверстия для вертикальной пленки
        createVerticalHoles();
    }

    createHoles();
    window.addEventListener('resize', createHoles);
    createVerticalFilm();

    function createFilm() {
        const cont = document.getElementById('filmCont');
        const photoSrc = 'assets/images/nastya_cool.svg';
        cont.innerHTML = '';

        for (let i = 0; i < 20; i++) {
            const img = document.createElement('img');
            img.src = photoSrc;
            img.className = 'film_photo';
            img.alt = `Nastya ${i + 1}`;
            cont.appendChild(img);
        }

        cont.innerHTML += cont.innerHTML;
    }

    createFilm();
    window.addEventListener('resize', createHoles);

    function createVerticalFilm() {
        const cont = document.getElementById('filmCont2');
        if (!cont) return;
        const photos = [
            'assets/images/cool_nastya2.svg',
            'assets/images/circled_nastya.svg',
            'assets/images/school_nastya.svg'
        ];
        cont.innerHTML = '';

        for (let i = 0; i < 12; i++) {
            const img = document.createElement('img');
            const photoIndex = i % photos.length;
            img.src = photos[photoIndex];
            img.className = 'film_photo';
            img.alt = `Nastya ${photoIndex + 1}`;
            cont.appendChild(img);
        }

        cont.innerHTML += cont.innerHTML;
        createVerticalHoles();
    }

    function createVerticalHoles() {
        const verticalWrappers = document.querySelectorAll('.vertical-film');

        verticalWrappers.forEach(wrapper => {
            const squares = wrapper.querySelectorAll('.film_squares');
            const wrapperHeight = 700; // Высота из CSS

            squares.forEach(squareContainer => {
                squareContainer.innerHTML = '';
                // Создаем 15 отверстий (примерно)
                for (let i = 0; i < 15; i++) {
                    const hole = document.createElement('div');
                    hole.className = 'film_square';
                    squareContainer.appendChild(hole);
                }
            });
        });
    }
    function createGame() {
        const facts = [
            { text: "Настя гений", isTrue: true },
            { text: "Настя рычит в ярости", isTrue: false },
            { text: "У Насти гастрит", isTrue: true },
            { text: "Настя летает", isTrue: false },
            { text: "Настя сидит на наркотиках", isTrue: true },
            { text: "Настя прыгала с парашютом ", isTrue: true }
        ];

        const container = document.getElementById('factsContainer');
        container.innerHTML = '';

        facts.forEach((fact, index) => {
            const card = document.createElement('div');
            card.className = 'fact_card';
            card.textContent = fact.text;

            card.addEventListener('click', function () {
                // При клике сразу показываем ответ
                if (fact.isTrue) {
                    this.style.borderColor = 'green';
                    this.style.borderWidth = '3px';
                    this.innerHTML += '<div style="color:green; margin-top:10px;">✓ Правда</div>';
                } else {
                    this.style.borderColor = 'red';
                    this.style.borderWidth = '3px';
                    this.innerHTML += '<div style="color:red; margin-top:10px;">X Ложь</div>';
                }

                this.style.pointerEvents = 'none';
            });

            container.appendChild(card);
        });

        // Убираем кнопку проверки, если она есть
        const checkBtn = document.getElementById('checkButton');
        if (checkBtn) checkBtn.style.display = 'none';

        // Добавляем кнопку сброса
        const resetBtn = document.createElement('button');
        resetBtn.textContent = 'Сбросить игру';
        resetBtn.style.cssText = `
        background: #010872;
        color: white;
        border: none;
        padding: 15px 30px;
        border-radius: 10px;
        cursor: pointer;
        display: block;
        margin: 30px auto;
        font-size: 18px;
    `;

        resetBtn.addEventListener('click', createGame);

        const resultArea = document.getElementById('resultArea');
        if (resultArea) {
            resultArea.innerHTML = '';
            resultArea.appendChild(resetBtn);
        }
    }
    createGame();
    function createSimpleFlipCard() {
        const flipCard = document.getElementById('flipCard');
        if (!flipCard) return;

        // Находим элементы
        const cardFront = flipCard.querySelector('.card-front');
        const cardBack = flipCard.querySelector('.card-back');
        const musicBtn = flipCard.querySelector('.music-btn');
        const imageBtn = flipCard.querySelector('.image-btn');
        const hint = document.querySelector('.bottom_p');

        // Функция переворота карточки
        flipCard.addEventListener('click', function (e) {
            // Не переворачиваем если кликнули по кнопке
            if (e.target.classList.contains('music-btn') || e.target.classList.contains('image-btn')) {
                return;
            }

            if (cardFront.style.display !== 'none') {
                // Переворачиваем на обратную сторону
                cardFront.style.display = 'none';
                cardBack.style.display = 'flex';
                flipCard.style.backgroundColor = 'white';
                flipCard.style.color = '#010872';
                hint.textContent = 'Нажмите на карточку или кнопки';
            } else {
                // Возвращаем на лицевую сторону
                cardFront.style.display = 'flex';
                cardBack.style.display = 'none';
                flipCard.style.color = 'white';
                hint.textContent = 'Нажмите, чтобы перевернуть карточку';
            }
        });
        const audio = new Audio();

        // Можно использовать демо-ссылку или свою
        audio.src = 'assets/music/PARAGOR_-_Neon_Shadows_77823217.mp3';
        let isPlaying = false;
        // Кнопка "Послушать песню"
        musicBtn.addEventListener('click', function (e) {
            e.stopPropagation(); // Останавливаем всплытие

            // Создаем аудио

            // Пробуем воспроизвести
            if (isPlaying) {
                // Останавливаем
                audio.pause();
                this.textContent = 'Включить песню';
                isPlaying = false;
            } else {
                // Включаем
                audio.play()
                    .then(() => {
                        this.textContent = 'Остановить';
                        isPlaying = true;
                    })
            }
        });

        // Кнопка "Посмотреть на окапи"
        imageBtn.addEventListener('click', function (e) {
            e.stopPropagation(); // Останавливаем всплытие

            // Создаем окно с изображением
            const modal = document.createElement('div');
            modal.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        `;

            const img = document.createElement('img');
            img.src = 'assets/images/okapy.png';
            img.alt = 'Окапи';
            img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
        `;

            // Закрытие по клику
            modal.addEventListener('click', function () {
                document.body.removeChild(modal);
            });

            modal.appendChild(img);
            document.body.appendChild(modal);
        });
    }
    function createRunningNastyaGame() {
        const gameArea = document.getElementById('gameArea');

        // Проверяем, есть ли уже изображение
        const existingImage = gameArea.querySelector('.nastya-image');
        if (existingImage) {
            existingImage.remove(); // Удаляем старое изображение если есть
        }

        const nastyaImage = document.createElement('img');
        const nastyaImage2 = document.createElement('img');
        const nastyaImage3 = document.createElement('img');

        // Настройка изображения
        nastyaImage.src = 'assets/images/mini_nastya.svg';
        nastyaImage.className = 'nastya-image';
        nastyaImage.alt = 'Мини Настя';

        nastyaImage2.src = 'assets/images/lera.svg';
        nastyaImage2.className = 'nastya-image';
        nastyaImage2.alt = 'Мини Лера';

        nastyaImage3.src = 'assets/images/ira.svg';
        nastyaImage3.className = 'nastya-image';
        nastyaImage3.alt = 'Мини Ира';
        // Устанавливаем position: absolute через JavaScript
        nastyaImage.style.position = 'absolute';
        nastyaImage2.style.position = 'absolute';
        nastyaImage3.style.position = 'absolute';


        gameArea.appendChild(nastyaImage);
        gameArea.appendChild(nastyaImage2);
        gameArea.appendChild(nastyaImage3);

        let x = 100;
        let y = 100;
        let dx = 14;
        let dy = 10;

        let x2 = 150;
        let y2 = 150;
        let dx2 = 10;
        let dy2 = 10;
        
        let x3 = 200;
        let y3 = 200;
        let dx3 = 15;
        let dy3 = 15;
        // Устанавливаем начальную позицию
        nastyaImage.style.left = x + 'px';
        nastyaImage.style.top = y + 'px';

        nastyaImage2.style.left = x2 + 'px';
        nastyaImage2.style.top = y2 + 'px';

        nastyaImage3.style.left = x3 + 'px';
        nastyaImage3.style.top = y3 + 'px';
        // Движение
        function move() {
            x += dx;
            y += dy;

            x2 += dx2;
            y2 += dy2;

            x3 += dx3;
            y3 += dy3;
            // Отскок от стен
            if (x <= 0 || x >= 1300) dx = -dx;
            if (y <= 0 || y >= 500) dy = -dy;

            if (x2 <= 0 || x2 >= 1300) dx2 = -dx2;
            if (y2 <= 0 || y2 >= 500) dy2 = -dy2;

            if (x3 <= 0 || x3 >= 1300) dx3 = -dx3;
            if (y3 <= 0 || y3 >= 500) dy3 = -dy3;

            nastyaImage.style.left = x + 'px';
            nastyaImage.style.top = y + 'px';

            nastyaImage2.style.left = x2 + 'px';
            nastyaImage2.style.top = y2 + 'px';

            nastyaImage3.style.left = x3 + 'px';
            nastyaImage3.style.top = y3 + 'px';

            requestAnimationFrame(move);
        }

        // Клик
        nastyaImage.addEventListener('click', function () {
            alert('ПОБЕДА! Вы поймали Настю!');
            location.reload(); // Перезагрузка для новой игры
        });
        nastyaImage2.addEventListener('click', function () {
            alert('Это Лера! Вы не поймали Настю!');
            location.reload(); // Перезагрузка для новой игры
        });
        nastyaImage3.addEventListener('click', function () {
            alert('Это Ира! Вы не поймали Настю!');
            location.reload(); // Перезагрузка для новой игры
        });

        move();
    }
    createRunningNastyaGame();
    createSimpleFlipCard();
});