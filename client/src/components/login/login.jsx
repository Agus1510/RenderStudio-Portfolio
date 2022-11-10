// libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// redux actions
import { login } from "../../../redux/actions/index";
import { setAuthToken } from "../../../redux/reducer/index";

// childrend component
import ForgotPopUp from "./popUp/forgotPasswordPopUp.jsx";

// utills
import validator from "../../utils/validator";
import { NavLink } from "react-router-dom";

// styles
import style from "./login.module.css";
import { IoConstructOutline } from "react-icons/io5";

function Login() {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [input, setInput] = useState({});
  const [error, setError] = useState({});
  const [logError, setLogError] = useState({});
  const [forgotPopUp, setForgotPopUp] = useState(false);

  const workOnChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });

    setError(
      validator("login", {
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = async (event) => {
    function isObjectEmpty(obj) {
      for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
      }
      return true;
    }

    if (!isObjectEmpty(error) || isObjectEmpty(input)) {
      event.preventDefault();

      setError(
        validator("login", {
          ...input,
          [event.target.name]: event.target.value,
        })
      );
    } else {
      event.preventDefault();

      const dis = await dispatch(
        login({ email: input.email, password: input.password })
      );
      var response = dis.payload;
      if (response.success === true) {
        setLogError({});
        navigateTo("/");
      } else {
        setLogError({ err: response.info });
      }
    }
  };

  const popUpFunction = (bool) => {
    setForgotPopUp(bool);
  };

  return (
    <div className={style.body}>
      <div className={style.HeightContainer}>
        <div className={style.parentContainer}>
          <div className={style.childContainer}>
            <h1>Login</h1>
            {logError.err && (
              <label className={style.logError}>{logError.err}</label>
            )}
            <form
              className={style.form}
              onChange={(e) => workOnChange(e)}
              onSubmit={(e) => handleSubmit(e)}
              autoComplete="off"
            >
              <div className={style.input}>
                <label className={style.title}>Email</label>
                <input
                  type="text"
                  placeholder="example@gmail.com"
                  name="email"
                />
                {error.email && (
                  <label className={style.error}>{error.email}</label>
                )}
              </div>
              <div className={style.input}>
                <label className={style.title}>Password</label>
                <input type="password" placeholder="password" name="password" />
                {error.password && (
                  <label className={style.error}>{error.password}</label>
                )}
              </div>
              <button type="submit" className={style.button2}>
                <span />
                <span />
                <span />
                <span />
                login
              </button>
            </form>
            {/*PopUp Trigger*/}
            <a onClick={() => popUpFunction(true)} className={style.forgot}>
              Forgot password?
            </a>
            <div className={style.buttons}>
              <NavLink to="/" className={style.forgot}>
                Home
              </NavLink>
            </div>
          </div>
        </div>
        {/*Codition open popUp or Close popUp*/}
        {forgotPopUp ? <ForgotPopUp popUpFunction={popUpFunction} /> : null}
      </div>
    </div>
  );
}

export default Login;
