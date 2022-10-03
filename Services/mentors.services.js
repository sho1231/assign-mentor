const mongo = require('../Shared/mongo');

module.exports = {
    async assignMentor(req, res) {
        try {
            const studId = Object.keys(req.body);
            const stuName = Object.values(req.body);
            let isPresent = true;
            let isAssigned = false;
            await Promise.all(studId.map(async (id) => {
                const student = await mongo.students.findOne({ _id: mongo.ObjectId(id) });
                if (!student) {
                    isPresent = false;
                    return;
                }
                const assign = await mongo.assigned.findOne({ studentId: mongo.ObjectId(id) });
                if (assign) {
                    isAssigned = true;
                    return;
                }
            }))
            if (!isPresent) return res.status(200).json({ message: "Student not found" });
            if (isAssigned) return res.status(200).json({ message: "Student is already assigned" });
            const mentor = await mongo.mentors.findOne({ _id: mongo.ObjectId(req.params.mentorId) });
            if (!mentor) return res.status(404).json({ message: "Mentor not found" });
            Promise.all(studId.map(async (id, ind) => {
                await mongo.assigned.insertOne({
                    mentorId: mongo.ObjectId(mentor._id),
                    mentorName: mentor.name,
                    studentId: mongo.ObjectId(id),
                    studentName: stuName[ind],
                })
            }))
            res.status(200).json({ message: "Success" });
        }
        catch (e) {
            console.log(e);
            res.status(500).json({
                error: "Something went wrong",
            });
        }
    },
    async assignOrChange(req, res) {
        try {
            const student = await mongo.students.findOne({ _id: mongo.ObjectId(req.body.stuId) });
            if (!student) return res.status(404).json({ message: "No student found" });
            const mentor = await mongo.mentors.findOne({ _id: mongo.ObjectId(req.body.mentorId) });
            if (!mentor) return res.status(404).json({ message: "No Mentor found" });
            const assigned = await mongo.assigned.findOne({ studentId: mongo.ObjectId(req.body.stuId) });
            if (!assigned) {
                await mongo.assigned.insertOne({
                    mentorId: mongo.ObjectId(mentor._id),
                    mentorName: mentor.name,
                    studentId: mongo.ObjectId(student._id),
                    studentName: student.name
                })
            }
            else {
                await mongo.assigned.updateOne({ studentId: mongo.ObjectId(student._id) }, { $set: { mentorId: mongo.ObjectId(mentor._id), mentorName: mentor.name } });
            }
            res.status(200).json({
                message: "Assigned",
            });
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    async displayStudent(req, res) {
        try {
            const mentor = await mongo.mentors.findOne({ _id: mongo.ObjectId(req.query.id) });
            if (!mentor) return res.status(404).json({ message: "mentor not found" });
            const students = await mongo.assigned.find({ mentorId: mongo.ObjectId(req.query.id) }, { projection: { studentName: 1, _id: 0 } }).toArray();
            res.status(200).json(students);
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}