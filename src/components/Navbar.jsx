import {useState, useEffect} from 'react';
import { CgProfile } from "react-icons/cg";
import { BsBell } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

export default function Navbar({showTrips}){

    return(
        <main className={"flex h-full items-center  bg-bg-card w-full  font-bold text-text-main "}>
            <div className={"w-3/12"}>
                <div className={"bg-bg-input flex items-center h-12 ml-10 w-1/2 max-w-72 rounded-2xl " +
                    "p-5 justify-center border border-b-border-col"}>
                    <p>LOGO</p>
                </div>
            </div>

            <div className={"flex  justify-center w-1/2 gap-5"}>
                <div className="relative w-144">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2" />
                    <input className={"pl-8 bg-bg-input flex items-center h-12 w-full rounded-2xl " +
                        "p-5 border border-b-border-col"} placeholder="Szukaj miejsc, tras..." />
                </div>
                <button className={"border-2 h-12 border-accent border-dashed text-accent bg-bg-input " +
                    "rounded-2xl w-44 hover:text-bg-input hover:bg-accent "}>
                    <p> + Nowa podróż</p>
                </button>
            </div>

            <div className={"ml-auto flex items-center justify-center w-3/12 gap-10"}>
                    <button className={"w-52"}>
                        <div onClick={showTrips}  className={"bg-bg-input flex items-center h-12 w-full rounded-2xl " +
                            "p-5 justify-between border border-b-border-col hover:bg-bg-main"}>
                            <p>Moje podróże</p><p>▾</p>
                        </div>
                    </button>
                <div className={"flex gap-5"}>
                    <button className={"w-12"}> <BsBell size={25} /> </button>
                    <button className={"w-12"}> <CgProfile size={25} /> </button>
                </div>
            </div>
        </main>
    );
}
