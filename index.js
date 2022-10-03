const express = require('express');
const app = express();
const mongo = require('./Shared/mongo');
const students = require('./Routes/student.routes');
const mentors= require('./Routes/mentors.routes');
const cors=require('cors');
const dotenv = require('dotenv');


(async () => {
    try {
        await mongo.connect();
        dotenv.config();
        app.use(cors());
        app.use(express.json());
        app.get("/",()=>res.send("Running"))
        app.use("/",students);
        app.use("/",mentors);
        app.listen(process.env.PORT, () => console.log('listening on port',process.env.PORT));
    }
    catch (e) {
        console.log(e);
    }
})()