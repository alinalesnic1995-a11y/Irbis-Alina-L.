// DOM READY
document.addEventListener("DOMContentLoaded", () => {

    // Generate calendars on all pages that have .calendar
    document.querySelectorAll(".calendar").forEach(calendar => {
        generateCalendar(calendar, calendar.dataset.country);
    });

    // Render trip list
    renderTrip();

    // Init back-to-top
    initBackToTop();
});

// GENERATE FULL CALENDAR
function generateCalendar(container, country) {
    const year = 2026;
    let html = "";

    for (let month = 0; month < 12; month++) {
        html += `
            <div class='month-block'>
                <h3>${getMonthName(month)}</h3>
                <div class='month-grid'>
        `;

        let days = new Date(year, month + 1, 0).getDate();

        for (let d = 1; d <= days; d++) {
            let date = `${d}.${month + 1}.${year}`;
            html += `<div class='day' data-trip='${country} - ${date}'>${d}</div>`;
        }

        html += "</div></div>";
    }

    container.innerHTML = html;

    // Add listeners (better than inline onclick)
    container.querySelectorAll(".day").forEach(day => {
        day.addEventListener("click", () => {
            addTrip(day.dataset.trip);
        });
    });
}

// ADD TRIP
function addTrip(item) {
    let trips = JSON.parse(localStorage.getItem("trips")) || [];

    if (!trips.includes(item)) {   // prevent duplicates
        trips.push(item);
        localStorage.setItem("trips", JSON.stringify(trips));
        notify("Adăugat în călătorie!");
    } else {
        notify("Această dată deja este în listă.");
    }
}

// RENDER TRIP LIST
function renderTrip() {
    const list = document.getElementById("trip-list");
    if (!list) return;

    let trips = JSON.parse(localStorage.getItem("trips")) || [];
    list.innerHTML = trips.map(t => `<li>${t}</li>`).join("");
}

// CLEAR TRIP LIST
function clearTrip() {
    localStorage.removeItem("trips");
    location.reload();
}

// MONTH NAMES
function getMonthName(m) {
    return [
        "Ianuarie","Februarie","Martie","Aprilie","Mai","Iunie",
        "Iulie","August","Septembrie","Octombrie","Noiembrie","Decembrie"
    ][m];
}

/* ============================
   BACK TO TOP BUTTON
============================ */
function initBackToTop() {
    const btn = document.createElement("button");
    btn.classList.add("backToTop");
    btn.textContent = "↑";
    document.body.appendChild(btn);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) btn.classList.add("show");
        else btn.classList.remove("show");
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* ============================
   NOTIFICATION BANNER
============================ */
function notify(text) {
    const div = document.createElement("div");
    div.textContent = text;
    div.style.position = "fixed";
    div.style.bottom = "20px";
    div.style.left = "50%";
    div.style.transform = "translateX(-50%)";
    div.style.background = "#004d66";
    div.style.color = "white";
    div.style.padding = "12px 20px";
    div.style.borderRadius = "8px";
    div.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
    div.style.zIndex = "9999";
    div.style.opacity = "0";
    div.style.transition = "opacity .3s";

    document.body.appendChild(div);

    setTimeout(() => (div.style.opacity = "1"), 10);
    setTimeout(() => {
        div.style.opacity = "0";
        setTimeout(() => div.remove(), 300);
    }, 1800);
}
