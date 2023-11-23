import { createStore, combineReducers } from "redux";
import classroomReducer from "../reducers/classroomReducer";
import teacherReducer from "../reducers/teacherReducer";
import studentReducer from "../reducers/studentReducer";
import subjectReducer from "../reducers/subjectReducer";

const rootReducer = combineReducers({
  classroom: classroomReducer,
  teacher: teacherReducer,
  student: studentReducer,
  subject: subjectReducer,
});

const store = createStore(rootReducer);

export default store;
