// Main JavaScript logic for the Tetris grid game

// Grid configuration
const GRID_ROWS = 8;
const GRID_COLS = 7;

// Audio system
let audioCtx = null;
let soundEnabled = true;

// Language system
let currentLanguage = 'es';
const translations = {
    es: {
        months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        daysFull: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        dateFormat: 'Hoy es {weekday} {day} de {month}',
        startsOnSunday: false,
        tooltips: {
            language: 'Cambiar idioma',
            sound: 'Activar/Desactivar sonido',
            theme: 'Cambiar modo claro/oscuro',
            info: 'Información y ayuda',
            languages: {
                es: 'Español',
                en: 'English',
                fr: 'Français',
                de: 'Deutsch',
                pt: 'Português',
                it: 'Italiano'
            }
        },
        info: {
            title: 'Cómo jugar',
            objective: '🎯 Objetivo',
            objectiveText: 'Completa el tablero del día de hoy cubriendo todas las casillas excepto las que forman la fecha actual.',
            howToPlay: '🎮 Cómo jugar',
            step1: 'Haz clic en una pieza para rotarla',
            step2: 'Arrastra las piezas desde la bandeja inferior al tablero',
            step3: 'Haz clic en una pieza colocada para quitarla del tablero',
            step4: 'Cubre todas las fechas excepto la fecha de hoy (marcada en rojo)',
            controls: '⚙️ Controles',
            controlLang: 'Cambiar idioma',
            controlSound: 'Activar/Desactivar sonido',
            controlTheme: 'Cambiar modo claro/oscuro',
            author: 'Desarrollado por <strong>Carlos Nieto Sanchez</strong>'
        },
        victory: {
            title: '¡Felicidades! 🎉',
            message: '¡Has completado el calendario del día!'
        }
    },
    en: {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        daysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dateFormat: 'Today is {weekday}, {month} {day}',
        startsOnSunday: true,
        tooltips: {
            language: 'Change language',
            sound: 'Toggle sound',
            theme: 'Toggle light/dark mode',
            info: 'Information and help',
            languages: {
                es: 'Spanish',
                en: 'English',
                fr: 'French',
                de: 'German',
                pt: 'Portuguese',
                it: 'Italian'
            }
        },
        info: {
            title: 'How to play',
            objective: '🎯 Objective',
            objectiveText: 'Complete today\'s board by covering all cells except those that form today\'s date.',
            howToPlay: '🎮 How to play',
            step1: 'Click on a piece to rotate it',
            step2: 'Drag pieces from the bottom tray to the board',
            step3: 'Click on a placed piece to remove it from the board',
            step4: 'Cover all dates except today (marked in red)',
            controls: '⚙️ Controls',
            controlLang: 'Change language',
            controlSound: 'Toggle sound',
            controlTheme: 'Toggle light/dark mode',
            author: 'Developed by <strong>Carlos Nieto Sanchez</strong>'
        },
        victory: {
            title: 'Congratulations! 🎉',
            message: 'You have completed today\'s calendar!'
        }
    },
    fr: {
        months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
        monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        days: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        daysFull: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        dateFormat: "Aujourd'hui, c'est {weekday} {day} {month}",
        startsOnSunday: false,
        tooltips: {
            language: 'Changer de langue',
            sound: 'Activer/Désactiver le son',
            theme: 'Changer le mode clair/sombre',
            info: 'Information et aide',
            languages: {
                es: 'Espagnol',
                en: 'Anglais',
                fr: 'Français',
                de: 'Allemand',
                pt: 'Portugais',
                it: 'Italien'
            }
        },
        info: {
            title: 'Comment jouer',
            objective: '🎯 Objectif',
            objectiveText: 'Complétez le tableau d\'aujourd\'hui en couvrant toutes les cases sauf celles qui forment la date actuelle.',
            howToPlay: '🎮 Comment jouer',
            step1: 'Cliquez sur une pièce pour la faire pivoter',
            step2: 'Faites glisser les pièces du plateau inférieur vers le tableau',
            step3: 'Cliquez sur une pièce placée pour la retirer du plateau',
            step4: 'Couvrez toutes les dates sauf aujourd\'hui (marquée en rouge)',
            controls: '⚙️ Contrôles',
            controlLang: 'Changer de langue',
            controlSound: 'Activer/Désactiver le son',
            controlTheme: 'Changer le mode clair/sombre',
            author: 'Développé par <strong>Carlos Nieto Sanchez</strong>'
        },
        victory: {
            title: 'Félicitations! 🎉',
            message: 'Vous avez complété le calendrier du jour!'
        }
    },
    de: {
        months: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        monthsFull: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
        days: ['Mon', 'Die', 'Mit', 'Don', 'Fre', 'Sam', 'Son'],
        daysFull: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
        dateFormat: 'Heute ist {weekday}, der {day}. {month}',
        startsOnSunday: false,
        tooltips: {
            language: 'Sprache ändern',
            sound: 'Ton ein/aus',
            theme: 'Hell/Dunkel-Modus wechseln',
            info: 'Information und Hilfe',
            languages: {
                es: 'Spanisch',
                en: 'Englisch',
                fr: 'Französisch',
                de: 'Deutsch',
                pt: 'Portugiesisch',
                it: 'Italienisch'
            }
        },
        info: {
            title: 'Wie man spielt',
            objective: '🎯 Ziel',
            objectiveText: 'Vervollständigen Sie das heutige Brett, indem Sie alle Felder abdecken, außer denen, die das heutige Datum bilden.',
            howToPlay: '🎮 Wie man spielt',
            step1: 'Klicken Sie auf ein Teil, um es zu drehen',
            step2: 'Ziehen Sie Teile vom unteren Tablett zum Brett',
            step3: 'Klicken Sie auf ein platziertes Teil, um es vom Brett zu entfernen',
            step4: 'Decken Sie alle Daten außer heute ab (rot markiert)',
            controls: '⚙️ Steuerung',
            controlLang: 'Sprache ändern',
            controlSound: 'Ton ein/aus',
            controlTheme: 'Hell/Dunkel-Modus wechseln',
            author: 'Entwickelt von <strong>Carlos Nieto Sanchez</strong>'
        },
        victory: {
            title: 'Glückwunsch! 🎉',
            message: 'Sie haben den heutigen Kalender vervollständigt!'
        }
    },
    pt: {
        months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        days: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        daysFull: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'],
        dateFormat: 'Hoje é {weekday}, {day} de {month}',
        startsOnSunday: false,
        tooltips: {
            language: 'Mudar idioma',
            sound: 'Ativar/Desativar som',
            theme: 'Alternar modo claro/escuro',
            info: 'Informação e ajuda',
            languages: {
                es: 'Espanhol',
                en: 'Inglês',
                fr: 'Francês',
                de: 'Alemão',
                pt: 'Português',
                it: 'Italiano'
            }
        },
        info: {
            title: 'Como jogar',
            objective: '🎯 Objetivo',
            objectiveText: 'Complete o tabuleiro de hoje cobrindo todas as casas, exceto aquelas que formam a data de hoje.',
            howToPlay: '🎮 Como jogar',
            step1: 'Clique em uma peça para girá-la',
            step2: 'Arraste as peças da bandeja inferior para o tabuleiro',
            step3: 'Clique em uma peça colocada para removê-la do tabuleiro',
            step4: 'Cubra todas as datas, exceto hoje (marcada em vermelho)',
            controls: '⚙️ Controles',
            controlLang: 'Mudar idioma',
            controlSound: 'Ativar/Desativar som',
            controlTheme: 'Alternar modo claro/escuro',
            author: 'Desenvolvido por <strong>Carlos Nieto Sanchez</strong>'
        },
        victory: {
            title: 'Parabéns! 🎉',
            message: 'Você completou o calendário de hoje!'
        }
    },
    it: {
        months: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
        monthsFull: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
        days: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
        daysFull: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'],
        dateFormat: 'Oggi è {weekday} {day} {month}',
        startsOnSunday: false,
        tooltips: {
            language: 'Cambia lingua',
            sound: 'Attiva/Disattiva suono',
            theme: 'Cambia modalità chiara/scura',
            info: 'Informazioni e aiuto',
            languages: {
                es: 'Spagnolo',
                en: 'Inglese',
                fr: 'Francese',
                de: 'Tedesco',
                pt: 'Portoghese',
                it: 'Italiano'
            }
        },
        info: {
            title: 'Come giocare',
            objective: '🎯 Obiettivo',
            objectiveText: 'Completa la tavola di oggi coprendo tutte le caselle tranne quelle che formano la data odierna.',
            howToPlay: '🎮 Come giocare',
            step1: 'Fai clic su un pezzo per ruotarlo',
            step2: 'Trascina i pezzi dal vassoio inferiore alla tavola',
            step3: 'Fai clic su un pezzo posizionato per rimuoverlo dalla tavola',
            step4: 'Copri tutte le date tranne oggi (contrassegnata in rosso)',
            controls: '⚙️ Controlli',
            controlLang: 'Cambia lingua',
            controlSound: 'Attiva/Disattiva suono',
            controlTheme: 'Cambia modalità chiara/scura',
            author: 'Sviluppato da <strong>Carlos Nieto Sanchez</strong>'
        },
        victory: {
            title: 'Congratulazioni! 🎉',
            message: 'Hai completato il calendario di oggi!'
        }
    }
};

function detectBrowserLanguage() {
    const browserLang = navigator.language.slice(0, 2);
    return translations[browserLang] ? browserLang : 'es';
}

function setLanguage(lang) {
    if (translations[lang]) {
        const previousLanguage = currentLanguage;
        const previousStartsOnSunday = translations[previousLanguage].startsOnSunday;
        const newStartsOnSunday = translations[lang].startsOnSunday;
        
        currentLanguage = lang;
        
        // Si cambia el orden de días de la semana, reiniciar el juego
        if (previousStartsOnSunday !== newStartsOnSunday) {
            resetGame();
        } else {
            // Solo actualizar labels y tooltips
            updateCurrentDateCells();
            updateGridLabels();
            updateTooltips();
            updateCurrentDate();
            updateGridDisplay();
        }
    }
}

function updateCurrentDate() {
    const dateEl = document.getElementById('current-date');
    if (!dateEl) return;
    
    const now = new Date();
    const day = now.getDate();
    const monthIndex = now.getMonth();
    const weekdayIndex = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const lang = translations[currentLanguage];
    
    // Ajustar índice del día de la semana según el idioma
    let adjustedWeekday;
    if (lang.startsOnSunday) {
        // Para inglés: usar el índice directamente (0=Sunday, 1=Monday, ...)
        adjustedWeekday = weekdayIndex;
    } else {
        // Para otros idiomas: ajustar de domingo=0 a lunes=0
        adjustedWeekday = weekdayIndex === 0 ? 6 : weekdayIndex - 1;
    }
    
    let dateText = lang.dateFormat
        .replace('{weekday}', lang.daysFull[adjustedWeekday])
        .replace('{day}', day)
        .replace('{month}', lang.monthsFull[monthIndex]);
    
    dateEl.textContent = dateText;
}

function updateTooltips() {
    const lang = translations[currentLanguage];
    const btnLanguage = document.getElementById('btn-language');
    const btnSound = document.getElementById('btn-sound');
    const btnTheme = document.getElementById('btn-theme');
    const btnInfo = document.getElementById('btn-info');
    
    if (btnLanguage) btnLanguage.title = lang.tooltips.language;
    if (btnSound) btnSound.title = lang.tooltips.sound;
    if (btnTheme) btnTheme.title = lang.tooltips.theme;
    if (btnInfo) btnInfo.title = lang.tooltips.info;
    
    // Update language options tooltips
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(option => {
        const langCode = option.dataset.lang;
        option.title = lang.tooltips.languages[langCode];
    });
    
    // Update info modal translations
    updateInfoModalTranslations();
}

function updateInfoModalTranslations() {
    const lang = translations[currentLanguage];
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(el => {
        const key = el.dataset.i18n;
        const keys = key.split('.');
        let value = lang;
        
        for (const k of keys) {
            value = value[k];
        }
        
        if (value) {
            el.innerHTML = value;
        }
    });
}

function initAudio() {
    if (audioCtx) return;
    try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        audioCtx = null;
    }
}

function playSound(type) {
    if (!soundEnabled || !audioCtx) return;
    
    const now = audioCtx.currentTime;
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    const sounds = {
        rotate: { freq: 620, duration: 0.08 },
        place: { freq: 880, duration: 0.12 },
        invalid: { freq: 220, duration: 0.15 },
        return: { freq: 520, duration: 0.1 },
        win: { freq: 1100, duration: 0.4 }
    };
    
    const sound = sounds[type] || sounds.place;
    
    oscillator.type = 'sine';
    oscillator.frequency.value = sound.freq;
    gainNode.gain.value = 0;
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.15, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + sound.duration);
    
    oscillator.start(now);
    oscillator.stop(now + sound.duration + 0.02);
}

// Initialize audio on first user interaction
window.addEventListener('pointerdown', function initOnClick() {
    initAudio();
    window.removeEventListener('pointerdown', initOnClick);
}, { once: true });

// Blocked cells: última casilla de las 2 primeras filas, y las 4 primeras casillas de la última fila
const staticBlockedCells = [
    [0, 6], // última casilla de la primera fila
    [1, 6], // última casilla de la segunda fila
    [7, 0], // primera casilla de la última fila
    [7, 1], // segunda casilla de la última fila
    [7, 2], // tercera casilla de la última fila
    [7, 3]  // cuarta casilla de la última fila
];

let blockedCells = [...staticBlockedCells];
let currentDateCells = []; // Cells for today's date (to highlight in red)

function updateCurrentDateCells() {
    const now = new Date();
    const day = now.getDate();
    const monthIndex = now.getMonth();
    const weekdayIndex = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const lang = translations[currentLanguage];
    
    // Ajustar índice del día de la semana según el idioma
    let adjustedWeekday;
    if (lang.startsOnSunday) {
        // Para inglés: usar el índice directamente (0=Sunday, 1=Monday, ...)
        adjustedWeekday = weekdayIndex;
    } else {
        // Para otros idiomas: ajustar de domingo=0 a lunes=0
        adjustedWeekday = weekdayIndex === 0 ? 6 : weekdayIndex - 1;
    }
    
    currentDateCells = [];
    
    // Find month cell
    if (monthIndex < 6) {
        currentDateCells.push([0, monthIndex]);
    } else {
        currentDateCells.push([1, monthIndex - 6]);
    }
    
    // Find day cell (1-31)
    const dayOffset = day - 1;
    const dayRow = Math.floor(dayOffset / 7) + 2;
    const dayCol = dayOffset % 7;
    currentDateCells.push([dayRow, dayCol]);
    
    // Find weekday cell
    if (adjustedWeekday < 4) {
        // Primeros 4 días en row 6, cols 3-6
        currentDateCells.push([6, adjustedWeekday + 3]);
    } else {
        // Últimos 3 días en row 7, cols 4-6
        currentDateCells.push([7, adjustedWeekday - 4 + 4]);
    }
    
    // Add to blocked cells
    blockedCells = [...staticBlockedCells, ...currentDateCells];
}

// Get label for each cell
function getCellLabel(row, col) {
    // No mostrar etiquetas en celdas bloqueadas estáticas
    if (staticBlockedCells.some(([r, c]) => r === row && c === col)) {
        return '';
    }
    
    const lang = translations[currentLanguage];
    
    // Primera fila: primeros 6 meses
    if (row === 0 && col < 6) {
        return lang.months[col] || '';
    }
    
    // Segunda fila: siguientes 6 meses
    if (row === 1 && col < 6) {
        return lang.months[col + 6] || '';
    }
    
    // Filas del medio (2-6): días del mes 1-31 y luego días de la semana
    const dayNumber = (row - 2) * 7 + col + 1;
    
    // Días del 1 al 31
    if (dayNumber <= 31) {
        return dayNumber.toString();
    }
    
    // Después del 31: días de la semana
    // En fila 6, columnas 3-6: primeros 4 días
    if (row === 6) {
        if (lang.startsOnSunday) {
            // Para inglés: Sun, Mon, Tue, Wed
            const weekDays = ['', '', '', lang.days[0], lang.days[1], lang.days[2], lang.days[3]];
            return weekDays[col] || '';
        } else {
            // Para otros idiomas: Lun, Mar, Mié, Jue
            const weekDays = ['', '', '', lang.days[0], lang.days[1], lang.days[2], lang.days[3]];
            return weekDays[col] || '';
        }
    }
    
    // Última fila: últimos 3 días (en columnas 4-6, las 0-3 están bloqueadas)
    if (row === 7) {
        if (lang.startsOnSunday) {
            // Para inglés: Thu, Fri, Sat
            const days = ['', '', '', '', lang.days[4], lang.days[5], lang.days[6]];
            return days[col] || '';
        } else {
            // Para otros idiomas: Vie, Sáb, Dom
            const days = ['', '', '', '', lang.days[4], lang.days[5], lang.days[6]];
            return days[col] || '';
        }
    }
    
    return '';
}

// Game state
const grid = Array.from({ length: GRID_ROWS }, () => Array(GRID_COLS).fill(null));
let selectedPieceIndex = null;
let draggedPiece = null;
let floatingPieceEl = null;
let previewCells = [];
let usedPieces = new Set(); // Track which pieces have been used
let placedPieces = []; // Track where each piece was placed { pieceIndex, cells: [{row, col}] }

// Event handler references for cleanup
let trayClickHandler = null;
let trayMouseDownHandler = null;
let documentMouseMoveHandler = null;
let documentMouseUpHandler = null;
let trayTouchStartHandler = null;
let documentTouchMoveHandler = null;
let documentTouchEndHandler = null;

// Tetris pieces with their shape definitions
const pieces = [
    // I4: Línea de 4 casillas
    { name: 'I4', cells: [[0,0],[1,0],[2,0],[3,0]], color: '#42a5f5' },
    // N5: Z de tetris con casilla extra en el medio
    { name: 'N5', cells: [[0,0],[0,1],[1,1],[2,1],[2,2]], color: '#ba68c8' },
    // L5: L de 5 casillas (vertical con casilla a la derecha)
    { name: 'L5', cells: [[0,0],[1,0],[2,0],[3,0],[3,1]], color: '#26c6da' },
    // L4: L de 4 casillas (vertical con casilla a la derecha)
    { name: 'L4', cells: [[0,0],[1,0],[2,0],[2,1]], color: '#7e57c2' },
    // G5: Cuadrado 2x2 con una casilla extra
    { name: 'G5', cells: [[0,0],[0,1],[1,0],[1,1],[2,0]], color: '#ffee58' },
    // E5: E de 5 casillas (3 verticales + 2 horizontales)
    { name: 'E5', cells: [[0,0],[1,0],[2,0],[2,1],[2,2]], color: '#2e7d32' },
    // S4: S de 4 casillas
    { name: 'S4', cells: [[0,0],[1,0],[1,1],[2,1]], color: '#a1887f' },
    // C5: C de 5 casillas
    { name: 'C5', cells: [[0,0],[1,0],[2,0],[0,1],[2,1]], color: '#81c784' },
    // Z5: Primera Z de 5 casillas
    { name: 'Z5', cells: [[0,0],[0,1],[0,2],[1,2],[1,3]], color: '#ef5350' },
    // T5: T de 5 casillas
    { name: 'T5', cells: [[0,0],[0,1],[0,2],[1,1],[2,1]], color: '#ff7043' }
];

// Reset the game to initial state
function resetGame() {
    // Clear grid state
    for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
            grid[row][col] = null;
        }
    }
    
    // Reset game state
    usedPieces.clear();
    placedPieces = [];
    selectedPieceIndex = null;
    draggedPiece = null;
    previewCells = [];
    
    // Remove floating piece if any
    if (floatingPieceEl) {
        floatingPieceEl.remove();
        floatingPieceEl = null;
    }
    
    // Reinitialize game with new language settings
    initGame();
    updateTooltips();
    updateCurrentDate();
}

// Initialize the game
function initGame() {
    updateCurrentDateCells();
    createGrid();
    createPieceTray();
    setupDragAndDrop();
    setupGridClickToReturn();
}

// Create the grid
function createGrid() {
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = '';
    
    for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            
            // Check if this cell is blocked
            const isBlocked = staticBlockedCells.some(([r, c]) => r === row && c === col);
            const isCurrentDate = currentDateCells.some(([r, c]) => r === row && c === col);
            
            if (isBlocked) {
                cell.classList.add('blocked');
                grid[row][col] = 'blocked';
            } else if (isCurrentDate) {
                cell.classList.add('blocked', 'current-date');
                grid[row][col] = 'blocked';
            }
            
            // Add label to cell
            const label = getCellLabel(row, col);
            if (label) {
                const labelEl = document.createElement('span');
                labelEl.className = 'cell-label';
                labelEl.textContent = label;
                cell.appendChild(labelEl);
            }
            
            gridElement.appendChild(cell);
        }
    }
}

// Create the piece tray with 10 pieces
function createPieceTray() {
    const trayElement = document.getElementById('piece-tray');
    trayElement.innerHTML = '';
    
    for (let i = 0; i < 10; i++) {
        const piece = pieces[i];
        const pieceContainer = document.createElement('div');
        pieceContainer.className = 'piece-container';
        pieceContainer.dataset.index = i;
        
        const pieceGrid = createPiecePreview(piece);
        pieceContainer.appendChild(pieceGrid);
        
        trayElement.appendChild(pieceContainer);
    }
}

// Create a visual preview of a piece
function createPiecePreview(piece) {
    const pieceGrid = document.createElement('div');
    pieceGrid.className = 'piece-grid';
    
    // Calculate grid dimensions
    const maxX = Math.max(...piece.cells.map(c => c[0])) + 1;
    const maxY = Math.max(...piece.cells.map(c => c[1])) + 1;
    
    pieceGrid.style.gridTemplateColumns = `repeat(${maxY}, var(--cell))`;
    pieceGrid.style.gridTemplateRows = `repeat(${maxX}, var(--cell))`;
    
    // Create all cells and store their position data
    for (let row = 0; row < maxX; row++) {
        for (let col = 0; col < maxY; col++) {
            const cell = document.createElement('div');
            cell.className = 'piece-cell';
            cell.dataset.pieceRow = row;
            cell.dataset.pieceCol = col;
            
            // Check if this position is part of the piece
            const isFilled = piece.cells.some(([r, c]) => r === row && c === col);
            if (isFilled) {
                cell.classList.add('filled');
                cell.style.setProperty('--piece-color', piece.color);
                cell.style.background = piece.color;
                cell.style.boxShadow = `inset 0 0 0 2px ${piece.color}dd, 0 4px 12px ${piece.color}66`;
            } else {
                // Make empty cells invisible but keep them interactive
                cell.style.background = 'transparent';
                cell.style.boxShadow = 'none';
                cell.style.pointerEvents = 'none';
            }
            
            pieceGrid.appendChild(cell);
        }
    }
    
    return pieceGrid;
}

// Rotate a piece 90 degrees
function rotatePiece(index) {
    const piece = pieces[index];
    const container = document.querySelector(`[data-index="${index}"]`);
    
    // Add rotation animation
    if (container) {
        container.classList.add('rotating');
        setTimeout(() => container.classList.remove('rotating'), 300);
    }
    
    // Play sound
    playSound('rotate');
    
    // Rotate cells: (x,y) -> (y, -x), then normalize
    const rotated = piece.cells.map(([x, y]) => [y, -x]);
    
    // Normalize to start from (0,0)
    const minX = Math.min(...rotated.map(c => c[0]));
    const minY = Math.min(...rotated.map(c => c[1]));
    piece.cells = rotated.map(([x, y]) => [x - minX, y - minY]);
    
    // Update the visual
    if (container) {
        const oldGrid = container.querySelector('.piece-grid');
        const newGrid = createPiecePreview(piece);
        oldGrid.replaceWith(newGrid);
    }
}

// Setup drag and drop functionality
function setupDragAndDrop() {
    const trayElement = document.getElementById('piece-tray');
    const gridElement = document.getElementById('grid');
    
    // Remove previous event listeners if they exist
    if (trayClickHandler) {
        trayElement.removeEventListener('click', trayClickHandler);
    }
    if (trayMouseDownHandler) {
        trayElement.removeEventListener('mousedown', trayMouseDownHandler);
    }
    if (documentMouseMoveHandler) {
        document.removeEventListener('mousemove', documentMouseMoveHandler);
    }
    if (documentMouseUpHandler) {
        document.removeEventListener('mouseup', documentMouseUpHandler);
    }
    if (trayTouchStartHandler) {
        trayElement.removeEventListener('touchstart', trayTouchStartHandler);
    }
    if (documentTouchMoveHandler) {
        document.removeEventListener('touchmove', documentTouchMoveHandler);
    }
    if (documentTouchEndHandler) {
        document.removeEventListener('touchend', documentTouchEndHandler);
    }
    
    let mouseDownTime = 0;
    let mouseDownPos = { x: 0, y: 0 };
    
    // Click to rotate piece
    trayClickHandler = (e) => {
        // Don't rotate if we're dragging or if it was a drag action
        if (draggedPiece) return;
        
        // If mouse moved significantly, don't rotate (was a drag attempt)
        const timeSinceMouseDown = Date.now() - mouseDownTime;
        if (timeSinceMouseDown > 200) return; // Was held too long
        
        const container = e.target.closest('.piece-container');
        if (container && !usedPieces.has(parseInt(container.dataset.index))) {
            const index = parseInt(container.dataset.index);
            rotatePiece(index);
        }
    };
    trayElement.addEventListener('click', trayClickHandler);
    
    // Mouse down to start dragging
    trayMouseDownHandler = (e) => {
        // Only left click
        if (e.button !== 0) return;
        
        mouseDownTime = Date.now();
        mouseDownPos = { x: e.clientX, y: e.clientY };
        
        const container = e.target.closest('.piece-container');
        if (!container) return;
        
        const index = parseInt(container.dataset.index);
        
        // Don't allow dragging if piece is already used
        if (usedPieces.has(index)) return;
        
        // Calculate which cell was clicked
        let clickedCell = e.target.closest('.piece-cell');
        
        // If we didn't click directly on a cell, find the cell at the mouse position
        if (!clickedCell && container) {
            const rect = container.getBoundingClientRect();
            const cellSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cell'));
            const gap = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gap')) || 2;
            
            // Calculate which cell based on mouse position relative to container
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Find the cell at this position
            const cells = container.querySelectorAll('.piece-cell');
            for (const cell of cells) {
                const cellRect = cell.getBoundingClientRect();
                if (e.clientX >= cellRect.left && e.clientX <= cellRect.right &&
                    e.clientY >= cellRect.top && e.clientY <= cellRect.bottom) {
                    clickedCell = cell;
                    break;
                }
            }
        }
        
        let clickOffset = { row: 0, col: 0 };
        let clickPixelOffset = { x: 0, y: 0 };
        
        if (clickedCell) {
            // Get the cell position from data attributes
            const row = parseInt(clickedCell.dataset.pieceRow);
            const col = parseInt(clickedCell.dataset.pieceCol);
            
            // Check if this cell is filled (part of the piece)
            const piece = pieces[index];
            const isFilled = piece.cells.some(([r, c]) => r === row && c === col);
            
            if (isFilled && !isNaN(row) && !isNaN(col)) {
                clickOffset.row = row;
                clickOffset.col = col;
                
                // Calculate pixel offset within the clicked cell
                const rect = clickedCell.getBoundingClientRect();
                const cellSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cell'));
                
                // Offset in pixels from top-left of the piece to the click point
                clickPixelOffset.x = col * cellSize + (e.clientX - rect.left);
                clickPixelOffset.y = row * cellSize + (e.clientY - rect.top);
            }
        }
        
        draggedPiece = { 
            index, 
            piece: pieces[index], 
            clickOffset,
            clickPixelOffset,
            isDragging: false // Not actually dragging until mouse moves
        };
        
        // Prevent text selection while dragging
        e.preventDefault();
    };
    trayElement.addEventListener('mousedown', trayMouseDownHandler);
    
    // Mouse move to drag piece
    documentMouseMoveHandler = (e) => {
        if (!draggedPiece) return;
        
        // Start dragging if not already
        if (!draggedPiece.isDragging) {
            draggedPiece.isDragging = true;
            const container = document.querySelector(`[data-index="${draggedPiece.index}"]`);
            if (container) container.classList.add('dragging');
            document.body.classList.add('is-dragging');
            createFloatingPiece(draggedPiece.piece, draggedPiece.clickPixelOffset);
        }
        
        // Update floating piece position
        if (floatingPieceEl) {
            floatingPieceEl.style.left = (e.clientX - draggedPiece.clickPixelOffset.x) + 'px';
            floatingPieceEl.style.top = (e.clientY - draggedPiece.clickPixelOffset.y) + 'px';
        }
        
        // Show preview on grid
        const element = document.elementFromPoint(e.clientX, e.clientY);
        const cell = element?.closest('.grid-cell');
        
        if (cell) {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            
            // Adjust position based on click offset
            const adjustedRow = row - draggedPiece.clickOffset.row;
            const adjustedCol = col - draggedPiece.clickOffset.col;
            
            showPreview(draggedPiece.piece, adjustedRow, adjustedCol);
        } else {
            clearPreview();
        }
    };
    document.addEventListener('mousemove', documentMouseMoveHandler);
    
    // Mouse up to drop piece
    documentMouseUpHandler = (e) => {
        if (!draggedPiece || !draggedPiece.isDragging) {
            draggedPiece = null;
            return;
        }
        
        const container = document.querySelector(`[data-index="${draggedPiece.index}"]`);
        if (container) container.classList.remove('dragging');
        
        document.body.classList.remove('is-dragging');
        
        // Try to place piece
        const element = document.elementFromPoint(e.clientX, e.clientY);
        const cell = element?.closest('.grid-cell');
        
        if (cell) {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            
            // Adjust position based on click offset
            const adjustedRow = row - draggedPiece.clickOffset.row;
            const adjustedCol = col - draggedPiece.clickOffset.col;
            
            if (canPlacePiece(draggedPiece.piece, adjustedRow, adjustedCol)) {
                const pieceCells = placePiece(draggedPiece.piece, adjustedRow, adjustedCol);
                
                // Store placed piece info
                placedPieces.push({
                    pieceIndex: draggedPiece.index,
                    cells: pieceCells
                });
                
                updateGridDisplay();
                
                // Add placement animation to cells
                pieceCells.forEach((cellInfo, i) => {
                    const gridCell = document.querySelector(`[data-row="${cellInfo.row}"][data-col="${cellInfo.col}"]`);
                    if (gridCell) {
                        gridCell.classList.add('placing');
                        setTimeout(() => {
                            gridCell.classList.remove('placing');
                        }, 50 + i * 30);
                    }
                });
                
                playSound('place');
                
                // Mark piece as used and disable it in tray
                usedPieces.add(draggedPiece.index);
                const pieceContainer = document.querySelector(`[data-index="${draggedPiece.index}"]`);
                if (pieceContainer) {
                    pieceContainer.classList.add('used');
                }
                
                // Check if player has won
                setTimeout(() => checkWinCondition(), 400);
            } else {
                playSound('invalid');
            }
        } else {
            playSound('invalid');
        }
        
        draggedPiece = null;
        removeFloatingPiece();
        clearPreview();
    };
    document.addEventListener('mouseup', documentMouseUpHandler);
    
    // Touch support for mobile devices
    let touchStartTime = 0;
    let touchTimer = null;
    let touchMoved = false;
    
    trayTouchStartHandler = (e) => {
        const container = e.target.closest('.piece-container');
        if (!container) return;
        
        const index = parseInt(container.dataset.index);
        if (usedPieces.has(index)) return;
        
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        
        touchStartTime = Date.now();
        touchMoved = false;
        
        // Detectar en qué celda se hizo click
        const clickedCell = document.elementFromPoint(touch.clientX, touch.clientY);
        const piece = pieces[index];
        
        let clickOffset = { row: 0, col: 0 };
        let clickPixelOffset = {
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
        };
        
        if (clickedCell && clickedCell.classList.contains('piece-cell')) {
            const row = parseInt(clickedCell.dataset.pieceRow) || 0;
            const col = parseInt(clickedCell.dataset.pieceCol) || 0;
            const isFilled = piece.cells.some(([r, c]) => r === row && c === col);
            
            if (isFilled) {
                clickOffset.row = row;
                clickOffset.col = col;
                
                const cellRect = clickedCell.getBoundingClientRect();
                const cellSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cell'));
                clickPixelOffset.x = col * cellSize + (touch.clientX - cellRect.left);
                clickPixelOffset.y = row * cellSize + (touch.clientY - cellRect.top);
            }
        }
        
        // Store temp data for both tap and drag
        container._tempTouchData = {
            index,
            clickOffset,
            clickPixelOffset,
            piece: piece
        };
        
        e.preventDefault();
    };
    trayElement.addEventListener('touchstart', trayTouchStartHandler, { passive: false });
    
    documentTouchMoveHandler = (e) => {
        let touch = e.touches[0];
        
        // Detectar si hay movimiento significativo (más de 5px)
        if (!touchMoved) {
            const containers = document.querySelectorAll('.piece-container');
            for (const container of containers) {
                if (container._tempTouchData) {
                    const data = container._tempTouchData;
                    const rect = container.getBoundingClientRect();
                    const deltaX = Math.abs(touch.clientX - (rect.left + data.clickPixelOffset.x));
                    const deltaY = Math.abs(touch.clientY - (rect.top + data.clickPixelOffset.y));
                    
                    // Solo considerar movimiento si se mueve más de 5px
                    if (deltaX > 5 || deltaY > 5) {
                        touchMoved = true;
                        // Iniciar drag
                        draggedPiece = {
                            index: data.index,
                            piece: data.piece,
                            clickOffset: data.clickOffset,
                            clickPixelOffset: data.clickPixelOffset,
                            isDragging: false
                        };
                    }
                    break;
                }
            }
        }
        
        if (!draggedPiece) return;
        
        touch = e.touches[0];
        
        if (!draggedPiece.isDragging) {
            draggedPiece.isDragging = true;
            const container = document.querySelector(`[data-index="${draggedPiece.index}"]`);
            if (container) container.classList.add('dragging');
            document.body.classList.add('is-dragging');
            createFloatingPiece(draggedPiece.piece, draggedPiece.clickPixelOffset);
        }
        
        if (floatingPieceEl) {
            floatingPieceEl.style.left = (touch.clientX - draggedPiece.clickPixelOffset.x) + 'px';
            floatingPieceEl.style.top = (touch.clientY - draggedPiece.clickPixelOffset.y) + 'px';
        }
        
        // Calcular la posición en el grid basándose en la celda [0,0] de la pieza
        const cellSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cell'));
        const gridGap = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gap'));
        const gridEl = document.getElementById('grid');
        const gridRect = gridEl.getBoundingClientRect();
        
        // Calcular posición de la celda [0,0] de la pieza
        const piece00X = touch.clientX - draggedPiece.clickPixelOffset.x;
        const piece00Y = touch.clientY - draggedPiece.clickPixelOffset.y;
        
        // Convertir a coordenadas de grid
        const relativeX = piece00X - gridRect.left;
        const relativeY = piece00Y - gridRect.top;
        
        const col = Math.floor(relativeX / (cellSize + gridGap));
        const row = Math.floor(relativeY / (cellSize + gridGap));
        
        if (row >= 0 && row < GRID_ROWS && col >= 0 && col < GRID_COLS) {
            showPreview(draggedPiece.piece, row, col);
        } else {
            clearPreview();
        }
        
        e.preventDefault();
    };
    document.addEventListener('touchmove', documentTouchMoveHandler, { passive: false });
    
    documentTouchEndHandler = (e) => {
        // Limpiar datos temporales
        const containers = document.querySelectorAll('.piece-container');
        containers.forEach(c => delete c._tempTouchData);
        
        // Si no hubo movimiento, es un tap para rotar
        if (!touchMoved && !draggedPiece) {
            const touch = e.changedTouches[0];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            const container = element?.closest('.piece-container');
            if (container) {
                const index = parseInt(container.dataset.index);
                if (!usedPieces.has(index)) {
                    rotatePiece(index);
                }
            }
            return;
        }
        
        // Handle drag and drop
        if (!draggedPiece || !draggedPiece.isDragging) {
            draggedPiece = null;
            return;
        }
        
        const container = document.querySelector(`[data-index="${draggedPiece.index}"]`);
        if (container) container.classList.remove('dragging');
        
        document.body.classList.remove('is-dragging');
        
        const touch = e.changedTouches[0];
        
        // Calcular la posición en el grid usando el mismo método que en touchmove
        const cellSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cell'));
        const gridGap = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gap'));
        const gridEl = document.getElementById('grid');
        const gridRect = gridEl.getBoundingClientRect();
        
        const piece00X = touch.clientX - draggedPiece.clickPixelOffset.x;
        const piece00Y = touch.clientY - draggedPiece.clickPixelOffset.y;
        
        const relativeX = piece00X - gridRect.left;
        const relativeY = piece00Y - gridRect.top;
        
        const col = Math.floor(relativeX / (cellSize + gridGap));
        const row = Math.floor(relativeY / (cellSize + gridGap));
        
        if (row >= 0 && row < GRID_ROWS && col >= 0 && col < GRID_COLS) {
            if (canPlacePiece(draggedPiece.piece, row, col)) {
                const pieceCells = placePiece(draggedPiece.piece, row, col);
                
                placedPieces.push({
                    pieceIndex: draggedPiece.index,
                    cells: pieceCells
                });
                
                updateGridDisplay();
                
                pieceCells.forEach((cellInfo, i) => {
                    const gridCell = document.querySelector(`[data-row="${cellInfo.row}"][data-col="${cellInfo.col}"]`);
                    if (gridCell) {
                        gridCell.classList.add('placing');
                        setTimeout(() => {
                            gridCell.classList.remove('placing');
                        }, 50 + i * 30);
                    }
                });
                
                playSound('place');
                
                usedPieces.add(draggedPiece.index);
                const pieceContainer = document.querySelector(`[data-index="${draggedPiece.index}"]`);
                if (pieceContainer) {
                    pieceContainer.classList.add('used');
                }
                
                setTimeout(() => checkWinCondition(), 400);
            } else {
                playSound('invalid');
            }
        } else {
            playSound('invalid');
        }
        
        draggedPiece = null;
        removeFloatingPiece();
        clearPreview();
        
        e.preventDefault();
    };
    document.addEventListener('touchend', documentTouchEndHandler, { passive: false });
}

// Create floating piece that follows cursor
function createFloatingPiece(piece, clickPixelOffset = {x: 0, y: 0}) {
    removeFloatingPiece();
    
    floatingPieceEl = document.createElement('div');
    floatingPieceEl.className = 'floating-piece';
    
    const maxX = Math.max(...piece.cells.map(c => c[0])) + 1;
    const maxY = Math.max(...piece.cells.map(c => c[1])) + 1;
    
    floatingPieceEl.style.gridTemplateColumns = `repeat(${maxY}, var(--cell))`;
    floatingPieceEl.style.gridTemplateRows = `repeat(${maxX}, var(--cell))`;
    
    for (let row = 0; row < maxX; row++) {
        for (let col = 0; col < maxY; col++) {
            const cell = document.createElement('div');
            cell.className = 'piece-cell';
            
            const isFilled = piece.cells.some(([r, c]) => r === row && c === col);
            if (isFilled) {
                cell.classList.add('filled');
                cell.style.background = piece.color;
                cell.style.boxShadow = `inset 0 0 0 2px ${piece.color}dd, 0 4px 12px ${piece.color}66`;
            } else {
                // Make empty cells completely invisible
                cell.style.background = 'transparent';
                cell.style.boxShadow = 'none';
                cell.style.opacity = '0';
            }
            
            floatingPieceEl.appendChild(cell);
        }
    }
    
    document.body.appendChild(floatingPieceEl);
}

function removeFloatingPiece() {
    if (floatingPieceEl) {
        floatingPieceEl.remove();
        floatingPieceEl = null;
    }
}

// Show preview of where piece will be placed
function showPreview(piece, startRow, startCol) {
    clearPreview();
    
    const canPlace = canPlacePiece(piece, startRow, startCol);
    const previewClass = canPlace ? 'preview-green' : 'preview-red';
    
    piece.cells.forEach(([r, c]) => {
        const row = startRow + r;
        const col = startCol + c;
        
        if (row >= 0 && row < GRID_ROWS && col >= 0 && col < GRID_COLS) {
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (cell) {
                cell.classList.add(previewClass);
                previewCells.push(cell);
            }
        }
    });
}

function clearPreview() {
    previewCells.forEach(cell => {
        cell.classList.remove('preview-green', 'preview-red');
    });
    previewCells = [];
}

// Check if a piece can be placed at a given position
function canPlacePiece(piece, startRow, startCol) {
    return piece.cells.every(([r, c]) => {
        const row = startRow + r;
        const col = startCol + c;
        
        // Check boundaries
        if (row < 0 || row >= GRID_ROWS || col < 0 || col >= GRID_COLS) {
            return false;
        }
        
        // Check if cell is already occupied or blocked
        return !grid[row][col] || grid[row][col] === 0;
    });
}

// Place a piece on the grid
function placePiece(piece, startRow, startCol) {
    const pieceCells = [];
    piece.cells.forEach(([r, c]) => {
        const row = startRow + r;
        const col = startCol + c;
        grid[row][col] = piece.color;
        pieceCells.push({ row, col, color: piece.color });
    });
    return pieceCells;
}

// Update the grid display
function updateGridDisplay() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const cellColor = grid[row][col];
        
        // Check if this is a current date cell
        const isCurrentDate = currentDateCells.some(([r, c]) => r === row && c === col);
        
        if (isCurrentDate) {
            cell.classList.add('current-date');
        } else {
            cell.classList.remove('current-date');
        }
        
        if (cellColor && cellColor !== 0) {
            cell.classList.add('filled');
            cell.style.background = cellColor;
            cell.style.boxShadow = `inset 0 0 0 2px ${cellColor}dd, 0 2px 8px ${cellColor}66`;
        } else {
            cell.classList.remove('filled');
            cell.style.background = '';
            cell.style.boxShadow = '';
        }
    });
}

// Update grid labels with current language
function updateGridLabels() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        
        const labelEl = cell.querySelector('.cell-label');
        if (labelEl) {
            labelEl.textContent = getCellLabel(row, col);
        }
    });
}

// Setup click on grid to return pieces to tray
function setupGridClickToReturn() {
    const gridElement = document.getElementById('grid');
    
    gridElement.addEventListener('click', (e) => {
        const cell = e.target.closest('.grid-cell');
        if (!cell) return;
        
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        
        // Find which piece this cell belongs to
        const placedPieceIndex = placedPieces.findIndex(pp => 
            pp.cells.some(c => c.row === row && c.col === col)
        );
        
        if (placedPieceIndex !== -1) {
            const placedPiece = placedPieces[placedPieceIndex];
            
            // Add removal animation
            placedPiece.cells.forEach(c => {
                const gridCell = document.querySelector(`[data-row="${c.row}"][data-col="${c.col}"]`);
                if (gridCell) {
                    gridCell.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
                    gridCell.style.transform = 'scale(0.8)';
                    gridCell.style.opacity = '0';
                }
            });
            
            setTimeout(() => {
                // Remove piece from grid
                placedPiece.cells.forEach(c => {
                    grid[c.row][c.col] = null;
                    const gridCell = document.querySelector(`[data-row="${c.row}"][data-col="${c.col}"]`);
                    if (gridCell) {
                        // Restore cell appearance but keep label
                        gridCell.style.transition = '';
                        gridCell.style.transform = '';
                        gridCell.style.opacity = '1';
                    }
                });
                
                // Remove from placed pieces
                placedPieces.splice(placedPieceIndex, 1);
                
                // Mark piece as available again
                usedPieces.delete(placedPiece.pieceIndex);
                const container = document.querySelector(`[data-index="${placedPiece.pieceIndex}"]`);
                if (container) {
                    container.classList.remove('used');
                }
                
                updateGridDisplay();
                
                // Play sound
                playSound('return');
            }, 200);
        }
    });
}

// Setup control buttons
function setupControls() {
    const btnLanguage = document.getElementById('btn-language');
    const languagePanel = document.getElementById('language-panel');
    const btnSound = document.getElementById('btn-sound');
    const btnTheme = document.getElementById('btn-theme');
    
    // Detect and set browser language
    currentLanguage = detectBrowserLanguage();
    updateTooltips();
    updateCurrentDate();
    
    // Language selector
    if (btnLanguage && languagePanel) {
        btnLanguage.addEventListener('click', () => {
            languagePanel.classList.toggle('hidden');
            playSound('rotate');
        });
        
        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#btn-language') && !e.target.closest('#language-panel')) {
                languagePanel.classList.add('hidden');
            }
        });
        
        // Language options
        const langOptions = document.querySelectorAll('.lang-option');
        langOptions.forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.dataset.lang;
                setLanguage(lang);
                languagePanel.classList.add('hidden');
                playSound('place');
            });
        });
    }
    
    // Sound toggle
    if (btnSound) {
        btnSound.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            btnSound.classList.toggle('muted', !soundEnabled);
            btnSound.querySelector('.icon').textContent = soundEnabled ? '🔊' : '🔇';
            playSound('rotate');
        });
    }
    
    // Theme toggle
    if (btnTheme) {
        btnTheme.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            btnTheme.querySelector('.icon').textContent = isLight ? '☀️' : '🌙';
            playSound('rotate');
        });
    }
    
    // Info modal
    const btnInfo = document.getElementById('btn-info');
    const infoModal = document.getElementById('info-modal');
    const infoClose = document.getElementById('info-close');
    
    if (btnInfo && infoModal && infoClose) {
        btnInfo.addEventListener('click', () => {
            infoModal.classList.add('show');
            playSound('rotate');
        });
        
        infoClose.addEventListener('click', () => {
            infoModal.classList.remove('show');
            playSound('rotate');
        });
        
        // Close modal when clicking outside
        infoModal.addEventListener('click', (e) => {
            if (e.target === infoModal) {
                infoModal.classList.remove('show');
                playSound('rotate');
            }
        });
    }
}

// Check if the player has won
function checkWinCondition() {
    // Check if all non-blocked cells are filled
    for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
            // Skip blocked cells
            const isBlocked = blockedCells.some(([r, c]) => r === row && c === col);
            if (isBlocked) continue;
            
            // If any non-blocked cell is empty, game is not won
            if (!grid[row][col] || grid[row][col] === 0) {
                return;
            }
        }
    }
    
    // All non-blocked cells are filled - Victory!
    showVictoryScreen();
}

// Play victory sound
function playVictorySound() {
    if (!soundEnabled || !audioCtx) return;
    
    const now = audioCtx.currentTime;
    
    // Victory melody - happy ascending notes
    const notes = [
        { freq: 523.25, time: 0 },      // C5
        { freq: 659.25, time: 0.15 },   // E5
        { freq: 783.99, time: 0.3 },    // G5
        { freq: 1046.50, time: 0.45 }   // C6
    ];
    
    notes.forEach(note => {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.frequency.value = note.freq;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, now + note.time);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + note.time + 0.3);
        
        oscillator.start(now + note.time);
        oscillator.stop(now + note.time + 0.3);
    });
}

// Create confetti animation
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe', '#fd79a8'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Show victory screen
function showVictoryScreen() {
    playVictorySound();
    createConfetti();
    
    // Create victory modal
    const modal = document.createElement('div');
    modal.className = 'victory-modal';
    
    const lang = translations[currentLanguage];
    
    modal.innerHTML = `
        <div class="victory-content">
            <button class="victory-close" aria-label="Close">✕</button>
            <h1 class="victory-title">${lang.victory.title}</h1>
            <p class="victory-message">${lang.victory.message}</p>
            <div class="victory-emoji">🎊🎉🎈</div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add close button handler
    const closeBtn = modal.querySelector('.victory-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Animate modal entrance
    setTimeout(() => modal.classList.add('show'), 100);
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    setupControls();
});