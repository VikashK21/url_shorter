import React, { createContext, useReducer } from "react";
import axios from "axios";

import AppReducer, { initialState, TYPES } from "./AppReducer";

export const GlobalContext = createContext(initialState);

function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  console.log(state);
  async function getData(email) {
    try {
      const res = await axios.post("/api/login", { email });
      const result = res.data;
      dispatch({ type: TYPES.GETALL, payload: result });
    } catch (err) {
      dispatch({ type: TYPES.ERROR, payload: err.message });
    }
  }
  async function addData(data) {
    try {
      const res = await axios.patch("/api", data);
      const result = res.data;
      console.log(result, 'here is...');
      dispatch({ type: TYPES.ADD, payload: result });
    } catch (err) {
      dispatch({ type: TYPES.ERROR, payload: err.message });
    }
  }
  return (
    <GlobalContext.Provider value={{ urls: state.urls, getData, addData }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
