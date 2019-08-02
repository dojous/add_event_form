import React from "react";
import EventHandler from "./components/eventHandler";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="ui bottom attached active tab segment">
      <ToastContainer />

      <EventHandler />
    </div>
  );
}

export default App;
