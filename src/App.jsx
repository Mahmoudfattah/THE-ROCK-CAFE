import { Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import Navbar from "./pages/Navbar";
import Experience from "./pages/Experince";
import Menu from "./pages/Menu";
import MenuDemo from "./pages/MenuDemo";
import ExperienceMain from "./pages/ExperienceMain";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Hero />
            <Experience />
            <Menu />
             <ExperienceMain />
          </>
        }
      />
      {/* route ديناميكي — slug بتاع كل item */}
      <Route path="/menu/:slug" element={<MenuDemo />} />
    </Routes>
  );
}