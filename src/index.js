import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";

import Root from "./components/Root";
import store from "./store";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
