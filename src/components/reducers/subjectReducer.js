const initialState = [];

const SubjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SUBJECT_DATA":
      return action.payload;
    default:
      return state;
  }
};

export default SubjectReducer;
