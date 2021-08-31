import chalk from 'chalk';
//meme chose que
//const chalk = require('chalk');
/* Test de Chalk
const log = console.log;
log(chalk.blue('Hello') + ' World' + chalk.red('!'));
*/
const PORT = 8000;
import app from './src/app.js';
app.listen(PORT, err => {
    console.log(chalk.blue(`Server listening on port: ${PORT}`));
});