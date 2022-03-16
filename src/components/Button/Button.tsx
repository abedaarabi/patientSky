import { Link } from "react-router-dom";
import { ButtonInterface } from "../../interface/patient.interface";
import "./Button.scss";

export const Button = ({ children, link, onClick, type }: ButtonInterface) => {
  if (link) {
    return (
      <Link to={link} className={"btn"}>
        {children}
      </Link>
    );
  }
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
};
