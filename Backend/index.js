const express = require('express')
const connectToMongo = require('./db.js');
var cors = require('cors');
connectToMongo();
const app = express()
const port = 5000;

app.use(cors());
// app.get('/', (req, res) => {
//     res.send('Hello home!')
// })

app.use(express.json());
//available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
    console.log(`Inotebook listening at http://localhost:${port}`)
})