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
import SubjectSelector from "../Common/SubjectSelector";
import { variables } from "../../Variables";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Validation from "./AllocateSubjectValidation";

const AllocateSubject = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState(0);
  const [subjectAllocationData, setSubjectAllocationData] = useState([]);

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
    document.title = "Allocate Subjects";
  }, []);

  const handleTeacherSelect = async (selectedTeacher) => {
     const teacherId = parseInt(selectedTeacher, 32);
     setSelectedTeacher(teacherId);
    const allocatedSubjects = await fetchTeacherDataById(selectedTeacher);
    console.log(allocatedSubjects);
    setSubjectAllocationData(allocatedSubjects);
  };

  const handleSubjectSelect = (selectedSubject) => {
    const subjectId = parseInt(selectedSubject, 32);
    setSelectedSubject(subjectId);
  };

  const subjectAllocation = {
    teacherId: selectedTeacher,
    subjectId: selectedSubject,
  };
  const [errors, setErrors] = useState({
    teacherId: "",
    subjectId: "",
    isValiedSubjectId: true,
    isValiedTeacherId: true,
  });

  const handleSubjectAllocation = async (e) => {
    // Allocation code here
    const validationErrors = await Validation(subjectAllocation);
    setErrors(validationErrors);

    const hasError = Object.values(validationErrors).includes(false);
    if (hasError) {
      console.log("Validation errors. Cannot submit data.");
      return;
    }

    try {
      const response = await axios.post(
        variables.API_URL + "TeacherSubject",
        subjectAllocation
      );
      // setSubjectAllocationData((prevSubjectAllocationList) => [
      //   ...prevSubjectAllocationList,
      //   {
      //     teacherId: response.data.teacherId,
      //     teacherName: response.data.teacherName,
      //     subjects: response.data.subjects,
      //   },
      // ]);

      handleTeacherSelect(selectedTeacher);

      toast.success("Successfully Saved!!");
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const handleSubjectDeAllocation = async (e, id) => {
    //deallocation code here
    //handle delete here
    if (window.confirm("Are you sure you want to deallocate this subject?")) {
      try {
        await axios.delete(
          variables.API_URL + "TeacherSubject/" + selectedTeacher + "/" + id
        );

        // Filter out the deallocated Subjects
        setSubjectAllocationData((prevSubjectAllocationList) => {
          // Create a new array that excludes the subject with the specified id
          return prevSubjectAllocationList.map((item) => {
            return {
              ...item,
              subjects: item.subjects.filter(
                (subject) => subject.subjectId !== id
              ),
            };
          });
        });

        toast.success("Subject Deallocated successfully");
      } catch (error) {
        toast.error("Error Deallocating subject: " + error.message);
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
            <p className="form-title">Allocate Subjects</p>
            <Form>
              <Row>
                <Col md={6}>
                  <FormGroup className="form-group-flex">
                    <Label className="flex-items">Subject</Label>
                    <SubjectSelector
                      onSubjectChange={handleSubjectSelect}
                      selectedItem={selectedSubject}
                      className="flex-items"
                    />
                    <Button
                      className="button flex-items"
                      onClick={(e) => handleSubjectAllocation(e)}
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
                  <th>Subject</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {subjectAllocationData[0] &&
                  subjectAllocationData[0].subjects &&
                  subjectAllocationData[0].subjects.map((data) => (
                    <tr key={data.subjectId}>
                      <td>{data.subjectName}</td>
                      <td>
                        <Button
                          className="button"
                          onClick={(e) =>
                            handleSubjectDeAllocation(e, data.subjectId)
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
        <Row className="mt-5"></Row>
      </Container>
    </>
  );
};

export default AllocateSubject;
