
        // Tłumaczenia
        const translations = {
            "pl": {
                "title": "Aplikacje Matematyczne",
                "leapYear": {
                    "title": "Badacz roku przestępnego",
                    "prompt": "Podaj rok:",
                    "button": "Oblicz",
                    "history": "Historia:",
                    "error": "Wprowadź poprawny rok (liczbę całkowitą).",
                    "yes": "To {verb} rok przestępny",
                    "no": "To nie {verb} rok przestępny",
                    "verbs": {"past": "był", "present": "jest", "future": "będzie"}
                },
                "matrixCalc": {
                    "title": "Kalkulator Macierzy",
                    "rows": "Wiersze:",
                    "cols": "Kolumny:",
                    "operation": "Operacja:",
                    "compute": "Oblicz",
                    "clear": "Wyczyść",
                    "matrix_a": "Macierz A",
                    "matrix_b": "Macierz B",
                    "result": "Wynik",
                    "accept": "Akceptuj",
                    "solve": "Układ równań",
                    "operations": {
                        "add": "Dodawanie",
                        "sub": "Odejmowanie",
                        "mul": "Mnożenie",
                        "det": "Wyznacznik",
                        "inv": "Macierz odwrotna",
                        "trans": "Transpozycja",
                        "solve": "Układ równań"
                    },
                    "methods": {              
                        "cramer": "Cramer",
                        "gauss": "Eliminacja Gaussa",
                        "gauss_jordan": "Gauss-Jordan",
                        "inverse": "Macierz odwrotna"
                    },
                    "errors": {
                        "same_dim": "Macierze muszą mieć te same wymiary do {op}.",
                        "mul_dim": "Liczba kolumn A musi być równa liczbie wierszy B.",
                        "square": "Macierz musi być kwadratowa, aby wykonać tę operację.",
                        "singular": "Macierz osobliwa – brak odwrotności.",
                        "invalid": "Niepoprawna liczba w (wiersz {r}, kolumna {c}).",
                        "solve_dim": "Macierz B musi być wektorem (1 kolumna) dla układu równań."
                    }
                },
            },
            "en": {
                "title": "Math Applications",
                "leapYear": {
                    "title": "Leap Year Investigator",
                    "prompt": "Enter year:",
                    "button": "Check",
                    "history": "History:",
                    "error": "Enter a valid integer year.",
                    "yes": "It {verb} a leap year",
                    "no": "It is not {verb} a leap year",
                    "verbs": {"past": "was", "present": "is", "future": "will be"}
                },
                "matrixCalc": {
                    "title": "Matrix Calculator",
                    "rows": "Rows:",
                    "cols": "Columns:",
                    "operation": "Operation:",
                    "compute": "Compute",
                    "clear": "Clear",
                    "matrix_a": "Matrix A",
                    "matrix_b": "Matrix B",
                    "result": "Result",
                    "accept": "Accept",
                    "solve": "Solve",
                    "operations": {
                        "add": "Addition",
                        "sub": "Subtraction",
                        "mul": "Multiplication",
                        "det": "Determinant",
                        "inv": "Inverse",
                        "trans": "Transpose",
                        "solve": "Solve"
                    },
                    "methods": {
                        "cramer": "Cramer",
                        "gauss": "Gaussian elimination",
                        "gauss_jordan": "Gauss-Jordan",
                        "inverse": "Inverse matrix"
                    },
                    "errors": {
                        "same_dim": "Matrices must have the same dimensions for {op}.",
                        "mul_dim": "Columns of A must equal rows of B.",
                        "square": "Matrix must be square for this operation.",
                        "singular": "Matrix is singular – cannot invert.",
                        "invalid": "Invalid number at (row {r}, col {c}).",
                        "solve_dim": "Matrix B must be a vector (1 column) for equation system."
                    }
                },
            }
        };

        // Aktualny język
        let currentLang = "pl";
        
        // Ekran powitalny
        document.querySelector('.start-btn').addEventListener('click', function() {
            document.querySelector('.welcome-screen').classList.add('hidden');
            document.querySelector('.app-container').style.display = 'block';
            setTimeout(() => {
                document.querySelector('.welcome-screen').style.display = 'none';
            }, 500);
        });

        // Menu główne
        const menuBtn = document.getElementById('menuBtn');
        const sideMenu = document.getElementById('sideMenu');
        const langBtn = document.getElementById('langBtn');
        const langMenu = document.getElementById('langMenu');
        
        menuBtn.addEventListener('click', function() {
            sideMenu.classList.toggle('open');
        });

        document.addEventListener('click', function (e) {
            const isClickInsideMenu = sideMenu.contains(e.target);
            const isClickOnButton = menuBtn.contains(e.target);
    
            if (!isClickInsideMenu && !isClickOnButton) {
                sideMenu.classList.remove('open');
            }
        });
        
        langBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            langMenu.style.display = langMenu.style.display === 'block' ? 'none' : 'block';
        });
        
        document.addEventListener('click', function(e) {
            if (!langMenu.contains(e.target) && e.target !== langBtn) {
                langMenu.style.display = 'none';
            }
        });
        
        // Zmiana języka
        langMenu.addEventListener('click', function(e) {
            if (e.target.dataset.lang) {
                currentLang = e.target.dataset.lang;
                updateUI();
                langMenu.style.display = 'none';
            }
        });

        // Zmień język
        function switchLanguage(code) {
            currentLang = code;
            updateUI();
            updateWelcomeScreen();
            document.title = translations[code].title;
            
            document.querySelectorAll('.lang-menu').forEach(menu => {
                menu.style.display = 'none';
            });

            // Jeśli jest jakiś ostatni wynik, przetłumacz go
            if (previousResult) {
                const year = parseInt(yearInput.value);
                if (!isNaN(year)) {
                    const verb = getVerb(year, currentLang);
                    if (isLeapYear(year)) {
                        previousResult = translations[currentLang].leapYear.yes.replace('{verb}', verb);
                    } else {
                        previousResult = translations[currentLang].leapYear.no.replace('{verb}', verb);
                    }
            
                    // Zaktualizuj wyświetlany wynik
                    const resultContainer = document.getElementById('resultContainer');
                    resultContainer.innerHTML = '';
                    const span = document.createElement('span');
                    span.className = 'result-word';
                    pan.textContent = previousResult;
                    resultContainer.appendChild(span);
                }
            }
        } 

        function updateWelcomeScreen() {
            const welcomeTitle = document.querySelector('.welcome-title');
            const startBtn = document.querySelector('.start-btn');
    
            if (welcomeTitle) {
                welcomeTitle.textContent = translations[currentLang].title;
            }
    
            if (startBtn) {
                startBtn.textContent = currentLang === 'pl' ? 'Rozpocznij' : 'Start';
            }
        }
        
        function updateUI() {
        // Aktualizacja tytułu aplikacji
        document.getElementById('title').textContent = translations[currentLang].title;
        
        // Aktualizacja interfejsu Badacza roku przestępnego
        document.getElementById('leapYearTitle').textContent = translations[currentLang].leapYear.title;
        document.getElementById('yearLabel').textContent = translations[currentLang].leapYear.prompt;
        document.getElementById('checkBtn').textContent = translations[currentLang].leapYear.button;
        document.getElementById('historyLabel').textContent = translations[currentLang].leapYear.history;
        translateHistory();

        // Aktualizacja interfejsu Kalkulatora macierzy
        document.getElementById('matrixCalcTitle').textContent = translations[currentLang].matrixCalc.title;
        document.getElementById('operationLabel').textContent = translations[currentLang].matrixCalc.operation;
        document.getElementById('operationBtn').textContent = translations[currentLang].matrixCalc.operations[currentOperation];
        document.getElementById('computeBtn').textContent = translations[currentLang].matrixCalc.compute;
        document.getElementById('clearBtn').textContent = translations[currentLang].matrixCalc.clear;
        document.getElementById('matrixATitle').textContent = translations[currentLang].matrixCalc.matrix_a;
        document.getElementById('matrixBTitle').textContent = translations[currentLang].matrixCalc.matrix_b;
        document.getElementById('rowsALabel').textContent = translations[currentLang].matrixCalc.rows;
        document.getElementById('colsALabel').textContent = translations[currentLang].matrixCalc.cols;
        document.getElementById('rowsBLabel').textContent = translations[currentLang].matrixCalc.rows;
        document.getElementById('colsBLabel').textContent = translations[currentLang].matrixCalc.cols;
        document.getElementById('acceptA').textContent = translations[currentLang].matrixCalc.accept;
        document.getElementById('acceptB').textContent = translations[currentLang].matrixCalc.accept;

        // Aktualizacja menu aplikacji
        document.getElementById('appMenuItem').textContent = currentLang === 'pl' ? 'Aplikacje' : 'Applications';
        document.querySelectorAll('#appSubmenu .submenu-item').forEach((item, index) => {
            if (index === 0) item.textContent = translations[currentLang].leapYear.title;
            if (index === 1) item.textContent = translations[currentLang].matrixCalc.title;
        });
        
        // Aktualizacja menu pomocy
        document.getElementById('helpMenuItem').textContent = currentLang === 'pl' ? 'Pomoc' : 'Help';
        document.querySelectorAll('#helpSubmenu .submenu-item').forEach((item, index) => {
            if (index === 0) item.textContent = currentLang === 'pl' ? 'O aplikacji' : 'About';
            if (index === 1) item.textContent = currentLang === 'pl' ? 'Instrukcja' : 'Instructions';
        });
        
        // Aktualizacja menu językowego
        document.querySelectorAll('#langMenu div').forEach((item, index) => {
            if (index === 0) item.textContent = currentLang === 'pl' ? 'Polski PL' : 'Polish PL';
            if (index === 1) item.textContent = currentLang === 'pl' ? 'English GB' : 'Angielski GB';
        });
        
        // Aktualizacja menu operacji
        const operationMenu = document.getElementById('operationMenu');
        operationMenu.innerHTML = '';
        for (const [key, value] of Object.entries(translations[currentLang].matrixCalc.operations)) {
            const item = document.createElement('div');
            item.className = 'operation-menu-item';
            item.textContent = value;
            item.dataset.op = key;
            operationMenu.appendChild(item);
        }
        
        // Aktualizacja przycisków metod
        const methodSelector = document.getElementById('methodSelector');
        methodSelector.innerHTML = '';
        if (currentOperation === 'solve') {
            for (const [key, value] of Object.entries(translations[currentLang].matrixCalc.methods)) {
                const btn = document.createElement('button');
                btn.className = `method-btn ${key === currentMethod ? 'active' : ''}`;
                btn.textContent = value;
                btn.dataset.method = key;
                btn.addEventListener('click', () => {
                    currentMethod = key;
                    updateMethodButtons();
                });
                methodSelector.appendChild(btn);
            }
            methodSelector.style.display = 'flex';
        } else {
            methodSelector.style.display = 'none';
        }
        
        // Aktualizacja historii roku przestępnego (jeśli istnieją wpisy)
        if (history.length > 0) {
            const historyBox = document.getElementById('historyBox');
            historyBox.innerHTML = '';
            history.forEach(item => {
                const entryDiv = document.createElement('div');
                entryDiv.className = 'history-entry';
                entryDiv.textContent = item;
                historyBox.appendChild(entryDiv);
            });
        }
    }
        
        // Menu aplikacji
        const appMenuItem = document.getElementById('appMenuItem');
        const appSubmenu = document.getElementById('appSubmenu');
        const helpMenuItem = document.getElementById('helpMenuItem');
        const helpSubmenu = document.getElementById('helpSubmenu');
        const backBtn1 = document.getElementById('backBtn1');
        const backBtn2 = document.getElementById('backBtn2');
        
        appMenuItem.addEventListener('click', function() {
            appSubmenu.style.display = appSubmenu.style.display === 'block' ? 'none' : 'block';
            helpSubmenu.style.display = 'none';
        });
        
        helpMenuItem.addEventListener('click', function() {
            helpSubmenu.style.display = helpSubmenu.style.display === 'block' ? 'none' : 'block';
            appSubmenu.style.display = 'none';
        });
        
        backBtn1.addEventListener('click', function() {
            appSubmenu.style.display = 'none';
        });
        
        backBtn2.addEventListener('click', function() {
            helpSubmenu.style.display = 'none';
        });
        
        // Przełączanie między aplikacjami
        const appContents = document.querySelectorAll('.app-content');
        
        document.querySelectorAll('.submenu-item').forEach(item => {
            item.addEventListener('click', function() {
                const app = this.dataset.app;
                if (app) {
                    appContents.forEach(content => {
                        content.classList.remove('active');
                    });
                    document.getElementById(app + 'App').classList.add('active');
                    sideMenu.classList.remove('open');
                }
            });
        });
        
        // Domyślnie pokaż pierwszą aplikację
        document.getElementById('leapYearApp').classList.add('active');

        // Implementacja Badacza roku przestępnego
        let previousResult = "";
        let history = [];
        const MAX_HISTORY = 10;
        const animationDelay = 500;
        
        const yearInput = document.getElementById('yearInput');
        const checkBtn = document.getElementById('checkBtn');
        const resultContainer = document.getElementById('resultContainer');
        const historyBox = document.getElementById('historyBox');
        
        function isLeapYear(year) {
            return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
        }
        
        function getVerb(year, lang) {
            const now = new Date().getFullYear();
            const tense = year < now ? "past" : year === now ? "present" : "future";
            return translations[lang].leapYear.verbs[tense];
        }
        
        function checkLeapYear() {
            const lang = translations[currentLang].leapYear;
            try {
                const year = parseInt(yearInput.value);
                if (isNaN(year)) {
                    throw new Error(lang.error);
                }
                
                const verb = getVerb(year, currentLang);
                let result;
                if (isLeapYear(year)) {
                    result = lang.yes.replace('{verb}', verb);
                } else {
                    result = lang.no.replace('{verb}', verb);
                }
                
                animateTextChange(result, previousResult);
                updateHistory(year, result);
                previousResult = result;
            } catch (error) {
                alert(error.message);
            }
        }
        
        function animateTextChange(newText, oldText) {
            resultContainer.innerHTML = '';
    
            const newWords = newText.split(' ');
            const oldWords = oldText ? oldText.split(' ') : [];
    
            // Znajdź indeksy słów, które się różnią
            const diffIndices = [];
            for (let i = 0; i < newWords.length; i++) {
                if (i >= oldWords.length || newWords[i] !== oldWords[i]) {
                    diffIndices.push(i);
                }
            }
    
            // Jeśli nie ma różnic, wyświetl cały tekst bez animacji
            if (diffIndices.length === 0) {
                const span = document.createElement('span');
                span.className = 'result-word';
                span.textContent = newText;
                resultContainer.appendChild(span);
                return;
            }
    
            // Tworzymy spany dla każdego słowa
            newWords.forEach((word, i) => {
                const span = document.createElement('span');
                span.className = 'result-word';
        
                // Animuj tylko słowa, które się różnią
                if (diffIndices.includes(i)) {
                    span.style.color = 'var(--clr-anim)';
                    animateWord(span, word);
                } else {
                    span.textContent = word;
                }
        
                resultContainer.appendChild(span);
                // Dodaj spację między słowami, oprócz ostatniego
                if (i < newWords.length - 1) {
                    resultContainer.appendChild(document.createTextNode(' '));
                }
            });
        }

        function animateWord(element, word, index = 0) {
            const totalDuration = 400; // Stały czas 300ms dla każdego słowa
            const speed = Math.max(50, totalDuration / word.length);
    
            if (index <= word.length) {
                element.textContent = word.substring(0, index);
                setTimeout(() => {
                animateWord(element, word, index + 1);
                }, speed);
            } else {
                element.style.color = 'var(--clr-fg)';
            }
        }
        
        function animateLetters(span, text, index) {
            if (index <= text.length) {
                span.textContent = text.substring(0, index);
                setTimeout(() => {
                    animateLetters(span, text, index + 1);
                }, 50);
            } else {
                span.style.color = 'var(--clr-fg)';
            }
        }
        
        function updateHistory(year, result) {
            const entry = `${year}: ${result}`;
            history.unshift(entry);
            
            if (history.length > MAX_HISTORY) {
                history.pop();
            }
            
            updateHistoryBox();
        }

        function translateHistory() {
            if (history.length === 0) return;
    
            const newHistory = [];
            history.forEach(entry => {
                // Pobierz rok i oryginalny wynik z wpisu historii
                const match = entry.match(/^(\d+):\s*(.*)$/);
                if (!match) return;
        
                const year = parseInt(match[1]);
                const originalResult = match[2];
        
                // Tylko jeśli to jest wynik dotyczący roku przestępnego
                if (originalResult.includes(translations['pl'].leapYear.yes.split('{verb}')[0])) {
                    const verb = getVerb(year, currentLang);
                    const translated = translations[currentLang].leapYear.yes.replace('{verb}', verb);
                    newHistory.push(`${year}: ${translated}`);
                } 
                else if (originalResult.includes(translations['pl'].leapYear.no.split('{verb}')[0])) {
                    const verb = getVerb(year, currentLang);
                    const translated = translations[currentLang].leapYear.no.replace('{verb}', verb);
                        newHistory.push(`${year}: ${translated}`);
                } else {
                    // Jeśli to inny typ wpisu, zostawiamy bez zmian
                newHistory.push(entry);
                }
            });
    
            history = newHistory;
            updateHistoryBox();
        }
        
        function updateHistoryBox() {
            const historyBox = document.getElementById('historyBox');
            historyBox.innerHTML = '';
            history.forEach(item => {
                const entryDiv = document.createElement('div');
                entryDiv.className = 'history-entry';
                entryDiv.textContent = item;
                historyBox.appendChild(entryDiv);
            });
        }

        checkBtn.addEventListener('click', checkLeapYear);
        yearInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkLeapYear();
            }
        });
        
        // Implementacja Kalkulatora macierzy
        let currentOperation = "add";
        let currentMethod = "cramer";

        // Elementy DOM
        const operationBtn = document.getElementById('operationBtn');
        const operationMenu = document.getElementById('operationMenu');
        const methodSelector = document.getElementById('methodSelector');
        const computeBtn = document.getElementById('computeBtn');
        const clearBtn = document.getElementById('clearBtn');
        const matrixA = document.getElementById('matrixA');
        const matrixB = document.getElementById('matrixB');
        const matrixAGrid = document.getElementById('matrixAGrid');
        const matrixBGrid = document.getElementById('matrixBGrid');
        const sizeMenuA = document.getElementById('sizeMenuA');
        const sizeMenuB = document.getElementById('sizeMenuB');
        const rowsA = document.getElementById('rowsA');
        const colsA = document.getElementById('colsA');
        const rowsB = document.getElementById('rowsB');
        const colsB = document.getElementById('colsB');
        const acceptA = document.getElementById('acceptA');
        const acceptB = document.getElementById('acceptB');
        const resultBox = document.getElementById('resultBox');
        const solutionBox = document.getElementById('solutionBox');
        const matricesContainer = document.getElementById('matricesContainer');

        // Inicjalizacja macierzy
        function createMatrix(gridElement, rows, cols) {
            if (!gridElement) {
                throw new Error("Element macierzy nie istnieje!");
            }

            gridElement.innerHTML = '';
            gridElement.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
            
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'matrix-input';
                    input.value = '0';
                    input.dataset.row = i;
                    input.dataset.col = j;
                    input.inputmode = 'decimal';
                    input.pattern = '[0-9]*';
                    input.id = `matrix-input-${i}-${j}`;
                    input.addEventListener('focus', function() {
                        if (this.value === '0') {
                            this.value = '';
                        }
                    });
                    input.addEventListener('blur', function() {
                        if (this.value === '') {
                            this.value = '0';
                        }
                    });
                    gridElement.appendChild(input);
                }
            }
        }

        // Pobierz wartości z macierzy
        function getMatrixValues(gridElement) {
            if (!gridElement) {
                throw new Error("Element macierzy nie istnieje!");
            }

            const inputs = gridElement.querySelectorAll('.matrix-input');
            if (inputs.length === 0) {
                throw new Error("Brak pól input w macierzy!");
            }

            // Rzetelne obliczanie liczby kolumn
            const styleCols = gridElement.style.gridTemplateColumns;
            const cols = (styleCols.match(/repeat\((\d+)/) || [])[1] ? parseInt(styleCols.match(/repeat\((\d+)/)[1]) : 1;
            const rows = inputs.length / cols;

            const matrix = [];
            for (let i = 0; i < rows; i++) {
                const row = [];
                for (let j = 0; j < cols; j++) {
                    const input = gridElement.querySelector(`[data-row="${i}"][data-col="${j}"]`) || 
                    document.getElementById(`matrix-input-${i}-${j}`);

                    if (!input) {
                        throw new Error(`Nie znaleziono inputa (wiersz ${i}, kolumna ${j}).`);
                    }

                    const value = parseFloat(input.value);
                    if (isNaN(value)) {
                        throw new Error(translations[currentLang].matrixCalc.errors.invalid
                            .replace('{r}', i + 1)
                            .replace('{c}', j + 1));
                    }
                    row.push(value);
                }
                matrix.push(row);
            }

            // Walidacja specjalna dla B w operacji "solve"
            if (currentOperation === 'solve' && gridElement === matrixBGrid) {
                if (cols !== 1) {
                    console.error("Macierz B ma więcej niż 1 kolumnę:", matrix);
                    throw new Error(translations[currentLang].matrixCalc.errors.solve_dim);
                }
            }

            return matrix;
        }

        // Aktualizuj przyciski metod
        function updateMethodButtons() {
            const buttons = document.querySelectorAll('.method-btn');
            buttons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.method === currentMethod);
            });
        }

        // Zmień operację
        function changeOperation(operation) {
            currentOperation = operation;
            operationBtn.textContent = translations[currentLang].matrixCalc.operations[operation];
            const solutionBox = document.getElementById('solutionBox');
    
            // Specjalna obsługa układu równań
            if (operation === 'solve') {
                solutionBox.classList.add('solution-visible');
                const cols = (matrixAGrid.style.gridTemplateColumns?.split(' ') || []).length || 2;
                const rows = matrixAGrid.children.length / cols || 2;
                createMatrix(matrixBGrid, rows, 1);
                document.getElementById('rowsB').value = rows;
                document.getElementById('colsB').value = 1;
                document.getElementById('colsB').disabled = true;
            } else {
                solutionBox.classList.remove('solution-visible');
            }
    
            adjustMatrixB();
            updateUI();
            centerMatrices();
        }

        // Wyśrodkuj macierze w kontenerze
        function centerMatrices() {
            if (currentOperation === 'solve' || currentOperation === 'add' || currentOperation === 'sub' || currentOperation === 'mul') {
                matricesContainer.style.justifyContent = 'center';
            } else {
                matricesContainer.style.justifyContent = 'center';
                // Jeśli tylko jedna macierz jest widoczna, wyśrodkuj ją
                if (getComputedStyle(matrixB).display === 'none') {
                    matricesContainer.style.justifyContent = 'center';
                }
            }
        }

        // Dostosuj macierz B w zależności od operacji
        function adjustMatrixB() {
            const matrixBFrame = document.getElementById('matrixB');
            const matrixAGrid = document.getElementById('matrixAGrid');
            const matrixBGrid = document.getElementById('matrixBGrid');
            const colsBInput = document.getElementById('colsB');
            
            if (currentOperation === 'solve') {
                // Dla układu równań, macierz B ma tyle wierszy co A i 1 kolumnę
                const cols = (matrixAGrid.style.gridTemplateColumns?.split(' ') || []).length || 2;
                const rows = matrixAGrid.children.length / cols || 2;
                createMatrix(matrixBGrid, rows, 1);
                document.getElementById('rowsB').value = rows;
                document.getElementById('colsB').value = 1;
                colsBInput.disabled = true;
                matrixBFrame.style.display = 'block';
                
            } else if (['add', 'sub', 'mul'].includes(currentOperation)) {
                // Dla operacji wymagających dwóch macierzy
                const cols = (matrixAGrid.style.gridTemplateColumns?.split(' ') || []).length || 2;
                const rows = matrixAGrid.children.length / cols || 2;
                createMatrix(matrixBGrid, rows, cols);
                document.getElementById('rowsB').value = rows;
                document.getElementById('colsB').value = cols;
                colsBInput.disabled = false;
                matrixBFrame.style.display = 'block';
            } else {
                // Dla innych operacji ukryj macierz B
                matrixBFrame.style.display = 'none';
            }
        }

        // Wyświetl wynik
        function displayResult(result) {
            const resultBox = document.getElementById('resultBox');
            resultBox.innerHTML = '';
            
            if (Array.isArray(result)) {
                // Formatowanie macierzy
                const colWidth = 7;
                const lines = result.map(row => {
                    if (Array.isArray(row)) {
                        return row.map(val => {
                            const str = Number.isInteger(val) ? val.toString() : val.toFixed(2);
                            return str.padStart(colWidth, ' ');
                        }).join(' ');
                    } else {
                        // Dla wektorów (rozwiązanie układu równań)
                        const str = Number.isInteger(row) ? row.toString() : row.toFixed(2);
                        return str.padStart(colWidth, ' ');
                    }
                });
                
                lines.forEach(line => {
                    const div = document.createElement('div');
                    div.textContent = line;
                    resultBox.appendChild(div);
                });
            } else if (typeof result === 'number') {
                // Formatowanie liczby
                const str = Number.isInteger(result) ? result.toString() : result.toFixed(2);
                resultBox.textContent = str;
            } else {
                resultBox.textContent = result;
            }
        }

        // Wyświetl rozwiązanie układu równań
        function displaySolution(solution) {
            const solutionBox = document.getElementById('solutionBox');
            solutionBox.innerHTML = '';
            
            if (Array.isArray(solution)) {
                solution.forEach((val, i) => {
                    const div = document.createElement('div');
                    div.textContent = `x${i+1} = ${Number.isInteger(val) ? val : val.toFixed(2)}`;
                    solutionBox.appendChild(div);
                });
            } else if (typeof solution === 'number') {
                solutionBox.textContent = `x = ${Number.isInteger(solution) ? solution : solution.toFixed(2)}`;
            }
        }

        // Funkcje matematyczne
        function multiplyMatrices(a, b) {
            const result = [];
            for (let i = 0; i < a.length; i++) {
                result[i] = [];
                for (let j = 0; j < b[0].length; j++) {
                    let sum = 0;
                    for (let k = 0; k < a[0].length; k++) {
                        sum += a[i][k] * b[k][j];
                    }
                    result[i][j] = sum;
                }
            }
            return result;
        }

        function calculateDeterminant(matrix) {
            if (matrix.length === 1) return matrix[0][0];
            if (matrix.length === 2) {
                return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
            }
            
            let det = 0;
            for (let i = 0; i < matrix[0].length; i++) {
                const minor = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
                det += matrix[0][i] * Math.pow(-1, i) * calculateDeterminant(minor);
            }
            return det;
        }

        function invertMatrix(matrix) {
            const det = calculateDeterminant(matrix);
            if (Math.abs(det) < 1e-10) return null;
            
            const n = matrix.length;
            const inverse = [];
            
            for (let i = 0; i < n; i++) {
                inverse[i] = [];
                for (let j = 0; j < n; j++) {
                    const minor = matrix.filter((_, k) => k !== i)
                                      .map(row => row.filter((_, k) => k !== j));
                    const minorDet = calculateDeterminant(minor);
                    inverse[i][j] = Math.pow(-1, i + j) * minorDet / det;
                }
            }
            
            return transposeMatrix(inverse);
        }

        function transposeMatrix(matrix) {
            return matrix[0].map((_, i) => matrix.map(row => row[i]));
        }

        function solveCramer(A, b) {
            const detA = calculateDeterminant(A);
            if (Math.abs(detA) < 1e-10) {
                throw new Error(translations[currentLang].matrixCalc.errors.singular);
            }
            
            const n = A.length;
            const solution = [];
            
            for (let i = 0; i < n; i++) {
                const Ai = A.map(row => [...row]);
                for (let j = 0; j < n; j++) {
                    Ai[j][i] = b[j][0];
                }
                solution.push(calculateDeterminant(Ai) / detA);
            }
            
            return solution;
        }

        function solveGauss(A, b) {
            const n = A.length;
            const Ab = A.map((row, i) => [...row, b[i][0]]);
            
            // Eliminacja Gaussa
            for (let i = 0; i < n; i++) {
                // Znajdź wiersz z maksymalnym elementem w kolumnie
                let maxRow = i;
                for (let j = i + 1; j < n; j++) {
                    if (Math.abs(Ab[j][i]) > Math.abs(Ab[maxRow][i])) {
                        maxRow = j;
                    }
                }
                
                // Zamień wiersze
                [Ab[i], Ab[maxRow]] = [Ab[maxRow], Ab[i]];
                
                if (Math.abs(Ab[i][i]) < 1e-10) {
                    throw new Error(translations[currentLang].matrixCalc.errors.singular);
                }
                
                // Wyzeruj elementy poniżej
                for (let j = i + 1; j < n; j++) {
                    const factor = Ab[j][i] / Ab[i][i];
                    for (let k = i; k < n + 1; k++) {
                        Ab[j][k] -= factor * Ab[i][k];
                    }
                }
            }
            
            // Podstawienie wsteczne
            const solution = new Array(n);
            for (let i = n - 1; i >= 0; i--) {
                solution[i] = Ab[i][n];
                for (let j = i + 1; j < n; j++) {
                    solution[i] -= Ab[i][j] * solution[j];
                }
                solution[i] /= Ab[i][i];
            }
            
            return solution;
        }

        function gaussJordan(A, b) {
            const n = A.length;
            const Ab = A.map((row, i) => [...row, b[i][0]]);
            
            for (let i = 0; i < n; i++) {
                // Znajdź wiersz z maksymalnym elementem w kolumnie
                let maxRow = i;
                for (let j = i + 1; j < n; j++) {
                    if (Math.abs(Ab[j][i]) > Math.abs(Ab[maxRow][i])) {
                        maxRow = j;
                    }
                }
                
                // Zamień wiersze
                [Ab[i], Ab[maxRow]] = [Ab[maxRow], Ab[i]];
                
                if (Math.abs(Ab[i][i]) < 1e-10) {
                    throw new Error(translations[currentLang].matrixCalc.errors.singular);
                }
                
                // Normalizuj bieżący wiersz
                const pivot = Ab[i][i];
                for (let j = i; j < n + 1; j++) {
                    Ab[i][j] /= pivot;
                }
                
                // Wyzeruj elementy powyżej i poniżej
                for (let j = 0; j < n; j++) {
                    if (j !== i) {
                        const factor = Ab[j][i];
                        for (let k = i; k < n + 1; k++) {
                            Ab[j][k] -= factor * Ab[i][k];
                        }
                    }
                }
            }
            
            const rref = Ab.map(row => row.slice(0, n));
            const solution = Ab.map(row => row[n]);
            
            return [rref, solution];
        }

        function solveInverse(A, b) {
            const invA = invertMatrix(A);
            if (!invA) {
                throw new Error(translations[currentLang].matrixCalc.errors.singular);
            }
            
            const solution = multiplyMatrices(invA, b);
            return solution.map(row => row[0]);
        }

        // Wyczyść macierze
        function clearMatrices() {
            const inputs = document.querySelectorAll('.matrix-input');
            inputs.forEach(input => {
                input.value = '0';
            });
            resultBox.innerHTML = '';
            solutionBox.innerHTML = '';
            document.querySelector('.solution-container').classList.remove('show');
        }

        // Obliczenia macierzowe
        function compute() {
            try {
                const matrixAValues = getMatrixValues(matrixAGrid);
                
                if (['add', 'sub', 'mul', 'solve'].includes(currentOperation)) {
                    const matrixBValues = getMatrixValues(matrixBGrid);
                    
                    if (currentOperation === 'add') {
                        if (matrixAValues.length !== matrixBValues.length || 
                            matrixAValues[0].length !== matrixBValues[0].length) {
                            throw new Error(translations[currentLang].matrixCalc.errors.same_dim
                                .replace('{op}', translations[currentLang].matrixCalc.operations.add.toLowerCase()));
                        }
                        const result = matrixAValues.map((row, i) => 
                            row.map((val, j) => val + matrixBValues[i][j])
                        );
                        displayResult(result);
                    } 
                    else if (currentOperation === 'sub') {
                        if (matrixAValues.length !== matrixBValues.length || 
                            matrixAValues[0].length !== matrixBValues[0].length) {
                            throw new Error(translations[currentLang].matrixCalc.errors.same_dim
                                .replace('{op}', translations[currentLang].matrixCalc.operations.sub.toLowerCase()));
                        }
                        const result = matrixAValues.map((row, i) => 
                            row.map((val, j) => val - matrixBValues[i][j])
                        );
                        displayResult(result);
                    } 
                    else if (currentOperation === 'mul') {
                        if (matrixAValues[0].length !== matrixBValues.length) {
                            throw new Error(translations[currentLang].matrixCalc.errors.mul_dim);
                        }
                        const result = multiplyMatrices(matrixAValues, matrixBValues);
                        displayResult(result);
                    } 
                    else if (currentOperation === 'solve') {
                        // Sprawdzenie czy macierz B jest wektorem kolumnowym
                        const isVector = matrixBValues.every(row => row.length === 1);

                        if (matrixAValues.length !== matrixAValues[0].length) {
                            throw new Error(translations[currentLang].matrixCalc.errors.square);
                        }
                        
                        if (!isVector) {
                            console.error('Nieprawidłowy format macierzy B:', matrixBValues);
                            throw new Error(translations[currentLang].matrixCalc.errors.solve_dim);
                        }
                        
                        let solution;
                        if (currentMethod === 'cramer') {
                            solution = solveCramer(matrixAValues, matrixBValues);
                            displayResult(solution.map(val => [val]));
                        } else if (currentMethod === 'gauss') {
                            solution = solveGauss(matrixAValues, matrixBValues);
                            displayResult(solution.map(val => [val]));
                        } else if (currentMethod === 'gauss_jordan') {
                            const [rref, sol] = gaussJordan(matrixAValues, matrixBValues);
                            displayResult(rref);
                            solution = sol;
                        } else if (currentMethod === 'inverse') {
                            solution = solveInverse(matrixAValues, matrixBValues);
                            displayResult(solution.map(val => [val]));
                        }
                        
                        displaySolution(solution);
                    }
                } 
                else if (currentOperation === 'det') {
                    if (matrixAValues.length !== matrixAValues[0].length) {
                        throw new Error(translations[currentLang].matrixCalc.errors.square);
                    }
                    const determinant = calculateDeterminant(matrixAValues);
                    displayResult(determinant);
                } 
                else if (currentOperation === 'inv') {
                    if (matrixAValues.length !== matrixAValues[0].length) {
                        throw new Error(translations[currentLang].matrixCalc.errors.square);
                    }
                    const inverse = invertMatrix(matrixAValues);
                    if (!inverse) {
                        throw new Error(translations[currentLang].matrixCalc.errors.singular);
                    }
                    displayResult(inverse);
                } 
                else if (currentOperation === 'trans') {
                    const transposed = transposeMatrix(matrixAValues);
                    displayResult(transposed);
                }
                
            } catch (error) {
                alert(error.message);
            }
        }

        // Pokaż/ukryj menu rozmiaru macierzy
        function toggleSizeMenu(matrix, menu) {
            // Jeśli kliknięto w przycisk menu
            if (event.target === menuBtn) {
                sideMenu.classList.toggle('open');
                    event.stopPropagation();
            }
            else if (!sideMenu.contains(event.target)) {
                sideMenu.classList.remove('open');
            }
            
            if (menu.style.display === 'block') {
                menu.style.display = 'none';
                return;
            }
            
            // Ukryj wszystkie inne menu
            document.querySelectorAll('.size-menu').forEach(m => {
                if (m !== menu) m.style.display = 'none';
            });
            
            // Pokaż aktualne menu
            const rect = matrix.getBoundingClientRect();
            menu.style.left = `${rect.left + window.scrollX}px`;
            
            if (window.innerWidth <= 600) {
                // Na telefonie - menu na dole ekranu
                menu.style.top = 'auto';
                menu.style.bottom = '20px';
                menu.style.left = '50%';
                menu.style.transform = 'translateX(-50%)';
            } else {
                // Na desktopie - menu pod macierzą
                menu.style.top = `${rect.bottom + window.scrollY}px`;
                menu.style.bottom = 'auto';
                menu.style.transform = 'none';
            }
            
            menu.style.display = 'block';
        }
        
        // Inicjalizacja kalkulatora macierzy
        createMatrix(matrixAGrid, 2, 2);
        createMatrix(matrixBGrid, 2, 2);
        
        operationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            operationMenu.style.display = operationMenu.style.display === 'block' ? 'none' : 'block';
        });
        
        operationMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            if (e.target.classList.contains('operation-menu-item')) {
                changeOperation(e.target.dataset.op);
                operationMenu.style.display = 'none';
            }
        });
        
        // Inicjalizacja
        document.addEventListener('DOMContentLoaded', () => {
            const sideMenu = document.getElementById('sideMenu');
            const menuBtn = document.getElementById('menuBtn');
    
            // Usuń stare listenery jeśli istnieją
            menuBtn.removeEventListener('click', toggleSideMenu);
            document.removeEventListener('click', toggleSideMenu);
    
            // Dodaj nowe listenery
            menuBtn.addEventListener('click', toggleSideMenu);
            document.addEventListener('click', toggleSideMenu);
    
            // Zapobiegaj propagacji kliknięć w samym menu
            sideMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            });

            // Obsługa kliknięcia poza menu
            document.addEventListener('click', () => {
                sizeMenuA.style.display = 'none';
                sizeMenuB.style.display = 'none';
                operationMenu.style.display = 'none';
            });

            document.addEventListener('click', (e) => {
                if (!langMenu.contains(e.target) && e.target !== langBtn) {
                    langMenu.style.display = 'none';
                }
            });
            
            // Zapobiegaj propagacji kliknięć w menu
            [operationMenu, sizeMenuA, sizeMenuB].forEach(menu => {
                menu.addEventListener('click', (e) => {
                    if (e.target.dataset.lang) switchLanguage(e.target.dataset.lang);
                    e.stopPropagation();
                });
            });
            
            // Obsługa zmiany rozmiaru macierzy A
            matrixA.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleSizeMenu(matrixA, sizeMenuA);
            });
            
            // Obsługa zmiany rozmiaru macierzy B
            matrixB.addEventListener('click', (e) => {
                e.stopPropagation();
                if (getComputedStyle(matrixB).display !== 'none') {
                    toggleSizeMenu(matrixB, sizeMenuB);
                    
                    // Dla układu równań, kolumny są zawsze 1
                    if (currentOperation === 'solve') {
                        document.getElementById('colsB').value = 1;
                        document.getElementById('colsB').disabled = true;
                    } else {
                        document.getElementById('colsB').disabled = false;
                    }
                }
            });
            
            // Akceptacja nowego rozmiaru macierzy A
            acceptA.addEventListener('click', () => {
                const rows = parseInt(rowsA.value);
                const cols = parseInt(colsA.value);
                createMatrix(matrixAGrid, rows, cols);

                if (currentOperation === 'solve') {
                    createMatrix(matrixBGrid, rows, 1);
                    document.getElementById('rowsB').value = rows;
                    document.getElementById('colsB').value = 1;
                    document.getElementById('colsB').disabled = true;
                }

                sizeMenuA.style.display = 'none';
            });
            
            // Akceptacja nowego rozmiaru macierzy B
            acceptB.addEventListener('click', () => {
                const rows = parseInt(rowsB.value);
                let cols = parseInt(colsB.value);

                if (currentOperation === 'solve') {
                    cols = 1;
                    document.getElementById('colsB').value = 1;
                }

                if (currentOperation === 'solve' && cols !== 1) {
                    alert(translations[currentLang].matrixCalc.errors.solve_dim);
                    document.getElementById('colsB').value = 1;
                    return;
                }

                createMatrix(matrixBGrid, rows, cols);
                sizeMenuB.style.display = 'none';
            });

            const langWrapper = document.querySelector('.welcome-language');
    const langBtn = langWrapper?.querySelector('.lang-btn');
    const langMenu = langWrapper?.querySelector('.lang-menu');

    if (langBtn && langMenu) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langMenu.classList.toggle('active');
        });

        langMenu.addEventListener('click', (e) => {
            const lang = e.target.dataset.lang;
            if (lang) {
                switchLanguage(lang);
                langMenu.classList.remove('active');
            }
        });

        document.addEventListener('click', (e) => {
            if (!langWrapper.contains(e.target)) {
                langMenu.classList.remove('active');
            }
        });
    }
        });   
        
        computeBtn.addEventListener('click', compute);
        clearBtn.addEventListener('click', clearMatrices);
    