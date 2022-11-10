import React from "react";
import style from "./phoneMenu.module.css";
import {
  IoBagHandleOutline,
  IoLocationOutline,
  IoSearchOutline,
  IoPersonOutline,
  IoHomeOutline,
  IoEllipsisVertical,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { NavLink } from "react-router-dom";

function PhoneMenu({ handleCategory }) {
  return (
    <div className={style.flexContainer}>
      <div className={style.menu}>
        <a href="#home">Home</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  );
}

export default PhoneMenu;
