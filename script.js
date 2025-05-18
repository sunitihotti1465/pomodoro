const timerDisplay = document.getElementById('timer');
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const resetBtn = document.getElementById('resetBtn');
        const workDurationInput = document.getElementById('workDuration');
        const breakDurationInput = document.getElementById('breakDuration');
        const modeIndicator = document.getElementById('mode');

        let workDuration = 25 *60; 
        let breakDuration = 5* 60; 
        let timeLeft = workDuration;
        let timerInterval;
        let isRunning = false;
        let isWorkTime = true;

        updateDisplay();

        startBtn.addEventListener('click', startTimer);
        pauseBtn.addEventListener('click', pauseTimer);
        resetBtn.addEventListener('click', resetTimer);
        workDurationInput.addEventListener('change', updateDurations);
        breakDurationInput.addEventListener('change', updateDurations);

        function startTimer() {
            if (!isRunning) {
                isRunning = true;
                timerInterval = setInterval(updateTimer, 1000);
                startBtn.textContent = 'RESUME';
            }
        }

        function pauseTimer() {
            clearInterval(timerInterval);
            isRunning = false;
        }

        function resetTimer() {
            pauseTimer();
            isWorkTime = true;
            updateDurations();
            modeIndicator.textContent = 'WORK TIME';
            modeIndicator.style.color = '#E64B89;';
            document.querySelector('.container').style.borderColor = '#E64B89;';
            startBtn.textContent = 'START';
        }

        function updateTimer() {
            timeLeft--;
            
            if (timeLeft < 0) {
                clearInterval(timerInterval);
                isWorkTime = !isWorkTime;
                
                if (isWorkTime) {
                    timeLeft = workDuration;
                    modeIndicator.textContent = 'WORK TIME';
                    modeIndicator.style.color = '#E64B89;';
                    document.querySelector('.container').style.borderColor = '#E64B89;';
                    playSound('work');
                } else {
                    timeLeft = breakDuration;
                    modeIndicator.textContent = 'BREAK TIME';
                    modeIndicator.style.color = '#66cc99;';
                    document.querySelector('.container').style.borderColor = '#66cc99;';
                    playSound('break');
                }
                timerInterval = setInterval(updateTimer, 1000);
            }
            
            updateDisplay();
        }

        function updateDisplay() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            if (timeLeft <= 60) {
                timerDisplay.style.color = '#E64B89';
            } else if (isWorkTime) {
                timerDisplay.style.color = '#ffcc66;';
            } else {
                timerDisplay.style.color = '#66cc99;';
            }
        }

        function updateDurations() {
            workDuration = parseInt(workDurationInput.value) * 60;
            breakDuration = parseInt(breakDurationInput.value) * 60;
            
            if (isWorkTime) {
                timeLeft = workDuration;
            } else {
                timeLeft = breakDuration;
            }
            
            updateDisplay();
        }

        function playSound(type) {
            console.log(`Playing ${type} sound`);
        }