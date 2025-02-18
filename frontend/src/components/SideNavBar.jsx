import React, { useState, useEffect } from "react";
import { Sidenav, Nav } from "rsuite";
import { Link } from "react-router-dom";
import AdminIcon from "@rsuite/icons/Admin";
import ToolsIcon from "@rsuite/icons/Tools";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const SideNavBar = ({ toggleTheme }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    toggleTheme();
  };

  const setThemeIcon = isDarkMode ? faMoon : faSun;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [expanded, setExpanded] = useState(!isMobile);
  const [activeKey, setActiveKey] = useState("1");

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setExpanded(!mobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Sidebar for Desktop */}
      {!isMobile ? (
        <div style={{ width: expanded ? 240 : 60, margin: "10px" }}>
          <Sidenav
            expanded={expanded}
            defaultOpenKeys={["3", "4"]}
            style={{
              height: "95vh",
              borderRadius: "10px",
              overflow: "hidden",
              transition: "width 0.3s ease-in-out",
            }}
          >
            <Sidenav.Body>
              <div
                className="avatar"
                style={{
                  width: expanded ? "200px" : "50px",
                  height: "200px",
                  borderRadius: "50%",
                  padding: expanded ? "20px" : 0,
                  margin: "20px auto",
                }}
              >
                <AdminIcon style={{ width: "100%", height: "100%" }} />
              </div>
              <Nav activeKey={activeKey} onSelect={setActiveKey}>
                <Nav.Item
                  eventKey="1"
                  icon={<AdminIcon />}
                  as={Link}
                  to="/"
                  className=""
                >
                  {expanded && "Profil"}
                </Nav.Item>
                <Nav.Item
                  eventKey="2"
                  icon={<ToolsIcon />}
                  as={Link}
                  to="/skills"
                >
                  {expanded && "Skills"}
                </Nav.Item>
              </Nav>
            </Sidenav.Body>
            <Sidenav.Toggle onToggle={(val) => setExpanded(val)} />
          </Sidenav>
        </div>
      ) : (
        // Bottom Navbar for Mobile
        <>
          <div className="theme-toggle" style={{ margin: "auto" }}>
            <FontAwesomeIcon
              icon={setThemeIcon}
              onClick={handleToggle}
              className="text-3xl fixed right-5 top-6"
            />
          </div>
          <div
            style={{
              position: "fixed",
              bottom: 0,
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
              fontSize: "1.5rem",
              backgroundColor: isDarkMode ? "#0f131a" : "#fff",
            }}
          >
            <Nav
              appearance="subtle reversed"
              activeKey={activeKey}
              onSelect={setActiveKey}
              style={{ width: "100%", margin: "auto" }}
            >
              <Nav.Item
                eventKey="1"
                as={Link}
                to="/"
                style={{
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  width: "50%",
                }}
              >
                <AdminIcon style={{ fontSize: "1.5rem" }} />
                <span>Profil</span>
              </Nav.Item>

              <Nav.Item
                eventKey="3"
                as={Link}
                to="/skills"
                style={{
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  width: "50%",
                }}
              >
                <ToolsIcon style={{ fontSize: "1.5rem" }} />
                <span>Skills</span>
              </Nav.Item>
            </Nav>
          </div>
        </>
      )}
    </>
  );
};

export default SideNavBar;
