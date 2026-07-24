import Navbar from "../components/Navbar.jsx";
import TripNavbar from "../components/TripNavbar.jsx";
import MainBar from "../components/MainBar.jsx";
import SocialBar from "../components/SocialBar.jsx"
import NewTripForm from "../components/NewTripForm.jsx";
import UserTripsWindow from "../components/UserTripsWindow.jsx";
import UserNotifications from "../components/UserNotifications.jsx";
import UserSettings from "../components/UserSettings.jsx"
import api from "../api/axios.js";
import {useEffect, useState} from "react";


export default function Dashboard(){
    const [myTrips, setMyTrips] = useState(false);
    const [myNotif, setMyNotif] = useState(false);
    const [mySettings, setMySettings] = useState(false);
    const [newTrip, setNewTrip] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [hotels, setHotels] = useState([]);
    const [userTrips, setUserTrips] = useState([]);

    const [activeMark, setActiveMark] = useState("map");

    async function getTrips(){
        try {
            const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');

            const resp = await api.get('/api/trips', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUserTrips(resp.data.data);
        }
        catch (error) {
            console.log(error)
        }
    }
    async function getCityMap (city){
        try {
            const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');

            const resp = await api.get(`/api/hotels/city/${city}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const sorted = resp.data.data.sort((a,b) => b.stars - a.stars)
            setHotels(sorted);
        }
        catch (error) {
            console.log(error)
        }
        finally {
            {
                setLoading(false)
            }
        }
    }
    useEffect(()=>{
        // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
        getTrips();
    }, [])

    function showTrips (){
        setMyTrips(!myTrips);
        setMyNotif(false);
        setMySettings(false);
        setNewTrip(false);
    }
    function showNotif (){
        setMyNotif(!myNotif);
        setMyTrips(false);
        setMySettings(false);
        setNewTrip(false);
    }
    function showSettings (){
        setMySettings(!mySettings);
        setMyTrips(false);
        setMyNotif(false)
        setNewTrip(false);
    }
    function addNewTrip (){
        setNewTrip(true);
        setMySettings(false);
        setMyTrips(false);
        setMyNotif(false)
    }
    function closeTripForm (){
        setNewTrip(!newTrip);
    }
    useEffect(() => {
        function handleClick() {
            setMyTrips(false);
            setMyNotif(false);
            setMySettings(false);
        }
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick)
    }, []);

    return (
        <div className={"h-screen flex flex-col bg-bg-main font-playpen relative"}>

            <header className={"h-24 max-h-28 border-b-2 border-b-border-col"}>
                <Navbar showTrips={showTrips} showNotif={showNotif} showSettings={showSettings} addNewTrip={addNewTrip} getCityMap={getCityMap} />
            </header>
            <main className={"flex-1 flex flex-row relative"}>
                <aside className={"w-5/12 border-r-2 border-b-border-col"}>
                    <TripNavbar activeMark={activeMark} setActiveMark={setActiveMark} />
                </aside >
                <div id="mainWindow" className={"w-full"} >
                    <MainBar activeMark={activeMark} hotels={hotels} loading={loading} setSelectedHotel={setSelectedHotel} selectedHotel={selectedHotel} />
                </div>
                {myTrips && (
                    <UserTripsWindow userTrips={userTrips} />
                )}
                {myNotif && (
                    <UserNotifications />
                )}
                {mySettings && (
                    <UserSettings />
                )}
                <aside className={"w-5/12 border-l-2 border-b-border-col"}>
                    <SocialBar activeMark={activeMark} hotels={hotels} selectedHotel={selectedHotel} setSelectedHotel={setSelectedHotel}/>
                </aside>
            </main>
            {newTrip &&(
                <NewTripForm closeTripForm={closeTripForm} getTrips={getTrips} />
            )}
        </div>
    )
}