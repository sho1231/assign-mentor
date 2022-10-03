const mongo = require('../Shared/mongo')

module.exports = {
    async createStudent(req, res) {
        try {
            await mongo.students.insertOne(req.body);
            res.status(200).json({ message: "Student successfully created" })
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
            await mongo.mentors.insertOne(req.body);
            res.status(200).json({ message: "Mentor successfully created" });
        }
        catch (e) {
            console.log(e);
            res.status(500).json({
                error: "Something went wrong",
            });
        }
    },
}