import { Cookies } from "react-cookie";

const middlewareChecker = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  return !!token;
};

export default middlewareChecker;
