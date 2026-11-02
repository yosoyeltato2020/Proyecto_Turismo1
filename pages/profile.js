
/* =========================================
   THE PERFECT TRIP - CLIENT PROFILE
   INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // REVEAL ANIMATIONS

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.15
        });

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    // INTERACTIVE MOTIVATION CARDS

    const cards = document.querySelectorAll(".motivation-card");

    cards.forEach(card => {

        card.addEventListener("click", () => {

            const wasActive = card.classList.contains("active");

            cards.forEach(item => {
                item.classList.remove("active");
            });

            if (!wasActive) {
                card.classList.add("active");
            }

        });

        card.addEventListener("keydown", event => {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();
                card.click();

            }

        });

    });


    // SMOOTH SCROLL

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (targetId.length > 1) {

                const target = document.querySelector(targetId);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }

        });

    });

});
