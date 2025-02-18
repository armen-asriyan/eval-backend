import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Importer RSuite CSS
import "rsuite/dist/rsuite.min.css";

// Importer Tailwind CSS
import "./index.css";

import { CustomProvider } from "rsuite";

function Root() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <StrictMode>
      <CustomProvider theme={theme}>
        <App toggleTheme={toggleTheme} />
      </CustomProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Root />);
