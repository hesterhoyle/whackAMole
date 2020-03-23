document.getElementById("startBtn").disabled = false;

const fields = document.querySelectorAll('.grass');
const scoreBoard = document.querySelector('.score');
const pandas = document.querySelectorAll('.panda');
let lastField;
let timeUp = false;
let score = 0;



//random time that a panda will pop up
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

//random field choice
function randomField(fields){
    const index  = Math.floor(Math.random() * fields.length);
    const field = fields[index];
    //not same field:
    if (field === lastField){
        return randomField(fields);
    }
    lastField = field;
    return field;
}

//pop up & length
function popUp() {
    const time = randomTime(500, 1000);
    const field = randomField(fields);
    field.classList.add('up');
    // pop down
    setTimeout(() => {
        field.classList.remove('up');
        if(!timeUp) {
            popUp();
        }
    }, time);
}

// starting game, reset score to 0 and start popUp function, countdown timer etc.
function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    document.getElementById("startBtn").disabled = true;
    popUp();
    setTimeout(() => timeUp = true, 15500) //show random pandas for 15 seconds
    var timeleft = 15; //timer function for showing on screen
    var downloadTimer = setInterval(function(){
        if(timeleft <= 0){
            clearInterval(downloadTimer);
            document.getElementById("countdown").innerHTML = "Finished";
            document.getElementById("startBtn").disabled = false;
        } else {
            document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
        }
    timeleft -= 1;
    }, 1000);
}

var splat = document.getElementById("splatAud");
//checks for autoclicker etc.
function punch(e){
    if(!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
    splat.play();
}

pandas.forEach(panda => panda.addEventListener('click', punch))

