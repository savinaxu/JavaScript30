const timers = document.querySelectorAll('.timer__button')
const timeLeft = document.querySelector('.display__time-left')
const timeEnd = document.querySelector('.display__end-time')

let countdown

function left(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remain = seconds % 60
    const display = `${minutes}:${remain < 10 ? '0' : '' }${remain}`;
    document.title = display;
    timeLeft.textContent = display;
}

function end(endTime) {
    const et = new Date(endTime)
    const hour = et.getHours() > 12 ? et.getHours() - 12 : et.getHours() 
    const minutes = et.getMinutes()
    timeEnd.textContent = `Be Back At ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function tm(seconds) {
    clearInterval(countdown)

    const now = Date.now()
    const rest = now + seconds * 1000

    left(seconds)
    end(rest)

    countdown = setInterval(() => {
        const secondsLeft = Math.round((rest - Date.now()) / 1000)
        if(secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        left(secondsLeft)
    }, 1000)
}

function displayTime() {
    const seconds = parseInt(this.dataset.time)
    tm(seconds)
}

timers.forEach(timer => timer.addEventListener("click", displayTime))
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    tm(mins * 60);
    this.reset();
});


