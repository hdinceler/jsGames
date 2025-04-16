const items = [
  { img: "brokoli", ad: "Brokoli", fayda: true },
  { img: "spinach", ad: "Ispanak", fayda: true },
  { img: "carrot", ad: "Havuç", fayda: true },
  { img: "pepper", ad: "Biber", fayda: true },
  { img: "tomatoes", ad: "Domates", fayda: true },
  { img: "artichoke", ad: "Enginar", fayda: true },
  { img: "milk", ad: "Süt", fayda: true },
  { img: "cabbage", ad: "Lahana", fayda: true },
  { img: "aubergine", ad: "Patlıcan", fayda: true },
  { img: "fish", ad: "Balık", fayda: true },
  { img: "salatalik", ad: "Salatalık", fayda: true },
  { img: "sogan", ad: "Soğan", fayda: true },
  { img: "patates", ad: "Patates", fayda: true },
  { img: "cola", ad: "Kola", fayda: false },
  { img: "burger", ad: "Hamburger", fayda: false },
  { img: "energyDrink", ad: "Enerji İçeceği", fayda: false },
  { img: "rottenApple", ad: "Çürük Elma", fayda: false },
  { img: "rottenMeat", ad: "Bayat Et", fayda: false },
  { img: "candy", ad: "Şekerleme", fayda: false },
  { img: "chips", ad: "Cips", fayda: false }, 
  { img: "sausage", ad: "Nitratlı Sucuk", fayda: false }, 
  
];

const ekranGenislik = window.innerWidth;
const ekranYukseklik = window.innerHeight;

// Sayfa yüklendikten sonra sabit genişlik ve yükseklik uygula
window.onload = function() {
    // Genişlik ve yükseklik sabitle
    document.body.style.width = ekranGenislik + "px";
    document.body.style.height = ekranYukseklik + "px";

    // Overflow-x'i gizle
    document.body.style.overflowX = 'hidden';
    document.body.style.overflowY = 'hidden';  // Dikey kaydırma çubuğu da engellenebilir
}


const itemsArea = document.getElementById('itemsArea');
const scorePanel = document.getElementById('scorePanel');
const scoreFayda= document.getElementById('scoreFayda');
const scoreZarar= document.getElementById('scoreZarar');
const scoreNet= document.getElementById('scoreNet');

let puanFayda=0;
let puanZarar=0;
let puanNet = 0;
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
  
  const itemName=document.createElement('span')
  itemName.innerText=newItem.ad;
  itemName.className="itemName";
  itemsArea.appendChild(item);
  item.appendChild(itemName);
  
  let itemKonum = -itemSize;
  
  if(newItem.fayda===false){
    item.classList.add("danger");
    itemName.style.color="red";
  }

  function hareketEt() {
    itemKonum += 2;
    item.style.top = itemKonum + "px";

    if (itemKonum >= window.innerHeight) {
      item.remove();
    } else {
      requestAnimationFrame(hareketEt);
    }
  }

 
  item.addEventListener('click', () => {
    if(newItem.fayda===false){
      puanZarar++;
      item.classList.add("dangerBoom");
    }else{
      puanFayda++;
    }
    puanNet = puanKatsayisi*(puanFayda-puanZarar);
    scoreFayda.innerHTML="fayda:"+puanKatsayisi*puanFayda;
    scoreZarar.innerHTML="zarar:"+puanKatsayisi*puanZarar;
    scoreNet.innerHTML="puan:"+puanNet;
    item.classList.remove("danger")
    item.classList.add("grow")
    setTimeout(()=>item.remove(),1000)
  });

  hareketEt();
}

// Sürekli yeni item düşür
setInterval(() => {
  const randomItem = items[Math.floor(Math.random() * items.length)];
  itemYap(randomItem);
}, 800);