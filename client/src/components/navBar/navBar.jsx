import React from "react";
import style from "./navBar.module.css";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  IoChevronDownOutline,
  IoSearchSharp,
  IoLogoInstagram,
  IoLogoFacebook,
  IoChevronUpOutline,
  IoPersonSharp,
  IoCloseCircleOutline,
  IoEllipsisVertical,
} from "react-icons/io5";
import { useSelector } from "react-redux";
import Logout from "../logout/logout";
import PhoneMenu from "../phoneMenu/phoneMenu";
import { RiWindowsFill } from "react-icons/ri";
function NavBar() {
  const [active, setActive] = useState(false);
  const [activeUser, setActiveUser] = useState(false);
  const [activeArrow, setActiveArrow] = useState(false);
  const [activeArrow2, setActiveArrow2] = useState(false);
  const [activePhone, setActivePhone] = useState(false);
  const isLogged = useSelector((state) => state.reducerCompleto.isLogged);
  const user = useSelector((state) => state.reducerCompleto.user);

  function parallel_height_js() {
    var element = document.getElementById("containerNav");

    element.style.backgroundColor = "rgb(40, 40, 40)";
  }
  function parallel_height_js2() {
    var element = document.getElementById("containerNav");

    element.style.backgroundColor = "transparent";
  }

  window.onscroll = function () {
    if (window.pageYOffset === 0) {
      parallel_height_js2();
    } else {
      parallel_height_js();
    }
  };

  const handleIg = () => {
    window.open("https://www.instagram.com/render.studio.33/");
  };
  useEffect(() => {
    document.addEventListener("click", (e) => {
      const isDropdownButton = e.target.matches("[data-dropdown-button]");
      const isDropdownPhone = e.target.matches("[data-dropdown-phone]");
      const isDropdownButtonUser = e.target.matches(
        "[data-dropdown-user-button]"
      );
      if (
        (!isDropdownButton && e.target.closest("[data-dropdown]") != null) ||
        (!isDropdownButtonUser &&
          e.target.closest("[data-dropdown-user]") != null)
      )
        return;
      if (!isDropdownPhone && e.target.closest("[data-dropdownPhone]") != null)
        return;
      let currentDropdown;
      if (isDropdownButton) {
        setActive(!active);
      }
      if (!isDropdownButton) {
        setActive(false);
        setActiveArrow2(false);
        setActiveArrow(false);
      }
      if (isDropdownButtonUser) {
        setActiveUser(!active);
      }
      if (!isDropdownButtonUser) {
        setActiveUser(false);
      }
      if (isDropdownPhone) {
        setActivePhone(!activePhone);
      }
      if (!isDropdownPhone) {
        setActivePhone(false);
      }
    });
  }, []);
  return (
    <div className={style.width}>
      <div className={style.containerNav} id="containerNav">
        <div className={style.logoContainer}>
          <NavLink to={"/"}>RENDER STUDIO 33</NavLink>
        </div>
        <div className={activePhone ? style.phoneMenuActive : style.phoneMenu}>
          <PhoneMenu data-dropdownPhone />
        </div>
        <div className={style.buttonsContainer}>
          <div className={style.buttons}>
            <a href="#home">Home</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
          </div>
          <div className={style.social}>
            <IoEllipsisVertical
              data-dropdown-phone
              className={style.menuIcon}
            />
            <IoLogoInstagram onClick={() => handleIg()} />
            <div data-dropdown-user className={style.dropdownUser}>
              <input
                type="image"
                src={
                  isLogged
                    ? user.Image
                    : "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                }
                data-dropdown-user-button
                className={activeUser ? style.icon3Active : style.icon3}
              />
              <div
                className={
                  activeUser
                    ? style.dropdownmenuUserActive
                    : style.dropdownmenuUser
                }
              >
                <NavLink to="/perfil" data-dropdown-user-button>
                  Perfil
                </NavLink>
                {isLogged ? (
                  <Logout data-dropdown-user-button />
                ) : (
                  <>
                    <NavLink to="/login" data-dropdown-user-button>
                      Log In
                    </NavLink>
                    <NavLink to="/register" data-dropdown-user-button>
                      Register
                    </NavLink>
                  </>
                )}
                {user.isAdmin ? (
                  <NavLink to="/users" data-dropdown-user-button>
                    Users
                  </NavLink>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
