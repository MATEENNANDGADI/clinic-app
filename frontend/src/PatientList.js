import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

// Initialize the socket connection
const socket = io('http://localhost:8080');

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPatients();

        // Listen for updates via socket.io
        socket.on('patientUpdate', () => {
            fetchPatients();
        });

        return () => {
            socket.off('patientUpdate');
        };
    }, []);

    const fetchPatients = () => {
        setLoading(true);
        axios.get('http://localhost:8080/patients')
            .then(response => {
                setPatients(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching patients:', error);
                setLoading(false);
            });
    };

    // Function to delete a patient
    const deletePatient = (id) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            axios.delete(`http://localhost:8080/patients/${id}`)
                .then(() => {
                    fetchPatients(); // Refresh the patient list
                })
                .catch(error => {
                    console.error('Error deleting patient:', error);
                });
        }
    };
    

    return (
        <div>
            <h2>Patient List</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                patients.length > 0 ? (
                    patients.map(patient => (
                        <div key={patient.id}>
                            <p>{patient.name} - #{patient.patientNumber}</p>
                            <p>Symptoms: {patient.symptoms}</p>
                            <p>Diagnosis: {patient.diagnosis}</p>
                            <button onClick={() => deletePatient(patient.id)}>Delete</button>
                            
                        </div>
                    ))
                ) : (
                    <p>No patients found</p>
                )
            )}
        </div>
    );
};

export default PatientList;
