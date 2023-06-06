const express = require("express");
const dotenv = require('dotenv')
const app = express();
const colors =  require('colors')
const userRoutes = require('./controllers/routes/userRoutes').router

dotenv.config({path: './.env'})

app.use(express.json())

// Routes
app.use('/api', userRoutes) 



// Port du server
app.listen(3030, () => {
    console.log("Lectur du server sur le port 3030".rainbow)
});
