const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {

    app.get('/api/notes', (req, res) => {
        const notesInput = JSON.parse(fs.readFileSync('db/db.json', "utf-8"));
        res.json(notesInput);
    });

    app.post('/api/notes', (req, res) => {
        const notesInput = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));
        const newNote = req.body;
        newNote.id = uuidv4();
        notesInput.push(newNote);
        fs.writeFileSync('db/db.json', JSON.stringify(notesInput));
        res.json(newNote);
    });

    app.delete('/api/notes/:id', (req, res) => {
        let data = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));
        let noteId = req.params.id;
        let newArray = data.filter(note => note.id !== noteId);
        fs.writeFileSync('db/db.json', JSON.stringify(newArray), (err) => {
            if (err) throw err
        });
        res.json(newArray);
    });
};