// catalog.js - Каталог товаров PanjSmoke с фото

// Данные товаров с фото
const catalogProducts = [
    {
        id: 1,
        name: "PAFOS 20000 тяг",
        description: "Одноразовое устройство с невероятной вкусопередачей",
        price: 1900,
        category: "disposable",
        badge: "Хит",
        specs: ["Количество тяг: 20000", "Аккумулятор: встроенный 850mAh", "Емкость: 12ml", "Никотин: 20mg/ml"],
        photo: "pafos.jpg", // ← имя файла фото
        imageColor: "#374151" // запасной цвет
    },
    {
        id: 2,
        name: "HQD Cuvie Plus 1200",
        description: "Компактный одноразовый вейп с насыщенным вкусом",
        price: 1200,
        category: "disposable",
        specs: ["Количество тяг: 1200", "Аккумулятор: 400mAh", "Емкость: 3.2ml", "Никотин: 20mg/ml"],
        photo: "hqd.jpg",
        imageColor: "#4b5563"
    },
    {
        id: 3,
        name: "Elf Bar 1500",
        description: "Популярный одноразовый вейп с долгим сроком службы",
        price: 1400,
        category: "disposable",
        badge: "Новинка",
        specs: ["Количество тяг: 1500", "Аккумулятор: 550mAh", "Емкость: 4.8ml", "Никотин: 20mg/ml"],
        photo: "elfbar.jpg",
        imageColor: "#6b7280"
    },
    {
        id: 4,
        name: "Xros mini",
        description: "Маленькое устройство - много наслаждения!",
        price: 1000,
        category: "pod",
        specs: ["Аккумулятор: 1000mAh", "Емкость картриджа: 2ml", "Сопротивление: 0.8Ω/1.2Ω", "Зарядка: Type-C"],
        photo: "xros.jpg",
        imageColor: "#374151"
    },
    {
        id: 5,
        name: "DUALL 50MG",
        description: "Жидкость с насыщенным вкусом манго",
        price: 800,
        category: "liquid",
        badge: "Хит продаж",
        specs: ["Объем: 60ml", "Крепость: 50mg", "Соотношение: 70/30", "Вкус: манго"],
        photo: "duall_salt.png",
        imageColor: "#dc2626"
    },
    {
        id: 6,
        name: "Nasty Juice Cush Man",
        description: "Жидкость с насыщенным вкусом манго",
        price: 800,
        category: "liquid",
        specs: ["Объем: 60ml", "Крепость: 3mg", "Соотношение: 70/30", "Вкус: манго"],
        photo: "nasty.jpg",
        imageColor: "#1e40af"
    },
    {
        id: 7,
        name: "Dinner Lady Lemon Tart",
        description: "Классический вкус лимонного тарта",
        price: 850,
        category: "liquid",
        badge: "Классика",
        specs: ["Объем: 50ml", "Крепость: 0-12mg", "Соотношение: 50/50", "Вкус: лимонный тарт"],
        photo: "dinner.jpg",
        imageColor: "#f59e0b"
    },
    {
        id: 8,
        name: "DRUG 3",
        description: "Сочетание мощности и вкусопередачи",
        price: 2499,
        category: "mod",
        badge: "Хит",
        specs: ["Мощность: 5-80W", "Аккумулятор: 18650", "Экран: цветной OLED", "Защита: от перегрева и КЗ"],
        photo: "drug.jpg",
        imageColor: "#7c3aed"
    },
    {
        id: 9,
        name: "Зарядное устройство Nitecore",
        description: "Универсальное зарядное устройство для аккумуляторов",
        price: 1500,
        category: "accessory",
        specs: ["Тип: универсальное", "Слоты: 4", "Ток зарядки: 0.5-2A", "Защита: от перезаряда"],
        photo: "charger.jpg",
        imageColor: "#059669"
    }
];

// Функция для получения пути к фото
function getProductPhotoUrl(photoName) {
    if (!photoName) return null;
    // Папка images/products/ должна быть в корне проекта
    return `images/products/${photoName}`;
}

// Функция для получения Unsplash фото если нет своих
function getFallbackPhotoUrl(product, size = '400x500') {
    const categoriesMap = {
        disposable: 'vape disposable electronic-cigarette',
        pod: 'vape pod-system electronic',
        liquid: 'vape-liquid e-juice bottle',
        mod: 'vape-mod box-mod device',
        accessory: 'charger electronic accessory'
    };
    const query = categoriesMap[product.category] || 'electronic';
    return `https://source.unsplash.com/${size}/?${query}&sig=${product.id}`;
}

// Глобальные переменные
let currentFilter = 'all';
let currentSort = 'default';
let currentSearch = '';

// DOM элементы
const productsContainer = document.getElementById('productsContainer');
const productsCount = document.getElementById('productsCount');
const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
const sortButtons = document.querySelectorAll('.filter-btn[data-sort]');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

// Функция отображения товаров
function displayProducts(products) {
    productsContainer.innerHTML = '';
    
    // Обновляем счетчик
    productsCount.textContent = products.length;
    
    // Если товаров нет
    if (products.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-products" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <h3 style="color: #f3f4f6; margin-bottom: 10px;">Товары не найдены</h3>
                <p style="color: #9ca3af;">Попробуйте изменить параметры поиска или фильтрации</p>
            </div>
        `;
        return;
    }
    
    // Создаем карточки товаров
    products.forEach((product, index) => {
        const productCard = document.createElement('article');
        productCard.className = 'catalog-product-card';
        productCard.setAttribute('data-category', product.category);
        
        // Анимация с задержкой
        productCard.style.animationDelay = `${index * 0.05}s`;
        
        // Получаем фото или используем fallback
        const photoUrl = getProductPhotoUrl(product.photo);
        const fallbackUrl = getFallbackPhotoUrl(product, '300x400');
        
        productCard.innerHTML = `
            <div class="catalog-product-image">
                <div class="image-container">
                    ${photoUrl ? `
                        <img src="${photoUrl}" 
                             alt="${product.name}"
                             class="product-real-image"
                             loading="lazy"
                             onerror="this.onerror=null; this.src='${fallbackUrl}'; this.classList.add('fallback-image');">
                    ` : `
                        <img src="${fallbackUrl}" 
                             alt="${product.name}"
                             class="product-real-image fallback-image"
                             loading="lazy">
                    `}
                    <div class="image-overlay"></div>
                </div>
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="catalog-product-content">
                <h3 class="catalog-product-title">${product.name}</h3>
                <p class="catalog-product-desc">${product.description}</p>
                <div class="catalog-product-footer">
                    <div class="catalog-product-price">${product.price.toLocaleString('ru-RU')} ₽</div>
                    <div class="catalog-product-actions">
                        <button class="button catalog-detail-btn" data-id="${product.id}">Подробнее</button>
                    </div>
                </div>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
    
    // Добавляем обработчики событий
    addProductEventListeners();
}

// Функция фильтрации товаров
function filterProducts() {
    let filteredProducts = [...catalogProducts];
    
    // Фильтр по категории
    if (currentFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === currentFilter);
    }
    
    // Поиск
    if (currentSearch) {
        const searchTerm = currentSearch.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Сортировка
    switch (currentSort) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            break;
    }
    
    return filteredProducts;
}

// Функция добавления обработчиков событий
function addProductEventListeners() {
    // Кнопки "Подробнее"
    document.querySelectorAll('.catalog-detail-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = parseInt(this.getAttribute('data-id'));
            const product = catalogProducts.find(p => p.id === productId);
            
            if (product) {
                showProductDetailsModal(product);
            }
        });
    });
}

// Функция показа модального окна с товаром
function showProductDetailsModal(product) {
    // Получаем фото для модального окна
    const photoUrl = getProductPhotoUrl(product.photo);
    const fallbackUrl = getFallbackPhotoUrl(product, '500x600');
    
    // Создаем стили для модального окна
    const modalStyles = `
        @keyframes modalFadeIn {
            from { opacity: 0; transform: translateY(30px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes overlayFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes imageFadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
        
        .modal-overlay-custom {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.92);
            backdrop-filter: blur(10px);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            animation: overlayFadeIn 0.3s ease;
        }
        
        .modal-container-custom {
            background: linear-gradient(145deg, #111827 0%, #1f2937 100%);
            border: 1px solid rgba(185, 28, 28, 0.4);
            border-radius: 12px;
            max-width: 550px;
            width: 100%;
            overflow: hidden;
            box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.7);
            animation: modalFadeIn 0.4s ease;
            position: relative;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
        }
        
        .modal-close-custom {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(185, 28, 28, 0.25);
            border: 1px solid rgba(185, 28, 28, 0.6);
            color: #f3f4f6;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 22px;
            transition: all 0.3s ease;
            z-index: 100;
            font-weight: bold;
        }
        
        .modal-close-custom:hover {
            background: rgba(185, 28, 28, 0.5);
            transform: rotate(90deg) scale(1.1);
        }
        
        .modal-image-section {
            padding: 40px 40px 20px;
            background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
            border-bottom: 1px solid rgba(55, 65, 81, 0.5);
            text-align: center;
            position: relative;
            flex-shrink: 0;
        }
        
        .modal-image-wrapper {
            width: 180px;
            height: 180px;
            margin: 0 auto 25px;
            border-radius: 16px;
            overflow: hidden;
            position: relative;
            border: 3px solid rgba(185, 28, 28, 0.4);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            animation: imageFadeIn 0.6s ease 0.2s both;
        }
        
        .modal-product-photo {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            display: block;
            transition: transform 0.5s ease;
        }
        
        .modal-image-wrapper:hover .modal-product-photo {
            transform: scale(1.05);
        }
        
        .modal-title-custom {
            color: #f3f4f6;
            font-size: 30px;
            font-weight: 700;
            text-align: center;
            margin-bottom: 10px;
            letter-spacing: 0.5px;
            line-height: 1.2;
        }
        
        .modal-price-custom {
            color: #b91c1c;
            font-size: 36px;
            font-weight: 800;
            text-align: center;
            margin-bottom: 5px;
            text-shadow: 0 3px 6px rgba(185, 28, 28, 0.3);
            letter-spacing: 1px;
        }
        
        .modal-subtitle-custom {
            color: #d1d5db;
            text-align: center;
            font-size: 17px;
            margin-bottom: 10px;
            line-height: 1.5;
            padding: 0 20px;
            font-style: italic;
        }
        
        .modal-content-custom {
            padding: 30px;
            overflow-y: auto;
            flex-grow: 1;
        }
        
        .modal-specs-custom {
            background: rgba(31, 41, 55, 0.8);
            border-radius: 10px;
            padding: 28px;
            margin-bottom: 30px;
            border: 1px solid rgba(55, 65, 81, 0.5);
            backdrop-filter: blur(5px);
        }
        
        .modal-specs-title {
            color: #f3f4f6;
            font-size: 19px;
            font-weight: 700;
            margin-bottom: 22px;
            text-transform: uppercase;
            letter-spacing: 2.5px;
            display: flex;
            align-items: center;
            gap: 12px;
            padding-bottom: 10px;
            border-bottom: 2px solid rgba(185, 28, 28, 0.5);
        }
        
        .modal-specs-title::before {
            content: '⚡';
            color: #b91c1c;
            font-size: 22px;
        }
        
        .modal-specs-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .modal-specs-list li {
            color: #cbd5e1;
            padding: 14px 0;
            border-bottom: 1px solid rgba(55, 65, 81, 0.4);
            display: flex;
            align-items: center;
            gap: 14px;
            font-size: 16px;
            transition: all 0.2s ease;
        }
        
        .modal-specs-list li:hover {
            color: #f3f4f6;
            padding-left: 5px;
        }
        
        .modal-specs-list li:last-child {
            border-bottom: none;
        }
        
        .modal-specs-list li::before {
            content: '•';
            color: #b91c1c;
            font-size: 24px;
            font-weight: bold;
        }
        
        .modal-actions-custom {
            display: flex;
            gap: 18px;
            margin-top: 20px;
        }
        
        .modal-buy-btn {
            flex: 3;
            padding: 20px;
            background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 19px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 2px;
            box-shadow: 0 6px 20px rgba(185, 28, 28, 0.5);
            position: relative;
            overflow: hidden;
        }
        
        .modal-buy-btn:hover {
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(185, 28, 28, 0.7);
        }
        
        .modal-buy-btn:active {
            transform: translateY(0);
        }
        
        .modal-buy-btn::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
            transform: rotate(45deg);
            animation: shine 3s infinite;
        }
        
        @keyframes shine {
            0% { transform: translateX(-100%) rotate(45deg); }
            100% { transform: translateX(100%) rotate(45deg); }
        }
        
        .modal-close-secondary {
            flex: 1;
            padding: 20px;
            background: rgba(55, 65, 81, 0.8);
            color: #d1d5db;
            border: 2px solid #4b5563;
            border-radius: 10px;
            font-size: 17px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(5px);
        }
        
        .modal-close-secondary:hover {
            background: rgba(75, 85, 99, 0.9);
            color: #f3f4f6;
            border-color: #6b7280;
        }
    `;
    
    // Добавляем стили
    const style = document.createElement('style');
    style.textContent = modalStyles;
    document.head.appendChild(style);
    
    // Создаем HTML модального окна
    const modalHTML = `
        <div class="modal-overlay-custom">
            <div class="modal-container-custom">
                <button class="modal-close-custom">&times;</button>
                
                <div class="modal-image-section">
                    <div class="modal-image-wrapper">
                        <img src="${photoUrl || fallbackUrl}" 
                             alt="${product.name}"
                             class="modal-product-photo"
                             onerror="this.onerror=null; this.src='${fallbackUrl}';">
                    </div>
                    <h2 class="modal-title-custom">${product.name}</h2>
                    <div class="modal-price-custom">${product.price.toLocaleString('ru-RU')} ₽</div>
                    <p class="modal-subtitle-custom">${product.description}</p>
                </div>
                
                <div class="modal-content-custom">
                    <div class="modal-specs-custom">
                        <h3 class="modal-specs-title">Характеристики</h3>
                        <ul class="modal-specs-list">
                            ${product.specs.map(spec => `<li>${spec}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="modal-actions-custom">
                        <button class="modal-buy-btn">Купить сейчас</button>
                        <button class="modal-close-secondary">Закрыть</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Добавляем модальное окно в DOM
    const modalElement = document.createElement('div');
    modalElement.innerHTML = modalHTML;
    document.body.appendChild(modalElement);
    
    // Блокируем скролл страницы
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px'; // Для компенсации ширины скроллбара
    
    // Функция закрытия модального окна
    const closeModal = () => {
        modalElement.remove();
        style.remove();
        document.body.style.overflow = 'auto';
        document.body.style.paddingRight = '0';
    };
    
    // Обработчики событий
    const modalOverlay = modalElement.querySelector('.modal-overlay-custom');
    const closeButtons = modalElement.querySelectorAll('.modal-close-custom, .modal-close-secondary');
    
    // Закрытие по клику на кнопки
    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    // Закрытие по клику на оверлей
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Закрытие по клавише Esc
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    };
    document.addEventListener('keydown', handleEscape);
    
    // Обработчик кнопки "Купить сейчас"
    const buyButton = modalElement.querySelector('.modal-buy-btn');
    buyButton.addEventListener('click', () => {
        alert(`🎉 Заказ на "${product.name}" оформлен!\n💰 Сумма: ${product.price} ₽\n📞 С вами свяжутся для подтверждения в течение 15 минут.`);
        closeModal();
    });
    
    // Удаляем обработчик Esc при закрытии
    modalElement._handleEscape = handleEscape;
}

// Инициализация каталога
document.addEventListener('DOMContentLoaded', function() {
    // Отображаем все товары
    displayProducts(filterProducts());
    
    // Обработчики фильтров
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            displayProducts(filterProducts());
        });
    });
    
    // Обработчики сортировки
    sortButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            sortButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentSort = this.getAttribute('data-sort');
            displayProducts(filterProducts());
        });
    });
    
    // Обработчик поиска
    searchButton.addEventListener('click', function() {
        currentSearch = searchInput.value.trim();
        displayProducts(filterProducts());
    });
    
    // Поиск при нажатии Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            currentSearch = searchInput.value.trim();
            displayProducts(filterProducts());
        }
    });
    
    // Активация анимаций
    setTimeout(() => {
        const fadeElements = document.querySelectorAll('.fade-in, .fade-in-delay');
        fadeElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 100);
});

// Убираем пагинацию
document.querySelector('.pagination')?.remove();