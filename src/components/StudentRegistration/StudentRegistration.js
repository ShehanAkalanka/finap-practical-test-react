import React from "react";
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  Table,
} from "reactstrap";
import ClassroomSelector from "../Common/ClassroomSelector";
import { variables } from "../../Variables";
import axios from "axios";
import Validation from "./RegisterFormValidation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentRegistration = () => {
  const [studentList, setStudentList] = useState([]);
  const [studentId, setStudentId] = useState(0); //need when updating the students
  const [firtName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactedPerson, setContactedPersonName] = useState("");
  const [contactedNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState("");
  const [selectedClassroom, setSelectedClassroom] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);

  // const studentList = useSelector((state) => state.student);

  //validations
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    contactedPerson: "",
    contactedNumber: "",
    email: "",
    dateOfBirth: "",
    selectedClassroom: -1,
    isValiedFirstName: true,
    isValiedLastName: true,
    isValiedContactedPerson: true,
    isValiedContactedNumber: true,
    isValiedEmail: true,
    isValiedDateOfBirth: true,
    isValiedSelectedClassroom: true,
  });

  //fetch student List
  const fetchStudentDataList = async () => {
    await axios
      .get(variables.API_URL + "Student")
      .then((response) => {
        setStudentList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //fetch student Data By Id
  const fetchStudentDataById = async (id) => {
    try {
      const response = await axios.get(variables.API_URL + "Student/" + id);
      return response.data; // Return the data
    } catch (error) {
      console.log(error);
      throw error; // Optionally rethrow the error if needed
    }
  };

  // Callback function to receive the selected item
  const handleClassRoomSelect = (selectedClass) => {
    const classId = parseInt(selectedClass, 32);
    setSelectedClassroom(classId);
  };

  //set the age
  const calculateAge = () => {
    if (dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const currentDate = new Date();
      const ageInMilliseconds = currentDate - birthDate;
      const ageInYears = ageInMilliseconds / (365 * 24 * 60 * 60 * 1000);
      return Math.floor(ageInYears);
    } else {
      return null;
    }
  };

  const HandleDateOfBirthChange = (e) => {
    const newDob = e.target.value;
    setDateOfBirth(newDob);
    const age = calculateAge();
    setAge(age);
  };

  const handleClearClick = () => {
    setFirstName("");
    setLastName("");
    setContactedPersonName("");
    setContactNumber("");
    setEmail("");
    setDateOfBirth("");
    if(isEditMode){
      setStudentId(0);
    }
    setAge("");
    setSelectedClassroom(-1);
    setErrors({
      firstName: "",
      lastName: "",
      contactedPerson: "",
      contactedNumber: "",
      email: "",
      dateOfBirth: "",
      selectedClassroom: "",
      isValiedFirstName: true,
      isValiedLastName: true,
      isValiedContactedPerson: true,
      isValiedContactedNumber: true,
      isValiedEmail: true,
      isValiedDateOfBirth: true,
      isValiedSelectedClassroom: true,
    });
  };

  const studentData = {
    id: studentId,
    firstName: firtName,
    lastName: lastName,
    contactedPerson: contactedPerson,
    contactNo: contactedNumber,
    email: email,
    dateOfBirth: dateOfBirth,
    classroomId: selectedClassroom,
  };

  const handleRegisterClick = async () => {
    //handle button submit
    const validationErrors = await Validation(studentData);
    setErrors(validationErrors);

    // Remove the "id" field from the studentData object
    const { id, ...studentDataWithoutId } = studentData;

    // Check if any validation error is false
    const hasError = Object.values(validationErrors).includes(false);
    if (hasError) {
      console.log("Validation errors. Cannot submit data.");
      return;
    }

   try {
     const response = await axios.post(
       variables.API_URL + "Student",
       studentDataWithoutId,
       {
         headers: {
           "Content-Type": "application/json",
         },
       }
     );

     if (response.status === 200) {

       setStudentList((prevStudentList) =>
         prevStudentList.map((student) =>
           student.id === studentId ? response.data : student
         )
       );
       toast.success("Student Saved successfully");

     } else {
       // Handle unexpected status codes or error responses
       console.error("Error submitting data. Status:", response.status);
       console.error("Response Data:", response.data);
     }
   } catch (error) {
     // Handle network errors or other exceptions
     console.error("Error submitting data:", error);
   }
  };

  const btnEditClick = async (id) => {

    handleClearClick();
    //handle btn edit click
    const studentData = await fetchStudentDataById(id);
    if (studentData) {
      setStudentId(studentData.studentId);
      setFirstName(studentData.studentFirstName || "");
      setLastName(studentData.studentFirstName || "");
      setContactedPersonName(studentData.contactedPerson || "");
      setContactNumber(studentData.contactNo || "");
      setEmail(studentData.studentEmail || "");
      // Format dateOfBirth to "yyyy-MM-dd"
      const dateOfBirth = studentData.dateOfBirth
        ? new Date(studentData.dateOfBirth)
        : null;

      if (dateOfBirth) {
        const formattedDate = dateOfBirth.toISOString().split("T")[0];
        setDateOfBirth(formattedDate);
      } else {
        setDateOfBirth("");
      }
      setAge(studentData.age || "");
      setSelectedClassroom(studentData.classroomId || -1);
    }
    setIsEditMode(true);
  };

  const btnDeleteClick = async (id) => {
    //handle btn Delete click
    //handle delete here
    if (window.confirm("Are you sure you want to delete this Student?")) {
      try {
        await axios.delete(variables.API_URL + "Student/" + id);
        // Filter out the deleted Student from the students
        setStudentList((prevStudentList) =>
          prevStudentList.filter((student) => student.id !== id)
        );
        toast.success("Student deleted successfully");
      } catch (error) {
        toast.error("Error deleting Student: " + error.message);
        console.error(error);
      }
    }
  };

  const handleUpdateClick = async () => {
     //handle Update here
    const validationErrors = await Validation(studentData);
    setErrors(validationErrors);

    const hasError = Object.values(validationErrors).includes(false);
    if (hasError) {
      console.log("Validation errors. Cannot submit data.");
      return;
    }

    try {
      const response = await axios.put(
        variables.API_URL + "Student",
        studentData
      );
      // Find the updated Student in StudentList and replace it with the response data
      setStudentList((prevStudentList) =>
        prevStudentList.map((Student) =>
          Student.id === studentId ? response.data : Student
        )
      );
      toast.success("Student updated successfully");
    } catch (error) {
      toast.error("Error updating Student: " + error.message);
      console.error(error);
    }
  };

  const handleCreateNewClick = () => {
    //handle new item click button
    setIsEditMode(false);
    handleClearClick();
  };

  useEffect(() => {
    // Set the page title when the component mounts
    document.title = "Student Registration";

    //fetching student list
    fetchStudentDataList();
  }, []);

  return (
    <>
      <Container className="mb-3">
        <Row>
          <Col className="box">
            <p className="form-title">Student Registration</p>
            {isEditMode && (
              <Row className="mb-3">
                <Col>
                  <Button
                    id="btnCreateNew"
                    onClick={(e) => handleCreateNewClick(e)}
                    className="btn btn-success"
                  >
                    Create New Student
                  </Button>
                </Col>
              </Row>
            )}
            <Form className="box-inner">
              <Row>
                <Col md={6}>
                  <FormGroup row>
                    <Label sm={4}>First Name</Label>
                    <Col sm={8}>
                      <Input
                        id="FirstName"
                        placeholder="Enter Student's First Name"
                        type="text"
                        value={firtName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                        invalid={!errors.isValiedFirstName}
                      />
                      {!errors.isValiedFirstName && (
                        <FormFeedback>{errors.firstName}</FormFeedback>
                      )}
                    </Col>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup row>
                    <Label sm={4}>Last Name</Label>
                    <Col sm={8}>
                      <Input
                        id="LastName"
                        placeholder="Enter Student's Last Name"
                        type="text"
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                        invalid={!errors.isValiedLastName}
                      />
                      {!errors.isValiedLastName && (
                        <FormFeedback>{errors.lastName}</FormFeedback>
                      )}
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup row>
                    <Label sm={4}>Contacted Person</Label>
                    <Col sm={8}>
                      <Input
                        id="ContactedPerson"
                        placeholder="Enter the Contacted Person's Name"
                        type="text"
                        value={contactedPerson}
                        onChange={(e) => {
                          setContactedPersonName(e.target.value);
                        }}
                        invalid={!errors.isValiedContactedPerson}
                      />
                      {!errors.isValiedContactedPerson && (
                        <FormFeedback>{errors.contactedPerson}</FormFeedback>
                      )}
                    </Col>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup row>
                    <Label sm={4}>Contact Number</Label>
                    <Col sm={8}>
                      <Input
                        id="ContactNumber"
                        placeholder="Enter the Contact Number"
                        type="number"
                        value={contactedNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        invalid={!errors.isValiedContactedNumber}
                      />
                      {!errors.isValiedContactedNumber && (
                        <FormFeedback>{errors.contactedNumber}</FormFeedback>
                      )}
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup row>
                    <Label sm={4}>Email Address</Label>
                    <Col sm={8}>
                      <Input
                        id="Email"
                        placeholder="Enter the Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        invalid={!errors.isValiedEmail}
                      />
                      {!errors.isValiedEmail && (
                        <FormFeedback>{errors.email}</FormFeedback>
                      )}
                    </Col>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup row>
                    <Label sm={4}>Date Of Birth</Label>
                    <Col sm={8}>
                      <Input
                        id="DateOfBirth"
                        type="date"
                        value={dateOfBirth}
                        onChange={HandleDateOfBirthChange}
                        invalid={!errors.isValiedDateOfBirth}
                      />
                      {!errors.isValiedDateOfBirth && (
                        <FormFeedback>{errors.dateOfBirth}</FormFeedback>
                      )}
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup row>
                    <Label sm={4}>Student's Age is : </Label>
                    <Col sm={8}>
                      <span>{age}</span>
                    </Col>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup row>
                    <Label sm={4}>Classroom</Label>
                    <Col sm={8}>
                      <ClassroomSelector
                        onClassroomChange={handleClassRoomSelect}
                        selectedItem={selectedClassroom}
                      />
                    </Col>
                    {!errors.isValiedSelectedClassroom && (
                      <span className="text-danger">
                        {errors.selectedClassroom}
                      </span>
                    )}
                  </FormGroup>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col col={6}>
                  {!isEditMode && (
                    <Button
                      id="btnRegister"
                      block
                      onClick={(e) => handleRegisterClick(e)}
                      className="btn btn-primary"
                    >
                      Register Student
                    </Button>
                  )}
                  {isEditMode && (
                    <Button
                      id="btnUpdate"
                      block
                      onClick={(e) => handleUpdateClick(e)}
                      className="btn btn-info "
                    >
                      Update Student
                    </Button>
                  )}
                </Col>
                <Col col={6}>
                  <Button
                    block
                    color="light"
                    onClick={(e) => handleClearClick(e)}
                  >
                    Clear Form
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className="box">
            <p className="form-title">Students List</p>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Email</th>
                  <th>DOB</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {studentList.map((data) => (
                  <tr key={data.id}>
                    <td>{data.firstName + " " + data.lastName}</td>
                    <td>{data.email}</td>
                    <td>{data.dateOfBirth}</td>
                    <td>
                      <Row>
                        <Col md={6}>
                          <Button
                            className="btn btn-primary"
                            onClick={(e) => btnEditClick(data.id)}
                          >
                            Edit
                          </Button>
                        </Col>
                        <Col md={6}>
                          <Button
                            className="btn btn-danger"
                            onClick={(e) => btnDeleteClick(data.id)}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default StudentRegistration;
