class Piece {
    constructor(shape) {
        this.shape = shape;
        this.rotationIndex = 0;
    }

    rotate() {
        this.rotationIndex = (this.rotationIndex + 1) % this.shape.length;
    }

    getCurrentShape() {
        return this.shape[this.rotationIndex];
    }
}

const TETRIS_PIECES = {
    I: [
        [[1, 1, 1, 1]],
        [[1], [1], [1], [1]]
    ],
    J: [
        [[0, 0, 1], [1, 1, 1]],
        [[1, 0, 0], [1, 1, 1]],
        [[1, 1, 1], [0, 0, 1]],
        [[1, 1], [1, 0], [1, 0]]
    ],
    L: [
        [[1, 0, 0], [1, 1, 1]],
        [[0, 0, 1], [1, 1, 1]],
        [[1, 1, 1], [0, 1, 0]],
        [[1, 0], [1, 0], [1, 1]]
    ],
    O: [
        [[1, 1], [1, 1]]
    ],
    S: [
        [[0, 1, 1], [1, 1, 0]],
        [[1, 0], [1, 1], [0, 1]]
    ],
    T: [
        [[0, 1, 0], [1, 1, 1]],
        [[1, 0], [1, 1], [1, 0]],
        [[1, 1, 1], [0, 1, 0]],
        [[0, 1], [1, 1], [0, 1]]
    ],
    Z: [
        [[1, 1, 0], [0, 1, 1]],
        [[0, 1], [1, 1], [1, 0]]
    ]
};

export { Piece, TETRIS_PIECES };