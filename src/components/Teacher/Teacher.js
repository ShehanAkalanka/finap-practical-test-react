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
  Table,
  FormFeedback,
} from "reactstrap";
import { variables } from "../../Variables";
import axios from "axios";
import Validation from "./TeacherValidation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Teacher = () => {

  const [teacherList, setTeacherList] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [teacherId, setTeacherId] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);


  //validations
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    isValiedFirstName: true,
    isValiedLastName: true,
    isValiedContactNumber: true,
    isValiedEmail: true,
  });

  //fetch Teacher List
  const fetchTeacherDataList = async () => {
    await axios
      .get(variables.API_URL + "Teacher")
      .then((response) => {
        setTeacherList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //fetch Teacher Data By Id
  const fetchTeacherDataById = async (id) => {
    try {
      const response = await axios.get(variables.API_URL + "Teacher/" + id);
      return response.data; // Return the data
    } catch (error) {
      console.log(error);
      throw error; // Optionally rethrow the error if needed
    }
  };

  const handleClearClick = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setContactNumber("");
     if (isEditMode) {
       setTeacherId(0);
     }
    setErrors({
      firstName: "",
      lastName: "",
      contactNumber: "",
      email: "",
      isValiedFirstName: true,
      isValiedLastName: true,
      isValiedEmail: true,
      isValiedContactNumber: true,
    });
  };

  const teacherData = {
    id: teacherId,
    firstName: firstName,
    lastName: lastName,
    contactNo: contactNumber,
    email: email,
  };

  const handleSaveOnClick = async () => {
    //handle button submit
    const validationErrors = await Validation(teacherData);
    setErrors(validationErrors);

     const { id, ...teacherDataWithoutId } = teacherData;

    const hasError = Object.values(validationErrors).includes(false);
    if (hasError) {
      console.log("Validation errors. Cannot submit data.");
      return;
    }

    //handle post here
     try {
      const response = await axios.post(
        variables.API_URL + "Teacher",
        teacherDataWithoutId
      );
      setTeacherList((prevTeacherList) => [
        ...prevTeacherList,
        response.data,
      ]);
      toast.success("Successfully Saved!!");
      } catch (error) {
        toast.error(error);
        console.log(error);
      } 
  };

   const btnEditClick = async (id) => {
     handleClearClick();
     const _teacherData = await fetchTeacherDataById(id);
     const teacherData = _teacherData[0];
    //  console.log(teacherData);
     if (teacherData) {
       setFirstName(teacherData.firstName || "");
       setLastName(teacherData.lastName || "");
       setEmail(teacherData.email || "");
       setContactNumber(teacherData.contactNumber || "");
       setTeacherId(teacherData.teacherId); // Use the correct property name from the response
     }
     setIsEditMode(true);
   };

   const handleCreateNewClick = () => {
     setIsEditMode(false);
     handleClearClick();
     
   };

   const handleUpdateClick = async (id) => {
     //handle Update here
     const validationErrors = await Validation(teacherData);
    setErrors(validationErrors);

      const hasError = Object.values(validationErrors).includes(false);
      if (hasError) {
        console.log("Validation errors. Cannot submit data.");
        return;
      }

       try {
         const response = await axios.put(
           variables.API_URL + "Teacher",
           teacherData
         );
         // Find the updated teacher in teacherList and replace it with the response data
         setTeacherList((prevTeacherList) =>
           prevTeacherList.map((teacher) =>
             teacher.id === teacherId ? response.data : teacher
           )
         );
         toast.success("Teacher updated successfully");
       } catch (error) {
         toast.error("Error updating teacher: " + error.message);
         console.error(error);
       }
   };

   const btnDeleteClick = async (id) => {
     //handle delete here
     if (window.confirm("Are you sure you want to delete this teacher?")) {
       try {
         await axios.delete(variables.API_URL + "Teacher/" + id);
         // Filter out the deleted teacher from the teacherList
         setTeacherList((prevTeacherList) =>
           prevTeacherList.filter((teacher) => teacher.id !== id)
         );
         toast.success("Teacher deleted successfully");
       } catch (error) {
         toast.error("Error deleting teacher: " + error.message);
         console.error(error);
       }
     }
   };

  useEffect(() => {
    // Set the page title when the component mounts
    document.title = "Teacher Management";
    fetchTeacherDataList();
  }, []);

  return (
    <>
      <Container className="mb-3">
        <Row>
          <Col className="box">
            <p className="form-title">Create Teacher</p>
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
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup row>
                    <Label sm={4}>First Name</Label>
                    <Col sm={8}>
                      <Input
                        id="FirstName"
                        placeholder="Enter Teacher's First Name"
                        type="text"
                        value={firstName}
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
                        placeholder="Enter Teacher's Last Name"
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
                    <Label sm={4}>Contact Number</Label>
                    <Col sm={8}>
                      <Input
                        id="ContactNumber"
                        placeholder="Enter the Contact Number"
                        type="number"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        invalid={!errors.isValiedContactNumber}
                      />
                      {!errors.isValiedContactNumber && (
                        <FormFeedback>{errors.contactNumber}</FormFeedback>
                      )}
                    </Col>
                  </FormGroup>
                </Col>
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
              </Row>
              <Row className="mt-3">
                <Col col={6}>
                  {!isEditMode && (
                    <Button
                      id="btnRegister"
                      block
                      onClick={(e) => handleSaveOnClick(e)}
                      className="btn btn-primary"
                    >
                      Save Teacher
                    </Button>
                  )}
                  {isEditMode && (
                    <Button
                      id="btnUpdate"
                      block
                      onClick={(e) => handleUpdateClick(e)}
                      className="btn btn-info "
                    >
                      Update Teacher
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
            <p className="form-title">Teacher List</p>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {teacherList.map((data) => (
                  <tr key={data.id}>
                    <td>{data.firstName + " " + data.lastName}</td>
                    <td>{data.email}</td>
                    <td>{data.contactNo}</td>
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

export default Teacher;
