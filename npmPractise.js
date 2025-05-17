import inquirer from 'inquirer';
import qr from 'qr-image'
import fs from 'fs'

inquirer
  .prompt([
    {
        message:"What is your dying wish?",
        name: "die"}
  ])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('bewildered.png'));
  })
  .catch((error) => {
    if (error.isTtyError) {
      "Prompt couldn't be rendered in the current environment"
    } else {
      "Something else went wrong"
    }
  });