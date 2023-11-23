import React, { useState } from "react";
import { useEffect } from "react";
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
import Validation from "./ClassroomVlaidation";
import { variables } from "../../Variables";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Classroom = () => {
  const [classroomList, setClassroomList] = useState([]);
  const [classroomName, setClassroomName] = useState("");
  const [classroomId, setClassroomId] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);

  //fetch Classroom List
  const fetchClassroomDataList = async () => {
    await axios
      .get(variables.API_URL + "Classroom")
      .then((response) => {
        setClassroomList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //fetch Class Data By Id
  const fetchClassroomDataById = async (id) => {
    try {
      const response = await axios.get(variables.API_URL + "Classroom/" + id);
      return response.data; // Return the data
    } catch (error) {
      console.log(error);
      throw error; // Optionally rethrow the error if needed
    }
  };

  const handleClear = () => {
    setClassroomName("");
    if (isEditMode) {
      setClassroomId(0);
    }
    setErrors({
      classroomName: "",
      isValiedClassroomName: true,
    });
  };

  const [errors, setErrors] = useState({
    classroomName: "",
    isValiedClassroomName: true,
  });

  const classroomData = {
    id: classroomId,
    name: classroomName,
  };

  const handleSaveOnClick = async () => {
    //handle button submit
    const validationErrors = await Validation(classroomData);
    setErrors(validationErrors);

    const { id, ...classroomDataWithoutId } = classroomData;


    const hasError = Object.values(validationErrors).includes(false);
    if (hasError) {
      console.log("Validation errors. Cannot submit data.");
      return;
    }
    //handle post here

    try {
      const response = await axios.post(
        variables.API_URL + "Classroom",
        classroomDataWithoutId
      );
      setClassroomList((prevClassroomList) => [...prevClassroomList, response.data]);
      toast.success("Successfully Saved!!");
    } catch (error) {
      toast.error(error);
      console.log(error);
    } 
  };

  const btnEditClick = async (id) => {
    handleClear();
    //handle btn edit click
    const classroomData = await fetchClassroomDataById(id);
    if (classroomData) {
      setClassroomId(classroomData.id);
      setClassroomName(classroomData.name || "");
    }
    setIsEditMode(true);
  };
  const handleCreateNewClick = () => {
    handleClear();
    setIsEditMode(false);
  };

  const handleUpdateOnClick = async () => {
    //handle Update here
    const validationErrors = await Validation(classroomData);
    setErrors(validationErrors);

    const hasError = Object.values(validationErrors).includes(false);
    if (hasError) {
      console.log("Validation errors. Cannot submit data.");
      return;
    }

    try {
      const response = await axios.put(
        variables.API_URL + "Classroom",
        classroomData
      );
      // Find the updated classroom in classroomList and replace it with the response data
      setClassroomList((prevClassroomList) =>
        prevClassroomList.map((classroom) =>
          classroom.id === classroomId ? response.data : classroom
        )
      );
      toast.success("Classroom updated successfully");
    } catch (error) {
      toast.error("Error updating Classroom: " + error.message);
      console.error(error);
    }
  };

  const btnDeleteClick = async (id) => {
    //handle delete here
    if (window.confirm("Are you sure you want to delete this Classroom?")) {
      try {
        await axios.delete(variables.API_URL + "Classroom/" + id);
        // Filter out the deleted Classroom from the ClassroomList
        setClassroomList((prevClassroomList) =>
          prevClassroomList.filter((classroom) => classroom.id !== id)
        );
        toast.success("Classroom deleted successfully");
      } catch (error) {
        toast.error("Error deleting Classroom: " + error.message);
        console.error(error);
      }
    }
  };

  useEffect(() => {
    // Set the page title when the component mounts
    document.title = "Classroom Management";
    fetchClassroomDataList();
  }, []);

  return (
    <>
      <Container className="mb-3">
        <Row>
          <Col className="box">
            <p className="form-title">Create Classoom</p>
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
                    <Label className="flex-items">Classoom Name</Label>
                    <Col className="flex-items">
                      <Input
                        id="classroomName"
                        placeholder="Enter Classroom Name"
                        type="text"
                        value={classroomName}
                        onChange={(e) => setClassroomName(e.target.value)}
                        invalid={!errors.isValiedClassroomName}
                      />
                      {!errors.isValiedClassroomName && (
                        <FormFeedback>{errors.classroomName}</FormFeedback>
                      )}
                    </Col>
                    {!isEditMode && (
                      <Button
                        onClick={(e) => handleSaveOnClick()}
                        className="flex-items"
                      >
                        Save Classoom
                      </Button>
                    )}
                    {isEditMode && (
                      <Button
                        onClick={(e) => handleUpdateOnClick()}
                        className="flex-items btn btn-info"
                      >
                        Update Classoom
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
            <p className="form-title">Classoom List</p>
            <Table bordered hover className="allocation-table">
              <thead>
                <tr>
                  <th>Classoom</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {classroomList.map((data) => (
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

export default Classroom;
