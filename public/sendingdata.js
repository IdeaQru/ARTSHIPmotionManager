function stringifyMotionData(motionData) {
    const replacer = (key, value) => {
        if (key === 'steps' && Array.isArray(value)) {
            return value.map(step => `[${step.join(", ")}]`);
        }
        return value;
    };

    return JSON.stringify(motionData, replacer, 2);
}

function submitMotion() {
    event.preventDefault();

    const header = document.getElementById('headerSelect').value;
    const motion = document.getElementById('motionSelect').value;
    const name = header + "-" + motion;
    const steps = collectAllStepsData();

    const motionData = {
        header: header,
        motion: motion,
        name: name, // Added name field to identify entries uniquely
        steps: steps
    };

    console.log('Prepared Motion Data:', motionData);

    const jsonPayload = stringifyMotionData(motionData);

    fetch('http://localhost:3000/api/motions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonPayload
    })
    .then(response => response.json())
    .then(data => alert('Motion data submitted successfully!'))
    .catch(error => alert('Error submitting motion data: ' + error.message));
}

function collectAllStepsData() {
    const legsData = collectStepsData('legsStepsContainer', 8);
    const handsData = collectStepsData('handStepsContainer', 8);
    return legsData.concat(handsData);
}

function collectStepsData(containerId, numRows) {
    const container = document.getElementById(containerId);
    const rows = container.querySelectorAll('.step-row');
    const data = [];

    rows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        let rowData = Array.from(inputs, input => Number(input.value) || 0); // Convert and fill empty or invalid inputs with 0
        while (rowData.length < 20) {
            rowData.push(0); // Fill the rest of the rowData with 0 if less than 20 columns
        }
        data.push(rowData);
    });

    return data.slice(0, numRows); // Ensure only the first numRows are taken
}
