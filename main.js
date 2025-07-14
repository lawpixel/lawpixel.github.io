// Script para inicializar particles.js directamente después de su div
window.addEventListener('load', () => {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: "#003366" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#003366", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 3, direction: "none", random: false, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 200, line_linked: { opacity: 0.7 } },
                    repulse: { distance: 100, duration: 0.4 },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
        console.log('Particles.js inicializado correctamente.');
    } else {
        console.error('No se pudo inicializar Particles.js. La librería no está cargada o el elemento #particles-js no existe.');
    }
});

// Tu script principal debe ir después de las librerías que utiliza
import { CountUp } from 'https://cdnjs.cloudflare.com/ajax/libs/countup.js/2.0.7/countUp.min.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 1000, // Duración de la animación
        once: true,    // Animar solo una vez al hacer scroll
    });

    // Lógica para el menú móvil
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden'); // Alternar la visibilidad del menú
        });

        // Cerrar el menú móvil cuando se hace clic en un enlace
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    } else {
        console.warn('Botón o menú móvil no encontrados.');
    }

    // Lógica para el slider personalizado del Hero Section (Nueva implementación)
    const heroSliderImage = document.getElementById('hero-slider-image');
    const heroImages = [
        "/imagen/h1.webp",
        "/imagen/h2.webp",
        "/imagen/h3.webp"
    ];
    const altTexts = [
        "Diseño web moderno para abogado penalista en Valencia",
        "Página web profesional para bufete de derecho civil en Carabobo",
        "Desarrollo web corporativo para LegalTech con enfoque innovador"
    ];
    let currentHeroImageIndex = 0;

    if (heroSliderImage) {
        const updateHeroImage = () => {
            // Iniciar la transición de desvanecimiento (fade out)
            heroSliderImage.style.opacity = '0';

            setTimeout(() => {
                // Cambiar la imagen y el texto alt después del desvanecimiento
                currentHeroImageIndex = (currentHeroImageIndex + 1) % heroImages.length;
                heroSliderImage.src = heroImages[currentHeroImageIndex];
                heroSliderImage.alt = altTexts[currentHeroImageIndex];

                // Iniciar la transición de aparición (fade in)
                heroSliderImage.style.opacity = '1';
            }, 1000); // Duración de la transición CSS (1 segundo)
        };

        // Iniciar el pase de diapositivas después de un breve retraso para la carga inicial
        setTimeout(() => {
            heroSliderImage.style.opacity = '1'; // Asegurar que la primera imagen sea visible
            setInterval(updateHeroImage, 4000); // Cambiar imagen cada 4 segundos (1s fade out + 3s visible)
        }, 500); // Pequeño retraso inicial
        console.log('Nuevo slider del hero inicializado y cargando imágenes.');
    } else {
        console.error('Elemento de imagen del slider del héroe no encontrado (#hero-slider-image).');
    }

    // Lógica para las palabras clave rotativas en el Hero Section (Typed.js-like)
    const typedKeywordElement = document.querySelector('.typed-keyword');
    if (typedKeywordElement) {
        const keywords = typedKeywordElement.dataset.keywords.split('|');
        let keywordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentKeyword = keywords[keywordIndex];
            let displayedText = currentKeyword.substring(0, charIndex);
            typedKeywordElement.textContent = displayedText;

            if (!isDeleting && charIndex < currentKeyword.length) {
                charIndex++;
                setTimeout(type, 100);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, 50);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    keywordIndex = (keywordIndex + 1) % keywords.length;
                }
                setTimeout(type, 1000);
            }
        }
        type(); // Establecer la palabra clave inicial y comenzar el efecto
    }


    // Inicializar Swiper para la sección del Blog
    if (typeof Swiper !== 'undefined') {
        new Swiper('.mySwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            },
        });
    } else {
        console.error('La librería Swiper no está cargada para el slider del blog.');
    }

    // Inicializar CountUp.js para la sección de Números
    // Se envuelve en window.onload para asegurar que la librería esté completamente cargada
    window.addEventListener('load', () => {
        // CountUp es importado como módulo, por lo que está disponible directamente aquí.
        const countUpElements = document.querySelectorAll('.countup');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.target);
                    const prefix = entry.target.dataset.prefix || '';
                    const suffix = entry.target.dataset.suffix || '';
                    const countUp = new CountUp(entry.target, target, {
                        duration: 2.5,
                        prefix: prefix,
                        suffix: suffix,
                        separator: ',',
                        decimal: '.'
                    });
                    if (!countUp.error) {
                        countUp.start();
                    } else {
                        console.error(countUp.error);
                        entry.target.textContent = target + suffix;
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        countUpElements.forEach(el => {
            observer.observe(el);
        });
    });

    // Lógica del acordeón FAQ (usando elementos nativos details/summary)
    document.querySelectorAll('details').forEach(detail => {
        detail.addEventListener('toggle', () => {
            const icon = detail.querySelector('summary i');
            if (icon) {
                if (detail.open) {
                    icon.classList.add('rotate-180');
                } else {
                    icon.classList.add('rotate-0'); // Asegura que vuelva a 0 grados
                    icon.classList.remove('rotate-180');
                }
            }
        });
    });
    // Asegurar que el icono de la primera FAQ abierta rote correctamente al cargar
    const firstOpenDetail = document.querySelector('details[open]');
    if (firstOpenDetail) {
        const icon = firstOpenDetail.querySelector('summary i');
        if (icon) {
            icon.classList.add('rotate-180');
        }
    }
});
