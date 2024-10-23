import React, { useState } from 'react';
import axios from 'axios';

const PatientForm = () => {
    const [name, setName] = useState('');
    const [patientNumber, setPatientNumber] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [diagnosis, setDiagnosis] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPatient = { name, patientNumber, symptoms, diagnosis };

        axios.post('http://localhost:8080/patients', newPatient)
            .then(response => {
                console.log('Patient added:', response.data);
                // Reset form fields
                setName('');
                setPatientNumber('');
                setSymptoms('');
                setDiagnosis('');
            })
            .catch(error => {
                console.error('Error adding patient:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Patient</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Patient Number"
                value={patientNumber}
                onChange={(e) => setPatientNumber(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Symptoms"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Diagnosis"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                required
            />
            <button type="submit">Add Patient</button>
        </form>
    );
};

export default PatientForm;
