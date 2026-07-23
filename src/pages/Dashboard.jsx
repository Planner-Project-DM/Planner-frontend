import Navbar from "../components/Navbar.jsx";
import TripNavbar from "../components/TripNavbar.jsx";
import MainBar from "../components/MainBar.jsx";
import SocialBar from "../components/SocialBar.jsx"
import NewTripForm from "../components/NewTripForm.jsx";
import UserTripsWindow from "../components/UserTripsWindow.jsx";
import UserNotifications from "../components/UserNotifications.jsx";
import UserSettings from "../components/UserSettings.jsx"
import {useEffect, useState} from "react";


export default function Dashboard(){
    const [myTrips, setMyTrips] = useState(false);
    const [myNotif, setMyNotif] = useState(false);
    const [mySettings, setMySettings] = useState(false);
    const [newTrip, setNewTrip] = useState(false);
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
                <Navbar showTrips={showTrips} showNotif={showNotif} showSettings={showSettings} addNewTrip={addNewTrip} />
            </header>
            <main className={"flex-1 flex flex-row relative"}>
                <aside className={"w-5/12 border-r-2 border-b-border-col"}>
                    <TripNavbar />
                </aside >
                <div id="mainWindow" className={"w-full"} >
                    <MainBar />
                </div>
                {myTrips && (
                    <UserTripsWindow />
                )}
                {myNotif && (
                    <UserNotifications />
                )}
                {mySettings && (
                    <UserSettings />
                )}
                <aside className={"w-5/12 border-l-2 border-b-border-col"}>
                    <SocialBar />
                </aside>
            </main>
            {newTrip &&(
                <NewTripForm closeTripForm={closeTripForm} />
            )}
        </div>
    )
}