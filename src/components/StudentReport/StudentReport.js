import React from "react";
import { useEffect,useState } from "react";
import { Container,Row,Col,Form,FormGroup,Label,Input,Table } from "reactstrap";
import { variables } from "../../Variables";
import StudentSelector from "../Common/StudentSelector";
import axios from "axios";

const StudentReport = () => {
  const [classroom, setClassroom] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(0);
  const [studentData, setStudentData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);

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

  useEffect(() => {
    // Set the page title when the component mounts
    document.title = "Student Detailed Report";
  }, []);
  

  // Callback function to receive the selected item
  const handleStudentSelect = async (selectedStudent) => {
    const studentId = parseInt(selectedStudent, 32);
    setSelectedStudent(studentId);
    const studentData = fetchStudentDataById(studentId);
    setStudentData(studentData);

    try {
      const studentData = await fetchStudentDataById(studentId);

      // Update the form fields with the student data
      setClassroom(studentData.classroomName);
      setContactPerson(studentData.contactedPerson);
      setContactNo(studentData.contactNo);
      setDateOfBirth(studentData.dateOfBirth);
      setEmail(studentData.studentEmail);

      const teachersArray = studentData.teachers.map((teacher) => {
        // Extract the relevant properties from each teacher
        const { teacherId, teacherName, subjects } = teacher;

        // Create a new object with the extracted properties
        return { teacherId, teacherName, subjects };
      });
      setTeacherData(teachersArray);
      
    } catch (error) {
      console.log(error);
      // Handle errors here if necessary
    }
  };

  return (
    <>
      <Container className="mb-3">
        <Row>
          <Col className="box">
            <p className="form-title">Student Registration</p>
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup row>
                    <Label sm={4}>Student</Label>
                    <Col sm={8}>
                      <StudentSelector onStudentChange={handleStudentSelect} />
                    </Col>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup row>
                    <Label sm={4}>Classroom</Label>
                    <Col sm={8}>
                      <Input
                        id="classroom"
                        type="text"
                        value={classroom}
                        readOnly
                      />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup row>
                    <Label sm={4}>Contact Person</Label>
                    <Col sm={8}>
                      <Input
                        id="contactPerson"
                        type="text"
                        value={contactPerson}
                        readOnly
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup row>
                    <Label sm={4}>Email Address</Label>
                    <Col sm={8}>
                      <Input id="email" type="text" value={email} readOnly />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup row>
                    <Label sm={4}>Contact Number</Label>
                    <Col sm={8}>
                      <Input
                        id="contactNo"
                        type="text"
                        value={contactNo}
                        readOnly
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup row>
                    <Label sm={4}>Date Of Birth</Label>
                    <Col sm={8}>
                      <Input
                        id="dateOfBirth"
                        type="text"
                        value={dateOfBirth}
                        readOnly
                      />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className="box">
            <p className="form-title">Teacher & Subject Details</p>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Teacher</th>
                </tr>
              </thead>
              <tbody>
                {teacherData.map((teacher) =>
                  teacher.subjects.length > 0 ? (
                    teacher.subjects.map((subject, index) => (
                      <tr key={index}>
                        <td>{subject.subjectName}</td>
                        <td>{teacher.teacherName}</td>
                      </tr>
                    ))
                  ) : (
                    <tr key={teacher.teacherId}>
                      <td colSpan="2">No data available</td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default StudentReport;
