// Dashboard data will be populated here
const lot1Data = [
    { name: 'Kowshik', total: 472, closed: 118, open: 330, hold: 24 },
    { name: 'Karthikeyan', total: 636, closed: 217, open: 382, hold: 37 },
    { name: 'Dharma', total: 530, closed: 145, open: 375, hold: 10 },
    { name: 'Akash', total: 21, closed: 15, open: 4, hold: 2 },
    { name: 'Murukeshwari', total: 59, closed: 51, open: 6, hold: 2 }
];

const lot2Data = [
    { name: 'Hemnath', total: 214, closed: 0, open: 214, hold: 0 }
];

function renderTable(data, tableId) {
    const tbody = document.getElementById(tableId);
    tbody.innerHTML = data.map(row => `
        <tr>
            <td>${row.name}</td>
            <td>${row.total}</td>
            <td>${row.closed}</td>
            <td>${row.open}</td>
            <td>${row.hold}</td>
        </tr>
    `).join('');
}

// Initialize
renderTable(lot1Data, 'lot1-table');
renderTable(lot2Data, 'lot2-table');
