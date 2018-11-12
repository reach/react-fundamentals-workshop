const shell = require("shelljs");

const hasYarn = require("has-yarn");

let lessons = [
  "1-rendering",
  "2-composition",
  "3-state",
  "4-data-flow",
  "5-forms",
  "6-apps",
  "7-testing",
  "8-imperative-to-declarative"
];

lessons.forEach(dir => {
  shell.cd(`${dir}`);
  shell.echo(`\nInstalling Lesson: ${dir}:`);
  if (hasYarn) {
    shell.exec(`yarn`);
  } else {
    shell.exec(`npm install`);
  }
  shell.cd("..");
});
