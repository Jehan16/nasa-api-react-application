import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

export default function Home(props) {
    const { data, photos } = props

    const [firstCameraData, setFirstCameraData] = useState(null);
    const [secondCameraData, setSecondCameraData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true); // Set loading to true when data is being fetched

        // Filter photos to get only one image per camera
        const filteredPhotos = photos.reduce((accumulator, currentPhoto) => {
            if (!accumulator[currentPhoto.camera.full_name]) {
                accumulator[currentPhoto.camera.full_name] = currentPhoto;
            }

            return accumulator;
        }, {});

        // Set first camera data
        const firstCameraData = Object.entries(filteredPhotos)[0];
        setFirstCameraData(firstCameraData);

        // Set second camera data
        const secondCameraData = Object.entries(filteredPhotos)[2];
        setSecondCameraData(secondCameraData);

        setIsLoading(false); // Set loading to false when data fetching is complete
    }, [photos]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <div style={{ textAlign: 'center' }}>
                            <Card style={{ width: '18rem', height: '20rem' }}>
                                {/* <Card.Img variant="top" src={data?.url} /> */}
                                <iframe src={data?.url} style={{ width: '100%', height: '100%' }}></iframe>
                                <Card.Body>
                                    <Card.Title>{data?.title}</Card.Title>
                                    <Link to="/apod">
                                        <Button variant="primary" type='button'>More info</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="col-sm">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <div style={{ textAlign: 'center' }}>
                            {isLoading || !firstCameraData ? (
                                <i className="fa-solid fa-spinner fa-spin-pulse fa-2x"></i>
                            ) : (
                                <Card style={{ width: '18rem', height: '20rem' }}>
                                    <Card.Img variant="top" src={firstCameraData[1].img_src} style={{ height: '180px' }} />
                                    <Card.Body>
                                        <Card.Title>{firstCameraData[0]}</Card.Title>
                                        <Link to="/rover">
                                            <Button variant="primary" type='button'>More info</Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-sm">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <div style={{ textAlign: 'center' }}>
                            {isLoading || !secondCameraData ? (
                                <i className="fa-solid fa-spinner fa-spin-pulse fa-2x"></i>
                            ) : (
                                <Card style={{ width: '18rem', height: '20rem' }}>
                                    <Card.Img variant="top" src={secondCameraData[1].img_src} style={{ height: '180px' }} />
                                    <Card.Body>
                                        <Card.Title>{secondCameraData[0]}</Card.Title>
                                        <Link to="/rover">
                                            <Button variant="primary" type='button'>More info</Button>
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
