import {useState} from "react";
import {MdOutlineDisplaySettings} from "react-icons/md";
import {FaPeopleGroup} from "react-icons/fa6";
import {FaShield} from "react-icons/fa6";
import SettingsButton from '../components/SettingsButton.jsx';
import GeneralTab from '../components/GeneralTab.jsx';
import TripTab from './TripTab.jsx';
import SafetyTab from '../components/SafetyTab.jsx';

export default function UserSettingsWindow({setOpenSettings, darkMode, isDark, activeTrip}) {
    const [activeTab, setActiveTab] = useState("generalTab");

    function renderContent() {
        if (activeTab === "generalTab") return <GeneralTab darkMode={darkMode} isDark={isDark}/>;
        if (activeTab === "groupTab") return <TripTab activeTrip={activeTrip}/>;
        if (activeTab === "safetyTab") return <SafetyTab/>;
    }

    return (
        <div className="w-screen h-screen fixed z-50 bg-gray-800/80 top-0 left-0" onClick={(e) => e.stopPropagation()}>
            <div className="bg-bg-card border-2 border-accent rounded-xl absolute h-[95%] top-1/2 left-1/2 -translate-x-1/2
                         -translate-y-1/2 shadow-gray-500 shadow-md flex flex-col gap-4 w-1/2 p-5">
                <button
                    className="absolute top-4 right-5 text-text-main hover:text-red-500 text-xl font-bold transition-colors"
                    onClick={(e) => {e.stopPropagation();setOpenSettings(false);}}> ✕
                </button>
                <div className={"h-full w-full flex p-3 gap-5"}>
                    <div
                        className={"w-5/12 bg-bg-funds-card rounded-2xl shadow-lg min-h-32 max-h-44 flex flex-col items-center justify-center p-3 mt-2"}>
                        <SettingsButton text={"Ogólne"} emote={<MdOutlineDisplaySettings size={20}/>}
                                        onClick={() => setActiveTab("generalTab")}/>
                        <SettingsButton text={"Ustawienia podróży"} emote={<FaPeopleGroup size={20}/>}
                                        onClick={() => setActiveTab("groupTab")}/>
                        <SettingsButton text={"Ustawienia konta"} emote={<FaShield size={20}/>}
                                        onClick={() => setActiveTab("safetyTab")}/>
                    </div>
                    <div className={"w-full h-full p-3 flex flex-col gap-5"}>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    )
}