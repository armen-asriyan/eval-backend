// Importer React Router DOM
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importer les composants
import SideNavBar from "./components/SideNavBar.jsx";
import Home from "./pages/Home.jsx";
import { HStack } from "rsuite";
import Skills from "./pages/Skills.jsx";

function App({ toggleTheme }) {
  return (
    <>
      <Router>
        <HStack style={{ height: "100vh" }}>
          <SideNavBar toggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skills" element={<Skills />} />
          </Routes>
        </HStack>
      </Router>
    </>
  );
}

export default App;
