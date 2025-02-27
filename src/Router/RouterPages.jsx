import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Favorite from "../pages/Favorite";

const RouterPages = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorite_coin" element={<Favorite />} />
    </Routes>
  );
};

export default RouterPages;
