import React from "react";
import { useState,useEffect } from "react";
import { Input } from "reactstrap";
import { fetchSubjectData } from "../Data/subjectData";
import { useDispatch, useSelector } from "react-redux";

const SubjectSelector = ({ onSubjectChange, selectedItem }) => {
   const dispatch = useDispatch();
   const selectorOptions = useSelector((state) => state.subject);
   const [hasFetchedData, setHasFetchedData] = useState(false);

  useEffect(() => {
    // Fetch Teacher data and update state when the component mounts
    async function fetchData() {
      if (!hasFetchedData) {
        await fetchSubjectData(dispatch);
        setHasFetchedData(true); // Mark data as fetched
      }
    }

    fetchData();
  }, [dispatch, hasFetchedData]);

  const HandleSubjectChange = (e) => {
    const selectedValue = e.target.value;
    // Call the callback function to notify the parent component
    onSubjectChange(selectedValue);
  };

  return (
    <Input
      id="subject"
      type="select"
      value={selectedItem}
      onChange={HandleSubjectChange}
    >
      <option value="0">--select Subject--</option>
      {selectorOptions.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </Input>
  );
};
export default SubjectSelector;
