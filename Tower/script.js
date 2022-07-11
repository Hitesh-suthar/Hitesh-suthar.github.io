let startTag = document.querySelector('.start-tag');
let gameOverTag = document.querySelector('.gameover');
let scoreBox = document.querySelector('#score');
let highScoreBox = document.querySelector('#highscore');

function showHtmlText() {
    startTag.classList.remove('hidden');
    gameOverTag.classList.remove('hidden');
    scoreBox.classList.add('emphasize');
    highScoreBox.classList.add('emphasize-hs');

}

function hideHtmlText() {
    startTag.classList.add('hidden');
    gameOverTag.classList.add('hidden');
    scoreBox.classList.remove('emphasize');
    highScoreBox.classList.remove('emphasize-hs');
}

function showScores() {
    highScoreBox.innerHTML = `High Score : ${highScore ? highScore : 0}`;
    scoreBox.innerHTML = `${score}`;
}

