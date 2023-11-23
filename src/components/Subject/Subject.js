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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Validation from "./subjectValidation";

const Subject = () => {
  const [subjectList, setSubjectList] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [subjectId, setSubjectId] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);

  //fetch Subject List
  const fetchSubjectDataList = async () => {
    await axios
      .get(variables.API_URL + "Subject")
      .then((response) => {
        setSubjectList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //fetch subject Data By Id
  const fetchSubjectDataById = async (id) => {
    try {
      const response = await axios.get(variables.API_URL + "Subject/" + id);
      return response.data; // Return the data
    } catch (error) {
      console.log(error);
      throw error; // Optionally rethrow the error if needed
    }
  };

  const handleClear = () => {
    setSubjectName("");
    if (isEditMode) {
      setSubjectId(0);
    }
    setErrors({
      SubjectName: "",
      isValiedSubjectName: true,
    });
  };

   const [errors, setErrors] = useState({
     SubjectName: "",
     isValiedSubjectName: true,
   });

   const subjectData = {
     id: subjectId,
     name: subjectName,
   };

  const handleSaveOnClick = async () => {
    //handle button submit
    const validationErrors = await Validation(subjectData);
    setErrors(validationErrors);

    const { id, ...subjectDataWithoutId } = subjectData;

    const hasError = Object.values(validationErrors).includes(false);
    if (hasError) {
      console.log("Validation errors. Cannot submit data.");
      return;
    }
    //handle post here

    try {
      const response = await axios.post(
        variables.API_URL + "Subject",
        subjectDataWithoutId
      );
      setSubjectList((prevSubjectList) => [
        ...prevSubjectList,
        response.data,
      ]);
      toast.success("Successfully Saved!!");
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

   const btnEditClick = async (id) => {

    handleClear();
     //handle btn edit click
     const subjectData = await fetchSubjectDataById(id);
     if (subjectData) {
       setSubjectId(subjectData.id);
       setSubjectName(subjectData.name || "");
     }
     setIsEditMode(true);
   };

   const handleCreateNewClick = () => {
     handleClear();
     setIsEditMode(false);
   };

   const handleUpdateOnClick = async () => {
     //handle Update here
     const validationErrors = await Validation(subjectData);
     setErrors(validationErrors);

     const hasError = Object.values(validationErrors).includes(false);
     if (hasError) {
       console.log("Validation errors. Cannot submit data.");
       return;
     }

     try {
       const response = await axios.put(
         variables.API_URL + "Subject",
         subjectData
       );
       // Find the updated classroom in classroomList and replace it with the response data
       setSubjectList((prevSubjectList) =>
         prevSubjectList.map((subject) =>
           subject.id === subjectId ? response.data : subject
         )
       );
       toast.success("Subject updated successfully");
     } catch (error) {
       toast.error("Error updating Subject: " + error.message);
       console.error(error);
     }
   };

   const btnDeleteClick = async (id) => {
     //handle delete here
     if (window.confirm("Are you sure you want to delete this Subject?")) {
       try {
         await axios.delete(variables.API_URL + "Subject/" + id);
         // Filter out the deleted Subject from the SubjectList
         setSubjectList((prevSubjectList) =>
           prevSubjectList.filter((subject) => subject.id !== id)
         );
         toast.success("Subject deleted successfully");
       } catch (error) {
         toast.error("Error deleting Subject: " + error.message);
         console.error(error);
       }
     }
   };

  useEffect(() => {
    // Set the page title when the component mounts
    document.title = "Subject Management";
    fetchSubjectDataList();
  }, []);

  return (
    <>
      <Container className="mb-3">
        <Row>
          <Col className="box">
            <p className="form-title">Create Subject</p>
            {isEditMode && (
              <Row className="mb-3">
                <Col>
                  <Button
                    id="btnCreateNew"
                    onClick={(e) => handleCreateNewClick(e)}
                    className="btn btn-success"
                  >
                    Create New Class
                  </Button>
                </Col>
              </Row>
            )}
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup className="form-group-flex">
                    <Label className="flex-items">Subject Name</Label>
                    <Col className="flex-items">
                      <Input
                        id="subjectName"
                        placeholder="Enter Subject Name"
                        type="text"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                        invalid={!errors.isValiedSubjectName}
                      />
                      {!errors.isValiedSubjectName && (
                        <FormFeedback>{errors.SubjectName}</FormFeedback>
                      )}
                    </Col>
                    {!isEditMode && (
                      <Button
                        onClick={(e) => handleSaveOnClick()}
                        className="flex-items"
                      >
                        Save Subject
                      </Button>
                    )}
                    {isEditMode && (
                      <Button
                        onClick={(e) => handleUpdateOnClick()}
                        className="flex-items btn btn-info"
                      >
                        Update Subject
                      </Button>
                    )}
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className="box">
            <p className="form-title">Subject List</p>
            <Table bordered hover className="allocation-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {subjectList.map((data) => (
                  <tr key={data.id}>
                    <td>{data.name}</td>
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

export default Subject;
