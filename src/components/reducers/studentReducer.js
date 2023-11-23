const initialState = [];

const StudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_STUDENT_DATA":
      return action.payload;
    default:
      return state;
  }
};

export default StudentReducer;
