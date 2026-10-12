import FormInput from "./FormInput.jsx";
import { FaRegTrashCan } from "react-icons/fa6";
import {useEffect, useState} from "react";
export default function Stay({activeTrip, setItemPrice, removeItemFromTrip, refreshActiveTrip, activeMark}) {
    // useEffect(() => {
    //     refreshActiveTrip()
    // }, [activeMark]);
    const [itemPrices, setItemPrices] = useState({});
    return (
        <main className={"w-full h-full"}>
            <div
                className={"w-full h-full pt-2"}>
                {activeTrip === null ? (
                    <div className={"w-full h-full flex justify-center items-center p-4 text-center"}>
                        <div className={"font-bold text-2xl lg:text-5xl text-text-main"}>Wybierz podróż!</div>
                    </div>
                ) : (
                    activeTrip?.tripItineraries.length === 0 ? (
                        <div className={"w-full h-full flex justify-center items-center p-4 text-center"}>
                            <div className={"font-bold text-2xl lg:text-5xl text-text-main"}>Brak atrakcji/noclegów</div>
                        </div>
                    ) : (
                        <ul className={"flex flex-col gap-4 lg:gap-7 mx-auto p-2 lg:p-3 w-full lg:w-11/12 h-full overflow-y-scroll [&::-webkit-scrollbar]:hidden pb-20 lg:pb-0"}>
                            {[...activeTrip.tripItineraries].sort((a, b) => a.tripItem.name.localeCompare(b.tripItem.name)).map((trip) => (
                                <li className={"w-full min-h-auto lg:min-h-48 flex flex-col lg:flex-row text-text-main rounded-2xl p-4 lg:p-2 bg-bg-card border-2 border-accent shadow-md gap-4 lg:gap-0"}
                                    key={trip.tripItem.id}>

                                    <div className={"w-full lg:w-1/2 flex flex-col justify-evenly gap-2 lg:gap-3"}>
                                        <div className={"flex items-center gap-2"}>
                                            <div className={`w-3 h-3 rounded-full text-2xl text-bold shrink-0
                                            ${trip.tripItem.category === "ATTRACTION" ? "bg-[#639922]" : "bg-[#378ADD]"}`}></div>
                                            <div className={"font-bold text-lg lg:text-2xl text-text-main break-words"}>{trip.tripItem.name}</div>
                                        </div>
                                        <div className={"flex flex-wrap items-center gap-1 lg:gap-2 font-bold text-sm lg:text-base text-text-main"}>
                                            <div>{trip.tripItem.address.street  || "Brak informacji o ulicy"}</div>
                                            <p className="hidden sm:block">-</p>
                                            <div>{trip.tripItem.address.city  || "Brak informacji o mieście"}</div>
                                        </div>
                                        <div className={"flex flex-wrap gap-1 lg:gap-2 text-sm lg:text-base"}>
                                            <p className={"text-text-main shrink-0"}>Strona: </p>
                                            <a href={trip.tripItem.website} target={"_blank"}
                                               className={"text-text-secondary hover:text-accent break-all"}>
                                                {trip.tripItem.website || "Brak informacji"}</a>
                                        </div>
                                    </div>
                                    <div className={"flex flex-col items-end justify-between lg:justify-around gap-4 lg:gap-2 w-full lg:w-1/2 border-t lg:border-t-0 border-border-col pt-4 lg:pt-0 mt-2 lg:mt-0"}>
                                        <div className={"flex items-center justify-center bg-red-600 rounded-xl border-2 border-red-700 cursor-pointer " +
                                            "transition duration-150 ease-out hover:ease-in w-10 h-10 shrink-0"}>
                                            <FaRegTrashCan
                                                onClick={() => removeItemFromTrip(trip.tripItem)} size={24} className="lg:w-[30px] lg:h-[30px]"/>
                                        </div>
                                        <div className={"flex flex-col sm:flex-row items-end sm:items-center gap-2 w-full sm:w-auto"}>
                                            <div className={"w-full sm:w-44 text-text-main"}>
                                                <FormInput className={"w-full sm:w-32"} id="price" placeholder={trip?.price? trip.price : "Podaj kwotę"} type="number"
                                                           max={9999999999} min={0}
                                                           onChange={e => setItemPrices({...itemPrices, [trip.tripItem.id]: e.target.value})}
                                                />
                                            </div>
                                            <button
                                                className={"w-full sm:w-28 h-10 lg:h-12 border-2 border-green-600 text-white hover:border-green-700 " +
                                                    "rounded-xl bg-green-500 hover:bg-green-600 transition duration-150 ease-out hover:ease-in text-sm lg:text-base whitespace-nowrap px-2"}
                                                onClick={() => setItemPrice(trip.tripItem.id, itemPrices[trip.tripItem.id])}
                                            >Zapisz cenę</button>
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