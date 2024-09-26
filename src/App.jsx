import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import Edit from "./components/Edit";
import Data from "./components/Data";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/showData" element={<Data />} />
          <Route path="/editData/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
