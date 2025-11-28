const express = require('express');
const app = express();
__path = process.cwd()
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;

// Only keep pairing code functionality
let code = require('./pair');
require('events').EventEmitter.defaultMaxListeners = 500;

// Remove QR route
app.use('/code', code);

// Remove QR page route
app.use('/pair', async (req, res, next) => {
    res.sendFile(__path + '/pair.html')
})

// Remove QR route completely
app.use('/', async (req, res, next) => {
    res.sendFile(__path + '/main.html')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`
🚀 LARA-MD Server Started
💃🏻 Powered by SADEESHA CODER
📍 Server running on http://localhost:` + PORT)
})

module.exports = app
