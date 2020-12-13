import * as actions from "../actions/action.js";
const dashboardState = {
  dashboard: "init value"
};

export const dashboardReducer = (state = dashboardState, action) => {
  switch (action.type) {
    case actions.UPDATE_DASHBOARD:
      return {
        ...state,
        dashboard: "dashboard updated"
      };
    default:
      return {
        ...state
      };
  }
};
