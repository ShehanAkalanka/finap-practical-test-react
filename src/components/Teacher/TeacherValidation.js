export default async function Validation(teacherData) {
  const errors = {};

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const phoneRegex = /^\d{10}$/;

  if (teacherData.firstName === "") {
    errors.firstName = "First Name is Required";
    errors.isValiedFirstName = false;
  } else {
    errors.isValiedFirstName = true;
  }

  if (teacherData.lastName === "") {
    errors.lastName = "Last Name is Required";
    errors.isValiedLastName = false;
  } else {
    errors.isValiedLastName = true;
  }

  if (teacherData.contactNo === "") {
    errors.contactNumber = "Contact Number is Required";
    errors.isValiedContactNumber = false;
  } else if (!phoneRegex.test(teacherData.contactNo)) {
    errors.contactNumber = "Contact Number is Incorrect";
    errors.isValiedContactNumber = false;
  } else {
    errors.isValiedContactNumber = true;
  }

  if (teacherData.email === "") {
    errors.email = "Email is Required";
    errors.isValiedEmail = false;
  } else if (!emailRegex.test(teacherData.email)) {
    errors.email = "Email is Incorrect";
    errors.isValiedEmail = false;
  } else {
    errors.isValiedEmail = true;
  }

  return errors;
}
