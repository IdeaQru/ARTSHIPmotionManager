const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/motions', (req, res) => {
    const newMotion = req.body;
    const filePath = path.join(__dirname, 'data', 'motions.json');  // Correct path for motions.json

    fs.readFile(filePath, (err, data) => {
        let motions = [];

        if (err) {
            if (err.code === 'ENOENT') {
                // File does not exist, initialize motions as an empty array
                motions = [];
            } else {
                // Other errors
                res.status(500).json({ message: 'Failed to read motion data.' });
                return;
            }
        } else {
            try {
                motions = JSON.parse(data);
                if (!Array.isArray(motions)) {
                    // Ensure motions is an array
                    motions = [];
                }
            } catch (parseErr) {
                // JSON parsing error, initialize motions as an empty array
                motions = [];
            }
        }

        const existingIndex = motions.findIndex(m => m.name === newMotion.name);

        if (existingIndex > -1) {
            motions[existingIndex] = newMotion; // Update existing data
        } else {
            motions.push(newMotion); // Add new motion if it doesn't exist
        }

        fs.writeFile(filePath, JSON.stringify(motions, null, 2), writeErr => {
            if (writeErr) {
                res.status(500).json({ message: 'Failed to save motion data.' });
                return;
            }
            res.json({ message: 'Motion data saved successfully.' });
        });
    });
});

app.get('/api/motions/:name', (req, res) => {
    const name = req.params.name;
    const filePath = path.join(__dirname, 'data', 'motions.json');

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.status(404).json({ message: 'Motion data not found.' });
                return;
            } else {
                res.status(500).json({ message: 'Failed to read motion data.' });
                return;
            }
        }

        try {
            const motions = JSON.parse(data);
            const motion = motions.find(m => m.name === name);

            if (motion) {
                res.json(motion);
            } else {
                res.status(404).json({ message: 'Motion data not found.' });
            }
        } catch (parseErr) {
            res.status(500).json({ message: 'Failed to parse motion data.' });
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
