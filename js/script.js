
// ==========================================
// PLANNER WEBSITE - JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // 1. MOBILE NAVIGATION
    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector("#mainNav");

    if (menuButton && nav) {

        menuButton.addEventListener("click", function () {

            const isOpen = nav.classList.toggle("open");

            menuButton.setAttribute("aria-expanded", String(isOpen));

            menuButton.textContent = isOpen ? "×" : "☰";

        });

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", function () {

                nav.classList.remove("open");

                menuButton.setAttribute("aria-expanded", "false");

                menuButton.textContent = "☰";

            });

        });

    }


    // 2. SCROLL REVEAL ANIMATION
    // Elements animate when entering and leaving viewport.

    const revealTargets = document.querySelectorAll(
        ".scroll-reveal, .feature-item, .journal-image, .journal-center, .stat-item"
    );

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            const element = entry.target;

            if (entry.isIntersecting) {

                if (element.classList.contains("scroll-reveal")) {
                    element.classList.add("visible");
                }

                if (
                    element.classList.contains("feature-item") ||
                    element.classList.contains("journal-image") ||
                    element.classList.contains("journal-center") ||
                    element.classList.contains("stat-item")
                ) {
                    element.classList.add("show");
                }

            } else {

                if (element.classList.contains("scroll-reveal")) {
                    element.classList.remove("visible");
                }

                if (
                    element.classList.contains("feature-item") ||
                    element.classList.contains("journal-image") ||
                    element.classList.contains("journal-center") ||
                    element.classList.contains("stat-item")
                ) {
                    element.classList.remove("show");
                }

            }

        });

    }, {
        threshold: 0.14,
        rootMargin: "0px 0px -45px 0px"
    });

    revealTargets.forEach(element => {
        revealObserver.observe(element);
    });


    // 3. HERO IMAGE PARALLAX ANIMATION

    const heroImage = document.querySelector(".hero-image");

    let ticking = false;

    if (heroImage) {

        window.addEventListener("scroll", function () {

            if (!ticking) {

                window.requestAnimationFrame(function () {

                    const y = Math.min(window.scrollY, 650);

                    heroImage.style.transform =
                        `scale(1.045) translateY(${y * 0.10}px)`;

                    ticking = false;

                });

                ticking = true;

            }

        }, { passive: true });

    }


    // 4. MOUSE MOVEMENT BACKGROUND EFFECT

    const featuresSection = document.querySelector(".features-section");

    if (
        featuresSection &&
        window.matchMedia("(hover: hover)").matches
    ) {

        featuresSection.addEventListener("mousemove", function (event) {

            const rect = featuresSection.getBoundingClientRect();

            featuresSection.style.setProperty(
                "--mouse-x",
                `${event.clientX - rect.left}px`
            );

            featuresSection.style.setProperty(
                "--mouse-y",
                `${event.clientY - rect.top}px`
            );

        });

    }


    // 5. ANIMATED STATISTICS COUNTER

    const counters = document.querySelectorAll(
        ".stat-number [data-count]"
    );

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(counter.dataset.count);

            const suffix = counter.dataset.suffix || "";

            const duration = 1800;

            const startTime = performance.now();

            function updateCounter(currentTime) {

                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                const easedProgress = 1 - Math.pow(1 - progress, 4);

                counter.textContent =
                    `${Math.floor(target * easedProgress)}${suffix}`;

                if (progress < 1) {

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = `${target}${suffix}`;

                }

            }

            requestAnimationFrame(updateCounter);

            counterObserver.unobserve(counter);

        });

    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

});
