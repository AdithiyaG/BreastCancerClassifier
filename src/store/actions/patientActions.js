import { ActionTypes } from "../constants/action_types";

export const setPatient = (data) => {
  return {
    type: ActionTypes.UPDATE_PATIENTTABLE,
    payload: data,
  };
};


export const GenerateReport= () => {
  return {
    type: ActionTypes.UPDATE_FORMADATA,
  };
};