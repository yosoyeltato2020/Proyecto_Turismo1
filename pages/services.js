
document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".service-card");

    // Show all cards if the browser does not support IntersectionObserver
    if (!("IntersectionObserver" in window)) {
        cards.forEach(card => {
            card.classList.add("visible");
        });
        return;
    }

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

    cards.forEach(card => {
        observer.observe(card);
    });

});
