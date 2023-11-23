import React from "react";
import { useState,useEffect } from "react";
import { Input } from "reactstrap";
import { variables } from "../../Variables";
import axios from "axios";
import { fetchClassroomData } from "../Data/classroomData";
import { useDispatch, useSelector } from "react-redux";

const ClassroomSelector = ({ onClassroomChange, selectedItem }) => {
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const selectorOptions = useSelector((state) => state.classroom); // Get the data from Redux store
  const [hasFetchedData, setHasFetchedData] = useState(false);

   useEffect(() => {
     // Fetch classroom data and update state when the component mounts
     async function fetchData() {
       if (!hasFetchedData) {
         await fetchClassroomData(dispatch);
         setHasFetchedData(true); // Mark data as fetched
       }
     }

     fetchData();
   }, [dispatch, hasFetchedData]);

  const handleClassroomChange = (e) => {
    const selectedValue = e.target.value;
    // Call the callback function to notify the parent component
    onClassroomChange(selectedValue);
  };

  return (
    <Input
      id="classroom"
      type="select"
      value={selectedItem}
      onChange={handleClassroomChange}
    >
      <option value="0">--select classroom--</option>
      {selectorOptions.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </Input>
  );
};
export default ClassroomSelector
