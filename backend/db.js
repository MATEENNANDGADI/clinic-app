const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to SQLite database');
});

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS patients (id INTEGER PRIMARY KEY, name TEXT, symptoms TEXT, diagnosis TEXT, patientNumber INTEGER)');
});

module.exports = db;
