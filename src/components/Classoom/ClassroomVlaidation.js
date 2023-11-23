export default async function Validation(classroomData) {

    const errors = {}


    if (classroomData.classroomName === "") {
      errors.classroomName = "Classroom Name is Required";
      errors.isValiedClassroomName = false;
    } else{
        errors.isValiedClassroomName= true;
    }
    return errors
}