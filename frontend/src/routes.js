import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./Home";

const Routess = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routess;
