import Navbar from "../components/Navbar.jsx";


export default function Dashboard(){
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <aside></aside>
                <div id="mainWindow" ></div>
                <aside></aside>
            </main>
        </>
    )
}