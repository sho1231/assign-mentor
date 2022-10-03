const mongo = require('../Shared/mongo')

module.exports = {
    async createStudent(req, res) {
        try {
           const student= await mongo.students.insertOne(req.body);
            res.status(200).json(student)
        }
        catch (e) {
            console.log(e);
            res.status(500).json({
                error: "Something went wrong",
            });
        }
    },
    async createMentor(req, res) {
        try {
            const mentor=await mongo.mentors.insertOne(req.body);
            res.status(200).json(mentor);
        }
        catch (e) {
            console.log(e);
            res.status(500).json({
                error: "Something went wrong",
            });
        }
    },
}