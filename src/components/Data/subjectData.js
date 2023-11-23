import axios from "axios";
import { variables } from "../../Variables";
import { setSubjectmDataAction } from "../actions/subjectAction"; // Import the action

export async function fetchSubjectData(dispatch) {
  try {
    const response = await axios.get(variables.API_URL + "Subject");
    const data = response.data;

    // Dispatch the fetched data to your Redux store
    dispatch(setSubjectmDataAction(data));

    return data;
  } catch (error) {
    console.error("Error fetching subject data:", error);
    return [];
  }
}
