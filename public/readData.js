function updateMotionName() {
    const header = document.getElementById('headerSelect').value;
    const motion = document.getElementById('motionSelect').value;
    const name = header + "-" + motion;
    return name;
}

function fetchMotionData() {
    const name = updateMotionName();

    fetch(`http://localhost:3000/api/motions/${name}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Motion data not found');
                } else {
                    throw new Error('Network response was not ok');
                }
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data); // Debugging line to check data structure
            if (data && Array.isArray(data.steps)) {
                const parsedSteps = data.steps.map(step => {
                    if (typeof step === 'string') {
                        try {
                            return JSON.parse(step);
                        } catch (e) {
                            console.error('Error parsing step:', step);
                            return [];
                        }
                    }
                    return step;
                });
                populateStepsData('legsStepsContainer', parsedSteps.slice(0, 8));
                populateStepsData('handStepsContainer', parsedSteps.slice(8, 16));
                alert('Data tersedia dan berhasil dimuat');
            } else {
                throw new Error('Invalid steps data');
            }
        })
        .catch(error => {
            console.error('Error fetching motion data:', error.message);
            alert('Data tidak tersedia: ' + error.message);
        });
}

function populateStepsData(containerId, stepsData) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear existing content

    // Create headers and rows again
    const headers = containerId === 'legsStepsContainer' 
        ? ['X1', 'Y1', 'Z1', 'H1', 'X2', 'Y2', 'Z2', 'H2', 'PG', 'AR', 'AL', 'BD', 'SPD', '--', '--', '--', '--', '--', '--', '--']
        : ['BL', 'PL', 'LL', 'SL', 'GL', 'TL', 'BR', 'PR', 'LR', 'SR', 'GR', 'TR', 'H1', 'H2', 'H3', 'MagL', 'MagR', 'MatL', 'MatR', 'MVspeed'];
    
    const colors = createHeaderRow(headers, container);

    stepsData.forEach((step, i) => {
        if (Array.isArray(step)) { 
            const row = document.createElement('div');
            row.className = 'step-row';
            
            step.forEach((value, j) => {
                const input = document.createElement('input');
                input.type = 'number';
                input.value = value;
                input.className = colors[j]; 
                row.appendChild(input);
            });

            container.appendChild(row);
        } else {
            console.error('Invalid step data:', step); 
        }
    });
}

function createHeaderRow(headers, container) {
    const headerRow = document.createElement('div');
    headerRow.className = 'step-row';
    const colors = headers.map((header, index) => {
        const headerCell = document.createElement('div');
        headerCell.textContent = header;
        const colorClass = `color-${index % 20}`; // Assign class based on color
        headerCell.className = colorClass;
        headerRow.appendChild(headerCell);
        return colorClass;
    });
    container.appendChild(headerRow);
    return colors;
}
