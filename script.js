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
    
    // Initialize language dropdown
    initLangDropdown();
    
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
            
            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
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

function changeSlide(direction) {
    const newIndex = currentSlideIndex + direction;
    showSlide(newIndex);
}

function currentSlide(index) {
    showSlide(index - 1); // Convert to 0-based index
}

// Initialize slider when DOM is ready
// (This will be handled in the main DOMContentLoaded event listener)

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

        // Publications
        publications_titulo_a: "Nuestras ",
        publications_titulo_b: "Publicaciones",
        publications_sub: "Conoce nuestras publicaciones científicas y artículos de investigación más destacados",
        pub_ieee_titulo: "IEEE Research Article",
        pub_ieee_type: "IEEE Xplore",
        pub_fuente: "Fuente:",
        pub_ieee_fuente: "IEEE Xplore Digital Library",
        pub_año: "Año:",
        pub_doi: "DOI:",
        pub_ieee_desc: "Accede a este artículo científico de investigación disponible en la biblioteca digital IEEE Xplore.",
        pub_ver: "Ver Publicación",

        // Contact
        contact_titulo_a: "¿Listo para ",
        contact_titulo_b: "colaborar",
        contact_titulo_c: "?",
        contact_desc:
            "Contáctanos para discutir cómo podemos ayudarte a transformar tu negocio con nuestras soluciones tecnológicas innovadoras.",
        contact_direccion: "Campus Univalle, Av. Argentina #2083, Cochabamba, Bolivia",
        contact_nombre_label: "Nombre completo",
        contact_email_label: "Correo electrónico", 
        contact_empresa_label: "Empresa",
        contact_mensaje_label: "Mensaje",
        contact_nombre_placeholder: "Tu nombre",
        contact_email_placeholder: "tu@email.com",
        contact_empresa_placeholder: "Tu empresa",
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
        footer_medio_ambiente: "Medio Ambiente",
        footer_blockchain: "Blockchain",
        footer_ia: "Inteligencia Artificial",
        footer_empresa: "Empresa",
        footer_sobre_nosotros: "Sobre Nosotros",
        footer_contacto: "Contacto",
        footer_proyectos: "Proyectos",
        footer_publicaciones: "Publicaciones",
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

        publications_titulo_a: "Our ",
        publications_titulo_b: "Publications",
        publications_sub: "Learn about our featured scientific publications and research articles",
        pub_ieee_titulo: "IEEE Research Article",
        pub_ieee_type: "IEEE Xplore",
        pub_fuente: "Source:",
        pub_ieee_fuente: "IEEE Xplore Digital Library",
        pub_año: "Year:",
        pub_doi: "DOI:",
        pub_ieee_desc: "Access this research article available in the IEEE Xplore digital library.",
        pub_ver: "View Publication",

        contact_titulo_a: "Ready to ",
        contact_titulo_b: "collaborate",
        contact_titulo_c: "?",
        contact_desc:
            "Contact us to discuss how we can help transform your business with innovative technology solutions.",
        contact_direccion: "Campus Univalle, Av. Argentina #2083, Cochabamba, Bolivia",
        contact_nombre_label: "Full name",
        contact_email_label: "Email",
        contact_empresa_label: "Company",
        contact_mensaje_label: "Message",
        contact_nombre_placeholder: "Your name",
        contact_email_placeholder: "your@email.com",
        contact_empresa_placeholder: "Your company",
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
        footer_medio_ambiente: "Environment",
        footer_blockchain: "Blockchain",
        footer_ia: "Artificial Intelligence",
        footer_empresa: "Company",
        footer_sobre_nosotros: "About Us",
        footer_contacto: "Contact",
        footer_proyectos: "Projects",
        footer_publicaciones: "Publications",
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

        publications_titulo_a: "Nossas ",
        publications_titulo_b: "Publicações",
        publications_sub: "Conheça nossas publicações científicas e artigos de pesquisa mais destacados",
        pub_ieee_titulo: "Artigo de Pesquisa IEEE",
        pub_ieee_type: "IEEE Xplore",
        pub_fuente: "Fonte:",
        pub_ieee_fuente: "Biblioteca Digital IEEE Xplore",
        pub_año: "Ano:",
        pub_doi: "DOI:",
        pub_ieee_desc: "Acesse este artigo científico disponível na biblioteca digital IEEE Xplore.",
        pub_ver: "Ver Publicação",

        contact_titulo_a: "Pronto para ",
        contact_titulo_b: "colaborar",
        contact_titulo_c: "?",
        contact_desc:
            "Fale conosco para discutir como podemos transformar seu negócio com soluções tecnológicas inovadoras.",
        contact_direccion: "Campus Univalle, Av. Argentina #2083, Cochabamba, Bolívia",
        contact_nombre_label: "Nome completo",
        contact_email_label: "E-mail",
        contact_empresa_label: "Empresa",
        contact_mensaje_label: "Mensagem",
        contact_nombre_placeholder: "Seu nome",
        contact_email_placeholder: "seu@email.com",
        contact_empresa_placeholder: "Sua empresa",
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
        footer_medio_ambiente: "Meio Ambiente",
        footer_blockchain: "Blockchain",
        footer_ia: "Inteligência Artificial",
        footer_empresa: "Empresa",
        footer_sobre_nosotros: "Sobre Nós",
        footer_contacto: "Contato",
        footer_proyectos: "Projetos",
        footer_publicaciones: "Publicações",
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
