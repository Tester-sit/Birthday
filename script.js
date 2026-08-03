const preview=new URLSearchParams(location.search).get('preview')==='1';
const target=new Date('2026-08-07T00:00:00');
const gift=document.getElementById('gift');
const info=document.getElementById('info');
const count=document.getElementById('count');
const letter=document.getElementById('letter');
const bgm=document.getElementById('bgm');
function tick(){
const now=new Date();
if(preview||now>=target){
info.textContent='🎁 Hadiah siap dibuka';
gift.classList.add('ready');
let d=target-now;
if(d>0){
let day=Math.floor(d/86400000),hr=Math.floor(d%86400000/3600000),mn=Math.floor(d%3600000/60000),sc=Math.floor(d%60000/1000);
count.textContent=`${day} Hari ${hr} Jam ${mn} Menit ${sc} Detik`;
}else count.textContent='Selamat Ulang Tahun!';
}else{
let d=target-now;
let day=Math.floor(d/86400000),hr=Math.floor(d%86400000/3600000),mn=Math.floor(d%3600000/60000),sc=Math.floor(d%60000/1000);
info.textContent='Hadiah masih terkunci';
count.textContent=`${day} Hari ${hr} Jam ${mn} Menit ${sc} Detik`;
}}
tick();setInterval(tick,1000);
gift.onclick=()=>{
 if(typingStarted) return;
 typingStarted=true;
 gift.style.pointerEvents='none';
if(!gift.classList.contains('ready'))return;
gift.classList.add('open');
 gift.classList.add('transform');
letter.classList.add('show');
bgm.play().catch(()=>{});
};

let typingStarted=false;
const text=`Selamat Ulang Tahun ke-24, Ananda. 🎉

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
