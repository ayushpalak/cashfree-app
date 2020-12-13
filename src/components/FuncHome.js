import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import * as action from "../actions/action";
export const FuncHome = props => {
  const dispatch = useDispatch();
  const { dashboard } = useSelector(state => state);
  return (
    <>
      <p> func Home {dashboard.dashboard} </p>
      <Button
        color="primary"
        onClick={() => dispatch({ type: action.UPDATE_DASHBOARD })}
      >
        Click me{" "}
      </Button>
    </>
  );
};
