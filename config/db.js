const mysql = require("mysql")

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'root',
    database: 'db_Groupomania'
})

// connection à la base de donnée
db.connect((err) => {
    if(err){
        console.log(`error connecting: ${err.stack}`);
    } else{
        console.log("connecté à la base de donnée - db_Groupomania");
    }
})

module.exports = db;