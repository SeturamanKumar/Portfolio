const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

const projects = [
    { id: 1, title: 'Project Alpha', description: 'A project about A' },
    { id: 2, title: 'Project Beta', description: 'A project about B' },
    { id: 3, title: 'Project Gamma', description: 'A project about C' }
];

app.get('/api/projects', (req, res) => {
    console.log('Request received for /api/projects');
    res.json(projects);
});

app.post('/api/contact', (req, res) => {
    console.log('Contact form data received:', req.body);
    res.status(201).json({
        message: 'Message received successfully',
        data: req.body
    })
});

app.listen(PORT, () => {
    console.log(`Server is listening to the port: ${PORT}`);
});