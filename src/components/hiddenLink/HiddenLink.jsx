import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/reducers/isLoggedIn";

export const ShowLogin = ({ children }) => {
  const isLoggedIN = useSelector(selectIsLoggedIn);
  if (!isLoggedIN) {
    return null;
  }
  return children;
};
export const ShowLogout = ({ children }) => {
  const isLoggedIN = useSelector(selectIsLoggedIn);
  if (isLoggedIN) {
    return null;
  }
  return children;
};
