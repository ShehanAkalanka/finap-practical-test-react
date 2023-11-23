import axios from "axios";
import { variables } from "../../Variables";
import { setClassroomDataAction } from "../actions/classroomActions"; // Import the action

export async function fetchClassroomData(dispatch) {
  try {
    const response = await axios.get(variables.API_URL + "Classroom");
    const data = response.data;

    // Dispatch the fetched data to your Redux store
    dispatch(setClassroomDataAction(data));

    return data;
  } catch (error) {
    console.error("Error fetching classroom data:", error);
    return [];
  }
}
