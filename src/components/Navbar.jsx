import {useState, useEffect} from 'react';
import {CgProfile} from "react-icons/cg";
import {BsBell} from "react-icons/bs";
import SearchBar from "./SearchBar.jsx"
import Badge from '@mui/material/Badge';
export default function Navbar({showTrips, showNotif, showSettings, addNewTrip, getCityMap, pendingFriends, getFriendsList}) {

    return (
        <main className={"flex h-full items-center  bg-bg-card w-full  font-bold text-text-main "}>
            <div className={"w-3/12"}>
                <div className={"bg-bg-input flex items-center h-12 ml-10 w-1/2 max-w-72 rounded-2xl " +
                    "p-5 justify-center border border-b-border-col"}>
                    <p>LOGO</p>
                </div>
            </div>

            <div className={"flex  justify-center w-1/2 gap-5"}>
                <SearchBar getCityMap={getCityMap} />
                <button onClick={(e) => {e.stopPropagation(); addNewTrip();}}
                        className={"border-2 h-12 border-accent border-dashed text-accent bg-bg-input " +
                    "rounded-2xl w-44 hover:text-bg-input hover:bg-accent transition duration-150 ease-out hover:ease-in"}>
                    <p> + Nowa podróż</p>
                </button>
            </div>

            <div className={"ml-auto flex items-center justify-center w-3/12 gap-10"}>
                <button className={"w-52"}>
                    <div onClick={(e) => {
                        e.stopPropagation();
                        showTrips();
                    }} className={"bg-bg-input flex items-center h-12 w-full rounded-2xl " +
                             "p-5 justify-between border border-b-border-col hover:bg-bg-main "}>
                        <p>Moje podróże</p><p>▾</p>
                    </div>
                </button>
                <div className={"flex gap-5 items-center justify-center"}>
                    <button onClick={(e) => {e.stopPropagation(); showNotif();}} className={"w-12"}>
                        <Badge color="error" variant="dot" invisible={!pendingFriends?.length}>
                            <BsBell size={27}/>
                        </Badge>
                    </button>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        showSettings();
                        getFriendsList();
                    }} className={"w-12"}><CgProfile size={25}/>
                    </button>
                </div>
            </div>
        </main>
    );
}
