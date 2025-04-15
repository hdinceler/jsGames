window.onload=()=>{
    const rastgeleDolas=(element,elementHeight)=>{
        const animasyonAdi=element.id || `${Math.floor(Math.random()*10000)}`;
        const styleTag=document.createElement('style');
        document.head.appendChild(styleTag);

        let keyframes=`@keyframes dolas_${animasyonAdi}{`;
        const frameCount=10;
        for(let i=0;i<=100; i+=100/frameCount){
            const x=Math.floor(Math.random()*window.innerWidth);
            const y=Math.floor(Math.random()*window.innerHeight);
            keyframes+=`${i}%{transform:translate(${x}px,${y}px)}`;
        }
        keyframes+=`}`;
        styleTag.innerHTML=keyframes;
        element.style.position='absolute';
        element.style.height=`${elementHeight}px`;
        element.style.animation=`dolas_${animasyonAdi} 15s infinite alternate-reverse linear`;
    }
    const items=[]
    let puan=0;
    let can=1;
    const skorTablosu=document.getElementById('skorTablosu');
    const puanlar=document.getElementById('puanlar');
    const canlar=document.getElementById('canlar');
    const perde=document.getElementById("gameOver");
    const gift=document.getElementById('gift');
    perde.style.display='none';

    
    const yilan=document.getElementById("yilan");
    const havuc1=document.getElementById("havuc1");
    const havuc2=document.getElementById("havuc2");
    const havuc3=document.getElementById("havuc3");
    
    rastgeleDolas(gift,96)
    rastgeleDolas(yilan,64)
    rastgeleDolas(havuc1,96)
    rastgeleDolas(havuc2,96)
    rastgeleDolas(havuc3,96)

    const canYaz=(adet)=>{
        console.log(can);
        canlar.innerHTML=""
        for(let i=1; i<=adet;i++){
            const tavsan=document.createElement('img');
            tavsan.src='./rabbit.png';
            tavsan.height=54;
            tavsan.alt = "can";
            canlar.appendChild(tavsan);
        }
     }
    canYaz(can)

     havuc1.addEventListener(
        'click' , ()=>{
            puan+=10;
            puanlar.innerText=puan + " PUAN"
            canYaz(can)
         }
     );
     havuc2.addEventListener(
        'click' , ()=>{
            puan+=20;
            puanlar.innerText=puan + " PUAN"
            canYaz(can)
         }
     );

     havuc3.addEventListener(
        'click' , ()=>{
            puan+=30;
            puanlar.innerText=puan + " PUAN"
            canYaz(can)
         }
     );

     yilan.addEventListener(
        'click' , ()=>{
            can--
            canYaz(can)
            puan=0;
            puanlar.innerText=puan + " PUAN";
            if(can <=0 ){ perde.style.display='block'; }
         }
     );

}