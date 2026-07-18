import {useState, useEffect} from 'react';
import { SlSettings } from "react-icons/sl";
import { BsBell } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
export default function Navbar(){


    return(
        <main className={"flex h-full items-center  bg-bg-card w-full  font-bold text-text-main "}>
            <div className={"min-w-40 max-w-96"}>
                <div className={"bg-bg-input flex items-center h-12 w-full rounded-2xl p-5 justify-center border border-b-border-col"}>
                    <p>LOGO</p>
                </div>
            </div>
            <div className={"w-4/12 "}>
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2" />
                    <input className={"pl-8 bg-bg-input flex items-center h-12 w-full rounded-2xl p-5 border border-b-border-col"} placeholder="Szukaj miejsc, tras..." />
                </div>
            </div>
            <button className={"border-2 border-accent border-dashed text-accent bg-bg-input rounded-2xl w-40 h-1/2"}>
                <p> + Nowa podróż</p>
            </button>
            <button className={"w-52"}>
                <div className={"bg-bg-input flex items-center h-12 w-full rounded-2xl p-5 justify-between border border-b-border-col"}>
                    <p>Moje podróże</p><p>▾</p>
                </div>
            </button>
            <div className={"flex gap-2"}>
                <button> <BsBell /> </button>
                <button> <SlSettings /> </button>
            </div>
        </main>
    );
}