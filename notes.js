const chalk = require(`chalk`);
const fs = require(`fs`);
const path = require(`path`);
const notePath = path.join(__dirname, `notes.json`);

const getNotes = (cb) => {
  fs.readFile(notePath, `utf-8`, (err, content) => {
    if (err) {
      throw new Error(err);
    }

    try {
      cb(JSON.parse(content));
    } catch(e) {
      cb([]);
    }
  });
};

const saveNotes = (content) => {
  fs.writeFile(notePath, JSON.stringify(content), (err) => {
    if (err) {
      throw new Error(err);
    }
  });
};

const addNote = (title, text) => {
  getNotes((notes) => {
    const dublicateNote = notes.find(note => note.title === title);
    if (dublicateNote) {
      console.log(chalk.red.inverse(`Заметка с таким названием уже существует`));
    } else {
      notes.push({title, text});
      saveNotes(notes);
      console.log(chalk.green.inverse(`Заметка добавлена`));
    }
  });
};

const listNotes = () => {
  getNotes((notes) => {
    if (notes.length > 0) {
      notes.forEach((note) => {
        console.log(note.title);
      });
    } else {
      console.log(chalk.blue(`Заметок пока нет, добавьте первую`));
    }
  });
};

const readNote = (title) => {
  getNotes((notes) => {
    const note = notes.find((n) => n.title === title);
    if (note) {
      console.log(chalk.orange(`Заметка:`));
      console.log(note.title);
      console.log(note.text);
    } else {
      console.log(chalk.red(`Заметка с названием "${note.title}" не найдена`));
    }
  });
};

const deleteNote = (title) => {
  
};

module.exports = {
  addNote,
  listNotes,
  readNote,
  deleteNote
};
