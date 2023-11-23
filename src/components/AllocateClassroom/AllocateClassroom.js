import React from "react";
import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Button,
  Table,
} from "reactstrap";
import TeacherSelector from "../Common/TeacherSelector";
import ClassroomSelector from "../Common/ClassroomSelector";
import { variables } from "../../Variables";
import axios from "axios";
import { toast } from "react-toastify";
import Validation from "./AllocateClassroomValidation";

const AllocateClassroom = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(0);
  const [selectedClassroom, setSelectedClassroom] = useState(0);
  const [classroomAllocationData, setClassroomAllocationData] = useState([]);

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

  useEffect(() => {
    // Set the page title when the component mounts
    document.title = "Allocate Classrooms";
  }, []);

   const handleTeacherSelect = async (selectedTeacher) => {
    const teacherId = parseInt(selectedTeacher, 32);
    setSelectedTeacher(teacherId);
    const allocatedClassrooms = await fetchTeacherDataById(selectedTeacher);
    // console.log(allocatedClassrooms);
     setClassroomAllocationData(allocatedClassrooms);
   };

  const handleClassroomSelect = (selectedClassroom) => {
    const classId = parseInt(selectedClassroom, 32);
    setSelectedClassroom(classId);
  };

   const classroomAllocation = {
     teacherId: selectedTeacher,
     classroomId: selectedClassroom,
   };

   const [errors, setErrors] = useState({
     teacherId: "",
     classroomId: "",
     isValiedClassroomId: true,
     isValiedTeacherId: true,
   });

  const handleClassAllocation = async (e) => {
   // Allocation code here
    const validationErrors = await Validation(classroomAllocation);
    setErrors(validationErrors);

    const hasError = Object.values(validationErrors).includes(false);
    if (hasError) {
      console.log("Validation errors. Cannot submit data.");
      return;
    }

    try {
      const response = await axios.post(
        variables.API_URL + "TeacherClassroom",
        classroomAllocation
      );

      handleTeacherSelect(selectedTeacher);

      toast.success("Successfully Saved!!");
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const handleClassDeAllocation = async (e, id) => {
    //deallocation code here
    //handle delete here
    if (window.confirm("Are you sure you want to deallocate this Classroom?")) {
      try {
        await axios.delete(
          variables.API_URL + "TeacherClassroom/" + selectedTeacher + "/" + id
        );

        // Filter out the deallocated Classroom
        setClassroomAllocationData((prevClassroomAllocationList) => {
          // Create a new array that excludes the Classroom with the specified id
          return prevClassroomAllocationList.map((item) => {
            return {
              ...item,
              classrooms: item.classrooms.filter(
                (classroom) => classroom.classroomId !== id
              ),
            };
          });
        });

        toast.success("Classroom Deallocated successfully");
      } catch (error) {
        toast.error("Error Deallocating Classroom: " + error.message);
        console.error(error);
      }
    }
  };

  return (
    <>
      <Container className="mb-3">
        <Row>
          <Col className="box">
            <p className="form-title">Teacher Details</p>
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup className="form-group-flex">
                    <Label className="flex-items">Teacher</Label>
                    <TeacherSelector
                      onTeacherChange={handleTeacherSelect}
                      className="flex-items"
                    />
                    {/* <Button className="button flex-items">Save</Button> */}
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container className="mb-3">
        <Row>
          <Col className="box">
            <p className="form-title">Allocate Classrooms</p>
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup className="form-group-flex">
                    <Label className="flex-items">Classroom</Label>
                    <ClassroomSelector
                      onClassroomChange={handleClassroomSelect}
                      selectedItem={selectedClassroom}
                      className="flex-items"
                    />
                    <Button
                      className="button flex-items"
                      onClick={(e) => handleClassAllocation(e)}
                    >
                      Allocate
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
            <Table bordered hover className="allocation-table">
              <thead>
                <tr>
                  <th>Classroom</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {classroomAllocationData[0] &&
                  classroomAllocationData[0].classrooms &&
                  classroomAllocationData[0].classrooms.map((data) => (
                    <tr key={data.classroomId}>
                      <td>{data.classroomName}</td>
                      <td>
                        <Button
                          className="button"
                          onClick={(e) =>
                            handleClassDeAllocation(e, data.classroomId)
                          }
                        >
                          Deallocate
                        </Button>
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

export default AllocateClassroom;
