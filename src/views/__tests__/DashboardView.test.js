/* eslint-disable no-undef */
import React from "react";
import DashboardView from "../DashboardView";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import UserView from "../UserView";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import Axios from "axios";
import { FETCH_USERS } from "../../config/Urls";
import "@testing-library/jest-dom/extend-expect";

test("renders table with users without crashing", async () => {
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
test("delete a user from table", async () => {
  const div = document.createElement("div");
  render(
    <Provider store={store}>
      <DashboardView></DashboardView>
    </Provider>,
    div
  );

  const Users = await Axios.get(FETCH_USERS)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw new Error(err);
    });

  await fireEvent.click(screen.getByTestId("btn-delete-1"));

  //   await expect(screen.getByText(Users[0].name)).toBeNull();
  await expect(screen.queryByText(Users[0].name)).toBeNull();
});
test("renders User data in UserView without crashing", async () => {
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
  const UserData = await Axios.get(`${FETCH_USERS}/1`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw new Error(err);
    });
  await waitFor(() => {
    expect(screen.getByText(UserData.email)).toBeInTheDocument();
  });
});
