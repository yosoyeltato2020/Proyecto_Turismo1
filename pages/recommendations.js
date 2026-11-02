
/* =========================================
   THE PERFECT TRIP
   RECOMMENDATIONS PAGE
========================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================
       02 — AUTOMATIC SHOPPING CAROUSEL
    ===================================== */

    const shoppingSlides = [

        {
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Damasquinado.jpg?width=1200",
            title: "Damascene jewellery",
            description: "Traditional gold and silver designs crafted by local artisans."
        },

        {
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Mazap%C3%A1n-_Toledo.jpg?width=1200",
            title: "Toledo marzipan",
            description: "A traditional sweet made with almonds and sugar, famous in Toledo."
        },

        {
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/El_Puente_del_Arzobispo_(2024)_28.jpg?width=1200",
            title: "Local ceramics",
            description: "Discover colourful pottery and handmade ceramic pieces from the Toledo region."
        },

        {
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Olla_de_novia_antigua_(Toledo,_Spain).JPG?width=1200",
            title: "Traditional crafts",
            description: "Explore handmade objects inspired by the traditions of Castilla-La Mancha."
        }

    ];


    const shoppingPhoto = document.getElementById("shopping-photo");
    const shoppingNumber = document.getElementById("shopping-number");
    const shoppingTitle = document.getElementById("shopping-title");
    const shoppingDescription = document.getElementById("shopping-description");

    const shoppingDots = document.querySelectorAll("#shopping-dots button");

    const shoppingPrev = document.getElementById("shopping-prev");
    const shoppingNext = document.getElementById("shopping-next");


    if (shoppingPhoto && shoppingTitle && shoppingDescription) {

        let currentSlide = 0;
        let carouselTimer;


        function showShoppingSlide(index) {

            currentSlide =
                (index + shoppingSlides.length) % shoppingSlides.length;

            const slide = shoppingSlides[currentSlide];

            shoppingPhoto.style.opacity = "0";

            window.setTimeout(function () {

                shoppingPhoto.src = slide.image;
                shoppingPhoto.alt = slide.title;

                shoppingTitle.textContent = slide.title;
                shoppingDescription.textContent = slide.description;

                shoppingNumber.textContent =
                    `0${currentSlide + 1} / 04`;

                shoppingPhoto.style.opacity = "1";

            }, 200);


            shoppingDots.forEach(function (dot, i) {

                dot.classList.toggle("active", i === currentSlide);

                dot.setAttribute(
                    "aria-current",
                    i === currentSlide ? "true" : "false"
                );

            });

        }


        function restartShoppingTimer() {

            window.clearInterval(carouselTimer);

            carouselTimer = window.setInterval(function () {

                showShoppingSlide(currentSlide + 1);

            }, 3000);

        }


        if (shoppingPrev) {

            shoppingPrev.addEventListener("click", function () {

                showShoppingSlide(currentSlide - 1);
                restartShoppingTimer();

            });

        }


        if (shoppingNext) {

            shoppingNext.addEventListener("click", function () {

                showShoppingSlide(currentSlide + 1);
                restartShoppingTimer();

            });

        }


        shoppingDots.forEach(function (dot, index) {

            dot.addEventListener("click", function () {

                showShoppingSlide(index);
                restartShoppingTimer();

            });

        });


        showShoppingSlide(0);
        restartShoppingTimer();

    }



    /* =====================================
       03 — INTERACTIVE TOLEDO PLACES
    ===================================== */

    const toledoPlaces = [

        {
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Catedral_de_Toledo_-_Espa%C3%B1a.jpg?width=1200",
            title: "Toledo Cathedral",
            description: "Discover one of Spain's most impressive Gothic monuments, famous for its architecture and artistic treasures."
        },

        {
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Alc%C3%A1zar_de_Toledo.jpg?width=1200",
            title: "The Alcázar",
            description: "Visit this historic fortress overlooking the city. It is one of Toledo's most recognisable landmarks."
        },

        {
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/El_Casco_Antiguo_in_Toledo%2C_Spain.jpg?width=1200",
            title: "The Old Town",
            description: "Walk through narrow streets and discover the medieval atmosphere of this historic city."
        },

        {
            image: "https://commons.wikimedia.org/wiki/Special:FilePath/Toledo_cyl-panorama-mirador.jpg?width=1200",
            title: "Panoramic viewpoints",
            description: "Enjoy beautiful panoramic views of Toledo and the Tagus River from the city's viewpoints."
        }

    ];


    const placeButtons = document.querySelectorAll(".rec-place-button");

    const placePhoto = document.getElementById("toledo-place-photo");
    const placeNumber = document.getElementById("toledo-place-number");
    const placeTitle = document.getElementById("toledo-place-title");
    const placeText = document.getElementById("toledo-place-text");


    function showPlace(index) {

        const place = toledoPlaces[index];

        if (!place || !placePhoto || !placeTitle || !placeText) {
            return;
        }

        placePhoto.style.opacity = "0";


        window.setTimeout(function () {

            placePhoto.src = place.image;
            placePhoto.alt = place.title;

            placeTitle.textContent = place.title;
            placeText.textContent = place.description;

            placeNumber.textContent = `0${index + 1} / 04`;

            placePhoto.style.opacity = "1";

        }, 150);


        placeButtons.forEach(function (button, i) {

            const isActive = i === index;

            button.classList.toggle("active", isActive);

            button.setAttribute(
                "aria-pressed",
                isActive ? "true" : "false"
            );

        });

    }


    placeButtons.forEach(function (button, index) {

        button.addEventListener("click", function () {

            showPlace(index);

        });

    });


    if (placeButtons.length > 0) {
        showPlace(0);
    }



    /* =====================================
       05 — INTERACTIVE TRAVEL CHECKLIST
    ===================================== */

    const checklistItems = document.querySelectorAll(
        ".rec-check-item input[type='checkbox']"
    );

    const progressText = document.getElementById("progress-text");
    const progressBar = document.getElementById("progress-bar");
    const progressTrack = document.getElementById("progress-track");

    const completeMessage = document.getElementById("complete-message");
    const resetButton = document.getElementById("reset-checklist");


    const storageKey = "thePerfectTripRecommendationsChecklist";


    function saveChecklist() {

        const checkedItems = [];

        checklistItems.forEach(function (checkbox) {

            if (checkbox.checked) {
                checkedItems.push(checkbox.value);
            }

        });


        try {

            localStorage.setItem(
                storageKey,
                JSON.stringify(checkedItems)
            );

        } catch (error) {

            // The checklist still works if browser storage is unavailable.

        }

    }


    function loadChecklist() {

        try {

            const savedItems = JSON.parse(
                localStorage.getItem(storageKey) || "[]"
            );

            if (!Array.isArray(savedItems)) {
                return;
            }

            checklistItems.forEach(function (checkbox) {

                checkbox.checked = savedItems.includes(checkbox.value);

            });

        } catch (error) {

            // Start with an empty checklist if saved data cannot be read.

        }

    }


    function updateChecklist() {

        let completed = 0;

        checklistItems.forEach(function (checkbox) {

            if (checkbox.checked) {
                completed++;
            }

        });


        const total = checklistItems.length;

        const percentage = total > 0
            ? (completed / total) * 100
            : 0;


        if (progressText) {

            progressText.textContent = `${completed} / ${total}`;

        }


        if (progressBar) {

            progressBar.style.width = `${percentage}%`;

        }


        if (progressTrack) {

            progressTrack.setAttribute("aria-valuenow", completed);

            progressTrack.setAttribute("aria-valuemax", total);

        }


        if (completeMessage) {

            if (completed === total && total > 0) {

                completeMessage.textContent =
                    "Excellent! You are ready for your trip.";

            } else if (completed > 0) {

                completeMessage.textContent =
                    "Good progress! Keep preparing for your journey.";

            } else {

                completeMessage.textContent = "";

            }

        }


        saveChecklist();

    }


    checklistItems.forEach(function (checkbox) {

        checkbox.addEventListener("change", updateChecklist);

    });


    if (resetButton) {

        resetButton.addEventListener("click", function () {

            checklistItems.forEach(function (checkbox) {

                checkbox.checked = false;

            });

            updateChecklist();

        });

    }


    loadChecklist();
    updateChecklist();


});
