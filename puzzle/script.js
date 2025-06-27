const puzzleContainer = document.getElementById('puzzle-container');
const shuffleBtn = document.getElementById('shuffleBtn');
const imageInput = document.getElementById('imageInput');

let pieces = [];
const size = 3; // 3x3 puzzle
const totalPieces = size * size;
let imageUrl = ''; // URL de l'image

imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageUrl = e.target.result; // Stocker l'URL de l'image
            initializePuzzle(); // Initialiser le puzzle avec la nouvelle image
        };
        reader.readAsDataURL(file); // Lire l'image comme Data URL
    }
});

function initializePuzzle() {
    pieces = Array.from({ length: totalPieces }, (_, i) => i);
    createPuzzle();
}

function createPuzzle() {
    puzzleContainer.innerHTML = '';
    pieces.forEach((piece, index) => {
        const div = document.createElement('div');
        div.className = 'puzzle-piece';
        div.style.backgroundImage = `url(${imageUrl})`;
        div.style.backgroundSize = `${size * 100}px ${size * 100}px`; // Ajuster la taille de l'image
        div.style.backgroundPosition = `${-(piece % size) * 100}px ${-(Math.floor(piece / size) * 100)}px`; // Positionnement des morceaux
        if (piece === 0) {
            div.classList.add('hidden'); 
        } else {
            div.textContent = piece;
            div.addEventListener('click', () => movePiece(index));
        }
        puzzleContainer.appendChild(div);
    });
}

function movePiece(index) {
    if (canMove(index)) {
        [pieces[index], pieces[getEmptyIndex()]] = [pieces[getEmptyIndex()], pieces[index]];
        createPuzzle();
    }
}

function canMove(index) {
    const emptyIndex = getEmptyIndex();
    const rowDiff = Math.abs(Math.floor(index / size) - Math.floor(emptyIndex / size));
    const colDiff = Math.abs(index % size - emptyIndex % size);
    return (rowDiff + colDiff === 1); // Vérifier si adjacent
}

function getEmptyIndex() {
    return pieces.indexOf(0);
}

shuffleBtn.addEventListener('click', () => {
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }
    createPuzzle();
});