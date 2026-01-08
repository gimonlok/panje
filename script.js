// Активация/деактивация мобильного меню
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');

if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Закрытие меню при клике на ссылку
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        navToggle.classList.remove('active');
        
        // Обновление активной ссылки
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

// Плавный скролл для всех ссылок с хэшами
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Подсветка активного раздела при скролле
const sections = document.querySelectorAll('section[id]');
const navHeight = 80;

function highlightNavOnScroll() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// Данные товаров для модального окна
const productsData = {
    1: {
        title: "PAFOS 20000 тяг",
        price: "1 900 ₽",
        description: "Одноразовое устройство PAFOS с уникальной технологией нагрева обеспечивает невероятную вкусопередачу. Компактный дизайн и мощный аккумулятор позволяют наслаждаться паром долгое время без подзарядки.",
        imageClass: "prod-1",
        specs: [
            "Количество тяг: 20000",
            "Аккумулятор: встроенный 850mAh",
            "Емкость: 12ml",
            "Вкус: различные варианты",
            "Никотин: 20mg/ml",
            "Тип: одноразовый вейп"
        ]
    },
    2: {
        title: "Xros mini",
        price: "1000 ₽",
        description: "Ультракомпактная pod-система Xros mini идеальна для повседневного использования. Простая в обслуживании, с удобной зарядкой и отличной автономностью.",
        imageClass: "prod-2",
        specs: [
            "Аккумулятор: 1000mAh",
            "Емкость картриджа: 2ml",
            "Сопротивление: 0.8Ω/1.2Ω",
            "Зарядка: Type-C",
            "Вес: 37г",
            "Заправка: side-fill"
        ]
    },
    3: {
        title: "DRUG 3",
        price: "2 499 ₽",
        description: "Мощный и стильный устройство DRUG 3 сочетает в себе передовые технологии и эргономичный дизайн. Идеальный выбор для ценителей плотного пара и чистого вкуса.",
        imageClass: "prod-3",
        specs: [
            "Мощность: 5-80W",
            "Аккумулятор: 18650 (в комплекте)",
            "Тип: боксмод",
            "Экран: цветной OLED",
            "Защита: от перегрева и КЗ",
            "Материал: цинковый сплав"
        ]
    }
};

// Элементы модального окна
const modal = document.getElementById('productModal');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalDescription = document.getElementById('modalDescription');
const modalImage = document.getElementById('modalImage');
const modalSpecs = document.getElementById('modalSpecs');
const modalCloseBtns = document.querySelectorAll('.modal-close, .modal-close-btn');
const modalBuyBtn = document.querySelector('.modal-buy');
const modalOverlay = document.querySelector('.modal-overlay');

// Открытие модального окна
function openModal(productId) {
    const product = productsData[productId];
    if (!product) return;
    
    // Заполняем данные
    modalTitle.textContent = product.title;
    modalPrice.textContent = product.price;
    modalDescription.textContent = product.description;
    modalImage.className = 'image-placeholder ' + product.imageClass;
    
    // Заполняем характеристики
    modalSpecs.innerHTML = '';
    product.specs.forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        modalSpecs.appendChild(li);
    });
    
    // Показываем модальное окно
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Закрытие модального окна
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    highlightNavOnScroll();
    
    // Обработчики для кнопок "Подробнее"
    const productButtons = document.querySelectorAll('.product-button');
    productButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productCard = this.closest('.product-card');
            const productId = productCard.getAttribute('data-product-id');
            openModal(productId);
        });
    });
    
    // Обработчики закрытия модального окна
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    modalOverlay.addEventListener('click', closeModal);
    
    // Кнопка "Добавить в корзину" в модальном окне
    modalBuyBtn.addEventListener('click', function() {
        const title = modalTitle.textContent;
        alert(`Товар "${title}" добавлен в корзину!`);
        closeModal();
    });
    
    // Закрытие модального окна по клавише ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Предотвращаем закрытие при клике на само окно
    modal.querySelector('.modal-container').addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами с анимациями
    document.querySelectorAll('.fade-in, .fade-in-delay').forEach(el => {
        observer.observe(el);
    });
});

// Фикс для мобильного меню при ресайзе
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navList.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Экспортируем функцию openModal для использования в catalog.js
window.openModal = openModal;