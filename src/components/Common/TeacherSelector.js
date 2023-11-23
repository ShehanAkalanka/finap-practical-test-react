import React from "react";
import { useState,useEffect } from "react";
import { Input } from "reactstrap";
import { variables } from "../../Variables";
import axios from "axios";
import { fetchTeacherData } from "../Data/teacherData";
import { useDispatch, useSelector } from "react-redux";

const TeacherSelector = ({ onTeacherChange, selectedItem }) => {
  const dispatch = useDispatch();
  const selectorOptions = useSelector((state) => state.teacher);
  const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    // Fetch Teacher data and update state when the component mounts
    async function fetchData() {
      if (!hasFetchedData) {
        await fetchTeacherData(dispatch);
        setHasFetchedData(true); // Mark data as fetched
      }
    }

    fetchData();
  }, [dispatch, hasFetchedData]);

  const HandleTeacherChange = (e) => {
    const selectedValue = e.target.value;
    // Call the callback function to notify the parent component
    onTeacherChange(selectedValue);
  };

  return (
    <Input
      id="teacher"
      type="select"
      value={selectedItem}
      onChange={HandleTeacherChange}
    >
      <option value="0">--select Teacher--</option>
      {selectorOptions.map((option) => (
        <option key={option.id} value={option.id}>
          {option.firstName + " " + option.lastName}
        </option>
      ))}
    </Input>
  );
};
export default TeacherSelector;
