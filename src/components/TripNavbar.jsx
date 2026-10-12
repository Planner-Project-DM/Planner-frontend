import {useState, useEffect} from 'react';
import TabButton from './TabButton';
export default function TripNavbar({activeMark, setActiveMark, activeTrip}) {

    return (
        <main className={"bg-bg-card w-full h-auto lg:h-full flex flex-row lg:flex-col shadow-[0_-5px_15px_rgba(0,0,0,0.1)] lg:shadow-none"}>
            <div className={"lg:p-10 flex flex-row lg:flex-col lg:gap-10 lg:h-5/6 w-full items-center"}>
                <h1 className={"hidden lg:flex justify-center text-xl items-center text-text-main"}>ZAKŁADKI</h1>
                <hr className={"hidden lg:block border w-full"}/>
                <div className={"lg:h-3/4 lg:mb-5 w-full flex items-center lg:block"}>
                    <div className={"flex flex-row lg:flex-col gap-2 lg:gap-5 overflow-x-auto [&::-webkit-scrollbar]:hidden p-3 lg:p-0 w-full"}>
                        <TabButton label="Mapa" tabName="map" activeMark={activeMark} setActiveMark={setActiveMark} />
                        <TabButton label="Harmonogram" tabName="dayschedule" activeMark={activeMark} setActiveMark={setActiveMark} />
                        <TabButton label="Notatki" tabName="notes" activeMark={activeMark} setActiveMark={setActiveMark} />
                        <TabButton label="Fundusze" tabName="funds" activeMark={activeMark} setActiveMark={setActiveMark} />
                        <TabButton label="Przewodnik" tabName="stay" activeMark={activeMark} setActiveMark={setActiveMark} />
                        <TabButton label="Pogoda" tabName="weather" activeMark={activeMark} setActiveMark={setActiveMark} />
                        <TabButton label="Podsumowanie" tabName="summary" activeMark={activeMark} setActiveMark={setActiveMark} />
                    </div>
                </div>
                <hr className={"hidden lg:block border w-full"}/>
            </div>
            <div className={"hidden lg:flex flex-col items-center gap-3"}>
                <p className={"text-2xl text-text-main"}>Podróż:</p>
                <div className={"text-xl p-1 break-words max-w-[200px] text-center text-text-main"}>
                    {activeTrip?.name || "Brak aktywnej podróży" }
                </div>
            </div>
        </main>
    )
}