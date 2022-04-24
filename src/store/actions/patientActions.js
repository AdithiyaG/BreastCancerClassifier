import { ActionTypes } from "../constants/action_types";


export const setPatient = (data) => {
  return {
    type: ActionTypes.UPDATE_PATIENTTABLE,
    payload: data,
  };
};


export const setCount = (data) => {
  return {
    type: ActionTypes.UPDATE_COUNT,
    payload: data,
  };
};


export const setResult = (data) => {
  return {
    type: ActionTypes.UPDATE_RESULTDATA,
    payload: data,
  };
};




export const GenerateReport = (data) => {
  return {
    type: ActionTypes.UPDATE_FORMDATA,
    payload:data
  };
};

