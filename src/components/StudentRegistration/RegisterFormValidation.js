export default async function Validation(studentData) {

    const errors = {}

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const phoneRegex = /^\d{10}$/;

    if (studentData.firstName === "") {
      errors.firstName = "First Name is Required";
      errors.isValiedFirstName = false;
    } else{
        errors.isValiedFirstName= true;
    }

    if (studentData.lastName === "") {
      errors.lastName = "Last Name is Required";
      errors.isValiedLastName = false;
    } else {
      errors.isValiedLastName = true;
    }

    if (studentData.contactedPerson === "") {
      errors.contactedPerson = "Contact Person Name is Required";
      errors.isValiedContactedPerson = false;
    } else {
      errors.isValiedContactedPerson = true;
    }

    if (studentData.contactNo === "") {
      errors.contactedNumber = "Contact Number is Required";
      errors.isValiedContactedNumber = false;
    } else if (!phoneRegex.test(studentData.contactNo)) {
      errors.contactedNumber = "Contact Number is Incorrect";
      errors.isValiedContactedNumber = false;
    } else {
      errors.isValiedContactedNumber = true;
    }

    if (studentData.email === "") {
      errors.email = "Email is Required";
      errors.isValiedEmail = false;
    } else if (!emailRegex.test(studentData.email)) {
      errors.email = "Email is Incorrect";
      errors.isValiedEmail = false;
    } else {
      errors.isValiedEmail = true;
    }

    if (studentData.dateOfBirth === "") {
      errors.dateOfBirth = "Date Of Birth is Required";
      errors.isValiedDateOfBirth = false;
    } else {
      const birthDate = new Date(studentData.dateOfBirth);
      const currentDate = new Date();
      const ageInMilliseconds = currentDate - birthDate;
      const ageInYears = ageInMilliseconds / (365 * 24 * 60 * 60 * 1000);
      const age = Math.floor(ageInYears);
      if (age !== null && age > 5) {
        errors.isValiedDateOfBirth = true;
      }
      else{
        errors.dateOfBirth = "Date Of Birth is Incorrect";
        errors.isValiedDateOfBirth = false;
      }
    }

    if (studentData.selectedClassroom === 0) {
      errors.selectedClassroom = "Please Select a Classroom";
      errors.isValiedSelectedClassroom = false;
    } else {
      errors.isValiedSelectedClassroom = true;
    }

    return errors;

}