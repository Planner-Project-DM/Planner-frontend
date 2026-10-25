import {useState, useEffect} from 'react';
import {CgProfile} from "react-icons/cg";
import {BsBell} from "react-icons/bs";
import SearchBar from "./SearchBar.jsx"
import Badge from '@mui/material/Badge';

export default function Navbar({showTrips, showNotif, showSettings, addNewTrip, getCityMap, pendingFriends,
                                   getFriendsList, socketNotif, setSnackbar}) {

    return (
        <main className={"flex flex-row justify-between items-center bg-bg-card w-full h-full font-bold text-text-main px-3 lg:px-6 gap-3 lg:gap-5 overflow-visible"}>
            <div className={"shrink-0 hidden sm:block"}>
                <div className={"bg-bg-input flex items-center h-10 lg:h-12 rounded-2xl px-4 lg:px-6 justify-center border border-border-col"}>
                    <p className="text-sm lg:text-base">LOGO</p>
                </div>
            </div>
            <div className={"flex flex-row-reverse sm:flex-row justify-center items-center flex-1 gap-2 lg:gap-4 min-w-0"}>
                <div className="flex-1 flex min-w-0 max-w-2xl [&>div]:w-full lg:[&>div]:w-full">
                    <SearchBar getCityMap={getCityMap} setSnackbar={setSnackbar} />
                </div>
                <button onClick={(e) => {e.stopPropagation(); addNewTrip();}}
                        className={"border-2 h-10 lg:h-12 px-3 lg:px-4 border-accent border-dashed text-accent bg-bg-input " +
                            "rounded-2xl hover:text-bg-input hover:bg-accent transition duration-150 ease-out hover:ease-in shrink-0 flex items-center justify-center text-sm lg:text-base"}>
                    <span className="block xl:hidden text-xl font-bold">+</span>
                    <span className="hidden xl:block whitespace-nowrap">+ Nowa podróż</span>
                </button>
            </div>
            <div className={"flex items-center justify-end shrink-0 gap-3 lg:gap-5"}>
                <button onClick={(e) => {
                    e.stopPropagation();
                    showTrips();
                }} className={"bg-bg-input flex items-center h-10 lg:h-12 rounded-2xl " +
                    "px-3 lg:px-4 justify-between border border-border-col hover:bg-bg-main gap-2 whitespace-nowrap text-sm lg:text-base shrink-0"}>
                    <span className="hidden sm:block">Moje podróże</span>
                    <span className="block sm:hidden">Podróże</span>
                    <p>▾</p>
                </button>
                <div className={"flex gap-3 lg:gap-4 items-center justify-center shrink-0"}>
                    <button onClick={(e) => {e.stopPropagation(); showNotif();}} className={"flex justify-center items-center"}>
                        <Badge color="error" variant="dot" invisible={!pendingFriends?.length && !socketNotif?.length}>
                            <BsBell className="w-5 h-5 lg:w-[24px] lg:h-[24px]"/>
                        </Badge>
                    </button>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        showSettings();
                        getFriendsList();
                    }} className={"flex justify-center items-center"}>
                        <CgProfile className="w-6 h-6 lg:w-[26px] lg:h-[26px]"/>
                    </button>
                </div>
            </div>

        </main>
    );
}