require('dotenv').config()
const express = require("express");

const app = express();
const mongo = require("mongodb");
const { decode } = require("punycode");
const port = process.env.PORT;
const cookieParser = require('cookie-parser')
const db = require('./models');


require('./routes/users.routes')(app);



// parse application/json

app.get("/status", async (req, res) => {
    return res.status(200).json({ message: "Server is up and running." });
})

app.listen(port, ()=>{
    console.log(`Server is up and running at port: ${port}`);
})

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log('Connected to database!');
})
.catch(err =>{
    console.log("Cannot connect to database", err);
    process.exit();
})


