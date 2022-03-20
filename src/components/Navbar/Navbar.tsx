import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../Button/Button";
import { NavbarInterface } from "../../interface/patient.interface";

const Navbar = ({
  onChange,
  btnTitle,
  link,
  placeholder,
  value,
}: NavbarInterface) => {
  return (
    <div className="navbar-container">
      <h2>Patient Sky</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder={placeholder}
          defaultValue={value}
          onChange={onChange}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size="1x"
          fixedWidth={true}
          className="search-icon"
        />
      </div>
      <Button link={link}> {btnTitle}</Button>
    </div>
  );
};

export default Navbar;
