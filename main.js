document.addEventListener('DOMContentLoaded', () => {
    // 테마 전환 로직
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle ? themeToggle.querySelector('i') : null;

    if (themeToggle) {
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
    }

    function updateIcon(theme) {
        if (!icon) return;
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // 노트북 데이터
    const laptops = [
        { id: 1, brand: 'Apple', model: 'MacBook Air M3', spec: '8GB / 256GB / 13.6"', price: '1,590,000원', category: 'Apple' },
        { id: 2, brand: 'Samsung', model: '갤럭시북4 프로', spec: '16GB / 512GB / 14"', price: '1,880,000원', category: 'Samsung' },
        { id: 3, brand: 'LG', model: '그램 16 (2024)', spec: '16GB / 512GB / 16"', price: '1,720,000원', category: 'LG' },
        { id: 4, brand: 'Apple', model: 'MacBook Pro 14 M3', spec: '16GB / 512GB / 14.2"', price: '2,390,000원', category: 'Apple' },
        { id: 5, brand: 'Samsung', model: '갤럭시북4 울트라', spec: '32GB / 1TB / 16"', price: '3,200,000원', category: 'Samsung' },
        { id: 6, brand: 'LG', model: '그램 Pro 17', spec: '16GB / 512GB / 17"', price: '2,150,000원', category: 'LG' }
    ];

    const laptopGrid = document.getElementById('laptop-grid');

    function renderLaptops(data) {
        if (!laptopGrid) return;
        laptopGrid.innerHTML = data.map(laptop => `
            <div class="laptop-card">
                <div class="card-brand">${laptop.brand}</div>
                <h3>${laptop.model}</h3>
                <p class="card-spec"><i class="fas fa-microchip"></i> ${laptop.spec}</p>
                <p class="card-price"><strong>${laptop.price}</strong></p>
                <button class="compare-btn" onclick="alert('비교 기능은 준비 중입니다.')">상세 보기</button>
            </div>
        `).join('');
    }

    renderLaptops(laptops);

    // 검색 기능
    const searchInput = document.getElementById('laptop-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = laptops.filter(l => 
                l.model.toLowerCase().includes(term) || l.brand.toLowerCase().includes(term)
            );
            renderLaptops(filtered);
        });
    }

    // 필터 기능
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

    // 개인정보처리방침 모달 로직
    const privacyLink = document.getElementById('privacy-link');
    const privacyModal = document.getElementById('privacy-modal');
    const closePrivacy = document.querySelector('.close-privacy');

    if (privacyLink && privacyModal) {
        privacyLink.onclick = (e) => {
            e.preventDefault();
            privacyModal.style.display = 'block';
        }
    }

    if (closePrivacy) {
        closePrivacy.onclick = () => {
            privacyModal.style.display = 'none';
        }
    }

    // 부드러운 스크롤 이동
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 모달 외 영역 클릭 시 닫기
    window.onclick = (event) => {
        if (event.target == privacyModal) {
            privacyModal.style.display = 'none';
        }
    }

    // 폼 초기화
    window.addEventListener('pageshow', () => {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) contactForm.reset();
    });
});
