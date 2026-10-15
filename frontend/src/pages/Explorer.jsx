
import { useEffect, useState } from "react";
import gccData from "../data/gccData";

function Explorer() {
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedSector, setSelectedSector] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const [shortlist, setShortlist] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("gccAtlasShortlist") || "[]"
      );
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  const [showShortlistOnly, setShowShortlistOnly] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "gccAtlasShortlist",
      JSON.stringify(shortlist)
    );
  }, [shortlist]);

  const cities = [
    "All",
    ...new Set(gccData.map((item) => item.city)),
  ];

  const sectors = [
    "All",
    ...new Set(gccData.map((item) => item.sector)),
  ];

  const announcementTypes = [
    "All",
    ...new Set(gccData.map((item) => item.announcementType)),
  ];

  const filteredData = gccData.filter((item) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      item.name.toLowerCase().includes(searchText) ||
      item.sector.toLowerCase().includes(searchText) ||
      item.focus.toLowerCase().includes(searchText) ||
      item.city.toLowerCase().includes(searchText);

    const matchesCity =
      selectedCity === "All" || item.city === selectedCity;

    const matchesSector =
      selectedSector === "All" || item.sector === selectedSector;

    const matchesType =
      selectedType === "All" ||
      item.announcementType === selectedType;

    const matchesShortlist =
      !showShortlistOnly || shortlist.includes(item.id);

    return (
      matchesSearch &&
      matchesCity &&
      matchesSector &&
      matchesType &&
      matchesShortlist
    );
  });

  function toggleShortlist(id) {
    setShortlist((current) =>
      current.includes(id)
        ? current.filter((savedId) => savedId !== id)
        : [...current, id]
    );
  }

  function clearFilters() {
    setSearch("");
    setSelectedCity("All");
    setSelectedSector("All");
    setSelectedType("All");
  }

  return (
    <div className="explorer-page">
      <p className="eyebrow">ECOSYSTEM DIRECTORY</p>
      <h1>GCC Explorer</h1>
      <p className="subtitle">
        Explore company-location records and save promising leads
        for further research.
      </p>

      <div className="explorer-controls">
        <input
          type="text"
          aria-label="Search GCC records"
          placeholder="Search company, city, sector or capability..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          aria-label="Filter by city"
          value={selectedCity}
          onChange={(event) => setSelectedCity(event.target.value)}
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city === "All" ? "All cities" : city}
            </option>
          ))}
        </select>

        <select
          aria-label="Filter by sector"
          value={selectedSector}
          onChange={(event) => setSelectedSector(event.target.value)}
        >
          {sectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector === "All" ? "All sectors" : sector}
            </option>
          ))}
        </select>

        <select
          aria-label="Filter by announcement type"
          value={selectedType}
          onChange={(event) => setSelectedType(event.target.value)}
        >
          {announcementTypes.map((type) => (
            <option key={type} value={type}>
              {type === "All" ? "All announcement types" : type}
            </option>
          ))}
        </select>

        <button type="button" onClick={clearFilters}>
          Clear filters
        </button>
      </div>

      <div className="shortlist-toolbar">
        <p>
          <strong>Saved records:</strong> {shortlist.length}
        </p>

        <button
          type="button"
          onClick={() => setShowShortlistOnly((current) => !current)}
        >
          {showShortlistOnly ? "Show all records" : "View shortlist"}
        </button>
      </div>

      <p className="results-count">
        Showing {filteredData.length} of {gccData.length} records
      </p>

      <div className="company-list">
        {filteredData.map((company) => (
          <article className="company-card" key={company.id}>
            <div className="company-heading">
              <div>
                <h2>{company.name}</h2>
                <p>{company.sector} · {company.city}</p>
              </div>

              <span className="status-label">
                {company.announcementType}
              </span>
            </div>

            <p>{company.focus}</p>

            <div className="evidence-details">
              <p>
                <strong>Location role:</strong>{" "}
                {company.locationRole || "Not specified"}
              </p>

              <p>
                <strong>Source claim:</strong>{" "}
                {company.evidenceClaim || "Not specified"}
              </p>

              <p>
                <strong>Evidence note:</strong>{" "}
                {company.statusNote || "Further verification needed"}
              </p>
            </div>

            <div className="evidence">
              <span>Source date: {company.sourceDate}</span>
              <span>{company.verificationStatus}</span>
            </div>

            <a
              href={company.source}
              target="_blank"
              rel="noreferrer"
            >
              View original source ↗
            </a>

            <div>
              <button
                type="button"
                onClick={() => toggleShortlist(company.id)}
              >
                {shortlist.includes(company.id)
                  ? "✓ Remove from shortlist"
                  : "+ Save to shortlist"}
              </button>
            </div>
          </article>
        ))}

        {filteredData.length === 0 && (
          <p>
            No matching records. Try changing your filters or
            saving some records to your shortlist.
          </p>
        )}
      </div>
    </div>
  );
}

export default Explorer;
