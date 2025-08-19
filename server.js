const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Exam schedule data
const examSchedule = [
    { subject: 'Physics', gender: 'M', section: 'A', day: 'THURSDAY' },
    { subject: 'Physics', gender: 'M', section: 'B', day: 'FRIDAY' },
    { subject: 'MATH', gender: 'M', section: 'A', day: 'WEDNESDAY' },
    { subject: 'MATH', gender: 'M', section: 'B', day: 'MONDAY' },
    { subject: 'Physics', gender: 'F', section: 'A', day: 'TUESDAY' },
    { subject: 'Physics', gender: 'F', section: 'B', day: 'THURSDAY' },
    { subject: 'MATH', gender: 'F', section: 'A', day: 'MONDAY' },
    { subject: 'MATH', gender: 'F', section: 'B', day: 'THURSDAY' }
];

// API Routes

// GET all exam schedules
app.get('/api/schedule', (req, res) => {
    res.json(examSchedule);
});

// GET exam day by subject, gender, and section
app.get('/api/find-day', (req, res) => {
    const { subject, gender, section } = req.query;
    
    if (!subject || !gender || !section) {
        return res.status(400).json({ 
            error: 'Missing required parameters. Please provide subject, gender, and section.' 
        });
    }
    
    const exam = examSchedule.find(exam => 
        exam.subject.toLowerCase() === subject.toLowerCase() &&
        exam.gender.toUpperCase() === gender.toUpperCase() &&
        exam.section.toUpperCase() === section.toUpperCase()
    );
    
    if (!exam) {
        return res.status(404).json({ 
            error: 'No exam found for the given criteria.' 
        });
    }
    
    res.json({
        subject: exam.subject,
        gender: exam.gender,
        section: exam.section,
        day: exam.day
    });
});

// POST method to find exam day
app.post('/api/find-day', (req, res) => {
    const { subject, gender, section } = req.body;
    
    if (!subject || !gender || !section) {
        return res.status(400).json({ 
            error: 'Missing required parameters. Please provide subject, gender, and section.' 
        });
    }
    
    const exam = examSchedule.find(exam => 
        exam.subject.toLowerCase() === subject.toLowerCase() &&
        exam.gender.toUpperCase() === gender.toUpperCase() &&
        exam.section.toUpperCase() === section.toUpperCase()
    );
    
    if (!exam) {
        return res.status(404).json({ 
            error: 'No exam found for the given criteria.' 
        });
    }
    
    res.json({
        subject: exam.subject,
        gender: exam.gender,
        section: exam.section,
        day: exam.day
    });
});

// GET available subjects
app.get('/api/subjects', (req, res) => {
    const subjects = [...new Set(examSchedule.map(exam => exam.subject))];
    res.json(subjects);
});

// GET available sections
app.get('/api/sections', (req, res) => {
    const sections = [...new Set(examSchedule.map(exam => exam.section))];
    res.json(sections);
});

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/api/`);
});
