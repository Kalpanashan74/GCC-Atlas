
import { useState } from "react";
import cityResearch from "../data/cityResearch";

const cityData = [
  {
    city: "Bengaluru",
    strengths: "Technology talent and established GCC ecosystem",
    sectors: "Technology, software and engineering",
  },
  {
    city: "Hyderabad",
    strengths: "Technology ecosystem and expanding GCC presence",
    sectors: "Technology, business services and life sciences",
  },
  {
    city: "Chennai",
    strengths: "Engineering, automotive and IT services ecosystem",
    sectors: "Automotive, manufacturing and IT services",
  },
  {
    city: "Pune",
    strengths: "Engineering, manufacturing and technology ecosystem",
    sectors: "Engineering, manufacturing and technology",
  },
  {
    city: "Gurugram",
    strengths: "Corporate services and technology ecosystem",
    sectors: "Corporate services, technology and consulting",
  },
];

function CityComparison() {
  const [firstCity, setFirstCity] = useState("Bengaluru");
  const [secondCity, setSecondCity] = useState("Hyderabad");

  const cityA = cityData.find((city) => city.city === firstCity);
  const cityB = cityData.find((city) => city.city === secondCity);

  const renderCityCard = (city) => {
    const research = cityResearch.find(
      (item) => item.city === city.city
    );

    return (
      <article className="company-card" key={city.city}>
        <span className="status-label">Research overview</span>
        <h2>{city.city}</h2>

        <h3>Potential strengths</h3>
        <p>{city.strengths}</p>

        <h3>Relevant sectors</h3>
        <p>{city.sectors}</p>

        {research && (
          <section className="research-evidence">
            <h3>Research evidence</h3>
            <p>{research.finding}</p>

            <p>
              <strong>Reported finding:</strong> {research.metric}
            </p>

            <div className="evidence">
              <span>Source date: {research.sourceDate}</span>
            </div>

            <a
              href={research.sourceUrl}
              target="_blank"
              rel="noreferrer"
            >
              Read source: {research.sourceName} ↗
            </a>
          </section>
        )}
      </article>
    );
  };

  return (
    <div className="explorer-page">
      <p className="eyebrow">LOCATION INTELLIGENCE</p>
      <h1>City Comparison</h1>
      <p className="subtitle">
        Compare potential GCC locations and inspect the research
        behind each city's profile.
      </p>

      <div className="explorer-controls">
        <select
          aria-label="First city"
          value={firstCity}
          onChange={(event) => setFirstCity(event.target.value)}
        >
          {cityData.map((city) => (
            <option key={city.city} value={city.city}>
              {city.city}
            </option>
          ))}
        </select>

        <select
          aria-label="Second city"
          value={secondCity}
          onChange={(event) => setSecondCity(event.target.value)}
        >
          {cityData.map((city) => (
            <option key={city.city} value={city.city}>
              {city.city}
            </option>
          ))}
        </select>
      </div>

      {firstCity === secondCity && (
        <p>Please select two different cities for comparison.</p>
      )}

      <div className="company-list comparison-grid">
        {cityA && renderCityCard(cityA)}
        {cityB && firstCity !== secondCity && renderCityCard(cityB)}
      </div>

      <p className="subtitle">
        Research notes are not city rankings. Validate each claim
        against its original source before using it to make a
        location decision.
      </p>
    </div>
  );
}

export default CityComparison;
