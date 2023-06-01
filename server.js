const express = require("express");
const mysql = require("mysql");
const dotenv = require('dotenv')

dotenv.config({path: './.env'})

const app = express();
app.use(express.json())

// Routes
app.use('/api/user', userRoutes)

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER, 
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})
