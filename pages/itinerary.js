
/* =========================================================
   THE PERFECT TRIP · ITINERARY INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";


    // 1. MOBILE NAVIGATION

    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

        });

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

            });

        });

    }


    // 2. SMOOTH IN-PAGE NAVIGATION

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const selector = link.getAttribute("href");

            if (!selector || selector === "#") return;

            const target = document.querySelector(selector);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({

                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",

                block: "start"

            });

        });

    });


    // 3. REVEAL ELEMENTS ON SCROLL

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
            { threshold: 0.12 }
        );

        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    // 4. ANIMATED STATISTICS

    const counters = document.querySelectorAll(
        ".stat-number[data-target]"
    );

    const animateCounter = element => {

        const target = Number(element.dataset.target);

        if (!Number.isFinite(target)) return;

        const duration = 1000;

        const start = performance.now();

        const tick = now => {

            const progress = Math.min(
                (now - start) / duration,
                1
            );

            const eased = 1 - Math.pow(1 - progress, 3);

            element.textContent = String(
                Math.round(target * eased)
            );

            if (progress < 1) {

                requestAnimationFrame(tick);

            }

        };

        requestAnimationFrame(tick);

    };


    if ("IntersectionObserver" in window) {

        const counterObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounter(entry.target);

                        observer.unobserve(entry.target);

                    }

                });

            },
            { threshold: 0.6 }
        );

        counters.forEach(counter => {

            counterObserver.observe(counter);

        });

    } else {

        counters.forEach(counter => {

            counter.textContent = counter.dataset.target;

        });

    }


    // 5. PHOTO GALLERY LIGHTBOX

    const galleryElements = [
        ...document.querySelectorAll(
            ".gallery-trigger, .gallery-image, .hotel-gallery img"
        )
    ];

    const lightbox = document.getElementById("lightbox");

    const lightboxImage = document.getElementById(
        "lightbox-image"
    );

    const lightboxCaption = document.getElementById(
        "lightbox-caption"
    );

    const closeLightboxButton = document.getElementById(
        "close-lightbox"
    );

    const previousButton = document.getElementById(
        "previous-image"
    );

    const nextButton = document.getElementById(
        "next-image"
    );

    let activeImageIndex = 0;

    let lastFocusedElement = null;


    const getGalleryImage = element => {

        if (element.matches("img")) {

            return element;

        }

        return element.querySelector("img");

    };


    const showGalleryImage = index => {

        if (!galleryElements.length || !lightboxImage) return;

        activeImageIndex =
            (index + galleryElements.length) % galleryElements.length;

        const element = galleryElements[activeImageIndex];

        const image = getGalleryImage(element);

        if (!image) return;

        const fullSource = element.dataset.full || image.src;

        lightboxImage.src = fullSource;

        lightboxImage.alt = image.alt || "Trip photograph";

        if (lightboxCaption) {

            lightboxCaption.textContent = image.alt || "";

        }

    };


    const openLightbox = index => {

        if (!lightbox || !lightboxImage) return;

        lastFocusedElement = document.activeElement;

        showGalleryImage(index);

        lightbox.classList.add("active");

        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        closeLightboxButton?.focus();

    };


    const closeLightbox = () => {

        if (!lightbox) return;

        lightbox.classList.remove("active");

        lightbox.setAttribute("aria-hidden", "true");

        lightboxImage?.removeAttribute("src");

        document.body.style.overflow = "";

        if (
            lastFocusedElement &&
            typeof lastFocusedElement.focus === "function"
        ) {

            lastFocusedElement.focus();

        }

    };


    galleryElements.forEach((element, index) => {

        element.addEventListener("click", () => {

            openLightbox(index);

        });

    });


    closeLightboxButton?.addEventListener(
        "click",
        closeLightbox
    );


    previousButton?.addEventListener("click", () => {

        showGalleryImage(activeImageIndex - 1);

    });


    nextButton?.addEventListener("click", () => {

        showGalleryImage(activeImageIndex + 1);

    });


    lightbox?.addEventListener("click", event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    document.addEventListener("keydown", event => {

        if (!lightbox?.classList.contains("active")) return;

        if (event.key === "Escape") {

            closeLightbox();

        }

        if (event.key === "ArrowLeft") {

            showGalleryImage(activeImageIndex - 1);

        }

        if (event.key === "ArrowRight") {

            showGalleryImage(activeImageIndex + 1);

        }

    });


    // 6. PRINT / SAVE AS PDF

    document
        .getElementById("print-button")
        ?.addEventListener("click", () => {

            window.print();

        });


    // 7. BACK TO TOP

    document
        .getElementById("top-button")
        ?.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth"

            });

        });


    // 8. IMAGE FALLBACK

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add("image-unavailable");

                image.alt = image.alt
                    ? `${image.alt} (image temporarily unavailable)`
                    : "Image temporarily unavailable";

            },
            { once: true }
        );

    });


    // 9. INTERACTIVE TOLEDO MAP AND PEDESTRIAN ROUTE

    const mapElement = document.getElementById("toledo-map");

    const routeStatus = document.getElementById("route-status");


    // Sunday itinerary: six numbered stops

    const locations = [

        {
            number: 1,

            name: "Plaza de Zocodover",

            description:
                "Meeting point and beginning of the walking tour.",

            position: [39.8628, -4.0273]

        },

        {
            number: 2,

            name: "Alcázar of Toledo",

            description:
                "Exterior visit and historical explanation.",

            position: [39.8585, -4.0227]

        },

        {
            number: 3,

            name: "Toledo Cathedral",

            description:
                "Visit one of Spain's most important Gothic monuments.",

            position: [39.8579, -4.0245]

        },

        {
            number: 4,

            name: "El Greco Museum",

            description:
                "Discover the life and work associated with the painter.",

            position: [39.8561, -4.0306]

        },

        {
            number: 5,

            name: "Synagogue of El Tránsito · Sephardic Museum",

            description:
                "Discover Toledo's Jewish heritage.",

            position: [39.8565, -4.0313]

        },

        {
            number: 6,

            name: "Restaurante SKALA",

            description:
                "Lunch at Calle Pozo Amargo, 2, Toledo.",

            position: [39.8568, -4.0240],

            restaurant: true

        }

    ];


    if (mapElement && window.L) {

        const map = L.map(mapElement, {

            scrollWheelZoom: false

        }).setView([39.858, -4.027], 15);


        // OpenStreetMap tiles

        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {

                maxZoom: 19,

                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

            }
        ).addTo(map);


        const routeCoordinates = locations.map(
            location => location.position
        );

        const markerBounds = [];


        // Add numbered map markers

        locations.forEach(location => {

            const icon = L.divIcon({

                className: "custom-map-marker",

                html:
                    `<span class="map-pin${location.restaurant ? " is-restaurant" : ""}">${location.number}</span>`,

                iconSize: [31, 31],

                iconAnchor: [15, 15],

                popupAnchor: [0, -15]

            });


            const popup = `

                <div class="map-popup">

                    <h3>${location.number}. ${location.name}</h3>

                    <p>${location.description}</p>

                </div>

            `;


            const marker = L.marker(
                location.position,
                { icon }
            )
                .addTo(map)
                .bindPopup(popup);


            markerBounds.push(marker.getLatLng());

        });


        // Temporary line while the walking route loads

        const fallbackLine = L.polyline(
            routeCoordinates,
            {

                color: "#c6a15b",

                weight: 3,

                opacity: 0.7,

                dashArray: "7 9"

            }
        ).addTo(map);


        map.fitBounds(
            L.latLngBounds(markerBounds),
            { padding: [35, 35] }
        );


        // Pedestrian routing service

        const coordinateString = locations

            .map(location =>

                `${location.position[1]},${location.position[0]}`

            )

            .join(";");


        const routerUrl =

            `https://routing.openstreetmap.de/routed-foot/route/v1/driving/${coordinateString}` +

            "?overview=full&geometries=geojson&steps=false";


        fetch(routerUrl)

            .then(response => {

                if (!response.ok) {

                    throw new Error(
                        `Walking router returned ${response.status}`
                    );

                }

                return response.json();

            })

            .then(data => {

                if (

                    data.code !== "Ok" ||

                    !data.routes ||

                    !data.routes.length ||

                    !data.routes[0].geometry

                ) {

                    throw new Error(
                        "No walking route was returned"
                    );

                }


                const route = data.routes[0];


                // Draw the real pedestrian route

                const routeLayer = L.geoJSON(
                    route.geometry,
                    {

                        style: {

                            color: "#c6a15b",

                            weight: 5,

                            opacity: 0.95,

                            lineCap: "round",

                            lineJoin: "round"

                        }

                    }
                ).addTo(map);


                map.removeLayer(fallbackLine);


                map.fitBounds(
                    routeLayer.getBounds(),
                    { padding: [35, 35] }
                );


                const distanceKm = (
                    route.distance / 1000
                ).toFixed(1);


                const durationMin = Math.round(
                    route.duration / 60
                );


                if (routeStatus) {

                    routeStatus.textContent =

                        `Walking route loaded · approx. ${distanceKm} km · ${durationMin} min walking`;

                }

            })


            .catch(error => {

                console.warn(
                    "Could not load pedestrian routing:",
                    error
                );


                if (routeStatus) {

                    routeStatus.textContent =

                        "Stops shown · pedestrian route service temporarily unavailable";

                }

            });


        // Refresh map dimensions after layout changes

        window.addEventListener("resize", () => {

            map.invalidateSize();

        });


        setTimeout(() => {

            map.invalidateSize();

        }, 250);


    } else if (routeStatus) {

        routeStatus.textContent =

            "Interactive map unavailable: check your internet connection.";

    }

});
