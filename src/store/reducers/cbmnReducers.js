import { combineReducers } from "redux";
import { patientReducer,formReducer } from "./patientReducer";
const reducers = combineReducers({
  allPatients: patientReducer,
  allFormdata:formReducer
  
});
export default reducers;