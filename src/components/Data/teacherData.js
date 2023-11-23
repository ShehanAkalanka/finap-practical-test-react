import axios from "axios";
import { variables } from "../../Variables";
import { setTeacherDataAction } from "../actions/teacherAction"; // Import the action

export async function fetchTeacherData(dispatch) {
  try {
    const response = await axios.get(variables.API_URL + "Teacher");
    const data = response.data;

    // Dispatch the fetched data to your Redux store
    dispatch(setTeacherDataAction(data));

    return data;
  } catch (error) {
    console.error("Error fetching teacher data:", error);
    return [];
  }
}