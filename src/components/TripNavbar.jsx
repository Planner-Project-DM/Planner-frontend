import {useState, useEffect} from 'react';
import TabButton from './TabButton';
export default function TripNavbar({activeMark, setActiveMark, activeTrip}) {

    return (
        <main className={"bg-bg-card w-full h-full "}>
            <div className={"p-10 flex flex-col gap-10 h-5/6"}>
                <h1 className={" flex justify-center text-xl items-center "}>ZAKŁADKI</h1>
                <hr className={"border"}/>
                <div className={"h-3/4 mb-5"}>
                    <div className={"flex flex-col gap-5"}>
                        <TabButton label="Mapa" tabName="map" activeMark={activeMark} setActiveMark={setActiveMark} />
                        <TabButton label="Plan dnia" tabName="dayschedule" activeMark={activeMark} setActiveMark={setActiveMark} />
                        <TabButton label="Notatki" tabName="notes" activeMark={activeMark} setActiveMark={setActiveMark} />
                        <TabButton label="Fundusze" tabName="funds" activeMark={activeMark} setActiveMark={setActiveMark} />
                        <TabButton label="Noclegi" tabName="stay" activeMark={activeMark} setActiveMark={setActiveMark} />
                        <TabButton label="Pogoda" tabName="weather" activeMark={activeMark} setActiveMark={setActiveMark} />
                        <TabButton label="Podsumowanie" tabName="summary" activeMark={activeMark} setActiveMark={setActiveMark} />
                    </div>
                </div>
                <hr className={"border"}/>
            </div>
            <div className={"flex flex-col items-center gap-3"}>
                <p className={"text-2xl"}>Podróż:</p>
                <div className={"text-xl p-1 break-words max-w-96"}>
                    {activeTrip?.name || "Brak aktywnej podróży" }
                </div>
            </div>
        </main>
    )
}