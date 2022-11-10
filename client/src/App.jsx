import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navBar/navBar";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Register from "./components/register/register";
import { useEffect } from "react";
import { getAllRooms } from "../redux/actions";

function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRooms());
    window.scrollTo(0, 0);
  }, [dispatch]);

  return (
    <div className="App">
      <div className="navBar">
        <NavBar />
      </div>
      <div className="pages">
        <Routes>
          <Route
            path="/"
            element={
              <div className="page">
                <Home />
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div className="page">
                <Login />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div className="page">
                <Register />
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
