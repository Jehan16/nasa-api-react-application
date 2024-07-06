import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import { NavLink } from "react-router-dom";

const EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

export default function Rover() {
  const [index, setIndex] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const storedData = localStorage.getItem("marsRoverPhotos");
        if (storedData) {
          const { data: storedPhotos, timestamp } = JSON.parse(storedData);
          const now = new Date().getTime();
          if (now - timestamp < EXPIRATION_TIME) {
            setPhotos(storedPhotos);
            setIsLoading(false);
            return;
          }
        }

        const response = await axios.get(
          "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
          {
            params: {
              sol: 1000,
              api_key: import.meta.env.VITE_NASA_API_KEY,
            },
          }
        );

        const filteredPhotos = response.data.photos.reduce((acc, cur) => {
          if (
            !acc[cur.camera.full_name] ||
            acc[cur.camera.full_name].length < 2
          ) {
            if (!acc[cur.camera.full_name]) {
              acc[cur.camera.full_name] = [];
            }
            acc[cur.camera.full_name].push(cur);
          }
          return acc;
        }, {});

        const photosData = Object.values(filteredPhotos).flat();
        localStorage.setItem(
          "marsRoverPhotos",
          JSON.stringify({
            data: photosData,
            timestamp: new Date().getTime(),
          })
        );
        setPhotos(photosData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="imgContainer" style={{ position: "relative" }}>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <i className="fa-solid fa-spinner fa-spin-pulse fa-2x"></i>
        </div>
      )}
      {!isLoading && photos.length > 0 && (
        <NavLink
          to="/"
          className="nav-link ms-auto bg-transparent"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: "999",
          }}
        >
          <i className="fa-solid fa-right-to-bracket fa-2x" size={30}></i>
        </NavLink>
      )}
      {!isLoading && photos.length > 0 && (
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {photos.map((photo, idx) => (
            <Carousel.Item key={idx}>
              <img
                src={photo.img_src}
                alt={`Mars Photo ${idx}`}
                className="bgImage"
                style={{ maxHeight: "calc(100vh - 150px)", minHeight: "100vh" }}
              />
              <Carousel.Caption>
                <h3>{`Mars Photo ${idx + 1}`}</h3>
                <p>{photo.camera.full_name}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
      {!isLoading && photos.length === 0 && <div>No photos available</div>}
    </div>
  );
}
