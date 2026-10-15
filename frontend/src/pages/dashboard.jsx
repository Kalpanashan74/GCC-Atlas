
import gccData from "../data/gccData";

function Dashboard() {
  const cityCount = new Set(
    gccData.map((item) => item.city)
  ).size;

  const sourcedCount = gccData.filter(
    (item) => item.source && item.source.startsWith("https://")
  ).length;

  const latestAnnouncement = [...gccData].sort(
    (a, b) => b.sourceDate.localeCompare(a.sourceDate)
  )[0];

  return (
    <div className="dashboard-content">
      <header className="topbar">
        <div>
          <p className="eyebrow">INTELLIGENCE OVERVIEW</p>
          <h1>India GCC Landscape</h1>
          <p className="subtitle">
            Explore the companies, locations and trends shaping India's GCC ecosystem.
          </p>
        </div>
      </header>

      <section className="welcome-card">
        <p className="eyebrow">YOUR RESEARCH WORKSPACE</p>
        <h2>Turn scattered data into informed decisions.</h2>
        <p>
          Explore GCC companies, compare locations and trace the
          evidence behind the numbers.
        </p>
      </section>

      <section className="metrics-grid">
        <article className="metric-card">
          <p>Location Records</p>
          <h2>{gccData.length}</h2>
          <span>Company-location records in this prototype</span>
        </article>

        <article className="metric-card">
          <p>Cities Covered</p>
          <h2>{cityCount}</h2>
          <span>Across the available records</span>
        </article>

        <article className="metric-card">
          <p>Records with Sources</p>
          <h2>{sourcedCount}</h2>
          <span>Records containing source links</span>
        </article>

        <article className="metric-card">
          <p>Latest Announcement</p>
          <h2>{latestAnnouncement?.sourceDate ?? "—"}</h2>
          <span>{latestAnnouncement?.name ?? "No records yet"}</span>
        </article>
      </section>

      <section className="section">
        <h2>Explore the ecosystem</h2>

        <div className="feature-grid">
          <article className="feature-card">
            <span className="feature-icon">⌕</span>
            <h3>GCC Explorer</h3>
            <p>Discover companies by location, sector and capability.</p>
            <span className="card-link">Explore companies →</span>
          </article>

          <article className="feature-card">
            <span className="feature-icon">⇄</span>
            <h3>City Comparison</h3>
            <p>Compare locations and review the evidence behind each profile.</p>
            <span className="card-link">Compare cities →</span>
          </article>

          <article className="feature-card">
            <span className="feature-icon">✦</span>
            <h3>AI Research Assistant</h3>
            <p>Ask questions about GCC records and identify evidence gaps.</p>
            <span className="card-link">Explore with AI →</span>
          </article>
        </div>
      </section>

      <footer className="footer">
        GCC Atlas · Early-stage prototype
      </footer>
    </div>
  );
}

export default Dashboard;
