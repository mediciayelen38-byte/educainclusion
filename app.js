// app.js - Motor central del sitio web de recursos

// 1. Inicialización de la Base de Datos en LocalStorage
function initDatabase() {
    if (!localStorage.getItem('guia_data')) {
        localStorage.setItem('guia_data', JSON.stringify(INITIAL_DATA));
    }
    
    // Inicializar comentarios del foro si no existen
    if (!localStorage.getItem('foro_comentarios')) {
        const defaultComments = [
            {
                id: "c-1",
                nombre: "Prof. Carlos Mendoza",
                rol: "Docente de Ingeniería",
                tema: "DUA",
                mensaje: "Implementé la flexibilización de exámenes (opción oral/escrita) en mi cátedra de Álgebra y el desempeño de dos estudiantes con TDAH mejoró notablemente. ¡Altamente recomendable!",
                fecha: "2026-07-10T14:30:00.000Z"
            },
            {
                id: "c-2",
                nombre: "Lic. Clara Gómez",
                rol: "Orientadora Vocacional",
                tema: "Dificultades",
                mensaje: "Para los alumnos con dislexia, el uso de textos con tipografía limpia y espaciada en el campus virtual marca una gran diferencia. Les reduce la fatiga visual al leer.",
                fecha: "2026-07-12T09:15:00.000Z"
            }
        ];
        localStorage.setItem('foro_comentarios', JSON.stringify(defaultComments));
    }
}

function getDatabase() {
    initDatabase();
    return JSON.parse(localStorage.getItem('guia_data'));
}

function saveDatabase(data) {
    localStorage.setItem('guia_data', JSON.stringify(data));
    window.dispatchEvent(new Event('storage'));
}

// Helpers para el Foro
function getForoComments() {
    initDatabase();
    return JSON.parse(localStorage.getItem('foro_comentarios'));
}

function saveForoComments(comments) {
    localStorage.setItem('foro_comentarios', JSON.stringify(comments));
}

// 2. Generación Dinámica de Header y Footer
function injectHeaderAndFooter() {
    const navPlaceholder = document.getElementById('nav-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    const currentPath = window.location.pathname;
    const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

    if (navPlaceholder) {
        navPlaceholder.innerHTML = `
        <nav>
            <div class="container nav-container">
                <a href="index.html" class="logo">
                    <span class="logo-icon">📚</span>
                    <span>EducaInclusión</span>
                </a>
                
                <!-- Selector de Idioma Google Translate -->
                <div id="google_translate_element" class="translate-widget-nav"></div>

                <ul class="nav-links" id="nav-links">
                    <li><a href="index.html" class="${filename === 'index.html' ? 'active' : ''}">Inicio</a></li>
                    <li><a href="inclusion-educativa.html" class="${filename === 'inclusion-educativa.html' ? 'active' : ''}">Inclusión</a></li>
                    <li><a href="dificultades-aprendizaje.html" class="${filename === 'dificultades-aprendizaje.html' ? 'active' : ''}">Dificultades</a></li>
                    <li><a href="orientacion-tecnicas-estudio.html" class="${filename === 'orientacion-tecnicas-estudio.html' ? 'active' : ''}">Técnicas</a></li>
                    <li><a href="investigacion-cualitativa.html" class="${filename === 'investigacion-cualitativa.html' ? 'active' : ''}">Investigación</a></li>
                    <li><a href="directorio-global.html" class="${filename === 'directorio-global.html' ? 'active' : ''}">Directorio</a></li>
                    <li><a href="foro.html" class="${filename === 'foro.html' ? 'active' : ''}">Foro</a></li>
                    <li><a href="recursos-descargables.html" class="${filename === 'recursos-descargables.html' ? 'active' : ''}">Descargas</a></li>
                    <li><a href="admin.html" class="${filename === 'admin.html' ? 'active' : ''}">Admin</a></li>
                </ul>
                <div class="nav-controls">
                    <button class="btn-a11y-toggle" id="a11y-toggle-btn" title="Opciones de Accesibilidad" aria-label="Abrir panel de accesibilidad">♿</button>
                    <button class="burger" id="mobile-burger" aria-label="Abrir menú de navegación">
                        <div></div>
                        <div></div>
                        <div></div>
                    </button>
                </div>
            </div>
        </nav>
        
        <!-- Panel Flotante de Accesibilidad (Drawer) -->
        <div class="a11y-drawer" id="a11y-drawer">
            <div class="a11y-drawer-header">
                <h3>Accesibilidad</h3>
                <button class="btn-close-drawer" id="close-a11y-drawer">&times;</button>
            </div>
            
            <div class="a11y-group">
                <h4>Tamaño de Texto</h4>
                <div class="a11y-options-grid">
                    <button class="a11y-btn" id="font-size-sm" data-size="sm">Pequeño</button>
                    <button class="a11y-btn" id="font-size-md" data-size="md">Medio</button>
                    <button class="a11y-btn" id="font-size-lg" data-size="lg">Grande</button>
                </div>
            </div>
            
            <div class="a11y-group">
                <h4>Fuente Dislexia</h4>
                <div class="a11y-toggle-row">
                    <span>Activar Comic/Dyslexic</span>
                    <label class="switch">
                        <input type="checkbox" id="toggle-dyslexic">
                        <span class="slider"></span>
                    </label>
                </div>
            </div>

            <div class="a11y-group">
                <h4>Alto Contraste</h4>
                <div class="a11y-toggle-row">
                    <span>Modo Contraste Alto</span>
                    <label class="switch">
                        <input type="checkbox" id="toggle-contrast">
                        <span class="slider"></span>
                    </label>
                </div>
            </div>
            
            <div style="margin-top: auto; font-size: 0.8rem; color: var(--text-muted); text-align: center;">
                Las preferencias se guardarán en tu navegador para todas las páginas del sitio.
            </div>
        </div>
        `;
    }

    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
        <footer>
            <div class="container footer-grid">
                <div>
                    <h3>EducaInclusión</h3>
                    <p>Una biblioteca completa de recursos pedagógicos, guías prácticas y referencias globales para construir una universidad sin barreras de aprendizaje.</p>
                </div>
                <div>
                    <h4>Secciones</h4>
                    <ul>
                        <li><a href="inclusion-educativa.html">Inclusión Educativa</a></li>
                        <li><a href="dificultades-aprendizaje.html">Dificultades de Aprendizaje</a></li>
                        <li><a href="orientacion-tecnicas-estudio.html">Técnicas de Estudio</a></li>
                        <li><a href="investigacion-cualitativa.html">Investigación Cualitativa</a></li>
                    </ul>
                </div>
                <div>
                    <h4>Recursos</h4>
                    <ul>
                        <li><a href="directorio-global.html">Directorio Global</a></li>
                        <li><a href="foro.html">Foro de Experiencias</a></li>
                        <li><a href="recursos-descargables.html">Material Descargable</a></li>
                        <li><a href="contacto.html">Contacto y Soporte</a></li>
                        <li><a href="admin.html">Panel de Creador</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 EducaInclusión | Recursos Pedagógicos Universitarios. Creado con fines de inclusión educativa.</p>
            </div>
        </footer>
        `;
    }

    // Inicializar manejadores de eventos del Header recién inyectado
    initHeaderEvents();
    
    // Inyectar el script de Google Translate dinámicamente
    loadGoogleTranslateScript();
}

// Carga dinámica del script de Google Translate
function loadGoogleTranslateScript() {
    if (!document.getElementById('google-translate-script')) {
        // Definir la callback en window para Google Translate
        window.googleTranslateElementInit = function() {
            new google.translate.TranslateElement({
                pageLanguage: 'es',
                includedLanguages: 'en,es,fr,pt,it,de,zh-CN,ar',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
            }, 'google_translate_element');
        };

        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.type = 'text/javascript';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);
    }
}

// 3. Configuración de Eventos del Menú y de Accesibilidad (A11y)
function initHeaderEvents() {
    const burger = document.getElementById('mobile-burger');
    const navLinks = document.getElementById('nav-links');
    const a11yToggle = document.getElementById('a11y-toggle-btn');
    const a11yDrawer = document.getElementById('a11y-drawer');
    const closeA11y = document.getElementById('close-a11y-drawer');
    
    // Controles de Accesibilidad
    const btnSm = document.getElementById('font-size-sm');
    const btnMd = document.getElementById('font-size-md');
    const btnLg = document.getElementById('font-size-lg');
    const chkDyslexic = document.getElementById('toggle-dyslexic');
    const chkContrast = document.getElementById('toggle-contrast');

    // Menú Móvil
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }

    // Cajón de Accesibilidad
    if (a11yToggle && a11yDrawer) {
        a11yToggle.addEventListener('click', () => {
            a11yDrawer.classList.toggle('open');
        });
    }

    if (closeA11y && a11yDrawer) {
        closeA11y.addEventListener('click', () => {
            a11yDrawer.classList.remove('open');
        });
    }

    // Aplicar estado inicial de accesibilidad desde LocalStorage
    applyAccessibilitySettings();

    // Eventos de botones de tamaño de fuente
    const setFontSize = (size) => {
        document.body.classList.remove('a11y-text-sm', 'a11y-text-md', 'a11y-text-lg');
        document.body.classList.add(`a11y-text-${size}`);
        localStorage.setItem('a11y_text_size', size);
        updateFontSizeButtons(size);
    };

    if (btnSm) btnSm.addEventListener('click', () => setFontSize('sm'));
    if (btnMd) btnMd.addEventListener('click', () => setFontSize('md'));
    if (btnLg) btnLg.addEventListener('click', () => setFontSize('lg'));

    // Evento de Dislexia
    if (chkDyslexic) {
        chkDyslexic.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('a11y-dyslexic');
                localStorage.setItem('a11y_dyslexic', 'true');
            } else {
                document.body.classList.remove('a11y-dyslexic');
                localStorage.setItem('a11y_dyslexic', 'false');
            }
        });
    }

    // Evento de Alto Contraste
    if (chkContrast) {
        chkContrast.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('a11y-contrast');
                localStorage.setItem('a11y_contrast', 'true');
            } else {
                document.body.classList.remove('a11y-contrast');
                localStorage.setItem('a11y_contrast', 'false');
            }
        });
    }
}

// Aplicar los ajustes visuales guardados
function applyAccessibilitySettings() {
    const savedSize = localStorage.getItem('a11y_text_size') || 'sm';
    const savedDyslexic = localStorage.getItem('a11y_dyslexic') === 'true';
    const savedContrast = localStorage.getItem('a11y_contrast') === 'true';

    document.body.classList.remove('a11y-text-sm', 'a11y-text-md', 'a11y-text-lg');
    document.body.classList.add(`a11y-text-${savedSize}`);
    updateFontSizeButtons(savedSize);

    const chkDyslexic = document.getElementById('toggle-dyslexic');
    if (savedDyslexic) {
        document.body.classList.add('a11y-dyslexic');
        if (chkDyslexic) chkDyslexic.checked = true;
    } else {
        document.body.classList.remove('a11y-dyslexic');
        if (chkDyslexic) chkDyslexic.checked = false;
    }

    const chkContrast = document.getElementById('toggle-contrast');
    if (savedContrast) {
        document.body.classList.add('a11y-contrast');
        if (chkContrast) chkContrast.checked = true;
    } else {
        document.body.classList.remove('a11y-contrast');
        if (chkContrast) chkContrast.checked = false;
    }
}

function updateFontSizeButtons(activeSize) {
    const btnSm = document.getElementById('font-size-sm');
    const btnMd = document.getElementById('font-size-md');
    const btnLg = document.getElementById('font-size-lg');

    if (btnSm) btnSm.classList.remove('active');
    if (btnMd) btnMd.classList.remove('active');
    if (btnLg) btnLg.classList.remove('active');

    const activeBtn = document.getElementById(`font-size-${activeSize}`);
    if (activeBtn) activeBtn.classList.add('active');
}

// Ejecutar al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    initDatabase();
    injectHeaderAndFooter();
});
