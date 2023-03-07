let time = 10;
let countdown = setInterval(update, 1000);

function update() {

    let min = Math.floor(time / 60);
    let sec = time % 60;

    sec = sec < 10 ? "0" + sec : sec;

    console.log(`${min}:${sec}`);

    time--;
    if (min == 0 && sec == 0) {
        clearInterval(countdown);
        console.log("Countdown ist fertig");
    };

}

module.exports = update;