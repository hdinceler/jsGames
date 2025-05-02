window.onload = () => {
    const topRakip = document.getElementById('topRakip');
    const topBen = document.getElementById('topBen');
    const sound =new Audio('./fail.mp3')
    // Çarpışma değerleri
    const yariCap = 50;
    let benX = 0, benY = 0;
    let rakipX = 0, rakipY = 0;

    document.body.addEventListener('click', () =>sound.play() );

    // Çarpışma kontrol fonksiyonu
    function carpismaKontrol() {
        const benCenterX = benX + yariCap;
        const benCenterY = benY + yariCap;

        const rakipCenterX = rakipX + yariCap;
        const rakipCenterY = rakipY + yariCap;

        const farkX = benCenterX - rakipCenterX;
        const farkY = benCenterY - rakipCenterY;

        const mesafe = Math.sqrt(farkX * farkX + farkY * farkY);

        if (mesafe <= yariCap * 2) {
            console.log("Çarpıştı!");
            sound.play();
            // goRandom();
        } 
    }

    // WebSocket bağlantısı
    const ws = new WebSocket('ws://192.168.1.147:3000');

    ws.addEventListener('message', (event) => {
        const gelenMesaj = JSON.parse(event.data);
        rakipX = gelenMesaj.x;
        rakipY = gelenMesaj.y;

        topRakip.style.left = rakipX + 'px';
        topRakip.style.top = rakipY + 'px';

        carpismaKontrol();
    });

    ws.onopen = () => {
        console.log("Sunucuya bağlandı :)");
    };
    ws.onclose = () => {
        console.log("Bağlantı koptu!");
    };
    ws.onerror = (error) => {
        console.log(error);
    };

    // goRandom=()=>{
    //     topBen.x=Math.floor( Math.random()*window.innerWidth ) 
    //     topBen.y=Math.floor( Math.random()*window.innerHeight ) 
    // }

    // Mouse hareketinde, topBen'in konumunu güncelleme
    document.addEventListener('mousemove', function (e) {
        const x = e.clientX;
        const y = e.clientY;

        benX = x;
        benY = y;
        const position = { x, y };
        ws.send(JSON.stringify(position));

        topBen.style.left = x + 'px';
        topBen.style.top = y + 'px';

        carpismaKontrol(); // Çarpışmayı kontrol et
    });
};
