// // @ts-nocheck
// import { createContext, useContext, useState } from "react";

//  const ContextApi = createContext();

// export const ContextProvider = ({ children }) => {
//     const getToken = localStorage.getItem("JWT_TOKEN")
//         ? JSON.parse(localStorage.getItem("JWT_TOKEN"))
//         : null;

//     const [token, setToken] = useState(getToken);

//     const sendData = {
//         token,
//         setToken,
//     };

//     return <ContextApi.Provider value={sendData}>{children}</ContextApi.Provider>
// };


// export const useStoreContext = () => {
//     const context = useContext(ContextApi);
//     return context;
// }



// @ts-nocheck
import { createContext, useContext, useState, useEffect } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  const getToken = (() => {
    try {
      const raw = localStorage.getItem("JWT_TOKEN");
      return raw && raw !== "undefined" && raw !== "null" ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const [token, setToken] = useState(getToken);

  useEffect(() => {
    if (token) {
      localStorage.setItem("JWT_TOKEN", JSON.stringify(token));
    } else {
      localStorage.removeItem("JWT_TOKEN");
    }
  }, [token]);

  const sendData = {
    token,
    setToken,
  };

  return <ContextApi.Provider value={sendData}>{children}</ContextApi.Provider>;
};

export const useStoreContext = () => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("useStoreContext must be used within a ContextProvider");
  }
  return context;
};
