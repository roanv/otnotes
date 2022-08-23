import React, { useContext, useState } from "react";

const TitleContext = React.createContext();

export function useTitle() {
  return useContext(TitleContext);
}

export function TitleProvider({ children }) {
  const [title, setTitle] = useState("Goats");
  return (
    <TitleContext.Provider value={[title, setTitle]}>
      {children}
    </TitleContext.Provider>
  );
}
