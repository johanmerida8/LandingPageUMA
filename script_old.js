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
        }

        // Load saved theme
        document.addEventListener('DOMContentLoaded', function() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            const themeIcon = document.getElementById('theme-icon');
            
            document.body.setAttribute('data-theme', savedTheme);
            themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header background on scroll
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            const currentTheme = document.body.getAttribute('data-theme');
            
            if (window.scrollY > 100) {
                if (currentTheme === 'dark') {
                    header.style.background = 'rgba(21, 21, 21, 0.98)';
                } else {
                    header.style.background = 'rgba(255, 255, 255, 0.98)';
                }
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                if (currentTheme === 'dark') {
                    header.style.background = 'rgba(21, 21, 21, 0.95)';
                } else {
                    header.style.background = 'rgba(255, 255, 255, 0.95)';
                }
                header.style.boxShadow = 'none';
            }
        });

        // Form submission
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
        });

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

        function showSlide(index) {
            const slides = document.querySelectorAll('.video-slide');
            const dots = document.querySelectorAll('.dot');
            const slidesContainer = document.querySelector('.video-slides');
            const currentVideoSpan = document.getElementById('current-video');
            
            // Ensure index is within bounds
            if (index >= totalSlides) currentSlideIndex = 0;
            if (index < 0) currentSlideIndex = totalSlides - 1;
            
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current slide and dot
            if (slides[currentSlideIndex]) {
                slides[currentSlideIndex].classList.add('active');
            }
            if (dots[currentSlideIndex]) {
                dots[currentSlideIndex].classList.add('active');
            }
            
            // Update video counter
            if (currentVideoSpan) {
                currentVideoSpan.textContent = currentSlideIndex + 1;
            }
            
            // Move the slides container - corrected calculation for 14 slides
            const translateX = -currentSlideIndex * 7.142857; // Each slide is 7.142857% wide (100/14)
            slidesContainer.style.transform = `translateX(${translateX}%)`;
        }

        function changeSlide(direction) {
            currentSlideIndex += direction;
            showSlide(currentSlideIndex);
        }

        function currentSlide(index) {
            currentSlideIndex = index - 1; // Convert to 0-based index
            showSlide(currentSlideIndex);
        }

        // Initialize video slider when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            showSlide(0);
            
            // Add keyboard navigation
            document.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowLeft') {
                    changeSlide(-1);
                } else if (e.key === 'ArrowRight') {
                    changeSlide(1);
                }
            });
        });

        // Touch/Swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        function handleSwipe() {
            const swipeThreshold = 50;
            const difference = touchStartX - touchEndX;
            
            if (Math.abs(difference) > swipeThreshold) {
                if (difference > 0) {
                    changeSlide(1); // Swipe left - next slide
                } else {
                    changeSlide(-1); // Swipe right - previous slide
                }
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            const slider = document.querySelector('.video-slider');
            if (slider) {
                slider.addEventListener('touchstart', function(e) {
                    touchStartX = e.changedTouches[0].screenX;
                });
                
                slider.addEventListener('touchend', function(e) {
                    touchEndX = e.changedTouches[0].screenX;
                    handleSwipe();
                });
            }
        });



        /*language */

        const I18N = {
        es: {
          // Nav / CTA
          nav_inicio: "Inicio",
          nav_nosotros: "Nosotros",
          nav_servicios: "Servicios",
          nav_plataforma: "Plataforma",
          nav_contacto: "Contacto",
          theme_toggle: "Cambiar tema",
          cta_colaborar: "Colaborar",

          // Hero
          hero_title_a: "Llevamos el desarrollo ",
          hero_highlight: "tecnológico",
          hero_title_b: " a un nuevo nivel",
          hero_paragraph:
            "Investigación e innovación en ingeniería biomédica, electrónica y sistemas informáticos para resolver los desafíos del mañana.",
          btn_conocer_mas: "Conocer más",
          btn_ver_plataforma: "Ver plataforma IoT",

          // Stats
          stat_investigadores: "Investigadores",
          stat_proyectos: "Proyectos Completados",
          stat_anios: "Años de Experiencia",
          stat_excelencia: "Excelencia Académica",

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

          // Cards
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

          // Plataforma
          plat_titulo_a: "Plataforma ",
          plat_titulo_b: "IoT",
          plat_desc:
            "Una plataforma integral que conecta sensores, aplicaciones y análisis para crear soluciones inteligentes",

          // Contacto
          contact_titulo_a: "¿Listo para ",
          contact_titulo_b: "colaborar",
          contact_desc:
            "Contáctanos para discutir cómo podemos ayudarte a transformar tu negocio con nuestras soluciones tecnológicas innovadoras.",
          form_nombre_l: "Nombre completo",
          form_email_l: "Correo electrónico",
          form_empresa_l: "Empresa",
          form_mensaje_l: "Mensaje",
          ph_nombre: "Tu nombre",
          ph_email: "tu@email.com",
          ph_empresa: "Tu empresa",
          ph_mensaje: "Cuéntanos sobre tu proyecto...",
          btn_enviar: "Enviar mensaje",

          // Footer
          footer_desc:
            "Unidad de Monitoreo Ambiental - Transformando el futuro a través de la innovación tecnológica.",
          ft_soluciones: "Soluciones",
          ft_iot: "IoT",
          ft_medicas: "Soluciones Médicas",
          ft_agro: "Agroindustria",
          ft_control: "Control Remoto",
          ft_servicios: "Servicios",
          ft_industria: "Industria 4.0",
          ft_medio: "Medio Ambiente",
          ft_block: "Blockchain",
          ft_ia: "Inteligencia Artificial",
          ft_empresa: "Empresa",
          ft_sobre: "Sobre Nosotros",
          ft_contacto: "Contacto",
          ft_proyectos: "Proyectos",
          ft_publicaciones: "Publicaciones",
          copyright:
            "© 2024 UMA - Universidad del Valle. Todos los derechos reservados.",
        },

        en: {
          nav_inicio: "Home",
          nav_nosotros: "About",
          nav_servicios: "Services",
          nav_plataforma: "Platform",
          nav_contacto: "Contact",
          theme_toggle: "Toggle theme",
          cta_colaborar: "Collaborate",

          hero_title_a: "We take technological ",
          hero_highlight: "innovation",
          hero_title_b: " to the next level",
          hero_paragraph:
            "Research and innovation in biomedical engineering, electronics, and computer systems to tackle tomorrow’s challenges.",
          btn_conocer_mas: "Learn more",
          btn_ver_plataforma: "See IoT platform",

          stat_investigadores: "Researchers",
          stat_proyectos: "Completed Projects",
          stat_anios: "Years of Experience",
          stat_excelencia: "Academic Excellence",

          about_titulo_a: "About ",
          about_titulo_b: "Us",
          about_sub:
            "Company for implementing and supporting technology projects to drive our clients’ digital transformation",
          about_p1:
            "UMA develops and supports technology projects to deliver our clients’ digital transformation.",
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

          plat_titulo_a: "IoT ",
          plat_titulo_b: "Platform",
          plat_desc:
            "An end‑to‑end platform connecting sensors, apps, and analytics to build intelligent solutions",

          contact_titulo_a: "Ready to ",
          contact_titulo_b: "collaborate",
          contact_desc:
            "Contact us to discuss how we can help transform your business with innovative technology solutions.",
          form_nombre_l: "Full name",
          form_email_l: "Email",
          form_empresa_l: "Company",
          form_mensaje_l: "Message",
          ph_nombre: "Your name",
          ph_email: "your@email.com",
          ph_empresa: "Your company",
          ph_mensaje: "Tell us about your project...",
          btn_enviar: "Send message",

          footer_desc:
            "Environmental Monitoring Unit – Shaping the future through technological innovation.",
          ft_soluciones: "Solutions",
          ft_iot: "IoT",
          ft_medicas: "Medical Solutions",
          ft_agro: "Agro‑industry",
          ft_control: "Remote Control",
          ft_servicios: "Services",
          ft_industria: "Industry 4.0",
          ft_medio: "Environment",
          ft_block: "Blockchain",
          ft_ia: "Artificial Intelligence",
          ft_empresa: "Company",
          ft_sobre: "About Us",
          ft_contacto: "Contact",
          ft_proyectos: "Projects",
          ft_publicaciones: "Publications",
          copyright: "© 2024 UMA – Universidad del Valle. All rights reserved.",
        },

        pt: {
          nav_inicio: "Início",
          nav_nosotros: "Sobre",
          nav_servicios: "Serviços",
          nav_plataforma: "Plataforma",
          nav_contacto: "Contato",
          theme_toggle: "Alternar tema",
          cta_colaborar: "Colaborar",

          hero_title_a: "Levamos o desenvolvimento ",
          hero_highlight: "tecnológico",
          hero_title_b: " a um novo nível",
          hero_paragraph:
            "Pesquisa e inovação em engenharia biomédica, eletrônica e sistemas computacionais para enfrentar os desafios de amanhã.",
          btn_conocer_mas: "Saiba mais",
          btn_ver_plataforma: "Ver plataforma IoT",

          stat_investigadores: "Pesquisadores",
          stat_proyectos: "Projetos Concluídos",
          stat_anios: "Anos de Experiência",
          stat_excelencia: "Excelência Acadêmica",

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

          plat_titulo_a: "Plataforma ",
          plat_titulo_b: "IoT",
          plat_desc:
            "Uma plataforma completa que conecta sensores, aplicações e análises para criar soluções inteligentes",

          contact_titulo_a: "Pronto para ",
          contact_titulo_b: "colaborar",
          contact_desc:
            "Fale conosco para discutir como podemos transformar seu negócio com soluções tecnológicas inovadoras.",
          form_nombre_l: "Nome completo",
          form_email_l: "E‑mail",
          form_empresa_l: "Empresa",
          form_mensaje_l: "Mensagem",
          ph_nombre: "Seu nome",
          ph_email: "seu@email.com",
          ph_empresa: "Sua empresa",
          ph_mensaje: "Conte-nos sobre seu projeto...",
          btn_enviar: "Enviar mensagem",

          footer_desc:
            "Unidade de Monitoramento Ambiental – Transformando o futuro por meio da inovação tecnológica.",
          ft_soluciones: "Soluções",
          ft_iot: "IoT",
          ft_medicas: "Soluções Médicas",
          ft_agro: "Agroindústria",
          ft_control: "Controle Remoto",
          ft_servicios: "Serviços",
          ft_industria: "Indústria 4.0",
          ft_medio: "Meio Ambiente",
          ft_block: "Blockchain",
          ft_ia: "Inteligência Artificial",
          ft_empresa: "Empresa",
          ft_sobre: "Sobre Nós",
          ft_contacto: "Contato",
          ft_proyectos: "Projetos",
          ft_publicaciones: "Publicações",
          copyright:
            "© 2024 UMA – Universidad del Valle. Todos os direitos reservados.",
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

      (function initI18n() {
        const select = document.getElementById("langSelect");
        const KEY = "lang";

        const saved = localStorage.getItem(KEY) || "es";
        if (select) select.value = saved;
        applyLanguage(saved);

        if (select) {
          select.addEventListener("change", () => {
            const lang = select.value;
            localStorage.setItem(KEY, lang);
            applyLanguage(lang);
          });
        }
      })();
      (function initLangDropdown() {
        const KEY = "lang";
        const trigger = document.getElementById("langTrigger");
        const menu = document.getElementById("langMenu");
        const current = document.getElementById("langCurrent");
        const options = Array.from(menu.querySelectorAll(".lang-option"));

        function setActive(lang) {
          options.forEach((li) => {
            const active = li.dataset.value === lang;
            li.setAttribute("aria-selected", active ? "true" : "false");
            if (active) current.textContent = li.textContent;
          });
        }

        function openMenu(open) {
          trigger.setAttribute("aria-expanded", open ? "true" : "false");
          menu.style.display = open ? "block" : "none";
        }

        // estado inicial
        const saved = localStorage.getItem(KEY) || "es";
        setActive(saved);
        applyLanguage(saved);

        // toggle
        trigger.addEventListener("click", (e) => {
          e.stopPropagation();
          const open = trigger.getAttribute("aria-expanded") !== "true";
          openMenu(open);
        });

        // seleccionar
        options.forEach((li) => {
          li.addEventListener("click", () => {
            const lang = li.dataset.value;
            localStorage.setItem(KEY, lang);
            setActive(lang);
            applyLanguage(lang);
            openMenu(false);
          });
        });

        // cerrar al hacer click fuera o con ESC
        document.addEventListener("click", (e) => {
          if (!e.target.closest(".lang-switch")) openMenu(false);
        });
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") openMenu(false);
        });
      })();

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

          // Contact
          contact_titulo_a: "¿Listo para ",
          contact_titulo_b: "colaborar",
          contact_titulo_c: "?",
          contact_desc:
            "Contáctanos para discutir cómo podemos ayudarte a transformar tu negocio con nuestras soluciones tecnológicas innovadoras.",
          form_nombre_l: "Nombre completo",
          form_email_l: "Correo electrónico",
          form_empresa_l: "Empresa",
          form_mensaje_l: "Mensaje",
          ph_nombre: "Tu nombre",
          ph_email: "tu@email.com",
          ph_empresa: "Tu empresa",
          ph_mensaje: "Cuéntanos sobre tu proyecto...",
          btn_enviar: "Enviar mensaje",

          // Footer
          footer_desc:
            "Unidad de Modelado y Análisis (UMA) es un departamento de investigación de la Universidad Privada del Valle.",
          ft_soluciones: "Soluciones",
          ft_iot: "IoT",
          ft_medicas: "Soluciones Médicas",
          ft_agro: "Agroindustria",
          ft_control: "Control Remoto",
          ft_servicios: "Servicios",
          ft_industria: "Industria 4.0",
          ft_medio: "Medio Ambiente",
          ft_block: "Blockchain",
          ft_ia: "Inteligencia Artificial",
          ft_empresa: "Empresa",
          ft_sobre: "Sobre Nosotros",
          ft_contacto: "Contacto",
          ft_proyectos: "Proyectos",
          ft_publicaciones: "Publicaciones",
          copyright:
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

          contact_titulo_a: "Ready to ",
          contact_titulo_b: "collaborate",
          contact_titulo_c: "?",
          contact_desc:
            "Contact us to discuss how we can help transform your business with innovative technology solutions.",
          form_nombre_l: "Full name",
          form_email_l: "Email",
          form_empresa_l: "Company",
          form_mensaje_l: "Message",
          ph_nombre: "Your name",
          ph_email: "your@email.com",
          ph_empresa: "Your company",
          ph_mensaje: "Tell us about your project...",
          btn_enviar: "Send message",

          footer_desc:
            "Modeling and Analysis Unit (UMA) is a research department of Universidad Privada del Valle.",
          ft_soluciones: "Solutions",
          ft_iot: "IoT",
          ft_medicas: "Medical Solutions",
          ft_agro: "Agro‑industry",
          ft_control: "Remote Control",
          ft_servicios: "Services",
          ft_industria: "Industry 4.0",
          ft_medio: "Environment",
          ft_block: "Blockchain",
          ft_ia: "Artificial Intelligence",
          ft_empresa: "Company",
          ft_sobre: "About Us",
          ft_contacto: "Contact",
          ft_proyectos: "Projects",
          ft_publicaciones: "Publications",
          copyright: "© 2025 UMA – Universidad Privada del Valle. All rights reserved.",
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

          contact_titulo_a: "Pronto para ",
          contact_titulo_b: "colaborar",
          contact_titulo_c: "?",
          contact_desc:
            "Fale conosco para discutir como podemos transformar seu negócio com soluções tecnológicas inovadoras.",
          form_nombre_l: "Nome completo",
          form_email_l: "E‑mail",
          form_empresa_l: "Empresa",
          form_mensaje_l: "Mensagem",
          ph_nombre: "Seu nome",
          ph_email: "seu@email.com",
          ph_empresa: "Sua empresa",
          ph_mensaje: "Conte-nos sobre seu projeto...",
          btn_enviar: "Enviar mensagem",

          footer_desc:
            "Unidade de Modelagem e Análise (UMA) é um departamento de pesquisa da Universidad Privada del Valle.",
          ft_soluciones: "Soluções",
          ft_iot: "IoT",
          ft_medicas: "Soluções Médicas",
          ft_agro: "Agroindústria",
          ft_control: "Controle Remoto",
          ft_servicios: "Serviços",
          ft_industria: "Indústria 4.0",
          ft_medio: "Meio Ambiente",
          ft_block: "Blockchain",
          ft_ia: "Inteligência Artificial",
          ft_empresa: "Empresa",
          ft_sobre: "Sobre Nós",
          ft_contacto: "Contato",
          ft_proyectos: "Projetos",
          ft_publicaciones: "Publicações",
          copyright:
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

      (function initI18n() {
        const KEY = "lang";

        const saved = localStorage.getItem(KEY) || "es";
        applyLanguage(saved);
      })();