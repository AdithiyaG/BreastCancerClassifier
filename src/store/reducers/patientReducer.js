import { ActionTypes } from "../constants/action_types";

const intialState = {
    tabledata: [],
    formdata:[],
    count:0
  };
  
  export const patientReducer = (state = intialState, { type, payload }) => {
    switch (type) {
      case ActionTypes.UPDATE_PATIENTTABLE:
        return { ...state, tabledata: payload };

       case ActionTypes.UPDATE_COUNT:
          return { ...state, count:payload };
      default:
        return state;
    }

    
  };
  