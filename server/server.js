const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

let Project = require('./models/project.model.js');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("✅ MongoDB database connection established successfully");
});

const userRouter = require('./routes/users');

app.use('/api/users', userRouter);

app.get('/api/projects', (req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err));
});

app.get('/api/projects/:id', (req, res) => {
    Project.findById(req.params.id)
        .then(project => res.json(project))
        .catch(err => res.status(400).json('Error:' + err));
});

app.post('/api/projects', (req, res) => {
    const { title, description, slug } = req.body;

    const newProject = new Project({
        title,
        description,
        slug,
    });

    newProject.save()
        .then(project => res.json({ message: 'Project added succesfully!', project}))
        .catch(err => res.status(400).json('Error: ' + err));
});

app.put('/api/projects/:id', (req, res) => {
    Project.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(updatedProject => {
            if(!updatedProject){
                return res.status(404).json('Error: Project not found.');
            }
            res.json({message: 'Project updated successfully!', project: updatedProject});
    })
        .catch(err => res.status(400).json('Error: ' + err));
});

app.delete('/api/projects/:id', (req, res) => {
    Project.findByIdAndDelete(req.params.id)
        .then(deletedProject => {
            if(!deletedProject){
                return res.status(404).json('Error: Page Not Found');
            }
            res.json({message: 'Project deleted successfully!'});
        })
        .catch(err => res.status(400).json('Error: ' + err));
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