import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store, { Persistor } from "../redux/store/Store";
import App from "./App.jsx";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
import "./index.css";

axios.defaults.baseURL =
  import.meta.env.VITE_BACK_ROUTE || "http://localhost:3001/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <PersistGate loading={null} persistor={Persistor}>
        <App />
      </PersistGate>
    </Router>
  </Provider>
);
