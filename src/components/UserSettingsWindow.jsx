import {useState} from "react";
import {MdOutlineDisplaySettings} from "react-icons/md";
import {FaPeopleGroup} from "react-icons/fa6";
import {FaShield} from "react-icons/fa6";
import SettingsButton from '../components/SettingsButton.jsx';
import GeneralTab from '../components/GeneralTab.jsx';
import TripTab from './TripTab.jsx';
import SafetyTab from '../components/SafetyTab.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function UserSettingsWindow({setOpenSettings, darkMode, isDark, activeTrip, userSettings,
                                               settingsLoading, getUserSettings, setSnackbar, changeTripGroupName, updateTripInformation, userInfo, getUserInfo}) {
    const [activeTab, setActiveTab] = useState("generalTab");

    function renderContent() {
        if (activeTab === "generalTab") {
            if (settingsLoading) {
                return (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress aria-label="Ładowanie..." />
                    </Box>
                );
            }
            if (!userSettings) {
                return <p className="text-text-main">Nie udało się pobrać ustawień.</p>;
            }
            return <GeneralTab darkMode={darkMode} isDark={isDark} userSettings={userSettings} getUserSettings={getUserSettings} setSnackbar={setSnackbar} activeTrip={activeTrip}/>;
        }
        if (activeTab === "groupTab") return <TripTab key={activeTrip?.id} activeTrip={activeTrip} setSnackbar={setSnackbar} changeTripGroupName={changeTripGroupName} updateTripInformation={updateTripInformation}/>;
        if (activeTab === "safetyTab") return <SafetyTab userInfo={userInfo} setSnackbar={setSnackbar} getUserInfo={getUserInfo}/>;
    }

    return (
        <div className="w-screen h-screen fixed z-50 bg-gray-800/80 top-0 left-0 flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
            <div className="bg-bg-card border-2 border-accent rounded-xl relative h-[95%] sm:h-[90%] lg:h-[95%] w-[95%] sm:w-11/12 lg:w-3/4 xl:w-[60%]
                            shadow-gray-500 shadow-md flex flex-col gap-2 sm:gap-4 p-3 sm:p-5 overflow-hidden">
                <button
                    className="absolute top-2 sm:top-4 right-3 sm:right-5 text-text-main hover:text-red-500 text-2xl sm:text-xl font-bold transition-colors z-10"
                    onClick={(e) => {e.stopPropagation();setOpenSettings(false);}}> ✕
                </button>
                <div className={"h-full w-full flex flex-col lg:flex-row p-1 sm:p-3 gap-3 lg:gap-5 overflow-hidden mt-8 lg:mt-0"}>
                    <div className={"w-full lg:w-1/3 xl:w-1/4 bg-bg-funds-card rounded-2xl shadow-lg min-h-fit lg:min-h-32 lg:max-h-44 flex " +
                        "flex-row lg:flex-col items-center justify-start lg:justify-center p-2 lg:p-3 shrink-0 overflow-x-auto [&::-webkit-scrollbar]:hidden gap-2 lg:gap-0"}>
                        <SettingsButton text={"Ogólne"} emote={<MdOutlineDisplaySettings size={20}/>}
                                        onClick={() => setActiveTab("generalTab")}/>
                        <SettingsButton text={"Ustawienia podróży"} emote={<FaPeopleGroup size={20}/>}
                                        onClick={() => setActiveTab("groupTab")}/>
                        <SettingsButton text={"Ustawienia konta"} emote={<FaShield size={20}/>}
                                        onClick={() => setActiveTab("safetyTab")}/>
                    </div>
                    <div className={"w-full h-full p-1 lg:p-3 flex flex-col gap-4 lg:gap-5 overflow-y-auto [&::-webkit-scrollbar]:hidden pb-10 lg:pb-0"}>
                        {renderContent()}
                    </div>

                </div>
            </div>
        </div>
    )
}