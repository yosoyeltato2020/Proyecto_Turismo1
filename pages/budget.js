
/* =========================================
   THE PERFECT TRIP — BUDGET CALCULATOR
========================================= */

// Original group budget for 15 travellers

const GROUP_SIZE = 15;
const GROUP_BUDGET = 6282.50;

// Exact price per person (before rounding)

const PRICE_PER_PERSON = GROUP_BUDGET / GROUP_SIZE;

// HTML elements

const travellersInput = document.getElementById("travellers");
const decreaseButton = document.getElementById("decrease");
const increaseButton = document.getElementById("increase");

const personPrice = document.getElementById("person-price");
const travellerCount = document.getElementById("traveller-count");
const groupTotal = document.getElementById("group-total");

// Euro currency format

const euroFormat = new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});


// Update the calculator

function updateBudget() {

    let travellers = Number(travellersInput.value);

    if (!Number.isFinite(travellers)) {
        travellers = 1;
    }

    // Limit the group to between 1 and 15 people

    travellers = Math.floor(travellers);
    travellers = Math.max(1, Math.min(GROUP_SIZE, travellers));

    travellersInput.value = travellers;

    // Calculate the estimated group total

    const total = PRICE_PER_PERSON * travellers;

    personPrice.textContent = euroFormat.format(PRICE_PER_PERSON);
    travellerCount.textContent = travellers;
    groupTotal.textContent = euroFormat.format(total);

}


// Increase the number of travellers

increaseButton.addEventListener("click", () => {

    const currentValue = Number(travellersInput.value);

    if (currentValue < GROUP_SIZE) {
        travellersInput.value = currentValue + 1;
        updateBudget();
    }

});


// Decrease the number of travellers

decreaseButton.addEventListener("click", () => {

    const currentValue = Number(travellersInput.value);

    if (currentValue > 1) {
        travellersInput.value = currentValue - 1;
        updateBudget();
    }

});


// Allow manual input

travellersInput.addEventListener("change", updateBudget);


// Initial calculation

updateBudget();


// Reveal animations when scrolling

const revealElements = document.querySelectorAll(
    ".expense-card, .included-column, .calculator-card, .section-heading"
);

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

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

}
