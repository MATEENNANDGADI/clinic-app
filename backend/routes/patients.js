const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust the path if necessary

module.exports = (io) => {
    // Get all patients
    router.get('/', (req, res) => {
        db.all('SELECT * FROM patients', [], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(rows);
        });
    });

    // Add a new patient
    router.post('/', (req, res) => {
        const { name, patientNumber, symptoms, diagnosis } = req.body;
        db.run('INSERT INTO patients (name, patientNumber, symptoms, diagnosis) VALUES (?, ?, ?, ?)', 
            [name, patientNumber, symptoms, diagnosis], function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            // Emit patient update to all clients
            io.emit('patientUpdate'); // Emit update to all clients
            res.status(201).json({ id: this.lastID, name, patientNumber, symptoms, diagnosis });
        });
    });

    // Delete a patient by ID
    router.delete('/:id', (req, res) => {
        const id = req.params.id; // Get ID from request parameters
        db.run('DELETE FROM patients WHERE id = ?', id, function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            // Emit patient update to all clients
            io.emit('patientUpdate');
            res.status(204).send(); // No content
        });
    });
    

    return router;
};
