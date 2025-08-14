// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
    
    // Update header immediately using centralized function
    updateHeaderBackground();
}

// Load saved theme and initialize header
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const themeIcon = document.getElementById('theme-icon');
    
    document.body.setAttribute('data-theme', savedTheme);
    if (themeIcon) {
        themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // Initialize header theme immediately using centralized function
    updateHeaderBackground();
    
    // Initialize internationalization
    initI18n();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize language dropdown
    initLangDropdown();
    
    // Initialize publications filter
    initPublicationsFilter();
    
    // Initialize footer service navigation
    initFooterServiceNavigation();
    
    // Initialize logo animation
    initLogoAnimation();
    
    // Initialize carousel
    initCarousel();
    
    // Initialize timeline
    initTimeline();
    
    // Initialize optimized 3D background
    init3DBackground();
    
    // Initialize video slider with delay to ensure DOM is ready
    setTimeout(() => {
        initVideoSlider();
    }, 100);
});

// Additional initialization on window load to ensure everything is ready
window.addEventListener('load', function() {
    // Double-check theme initialization after full page load
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    updateHeaderBackground();
    
    // Re-initialize navigation to ensure all links are responsive
    initNavigation();
    
    // Only initialize language dropdown if not already initialized
    if (!langDropdownInitialized) {
        initLangDropdown();
    }
});

// Enhanced navigation functionality
function initNavigation() {
    // Ensure all navigation links are properly clickable
    const navLinks = document.querySelectorAll('.nav-menu a, a[href^="#"]');
    navLinks.forEach(link => {
        // Remove any existing event listeners to avoid duplicates
        link.removeEventListener('click', handleNavClick);
        link.addEventListener('click', handleNavClick);
    });
}

function handleNavClick(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    
    if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
            // Close language menu if open
            closeLangMenu();
            
            // Close mobile menu if open
            closeMobileMenu();
            
            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Function to close mobile menu
function closeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    const videoNavButtons = document.querySelectorAll('.slider-nav');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
        // Show video navigation buttons
        videoNavButtons.forEach(btn => btn.style.display = 'flex');
    }
}

function closeLangMenu() {
    const langMenu = document.getElementById('langMenu');
    const langTrigger = document.getElementById('langTrigger');
    if (langMenu && langTrigger) {
        langTrigger.setAttribute('aria-expanded', 'false');
        langMenu.style.display = 'none';
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    const videoNavButtons = document.querySelectorAll('.slider-nav');
    
    if (!mobileMenuToggle || !navMenu) {
        console.warn('Mobile menu elements not found');
        return;
    }
    
    // Ensure menu is closed by default
    mobileMenuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = mobileMenuToggle.classList.contains('active');
        
        if (isActive) {
            // Close menu
            closeMobileMenu();
        } else {
            // Open menu
            mobileMenuToggle.classList.add('active');
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Hide video navigation buttons to prevent interference
            videoNavButtons.forEach(btn => btn.style.display = 'none');
        }
    });
    
    // Close menu when clicking on a nav link (backup - the main handler is in handleNavClick)
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Small delay to ensure the main navigation handler runs first
            setTimeout(() => {
                closeMobileMenu();
            }, 10);
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on window resize if desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
    
    console.log('Mobile menu initialized successfully');
}

// Optimized 3D Background Loading
function init3DBackground() {
    const heroBackground = document.querySelector('.hero-background');
    const iframe = heroBackground?.querySelector('iframe');
    
    if (!heroBackground || !iframe) {
        console.warn('3D background elements not found');
        return;
    }
    
    // Check if device can handle 3D animations
    const canHandle3D = checkDeviceCapability();
    
    if (!canHandle3D) {
        console.log('Device not suitable for 3D animations, using fallback');
        heroBackground.style.display = 'none';
        return;
    }
    
    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadOptimized3D(iframe, heroBackground);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    observer.observe(heroBackground);
}

function checkDeviceCapability() {
    // Check various performance indicators
    const isMobile = window.innerWidth <= 768;
    const isLowEnd = navigator.hardwareConcurrency <= 2;
    const hasSlowConnection = navigator.connection && 
        (navigator.connection.effectiveType === 'slow-2g' || 
         navigator.connection.effectiveType === '2g');
    
    // Disable 3D on mobile, low-end devices, or slow connections
    return !isMobile && !isLowEnd && !hasSlowConnection;
}

function loadOptimized3D(iframe, container) {
    // Add loading placeholder
    container.style.background = 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)';
    
    // Use requestIdleCallback for non-blocking loading
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            load3DIframe(iframe, container);
        });
    } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => {
            load3DIframe(iframe, container);
        }, 100);
    }
}

function load3DIframe(iframe, container) {
    // Add loading event listener
    iframe.addEventListener('load', () => {
        container.classList.add('loaded');
        console.log('3D background loaded successfully');
    });
    
    // Add error handling
    iframe.addEventListener('error', () => {
        console.warn('3D background failed to load, using fallback');
        container.style.display = 'none';
    });
    
    // Optimize iframe attributes for performance
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('importance', 'low');
    
    // Trigger loading by updating src if not already set
    if (!iframe.src) {
        iframe.src = iframe.getAttribute('data-src') || iframe.src;
    }
}

// Initialize navigation when DOM is ready
// (This will be handled in the main DOMContentLoaded event listener)

// Centralized header update function
function updateHeaderBackground() {
    const header = document.querySelector('.header');
    const currentTheme = document.body.getAttribute('data-theme');
    
    if (!header) return;
    
    // Force update by setting important styles
    if (window.scrollY > 100) {
        if (currentTheme === 'dark') {
            header.style.setProperty('background', 'rgba(21, 21, 21, 0.98)', 'important');
        } else {
            header.style.setProperty('background', 'rgba(255, 255, 255, 0.98)', 'important');
        }
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        if (currentTheme === 'dark') {
            header.style.setProperty('background', 'rgba(21, 21, 21, 0.95)', 'important');
        } else {
            header.style.setProperty('background', 'rgba(255, 255, 255, 0.95)', 'important');
        }
        header.style.boxShadow = 'none';
    }
}

// Header background on scroll
window.addEventListener('scroll', updateHeaderBackground);

// Form submission (if form exists)
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
    });
}

// Toggle company field based on radio button selection
function toggleCompanyField() {
    const empresaSi = document.getElementById('empresa_si');
    const companyField = document.getElementById('company-field');
    const companyInput = document.getElementById('company');
    
    if (empresaSi && companyField && companyInput) {
        if (empresaSi.checked) {
            companyField.style.display = 'block';
            companyInput.required = true;
        } else {
            companyField.style.display = 'none';
            companyInput.required = false;
            companyInput.value = ''; // Clear the field when hidden
        }
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.solution-card, .service-card, .stat-item').forEach(el => {
    observer.observe(el);
});

// Video Slider Functionality (Manual Only)
let currentSlideIndex = 0;
const totalSlides = 14; // Number of video slides

function initVideoSlider() {
    console.log('Initializing video slider...');
    const slides = document.querySelectorAll('.video-slide');
    const dots = document.querySelectorAll('.dot');
    const slidesContainer = document.querySelector('.video-slides');
    
    console.log('Found elements:', {
        slides: slides.length,
        dots: dots.length,
        slidesContainer: !!slidesContainer
    });
    
    if (slides.length === 0) {
        console.error('No video slides found!');
        return;
    }
    
    // Ensure only the first slide is active initially
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === 0);
    });
    
    // Ensure only the first dot is active initially
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === 0);
    });
    
    // Set initial position
    if (slidesContainer) {
        slidesContainer.style.transform = 'translateX(0%)';
    }
    
    // Update counter
    const currentVideoSpan = document.getElementById('current-video');
    if (currentVideoSpan) {
        currentVideoSpan.textContent = '1';
    }
    
    console.log('Video slider initialized successfully');
}

function showSlide(index) {
    const slides = document.querySelectorAll('.video-slide');
    const dots = document.querySelectorAll('.dot');
    const slidesContainer = document.querySelector('.video-slides');
    const currentVideoSpan = document.getElementById('current-video');
    
    console.log('showSlide called with index:', index);
    console.log('Current elements:', {
        slides: slides.length,
        dots: dots.length,
        slidesContainer: !!slidesContainer
    });
    
    // Ensure index is within bounds
    if (index >= totalSlides) currentSlideIndex = 0;
    if (index < 0) currentSlideIndex = totalSlides - 1;
    
    currentSlideIndex = index >= 0 && index < totalSlides ? index : currentSlideIndex;
    
    console.log('Setting slide to index:', currentSlideIndex);
    
    // Update slides display
    if (slidesContainer) {
        const slideWidth = 100 / totalSlides; // Each slide is 1/14th of the container
        const translateX = -currentSlideIndex * slideWidth;
        slidesContainer.style.transform = `translateX(${translateX}%)`;
        console.log('Set transform to:', `translateX(${translateX}%)`, 'slideWidth:', slideWidth);
    }
    
    // Update active slide class
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlideIndex);
    });
    
    // Update active dot
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlideIndex);
    });
    
    // Update counter
    if (currentVideoSpan) {
        currentVideoSpan.textContent = currentSlideIndex + 1;
    }
    
    // Stop all YouTube videos when switching slides
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        const src = iframe.src;
        if (src.includes('youtube.com')) {
            iframe.src = src; // This reloads the iframe, stopping the video
        }
    });
}

// Publications horizontal pagination with smooth sliding animation
let currentPubPage = 1;
const totalPubPages = 3; // Update this based on how many pages you have

function changePublicationPage(direction) {
    const newPage = currentPubPage + direction;
    
    if (newPage >= 1 && newPage <= totalPubPages) {
        currentPubPage = newPage;
        
        // Calculate transform position for horizontal sliding
        const translateX = -((currentPubPage - 1) * 100);
        const publicationsGrid = document.querySelector('.publications-grid');
        
        if (publicationsGrid) {
            publicationsGrid.style.transform = `translateX(${translateX}%)`;
        }
        
        // Update page indicator
        const currentPageElement = document.getElementById('currentPubPage');
        if (currentPageElement) {
            currentPageElement.textContent = currentPubPage;
        }
        
        // Update button states
        const prevBtn = document.querySelector('.pub-nav-btn.prev');
        const nextBtn = document.querySelector('.pub-nav-btn.next');
        
        if (prevBtn) prevBtn.disabled = currentPubPage === 1;
        if (nextBtn) nextBtn.disabled = currentPubPage === totalPubPages;
        
        // Add a subtle animation effect to the cards
        const currentPageCards = document.querySelectorAll('.publication-page:nth-child(' + currentPubPage + ') .publication-card');
        currentPageCards.forEach((card, index) => {
            card.style.animation = `fadeInScale 0.4s ease-out ${index * 0.1}s both`;
        });
    }
}

// Initialize publications pagination
function initPublicationsPagination() {
    // Set initial button states
    const prevBtn = document.querySelector('.pub-nav-btn.prev');
    const nextBtn = document.querySelector('.pub-nav-btn.next');
    
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = totalPubPages <= 1;
    
    // Set total pages
    const totalPagesElement = document.getElementById('totalPubPages');
    if (totalPagesElement) {
        totalPagesElement.textContent = totalPubPages;
    }
    
    // Initialize first page animation
    const firstPageCards = document.querySelectorAll('.publication-page:first-child .publication-card');
    firstPageCards.forEach((card, index) => {
        card.style.animation = `fadeInScale 0.4s ease-out ${index * 0.1}s both`;
    });
}

// Add CSS animation keyframes dynamically
function addPublicationAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    addPublicationAnimations();
    initPublicationsPagination();
});

function changeSlide(direction) {
    const newIndex = currentSlideIndex + direction;
    showSlide(newIndex);
}

function currentSlide(index) {
    showSlide(index - 1); // Convert to 0-based index
}

// Initialize slider when DOM is ready
// (This will be handled in the main DOMContentLoaded event listener)

// Publications Filter System
function initPublicationsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterContents = document.querySelectorAll('.filter-content');
    
    if (filterBtns.length === 0 || filterContents.length === 0) {
        return; // Exit if elements don't exist
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterType = btn.dataset.filter;
            
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Hide all filter contents
            filterContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show selected filter content
            const targetContent = document.getElementById(`${filterType}-content`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Language dropdown functionality
let langDropdownInitialized = false;
let langClickHandler = null;
let langKeydownHandler = null;

function initLangDropdown() {
    console.log('initLangDropdown called');
    const KEY = "lang";
    const trigger = document.getElementById("langTrigger");
    const menu = document.getElementById("langMenu");
    const current = document.getElementById("langCurrent");
    
    console.log('Elements found:', { 
        trigger: !!trigger, 
        menu: !!menu, 
        current: !!current,
        triggerElement: trigger,
        menuElement: menu 
    });
    
    // Check if elements exist
    if (!trigger || !menu || !current) {
        console.warn('Language dropdown elements not found:', { trigger, menu, current });
        return;
    }

    // Prevent multiple initializations
    if (langDropdownInitialized) {
        console.log('Language dropdown already initialized, skipping...');
        return;
    }
    
    console.log('Language dropdown initialized successfully');
    
    const options = Array.from(menu.querySelectorAll(".lang-option"));
    console.log('Language options found:', options.length);

    function setActive(lang) {
        options.forEach((li) => {
            const active = li.dataset.value === lang;
            li.setAttribute("aria-selected", active ? "true" : "false");
            if (active) current.textContent = li.textContent;
        });
    }

    function openMenu(open) {
        console.log('Opening menu:', open);
        trigger.setAttribute("aria-expanded", open ? "true" : "false");
        menu.style.display = open ? "block" : "none";
        console.log('Menu display after toggle:', menu.style.display);
        console.log('Menu computed style:', window.getComputedStyle(menu).display);
    }

    // estado inicial
    const saved = localStorage.getItem(KEY) || "es";
    setActive(saved);
    if (typeof applyLanguage === 'function') {
        applyLanguage(saved);
    } else {
        console.warn('applyLanguage function not found');
    }

    // Remove existing event listeners if they exist
    if (trigger.langClickHandler) {
        trigger.removeEventListener("click", trigger.langClickHandler);
    }

    // Create and store the click handler
    trigger.langClickHandler = (e) => {
        e.stopPropagation();
        console.log('Language trigger clicked!');
        const open = trigger.getAttribute("aria-expanded") !== "true";
        console.log('Should open:', open);
        openMenu(open);
    };

    // Add the click handler
    trigger.addEventListener("click", trigger.langClickHandler);

    // seleccionar - remove existing listeners and add new ones
    options.forEach((li) => {
        // Remove existing listener if it exists
        if (li.langOptionHandler) {
            li.removeEventListener("click", li.langOptionHandler);
        }

        // Create and store the handler
        li.langOptionHandler = () => {
            const lang = li.dataset.value;
            console.log('Language option selected:', lang);
            localStorage.setItem(KEY, lang);
            setActive(lang);
            if (typeof applyLanguage === 'function') {
                applyLanguage(lang);
            }
            openMenu(false);
        };

        // Add the handler
        li.addEventListener("click", li.langOptionHandler);
    });

    // Remove existing global event listeners
    if (langClickHandler) {
        document.removeEventListener("click", langClickHandler);
    }
    if (langKeydownHandler) {
        document.removeEventListener("keydown", langKeydownHandler);
    }

    // Create and store new handlers
    langClickHandler = (e) => {
        if (!e.target.closest(".lang-switch")) openMenu(false);
    };

    langKeydownHandler = (e) => {
        if (e.key === "Escape") openMenu(false);
    };

    // Add new handlers
    document.addEventListener("click", langClickHandler);
    document.addEventListener("keydown", langKeydownHandler);
    
    // Mark as initialized
    langDropdownInitialized = true;
    
    console.log('Language dropdown setup completed');
}

// Old togglePublications function removed - now using horizontal pagination

// Internationalization (i18n) System
const I18N = {
    es: {
        // Nav / CTA
        nav_inicio: "Inicio",
        nav_nosotros: "Nosotros",
        nav_servicios: "Servicios",
        nav_proyectos: "Proyectos",
        nav_publicaciones: "Publicaciones",
        nav_contacto: "Contacto",
        theme_toggle: "Cambiar tema",

        // Hero
        hero_title_a: "Llevamos el desarrollo ",
        hero_highlight: "tecnológico",
        hero_title_b: " a un nuevo nivel",
        hero_paragraph:
            "Investigación e innovación en ingeniería biomédica, electrónica y sistemas informáticos para resolver los desafíos del mañana.",
        btn_conocer_mas: "Conocer más",

        // Stats
        stat_investigadores: "Investigadores",
        stat_proyectos: "Proyectos completados", 
        stat_anios: "Años de experiencia",
        stat_premios: "Premios recibidos",

        // About
        about_titulo_a: "Sobre ",
        about_titulo_b: "Nosotros",
        about_sub:
            "Empresa para la implementación y soporte de proyectos tecnológicos con el fin de realizar la transformación digital de nuestros clientes",
        about_p1:
            "UMA es una compañía para el desarrollo y soporte de proyectos tecnológicos con el fin de realizar la transformación digital de nuestros clientes.",
        about_p2:
            "Realizamos la transformación digital para nuestros clientes a través de hardware y software con el fin de tener empresas que sean más eficientes y sostenibles.",
        btn_ver_servicios: "Ver servicios",

        // Services header
        services_titulo_a: "Nuestros ",
        services_titulo_b: "Servicios",
        services_sub:
            "Soluciones personalizadas para diferentes segmentos del mercado",

        // Service Cards
        srv_industria_t: "Industria 4.0",
        srv_industria_d:
            "Aplicaciones personalizadas con sensores, medición en tiempo real, control total de principio a fin con plataforma de gestión.",
        ftr_automatizacion: "Automatización",
        ftr_iot: "Sensores IoT",
        ftr_predictivo: "Análisis predictivo",
        ftr_integracion: "Integración",

        srv_agro_t: "Agroindustria",
        srv_agro_d:
            "Agricultura de precisión: telemetría y gestión de cultivos. Monitoreo de lluvias, nivel de ríos y alertas de desastres naturales.",
        ftr_cultivos: "Cultivos inteligentes",
        ftr_riego: "Riego automatizado",
        ftr_alertas: "Alertas climáticas",
        ftr_optimizacion: "Optimización",

        srv_medio_t: "Medio Ambiente",
        srv_medio_d:
            "Monitoreo de cuencas hidrográficas, emisiones de gases, calidad del aire, nivel de ruido. Estación meteorológica con sensores.",
        ftr_aire: "Calidad del aire",
        ftr_hidrico: "Monitoreo hídrico",
        ftr_meteo: "Meteorología",
        ftr_ambiental: "Análisis ambiental",

        srv_block_t: "Blockchain",
        srv_block_d:
            "Implementación de tecnologías blockchain para trazabilidad, seguridad de datos y contratos inteligentes.",
        ftr_trazabilidad: "Trazabilidad",
        ftr_contratos: "Contratos inteligentes",
        ftr_seguridad: "Seguridad",
        ftr_token: "Tokenización",

        srv_biomed_t: "Soluciones Biomédicas",
        srv_biomed_d:
            "Desarrollo de dispositivos médicos, sistemas de monitoreo de pacientes y análisis de datos biomédicos.",
        ftr_dispositivos: "Dispositivos médicos",
        ftr_monitoreo: "Monitoreo pacientes",
        ftr_telemed: "Telemedicina",
        ftr_biomed: "Análisis biomédico",

        srv_ia_t: "Inteligencia Artificial",
        srv_ia_d:
            "Implementación de algoritmos de IA para análisis predictivo, procesamiento de datos y automatización inteligente.",
        ftr_ml: "Machine Learning",
        ftr_pred: "Análisis predictivo",
        ftr_nlp: "Procesamiento NLP",
        ftr_vision: "Visión artificial",

        // Projects
        projects_titulo_a: "Nuestros ",
        projects_titulo_b: "Proyectos",
        projects_sub: "Descubre nuestros últimos proyectos de investigación y desarrollo tecnológico",

        // Project Videos
        project_video1_title: "Proyecto UMA - Desarrollo Tecnológico",
        project_video1_desc: "Descubre nuestros avances en investigación y desarrollo de tecnologías innovadoras para transformar el futuro.",
        project_video2_title: "Innovación UMA - Soluciones Inteligentes",
        project_video2_desc: "Conoce nuestras soluciones tecnológicas avanzadas que están revolucionando múltiples industrias.",
        project_video3_title: "UMA - Investigación y Desarrollo",
        project_video3_desc: "Explora nuestros proyectos de investigación que están definiendo el futuro de la tecnología.",
        project_video4_title: "UMA - Tecnología IoT Avanzada",
        project_video4_desc: "Descubre nuestras soluciones IoT que están revolucionando el monitoreo ambiental y industrial.",
        project_video5_title: "UMA - Sistemas Inteligentes",
        project_video5_desc: "Implementación de sistemas inteligentes para automatización y control industrial avanzado.",
        project_video6_title: "UMA - Monitoreo Ambiental",
        project_video6_desc: "Soluciones avanzadas para el monitoreo ambiental y gestión sostenible de recursos.",
        project_video7_title: "UMA - Innovación Biomédica",
        project_video7_desc: "Desarrollo de tecnologías biomédicas innovadoras para mejorar la calidad de vida.",
        project_video8_title: "UMA - Redes de Sensores",
        project_video8_desc: "Implementación de redes de sensores distribuidos para aplicaciones industriales y ambientales.",
        project_video9_title: "UMA - Automatización Industrial",
        project_video9_desc: "Soluciones de automatización para optimizar procesos industriales con tecnología de vanguardia.",
        project_video10_title: "UMA - Análisis de Datos",
        project_video10_desc: "Análisis avanzado de datos para optimización de procesos y toma de decisiones inteligentes.",
        project_video11_title: "UMA - Energías Renovables",
        project_video11_desc: "Investigación en energías renovables y sistemas de gestión energética sostenible.",
        project_video12_title: "UMA - Blockchain Aplicado",
        project_video12_desc: "Implementación de tecnología blockchain para trazabilidad y seguridad en cadenas de suministro.",
        project_video13_title: "UMA - Inteligencia Artificial",
        project_video13_desc: "Desarrollo de algoritmos de IA para procesamiento de datos y automatización inteligente.",
        project_video14_title: "UMA - Futuro Tecnológico",
        project_video14_desc: "Visión del futuro tecnológico y las innovaciones que están transformando el mundo.",
        project_video_counter: "de",

        // Development Fields / Carousel
        dev_fields_title: "Nuestros Campos de Desarrollo",
        carousel_agro: "Soluciones para la Agroindustria",
        carousel_iot: "Soluciones e Implementaciones IoT",
        carousel_control: "Control y Monitorio Remoto",
        carousel_medical: "Soluciones Médicas",

        // Timeline
        timeline_titulo_a: "Nuestra ",
        timeline_titulo_b: "Trayectoria",
        timeline_sub: "Un recorrido por nuestros principales logros e hitos institucionales",
        timeline_2020_title: "Alianza Estratégica",
        timeline_2020_subtitle: "Colaboración con el Instituto Tecnológico de Massachusetts (MIT)",
        timeline_2020_desc: "Establecimos una alianza estratégica con MIT para el intercambio de conocimientos y desarrollo conjunto de proyectos de investigación en tecnologías emergentes.",
        timeline_2021_title: "Patente Internacional",
        timeline_2021_subtitle: "Por el desarrollo de prótesis biónicas con sensores táctiles avanzados",
        timeline_2021_desc: "Obtuvimos reconocimiento internacional por nuestro innovador desarrollo en prótesis biónicas que incorporan sensores táctiles de última generación.",
        timeline_2022_title: "Reconocimiento Internacional",
        timeline_2022_subtitle: "Seleccionados entre los 10 mejores centros de investigación en Latinoamérica",
        timeline_2022_desc: "Fuimos reconocidos como uno de los 10 mejores centros de investigación en Latinoamérica por nuestras contribuciones al desarrollo tecnológico regional.",
        timeline_2023_title: "Premio Nacional de Innovación",
        timeline_2023_subtitle: "Por el desarrollo del Sistema de Monitoreo Cardíaco con IA predictiva",
        timeline_2023_desc: "Recibimos el prestigioso Premio Nacional de Innovación por nuestro revolucionario sistema de monitoreo cardíaco que utiliza inteligencia artificial predictiva.",
        timeline_2025_title: "DocIA - Reconocimiento Internacional",
        timeline_2025_subtitle: "Emprendedores de Alto Impacto en Incuba Unión Tecnológico y VCILAT 2025",
        timeline_2025_desc: "Nuestros estudiantes desarrollaron DocIA, una plataforma de atención médica primaria con IA que fue reconocida como emprendimiento de alto impacto, obteniendo premios económicos, becas de posgrado y visibilidad internacional.",

        // Publications
        publications_titulo_a: "Nuestras ",
        publications_titulo_b: "Publicaciones",
        publications_sub: "Conoce nuestras publicaciones científicas y artículos de investigación más destacados",
        filter_articles: "Artículos",
        filter_profiles: "Perfiles",
        
        // Publication details
        pub_ieee_title: "IEEE Research Article 2025",
        pub_springer_title: "Capítulo de Libro - Springer",
        pub_researchgate_title: "Design and Development of a Podiatric Station Prototype",
        pub_ieee_type: "IEEE Xplore",
        pub_springer_type: "Book Chapter",
        pub_researchgate_type: "Research Paper",
        pub_fuente: "Fuente:",
        pub_ieee_fuente: "IEEE Xplore Digital Library",
        pub_springer_fuente: "Springer",
        pub_researchgate_fuente: "ResearchGate",
        pub_año: "Año:",
        pub_doi: "DOI:",
        pub_tema: "Tema:",
        pub_autores: "Autores:",
        pub_springer_autores: "Marco Fabian Borda Wiegert, Mauricio Marcelo Peredo Claros, Eynar Calle Viles, Rommer Alex Ortega Martinez",
        pub_researchgate_tema: "Diagnosis of Diabetic Foot",
        pub_ieee_desc: "Investigación avanzada en tecnologías emergentes para sistemas inteligentes y análisis de datos.",
        pub_springer_desc: "Contribución científica en el área de modelado y análisis aplicado a sistemas complejos.",
        pub_researchgate_desc: "Desarrollo de prototipo para estación podológica aplicada al diagnóstico del pie diabético.",
        pub_ver: "Ver Publicación",
        
        // Researcher Profiles
        profile_ieee_title: "IEEE Author Profile",
        profile_ieee_desc: "Perfil de autor en IEEE Xplore con múltiples publicaciones en tecnologías emergentes.",
        profile_ieee_stat: "Publicaciones IEEE",
        profile_ieee_link: "Ver Perfil IEEE",
        profile_orcid_title: "ORCID Researcher",
        profile_orcid_desc: "Perfil ORCID con investigaciones en ingeniería biomédica y sistemas inteligentes.",
        profile_orcid_stat: "ORCID: 0000-0003-1477-2813",
        profile_orcid_link: "Ver Perfil ORCID",
        profile_researchgate_title: "ResearchGate",
        profile_researchgate_desc: "Investigador especializado en desarrollo de tecnologías médicas y análisis de datos biomédicos.",
        profile_researchgate_stat: "ResearchGate",
        profile_researchgate_link: "Ver Perfil ResearchGate",

        // Contact
        contact_titulo_a: "¿Listo para ",
        contact_titulo_b: "colaborar",
        contact_titulo_c: "?",
        contact_desc:
            "Contáctanos para discutir cómo podemos ayudarte a transformar tu negocio con nuestras soluciones tecnológicas innovadoras.",
        contact_direccion: "Campus Univalle, Av. Argentina #2083, Cochabamba, Bolivia",
        contact_nombre_label: "Nombre completo",
        contact_email_label: "Correo electrónico", 
        contact_empresa_type_label: "¿Tienes una empresa?",
        contact_empresa_si: "Sí, tengo empresa",
        contact_empresa_no: "No, soy cliente individual",
        contact_empresa_label: "Nombre de la empresa",
        contact_mensaje_label: "Mensaje",
        contact_nombre_placeholder: "Tu nombre",
        contact_email_placeholder: "tu@email.com",
        contact_empresa_placeholder: "Nombre de tu empresa",
        contact_mensaje_placeholder: "Cuéntanos sobre tu proyecto...",
        contact_enviar: "Enviar mensaje",

        // Footer
        footer_desc:
            "Unidad de Modelado y Análisis (UMA) es un departamento de investigación de la Universidad Privada del Valle.",
        footer_soluciones: "Soluciones",
        footer_iot: "IoT",
        footer_soluciones_medicas: "Soluciones Médicas",
        footer_agroindustria: "Agroindustria",
        footer_control_remoto: "Control Remoto",
        footer_servicios: "Servicios",
        footer_industria: "Industria 4.0",
        footer_agroindustria: "Agroindustria",
        footer_medio_ambiente: "Medio Ambiente",
        footer_blockchain: "Blockchain",
        footer_biomedicas: "Soluciones Biomédicas",
        footer_ia: "Inteligencia Artificial",
        footer_enlaces_rapidos: "Enlaces Rápidos",
        footer_inicio: "Inicio",
        footer_nosotros: "Nosotros",
        footer_servicios_link: "Servicios",
        footer_proyectos: "Proyectos",
        footer_publicaciones: "Publicaciones",
        footer_contacto_link: "Contacto",
        footer_contacto: "Contacto",
        footer_copyright:
            "© 2025 UMA - Universidad Privada del Valle. Todos los derechos reservados.",
    },

    en: {
        nav_inicio: "Home",
        nav_nosotros: "About",
        nav_servicios: "Services",
        nav_proyectos: "Projects",
        nav_publicaciones: "Publications",
        nav_contacto: "Contact",
        theme_toggle: "Toggle theme",

        hero_title_a: "We take technological ",
        hero_highlight: "innovation",
        hero_title_b: " to the next level",
        hero_paragraph:
            "Research and innovation in biomedical engineering, electronics, and computer systems to tackle tomorrow's challenges.",
        btn_conocer_mas: "Learn more",

        stat_investigadores: "Researchers",
        stat_proyectos: "Completed Projects",
        stat_anios: "Years of Experience",
        stat_premios: "Awards Received",

        about_titulo_a: "About ",
        about_titulo_b: "Us",
        about_sub:
            "Company for implementing and supporting technology projects to drive our clients' digital transformation",
        about_p1:
            "UMA develops and supports technology projects to deliver our clients' digital transformation.",
        about_p2:
            "We achieve transformation with hardware and software to build more efficient and sustainable companies.",
        btn_ver_servicios: "View services",

        services_titulo_a: "Our ",
        services_titulo_b: "Services",
        services_sub: "Customized solutions for different market segments",

        srv_industria_t: "Industry 4.0",
        srv_industria_d:
            "Custom apps with sensors, real‑time measurement, end‑to‑end control with a management platform.",
        ftr_automatizacion: "Automation",
        ftr_iot: "IoT Sensors",
        ftr_predictivo: "Predictive analytics",
        ftr_integracion: "Integration",

        srv_agro_t: "Agro‑industry",
        srv_agro_d:
            "Precision agriculture: telemetry and crop management. Rain monitoring, river levels, and disaster alerts.",
        ftr_cultivos: "Smart crops",
        ftr_riego: "Automated irrigation",
        ftr_alertas: "Weather alerts",
        ftr_optimizacion: "Optimization",

        srv_medio_t: "Environment",
        srv_medio_d:
            "Watershed monitoring, gas emissions, air quality, noise level. Weather station with sensors.",
        ftr_aire: "Air quality",
        ftr_hidrico: "Water monitoring",
        ftr_meteo: "Meteorology",
        ftr_ambiental: "Environmental analysis",

        srv_block_t: "Blockchain",
        srv_block_d:
            "Blockchain technologies for traceability, data security, and smart contracts.",
        ftr_trazabilidad: "Traceability",
        ftr_contratos: "Smart contracts",
        ftr_seguridad: "Security",
        ftr_token: "Tokenization",

        srv_biomed_t: "Biomedical Solutions",
        srv_biomed_d:
            "Medical devices, patient monitoring systems, and biomedical data analysis.",
        ftr_dispositivos: "Medical devices",
        ftr_monitoreo: "Patient monitoring",
        ftr_telemed: "Telemedicine",
        ftr_biomed: "Biomedical analysis",

        srv_ia_t: "Artificial Intelligence",
        srv_ia_d:
            "AI algorithms for predictive analytics, data processing, and intelligent automation.",
        ftr_ml: "Machine Learning",
        ftr_pred: "Predictive analytics",
        ftr_nlp: "NLP processing",
        ftr_vision: "Computer vision",

        projects_titulo_a: "Our ",
        projects_titulo_b: "Projects",
        projects_sub: "Discover our latest research and technological development projects",

        // Project Videos
        project_video1_title: "UMA Project - Technological Development",
        project_video1_desc: "Discover our advances in research and development of innovative technologies to transform the future.",
        project_video2_title: "UMA Innovation - Smart Solutions",
        project_video2_desc: "Learn about our advanced technological solutions that are revolutionizing multiple industries.",
        project_video3_title: "UMA - Research and Development",
        project_video3_desc: "Explore our research projects that are defining the future of technology.",
        project_video4_title: "UMA - Advanced IoT Technology",
        project_video4_desc: "Discover our IoT solutions that are revolutionizing environmental and industrial monitoring.",
        project_video5_title: "UMA - Intelligent Systems",
        project_video5_desc: "Implementation of intelligent systems for automation and advanced industrial control.",
        project_video6_title: "UMA - Environmental Monitoring",
        project_video6_desc: "Advanced solutions for environmental monitoring and sustainable resource management.",
        project_video7_title: "UMA - Biomedical Innovation",
        project_video7_desc: "Development of innovative biomedical technologies to improve quality of life.",
        project_video8_title: "UMA - Sensor Networks",
        project_video8_desc: "Implementation of distributed sensor networks for industrial and environmental applications.",
        project_video9_title: "UMA - Industrial Automation",
        project_video9_desc: "Automation solutions to optimize industrial processes with cutting-edge technology.",
        project_video10_title: "UMA - Data Analysis",
        project_video10_desc: "Advanced data analysis for process optimization and intelligent decision making.",
        project_video11_title: "UMA - Renewable Energy",
        project_video11_desc: "Research in renewable energy and sustainable energy management systems.",
        project_video12_title: "UMA - Applied Blockchain",
        project_video12_desc: "Implementation of blockchain technology for traceability and security in supply chains.",
        project_video13_title: "UMA - Artificial Intelligence",
        project_video13_desc: "Development of AI algorithms for data processing and intelligent automation.",
        project_video14_title: "UMA - Technological Future",
        project_video14_desc: "Vision of the technological future and innovations that are transforming the world.",
        project_video_counter: "of",

        // Development Fields / Carousel
        dev_fields_title: "Our Development Fields",
        carousel_agro: "Solutions for Agro-Industry",
        carousel_iot: "IoT Solutions and Implementations",
        carousel_control: "Remote Control and Monitoring",
        carousel_medical: "Medical Solutions",

        // Timeline
        timeline_titulo_a: "Our ",
        timeline_titulo_b: "Journey",
        timeline_sub: "A journey through our main achievements and institutional milestones",
        timeline_2020_title: "Strategic Alliance",
        timeline_2020_subtitle: "Collaboration with Massachusetts Institute of Technology (MIT)",
        timeline_2020_desc: "We established a strategic alliance with MIT for knowledge exchange and joint development of research projects in emerging technologies.",
        timeline_2021_title: "International Patent",
        timeline_2021_subtitle: "For the development of bionic prosthetics with advanced tactile sensors",
        timeline_2021_desc: "We obtained international recognition for our innovative development in bionic prosthetics that incorporate cutting-edge tactile sensors.",
        timeline_2022_title: "International Recognition",
        timeline_2022_subtitle: "Selected among the 10 best research centers in Latin America",
        timeline_2022_desc: "We were recognized as one of the 10 best research centers in Latin America for our contributions to regional technological development.",
        timeline_2023_title: "National Innovation Award",
        timeline_2023_subtitle: "For the development of the Cardiac Monitoring System with predictive AI",
        timeline_2023_desc: "We received the prestigious National Innovation Award for our revolutionary cardiac monitoring system that uses predictive artificial intelligence.",
        timeline_2025_title: "DocIA - International Recognition",
        timeline_2025_subtitle: "High Impact Entrepreneurs at Incuba Unión Tecnológico and VCILAT 2025",
        timeline_2025_desc: "Our students developed DocIA, an AI-powered primary healthcare platform that was recognized as a high-impact venture, obtaining economic prizes, graduate scholarships, and international visibility.",

        // Publications
        publications_titulo_a: "Our ",
        publications_titulo_b: "Publications",
        publications_sub: "Learn about our featured scientific publications and research articles",
        filter_articles: "Articles",
        filter_profiles: "Profiles",
        
        // Publication details
        pub_ieee_title: "IEEE Research Article 2025",
        pub_springer_title: "Book Chapter - Springer",
        pub_researchgate_title: "Design and Development of a Podiatric Station Prototype",
        pub_ieee_type: "IEEE Xplore",
        pub_springer_type: "Book Chapter",
        pub_researchgate_type: "Research Paper",
        pub_fuente: "Source:",
        pub_ieee_fuente: "IEEE Xplore Digital Library",
        pub_springer_fuente: "Springer",
        pub_researchgate_fuente: "ResearchGate",
        pub_año: "Year:",
        pub_doi: "DOI:",
        pub_tema: "Topic:",
        pub_autores: "Authors:",
        pub_springer_autores: "Marco Fabian Borda Wiegert, Mauricio Marcelo Peredo Claros, Eynar Calle Viles, Rommer Alex Ortega Martinez",
        pub_researchgate_tema: "Diagnosis of Diabetic Foot",
        pub_ieee_desc: "Advanced research in emerging technologies for intelligent systems and data analysis.",
        pub_springer_desc: "Scientific contribution in the area of modeling and analysis applied to complex systems.",
        pub_researchgate_desc: "Development of prototype for podiatric station applied to diabetic foot diagnosis.",
        pub_ver: "View Publication",
        
        // Researcher Profiles
        profile_ieee_title: "IEEE Author Profile",
        profile_ieee_desc: "Author profile in IEEE Xplore with multiple publications in emerging technologies.",
        profile_ieee_stat: "IEEE Publications",
        profile_ieee_link: "View IEEE Profile",
        profile_orcid_title: "ORCID Researcher",
        profile_orcid_desc: "ORCID profile with research in biomedical engineering and intelligent systems.",
        profile_orcid_stat: "ORCID: 0000-0003-1477-2813",
        profile_orcid_link: "View ORCID Profile",
        profile_researchgate_title: "ResearchGate",
        profile_researchgate_desc: "Researcher specialized in medical technology development and biomedical data analysis.",
        profile_researchgate_stat: "ResearchGate",
        profile_researchgate_link: "View ResearchGate Profile",

        contact_titulo_a: "Ready to ",
        contact_titulo_b: "collaborate",
        contact_titulo_c: "?",
        contact_desc:
            "Contact us to discuss how we can help transform your business with innovative technology solutions.",
        contact_direccion: "Campus Univalle, Av. Argentina #2083, Cochabamba, Bolivia",
        contact_nombre_label: "Full name",
        contact_email_label: "Email",
        contact_empresa_type_label: "Do you have a business?",
        contact_empresa_si: "Yes, I have a business",
        contact_empresa_no: "No, I'm an individual client",
        contact_empresa_label: "Company name",
        contact_mensaje_label: "Message",
        contact_nombre_placeholder: "Your name",
        contact_email_placeholder: "your@email.com",
        contact_empresa_placeholder: "Your company name",
        contact_mensaje_placeholder: "Tell us about your project...",
        contact_enviar: "Send message",

        footer_desc:
            "Modeling and Analysis Unit (UMA) is a research department of Universidad Privada del Valle.",
        footer_soluciones: "Solutions",
        footer_iot: "IoT",
        footer_soluciones_medicas: "Medical Solutions",
        footer_agroindustria: "Agro-industry",
        footer_control_remoto: "Remote Control",
        footer_servicios: "Services",
        footer_industria: "Industry 4.0",
        footer_agroindustria: "Agro-industry",
        footer_medio_ambiente: "Environment",
        footer_blockchain: "Blockchain",
        footer_biomedicas: "Biomedical Solutions",
        footer_ia: "Artificial Intelligence",
        footer_enlaces_rapidos: "Quick Links",
        footer_inicio: "Home",
        footer_nosotros: "About Us",
        footer_servicios_link: "Services",
        footer_proyectos: "Projects",
        footer_publicaciones: "Publications",
        footer_contacto_link: "Contact",
        footer_contacto: "Contact",
        footer_copyright:
            "© 2025 UMA - Universidad Privada del Valle. All rights reserved.",
    },

    pt: {
        nav_inicio: "Início",
        nav_nosotros: "Sobre",
        nav_servicios: "Serviços",
        nav_proyectos: "Projetos",
        nav_publicaciones: "Publicações",
        nav_contacto: "Contato",
        theme_toggle: "Alternar tema",

        hero_title_a: "Levamos o desenvolvimento ",
        hero_highlight: "tecnológico",
        hero_title_b: " a um novo nível",
        hero_paragraph:
            "Pesquisa e inovação em engenharia biomédica, eletrônica e sistemas computacionais para enfrentar os desafios de amanhã.",
        btn_conocer_mas: "Saiba mais",

        stat_investigadores: "Pesquisadores",
        stat_proyectos: "Projetos Concluídos",
        stat_anios: "Anos de Experiência",
        stat_premios: "Prêmios Recebidos",

        about_titulo_a: "Sobre ",
        about_titulo_b: "Nós",
        about_sub:
            "Empresa para implementação e suporte de projetos tecnológicos visando a transformação digital de nossos clientes",
        about_p1:
            "A UMA desenvolve e dá suporte a projetos tecnológicos para realizar a transformação digital de nossos clientes.",
        about_p2:
            "Fazemos a transformação com hardware e software para empresas mais eficientes e sustentáveis.",
        btn_ver_servicios: "Ver serviços",

        services_titulo_a: "Nossos ",
        services_titulo_b: "Serviços",
        services_sub:
            "Soluções personalizadas para diferentes segmentos de mercado",

        srv_industria_t: "Indústria 4.0",
        srv_industria_d:
            "Aplicações personalizadas com sensores, medições em tempo real e controle de ponta a ponta com plataforma de gestão.",
        ftr_automatizacion: "Automação",
        ftr_iot: "Sensores IoT",
        ftr_predictivo: "Análise preditiva",
        ftr_integracion: "Integração",

        srv_agro_t: "Agroindústria",
        srv_agro_d:
            "Agricultura de precisão: telemetria e gestão de culturas. Monitoramento de chuvas, níveis de rios e alertas de desastres.",
        ftr_cultivos: "Culturas inteligentes",
        ftr_riego: "Irrigação automática",
        ftr_alertas: "Alertas climáticos",
        ftr_optimizacion: "Otimização",

        srv_medio_t: "Meio Ambiente",
        srv_medio_d:
            "Monitoramento de bacias hidrográficas, emissões de gases, qualidade do ar e ruído. Estação meteorológica com sensores.",
        ftr_aire: "Qualidade do ar",
        ftr_hidrico: "Monitoramento hídrico",
        ftr_meteo: "Meteorologia",
        ftr_ambiental: "Análise ambiental",

        srv_block_t: "Blockchain",
        srv_block_d:
            "Tecnologias blockchain para rastreabilidade, segurança de dados e contratos inteligentes.",
        ftr_trazabilidad: "Rastreabilidade",
        ftr_contratos: "Contratos inteligentes",
        ftr_seguridad: "Segurança",
        ftr_token: "Tokenização",

        srv_biomed_t: "Soluções Biomédicas",
        srv_biomed_d:
            "Dispositivos médicos, sistemas de monitoramento de pacientes e análise de dados biomédicos.",
        ftr_dispositivos: "Dispositivos médicos",
        ftr_monitoreo: "Monitoramento de pacientes",
        ftr_telemed: "Telemedicina",
        ftr_biomed: "Análise biomédica",

        srv_ia_t: "Inteligência Artificial",
        srv_ia_d:
            "Algoritmos de IA para análise preditiva, processamento de dados e automação inteligente.",
        ftr_ml: "Machine Learning",
        ftr_pred: "Análise preditiva",
        ftr_nlp: "Processamento de NLP",
        ftr_vision: "Visão computacional",

        projects_titulo_a: "Nossos ",
        projects_titulo_b: "Projetos",
        projects_sub: "Descubra nossos últimos projetos de pesquisa e desenvolvimento tecnológico",

        // Project Videos
        project_video1_title: "Projeto UMA - Desenvolvimento Tecnológico",
        project_video1_desc: "Descubra nossos avanços em pesquisa e desenvolvimento de tecnologias inovadoras para transformar o futuro.",
        project_video2_title: "Inovação UMA - Soluções Inteligentes",
        project_video2_desc: "Conheça nossas soluções tecnológicas avançadas que estão revolucionando múltiplas indústrias.",
        project_video3_title: "UMA - Pesquisa e Desenvolvimento",
        project_video3_desc: "Explore nossos projetos de pesquisa que estão definindo o futuro da tecnologia.",
        project_video4_title: "UMA - Tecnologia IoT Avançada",
        project_video4_desc: "Descubra nossas soluções IoT que estão revolucionando o monitoramento ambiental e industrial.",
        project_video5_title: "UMA - Sistemas Inteligentes",
        project_video5_desc: "Implementação de sistemas inteligentes para automação e controle industrial avançado.",
        project_video6_title: "UMA - Monitoramento Ambiental",
        project_video6_desc: "Soluções avançadas para monitoramento ambiental e gestão sustentável de recursos.",
        project_video7_title: "UMA - Inovação Biomédica",
        project_video7_desc: "Desenvolvimento de tecnologias biomédicas inovadoras para melhorar a qualidade de vida.",
        project_video8_title: "UMA - Redes de Sensores",
        project_video8_desc: "Implementação de redes de sensores distribuídos para aplicações industriais e ambientais.",
        project_video9_title: "UMA - Automação Industrial",
        project_video9_desc: "Soluções de automação para otimizar processos industriais com tecnologia de ponta.",
        project_video10_title: "UMA - Análise de Dados",
        project_video10_desc: "Análise avançada de dados para otimização de processos e tomada de decisões inteligentes.",
        project_video11_title: "UMA - Energias Renováveis",
        project_video11_desc: "Pesquisa em energias renováveis e sistemas de gestão energética sustentável.",
        project_video12_title: "UMA - Blockchain Aplicado",
        project_video12_desc: "Implementação de tecnologia blockchain para rastreabilidade e segurança em cadeias de suprimentos.",
        project_video13_title: "UMA - Inteligência Artificial",
        project_video13_desc: "Desenvolvimento de algoritmos de IA para processamento de dados e automação inteligente.",
        project_video14_title: "UMA - Futuro Tecnológico",
        project_video14_desc: "Visão do futuro tecnológico e das inovações que estão transformando o mundo.",
        project_video_counter: "de",

        // Development Fields / Carousel
        dev_fields_title: "Nossos Campos de Desenvolvimento",
        carousel_agro: "Soluções para a Agroindústria",
        carousel_iot: "Soluções e Implementações IoT",
        carousel_control: "Controle e Monitoramento Remoto",
        carousel_medical: "Soluções Médicas",

        // Timeline
        timeline_titulo_a: "Nossa ",
        timeline_titulo_b: "Trajetória",
        timeline_sub: "Um percurso por nossas principais conquistas e marcos institucionais",
        timeline_2020_title: "Aliança Estratégica",
        timeline_2020_subtitle: "Colaboração com o Instituto de Tecnologia de Massachusetts (MIT)",
        timeline_2020_desc: "Estabelecemos uma aliança estratégica com o MIT para intercâmbio de conhecimentos e desenvolvimento conjunto de projetos de pesquisa em tecnologias emergentes.",
        timeline_2021_title: "Patente Internacional",
        timeline_2021_subtitle: "Pelo desenvolvimento de próteses biônicas com sensores táteis avançados",
        timeline_2021_desc: "Obtivemos reconhecimento internacional por nosso desenvolvimento inovador em próteses biônicas que incorporam sensores táteis de última geração.",
        timeline_2022_title: "Reconhecimento Internacional",
        timeline_2022_subtitle: "Selecionados entre os 10 melhores centros de pesquisa na América Latina",
        timeline_2022_desc: "Fomos reconhecidos como um dos 10 melhores centros de pesquisa na América Latina por nossas contribuições ao desenvolvimento tecnológico regional.",
        timeline_2023_title: "Prêmio Nacional de Inovação",
        timeline_2023_subtitle: "Pelo desenvolvimento do Sistema de Monitoramento Cardíaco com IA preditiva",
        timeline_2023_desc: "Recebemos o prestigioso Prêmio Nacional de Inovação por nosso revolucionário sistema de monitoramento cardíaco que utiliza inteligência artificial preditiva.",
        timeline_2025_title: "DocIA - Reconhecimento Internacional",
        timeline_2025_subtitle: "Empreendedores de Alto Impacto no Incuba Unión Tecnológico e VCILAT 2025",
        timeline_2025_desc: "Nossos estudantes desenvolveram DocIA, uma plataforma de atenção médica primária com IA que foi reconhecida como empreendimento de alto impacto, obtendo prêmios econômicos, bolsas de pós-graduação e visibilidade internacional.",

        // Publications
        publications_titulo_a: "Nossas ",
        publications_titulo_b: "Publicações",
        publications_sub: "Conheça nossas publicações científicas e artigos de pesquisa mais destacados",
        filter_articles: "Artigos",
        filter_profiles: "Perfis",
        
        // Publication details
        pub_ieee_title: "Artigo de Pesquisa IEEE 2025",
        pub_springer_title: "Capítulo de Livro - Springer",
        pub_researchgate_title: "Design and Development of a Podiatric Station Prototype",
        pub_ieee_type: "IEEE Xplore",
        pub_springer_type: "Capítulo de Livro",
        pub_researchgate_type: "Artigo de Pesquisa",
        pub_fuente: "Fonte:",
        pub_ieee_fuente: "Biblioteca Digital IEEE Xplore",
        pub_springer_fuente: "Springer",
        pub_researchgate_fuente: "ResearchGate",
        pub_año: "Ano:",
        pub_doi: "DOI:",
        pub_tema: "Tema:",
        pub_autores: "Autores:",
        pub_springer_autores: "Marco Fabian Borda Wiegert, Mauricio Marcelo Peredo Claros, Eynar Calle Viles, Rommer Alex Ortega Martinez",
        pub_researchgate_tema: "Diagnóstico de Pé Diabético",
        pub_ieee_desc: "Pesquisa avançada em tecnologias emergentes para sistemas inteligentes e análise de dados.",
        pub_springer_desc: "Contribuição científica na área de modelagem e análise aplicada a sistemas complexos.",
        pub_researchgate_desc: "Desenvolvimento de protótipo para estação podológica aplicada ao diagnóstico do pé diabético.",
        pub_ver: "Ver Publicação",
        
        // Researcher Profiles
        profile_ieee_title: "Perfil de Autor IEEE",
        profile_ieee_desc: "Perfil de autor no IEEE Xplore com múltiplas publicações em tecnologias emergentes.",
        profile_ieee_stat: "Publicações IEEE",
        profile_ieee_link: "Ver Perfil IEEE",
        profile_orcid_title: "Pesquisador ORCID",
        profile_orcid_desc: "Perfil ORCID com pesquisas em engenharia biomédica e sistemas inteligentes.",
        profile_orcid_stat: "ORCID: 0000-0003-1477-2813",
        profile_orcid_link: "Ver Perfil ORCID",
        profile_researchgate_title: "ResearchGate",
        profile_researchgate_desc: "Pesquisador especializado em desenvolvimento de tecnologias médicas e análise de dados biomédicos.",
        profile_researchgate_stat: "ResearchGate",
        profile_researchgate_link: "Ver Perfil ResearchGate",

        contact_titulo_a: "Pronto para ",
        contact_titulo_b: "colaborar",
        contact_titulo_c: "?",
        contact_desc:
            "Fale conosco para discutir como podemos transformar seu negócio com soluções tecnológicas inovadoras.",
        contact_direccion: "Campus Univalle, Av. Argentina #2083, Cochabamba, Bolívia",
        contact_nombre_label: "Nome completo",
        contact_email_label: "E-mail",
        contact_empresa_type_label: "Você tem uma empresa?",
        contact_empresa_si: "Sim, tenho uma empresa",
        contact_empresa_no: "Não, sou cliente individual",
        contact_empresa_label: "Nome da empresa",
        contact_mensaje_label: "Mensagem",
        contact_nombre_placeholder: "Seu nome",
        contact_email_placeholder: "seu@email.com",
        contact_empresa_placeholder: "Nome da sua empresa",
        contact_mensaje_placeholder: "Conte-nos sobre seu projeto...",
        contact_enviar: "Enviar mensagem",

        footer_desc:
            "Unidade de Modelagem e Análise (UMA) é um departamento de pesquisa da Universidad Privada del Valle.",
        footer_soluciones: "Soluções",
        footer_iot: "IoT",
        footer_soluciones_medicas: "Soluções Médicas",
        footer_agroindustria: "Agroindústria",
        footer_control_remoto: "Controle Remoto",
        footer_servicios: "Serviços",
        footer_industria: "Indústria 4.0",
        footer_agroindustria: "Agroindústria",
        footer_medio_ambiente: "Meio Ambiente",
        footer_blockchain: "Blockchain",
        footer_biomedicas: "Soluções Biomédicas",
        footer_ia: "Inteligência Artificial",
        footer_enlaces_rapidos: "Links Rápidos",
        footer_inicio: "Início",
        footer_nosotros: "Sobre Nós",
        footer_servicios_link: "Serviços",
        footer_proyectos: "Projetos",
        footer_publicaciones: "Publicações",
        footer_contacto_link: "Contato",
        footer_contacto: "Contato",
        footer_copyright:
            "© 2025 UMA – Universidad Privada del Valle. Todos os direitos reservados.",
    },
};

function applyLanguage(lang) {
    const dict = I18N[lang] || I18N.es;

    // Texto plano
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const k = el.getAttribute("data-i18n");
        if (dict[k] !== undefined) el.textContent = dict[k];
    });
    // Placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        const k = el.getAttribute("data-i18n-placeholder");
        if (dict[k] !== undefined) el.placeholder = dict[k];
    });
    // title / aria-label
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
        const k = el.getAttribute("data-i18n-title");
        if (dict[k] !== undefined) el.title = dict[k];
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
        const k = el.getAttribute("data-i18n-aria-label");
        if (dict[k] !== undefined) el.setAttribute("aria-label", dict[k]);
    });

    // <html lang="...">
    document.documentElement.setAttribute("lang", lang);
}

function initI18n() {
    const KEY = "lang";
    const saved = localStorage.getItem(KEY) || "es";
    applyLanguage(saved);
}

// Footer service navigation functionality
function initFooterServiceNavigation() {
    const footerServiceLinks = document.querySelectorAll('.footer-section a[data-service]');
    
    footerServiceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetService = this.getAttribute('data-service');
            
            // Navigate to services section
            const servicesSection = document.getElementById('servicios');
            if (servicesSection) {
                // Smooth scroll to services section
                servicesSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Wait for scroll to complete, then activate the service
                setTimeout(() => {
                    activateServiceCard(targetService);
                }, 800);
            }
        });
    });
}

// Function to activate a specific service card
function activateServiceCard(serviceId) {
    // Find the radio input for the target service
    const targetRadio = document.getElementById(serviceId);
    if (targetRadio) {
        // Uncheck all other service radios
        const allServiceRadios = document.querySelectorAll('.service-radio-input');
        allServiceRadios.forEach(radio => {
            radio.checked = false;
        });
        
        // Check the target service radio
        targetRadio.checked = true;
        
        // Trigger any change events if needed
        const changeEvent = new Event('change', { bubbles: true });
        targetRadio.dispatchEvent(changeEvent);
    }
}

// Logo animation functionality
function initLogoAnimation() {
    const logo = document.getElementById('logo');
    const heroSection = document.getElementById('inicio');
    
    if (!logo || !heroSection) return;
    
    let isLogoVisible = false;
    
    function checkLogoVisibility() {
        const heroRect = heroSection.getBoundingClientRect();
        const heroHeight = heroRect.height;
        const scrollProgress = Math.abs(heroRect.top) / heroHeight;
        
        // Show logo when scrolled past 60% of hero section
        const shouldShowLogo = scrollProgress > 0.6 || heroRect.bottom < 0;
        
        if (shouldShowLogo && !isLogoVisible) {
            logo.classList.remove('is-hidden');
            logo.classList.add('is-visible');
            isLogoVisible = true;
        } else if (!shouldShowLogo && isLogoVisible) {
            logo.classList.remove('is-visible');
            logo.classList.add('is-hidden');
            isLogoVisible = false;
        }
    }
    
    // Check on scroll
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                checkLogoVisibility();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Initial check
    checkLogoVisibility();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
}

// Carousel functionality
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    
    let currentSlide = 0;
    let isTransitioning = false;
    
    // Auto-play settings
    let autoPlayInterval;
    const autoPlayDelay = 5000; // 5 seconds
    
    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Show target slide
        slides[index].classList.add('active');
        
        currentSlide = index;
        
        // Reset transition flag after animation
        setTimeout(() => {
            isTransitioning = false;
        }, 300);
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            setTimeout(startAutoPlay, 2000); // Restart auto-play after 2 seconds
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            setTimeout(startAutoPlay, 2000); // Restart auto-play after 2 seconds
        });
    }
    
    // Pause auto-play on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoPlay();
    }, { passive: true });
    
    carousel.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', () => {
        const difference = startX - endX;
        const threshold = 50; // Minimum swipe distance
        
        if (Math.abs(difference) > threshold) {
            if (difference > 0) {
                nextSlide(); // Swipe left - next slide
            } else {
                prevSlide(); // Swipe right - previous slide
            }
        }
        
        setTimeout(startAutoPlay, 2000); // Restart auto-play
    }, { passive: true });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!carousel.matches(':hover')) return; // Only when carousel is focused/hovered
        
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoPlay();
            setTimeout(startAutoPlay, 2000);
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoPlay();
            setTimeout(startAutoPlay, 2000);
        }
    });
    
    // Start auto-play
    startAutoPlay();
    
    // Pause auto-play when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });
}

// Timeline functionality
function initTimeline() {
    const timeline = document.querySelector('.cd-horizontal-timeline');
    if (!timeline) return;

    const timelineEvents = timeline.querySelector('.events');
    const timelineContent = timeline.querySelector('.events-content');
    const eventsContent = timelineContent.querySelectorAll('li');
    const fillingLine = timeline.querySelector('.filling-line');
    
    let currentTimelineItem = 0;
    const timelineItems = timeline.querySelectorAll('.events a');
    
    // Initialize timeline
    function initTimelineEvents() {
        // Set initial filling line width
        updateFilling();
        
        // Bind click events to timeline items
        timelineItems.forEach((item, index) => {
            item.addEventListener('click', function(event) {
                event.preventDefault();
                if (index !== currentTimelineItem) {
                    selectTimelineItem(index);
                }
            });
        });
    }

    function selectTimelineItem(index) {
        if (index < 0 || index >= timelineItems.length) return;
        
        // Remove selected class from all items
        timelineItems.forEach(item => item.classList.remove('selected'));
        eventsContent.forEach(content => content.classList.remove('selected'));
        
        // Add selected class to target items
        timelineItems[index].classList.add('selected');
        eventsContent[index].classList.add('selected');
        
        currentTimelineItem = index;
        
        // Update filling line
        updateFilling();
    }

    function updateFilling() {
        const selectedItem = timelineItems[currentTimelineItem];
        const timelineWidth = timelineEvents.offsetWidth;
        const itemLeft = selectedItem.parentElement.offsetLeft;
        const itemWidth = selectedItem.parentElement.offsetWidth;
        const left = itemLeft + itemWidth / 2;
        const scaleValue = left / timelineWidth;
        
        fillingLine.style.transform = `scaleX(${scaleValue})`;
        fillingLine.style.transformOrigin = 'left center';
    }

    // Keyboard navigation (still using arrow keys for accessibility)
    document.addEventListener('keydown', function(event) {
        if (!timeline.matches(':hover')) return;
        
        if (event.key === 'ArrowLeft' && currentTimelineItem > 0) {
            selectTimelineItem(currentTimelineItem - 1);
        } else if (event.key === 'ArrowRight' && currentTimelineItem < timelineItems.length - 1) {
            selectTimelineItem(currentTimelineItem + 1);
        }
    });

    // Auto-play timeline
    let autoPlayInterval;
    const autoPlayDelay = 8000; // 8 seconds

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            const nextIndex = (currentTimelineItem + 1) % timelineItems.length;
            selectTimelineItem(nextIndex);
        }, autoPlayDelay);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    // Pause auto-play on hover
    timeline.addEventListener('mouseenter', stopAutoPlay);
    timeline.addEventListener('mouseleave', startAutoPlay);

    // Initialize everything
    initTimelineEvents();
    
    // Start auto-play after a delay
    setTimeout(startAutoPlay, 3000);

    // Pause auto-play when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            setTimeout(startAutoPlay, 1000);
        }
    });

    // Responsive handling
    function handleResize() {
        updateFilling();
    }

    window.addEventListener('resize', handleResize);
}
