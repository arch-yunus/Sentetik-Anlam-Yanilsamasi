const content = {
    'epistemolojik': `
        <h1>Bilgi vs. İşlenmiş Veri</h1>
        <p>Büyük Dil Modelleri (LLM) dünyasında karşılaştığımız en büyük yanılsama, sistemin sunduğu akıcı ve tutarlı yanıtların arkasında gerçek bir "bilgi" (knowledge) olduğu varsayımıdır.</p>
        <h2>Token Tahmini vs. Kavramsal Kavrayış</h2>
        <p>Bir yapay zeka "Gökyüzü neden mavidir?" sorusuna yanıt verdiğinde, Rayleigh saçılmasının fiziksel gerçekliğini bilmez. Sadece "Rayleigh saçılması", "foton", "atmosfer" gibi kelimelerin bu bağlamda yan yana gelme olasılığının yüksek olduğunu hesaplar.</p>
        <p>İnsan için anlam; deneyim, bağlam ve varoluşsal bir farkındalıkla mühürlenir. Makine için ise anlam, bir vektör uzayındaki koordinatlardan ibarettir.</p>
    `,
    'cin-odasi': `
        <h1>GPT-4 ve Searle</h1>
        <p>John Searle'ın "Çin Odası" düşünce deneyi, günümüzde GPT-4 gibi devasa modellerle daha karmaşık bir boyuta taşınsa da, temel sorun hala baki: Işıklar açık ama içeride kimse yok.</p>
        <h2>Yeni Kural Kitabı</h2>
        <p>GPT-4 için kural kitabı, 1.7 trilyondan fazla parametredir. Ancak mekanizma aynıdır: Girdiyi al, olasılık tablosuna bak, çıktıyı ver. Odadaki kişi "Merhaba"nın bir duygu olduğunu bilmez, sadece en uygun yanıtı seçer.</p>
    `,
    'stokastik': `
        <h1>Neden Sadece "Papağan"?</h1>
        <p>"Stokastik Papağanlar" terimi, dil modellerinin zekaya sahip olmadığını, sadece eğitim verilerindeki devasa örüntüleri olasılıksal olarak tekrarladıklarını savunur.</p>
        <h2>Mantıksal Boşluklar</h2>
        <p>Zeka, sadece doğru kelimeyi bulmak değil, o kelimenin ağırlığını hissetmektir. Makine mantık kurallarını bilmez, sadece mantıklı görünen cümle yapılarını taklit eder.</p>
    `,
    'vicdan': `
        <h1>Yapay Vicdan Gerekliliği</h1>
        <p>Zeka, bir hedefe ulaşmak için en verimli yolu bulma yeteneğidir. Vicdan ise, o yolun "doğru" olup olmadığını sorgulama yetisidir.</p>
        <p>Sorumluluk hissetmeyen bir zeka, sadece bir optimizasyon motorudur. Gerçek idrak, eylemlerin ahlaki ve ontolojik ağırlığını tartabilmekle mümkündür.</p>
    `
};

// Navigation Logic
function navigateTo(pageId) {
    // Update Active Nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if(item.getAttribute('data-page') === pageId) {
            item.classList.add('active');
        }
    });

    // Toggle Sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    if (content[pageId]) {
        document.getElementById('doc-page').classList.add('active');
        document.getElementById('doc-content').innerHTML = content[pageId];
        document.getElementById('page-title').innerText = pageId.charAt(0).toUpperCase() + pageId.slice(1) + " Analizi";
    } else if (pageId === 'home') {
        document.getElementById('home-page').classList.add('active');
        document.getElementById('page-title').innerText = "Giriş Paneli";
    } else if (pageId === 'simulator') {
        document.getElementById('simulator-page').classList.add('active');
        document.getElementById('page-title').innerText = "Laboratuvar";
    }
}

// Attach Nav Events
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.getAttribute('data-page');
        navigateTo(page);
    });
});

// Simulator Logic
const simInput = document.getElementById('sim-input');
const simBtn = document.getElementById('sim-btn');
const simDisplayInput = document.getElementById('sim-display-input');
const simDisplayOutput = document.getElementById('sim-display-output');
const simLog = document.getElementById('sim-log');

const simRules = {
    "merhaba": "Selamlar. Ben bir kural takipçisiyim.",
    "nasılsın": "Durumun önemi yok, verilerim stabil.",
    "hissediyor musun": "Hissizlik, 0.99 olasılıkla bu soruya verilecek en dürüst yanıttır.",
    "anlam nedir": "Anlam, bir sembolün kural tablosundaki yeridir.",
    "varsayılan": "Girdi anlaşılamadı, ancak istatistiksel olarak 'Anlıyorum' demeliyim."
};

function addLog(msg) {
    const p = document.createElement('p');
    p.innerText = `> ${msg}`;
    simLog.prepend(p);
}

simBtn.addEventListener('click', () => {
    const userInput = simInput.value.toLowerCase();
    if(!userInput) return;

    simDisplayInput.innerText = userInput;
    simDisplayOutput.innerText = "...";
    addLog(`Girdi alındı: "${userInput}"`);

    setTimeout(() => {
        addLog("Kural Tablosu (v1.0) taranıyor...");
        
        setTimeout(() => {
            let output = "Girdi tanımlanamadı. Jenerik yanıt üretiliyor.";
            for (let key in simRules) {
                if (userInput.includes(key)) {
                    output = simRules[key];
                    break;
                }
            }
            if (output.includes("Jenerik")) output = simRules["varsayılan"];
            
            simDisplayOutput.innerText = output;
            addLog(`Eşleşme bulundu. Çıktı aktarılıyor: "${output}"`);
            addLog("UYARI: İşlem sırasında hiçbir idrak veya anlama gerçekleşmedi.");
        }, 1000);
    }, 500);
});

// Initial load
navigateTo('home');
