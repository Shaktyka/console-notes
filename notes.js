const chalk = require(`chalk`);
const fs = require(`fs`);
const path = require(`path`);
const moment = require(`moment`);
moment().format();

const notePath = path.join(__dirname, `notes.json`);

// Прочитать содержимое файла с заметками
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

// Сохранить заметку
const saveNotes = (content) => {
  fs.writeFile(notePath, JSON.stringify(content), (err) => {
    if (err) {
      throw new Error(err);
    }
  });
};

// Добавить заметку
const addNote = (title, text) => {
  getNotes((notes) => {
    const dublicateNote = notes.find(note => note.title === title);
    if (dublicateNote) {
      console.log(chalk.red.inverse(`Заметка с таким названием уже существует`));
    } else {
      const dateNow = moment().valueOf();
      notes.push({title, text, date:dateNow});
      saveNotes(notes);
      console.log(chalk.green.inverse(`Заметка добавлена`));
    }
  });
};

// Прочитать список всех заметок
const listNotes = () => {
  getNotes((notes) => {
    if (notes.length) {
      // notes.forEach((note) => {
      //   console.log(chalk.gray(moment(note.date).format(`DD:MM:YYYY HH:mm:ss`)), note.title);
      // });
      notes.map((note) => {
        note.date = moment(note.date).format(`DD:MM:YYYY HH:mm:ss`);
      });
      console.table(notes, [`date`, `title`, `text`]);
    } else {
      console.log(chalk.blue(`Заметок пока нет, добавьте первую`));
    }
  });
};

// Очистить список всех заметок
const clearNotes = () => {
  fs.writeFile(notePath, ``, (err) => {
  if (err) {
      throw new Error(err);
  } else {
    console.log(chalk.red(`Все заметки удалены, добавьте новую.`));
  }
});
};

// Прочесть заметку по переданному title
const readNote = (title) => {
  getNotes((notes) => {
    const note = notes.find((n) => n.title === title);
    if (note) {
      console.log(moment(note.date).format(`DD:MM:YYYY HH:mm:ss`));
      console.log(note.title);
      console.log(note.text);
    } else {
      console.log(chalk.red(`Заметка с названием "${note.title}" не найдена`));
    }
  });
};

// Удалить заметку
const deleteNote = (title) => {
  getNotes((notes) => {
    const updatedNotes = notes.filter((note) => note.title !== title);
    if (updatedNotes.length !== notes.length) {
      saveNotes(updatedNotes);
      console.log(chalk.green(`Заметка с названием "${title}" успешно удалена`));
    } else {
      console.log(chalk.red(`Заметка с названием "${note.title}" не найдена`));
    }
  });
};

module.exports = {
  addNote,
  listNotes,
  readNote,
  deleteNote,
  clearNotes
};
