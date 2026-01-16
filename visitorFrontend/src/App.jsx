import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // Authorization from Login.jsx via onAuthChange
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleAuthChange() {
    setIsLoggedIn(Boolean(localStorage.getItem("auth_token")));
  }

  // Authorization on app load so refresh preserves state
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }
    setIsLoggedIn(true);
    const backendBase =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    (async () => {
      try {
        const res = await fetch(`${backendBase}/api/users/me`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          setIsBlogger(false);
          return;
        }
        const data = await res.json();
        setIsBlogger(Boolean(data.admin));
      } catch (err) {
        console.error("auth bootstrap failed", err);
      }
    })();
  }, []);

  // Log state changes with fresh values
  useEffect(() => {
    console.log("App state", { isLoggedIn });
  }, [isLoggedIn]);

  // Update Navigation Bar depending on user permissions.
  if (isLoggedIn === true) {
    panel = <VisitorPanel onAuthChange={handleAuthChange} />;
    content = <h3>You are logged in.</h3>;
  } else {
    panel = <LogInPanel onAuthChange={handleAuthChange} />;
    content = <h3>You are not logged in.</h3>;
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
