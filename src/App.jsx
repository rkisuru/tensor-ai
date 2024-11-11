import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import Login from "./components/Login/Login";

const App = () => {
  return (
    <>
      <Login />
      <Sidebar />
      <Main />
    </>
  );
};

export default App;
