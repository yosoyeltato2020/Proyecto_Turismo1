/* =========================================
   THE PERFECT TRIP
   TRANSPORT & ACCOMMODATION
   JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. EXPANDABLE INFORMATION
    // =====================================

    const toggleButtons = document.querySelectorAll(
        ".details-button, .service-toggle"
    );

    toggleButtons.forEach(button => {

        button.addEventListener("click", () => {

            const panelId = button.getAttribute("aria-controls");
            const panel = document.getElementById(panelId);

            if (!panel) return;

            const expanded =
                button.getAttribute("aria-expanded") === "true";

            button.setAttribute(
                "aria-expanded",
                String(!expanded)
            );

            panel.hidden = expanded;

            const symbol = button.querySelector("span");

            if (symbol) {
                symbol.textContent = expanded ? "+" : "−";
            }

        });

    });


    // =====================================
    // 2. SCROLL REVEAL
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
    // 3. READING PROGRESS BAR
    // =====================================

    const progressBar = document.getElementById("progressBar");

    function updateProgress() {

        const scrollHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        let percentage = 0;

        if (scrollHeight > 0) {

            percentage =
                (window.scrollY / scrollHeight) * 100;

        }

        progressBar.style.width =
            Math.min(100, Math.max(0, percentage)) + "%";

    }

    window.addEventListener("scroll", updateProgress, {
        passive: true
    });

    window.addEventListener("resize", updateProgress);

    updateProgress();


    // =====================================
    // 4. LIGHTBOX GALLERY
    // =====================================

    const images = Array.from(
        document.querySelectorAll(".lightbox-trigger")
    );

    const lightbox = document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxCaption =
        document.getElementById("lightboxCaption");

    const closeButton =
        document.querySelector(".lightbox-close");

    const previousButton =
        document.querySelector(".lightbox-prev");

    const nextButton =
        document.querySelector(".lightbox-next");

    let currentImage = 0;


    // SHOW SELECTED IMAGE

    function showImage(index) {

        currentImage =
            (index + images.length) % images.length;

        const selectedImage = images[currentImage];

        lightboxImage.src =
            selectedImage.currentSrc || selectedImage.src;

        lightboxImage.alt = selectedImage.alt;

        const figure = selectedImage.closest("figure");

        const caption = figure
            ? figure.querySelector("figcaption")
            : null;

        lightboxCaption.textContent = caption
            ? caption.textContent
            : selectedImage.alt;

    }


    // OPEN LIGHTBOX

    function openLightbox(index) {

        showImage(index);

        lightbox.classList.add("open");

        lightbox.setAttribute("aria-hidden", "false");

        document.body.classList.add("lightbox-open");

        closeButton.focus();

    }


    // CLOSE LIGHTBOX

    function closeLightbox() {

        lightbox.classList.remove("open");

        lightbox.setAttribute("aria-hidden", "true");

        document.body.classList.remove("lightbox-open");

        lightboxImage.src = "";

    }


    // IMAGE CLICK

    images.forEach((image, index) => {

        image.addEventListener("click", () => {

            openLightbox(index);

        });

    });


    // CLOSE BUTTON

    closeButton.addEventListener("click", closeLightbox);


    // PREVIOUS IMAGE

    previousButton.addEventListener("click", () => {

        showImage(currentImage - 1);

    });


    // NEXT IMAGE

    nextButton.addEventListener("click", () => {

        showImage(currentImage + 1);

    });


    // CLICK OUTSIDE THE IMAGE

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    // KEYBOARD CONTROLS

    document.addEventListener("keydown", event => {

        if (!lightbox.classList.contains("open")) return;

        if (event.key === "Escape") {

            closeLightbox();

        }

        if (event.key === "ArrowLeft") {

            showImage(currentImage - 1);

        }

        if (event.key === "ArrowRight") {

            showImage(currentImage + 1);

        }

    });


    // =====================================
    // 5. IMAGE ERROR HANDLING
    // =====================================

    images.forEach(image => {

        image.addEventListener("error", () => {

            image.classList.add("image-error");

            image.title =
                "This photograph could not be loaded. Check its source URL.";

        });

    });

});