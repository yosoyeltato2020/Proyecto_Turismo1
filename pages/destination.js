
/* =========================================
   THE PERFECT TRIP - DESTINATION JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // MOBILE NAVIGATION
    // =====================================

    const menuButton = document.getElementById(
        "destination-menu-toggle"
    );

    const navLinks = document.getElementById(
        "destination-links"
    );

    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuButton.textContent = isOpen ? "×" : "☰";

        });

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.textContent = "☰";

            });

        });

    }


    // =====================================
    // INTERACTIVE INFORMATION PANELS
    // =====================================

    const detailButtons = document.querySelectorAll(
        ".details-button"
    );

    detailButtons.forEach(button => {

        button.addEventListener("click", () => {

            const panelId = button.dataset.panel;
            const panel = document.getElementById(panelId);

            if (!panel) return;

            const isExpanded =
                button.getAttribute("aria-expanded") === "true";

            panel.hidden = isExpanded;

            button.setAttribute(
                "aria-expanded",
                String(!isExpanded)
            );

            button.querySelector("span").textContent =
                isExpanded ? "＋" : "−";

            button.childNodes[0].textContent =
                isExpanded ? "DISCOVER MORE " : "SHOW LESS ";

            if (!isExpanded) {

                setTimeout(() => {

                    panel.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                    });

                }, 100);

            }

        });

    });


    // =====================================
    // SCROLL REVEAL ANIMATIONS
    // =====================================

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    // =====================================
    // IMAGE LIGHTBOX
    // =====================================

    const lightbox = document.getElementById(
        "destination-lightbox"
    );

    const lightboxImage = document.getElementById(
        "lightbox-photo"
    );

    const closeLightboxButton = document.getElementById(
        "lightbox-close"
    );

    const galleryImages = document.querySelectorAll(
        ".lightbox-trigger"
    );

    function openLightbox(image) {

        if (!lightbox || !lightboxImage) return;

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightbox.classList.add("open");

        lightbox.setAttribute("aria-hidden", "false");

        document.body.classList.add("lightbox-open");

    }


    function closeLightbox() {

        if (!lightbox || !lightboxImage) return;

        lightbox.classList.remove("open");

        lightbox.setAttribute("aria-hidden", "true");

        document.body.classList.remove("lightbox-open");

        lightboxImage.src = "";

    }


    galleryImages.forEach(image => {

        image.addEventListener("click", () => {
            openLightbox(image);
        });

    });


    if (closeLightboxButton) {

        closeLightboxButton.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener("click", event => {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });

    }


    // Close image with ESC key

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeLightbox();
        }

    });


    // =====================================
    // IMAGE LOAD CHECK
    // =====================================

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener("error", () => {

            image.classList.add("image-error");

            console.warn(
                "Could not load image:",
                image.src
            );

        });

    });


    console.log(
        "THE PERFECT TRIP - Destination page loaded successfully."
    );

});
