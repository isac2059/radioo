document.querySelectorAll('.radio-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.getElementById('principal-container').style.display = 'block';
    this.style.display = 'none';

    // Inicialize o player AQUI dentro:
    const music = document.getElementById('audio');
    const songName = document.querySelector('.music-name');
    const artistName = document.querySelector('.artist-name');
    const disk = document.querySelector('.disk');
    const seekBar = document.querySelector('.seek-bar');
    const currentTime = document.querySelector('.current-time');
    const musicDuration = document.querySelector('.song-duration');
    const playBtn = document.querySelector('.play-btn');
    const forwardBtn = document.querySelector('.forward-btn');
    const backwardBtn = document.querySelector('.backward-btn');

    const songs = [
      {
        name: "Swim",
        path: "musicas/Chase Atlantic - Swim.mp3",
        artist: "Chase Atlantic",
        cover: "capa1.jpg"
      },
      {
        name: "Consume",
        path: "musicas/Chase Atlantic - ＂Consume＂ feat. Goon Des Garcons (Official Audio).mp3",
        artist: "Chase Atlantic feat. Goon Des Garcons",
        cover: "capa2.jpg"
      }
    ];

    let currentMusic = 0;

    function formatTime(time) {
      let min = Math.floor(time / 60);
      let sec = Math.floor(time % 60);
      if (min < 10) min = `0${min}`;
      if (sec < 10) sec = `0${sec}`;
      return `${min}:${sec}`;
    }

    function setMusic(i) {
      seekBar.value = 0;
      let song = songs[i];
      currentMusic = i;
      music.src = song.path;
      songName.innerText = song.name;
      artistName.innerText = song.artist;
      disk.style.backgroundImage = `url('${song.cover}')`;
      currentTime.innerText = "00:00";
      setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerText = formatTime(music.duration);
      }, 300);
    }

    setMusic(0);

    setInterval(() => {
      seekBar.value = music.currentTime;
      currentTime.innerText = formatTime(music.currentTime);
      if (Math.floor(music.currentTime) === Math.floor(seekBar.max)) {
        forwardBtn.click();
      }
    }, 500);

    seekBar.addEventListener('change', () => {
      music.currentTime = seekBar.value;
    });

    playBtn.addEventListener('click', () => {
      if (playBtn.classList.contains('pause')) {
        music.play();
        playBtn.classList.remove('pause');
        disk.classList.add('play');
      } else {
        music.pause();
        playBtn.classList.add('pause');
        disk.classList.remove('play');
      }
    });

    forwardBtn.addEventListener('click', () => {
      if (currentMusic >= songs.length - 1) {
        currentMusic = 0;
      } else {
        currentMusic++;
      }
      setMusic(currentMusic);
      music.play();
      playBtn.classList.remove('pause');
      disk.classList.add('play');
    });

    backwardBtn.addEventListener('click', () => {
      if (currentMusic <= 0) {
        currentMusic = songs.length - 1;
      } else {
        currentMusic--;
      }
      setMusic(currentMusic);
      music.play();
      playBtn.classList.remove('pause');
      disk.classList.add('play');
    });
  });
});