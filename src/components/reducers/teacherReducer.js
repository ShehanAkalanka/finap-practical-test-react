const initialState = [];

const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_Teacher_DATA":
      return action.payload;
    default:
      return state;
  }
};

export default teacherReducer;
