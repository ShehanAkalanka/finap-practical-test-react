import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import StudentRegistration from "../StudentRegistration/StudentRegistration";
import Classroom from "../Classoom/Classroom"
import Teacher from "../Teacher/Teacher";
import Subject from "../Subject/Subject";
import AllocateSubject from "../AllocateSubject/AllocateSubject";
import AllocateClassroom from "../AllocateClassroom/AllocateClassroom"
import StudentReport from "../StudentReport/StudentReport";

const AllRoutes = () =>{
    return (
      <div>
        <Routes>
          <Route exact path="/" element={<StudentRegistration />} />
          <Route exact path="/classrooms" element={<Classroom />} />
          <Route exact path="/teachers" element={<Teacher />} />
          <Route exact path="/subjects" element={<Subject />} />
          <Route exact path="/allocate-subjects" element={<AllocateSubject />} />
          <Route exact path="/allocate-classrooms" element={<AllocateClassroom />} />
          <Route exact path="/student-report" element={<StudentReport />} />
          
        </Routes>
      </div>
    );
}
export default AllRoutes