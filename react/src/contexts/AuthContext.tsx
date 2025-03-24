import {
  useState,
  useEffect,
  createContext,
  SetStateAction,
  Dispatch,
  ReactElement,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "utils/axios";

interface AuthProviderValue {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  //Prevent false request on first login attempt
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthProviderValue>({
  token: null,
  setToken: () => {},
  //Prevent false request on first login attempt
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [token, setToken] = useState<string | null>(null);
  //Prevent false request on first login attempt
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
      localStorage.setItem("token", token);
      //Prevent false request on first login attempt
      setIsAuthenticated(true);
      navigate("/");
    } else {
      //Prevent false request on first login attempt
      setIsAuthenticated(false);
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token, navigate]);

  return (
    <AuthContext.Provider value={{ token, setToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
