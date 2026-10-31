document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".trip-card");

    cards.forEach(card => {

        // Efecto de perspectiva al mover el ratón
        card.addEventListener("pointermove", event => {

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


        // Recuperar la posición original
        card.addEventListener("pointerleave", () => {

            card.style.setProperty("--rx", "0deg");
            card.style.setProperty("--ry", "0deg");

        });

    });


    // Control de imágenes que todavía no existen
    const images = document.querySelectorAll("img");

    images.forEach(image => {

        image.addEventListener("error", () => {
            image.classList.add("image-missing");
        });

    });

});