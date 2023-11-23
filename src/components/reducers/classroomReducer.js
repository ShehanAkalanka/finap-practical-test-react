const initialState = [];

const classroomReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CLASSROOM_DATA":
      return action.payload;
    default:
      return state;
  }
};

export default classroomReducer;
