// Variáveis

// Define um intervalo que controlará a atualização do cronômetro
let timerInterval;

// Define o tempo original (5 minutos em segundos)
let originalTime = 5 * 60;

// Inicializa a contagem regressiva com o tempo original
let timeLeft = originalTime;

// Controla se o cronômetro está ativo ou não
let isRunning = false;

// Controla a direção do cronômetro (contagem regressiva ou progressiva)
let isCountingUp = false;

// Controla se um alerta deve ser exibido quando o tempo acabar
let shouldAlert = false;

// Atualiza a exibição do cronômetro na página
function updateTimerDisplay() {
    // Converte o tempo total em minutos e segundos
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    // Converte os minutos e segundos em uma string formatada (por exemplo, "05:03")
    const displayText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Obtém o nome da pessoa do campo de entrada
    const personName = document.getElementById('personName').value;
    
    // Se o nome estiver vazio, interrompe a função
    if (personName.trim() === '') {
        return;
    }

    // Exibe o nome da pessoa e o tempo restante no elemento timer
    const timerText = `${personName}: ${displayText}`;
    document.getElementById('timer').textContent = timerText;
}

// Inicia a contagem regressiva do cronômetro
function startTimer() {
    // Permite que um alerta seja exibido quando o tempo acabar
    shouldAlert = true;

    // Se o nome estiver vazio, interrompe a função
    const personName = document.getElementById('personName').value;
    if (personName.trim() === '') {
        return;
    }

    // Se o cronômetro não estiver em execução, inicia a contagem
    if (!isRunning) {
        timerInterval = setInterval(() => {
            // Se estiver contando progressivamente, aumenta o tempo
            if (isCountingUp) {
                timeLeft++;
            } else {
                // Caso contrário, diminui o tempo
                timeLeft--;
                
                // Se o tempo acabar e o alerta estiver ativado, exibe uma mensagem
                if (timeLeft <= 0 && shouldAlert) {
                    alert('O tempo acabou!');
                }
            }
            
            // Atualiza a exibição do cronômetro
            updateTimerDisplay();

            // Se o tempo acabar, para o cronômetro
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
            }
        }, 1000);

        // Define o cronômetro como em execução
        isRunning = true;

        // Mostra os botões quadrados na página
        document.querySelectorAll('.square-button').forEach(button => {
            button.style.display = 'inline-block';
        });
    }
}

// Inicia o cronômetro sem um tempo definido (contagem progressiva)
function startFreeTimer() {
    // Define o tempo como 0
    timeLeft = 0;
    
    // Define a direção como contagem progressiva
    isCountingUp = true;
    
    // Desativa o alerta
    shouldAlert = false;

    // Atualiza a exibição do cronômetro
    updateTimerDisplay();

    // Se o cronômetro não estiver em execução, inicia a contagem
    if (!isRunning) {
        timerInterval = setInterval(() => {
            // Aumenta o tempo (pois é contagem progressiva)
            timeLeft++;
            
            // Atualiza a exibição do cronômetro
            updateTimerDisplay();
        }, 1000);

        // Define o cronômetro como em execução
        isRunning = true;

        // Mostra os botões quadrados na página
        document.querySelectorAll('.square-button').forEach(button => {
            button.style.display = 'inline-block';
        });
    }
}

// Alterna entre iniciar e parar o cronômetro
function toggleTimer() {
    const button = document.getElementById('button3');
    if (isRunning) {
        // Se o cronômetro estiver em execução, para
        stopTimer();
        button.textContent = 'C';
    } else {
        // Caso contrário, inicia
        startTimer();
        button.textContent = 'P';
    }
}

// Adiciona 5 minutos ao tempo restante
function addFiveMinutes() {
    timeLeft += 300;
    updateTimerDisplay();
}

// Para o cronômetro
function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

// Restaura todos os valores e configurações originais
function resetEverything() {
    clearInterval(timerInterval);
    document.getElementById('personName').value = '';
    document.getElementById('timer').textContent = '';
    timeLeft = originalTime;
    isRunning = false;
    shouldAlert = false;
    document.getElementById('button3').textContent = 'P';
    document.querySelectorAll('.square-button').forEach(button => {
        button.style.display = 'none';
    });
}

// Adiciona listeners de eventos para os botões correspondentes
document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('stopButton').addEventListener('click', startFreeTimer);
document.getElementById('button3').addEventListener('click', toggleTimer); 
document.getElementById('button1').addEventListener('click', addFiveMinutes);
document.getElementById('button2').addEventListener('click', () => {
    startFreeTimer();
    isCountingUp = true;
    shouldAlert = false;
});
document.getElementById('button4').addEventListener('click', resetEverything);

// Inicializa a exibição do cronômetro ao carregar a página
updateTimerDisplay();
