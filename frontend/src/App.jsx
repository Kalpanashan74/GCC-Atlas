
import { useState } from "react";
import Dashboard from "./pages/dashboard";
import Explorer from "./pages/Explorer";
import CityComparison from "./pages/CityComparison";
import Assistant from "./pages/Assistant";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    if (activePage === "explorer") return <Explorer />;
    if (activePage === "comparison") return <CityComparison />;
    if (activePage === "assistant") return <Assistant />;
    return <Dashboard />;
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "explorer", label: "GCC Explorer" },
    { id: "comparison", label: "City Comparison" },
    { id: "assistant", label: "AI Assistant" },
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>GCC Atlas</h2>
        <p className="tagline">India GCC Intelligence</p>

        <nav>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activePage === item.id ? "active" : ""}
              onClick={(event) => {
                event.preventDefault();
                setActivePage(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <p className="sidebar-footer">Research with confidence.</p>
      </aside>

      <main className="main-content">{renderPage()}</main>
    </div>
  );
}

export default App;
