/* ==========================================
   Eieren bij Tobias
   script.js
========================================== */

// Jaar automatisch in de footer
const jaar = new Date().getFullYear();
const copyright = document.querySelector(".copyright p");

if (copyright) {
    copyright.innerHTML = `© ${jaar} Eieren bij Tobias • Alle rechten voorbehouden`;
}

/* ==========================================
   SCROLL ANIMATIES
========================================== */

const items = document.querySelectorAll(
    ".prijs-kaart, .bezorg-box, .review, .contact-card, .faq-item"
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, {
    threshold: 0.15
});

items.forEach(item => {

    item.style.opacity = "0";
    item.style.transform = "translateY(40px)";
    item.style.transition = "all .7s ease";

    observer.observe(item);

});

/* ==========================================
   ACTIEVE NAVIGATIE
========================================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;
        const height = section.offsetHeight;

        if (window.scrollY >= top &&
            window.scrollY < top + height) {

            current = section.id;

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/* ==========================================
   PRIJSBEREKENING
========================================== */

const pakket = document.getElementById("pakket");
const aantal = document.getElementById("aantal");

if (pakket && aantal) {

    function updatePrijs() {

        const prijs = parseFloat(pakket.value);
        const qty = parseInt(aantal.value);

        const totaal = (prijs * qty)
            .toFixed(2)
            .replace(".", ",");

        let naam = "Basic";

        if (prijs === 5.23) naam = "Plus";
        if (prijs === 7.61) naam = "Premium";

        document.getElementById("overzichtPakket").innerText = naam;
        document.getElementById("prijsPerDoos").innerText =
            "€" + prijs.toFixed(2).replace(".", ",");

        document.getElementById("overzichtAantal").innerText = qty;
        document.getElementById("totaalPrijs").innerText = "€" + totaal;

    }

    pakket.addEventListener("change", updatePrijs);
    aantal.addEventListener("input", updatePrijs);

    updatePrijs();

}

/* ==========================================
   WELKOM
========================================== */

console.log("🥚 Eieren bij Tobias geladen.");

/* ==========================================
   WHATSAPP BESTELLING
========================================== */

function verstuurBestelling() {

    const naam = document.getElementById("naam").value;
    const adres = document.getElementById("adres").value;
    const postcode = document.getElementById("postcode").value;
    const plaats = document.getElementById("plaats").value;
    const telefoon = document.getElementById("telefoon").value;
    const pakket = document.getElementById("overzichtPakket").innerText;
    const aantal = document.getElementById("overzichtAantal").innerText;
    const totaal = document.getElementById("totaalPrijs").innerText;
    const opmerking = document.getElementById("opmerking").value;

    if (
        naam === "" ||
        adres === "" ||
        postcode === "" ||
        plaats === "" ||
        telefoon === ""
    ) {
        alert("Vul eerst alle verplichte velden in.");
        return;
    }

    const bericht =
`🥚 Nieuwe bestelling

Naam: ${naam}
Adres: ${adres}
Postcode: ${postcode}
Plaats: ${plaats}
Telefoon: ${telefoon}

Pakket: ${pakket}
Aantal doosjes: ${aantal}

Totaal: ${totaal}

Opmerking:
${opmerking}`;

    window.open(
        "https://wa.me/31643817257?text=" +
        encodeURIComponent(bericht),
        "_blank"
    );

}

/* ==========================
   HAMBURGER MENU
========================== */

const menuButton = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu");

if (menuButton && menu) {

    menuButton.addEventListener("click", () => {

        menu.classList.toggle("open");

    });

}