import "./App.css";

import Sidebar from "./components/sidebar/Sidebar";
import useLocalStorage from "use-local-storage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePageContent from "./components/HomePageContent";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import NotFound from "./components/NotFound/NotFound";

import Footer from "./components/footer/Footer";

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <Router>
      <div className="app" data-theme={theme}>
        <Sidebar theme={theme} switchTheme={switchTheme} />
        <main className="main">
          <Routes>
            <Route exact path="/" element={<HomePageContent />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
