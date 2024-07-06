import Main from "./Main";
import Footer from "./Footer";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

export default function Apod() {
  const [data, setData] = useState(null);
  const [showModel, setShowModel] = useState(false);

  function handleToggleModel() {
    setShowModel(!showModel);
  }

  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const apiData = await res.json();
        setData(apiData);
        localStorage.setItem(
          "apodData",
          JSON.stringify({
            data: apiData,
            timestamp: new Date().getTime(), // Store current timestamp
          })
        );
        console.log("Fetched from API and saved to local storage");
      } catch (err) {
        console.error("Fetch error: ", err.message);
      }
    }

    const savedData = localStorage.getItem("apodData");
    if (savedData) {
      const { data: savedApiData, timestamp } = JSON.parse(savedData);
      const now = new Date().getTime();
      if (now - timestamp > EXPIRATION_TIME) {
        // Data has expired, fetch new data
        fetchAPIData();
      } else {
        // Data is fresh, use saved data
        setData(savedApiData);
        console.log("Fetched from local storage");
      }
    } else {
      // No data in local storage, fetch new data
      fetchAPIData();
    }
  }, []);

  return (
    <>
      <NavLink
        to="/"
        className="nav-link ms-auto bg-transparent"
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: "999",
          visibility: showModel ? "hidden" : "visible",
        }}
      >
        <i className="fas fa-right-to-bracket" style={{ color: "#bdbfbe" }}></i>
      </NavLink>
      {data ? (
        <Main data={data} />
      ) : (
        <div className="loadingState">
          <i className="fas fa-gear fa-spin"></i> Loading...
        </div>
      )}
      {showModel && (
        <SideBar data={data} handleToggleModel={handleToggleModel} />
      )}
      {data && <Footer data={data} handleToggleModel={handleToggleModel} />}
    </>
  );
}
