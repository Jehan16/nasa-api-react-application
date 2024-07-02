import Main from "./Main";
import Footer from "./Footer";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';

export default function Apod() {
    const [data, setData] = useState(null)
    const [showModel, setShowModel] = useState(false)

    function handleToggleModel() {
        setShowModel(!showModel)
    }

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

    return (
        <>
            <NavLink to="/" className="nav-link ms-auto bg-transparent" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '999' }}>
                <i className="fas fa-right-to-bracket fa-beat" style={{ color: '#bdbfbe' }}></i>
            </NavLink>
            {data ? (<Main data={data} />) : (
                <div className="loadingState">
                    <i className="fas fa-gear fa-spin"></i>
                </div>
            )}
            {showModel && (
                <SideBar data={data} handleToggleModel={handleToggleModel} />
            )}
            {data && (
                <Footer data={data} handleToggleModel={handleToggleModel} />
            )}
        </>
    );
}