import Navbar from "../components/Navbar.jsx";
import TripNavbar from "../components/TripNavbar.jsx";
import MainBar from "../components/MainBar.jsx";
import SocialBar from "../components/SocialBar.jsx"

export default function Dashboard(){
    return (
        <div className={"h-screen flex flex-col bg-bg-main font-playpen"}>
            <header className={"h-24 max-h-28 border-b-2 border-b-border-col"}>
                <Navbar />
            </header>
            <main className={"flex-1 flex flex-row"}>
                <aside className={"w-5/12 border-r-2 border-b-border-col"}>
                    <TripNavbar />
                </aside >
                <div id="mainWindow" className={"w-full"} >
                    <MainBar />
                </div>
                <aside className={"w-5/12 border-l-2 border-b-border-col"}>
                    <SocialBar />
                </aside>
            </main>
        </div>
    )
}