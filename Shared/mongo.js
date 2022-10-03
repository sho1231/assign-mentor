const { MongoClient, ObjectId } = require('mongodb');

const mongo = {
    db: null,
    students: null,
    mentors: null,
    assigned: null,
    ObjectId,
    async connect() {
        try {
            const client = new MongoClient("mongodb+srv://sho121:mp33VUXLtbPHfcyL@map.ijprg.mongodb.net/?retryWrites=true&w=majority");
            await client.connect();
            this.db = client.db("lecture");
            this.students = await this.db.collection("students");
            this.mentors = await this.db.collection("mentors");
            this.assigned = await this.db.collection("assigned");
            console.log("Mongo connection established");
        }
        catch (e) {
            console.log(e);
        }
    }
}

module.exports = mongo;