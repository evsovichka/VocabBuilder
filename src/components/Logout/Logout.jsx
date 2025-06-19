import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations.js";
import ActionButton from "../ui/ActionButton/ActionButton.jsx";

export default function Logout() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logOut());
  };
  return (
    <ActionButton
      onClick={handleClick}
      className="logOut"
      svgName="icon-arrow-right"
    >
      Log out
    </ActionButton>
  );
}
