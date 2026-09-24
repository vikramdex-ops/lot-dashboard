// Dashboard Data - 17 columns matching reference image
const dashboardData = [
    { name: 'Kowshik', category: 'Lot1', assignedHigh: 147, closedHigh: 37, openHigh: 90, assignedMedium: 160, closedMedium: 48, openMedium: 110, assignedLow: 165, closedLow: 33, openLow: 130, holdHigh: 20, holdMedium: 2, holdLow: 2, total: 472, closed: 118, open: 330 },
    { name: 'Karthikeyan', category: 'Lot1', assignedHigh: 69, closedHigh: 61, openHigh: 0, assignedMedium: 79, closedMedium: 54, openMedium: 12, assignedLow: 69, closedLow: 53, openLow: 10, holdHigh: 8, holdMedium: 13, holdLow: 6, total: 217, closed: 168, open: 22 },
    { name: 'Dharma', category: 'Lot1', assignedHigh: 22, closedHigh: 16, openHigh: 1, assignedMedium: 40, closedMedium: 35, openMedium: 5, assignedLow: 56, closedLow: 48, openLow: 8, holdHigh: 5, holdMedium: 1, holdLow: 1, total: 118, closed: 99, open: 14 },
    { name: 'Dharma', category: 'Lot1', assignedHigh: 151, closedHigh: 17, openHigh: 126, assignedMedium: 125, closedMedium: 23, openMedium: 102, assignedLow: 136, closedLow: 5, openLow: 133, holdHigh: 14, holdMedium: 1, holdLow: 1, total: 412, closed: 46, open: 361 },
    { name: 'Karthikeyan', category: 'Lot1', assignedHigh: 94, closedHigh: 28, openHigh: 57, assignedMedium: 121, closedMedium: 46, openMedium: 75, assignedLow: 204, closedLow: 21, openLow: 183, holdHigh: 26, holdMedium: 7, holdLow: 3, total: 419, closed: 49, open: 360 },
    { name: 'Akash', category: 'Lot1', assignedHigh: 3, closedHigh: 1, openHigh: 2, assignedMedium: 5, closedMedium: 2, openMedium: 3, assignedLow: 13, closedLow: 12, openLow: 1, holdHigh: 0, holdMedium: 1, holdLow: 0, total: 21, closed: 15, open: 4 },
    { name: 'Murukeshwari', category: 'Lot1', assignedHigh: 12, closedHigh: 10, openHigh: 1, assignedMedium: 14, closedMedium: 10, openMedium: 3, assignedLow: 33, closedLow: 28, openLow: 5, holdHigh: 3, holdMedium: 1, holdLow: 0, total: 59, closed: 51, open: 6 },
    { name: 'Hemnath', category: 'Lot2', assignedHigh: 214, closedHigh: 0, openHigh: 214, assignedMedium: 0, closedMedium: 0, openMedium: 0, assignedLow: 0, closedLow: 0, openLow: 0, holdHigh: 0, holdMedium: 0, holdLow: 0, total: 214, closed: 0, open: 214 }
];

let totalHigh = 0, totalMedium = 0, totalLow = 0, totalHold = 0;
let totalClosed = 0, totalOpen = 0;

function renderTable() {
    const tbody = document.getElementById('dashboard-table');
    tbody.innerHTML = dashboardData.map(row => {
        const name = row.name.toUpperCase();
        const initials = name.substring(0, 2);
        const pct = row.total > 0 ? Math.round((row.closed / row.total) * 100) : 0;

        // Update totals
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
        ' • ' + 
        now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST';
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

// Initialize
function init() {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.getElementById('theme-icon').textContent = savedTheme === 'dark' ? '🌙' : '☀️';

    renderTable();
    updateTimestamp();

    // Animate hero stats
    setTimeout(() => {
        animateValue(document.getElementById('totalComments'), 0, totalHigh + totalMedium + totalLow, 1000);
        animateValue(document.getElementById('totalClosed'), 0, totalClosed, 1000);
        animateValue(document.getElementById('totalOpen'), 0, totalOpen, 1000);
        animateValue(document.getElementById('totalHold'), 0, totalHold, 1000);
        
        animateValue(document.getElementById('highCount'), 0, totalHigh, 800);
        animateValue(document.getElementById('mediumCount'), 0, totalMedium, 800);
        animateValue(document.getElementById('lowCount'), 0, totalLow, 800);
        animateValue(document.getElementById('holdCount'), 0, totalHold, 800);
    }, 300);
}

// Auto-refresh every 3 hours
setInterval(() => {
    updateTimestamp();
}, 3 * 60 * 60 * 1000);

// Run on load
init();