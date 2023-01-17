const chalk = require('chalk');
const fs = require('fs');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })

        console.log(chalk.green.inverse('New note added'))
    } else {
        console.log(chalk.red.inverse('Not title taken!')) 
    }

    saveNotes(notes);
}

const readNote = (title) => {
    const notes = loadNotes();
    const findNote = notes.find((note) => note.title === title);

    if (findNote) {
        console.log(chalk.green.inverse('Title of note: ' + findNote.title))
        console.log('Body of note: ' + findNote.body)
    } else {
        console.log(chalk.red.inverse('No note found with title: ' + title))
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notDuplicatedNotes = notes.filter((note) => note.title != title)

    if (notes.length > notDuplicatedNotes.length) {
        saveNotes(notDuplicatedNotes);

        console.log(chalk.green('the note with title: ' + title + ' was removed'))
    } else {
        console.log(chalk.red('No note found'))
    }
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)

    fs.writeFileSync('notes.json', dataJson)
}

const listNotes = () => {
    console.log(chalk.green.inverse('Your notes'))
        notesList = loadNotes();
        notesList.forEach((note) => {
            console.log(chalk.grey.inverse('Title note: ' + note.title))
        });
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()

        return JSON.parse(dataJson);
    } catch (e) {
        return [];
    }

}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}