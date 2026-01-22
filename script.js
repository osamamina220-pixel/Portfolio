document.addEventListener('DOMContentLoaded', () => {

    /* -----------------------------------------------------------
       Mobile Navigation
    ----------------------------------------------------------- */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Toggle icon between bars and times
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    /* -----------------------------------------------------------
       Header Scroll Effect
    ----------------------------------------------------------- */
    /* -----------------------------------------------------------
       Header Scroll Effect
    ----------------------------------------------------------- */
    const header = document.getElementById('header');

    function updateHeader() {
        const isLight = document.body.classList.contains('light-mode');
        const darkBg = window.scrollY > 50 ? 'rgba(10, 25, 47, 0.98)' : 'rgba(10, 25, 47, 0.95)';
        const lightBg = window.scrollY > 50 ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)';

        header.style.backgroundColor = isLight ? lightBg : darkBg;
        header.style.padding = window.scrollY > 50 ? '10px 0' : '20px 0';

        if (isLight) {
            header.style.boxShadow = window.scrollY > 50 ? '0 5px 20px rgba(0,0,0,0.1)' : 'none';
        } else {
            header.style.boxShadow = window.scrollY > 50 ? '0 10px 30px -10px rgba(0, 0, 0, 0.3)' : 'none';
        }
    }

    window.addEventListener('scroll', updateHeader);

    /* -----------------------------------------------------------
       Theme Toggle
    ----------------------------------------------------------- */
    const themeToggle = document.getElementById('themeToggle');

    // Check local storage
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        updateHeader(); // Ensure header is correct on load
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const icon = themeToggle.querySelector('i');

        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('fa-sun', 'fa-moon');
        }
        updateHeader(); // Update header immediately
    });

    /* -----------------------------------------------------------
       Scroll Animations (Fade In)
    ----------------------------------------------------------- */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.section-title, .hero-content, .soft-skill-card, .project-card, .timeline-item, .contact-card');

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        fadeInObserver.observe(el);
    });

    /* -----------------------------------------------------------
       Skill Bar Animation
    ----------------------------------------------------------- */
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-fill');

    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            // Fill bars to their data-width
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });

            observer.unobserve(entry.target);
        });
    }, { threshold: 0.5 });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    /* -----------------------------------------------------------
       Language Toggle
    ----------------------------------------------------------- */
    const langToggle = document.querySelector('.lang-toggle');
    let currentLang = 'en';

    const translations = {
        en: {
            'nav-home': 'Home',
            'nav-about': 'About',
            'nav-exp': 'Experience',
            'nav-proj': 'Projects',
            'nav-skills': 'Skills',
            'nav-contact': 'Contact',
            'hero-greeting': "Hello, I'm",
            'hero-name': 'Mina Osama Saad',
            'hero-title': 'Senior Accountant | ERP Specialist | Financial Analyst',
            'hero-usp': 'A bilingual Financial Expert with 5+ years of experience bridging the gap between complex accounting principles and modern ERP systems like SAP and Odoo.',
            'hero-btn-contact': 'Get In Touch',
            'hero-btn-proj': 'View Projects',
            'about-title': 'Personal Qualifications',
            'about-subtitle': 'Soft Skills & Attributes',
            'exp-title': 'Professional Experience',
            'exp-subtitle': 'My Career Journey',
            'proj-title': 'Key Achievement',
            'proj-subtitle': 'ERP Lifecycle & Financial Control',
            'skills-title': 'Technical Proficiency',
            'skills-subtitle': 'Skills Matrix',
            'contact-title': 'Get In Touch',
            'contact-subtitle': 'Cairo, Egypt'
        },
        ar: {
            'nav-home': 'الرئيسية',
            'nav-about': 'عني',
            'nav-exp': 'الخبرات',
            'nav-proj': 'المشاريع',
            'nav-skills': 'المهارات',
            'nav-contact': 'تواصل معي',
            'hero-greeting': 'أهلاً، أنا',
            'hero-name': 'مينا أسامة سعد',
            'hero-title': 'محاسب أول | متخصص ERP | محلل مالي',
            'hero-usp': 'خبير مالي ثنائي اللغة يتمتع بخبرة تزيد عن 5 سنوات في الربط بين المبادئ المحاسبية المعقدة وأنظمة ERP الحديثة مثل SAP و Odoo.',
            'hero-btn-contact': 'تواصل معي',
            'hero-btn-proj': 'عرض المشاريع',
            'about-title': 'المؤهلات الشخصية',
            'about-subtitle': 'المهارات والسمات الشخصية',
            'exp-title': 'الخبرة المهنية',
            'exp-subtitle': 'مسيرتي المهنية',
            'proj-title': 'أبرز الإنجازات',
            'proj-subtitle': 'دورة حياة ERP والرقابة المالية',
            'skills-title': 'الكفاءة التقنية',
            'skills-subtitle': 'مصفوفة المهارات',
            'contact-title': 'تواصل معي',
            'contact-subtitle': 'القاهرة، مصر'
        }
    };

    langToggle.addEventListener('click', () => {
        // Toggle Language State
        currentLang = currentLang === 'en' ? 'ar' : 'en';

        // Update Toggle Button UI
        const spans = langToggle.querySelectorAll('span');
        if (currentLang === 'en') {
            spans[0].classList.add('active-lang');
            spans[2].classList.remove('active-lang');
            document.body.style.direction = 'ltr';
            document.body.style.textAlign = 'left';
            document.documentElement.lang = 'en';
        } else {
            spans[0].classList.remove('active-lang');
            spans[2].classList.add('active-lang');
            document.body.style.direction = 'rtl';
            document.body.style.textAlign = 'right';
            document.documentElement.lang = 'ar';
        }

        // Apply Translations
        const elements = document.querySelectorAll('[data-lang]');
        elements.forEach(el => {
            const key = el.getAttribute('data-lang');
            if (translations[currentLang][key]) {
                el.textContent = translations[currentLang][key];
            }
        });
    });

});
