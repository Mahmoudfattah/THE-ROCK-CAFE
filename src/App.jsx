import { Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";

import Experience from "./pages/Experince";
import Menu from "./pages/Menu";
import MenuDemo from "./pages/MenuDemo";
import ExperienceMain from "./pages/ExperienceMain";
import FooterWithReviews from "./pages/Footer";
import FloatingCTA from "./pages/FloatingCta";
import Navbar from "./pages/Navbar";

export default function App() {
  return (
    <>
    {/* <FloatingCTA /> */}
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
             <FooterWithReviews />
          </>
        }
      />
      {/* route ديناميكي — slug بتاع كل item */}
      <Route path="/menu/:slug" element={<MenuDemo />} />
    </Routes>
    </>
  );
}