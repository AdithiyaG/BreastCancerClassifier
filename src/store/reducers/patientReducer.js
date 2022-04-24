import { ActionTypes } from "../constants/action_types";

const intialState = {
  tabledata: [],
  result: [],
  count: 0
};

const formdata = {
  data: []
}

export const patientReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.UPDATE_PATIENTTABLE:
      return { ...state, tabledata: payload };

    case ActionTypes.UPDATE_COUNT:
      return { ...state, count: payload };

    case ActionTypes.UPDATE_RESULTDATA:
      return { ...state, result: payload };

    default:
      return state;
  }


};

export const formReducer = (state = formdata, { type, payload }) => {
  switch (type) {
    case ActionTypes.UPDATE_FORMDATA:
      return { ...state, data: payload };

    default:
      return state;
  }


};
