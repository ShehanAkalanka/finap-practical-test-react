import axios from "axios";
import { variables } from "../../Variables";
import { setStudentDataAction } from "../actions/studentAction"; // Import the action

export async function fetchStudentData(dispatch) {
  try {
    const response = await axios.get(variables.API_URL + "Student");
    const data = response.data;

    // Dispatch the fetched data to your Redux store
    dispatch(setStudentDataAction(data));

    return data;
  } catch (error) {
    console.error("Error fetching student data:", error);
    return [];
  }
}
