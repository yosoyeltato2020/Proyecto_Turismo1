document.addEventListener("DOMContentLoaded", () => {

    // SELECT ALL TRIP CARDS

    const cards = document.querySelectorAll(".trip-card");


    // 3D MOVEMENT EFFECT

    cards.forEach((card) => {

        card.addEventListener("pointermove", (event) => {

            // Only activate the effect with a mouse
            if (event.pointerType !== "mouse") return;

            const rect = card.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 5;
            const rotateX = ((centerY - y) / centerY) * 5;

            card.style.setProperty("--rx", `${rotateX}deg`);
            card.style.setProperty("--ry", `${rotateY}deg`);

        });


        // RESET CARD POSITION

        card.addEventListener("pointerleave", () => {

            card.style.setProperty("--rx", "0deg");
            card.style.setProperty("--ry", "0deg");

        });

    });


    // IMAGE ERROR CONTROL

    const images = document.querySelectorAll("img");

    images.forEach((image) => {

        image.addEventListener("error", () => {

            image.classList.add("image-missing");

        });

    });


    // SMOOTH NAVIGATION FOR INTERNAL LINKS

    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

});