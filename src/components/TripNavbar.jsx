import {useState, useEffect} from 'react';

export default function TripNavbar (){

    return(
        <main className={"bg-bg-card w-full h-full "}>
            <div className={"p-10 flex flex-col gap-10 h-5/6"}>
                <h1 className={" flex justify-center text-xl items-center "}>ZAKŁADKI</h1>
                <hr className={"border"}/>
                <div className={"h-3/4 mb-5"}>
                    <ul id="bookmarks" className={""}>
                        <li>Mapa</li>
                        <li>Plan dnia</li>
                        <li>Podsumowanie</li>
                        <li>Fundusze</li>
                        <li>Noclegi</li>
                        <li>Pogoda</li>
                        <li>Notatki</li>
                    </ul>
                </div>
                <hr className={"border"}/>
            </div>
            <div className={"flex flex-col items-center gap-7"}>
                <p className={"text-2xl"}>Podróż:</p>
                <div className={"text-xl"}>
                    Japonia 2026
                </div>
            </div>
        </main>
    )
}