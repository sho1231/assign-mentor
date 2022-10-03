const routes = require('express').Router();
const { assignMentor,assignOrChange,displayStudent } = require('../Services/mentors.services');

routes.post("/assignMentor/:mentorId", assignMentor);
routes.put("/assignorchange",assignOrChange);
routes.get("/getStudents",displayStudent);
module.exports=routes;

