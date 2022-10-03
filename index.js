const express = require('express');
const app = express();
const mongo = require('./Shared/mongo');
const students = require('./Routes/student.routes');
const mentors= require('./Routes/mentors.routes');
const cors=require('cors');
(async () => {
    try {
        await mongo.connect();
        app.use(cors());
        app.use(express.json());
        app.use("/",students);
        app.use("/",mentors);
        app.listen(5001, () => console.log('listening on port 5001'));
    }
    catch (e) {
        console.log(e);
    }
})()