export default async function Validation(subjectData) {
  const errors = {};

  if (subjectData.subjectName === "") {
    errors.SubjectName = "Subject Name is Required";
    errors.isValiedSubjectName = false;
  } else {
    errors.isValiedSubjectName = true;
  }
  return errors;
}
