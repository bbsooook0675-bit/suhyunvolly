// 테마 전환 로직
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// 저장된 테마 불러오기
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    if (theme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
}

// 노트북 데이터 예시 및 렌더링 (기존 기능 유지용)
const laptops = [
    { id: 1, brand: 'Apple', model: 'MacBook Air M2', spec: '8GB / 256GB', price: '1,390,000원' },
    { id: 2, brand: 'Samsung', model: 'Galaxy Book3 Pro', spec: '16GB / 512GB', price: '1,550,000원' },
    { id: 3, brand: 'LG', model: 'Gram 16', spec: '16GB / 256GB', price: '1,420,000원' }
];

const laptopGrid = document.getElementById('laptop-grid');

function renderLaptops(data) {
    laptopGrid.innerHTML = data.map(laptop => `
        <div class="laptop-card">
            <h3>${laptop.brand} ${laptop.model}</h3>
            <p>${laptop.spec}</p>
            <p><strong>${laptop.price}</strong></p>
            <button class="compare-btn" data-id="${laptop.id}">비교 담기</button>
        </div>
    `).join('');
}

// 초기 렌더링
renderLaptops(laptops);

// 검색 및 필터 기능 (간략 구현)
const searchInput = document.getElementById('laptop-search');
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = laptops.filter(l => 
        l.model.toLowerCase().includes(term) || l.brand.toLowerCase().includes(term)
    );
    renderLaptops(filtered);
});

const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const brand = btn.dataset.brand;
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        if (brand === 'all') {
            renderLaptops(laptops);
        } else {
            const filtered = laptops.filter(l => l.brand === brand);
            renderLaptops(filtered);
        }
    });
});

// 제휴 문의 폼 초기화 (뒤로가기 등으로 페이지가 다시 표시될 때 입력 내용 삭제)
window.addEventListener('pageshow', (event) => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.reset();
    }
});
