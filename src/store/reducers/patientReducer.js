import { ActionTypes } from "../constants/action_types";

const intialState = {
    tabledata: [],
    formdata:[]
  };
  
  export const patientReducer = (state = intialState, { type, payload }) => {
    switch (type) {
      case ActionTypes.UPDATE_PATIENTTABLE:
        return { ...state, tabledata: payload };
      default:
        return state;
    }

    
  };
  