/**
 * PORTAFOLIO WEB - ANTONY ALVITREZ
 * Vanilla JavaScript
 * Funcionalidades:
 * 1. Toggle de menú móvil accesible (animación de hamburguesa a 'X')
 * 2. Sticky Glassmorphism Navbar activado al scroll
 * 3. IntersectionObserver para activar enlaces de navegación
 * 4. Cierre automático del menú móvil al seleccionar enlace o hacer click fuera
 */

document.addEventListener('DOMContentLoaded', () => {
  const siteHeader = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  /* -------------------------------------------------------------------------
   * 1. Navbar Glassmorphism al hacer Scroll
   * ----------------------------------------------------------------------- */
  const handleHeaderScroll = () => {
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  // Comprobación inicial al cargar la página
  handleHeaderScroll();

  /* -------------------------------------------------------------------------
   * 2. Toggle de Menú Móvil (Hamburguesa a 'X')
   * ----------------------------------------------------------------------- */
  const toggleMobileMenu = () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
  };

  const closeMobileMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.classList.remove('active');
    navMenu.classList.remove('open');
  };

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });

    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileMenu();
        menuToggle.focus();
      }
    });
  }

  // Cerrar menú móvil al hacer click en cualquier link de navegación
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  /* -------------------------------------------------------------------------
   * 3. IntersectionObserver para Enlaces Activos en Scroll
   * ----------------------------------------------------------------------- */
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -55% 0px', // Detecta la sección activa en el centro de pantalla
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }
});
