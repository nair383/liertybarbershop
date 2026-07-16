document.addEventListener("DOMContentLoaded", () => {
    
    // 1. INTERACTIVIDAD DE TARJETAS DESPLEGABLES (COMBOS) - Corrección de selector .combo-card-new[cite: 3]
    const toggleButtons = document.querySelectorAll(".toggle-details-btn");

    toggleButtons.forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".combo-card-new");
            const btnText = button.querySelector("span");

            if (card) {
                card.classList.toggle("active");

                if (card.classList.contains("active")) {
                    btnText.textContent = "Ocultar detalles";
                } else {
                    btnText.textContent = "Ver detalles";
                }
            }
        });
    });

    // 2. INTERACTIVIDAD DE LOS MENÚS ACORDEÓN DESPLEGABLES
    const accordionTriggers = document.querySelectorAll(".accordion-trigger");

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const menu = trigger.parentElement;
            
            // Cerrar otros acordeones si se desea comportamiento único (opcional)
            document.querySelectorAll(".accordion-menu").forEach(otherMenu => {
                if (otherMenu !== menu) {
                    otherMenu.classList.remove("active");
                }
            });

            menu.classList.toggle("active");
        });
    });

    // 3. EFECTO DINÁMICO HOVER TILT 3D (Efecto de inclinación)
    const tiltElements = document.querySelectorAll("[data-tilt]");
    
    tiltElements.forEach(el => {
        el.addEventListener("mousemove", (e) => {
            // No activar transformaciones físicas si la pantalla es de móvil (optimización de rendimiento y desbordamiento)[cite: 3]
            if (window.innerWidth <= 900) return;

            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left; // posición X del cursor dentro del elemento[cite: 3]
            const y = e.clientY - rect.top;  // posición Y del cursor dentro del elemento[cite: 3]
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Grados máximos de rotación
            const maxRotate = 8; 
            
            const rotateX = ((centerY - y) / centerY) * maxRotate;
            const rotateY = ((x - centerX) / centerX) * maxRotate;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        el.addEventListener("mouseleave", () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // 4. GENERADOR DE PARTÍCULAS DE BRILLO FLOTANTES (Fondo)
    const particlesContainer = document.getElementById("particles-container");
    const particleCount = 15; // Mantener bajo para excelente rendimiento[cite: 3]

    if (particlesContainer) {
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.classList.add("particle");
            
            // Estilos aleatorios para variabilidad orgánica[cite: 3]
            const size = Math.random() * 80 + 30; // entre 30px y 110px[cite: 3]
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 8}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`; // de 10s a 20s[cite: 3]
            
            particlesContainer.appendChild(particle);
        }
    }

    // 5. SCROLL REVEAL (Animación elegante al deslizar con la adición del mapa)
    const interactiveElements = document.querySelectorAll(".combo-card-new, .accordion-menu, .info-box, .map-container");
    
    interactiveElements.forEach(el => {
        el.classList.add("reveal");
    });

    const checkReveal = () => {
        const triggerPoint = window.innerHeight * 0.88;

        interactiveElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < triggerPoint) {
                el.classList.add("visible");
            }
        });
    };

    window.addEventListener("scroll", checkReveal);
    checkReveal();
});

// 6. CONTROL DEL MENÚ DESPLEGABLE (NAVBAR DROPDOWN)
const dropdown = document.querySelector(".nav-dropdown");
const dropdownTrigger = document.querySelector(".dropdown-trigger");
const dropdownItems = document.querySelectorAll(".dropdown-item");

if (dropdown && dropdownTrigger) {
    // Alternar el menú al hacer clic en el botón[cite: 3]
    dropdownTrigger.addEventListener("click", (e) => {
        e.stopPropagation(); // Evita que se propague el clic al document[cite: 3]
        const isActive = dropdown.classList.contains("active");
        dropdown.classList.toggle("active");
        dropdownTrigger.setAttribute("aria-expanded", !isActive);
    });

    // Cerrar menú al hacer clic en cualquier opción[cite: 3]
    dropdownItems.forEach(item => {
        item.addEventListener("click", () => {
            dropdown.classList.remove("active");
            dropdownTrigger.setAttribute("aria-expanded", "false");
        });
    });

    // Cerrar el menú si el usuario hace clic en cualquier otra parte de la pantalla[cite: 3]
    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove("active");
            dropdownTrigger.setAttribute("aria-expanded", "false");
        }
    });
}

// 7. INTERACTIVIDAD DE TARJETAS DE BARBEROS DESPLEGABLES
const barberCards = document.querySelectorAll(".barber-card-collapsible");

barberCards.forEach(card => {
    // Permitimos el toggle tanto haciendo clic en la tarjeta entera como en su botón[cite: 3]
    card.addEventListener("click", (e) => {
        // Si hacen clic directo en el enlace de reservar (WhatsApp), no cerramos la tarjeta[cite: 3]
        if (e.target.closest(".barber-wsp-btn")) return;

        const button = card.querySelector(".barber-toggle-btn");
        const btnText = button.querySelector("span");

        card.classList.toggle("active");

        if (card.classList.contains("active")) {
            btnText.textContent = "Ocultar";
        } else {
            btnText.textContent = "Ver más";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".gallery-slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const track = document.querySelector(".gallery-track");
    
    let currentIndex = 0;
    const totalSlides = slides.length;

    // Función para actualizar el slide visible
    function updateSlider(index) {
        // Asegurar que el index esté en el rango correcto
        if (index >= totalSlides) currentIndex = 0;
        else if (index < 0) currentIndex = totalSlides - 1;
        else currentIndex = index;

        // Cambiar clases activas en las diapositivas
        slides.forEach((slide, i) => {
            if (i === currentIndex) {
                slide.classList.add("active");
            } else {
                slide.classList.remove("active");
            }
        });

        // Cambiar clases activas en los puntos indicadores
        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }

    // Eventos de botones
    nextBtn.addEventListener("click", () => updateSlider(currentIndex + 1));
    prevBtn.addEventListener("click", () => updateSlider(currentIndex - 1));

    // Eventos de click en los puntos indicadores
    dots.forEach((dot) => {
        dot.addEventListener("click", (e) => {
            const targetIndex = parseInt(e.target.getAttribute("data-index"));
            updateSlider(targetIndex);
        });
    });

    // --- SOPORTE TÁCTIL (Deslizar con el dedo) ---
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50; // Sensibilidad de deslizamiento mínima en píxeles
        if (touchStartX - touchEndX > threshold) {
            // Deslizó hacia la izquierda -> Siguiente
            updateSlider(currentIndex + 1);
        } else if (touchEndX - touchStartX > threshold) {
            // Deslizó hacia la derecha -> Anterior
            updateSlider(currentIndex - 1);
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".gallery-slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const track = document.querySelector(".gallery-track");
    
    let currentIndex = 0;
    const totalSlides = slides.length;

    // Función para actualizar el slide visible
    function updateSlider(index) {
        // Asegurar que el index esté en el rango correcto
        if (index >= totalSlides) currentIndex = 0;
        else if (index < 0) currentIndex = totalSlides - 1;
        else currentIndex = index;

        // Cambiar clases activas en las diapositivas
        slides.forEach((slide, i) => {
            if (i === currentIndex) {
                slide.classList.add("active");
            } else {
                slide.classList.remove("active");
            }
        });

        // Cambiar clases activas en los puntos indicadores
        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }

    // Eventos de botones
    nextBtn.addEventListener("click", () => updateSlider(currentIndex + 1));
    prevBtn.addEventListener("click", () => updateSlider(currentIndex - 1));

    // Eventos de click en los puntos indicadores
    dots.forEach((dot) => {
        dot.addEventListener("click", (e) => {
            const targetIndex = parseInt(e.target.getAttribute("data-index"));
            updateSlider(targetIndex);
        });
    });

    // --- SOPORTE TÁCTIL (Deslizar con el dedo) ---
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50; // Sensibilidad de deslizamiento mínima en píxeles
        if (touchStartX - touchEndX > threshold) {
            // Deslizó hacia la izquierda -> Siguiente
            updateSlider(currentIndex + 1);
        } else if (touchEndX - touchStartX > threshold) {
            // Deslizó hacia la derecha -> Anterior
            updateSlider(currentIndex - 1);
        }
    }
});