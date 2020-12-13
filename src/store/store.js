import { combineReducers, createStore } from "redux";
import { dashboardReducer } from "../reducers/dashboardReducer";
const combinedReducer = combineReducers({
  dashboard: dashboardReducer
});
export const store = createStore(combinedReducer);
