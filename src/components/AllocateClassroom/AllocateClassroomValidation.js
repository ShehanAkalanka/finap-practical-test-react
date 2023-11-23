export default async function Validation(classroomAllocation) {
  const errors = {};

  if (classroomAllocation.teacherId === 0) {
    errors.teacherId = "Please Select the Teacher";
    errors.isValiedTeacherId = false;
  } else {
    errors.isValiedTeacherId = true;
  }

  if (classroomAllocation.classroomId === 0) {
    errors.classroomId = "Please Select the Teacher";
    errors.isValiedClassroomId = false;
  } else {
    errors.isValiedClassroomId = true;
  }

  return errors;
}
