import Navbar from './Navbar'
import Home from './Home'
import { useEffect, useState } from 'react';
import axios from 'axios'

export default function Nasa() {
    const [data, setData] = useState(null)
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        async function fetchAPIData() {
            const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
            const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${NASA_KEY}`

            const today = (new Date()).toDateString()
            const localKey = `NASA-${today}`
            if (localStorage.getItem(localKey)) {
                const apiData = JSON.parse(localStorage.getItem(localKey))
                setData(apiData)
                console.log('fetched from the cache today')
                return
            }
            localStorage.clear()

            try {
                const res = await fetch(url)
                const apiData = await res.json()
                localStorage.setItem(localKey, JSON.stringify(apiData))
                setData(apiData)
                console.log("fetched from API today")
            } catch (err) {
                console.log(err.message)
            }
        }
        fetchAPIData()
    }, [])

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos', {
                    params: {
                        sol: 1000,
                        api_key: import.meta.env.VITE_NASA_API_KEY
                    }
                });
                setPhotos(response.data.photos);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <>
            {<Navbar />}
            {<Home data={data} photos={photos}/>}
        </>
    )
}