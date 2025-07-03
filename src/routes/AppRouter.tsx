import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ListingPage from "../pages/ListingPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/listing/:id" element={<ListingPage />} />
    </Routes>
  );
}
