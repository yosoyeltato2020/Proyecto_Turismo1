
// DESTINATION INFORMATION

const destinations = {
    puydufou: {
        category: "HISTORY & ENTERTAINMENT",
        title: "Puy du Fou España",
        description:
            "Located near Toledo, Puy du Fou España offers an amazing journey through Spanish history. Visitors can enjoy spectacular live shows, historical villages and fascinating stories. It is the perfect destination for culture and entertainment."
    },

    toledo: {
        category: "CULTURE & HERITAGE",
        title: "Discover Toledo",
        description:
            "Toledo is one of the most beautiful historic cities in Spain. Known as the City of Three Cultures, it combines Christian, Muslim and Jewish heritage. Visitors can explore its cathedral, historic streets and impressive architecture."
    }
};

// MODAL ELEMENTS

const modal = document.getElementById("destination-modal");
const modalTitle = document.getElementById("modal-title");
const modalCategory = document.getElementById("modal-category");
const modalDescription = document.getElementById("modal-description");

const closeButton = document.querySelector(".modal-close");
const okButton = document.getElementById("modal-ok");

// OPEN MODAL

function openModal(destination) {
    const data = destinations[destination];

    if (!data) return;

    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
    closeButton.focus();
}

// CLOSE MODAL

function closeModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}

// DESTINATION BUTTONS

document.querySelectorAll("[data-modal]").forEach(button => {
    button.addEventListener("click", () => {
        openModal(button.dataset.modal);
    });
});

// CLOSE BUTTONS

closeButton.addEventListener("click", closeModal);
okButton.addEventListener("click", closeModal);

// CLOSE WHEN CLICKING OUTSIDE

modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeModal();
    }
});

// CLOSE WITH ESCAPE

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
    }
});

// FOOTER YEAR

const footerText = document.querySelector("footer p");

if (footerText) {
    footerText.textContent =
        `© ${new Date().getFullYear()} Travel Experience | Academic Tourism Project`;
}
