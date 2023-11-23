export default async function Validation(subjectAllocation) {
  const errors = {};

  if (subjectAllocation.teacherId === 0) {
    errors.teacherId = "Please Select the Teacher";
    errors.isValiedTeacherId = false;
  } else{
    errors.isValiedTeacherId = true;
  }

  if (subjectAllocation.subjectId === 0) {
    errors.subjectId = "Please Select the Teacher";
    errors.isValiedSubjectId = false;
  }
  else{
    errors.isValiedSubjectId = true;
  }

  return errors;
}
