import SettingsCard from "../components/SettingsCard";
import api from "../api/axios.js";
import {useState} from "react";

export default function TripTab({activeTrip}) {

    return (
        <>
            {activeTrip ? (
                <>
                    <SettingsCard header={"Nazwa grupy"} paragraph={"Zmień nazwę swojej grupy podróży."}
                                      showButton={true} showInput={true} inputType={"text"} placeholder={"Nazwa grupy"}
                                      name={"tripNameChange"} maxLength={25}/>
                </>
            ) : (
                <div className={"w-full h-full flex items-center justify-center bg-bg-funds-card rounded-2xl shadow-lg"}>
                    <p className={"text-text-main text-2xl"}>Wybierz podróż!</p>
                </div>
            )}
        </>
    )
}