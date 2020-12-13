import * as ACTIONS from "./action";
export const UPDATE_TABLE = ({ payload }) => {
  return {
    type: ACTIONS.UPDATE_TABLE,
    payload: payload.dataTable ?? []
  };
};
