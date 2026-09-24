// Dashboard Data - Auto-generated on 2026-09-24 19:33
const dashboardData = [
    { name: "AKASH", category: "Lot1", assignedHigh: 12, closedHigh: 0, openHigh: 8, assignedMedium: 6, closedMedium: 0, openMedium: 6, assignedLow: 7, closedLow: 0, openLow: 7, holdHigh: 4, holdMedium: 0, holdLow: 0, total: 25, closed: 0, open: 21 },
    { name: "DHARMA", category: "Lot1", assignedHigh: 164, closedHigh: 34, openHigh: 117, assignedMedium: 190, closedMedium: 54, openMedium: 136, assignedLow: 194, closedLow: 48, openLow: 146, holdHigh: 13, holdMedium: 0, holdLow: 0, total: 548, closed: 136, open: 399 },
    { name: "KARTHIKEYAN", category: "Lot1", assignedHigh: 204, closedHigh: 57, openHigh: 127, assignedMedium: 208, closedMedium: 53, openMedium: 142, assignedLow: 224, closedLow: 53, openLow: 165, holdHigh: 20, holdMedium: 13, holdLow: 6, total: 636, closed: 163, open: 434 },
    { name: "KOWSHIK", category: "Lot1", assignedHigh: 147, closedHigh: 15, openHigh: 112, assignedMedium: 160, closedMedium: 44, openMedium: 114, assignedLow: 165, closedLow: 25, openLow: 138, holdHigh: 20, holdMedium: 2, holdLow: 2, total: 472, closed: 84, open: 364 },
    { name: "MURUKESHWARI", category: "Lot1", assignedHigh: 23, closedHigh: 18, openHigh: 4, assignedMedium: 21, closedMedium: 15, openMedium: 5, assignedLow: 15, closedLow: 14, openLow: 1, holdHigh: 1, holdMedium: 1, holdLow: 0, total: 59, closed: 47, open: 10 },
    { name: "HEMNATH", category: "Lot2", assignedHigh: 70, closedHigh: 0, openHigh: 69, assignedMedium: 81, closedMedium: 0, openMedium: 81, assignedLow: 63, closedLow: 0, openLow: 63, holdHigh: 1, holdMedium: 0, holdLow: 0, total: 214, closed: 0, open: 213 }
];

let totalHigh = 0, totalMedium = 0, totalLow = 0, totalHold = 0;
let totalClosed = 0, totalOpen = 0;

function renderTable() {
    const tbody = document.getElementById('dashboard-table');
    tbody.innerHTML = dashboardData.map(row => {
        const name = row.name.toUpperCase();
        const initials = name.substring(0, 2);
        const pct = row.total > 0 ? Math.round((row.closed / row.total) * 100) : 0;
        
        totalHigh += row.assignedHigh;
        totalMedium += row.assignedMedium;
        totalLow += row.assignedLow;
        totalHold += row.holdHigh + row.holdMedium + row.holdLow;
        totalClosed += row.closed;
        totalOpen += row.open;
        
        return `
            <tr>
                <td>
                    <div class="assignee-cell">
                        <div class="assignee-avatar">${initials}</div>
                        <div>
                            <div class="assignee-name">${name}</div>
                            <div class="progress-container">
                                <div class="progress-bar" style="width: ${pct}%"></div>
                            </div>
                        </div>
                    </div>
                </td>
                <td>${row.category}</td>
                <td class="cell-high">${row.assignedHigh}</td>
                <td class="cell-high">${row.closedHigh}</td>
                <td class="cell-high">${row.openHigh}</td>
                <td class="cell-medium">${row.assignedMedium}</td>
                <td class="cell-medium">${row.closedMedium}</td>
                <td class="cell-medium">${row.openMedium}</td>
                <td class="cell-low">${row.assignedLow}</td>
                <td class="cell-low">${row.closedLow}</td>
                <td class="cell-low">${row.openLow}</td>
                <td>${row.holdHigh}</td>
                <td>${row.holdMedium}</td>
                <td>${row.holdLow}</td>
                <td class="cell-total">${row.total}</td>
                <td class="cell-total">${row.closed}</td>
                <td class="cell-total">${row.open}</td>
            </tr>
        `;
    }).join('');
}

function updateTimestamp() {
    const now = new Date();
    document.getElementById('timestamp').textContent = 
        now.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) + 
        ' ' + 
        now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + range * easeProgress);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    document.getElementById('theme-icon').textContent = newTheme === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('theme', newTheme);
}

function init() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('theme-icon').textContent = savedTheme === 'dark' ? '🌙' : '☀️';
    
    renderTable();
    updateTimestamp();
    
    setTimeout(() => {
        animateValue(document.getElementById('totalComments'), 0, totalHigh + totalMedium + totalLow + totalHold, 1000);
        animateValue(document.getElementById('totalClosed'), 0, totalClosed, 1000);
        animateValue(document.getElementById('totalOpen'), 0, totalOpen, 1000);
        animateValue(document.getElementById('totalHold'), 0, totalHold, 1000);
        animateValue(document.getElementById('highCount'), 0, totalHigh, 800);
        animateValue(document.getElementById('mediumCount'), 0, totalMedium, 800);
        animateValue(document.getElementById('lowCount'), 0, totalLow, 800);
        animateValue(document.getElementById('holdCount'), 0, totalHold, 800);
    }, 200);
}

setInterval(() => {
    updateTimestamp();
}, 3 * 60 * 60 * 1000);

init();
