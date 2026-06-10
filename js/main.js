/* ==========================================================================
   Light & Muse Sports Bistro - Core Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSportsEvents();
  initMenu();
  initBookingSystem();
  initMap();
  initLuckyWheel();
});

/* --- 1. Header & Navigation Effects --- */
function initNavigation() {
  const header = document.querySelector('.header');
  const navMenu = document.querySelector('.nav-menu');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // Header background toggle on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Active nav link highlight on scroll (Scrollspy)
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === currentSection) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpened = navMenu.classList.contains('open');
    mobileToggle.innerHTML = isOpened ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}

/* --- 2. Live Sports Events Schedule --- */
const sportsData = [
  {
    id: 1,
    sport: 'basketball',
    league: 'NBA Finals (總決賽 G5)',
    time: '2026-06-10 18:30 (今日直播)',
    homeTeam: '波士頓塞爾提克',
    awayTeam: '洛杉磯湖人',
    status: 'live'
  },
  {
    id: 2,
    sport: 'football',
    league: 'UEFA Champions League (歐冠)',
    time: '2026-06-10 02:45 (深夜直播)',
    homeTeam: '皇家馬德里',
    awayTeam: '曼徹斯特城',
    status: 'upcoming'
  },
  {
    id: 3,
    sport: 'others',
    league: 'CPBL (中華職棒 - 台南主場)',
    time: '2026-06-11 18:35 (明日直播)',
    homeTeam: '統一 7-ELEVEn 獅',
    awayTeam: '富邦悍將',
    status: 'upcoming'
  },
  {
    id: 4,
    sport: 'football',
    league: 'Premier League (英超)',
    time: '2026-06-12 22:00',
    homeTeam: '利物浦',
    awayTeam: '兵工廠',
    status: 'upcoming'
  },
  {
    id: 5,
    sport: 'basketball',
    league: 'NBA Finals (總決賽 G6)',
    time: '2026-06-13 18:30',
    homeTeam: '洛杉磯湖人',
    awayTeam: '波士頓塞爾提克',
    status: 'upcoming'
  },
  {
    id: 6,
    sport: 'others',
    league: 'MLB (美國職棒大聯盟)',
    time: '2026-06-13 08:00',
    homeTeam: '紐約洋基',
    awayTeam: '波士頓紅襪',
    status: 'upcoming'
  }
];

function initSportsEvents() {
  const container = document.getElementById('events-container');
  const filterBtns = document.querySelectorAll('.broadcast .filter-btn');

  // Render events based on sport category
  function renderEvents(filter = 'all') {
    container.innerHTML = '';
    
    const filteredData = filter === 'all' 
      ? sportsData 
      : sportsData.filter(event => event.sport === filter);

    if (filteredData.length === 0) {
      container.innerHTML = '<div class="no-events">暫無排定賽事直播</div>';
      return;
    }

    filteredData.forEach(event => {
      const card = document.createElement('div');
      card.className = 'event-card glass-panel';
      card.innerHTML = `
        <div class="event-header">
          <span class="event-tag ${event.sport}">${getSportLabel(event.sport)}</span>
          <span class="event-time">${event.time}</span>
        </div>
        <div class="event-matchup">
          <span class="team-name">${event.homeTeam}</span>
          <span class="vs-badge">VS</span>
          <span class="team-name">${event.awayTeam}</span>
        </div>
        <div class="event-footer">
          <span class="event-league"><i class="fas fa-trophy text-gold"></i> ${event.league}</span>
          <button class="event-reminder-btn" onclick="toggleReminder(this, '${event.homeTeam} VS ${event.awayTeam}')" aria-label="設定提醒">
            <i class="far fa-bell"></i>
          </button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function getSportLabel(sport) {
    switch(sport) {
      case 'basketball': return '籃球 Basketball';
      case 'football': return '足球 Football';
      default: return '其他 Sports';
    }
  }

  // Filter click events
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderEvents(btn.getAttribute('data-filter'));
    });
  });

  // Initial render
  renderEvents();
}

// Global reminder toggle helper
window.toggleReminder = function(btn, matchName) {
  btn.classList.toggle('active');
  const icon = btn.querySelector('i');
  if (btn.classList.contains('active')) {
    icon.className = 'fas fa-bell';
    alert(`成功設定提醒！我們將在「${matchName}」開賽前通知您。`);
  } else {
    icon.className = 'far fa-bell';
  }
};

/* --- 3. Dynamic Menu filtering --- */
const menuData = [
  // Opening Specials (開幕限定餐點)
  {
    category: 'opening',
    name: '軟殼蟹明太子扁麵 / 燉飯',
    price: 480,
    desc: '開幕慶限定！整隻金黃酥脆的軟殼蟹，搭配濃郁明太子乳酪醬與細緻扁麵或燉飯，鮮美無比。',
    tag: '開幕限定主打',
    img: './assets/fusion_cuisine.png'
  },
  {
    category: 'opening',
    name: '秘製醬滷豬腱',
    price: 220,
    desc: '主廚獨家秘製中藥醬汁，慢火燉滷入味，切片冷盤上桌，帶有飽滿膠質與甘甜滷香，下酒神菜。',
    tag: '秘製下酒菜',
    img: './assets/fusion_cuisine.png'
  },
  {
    category: 'opening',
    name: '嗨Light雙醬脆薯',
    price: 180,
    desc: '現炸金黃酥脆美式細薯，附贈特製明太子醬與香濃起司肉醬雙醬，觀賽聚會人氣開胃點心。',
    tag: '開幕限定小食',
    img: './assets/fusion_cuisine.png'
  },
  {
    category: 'opening',
    name: '溫體手沖牛肉湯',
    price: 280,
    desc: '融入台南在地靈魂！精選每日新鮮溫體牛肉切片，上桌現場手沖滾沸牛骨高湯，肉質粉嫩鮮甜。',
    tag: '台南靈魂手沖',
    img: './assets/fusion_cuisine.png'
  },
  {
    category: 'opening',
    name: '特調SHOT盤 (6杯)',
    price: 420,
    desc: '六款色彩斑斕、風味不同的特調 Shot 組合，果香、乳酸與酒精在味蕾中激盪，派對熱血必備！',
    tag: '派對熱血必備',
    img: './assets/cocktail_signature.png',
    alcohol: 60,
    sweet: 50,
    sour: 60
  },
  // Signature Cocktails (特調)
  {
    category: 'signature',
    name: 'Siraya Sunset 西拉雅日落',
    price: 360,
    desc: '以南科黃昏為靈感的奢華調酒。熟成蘭姆酒搭配新鮮百香果與萊姆汁，表面帶有一層肉桂焦糖香，口感香醇迷人。',
    tag: '酒精濃度中等',
    img: './assets/cocktail_signature.png',
    alcohol: 50,
    sweet: 75,
    sour: 50
  },
  {
    category: 'signature',
    name: 'Muse\'s Whisper 繆思私語',
    price: 380,
    desc: '薰衣草與蝶豆花琴酒交織，當倒入特製萊姆糖漿時，酒液將由星夜藍漸變為靈感粉紫，帶有優雅的接骨木花香。',
    tag: '高顏值互動',
    img: './assets/cocktail_signature.png',
    alcohol: 40,
    sweet: 60,
    sour: 70
  },
  {
    category: 'signature',
    name: 'Antigravity Light 反重力之光',
    price: 400,
    desc: '極具現代感的漸層調酒。伏特加與藍柑橘糖漿底，中層椰奶，最上層以香檳封頂，點綴食用金箔，光芒璀璨。',
    tag: '極致奢華',
    img: './assets/cocktail_signature.png',
    alcohol: 70,
    sweet: 30,
    sour: 50
  },
  // Classic Cocktails (經典)
  {
    category: 'classics',
    name: 'Slam Dunk Sour 大滿貫酸酒',
    price: 340,
    desc: '向籃球運動致敬。經典波本威士忌酸酒底，上層優雅地漂浮一層台南在地紅酒，果香與橡木桶香氣完美平衡。',
    tag: '紅酒漂浮',
    img: './assets/cocktail_signature.png',
    alcohol: 60,
    sweet: 45,
    sour: 65
  },
  {
    category: 'classics',
    name: 'Three-Pointer Fizz 三分球費茲',
    price: 350,
    desc: '熱情奔放的龍舌蘭遇上新鮮紅葡萄柚與氣泡水，杯緣圍繞著墨西哥辣椒鹽，微辣微酸，刺激感十足！',
    tag: '微辣清爽',
    img: './assets/cocktail_signature.png',
    alcohol: 50,
    sweet: 30,
    sour: 80
  },
  // Main Dishes (料理)
  {
    category: 'mains',
    name: 'Siraya Sirloin Steak 西拉雅帶骨沙朗 (12oz)',
    price: 980,
    desc: '精選美牛沙朗，以迷迭香奶油香煎至五分熟，封鎖飽滿肉汁。搭配油封大蒜與主廚特調波特紅酒醬。',
    tag: '人氣主食',
    img: './assets/fusion_cuisine.png'
  },
  {
    category: 'mains',
    name: 'Muse Seafood Pasta 繆思明太子海鮮麵',
    price: 450,
    desc: '日本明太子與鮮奶油調製的濃郁醬汁，裹滿彈牙的義大利細麵。鋪上鮮蝦、北海道生食級干貝與透抽。',
    tag: '濃郁推薦',
    img: './assets/fusion_cuisine.png'
  },
  // Tapas (小食)
  {
    category: 'tapas',
    name: 'Truffle Gold French Fries 黃金松露薯條',
    price: 260,
    desc: '現炸金黃酥脆的雙色細薯，拌入頂級義大利白松露油與現磨帕瑪森乾酪，灑上點點食用金箔，無上享受。',
    tag: '必點開胃',
    img: './assets/fusion_cuisine.png'
  },
  {
    category: 'tapas',
    name: 'Game-Day BBQ Chicken Wings 熱血主場BBQ辣雞翅',
    price: 320,
    desc: '酥脆多汁的雞翅裹滿特製煙燻BBQ辣醬。附贈藍紋乳酪醬與西芹棒，觀看賽事時最完美的搭配。',
    tag: '球賽良伴',
    img: './assets/fusion_cuisine.png'
  }
];

function initMenu() {
  const container = document.getElementById('menu-container');
  const filterBtns = document.querySelectorAll('.menu .filter-btn');

  function renderMenu(category = 'signature') {
    container.innerHTML = '';
    const filteredData = menuData.filter(item => item.category === category);

    filteredData.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-item glass-panel';
      
      // Determine if it has flavor profiles (only for drinks)
      let flavorHTML = '';
      if (item.alcohol !== undefined) {
        flavorHTML = `
          <div class="flavor-profile">
            <div class="flavor-bar-wrapper">
              <span class="flavor-label">酒精濃度</span>
              <div class="flavor-track">
                <div class="flavor-fill alcohol" style="width: ${item.alcohol}%"></div>
              </div>
            </div>
            <div class="flavor-bar-wrapper">
              <span class="flavor-label">甜度比例</span>
              <div class="flavor-track">
                <div class="flavor-fill sweet" style="width: ${item.sweet}%"></div>
              </div>
            </div>
            <div class="flavor-bar-wrapper">
              <span class="flavor-label">酸度比例</span>
              <div class="flavor-track">
                <div class="flavor-fill sour" style="width: ${item.sour}%"></div>
              </div>
            </div>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="menu-item-img-wrapper">
          <img class="menu-item-img" src="${item.img}" alt="${item.name}">
          <span class="menu-item-tag">${item.tag}</span>
        </div>
        <div class="menu-item-content">
          <div class="menu-item-header">
            <h3 class="menu-item-title">${item.name}</h3>
            <span class="menu-item-price">$${item.price}</span>
          </div>
          <p class="menu-item-desc">${item.desc}</p>
          ${flavorHTML}
        </div>
      `;
      container.appendChild(card);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMenu(btn.getAttribute('data-category'));
    });
  });

  // Initial render with grand opening specials
  renderMenu('opening');
}

/* --- 4. Interactive Step-by-Step Booking System --- */
function initBookingSystem() {
  const steps = document.querySelectorAll('.booking-step');
  const progressSteps = document.querySelectorAll('.progress-step');
  const progressBarActive = document.querySelector('.progress-bar-active');
  const nextBtns = document.querySelectorAll('[data-action="next"]');
  const prevBtns = document.querySelectorAll('[data-action="prev"]');
  const seatingCards = document.querySelectorAll('.seating-card');
  const confirmBtn = document.getElementById('btn-confirm-booking');
  const bookingForm = document.getElementById('reservation-form');
  
  let currentStepIndex = 0;
  let selectedArea = '';

  // Handle Seating Area Selection
  seatingCards.forEach(card => {
    card.addEventListener('click', () => {
      seatingCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedArea = card.getAttribute('data-area');
    });
  });

  // Next step navigation with validation
  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (validateStep(currentStepIndex)) {
        currentStepIndex++;
        updateStepView();
      }
    });
  });

  // Previous step navigation
  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentStepIndex--;
      updateStepView();
    });
  });

  // Update step visibility and progress bar
  function updateStepView() {
    steps.forEach((step, idx) => {
      step.classList.toggle('active', idx === currentStepIndex);
    });

    // Update progress steps
    progressSteps.forEach((step, idx) => {
      step.classList.toggle('active', idx === currentStepIndex);
      step.classList.toggle('completed', idx < currentStepIndex);
    });

    // Update progress bar width
    const percentage = (currentStepIndex / (progressSteps.length - 1)) * 100;
    progressBarActive.style.width = `${percentage}%`;
  }

  // Basic validation for each step
  function validateStep(stepIndex) {
    if (stepIndex === 0) {
      const guests = document.getElementById('booking-guests').value;
      const date = document.getElementById('booking-date').value;
      const time = document.getElementById('booking-time').value;

      if (!guests || !date || !time) {
        alert('請填寫完整人數、日期及時段！');
        return false;
      }
      
      // Date validation (must not be past date)
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (selectedDate < today) {
        alert('預約日期不可早於今天！');
        return false;
      }

      return true;
    }
    
    if (stepIndex === 1) {
      if (!selectedArea) {
        alert('請選擇您心儀的座位區域！');
        return false;
      }
      return true;
    }

    return true;
  }

  // Handle Booking Confirmation Submit
  if (confirmBtn) {
    confirmBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('booking-name').value;
      const phone = document.getElementById('booking-phone').value;
      const email = document.getElementById('booking-email').value;
      const note = document.getElementById('booking-note').value;

      if (!name || !phone) {
        alert('請填寫訂位人姓名及聯絡電話！');
        return;
      }

      // Generate a mock booking reference ID (e.g. LM-260610-XYZ)
      const dateStr = document.getElementById('booking-date').value.replace(/-/g, '').substring(2);
      const randomId = Math.random().toString(36).substring(2, 5).toUpperCase();
      const bookingRef = `LM-${dateStr}-${randomId}`;

      // Populate booking summary card
      document.getElementById('summary-ref').innerText = bookingRef;
      document.getElementById('summary-name').innerText = name;
      document.getElementById('summary-phone').innerText = phone;
      document.getElementById('summary-guests').innerText = `${document.getElementById('booking-guests').value} 人`;
      document.getElementById('summary-datetime').innerText = `${document.getElementById('booking-date').value} ${document.getElementById('booking-time').value}`;
      
      let areaText = '';
      if (selectedArea === 'bar') areaText = '酒吧吧台 Bar Counter';
      else if (selectedArea === 'sofa') areaText = '奢華沙朗包廂 Premium Sofa';
      else areaText = '經典用餐區 General Dining';
      document.getElementById('summary-area').innerText = areaText;

      // Switch to success card view
      currentStepIndex++;
      updateStepView();
    });
  }
}

/* --- 5. Leaflet Dark Mode Map --- */
function initMap() {
  const mapElement = document.getElementById('map');
  if (!mapElement) return;

  // Coordinate representing Siraya Blvd 160 (惹鍋旁) [23.0991, 120.2798]
  const lat = 23.0991;
  const lng = 120.2798;

  // Initialize leaflet map
  const map = L.map('map', {
    center: [lat, lng],
    zoom: 16,
    zoomControl: true,
    scrollWheelZoom: false
  });

  // Use CartoDB Dark Matter tile layer for an elegant dark map
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  // Custom Gold Marker Icon
  const goldIcon = L.divIcon({
    className: 'custom-gold-marker',
    html: `<div style="
      width: 20px; 
      height: 20px; 
      background-color: #dfb26b; 
      border: 3px solid #0b0d10; 
      border-radius: 50%;
      box-shadow: 0 0 15px #dfb26b;
      position: relative;
    ">
      <div style="
        width: 10px;
        height: 10px;
        background-color: #fff;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "></div>
    </div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });

  // Add marker
  const marker = L.marker([lat, lng], { icon: goldIcon }).addTo(map);
  
  // Add popup
  marker.bindPopup(`
    <div style="font-family: 'Inter', sans-serif; padding: 5px; text-align: center;">
      <strong style="color: #dfb26b; font-size: 1.1rem; display: block; margin-bottom: 5px;">Light & Muse 光與靈感餐酒館</strong>
      <span style="color: #f0f2f5; font-size: 0.85rem;">台南市新市區西拉雅大道160號 (惹鍋旁)</span>
    </div>
  `).openPopup();
}

// Global copy address clipboard helper
window.copyAddress = function() {
  const addressText = "台南市新市區西拉雅大道160號 (惹鍋旁)";
  navigator.clipboard.writeText(addressText).then(() => {
    alert("地址已複製到剪貼簿！");
  }).catch(err => {
    console.error("無法複製地址: ", err);
  });
};

/* --- 6. Interactive Lucky Wheel (開幕限定轉盤) --- */
function initLuckyWheel() {
  const canvas = document.getElementById('wheel-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const spinBtn = document.getElementById('wheel-spin-btn');
  const modal = document.getElementById('prize-modal');
  const prizeNameSpan = document.getElementById('prize-name');
  const couponCodeSpan = document.getElementById('coupon-code');
  const closeModalBtn = document.getElementById('close-prize-modal');

  const prizes = [
    { text: '創意調酒乙杯', color: '#dfb26b', textColor: '#0b0d10' },
    { text: '軟殼蟹明太子扁麵/燉飯', color: '#12161f', textColor: '#dfb26b' },
    { text: '秘製醬滷豬腱', color: '#dfb26b', textColor: '#0b0d10' },
    { text: '嗨Light雙醬脆薯', color: '#12161f', textColor: '#dfb26b' },
    { text: '溫體手沖牛肉湯', color: '#dfb26b', textColor: '#0b0d10' },
    { text: '特調SHOT一盤 (6杯)', color: '#12161f', textColor: '#dfb26b' },
    { text: '明天再擱來', color: '#555555', textColor: '#ffffff' },
    { text: '創意調酒乙杯', color: '#dfb26b', textColor: '#0b0d10' }
  ];

  const size = canvas.width;
  const center = size / 2;
  const radius = center - 10;
  const sliceAngle = (2 * Math.PI) / prizes.length;

  let currentAngle = 0;
  let isSpinning = false;

  // Draw the Wheel
  function drawWheel(angle = 0) {
    ctx.clearRect(0, 0, size, size);
    
    // Save state
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(angle);

    // Draw Slices
    for (let i = 0; i < prizes.length; i++) {
      const startAngle = i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = prizes[i].color;
      ctx.fill();
      
      // Border slice
      ctx.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Add text labels
      ctx.save();
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = prizes[i].textColor;
      
      // Font configuration
      ctx.font = 'bold 13px Inter, Noto Sans TC, sans-serif';
      ctx.fillText(prizes[i].text, radius - 25, 0);
      ctx.restore();
    }

    ctx.restore();

    // Outer Gold Ring decoration
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#dfb26b';
    ctx.lineWidth = 6;
    ctx.stroke();
    
    // Outer Ring Glow effect dots
    for (let i = 0; i < 24; i++) {
      const dotAngle = (i * 2 * Math.PI) / 24;
      const dotX = center + (radius - 3) * Math.cos(dotAngle);
      const dotY = center + (radius - 3) * Math.sin(dotAngle);
      ctx.beginPath();
      ctx.arc(dotX, dotY, 3, 0, 2 * Math.PI);
      ctx.fillStyle = i % 2 === 0 ? '#ffffff' : '#dfb26b';
      ctx.fill();
    }

    // Center Cap
    ctx.beginPath();
    ctx.arc(center, center, 35, 0, 2 * Math.PI);
    ctx.fillStyle = '#0b0d10';
    ctx.strokeStyle = '#dfb26b';
    ctx.lineWidth = 4;
    ctx.fill();
    ctx.stroke();
    
    // Draw small star in center
    ctx.save();
    ctx.translate(center, center);
    ctx.fillStyle = '#dfb26b';
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(Math.cos(((18 + i * 72) * Math.PI) / 180) * 12, -Math.sin(((18 + i * 72) * Math.PI) / 180) * 12);
      ctx.lineTo(Math.cos(((54 + i * 72) * Math.PI) / 180) * 5, -Math.sin(((54 + i * 72) * Math.PI) / 180) * 5);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // Initial draw
  drawWheel(0);

  // Spin Wheel Animation
  function spin(targetIndex) {
    const fullSpins = 6; // spins before stopping
    const targetAngle = -Math.PI/2 - (targetIndex * sliceAngle + sliceAngle / 2) + fullSpins * 2 * Math.PI;
    
    const duration = 4500; // 4.5 seconds
    const start = performance.now();
    const startAngleValue = currentAngle % (2 * Math.PI);

    function animate(time) {
      let elapsed = time - start;
      if (elapsed > duration) elapsed = duration;

      // Ease out cubic
      const t = elapsed / duration;
      const easeT = 1 - Math.pow(1 - t, 3);
      currentAngle = startAngleValue + (targetAngle - startAngleValue) * easeT;

      drawWheel(currentAngle);

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        isSpinning = false;
        // Animation finished, trigger popup
        showPrize(targetIndex);
      }
    }

    requestAnimationFrame(animate);
  }

  // Show Modal Result
  function showPrize(index) {
    const prize = prizes[index];
    
    if (prize.text === '明天再擱來') {
      prizeNameSpan.innerHTML = `<span style="color: #ff4071;">${prize.text}</span>`;
      couponCodeSpan.innerText = '別氣餒，明天來店消費可以再玩一次！';
    } else {
      const code = 'LM-OPEN-' + Math.random().toString(36).substring(2, 6).toUpperCase();
      prizeNameSpan.innerHTML = `<span style="color: #dfb26b; font-size: 1.3rem;">★ ${prize.text} ★</span>`;
      couponCodeSpan.innerHTML = `兌換代碼：<strong style="color:#fff; background:rgba(255,255,255,0.1); padding:4px 8px; border-radius:4px; font-family:monospace;">${code}</strong><br><span style="font-size:0.8rem; color:#aaa; display:block; margin-top:8px;">請憑此畫面截圖於店內消費時兌換（兌換期限至 2026/8/31 止）</span>`;
    }

    modal.classList.add('active');
  }

  // Spin Button Event
  spinBtn.addEventListener('click', () => {
    if (isSpinning) return;
    
    isSpinning = true;
    
    // Choose index
    const targetIndex = Math.floor(Math.random() * prizes.length);
    spin(targetIndex);
  });

  // Modal Close Events
  closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}
