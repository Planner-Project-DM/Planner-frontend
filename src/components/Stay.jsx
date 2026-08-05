import FormInput from "./FormInput.jsx";

export default function Stay({activeTrip}) {

    return (
        <main className={"w-full h-full"}>
            <div
                className={"w-full h-full pt-2"}>
                {activeTrip === null ? (
                    <div className={"w-full h-full flex justify-center items-center"}>
                        <div className={"font-bold text-5xl"}>Wybierz podróż!</div>
                    </div>
                ) : (
                    activeTrip?.tripItineraries.length === 0 ? (
                        <div className={"w-full h-full flex justify-center items-center"}>
                            <div className={"font-bold text-5xl"}>Brak atrakcji/noclegów</div>
                        </div>
                    ) : (
                        <ul className={"flex flex-col gap-7 mx-auto p-3 w-11/12 h-full overflow-y-scroll [&::-webkit-scrollbar]:hidden"}>
                            {activeTrip?.tripItineraries.map((trip) => (
                                <li className={"w-full min-h-36 flex text-text-main rounded-2xl p-2 bg-bg-card border-2 border-accent"}>
                                    <div className={"w-3/4 flex flex-col justify-evenly gap-3"}>
                                        <div className={"flex items-center gap-2"}>
                                            <div className={`w-3 h-3 rounded-full text-2xl text-bold 
                                            ${trip.tripItem.category === "ATTRACTION" ? "bg-[#639922]" : "bg-[#378ADD]"}`}></div>
                                            <div className={"font-bold text-2xl text-text-main"}>{trip.tripItem.name}</div>
                                        </div>
                                        <div className={"flex items-center gap-2 font-bold text-text-main"}>
                                            <div>{trip.tripItem.address.street  || "Brak informacji o ulicy"}</div>
                                            <p>-</p>
                                            <div>{trip.tripItem.address.city  || "Brak informacji o mieście"}</div>
                                        </div>
                                        <div className={"flex gap-2"}><p className={"text-text-main"}>Strona: </p>
                                            <a href={trip.tripItem.website} target={"_blank"}
                                               className={"text-text-secondary hover:text-accent"}>
                                                {trip.tripItem.website || "Brak informacji"}</a>
                                        </div>
                                    </div>
                                    <div className={"flex items-center justify-end gap-2 w-1/4"}>
                                        <div className={"font-bold text-text-main"}>Cena: </div>
                                        <div className={"w-44 text-text-main"}>
                                            <FormInput id="price" placeholder="Podaj kwotę" type="number"
                                                       max={9999999999} min={0}/>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )
                )}
            </div>
        </main>
    )
}