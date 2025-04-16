const items = [
  { img: "brokoli", ad: "Brokoli", fayda: true, price: 50 },
  { img: "spinach", ad: "Ispanak", fayda: true, price: 45 },
  { img: "havuc", ad: "Havuç", fayda: true, price: 30 },
  { img: "biber", ad: "Biber", fayda: true, price: 35 },
  { img: "domates", ad: "Domates", fayda: true, price: 40 },
  { img: "enginar", ad: "Enginar", fayda: true, price: 55 },
  { img: "milk", ad: "Süt", fayda: true, price: 25 },
  { img: "lahana", ad: "Lahana", fayda: true, price: 32 },
  { img: "patlican", ad: "Patlıcan", fayda: true, price: 38 },
  { img: "fish", ad: "Balık", fayda: true, price: 60 },
  { img: "salatalik", ad: "Salatalık", fayda: true, price: 28 },
  { img: "sogan", ad: "Soğan", fayda: true, price: 22 },
  { img: "patates", ad: "Patates", fayda: true, price: 27 },
  { img: "cola", ad: "Kola", fayda: false, price: 18 },
  { img: "burger", ad: "Hamburger", fayda: false, price: 35 },
  { img: "energyDrink", ad: "Enerji İçeceği", fayda: false, price: 20 },
  { img: "rottenApple", ad: "Çürük Elma", fayda: false, price: 5 },
  { img: "rottenMeat", ad: "Bayat Et", fayda: false, price: 6 },
  { img: "candy", ad: "Şekerleme", fayda: false, price: 15 },
  { img: "chips", ad: "Cips", fayda: false, price: 25 }, 
  { img: "sausage", ad: "Nitratlı Sucuk", fayda: false, price: 30 }, 
  { img: "dirtyHand", ad: "Kirli eller", fayda: false, price: 1 }, 
];

const ekranGenislik = window.innerWidth;
const ekranYukseklik = window.innerHeight;
const body=document.body;
body.style.cursor="url('./img/pacmanRed.png') 32 32,auto;"


// Sayfa yüklendikten sonra sabit genişlik ve yükseklik uygula
window.onload = function() {

    // Genişlik ve yükseklik sabitle
    document.body.style.width = ekranGenislik + "px";
    document.body.style.height = ekranYukseklik + "px";

    // Overflow-x'i gizle
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'hidden';  // Dikey kaydırma çubuğu da engellenebilir
}

//sürükleme engelle
document.addEventListener("dragstart", function (e) {
  e.preventDefault();
});


const itemsArea = document.getElementById('itemsArea');
const scorePanel = document.getElementById('scorePanel');
const perde = document.getElementById('perde');

const scoreThumbFayda= document.getElementById('scoreThumbFayda');
const scoreThumbZarar= document.getElementById('scoreThumbZarar');
const scoreThumbNet= document.getElementById('scoreThumbNet');

const scoreFayda= document.getElementById('scoreFayda');
const scoreZarar= document.getElementById('scoreZarar');
const scoreNet= document.getElementById('scoreNet');
const scoreMusic=document.getElementById('scoreMusic');

let puanFayda=0;
let puanZarar=0;
let puanNet = 0;
let puanFaydaBitis=3;
let puanZararBitis=3;
let puanNetBitis=1;
let kazanmaPuani=20;  // puanNet değeri bu sayıya ulaşınca kazandiniz() functionu çalışır
let kaybetmePuani=-3; // puanNet değeri bu sayıya ulaşınca kaybettiniz() functionu çalışır

let puanKatsayisi = 1;
const itemSize = 96;

// 1. Ekranı satırlara böl
function getKonumlar() {
  const kolonSayisi = Math.floor(ekranGenislik / itemSize);
  const konumlar = [];

  for (let i = 0; i < kolonSayisi; i++) {
    konumlar.push(i * itemSize);
  }

  return konumlar;
}

function itemYap(newItem) {
  const item = document.createElement('div');

  item.classList.add("item");
    
  // 2. Rastgele bir konum seç, çakışma yok çünkü sabit boşluklar var
  const konumlar = getKonumlar();
  const randomLeft = konumlar[Math.floor(Math.random() * konumlar.length)];
  item.style.left = randomLeft + "px";
  item.style.top ="-" + itemSize + "px"; // başlangıç noktası yukarıda

  const itemImg=document.createElement('img')
  itemImg.style.height=itemSize+"px";
  itemImg.src = './img/' + newItem.img + '.png';

  
  
  item.appendChild(itemImg);
  
  const itemName=document.createElement('div')
  itemName.innerText=newItem.ad;
  itemName.className="itemName";
  
  const coin=document.createElement('div')
  coin.innerHTML=newItem.price+"₺";
  coin.classList.add('coin');


  itemsArea.appendChild(item);
  item.appendChild(itemName);
  // item.appendChild(coin);
  
  let itemKonum = -itemSize;
  
  if(newItem.fayda===false){
    item.classList.add("danger");
    itemName.style.color="red";
  }

  function hareketEt() {
    itemKonum += 2;
    item.style.top = itemKonum + "px";

    if (itemKonum >= window.innerHeight-itemSize) {
      item.remove();
    } else {
      requestAnimationFrame(hareketEt);
    }
  }

  
  item.addEventListener('mouseover',()=>yiyecekYakala(),{once:true});
  item.addEventListener('click',()=>yiyecekYakala(),{once:true});
  
  let itemCatched=false; // hem kilk hem mouseover olayından sadece biri çalışsın
  
  const yiyecekYakala=()=>{
    if(!itemCatched){
      itemCatched=true;
      if(newItem.fayda===false){
        puanZarar++;
        item.classList.add("dangerBoom");
        body.style.cursor="url('./img/pacmanRed.png') 32 32,auto;"

        const sfxError = new Audio('./sfx/error2.mp3'); // Dosya yoluna dikkat!
        sfxError.play();
          // Ses çaldıktan sonra ses nesnesini yok et
          sfxError.addEventListener('ended', () => {
          sfxError = null;  // Bellekten temizleme
        });
      }else{
        puanFayda++;
        const sfxSucces = new Audio('./sfx/success1.mp3'); // Dosya yoluna dikkat!
        sfxSucces.play();
        // Ses çaldıktan sonra ses nesnesini yok et
        sfxSucces.addEventListener('ended', () => {
          sfxSucces = null;  // Bellekten temizleme
        });
      }
      puanNet = puanKatsayisi*(puanFayda-puanZarar);
      scoreFayda.innerHTML=puanKatsayisi*puanFayda;
      scoreZarar.innerHTML=puanKatsayisi*puanZarar;
      scoreNet.innerHTML=puanNet;
      item.classList.remove("danger")
      item.classList.add("grow")
      setTimeout(()=>item.remove(),1000);

      scoreThumbFayda.style.height=`${6+puanFayda/10}rem`;
      scoreThumbZarar.style.height=`${6+puanZarar/10}rem`;
      scoreThumbNet.style.height=`${6+puanNet/10}rem`;
      if(puanNet<=kaybetmePuani){ kaybettiniz(); }else if(puanNet>=kazanmaPuani){
        kazandiniz();
      }
    }
  }

  const kaybettiniz=()=>{
    perde.style.zIndex='9999';
    perde.classList.add('show');
    perde.style.backgroundColor="black";
    perde.innerHTML='<h1>Kaybettiniz</h1><h2>Yeniden oynamak için tıkla</h2>'
    sfxLoop.pause();
    sfxWin= new Audio('./sfx/gameOver.mp3'); // Yeni ses nesnesi oluştur
    sfxWin.loop = false; // Döngüde çalmasını sağla
    sfxWin.play().catch(err => console.warn("Ses çalınamadı:", err)); // Çalmayı dene
  }

  const kazandiniz=()=>{
    perde.style.zIndex='9999';
    perde.classList.add('show');
    perde.style.backgroundColor="green";
    perde.innerHTML='<h1>Kazandınız Tebrikler</h1><h2>Yeniden oynamak için tıkla</h2>'
    sfxLoop.pause();
    sfxWin= new Audio('./sfx/yey.mp3'); // Yeni ses nesnesi oluştur
    sfxWin.loop = false; // Döngüde çalmasını sağla
    sfxWin.play().catch(err => console.warn("Ses çalınamadı:", err)); // Çalmayı dene
  }
  perde.addEventListener('click',()=>{location.reload()})
  hareketEt();
}

let sfxLoop; // sfxLoop'u dışarıda tanımladık

scoreMusic.addEventListener('click',()=>{

    if(sfxLoop && !sfxLoop.paused){
      scoreMusic.classList.remove('scoreMusicPlay');
      scoreMusic.classList.add('scoreMusicMute');
      sfxLoop.pause();
      sfxLoop.currentTime=0;
    }else{
      scoreMusic.classList.add('scoreMusicPlay');
      scoreMusic.classList.remove('scoreMusicMute');
      sfxLoop = new Audio('./sfx/loop1.mp3'); // Yeni ses nesnesi oluştur
      sfxLoop.loop = true; // Döngüde çalmasını sağla
      sfxLoop.play().catch(err => console.warn("Ses çalınamadı:", err)); // Çalmayı dene
    }
});
// Sürekli yeni item düşür
setInterval(() => {
  const randomItem = items[Math.floor(Math.random() * items.length)];
  itemYap(randomItem);
}, 800);
