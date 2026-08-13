const birthdayDate = new Date("2026-08-21T00:00:00");

const giftButton = document.getElementById("giftButton");
const messageSection = document.getElementById("messageSection");
const typedMessage = document.getElementById("typedMessage");
const finalMessage = document.getElementById("finalMessage");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const statusEl = document.getElementById("status");

const musicButton = document.getElementById("musicButton");
const audio = document.getElementById("birthdayAudio");

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let opened = false;
let confettiPieces = [];


/* =========================
   STARS
========================= */

const starsContainer = document.getElementById("stars");

for (let i = 0; i < 45; i++) {
  const star = document.createElement("span");

  star.className = "star";
  star.textContent = Math.random() > 0.5 ? "✦" : "·";

  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.fontSize = `${Math.random() * 8 + 5}px`;
  star.style.animationDelay = `${Math.random() * 4}s`;
  star.style.animationDuration = `${Math.random() * 3 + 2}s`;

  starsContainer.appendChild(star);
}


/* =========================
   COUNTDOWN
========================= */

function pad(number) {
  return String(number).padStart(2, "0");
}

function updateCountdown() {

  const now = new Date();
  const difference = birthdayDate - now;

  if (difference <= 0) {

    statusEl.textContent = "🎉 Hari ini hari spesialnya!";

    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";

    giftButton.querySelector("span:nth-child(2)").textContent =
      "Buka kejutan";

    return;
  }

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);

  statusEl.textContent = "Menuju hari spesial...";
}

updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================
   BIRTHDAY MESSAGE
========================= */

const message = `Selamat ulang tahun ke-24, Ananda! 🎉

Semoga di umur yang baru ini, semakin banyak hal baik yang datang dalam hidupmu.

Semoga selalu diberikan kesehatan, kebahagiaan, rezeki yang lancar, dan kekuatan untuk melewati setiap proses yang sedang dijalani.

Tidak semua hari harus sempurna. Yang penting, selalu ada alasan kecil untuk tetap bersyukur, tertawa, dan melangkah lagi.

Semoga semua target yang sedang dikejar satu per satu bisa tercapai. Kalau belum tercapai tahun ini, tidak apa-apa. Masih ada banyak waktu untuk terus mencoba.

Nikmati perjalananmu, kumpulkan pengalaman sebanyak-banyaknya, dan jangan lupa menikmati momen-momen kecil di sepanjang jalan.

Semoga tahun ini membawa lebih banyak cerita seru, kejutan menyenangkan, kesempatan baru, dan tentunya banyak kebahagiaan.

Sekali lagi, Happy Birthday, Ananda Gustia! 🎂✨`;


/* =========================
   TYPEWRITER
========================= */

function typeMessage() {

  typedMessage.textContent = "";

  let index = 0;

  function type() {

    if (index >= message.length) {

      typedMessage.classList.add("done");

      setTimeout(() => {
        finalMessage.classList.add("show");
      }, 600);

      return;
    }

    const character = message[index];

    typedMessage.textContent += character;

    index++;

    let delay = 28;

    if (character === ".") {
      delay = 180;
    }

    if (character === ",") {
      delay = 80;
    }

    if (character === "\n") {
      delay = 500;
    }

    setTimeout(type, delay);
  }

  type();
}


/* =========================
   OPEN GIFT
========================= */

giftButton.addEventListener("click", () => {

  if (opened) return;

  opened = true;

  giftButton.disabled = true;

  giftButton.style.opacity = ".6";

  messageSection.classList.add("show");

  setTimeout(() => {

    messageSection.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }, 300);

  typeMessage();

  launchConfetti();

  playMusic();
});


/* =========================
   MUSIC
========================= */

function playMusic() {

  audio.volume = 0.45;

  audio.play()
    .then(() => {
      musicButton.classList.add("playing");
    })
    .catch(() => {
      // Browser may block autoplay.
    });
}

musicButton.addEventListener("click", () => {

  if (audio.paused) {

    audio.play()
      .then(() => {
        musicButton.classList.add("playing");
      })
      .catch(() => {});

  } else {

    audio.pause();
    musicButton.classList.remove("playing");

  }

});


/* =========================
   CONFETTI
========================= */

function resizeCanvas() {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


function createConfetti() {

  confettiPieces = [];

  for (let i = 0; i < 180; i++) {

    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height,
      size: Math.random() * 7 + 4,
      speed: Math.random() * 4 + 3,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 8 - 4,
      drift: Math.random() * 2 - 1,
      opacity: 1,
      shape: Math.random() > .5 ? "rect" : "circle"
    });

  }
}


function drawConfetti() {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  let active = false;

  confettiPieces.forEach(piece => {

    piece.y += piece.speed;
    piece.x += piece.drift;
    piece.rotation += piece.rotationSpeed;

    if (piece.y < canvas.height + 30) {
      active = true;
    }

    ctx.save();

    ctx.translate(
      piece.x,
      piece.y
    );

    ctx.rotate(
      piece.rotation * Math.PI / 180
    );

    ctx.globalAlpha = piece.opacity;

    const colors = [
      "#8c7cff",
      "#6ee7da",
      "#ffffff",
      "#f4c95d",
      "#ff7aa2"
    ];

    ctx.fillStyle =
      colors[
        Math.floor(
          Math.random() * colors.length
        )
      ];

    if (piece.shape === "rect") {

      ctx.fillRect(
        -piece.size / 2,
        -piece.size / 2,
        piece.size,
        piece.size * 1.8
      );

    } else {

      ctx.beginPath();

      ctx.arc(
        0,
        0,
        piece.size / 2,
        0,
        Math.PI * 2
      );

      ctx.fill();

    }

    ctx.restore();

  });

  if (active) {
    requestAnimationFrame(drawConfetti);
  } else {
    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

}


function launchConfetti() {

  createConfetti();
  drawConfetti();

}const text=`Selamat Ulang Tahun ke-24, Ananda. 🎉

Semoga hari ini menjadi awal dari banyak hal baik yang akan hadir dalam hidupmu. Semoga setiap langkahmu selalu diberi kesehatan, kebahagiaan, dan kemudahan dalam meraih semua yang sedang kamu perjuangkan.

Terima kasih sudah menjadi teman yang baik. Semoga senyummu selalu punya banyak alasan untuk tetap hadir, bahkan di hari-hari yang terasa melelahkan.

Teruslah melangkah dengan percaya diri. Tidak perlu terburu-buru, karena setiap proses yang kamu jalani hari ini akan membawa cerita indah di masa depan.

Semoga semua doa dan harapan baikmu perlahan menemukan jalannya. Tetap menjadi pribadi yang baik, tetap semangat, dan jangan lupa menikmati setiap momen yang kamu lalui.

Sekali lagi, selamat ulang tahun, Ananda Gustia.

Semoga tahun ini dipenuhi kebahagiaan, kesehatan, rezeki yang baik, dan banyak kenangan indah yang akan selalu membuatmu tersenyum.

Happy Birthday! 🎂✨`;

gift.onclick=()=>{
 if(typingStarted) return;
 typingStarted=true;
 gift.style.pointerEvents='none';
 if(!gift.classList.contains('ready'))return;
 gift.classList.add('open');
 gift.classList.add('transform');
 letter.classList.add('show');
 bgm.play().catch(()=>{});
 document.getElementById("title").textContent="";
 const out=document.getElementById("typing");
 out.textContent="";
 const thanks=document.getElementById("thanks");
 thanks.style.display="none";
 let i=0;
 function type(){
   if(i<text.length){
      out.textContent+=text[i++];
      let d=38;
      if(".!?".includes(text[i-1])) d=250;
      else if(text[i-1]=="\n") d=800;
      setTimeout(type,d);
   }else{
      out.classList.add("done");
      setTimeout(()=>thanks.style.display="block",2000);
   }
 }
 type();
};
