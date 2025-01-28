
let puzzleState = [];
let moveCount = 0;
let draggedIndex = null;
let targetIndex = null;

function createPuzzle() {
    for (let i = 0; i < 16; i++) {
        if (i === 15) {
            puzzleState.push(0);
        } else {
            puzzleState.push(i + 1);
        }
    }
    shufflePuzzle();
    renderPuzzle();
}

function shufflePuzzle() {
    for (let i = puzzleState.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = puzzleState[i];
        puzzleState[i] = puzzleState[j];
        puzzleState[j] = temp;
    }
}

function renderPuzzle() {
    let puzzleContainer = document.getElementById('puzzle-container');
    puzzleContainer.innerHTML = '';
    for (let i = 0; i < puzzleState.length; i++) {
        let puzzlePiece = document.createElement('div');
        puzzlePiece.classList.add('puzzle-piece');
        puzzlePiece.id = `piece-${i}`;
        if (puzzleState[i] === 0) {
            puzzlePiece.style.background = 'gray';
            puzzlePiece.textContent = '';
        } else {
            puzzlePiece.textContent = puzzleState[i];
        }
        puzzleContainer.appendChild(puzzlePiece);
        puzzlePiece.addEventListener('mousedown', (event) => {
            if (event.button === 0) {
                draggedIndex = i;
                puzzlePiece.style.transform = 'scale(1.1)';
            }
        });
        puzzlePiece.addEventListener('mouseup', () => {
            puzzlePiece.style.transform = 'scale(1)';
            if (targetIndex !== null && 
                (Math.abs(targetIndex - draggedIndex) === 1 || 
                 Math.abs(targetIndex - draggedIndex) === 4 || 
                 Math.abs(targetIndex - draggedIndex) === 5 || 
                 Math.abs(targetIndex - draggedIndex) === 3)) {
                swapPuzzlePieces(draggedIndex, targetIndex);
                moveCount++;
                document.getElementById('move-count').textContent = moveCount;
                renderPuzzle();
                checkSolved();
            }
            draggedIndex = null;
            targetIndex = null;
        });
        puzzlePiece.addEventListener('mouseover', () => {
            if (draggedIndex !== null) {
                targetIndex = i;
            }
        });
    }
}

function swapPuzzlePieces(index1, index2) {
    let temp = puzzleState[index1];
    puzzleState[index1] = puzzleState[index2];
    puzzleState[index2] = temp;
}

function checkSolved() {
    for (let i = 0; i < 15; i++) {
        if (puzzleState[i] !== i + 1) {
            return;
        }
    }
    if (puzzleState[15] === 0) {
        let modal = new bootstrap.Modal(document.getElementById('solved-modal'));
        document.getElementById('final-move-count').textContent = moveCount;
        modal.show();

        if (moveCount >= 15 && moveCount <= 20) {
            alert("Congratulations! You won in " + moveCount + " moves!");
        } else if (moveCount > 20) {
            alert("You did it! But try to complete it in less moves next time.");
        } else {
            alert("Amazing! You completed the puzzle in less than 15 moves!");
        }
    }
}


document.getElementById('shuffle-button').addEventListener('click', () => {
    shufflePuzzle();
    renderPuzzle();
    moveCount = 0;
    document.getElementById('move-count').textContent = moveCount;
});

createPuzzle();
