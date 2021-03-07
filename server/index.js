// Require Libs
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Require Local Files
const routes = require(path.join(__dirname, 'routes.js'));

// Variables
const port = process.env.port || 3000;

// Executions
if (process.env.NODE_ENV !== 'production') {
    const chokidar = require('chokidar');
    const watcher = chokidar.watch(path.join(__dirname, '..', 'client'));
    watcher.on('ready', function() {
        watcher.on('all', function() {
            console.log("Clearing /client/ module cache from server");
            Object.keys(require.cache).forEach(function(id) {
                if (/[\/\\]app[\/\\]/.test(id)) {
                    delete require.cache[id];
                }
            });
        });
    }); // watcher
} // if

// Building app
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
// app.use('/', routes);
app.listen(port, () => {
    console.log(`Captain! The app's up on port ${port}`);
});