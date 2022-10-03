const routes = require('express').Router();
const { createStudent, createMentor } = require('../Services/students.services');

routes.post("/createStudent", createStudent);
routes.post("/createMentor", createMentor);

module.exports = routes;
