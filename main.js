// GENERATE FULL CALENDAR 2026 + CLICK HANDLER

document.addEventListener("DOMContentLoaded", () => {
    const calendarDiv = document.querySelector(".calendar");
    if (calendarDiv) {
        const country = calendarDiv.dataset.country;
        generateCalendar(calendarDiv, country);
    }

    renderTrip();
});

function generateCalendar(container, country) {
    const year = 2026;

    let html = "";

    for (let month = 0; month < 12; month++) {
        html += `<div class='month-block'><h3>${getMonthName(month)}</h3><div class='month-grid'>`;

        let days = new Date(year, month + 1, 0).getDate();

        for (let d = 1; d <= days; d++) {
            let date = `${d}.${month + 1}.${year}`;
            html += `<div class='day' onclick='addTrip("${country} - ${date}")'>${d}</div>`;
        }

        html += "</div></div>";
    }

    container.innerHTML = html;
}

function addTrip(item) {
    let trips = JSON.parse(localStorage.getItem("trips")) || [];
    trips.push(item);
    localStorage.setItem("trips", JSON.stringify(trips));
    alert("Adăugat în călătorie!");
}

function renderTrip() {
    const list = document.getElementById("trip-list");
    if (!list) return;

    let trips = JSON.parse(localStorage.getItem("trips")) || [];
    list.innerHTML = trips.map(t => `<li>${t}</li>`).join("");
}

function clearTrip() {
    localStorage.removeItem("trips");
    location.reload();
}

function getMonthName(m) {
    return [
        "Ianuarie","Februarie","Martie","Aprilie","Mai","Iunie",
        "Iulie","August","Septembrie","Octombrie","Noiembrie","Decembrie"
    ][m];
}
