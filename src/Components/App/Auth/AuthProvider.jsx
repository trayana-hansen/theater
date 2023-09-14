import { createContext, useContext, useEffect, useState } from "react";

// Initialiserer auth context
const AuthContext = createContext();

// Definerer Contekst Provider
// med props.children som tilstandsværdi
const AuthProvider = ({ children }) => {
  const [loginData, setLoginData] = useState("");

  // Opdater loginData med data fra sessionstorage hvis det findes
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setLoginData(JSON.parse(sessionStorage.getItem("token")));
    }
  }, [children]);

  // Returner provider
  // Alle childs af denne får adgang til logindata
  return (
    <AuthContext.Provider value={{ loginData, setLoginData }}>
      {children}
    </AuthContext.Provider>
  );
};

// Definerer custom hook
const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
