class Grid {
    constructor() {
        this.rows = 6;
        this.columns = 9;
        this.grid = this.createGrid();
    }

    createGrid() {
        return Array.from({ length: this.rows }, () => Array(this.columns).fill(0));
    }

    addPiece(piece, position) {
        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    this.grid[y + position.y][x + position.x] = value;
                }
            });
        });
    }

    checkFilledRows() {
        return this.grid.reduce((filledRows, row, index) => {
            if (row.every(value => value !== 0)) {
                filledRows.push(index);
            }
            return filledRows;
        }, []);
    }

    clearRows(rows) {
        rows.forEach(rowIndex => {
            this.grid.splice(rowIndex, 1);
            this.grid.unshift(Array(this.columns).fill(0));
        });
    }

    getGrid() {
        return this.grid;
    }
}

export default Grid;