import { useContext } from "react";
import AuthContext from "./authProvider.jsx";

const useAuth = () => {
  return useContext(AuthContext);
}

export default useAuth;