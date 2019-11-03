 const chalk = require('chalk');
 const yargs = require('yargs');

 const notes = require('./notes.js');

 // Add command in the console. 
 yargs.command ({
     command : 'add',
     describe: 'adds a new note',
     builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
     },
     handler(argv) {
         notes.addNote(argv.title, argv.body);
    }
 })

 // Remove Command in the console.

 yargs.command({

    command : 'remove',
    describe: 'removes a note',
    builder: {
        title: {
            describe: 'The note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
   }
})

// Read Command in the console.
yargs.command({
    command : 'read',
    describe: 'reads a note',
    builder: {
        title: {
            describe: "Title of the note",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
   }
})

// List Command in the console.
yargs.command({
    command : 'list',
    describe: 'lists all notes',
    handler() {
        notes.listNotes();
   }
})
 
yargs.parse();

