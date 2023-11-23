import React from "react";
import { useState,useEffect } from "react";
import { Input } from "reactstrap";
import { fetchStudentData } from "../Data/studentData";
import { useDispatch, useSelector } from "react-redux";

const StudentSelector = ({ onStudentChange, selectedItem }) => {
  const dispatch = useDispatch();
  const selectorOptions = useSelector((state) => state.student);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    // Fetch classroom data and update state when the component mounts
    async function fetchData() {
      if (!hasFetchedData) {
        await fetchStudentData(dispatch);
        setHasFetchedData(true); // Mark data as fetched
      }
    }

    fetchData();
  }, [dispatch, hasFetchedData]);

  const HandleStudentChange = (e) => {
    const selectedValue = e.target.value;
    // Call the callback function to notify the parent component
    onStudentChange(selectedValue);
  };

  return (
    <Input
      id="Student"
      type="select"
      value={selectedItem}
      onChange={HandleStudentChange}
    >
      <option value="0">--select Student--</option>
      {selectorOptions.map((option) => (
        <option key={option.id} value={option.id}>
          {option.firstName + " " + option.lastName}
        </option>
      ))}
    </Input>
  );
};
export default StudentSelector;
