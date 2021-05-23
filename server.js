const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();
const { v4: uuidv4 } = require('uuid');
const { LOADIPHLPAPI } = require("dns");


const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const savePath = path.resolve(__dirname, "db");
const saveFile = path.join(savePath, "db.json");

const fileData = fs.readFileSync(saveFile, error => {
    if (error) throw error;
});

let savedData = JSON.parse(fileData);

app.get("/notes", async (req, res) => {
    res.sendFile(path.resolve("./public/notes.html"))
});

//`GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", async (req, res) => {
    return res.json(savedData);
});

//GET a specific note by ID
app.get("api/notes/:id", async (req, res) => {
    const userChoice = req.params.id;
    for (let i = 0; i < savedData.length; i++) {
        if (userChoice == savedData[i].id) {
            return res.json(savedData[i])
        }
    }

});

app.post("/api/notes", (req, res) => {
    const newNote = req.body
    newNote.id = uuidv4();

    savedData.push(newNote);
    fs.writeFile(saveFile, JSON.stringify(savedData), error => {
        if (error) {
            throw error;
        }
        console.log(`New note was successfully added!`);
    })
    res.json(newNote)
});

app.delete("/api/notes/:id", async (req, res) => {
    const remove = req.params.id;
    savedData = savedData.filter((note) => note.id !== remove);
    finalNotes = JSON.stringify(savedData)
    fs.writeFile(saveFile, finalNotes, (error) =>{
        if (error) {
            throw error;
        }
    });
    return res.json(savedData);
});

app.get("*", async (req, res) => {
    res.sendFile(path.resolve("./public/index.html"))
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));