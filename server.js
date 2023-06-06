const express = require("express");
const dotenv = require('dotenv')
const app = express();
const userRoutes = require('./routes/user.routes').router

dotenv.config({path: './.env'})

app.use(express.json())

// Routes
app.use('/api', userRoutes)



// Port du server
app.listen(3030, () => {
    console.log("Lecture du server sur le port 3030")
});
