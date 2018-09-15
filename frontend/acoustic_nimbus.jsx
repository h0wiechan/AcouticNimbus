import React from "react";
import ReactDOM from "react-dom";
import { signup, login, logout} from "./actions/session_actions";
import configureStore from "./store/store";
import Root from "./components/root";
import { openModal } from "./actions/modal_actions";

document.addEventListener("DOMContentLoaded", () => {
  window.signup = signup;
  window.login = login;
  window.logout = logout;
  let store;
  store = configureStore();
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.openModal = openModal;
  // debugger
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: {
          [window.currentUser.id]: window.currentUser,
        },
      },
      session: {
        id: window.currentUser.id,
      }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={ store } />, root);
});
