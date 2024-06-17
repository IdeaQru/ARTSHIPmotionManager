
window.onload = function() {
    const legsStepsContainer = document.getElementById('legsStepsContainer');
    const handStepsContainer = document.getElementById('handStepsContainer');
    const colors = ["#f6d365", "#fda085", "#f093fb", "#5ee7df", "#c3cfe2", "#a1c4fd", "#84fab0", "#8fd3f4", "#e0c3fc", "#8ec5fc", "#cfd9df", "#e2ebf0", "#ffdde1", "#fddb92", "#9890e3", "#b1f8f2", "#a7acd9", "#93a5cf", "#b3b3f1", "#e3fdfd"];

    // Function to create a header row and return the colors used
    function createHeaderRow(headers, container) {
        const headerRow = document.createElement('div');
        headerRow.className = 'step-row';
        headers.forEach((header, index) => {
            const headerCell = document.createElement('div');
            headerCell.textContent = header;
            headerCell.className = `color-${index % 20}`; // Menambahkan kelas berdasarkan warna
            headerRow.appendChild(headerCell);
        });
        container.appendChild(headerRow);
        return headers.map((_, index) => `color-${index % 20}`);
    }
    
    // Collect colors from headers to apply to inputs
    const legsColors = createHeaderRow(['X1', 'Y1', 'Z1', 'H1', 'X2', 'Y2', 'Z2', 'H2', 'PG', 'AR', 'AL', 'BD', 'SPD', '--', '--', '--', '--', '--', '--', '--'], legsStepsContainer);
    const handColors = createHeaderRow(['BL', 'PL', 'LL', 'SL', 'GL', 'TL', 'BR', 'PR', 'LR', 'SR', 'GR', 'TR', 'H1', 'H2', 'H3', 'MagL', 'MagR', 'MatL', 'MatR', 'MVspeed'], handStepsContainer);

    // Function to create input rows using specific colors for each column
    function createStepRows(numRows, colors, container) {
        for (let i = 0; i < numRows; i++) {
            const row = document.createElement('div');
            row.className = 'step-row';
            colors.forEach((colorClass, j) => {
                const input = document.createElement('input');
                input.type = 'number';
                input.value = 0;
                input.className = colorClass; // Menetapkan kelas warna ke input
                row.appendChild(input);
            });
            container.appendChild(row);
        }
    
    }

    // Create input rows with colors matched to headers
    createStepRows(8, legsColors, legsStepsContainer);
    createStepRows(8, handColors, handStepsContainer);
};

