const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');
const toggle = player.querySelector('.player__button');
const ranges = player.querySelectorAll('input');
const skipButtons = player.querySelectorAll('[data-skip]');

function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));
skipButtons.forEach(button => button.addEventListener('click', skip));

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
