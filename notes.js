const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return 'Your notes...';
}

const addNote = (title, body) => {

    const notes = loadNotes();
    const duplicateNote = notes.filter((note) => note.title == title).find((note) => note.title == title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        }) 
        saveNotes(notes);
        console.log(chalk.green.inverse("Added new note with title: ", title));
    } else {
        console.log(chalk.red.inverse("Note: " + title + " is already taken!"));
    }
}

const removeNote = (title) => {

    const notes = loadNotes();

    const remainingNotes = notes.filter((note) => note.title != title)

    if (notes.length > remainingNotes.length) {

        console.log(chalk.green.inverse("Removed note with title: ", title));
        saveNotes(remainingNotes);
    } else {

        console.log(chalk.red.inverse("No note with title: " + title + " exists!"));
    }
}

const listNotes = () => {

    console.log(chalk.blue.inverse.bold("Your notes: "));
    loadNotes().forEach((note) => console.log(chalk.cyan(note.title)));
}

const readNote = (title) => {

    const desiredNote = loadNotes().find((note) => note.title == title);

    if (desiredNote) {
        console.log(chalk.inverse(desiredNote.title));
        console.log(desiredNote.body);
    } else {
        console.log(chalk.inverse.red("No note exists with title: " + title))
    }
}

const saveNotes = (notes) => {

    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {

        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {

        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};