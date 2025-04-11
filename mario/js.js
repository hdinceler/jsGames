 window.onload=()=>{
    const mario=document.createElement('img');
    mario.src='./img/mario.png';
    
    
    const skorTablosu=document.getElementById('skorTablosu');
    const puan=document.createElement('span');
    
    const oyunEkrani=document.getElementById('oyunEkrani');
    const menu= document.getElementById('menu');
    
    for(let i=1;i<=3;i++){
        const marioKafa=document.createElement('img')
        marioKafa.src='./img/marioKafa.png'
        marioKafa.classList.add('marioKafa');
        skorTablosu.appendChild(marioKafa)        ;
    }
    
    puan.classList.add('puan');
    puan.innerHTML='120 Puan';
    skorTablosu.appendChild(puan)
    
    oyunEkrani.appendChild(mario)
 }