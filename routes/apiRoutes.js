const fs = require('fs');
const notesInput = require("../db/db.json");
module.exports = function(app){

function writeToDB(notes){
    notes = JSON.stringify(notes);
    console.log(notes);
    fs.writeFileSync('./db/db.json', notes, function(err){
        if (err){
            return console.log(Err);
        };
    });
};

app.get('/api/notes',(req, res) =>{
    res.json(notesInput);
});

app.post("/api/notes", (res, req) => {
    if (notesInput.length == 0){
        req.body.id = "0";
    } else {
        req.body.id = JSON.stringify(JSON.parse(notesInput[notesInput.length - 1].id) + 1);
    }

    console.log("req.body.id: " + req.body.id);

    notesInput.push(req.body);

    writeToDB(notesInput);
    console.log(notesInput);

    res.json(req.body);
});

app.delete('/app/notes/:id', function(req, res){
    let id = req.params.id.toString();
    console.log(id);

    for (i=0; i< notesInput.length; i++){
if(notesInput[e].id == id){
    console.log("We found a Matching ID!");
    res.send(notesInput[e]);

    notesInput.splice(e,1);
    break;
}};

writeToDB(notesInput);

});
};