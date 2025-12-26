// 게임 캔버스 및 컨텍스트 설정
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 게임 변수
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = {};
let dx = 0;
let dy = 0;
let score = 0;
let gameRunning = true;

// 최고 점수 로드
let highScore = localStorage.getItem('snakeHighScore') || 0;
document.getElementById('high-score').textContent = highScore;

// 음식 생성 함수
function generateFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    
    // 뱀과 겹치지 않도록 확인
    for (let segment of snake) {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
            return;
        }
    }
}

// 게임 초기화
function initGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    score = 0;
    gameRunning = true;
    document.getElementById('score').textContent = score;
    document.getElementById('gameOver').classList.add('hidden');
    generateFood();
    gameLoop();
}

// 게임 오버 처리
function gameOver() {
    gameRunning = false;
    
    // 최고 점수 업데이트
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        document.getElementById('high-score').textContent = highScore;
    }
    
    document.getElementById('final-score').textContent = score;
    document.getElementById('gameOver').classList.remove('hidden');
}

// 그리기 함수들
function drawSnake() {
    // 뱀의 몸통 그리기
    for (let i = 0; i < snake.length; i++) {
        const segment = snake[i];
        const x = segment.x * gridSize + gridSize / 2;
        const y = segment.y * gridSize + gridSize / 2;
        const radius = gridSize / 2 - 2;
        
        // 머리인지 확인
        if (i === 0) {
            // 뱀 머리 그리기 (더 크고 눈이 있음)
            ctx.beginPath();
            ctx.arc(x, y, radius + 1, 0, Math.PI * 2);
            ctx.fillStyle = '#4a90e2';
            ctx.fill();
            ctx.strokeStyle = '#2c5f8d';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // 눈 그리기 (방향에 따라)
            ctx.fillStyle = '#fff';
            if (dx === 1) { // 오른쪽
                ctx.beginPath();
                ctx.arc(x + 3, y - 3, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + 3, y + 3, 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (dx === -1) { // 왼쪽
                ctx.beginPath();
                ctx.arc(x - 3, y - 3, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x - 3, y + 3, 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (dy === -1) { // 위
                ctx.beginPath();
                ctx.arc(x - 3, y - 3, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + 3, y - 3, 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (dy === 1) { // 아래
                ctx.beginPath();
                ctx.arc(x - 3, y + 3, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + 3, y + 3, 2, 0, Math.PI * 2);
                ctx.fill();
            } else { // 정지 상태
                ctx.beginPath();
                ctx.arc(x - 3, y - 3, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + 3, y - 3, 2, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // 눈동자
            ctx.fillStyle = '#000';
            if (dx === 1) {
                ctx.beginPath();
                ctx.arc(x + 4, y - 3, 1, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + 4, y + 3, 1, 0, Math.PI * 2);
                ctx.fill();
            } else if (dx === -1) {
                ctx.beginPath();
                ctx.arc(x - 4, y - 3, 1, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x - 4, y + 3, 1, 0, Math.PI * 2);
                ctx.fill();
            } else if (dy === -1) {
                ctx.beginPath();
                ctx.arc(x - 3, y - 4, 1, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + 3, y - 4, 1, 0, Math.PI * 2);
                ctx.fill();
            } else if (dy === 1) {
                ctx.beginPath();
                ctx.arc(x - 3, y + 4, 1, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + 3, y + 4, 1, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.arc(x - 3, y - 3, 1, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x + 3, y - 3, 1, 0, Math.PI * 2);
                ctx.fill();
            }
        } else {
            // 뱀 몸통 그리기 (원형)
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = '#667eea';
            ctx.fill();
            ctx.strokeStyle = '#5568d3';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
}

function drawFood() {
    // 사과 모양으로 음식 그리기
    const x = food.x * gridSize + gridSize / 2;
    const y = food.y * gridSize + gridSize / 2;
    const radius = gridSize / 2 - 2;
    
    // 사과 본체 (빨간색 원)
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#e74c3c';
    ctx.fill();
    ctx.strokeStyle = '#c0392b';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // 사과 하이라이트
    ctx.beginPath();
    ctx.arc(x - 3, y - 3, radius / 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fill();
    
    // 사과 줄기
    ctx.strokeStyle = '#27ae60';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y - radius);
    ctx.lineTo(x, y - radius - 3);
    ctx.stroke();
    
    // 사과 잎
    ctx.fillStyle = '#27ae60';
    ctx.beginPath();
    ctx.ellipse(x + 2, y - radius - 2, 2, 3, -0.5, 0, Math.PI * 2);
    ctx.fill();
}

function clearCanvas() {
    // 배경색
    ctx.fillStyle = '#f0f4f8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 그리드 패턴 그리기
    ctx.strokeStyle = '#e0e7ef';
    ctx.lineWidth = 1;
    for (let i = 0; i <= tileCount; i++) {
        // 세로선
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        
        // 가로선
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
    }
}

// 뱀 이동
function moveSnake() {
    // 방향이 설정되지 않았으면 이동하지 않음
    if (dx === 0 && dy === 0) {
        return;
    }
    
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    // 벽에 충돌 확인
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
        return;
    }
    
    // 자기 몸에 충돌 확인 (머리는 제외)
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }
    
    snake.unshift(head);
    
    // 음식을 먹었는지 확인
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').textContent = score;
        generateFood();
    } else {
        snake.pop();
    }
}

// 게임 루프
function gameLoop() {
    if (!gameRunning) return;
    
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    
    setTimeout(gameLoop, 150);
}

// 키보드 입력 처리
document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    
    const keyPressed = e.keyCode;
    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;
    
    // 방향 전환 (반대 방향으로 가는 것 방지)
    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -1;
        dy = 0;
    } else if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -1;
    } else if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 1;
        dy = 0;
    } else if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 1;
    }
    
    // WASD 키 지원
    if (e.key === 'a' || e.key === 'A') {
        if (!goingRight) {
            dx = -1;
            dy = 0;
        }
    } else if (e.key === 'w' || e.key === 'W') {
        if (!goingDown) {
            dx = 0;
            dy = -1;
        }
    } else if (e.key === 'd' || e.key === 'D') {
        if (!goingLeft) {
            dx = 1;
            dy = 0;
        }
    } else if (e.key === 's' || e.key === 'S') {
        if (!goingUp) {
            dx = 0;
            dy = 1;
        }
    }
});

// 모바일 버튼 이벤트
document.getElementById('up-btn').addEventListener('click', () => {
    if (!gameRunning || dy === 1) return;
    dx = 0;
    dy = -1;
});

document.getElementById('down-btn').addEventListener('click', () => {
    if (!gameRunning || dy === -1) return;
    dx = 0;
    dy = 1;
});

document.getElementById('left-btn').addEventListener('click', () => {
    if (!gameRunning || dx === 1) return;
    dx = -1;
    dy = 0;
});

document.getElementById('right-btn').addEventListener('click', () => {
    if (!gameRunning || dx === -1) return;
    dx = 1;
    dy = 0;
});

// 다시 시작 버튼
document.getElementById('restart-btn').addEventListener('click', initGame);

// 게임 시작
generateFood();
gameLoop();

