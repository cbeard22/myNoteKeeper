const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {

    app.get('/api/notes', (req, res) => {
        const notesInput = JSON.parse(fs.readFileSync('db/db.json', "utf-8"));
        res.json(notesInput);
    })

    app.post("/api/notes", (res, req) => {
        const notesInput=JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));
        console.log(req.body);
        let notes = req.body;
        notes.id = uuidv4();
        notesInput.push(notes);
        fs.writeFileSync('db/db.json', JSON.stringify(notesInput));
        res.json(notes);
    });
};