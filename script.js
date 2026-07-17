document.addEventListener("DOMContentLoaded", () => {
    
    // 1. INTERACTIVIDAD DE TARJETAS DESPLEGABLES (COMBOS)
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
            
            document.querySelectorAll(".accordion-menu").forEach(otherMenu => {
                if (otherMenu !== menu) {
                    otherMenu.classList.remove("active");
                }
            });

            menu.classList.toggle("active");
        });
    });

    // 3. EFECTO DINÁMICO HOVER TILT 3D (Inclinación física interactiva)
    const tiltElements = document.querySelectorAll("[data-tilt]");
    
    tiltElements.forEach(el => {
        el.addEventListener("mousemove", (e) => {
            if (window.innerWidth <= 900) return;

            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
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
    const particleCount = 15; 

    if (particlesContainer) {
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.classList.add("particle");
            
            const size = Math.random() * 80 + 30; 
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 8}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`; 
            
            particlesContainer.appendChild(particle);
        }
    }

    // 5. SCROLL REVEAL (Animaciones elegantes al bajar en la página)
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

    // 6. CONTROL DEL MENÚ DESPLEGABLE (NAVBAR DROPDOWN)
    const dropdown = document.querySelector(".nav-dropdown");
    const dropdownTrigger = document.querySelector(".dropdown-trigger");
    const dropdownItems = document.querySelectorAll(".dropdown-item");

    if (dropdown && dropdownTrigger) {
        dropdownTrigger.addEventListener("click", (e) => {
            e.stopPropagation(); 
            const isActive = dropdown.classList.contains("active");
            dropdown.classList.toggle("active");
            dropdownTrigger.setAttribute("aria-expanded", !isActive);
        });

        dropdownItems.forEach(item => {
            item.addEventListener("click", () => {
                dropdown.classList.remove("active");
                dropdownTrigger.setAttribute("aria-expanded", "false");
            });
        });

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
        card.addEventListener("click", (e) => {
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

    // 8. CONTROL INDEPENDIENTE DE CADA SLIDER DE GALERÍA
    const galleryContainers = document.querySelectorAll(".gallery-slider-container");

    galleryContainers.forEach((container) => {
        const slides = container.querySelectorAll(".gallery-slide");
        const dots = container.querySelectorAll(".dot");
        const prevBtn = container.querySelector(".prev-btn");
        const nextBtn = container.querySelector(".next-btn");
        const track = container.querySelector(".gallery-track");
        
        let currentIndex = 0;
        const totalSlides = slides.length;

        if (totalSlides === 0) return;

        // Función para actualizar el slide visible de ESTA galería en particular
        function updateSlider(index) {
            if (index >= totalSlides) currentIndex = 0;
            else if (index < 0) currentIndex = totalSlides - 1;
            else currentIndex = index;

            // Cambiar clases activas en las diapositivas de este contenedor
            slides.forEach((slide, i) => {
                if (i === currentIndex) {
                    slide.classList.add("active");
                } else {
                    slide.classList.remove("active");
                }
            });

            // Cambiar clases activas en los indicadores de este contenedor
            dots.forEach((dot, i) => {
                if (i === currentIndex) {
                    dot.classList.add("active");
                } else {
                    dot.classList.remove("active");
                }
            });
        }

        // Eventos de click en botones (si existen en el contenedor)
        if (nextBtn) {
            nextBtn.addEventListener("click", () => updateSlider(currentIndex + 1));
        }
        if (prevBtn) {
            prevBtn.addEventListener("click", () => updateSlider(currentIndex - 1));
        }

        // Eventos de click en los puntos de este contenedor específico
        dots.forEach((dot) => {
            dot.addEventListener("click", (e) => {
                const targetIndex = parseInt(e.target.getAttribute("data-index"));
                updateSlider(targetIndex);
            });
        });

        // Soporte táctil móvil aislado por contenedor
        if (track) {
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
                const threshold = 50; 
                if (touchStartX - touchEndX > threshold) {
                    updateSlider(currentIndex + 1); // Deslizó a la izquierda -> Siguiente
                } else if (touchEndX - touchStartX > threshold) {
                    updateSlider(currentIndex - 1); // Deslizó a la derecha -> Anterior
                }
            }
        }
    });
});
