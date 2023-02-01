const MAX = 400;
const vol = 1;
function init() {

    media = document.getElementById('media');
    play = document.getElementById('play');
    mute = document.getElementById('mute');
    bar = document.getElementById('bar');
    progress = document.getElementById('progress');
    volume = document.getElementById('volume');
    animBtn = document.getElementById('animBtn');
    control = document.getElementById('control');

    play.addEventListener('click', pushPlay);
    media.addEventListener('click', pushVideo);
    animBtn.addEventListener('click', pushVideo);
    mute.addEventListener('click', sound);
    bar.addEventListener('click', move);
    volume.addEventListener('change', volumeBar)
}

function pushVideo() {

    if (!media.paused && !media.ended) {
        videoPause();
        document.querySelector('.fa-pause').classList.add('active');
        document.querySelector('.fa-play').classList.remove('active');
        animationBtn();
    } else {
        videoPlay();
        document.querySelector('.fa-play').classList.add('active');
        document.querySelector('.fa-pause').classList.remove('active');
        animationBtn();
    }

}

function pushPlay() {

    if (!media.paused && !media.ended) {
        videoPause();
    } else {
        videoPlay();
    }

}

function videoPause() {
    media.pause();
    play.innerHTML = 'Старт';
    clearInterval(loop);
}

function videoPlay() {
    media.play();
    play.innerHTML = 'Пауза';
    loop = setInterval(myStatus, 1000);
}

function myStatus() {

    if (!media.ended) {
        let size =  media.currentTime * MAX / media.duration;
        progress.style = `
            width: ${parseInt(size)}px;
        `;
    } else {
        progress.style = `
            width: 0px;
        `;
        play.innerHTML = 'Старт';
        clearInterval(loop);
    }

}

function animationBtn() {
    animBtn.style = `
        animation: btn .5s linear;
    `;
    setTimeout(timer, 500);
    clearTimeout(timer);
}

function move(e) {

    if (!media.ended) {
        let mouseX = e.pageX - bar.offsetLeft;
        let newTime = mouseX * media.duration / MAX;
        media.currentTime = newTime;
        progress.style = `
            width: ${mouseX}px;
        `;
    }
}

function volumeBar() {
    media.volume = volume.value;
}

function sound() {
    if (media.muted != true) {
        media.muted = true;
        mute.style = `
            background-color: crimson;
        `;
    } else {
        media.muted = false;
        mute.style = `
            background-color: none;
        `;
    }

}

function timer() {
    animBtn.style = `
    animation: none;
`;
}




addEventListener('load', init);