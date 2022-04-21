import { combineReducers } from "redux";
import { patientReducer } from "./patientReducer";
const reducers = combineReducers({
  allPatients: patientReducer,
  
});
export default reducers;