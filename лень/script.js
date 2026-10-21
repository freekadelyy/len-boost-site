document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       1. МОБИЛЬНОЕ МЕНЮ
       ============================================================ */
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    /* ============================================================
       2. ПОЯВЛЕНИЕ ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ
       ============================================================ */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.stat-card, .feature-card, .service-card').forEach(el => {
        revealObserver.observe(el);
    });

    /* ============================================================
       3. АНИМАЦИЯ СЧЁТЧИКОВ
       ============================================================ */
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberEl = entry.target.querySelector('.stat-number');
                const target = parseInt(entry.target.dataset.count, 10);
                animateCounter(numberEl, target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-card').forEach(card => statObserver.observe(card));

    function animateCounter(el, target) {
        const duration = 1400;
        const start = performance.now();
        const suffix = target === 99 ? '%' : '+';

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target + suffix;
        }
        requestAnimationFrame(tick);
    }

    /* ============================================================
       4. FAQ АККОРДЕОН
       ============================================================ */
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            document.querySelectorAll('.faq-item').forEach(other => {
                if (other !== item) other.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    /* ============================================================
       5. ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ
       ============================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;

            e.preventDefault();
            const offset = 80;
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.pageYOffset - offset,
                behavior: 'smooth'
            });
        });
    });

    /* ============================================================
       6. СОСТОЯНИЕ НАВИГАЦИИ ПРИ СКРОЛЛЕ
       ============================================================ */
    const navbar = document.getElementById('navbar');
    const onScroll = () => {
        if (window.scrollY > 80) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ============================================================
       7. ВЫБОР РОЛИ ГЕРОЯ (услуга «Буст персонажа»)
       ============================================================ */
    const characterButtons = document.querySelectorAll('.character-icon');
    const dynamicPrice = document.querySelector('.dynamic-price');
    const priceMap = {
        gusion:    'от 15 000 ₽',
        lancelot:  'от 12 000 ₽',
        karina:    'от 10 000 ₽',
        hayabusa:  'от 14 000 ₽'
    };

    characterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            characterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const hero = btn.dataset.hero;
            if (priceMap[hero] && dynamicPrice) {
                dynamicPrice.textContent = priceMap[hero];
            }
        });
    });

});