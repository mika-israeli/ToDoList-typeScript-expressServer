const express =require('express');
const app =express();
const path = require('path');
const fs = require('fs'); //file system
const cors=require('cors');
app.use(express.json()); 
app.use(cors());

//get function to get the data from data.jason file and to apss it to the client.
app.get('/api/data', (req, res) => {
    // read the data.json file
    const filePath = path.join(__dirname, 'data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found, initialize with an empty array
                console.warn('data.json not found, initializing with an empty array.');
                res.json([]);
            } else {
                console.error('Error reading data.json:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } else {
            try {
                // Parse the JSON data and send it as a respons to the client
                const jsonData = JSON.parse(data);
                res.json(jsonData);
            } catch (parseError) {
                console.error('Error parsing data.json:', parseError);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    });
});

//put function that get update data from the client and update it in the data.jason file
app.put('/api/data', (req, res) => {
    const filePath = path.join(__dirname, 'data.json');
    const updatedData = req.body; //the new data
    
    // validate the incoming data
    if (!Array.isArray(updatedData)) {
        console.error('Error: Updated data is not an array');
        res.status(400).json({ error: 'Bad Request' });
        return;
    }

    // directly write the updated data to data.json, replacing the existing data with the new data
    fs.writeFile(filePath, JSON.stringify(updatedData), 'utf8', (writeErr) => {
        if (writeErr) {
            console.error('Error writing to data.json:', writeErr);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ success: true });
        }
    });
});

//server port
app.listen(8000, () => {
    console.log('Server listening on port 8000');
});
