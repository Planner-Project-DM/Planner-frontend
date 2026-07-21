import Navbar from "../components/Navbar.jsx";
import TripNavbar from "../components/TripNavbar.jsx";
import MainBar from "../components/MainBar.jsx";
import SocialBar from "../components/SocialBar.jsx"
import {useState} from "react";

export default function Dashboard(){
    const [myTrips, setMyTrips] = useState(false);

    function showTrips (){
        setMyTrips(!myTrips);
    }

    return (
        <div className={"h-screen flex flex-col bg-bg-main font-playpen"}>
            <header className={"h-24 max-h-28 border-b-2 border-b-border-col"}>
                <Navbar showTrips={showTrips}/>
            </header>
            <main className={"flex-1 flex flex-row relative"}>
                <aside className={"w-5/12 border-r-2 border-b-border-col"}>
                    <TripNavbar />
                </aside >
                <div id="mainWindow" className={"w-full"} >
                    <MainBar />
                </div>
                {myTrips && (
                    <div className="bg-bg-card border-2 border-border-col border-t-0 text-white rounded-xl absolute text-center w-114 min-h-114 right-48">
                        <div className={"w-full text-text-main flex justify-around h-12 items-center font-bold mt-2 mb-2"}>
                            <button className={"h-10 w-36 bg-accent rounded-xl text-white hover:bg-accent-hover border border-accent-hover "}>Aktywne</button>
                            <button className={"h-10 w-36 rounded-xl text-text-secondary bg-bg-main hover:bg-bg-input border border-border-col"}>Zakończone</button>
                        </div>
                        <hr className={""}/>
                        <div className={"text-text-main"}>
                            <ul id={"tripsList"} className={"p-5"}>
                                <li>
                                    <div>Nazwa tripa</div>
                                    <div>[DataPocz.] - [DataKonc.]</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                <aside className={"w-5/12 border-l-2 border-b-border-col"}>
                    <SocialBar />
                </aside>
            </main>
        </div>
    )
}