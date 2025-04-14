window.onload=()=>{
    let puan=0;
    let can=10;
    const skorTablosu=document.getElementById('skorTablosu');
    const puanlar=document.getElementById('puanlar');
    const canlar=document.getElementById('canlar');
    const perde=document.getElementById("gameOver");
    perde.style.display='none';

    const yilan=document.getElementById("yilan");
    const havuc1=document.getElementById("havuc1");
    const havuc2=document.getElementById("havuc2");
    const havuc3=document.getElementById("havuc3");

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
