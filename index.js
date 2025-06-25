const express = require('express');
const path = require('path');
const app = express();
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './index.html')))
app.use(express.static(path.join(__dirname, 'build/public')))
//app.use(express.static('build/public'));
app.listen(9999, ()=> console.log('Server listening on port: 9999.'));