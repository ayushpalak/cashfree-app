import React from "react";
import ReactDOM from "react-dom";
import DashboardView from "../DashboardView";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import UserView from "../UserView";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Axios from "axios";
import { FETCH_USERS } from "../../config/Urls";

it("renders dashboard table without crashing", async () => {
  const div = document.createElement("div");
  render(
    <Provider store={store}>
      <DashboardView></DashboardView>
    </Provider>,
    div
  );

  expect(screen.getByText("No rows found")).toBeInTheDocument();
  const Users = await Axios.get(FETCH_USERS)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw new Error(err);
    });

  await waitFor(() => {
    Users.forEach((user, index) => {
      if (index <= 4) {
        let usernamefromapi = user.name;
        expect(screen.getByText(usernamefromapi)).toBeInTheDocument();
      }
    });
  });
});
it("renders UserView without crashing", () => {
  const history = createMemoryHistory();
  history.push("/user/1");
  const div = document.createElement("div");
  render(
    <Router history={history}>
      <Provider store={store}>
        <UserView></UserView>
      </Provider>
    </Router>,
    div
  );
});
