export function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowLeft':
            // Move piece left
            break;
        case 'ArrowRight':
            // Move piece right
            break;
        case 'ArrowDown':
            // Move piece down
            break;
        case 'ArrowUp':
            // Rotate piece
            break;
        case ' ':
            // Drop piece
            break;
    }
}

export function setupInputListeners() {
    document.addEventListener('keydown', handleKeyPress);
}