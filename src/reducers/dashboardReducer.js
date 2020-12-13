import * as actions from "../actions/action.js";
const dashboardState = {
  dataTable: []
};

export const dashboardReducer = (state = dashboardState, action) => {
  switch (action.type) {
    case actions.UPDATE_TABLE:
      return {
        ...state,
        dataTable: action.payload
      };
    default:
      return {
        ...state
      };
  }
};
