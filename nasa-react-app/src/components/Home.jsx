import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

export default function Home(props) {
  const { data, photos } = props;

  const [firstCameraData, setFirstCameraData] = useState(null);
  const [secondCameraData, setSecondCameraData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        let storedData = localStorage.getItem("homeComponentData");
        if (storedData) {
          storedData = JSON.parse(storedData);
          const {
            firstCameraData: storedFirstCameraData,
            secondCameraData: storedSecondCameraData,
            timestamp,
          } = storedData;

          if (Date.now() - timestamp < EXPIRATION_TIME) {
            setFirstCameraData(storedFirstCameraData);
            setSecondCameraData(storedSecondCameraData);
            setIsLoading(false);
            return;
          }
        }

        // Process photos data to get required information
        const filteredPhotos = photos.reduce((accumulator, currentPhoto) => {
          if (!accumulator[currentPhoto.camera.full_name]) {
            accumulator[currentPhoto.camera.full_name] = currentPhoto;
          }
          return accumulator;
        }, {});

        const firstCameraData = Object.entries(filteredPhotos)[0];
        const secondCameraData = Object.entries(filteredPhotos)[2];

        // Store in local storage
        localStorage.setItem(
          "homeComponentData",
          JSON.stringify({
            firstCameraData,
            secondCameraData,
            timestamp: Date.now(),
          })
        );

        setFirstCameraData(firstCameraData);
        setSecondCameraData(secondCameraData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [photos]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <div style={{ textAlign: "center" }}>
              {isLoading || !firstCameraData ? (
                <i className="fa-solid fa-spinner fa-spin-pulse fa-2x"></i>
              ) : (
                <Card style={{ width: "18rem", height: "20rem" }}>
                  {data?.media_type === "image" ? (
                    <img
                      src={data.url}
                      alt={data.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <iframe
                      src={data?.url}
                      style={{ width: "100%", height: "100%" }}
                      title={data.title}
                    ></iframe>
                  )}
                  <Card.Body>
                    <Card.Title>{data?.title}</Card.Title>
                    <Link to="/apod">
                      <Button variant="primary" type="button">
                        More info
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              )}
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <div style={{ textAlign: "center" }}>
              {isLoading || !firstCameraData ? (
                <i className="fa-solid fa-spinner fa-spin-pulse fa-2x"></i>
              ) : (
                <Card style={{ width: "18rem", height: "20rem" }}>
                  <Card.Img
                    variant="top"
                    src={firstCameraData[1].img_src}
                    style={{ height: "180px" }}
                  />
                  <Card.Body>
                    <Card.Title>{firstCameraData[0]}</Card.Title>
                    <Link to="/rover">
                      <Button variant="primary" type="button">
                        More info
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              )}
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <div style={{ textAlign: "center" }}>
              {isLoading || !secondCameraData ? (
                <i className="fa-solid fa-spinner fa-spin-pulse fa-2x"></i>
              ) : (
                <Card style={{ width: "18rem", height: "20rem" }}>
                  <Card.Img
                    variant="top"
                    src={secondCameraData[1].img_src}
                    style={{ height: "180px" }}
                  />
                  <Card.Body>
                    <Card.Title>{secondCameraData[0]}</Card.Title>
                    <Link to="/rover">
                      <Button variant="primary" type="button">
                        More info
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
