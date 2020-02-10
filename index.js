const yargs = require(`yargs`);
const pkg = require(`./package.json`);
const notes = require(`./notes.js`);

yargs.version(pkg.version);

yargs.command({
  command: `add`,
  describe: `Добавить новую заметку`,
  builder: {
    title: {
      type: `string`,
      demandOption: true,
      describe: `Название заметки`
    },
    text: {
      type: `string`,
      demandOption: true,
      describe: `Текст заметки`
    }
  },
  handler({title, text}) {
    notes.addNote(title, text);
  }
});

yargs.command({
  command: `list`,
  describe: `Показать список заметок`,
  handler() {
    notes.listNotes();
  }
});

yargs.command({
  command: `read`,
  describe: `Показать контент выбранной заметки`,
  builder: {
    title: {
      type: `string`,
      demandOption: true,
      describe: `Название заметки`
    }
  },
  handler({title}) {
    notes.readNote(title);
  }
});

yargs.command({
  command: `delete`,
  describe: `Удалить заметку`,
  builder: {
    title: {
      type: `string`,
      demandOption: true,
      describe: `Название заметки`
    }
  },
  handler({title}) {
    notes.deleteNote(title);
  }
});

yargs.command({
  command: `clear-all`,
  describe: `Удалить весь список заметок`,
  handler() {
    notes.clearNotes();
  }
});

yargs.parse();
