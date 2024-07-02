import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios'
import { NavLink } from 'react-router-dom';

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
                const response = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos', {
                    params: {
                        sol: 1000,
                        api_key: import.meta.env.VITE_NASA_API_KEY
                    }
                });
                const filteredPhotos = response.data.photos.reduce((acc, cur) => {
                    if (!acc[cur.camera.full_name] || acc[cur.camera.full_name].length < 2) {
                        if (!acc[cur.camera.full_name]) {
                            acc[cur.camera.full_name] = [];
                        }
                        acc[cur.camera.full_name].push(cur);
                    }
                    return acc;
                }, {});
                setPhotos(Object.values(filteredPhotos).flat());
                setIsLoading(false); // Set loading to false when data fetching is complete
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <div className='imgContainer' style={{ position: 'relative' }}>
            {isLoading && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <i className="fa-solid fa-spinner fa-spin-pulse fa-2x"></i>
                </div>
            )}
            {!isLoading && photos.length > 0 && (
                <NavLink to="/" className="nav-link ms-auto bg-transparent" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '999' }}>
                    <i className="fa-solid fa-right-to-bracket fa-2x fa-beat" size={30}></i>
                </NavLink>
            )}
            {!isLoading && photos.length > 0 && (
                <Carousel activeIndex={index} onSelect={handleSelect}>
                    {photos.map((photo, idx) => (
                        <Carousel.Item key={idx}>
                            <img
                                src={photo.img_src}
                                alt={`Mars Photo ${idx}`}
                                className="bgImage" // Bootstrap classes to make the image fit to the screen width
                                style={{ maxHeight: 'calc(100vh - 150px)', minHeight: '100vh' }} // Set max height to fit the screen height
                            />
                            <Carousel.Caption>
                                <h3>{`Mars Photo ${idx + 1}`}</h3>
                                <p>{photo.camera.full_name}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </div>
    );
}
