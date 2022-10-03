url:https://studentassignedmentor.herokuapp.com

To create a new student
path:"/createStudent"
method:"POST"
req.body:{
    name:<type here name>
}
example of req.body:{
	"name":"Ram Guvi"
}




To create a new mentor
path:"/createMentor"
method:"POST"
req.body:{
    name:<type here name>
}
example of req.body:{
	"name":"Guvi2"
}




to assign a mentor
path:"/assignMentor/:mentorId"
method:"POST",
req.body:{
    <ObjectId of Student from student collection>:<Student name>
    .....
}
example of req.body:{
	"633adad3556dc12e4a99be0f":"Abhlias Guvi",
	"633ae3d4b5c491cde3d08be4":"Shourja Guvi"
}





To assign or change mentor of a particular student
path:"/assignorchange"
method:"PUT
req.body:{
    stuId:<Student ObjectId from student collection>,
    mentorId:<mentor ObjectId from mentor collection>
}

example of req.body:{
	"stuId":"633ae3dbb5c491cde3d08be5",
	"mentorId":"633adb09556dc12e4a99be13"
}




To display students of a particular mentor
path:"/getStudents?id=<mentor ObjectId from mentor collection>"
method:"GET",
