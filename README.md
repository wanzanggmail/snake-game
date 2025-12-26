# 🐍 간단한 뱀 게임

HTML5 Canvas를 사용하여 만든 클래식한 뱀 게임입니다.

## 🎮 게임 방법

1. 방향키(↑↓←→) 또는 WASD 키를 사용하여 뱀을 조작합니다
2. 빨간색 음식을 먹으면 점수가 올라가고 뱀의 길이가 길어집니다
3. 벽이나 자신의 몸에 부딪히면 게임 오버입니다
4. 최고 점수는 브라우저에 저장됩니다

## 🚀 실행 방법

### 로컬에서 실행
1. 모든 파일을 같은 폴더에 저장합니다
2. `index.html` 파일을 웹 브라우저로 엽니다
3. 게임을 즐기세요!

### GitHub Pages로 배포하기

GitHub에 올려서 무료로 웹에 게시할 수 있습니다:

1. **GitHub 저장소 생성**
   - GitHub에 로그인 후 새 저장소(repository)를 만듭니다
   - 저장소 이름은 원하는 대로 설정 (예: `snake-game`)

2. **파일 업로드**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Snake game"
   git branch -M main
   git remote add origin https://github.com/사용자명/저장소명.git
   git push -u origin main
   ```

3. **GitHub Pages 활성화**
   - GitHub 저장소 페이지로 이동
   - Settings(설정) → Pages 클릭
   - Source에서 "Deploy from a branch" 선택
   - Branch를 "main" (또는 "master") 선택하고 "/ (root)" 선택
   - Save 버튼 클릭

4. **배포 완료!**
   - 몇 분 후 `https://사용자명.github.io/저장소명/` 에서 게임을 확인할 수 있습니다

## 📁 파일 구조

- `index.html` - HTML 구조
- `style.css` - 스타일링
- `game.js` - 게임 로직
- `README.md` - 이 파일

## 🛠️ 기술 스택

- HTML5
- CSS3
- JavaScript (Vanilla)
- HTML5 Canvas API

## 💡 다음 단계 아이디어

- 난이도 조절 (속도 증가)
- 다양한 음식 아이템 추가
- 장애물 추가
- 파워업 아이템
- 멀티플레이어 모드
- 리더보드 시스템

