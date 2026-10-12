export default function UserTripsWindow({userTrips, selectActiveTrip, activeTrip, showTrips}) {

    return (
        <div className="w-screen h-screen fixed z-50 bg-gray-800/80 top-0 left-0 flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
            <div className="bg-bg-card border-2 border-accent rounded-xl relative h-[90%] sm:h-[85%] lg:h-3/4 shadow-gray-500 shadow-md flex flex-col gap-3 lg:gap-4 w-[95%] sm:w-11/12 lg:w-192 p-3 lg:p-5">
                <button className="absolute top-2 lg:top-4 right-3 lg:right-5 text-text-main hover:text-red-500 text-2xl lg:text-xl font-bold transition-colors z-10"
                        onClick={(e) => {e.stopPropagation(); showTrips(false);}}> ✕
                </button>
                <div className={"w-full text-text-main flex flex-col sm:flex-row justify-between h-auto sm:h-12 items-center font-bold px-2 lg:px-5 mt-8 sm:mt-4 gap-2 sm:gap-0 shrink-0"}>
                    <button onClick={(e) => e.stopPropagation()}
                            className={"h-10 w-full sm:w-32 lg:w-36 bg-accent rounded-xl text-white text-sm lg:text-base " +
                                "hover:bg-accent-hover border border-accent-hover "}>Aktywne
                    </button>
                    <button onClick={(e) => e.stopPropagation()}
                            className={"h-10 w-full sm:w-32 lg:w-36 rounded-xl text-text-secondary bg-bg-main text-sm lg:text-base " +
                                "hover:bg-bg-input border border-border-col"}>Zakończone
                    </button>
                    <button onClick={(e) => e.stopPropagation()}
                            className={"h-10 w-full sm:w-32 lg:w-36 rounded-xl text-white bg-red-500 text-sm lg:text-base " +
                                "hover:bg-red-700 border border-red-600"}>Anulowane
                    </button>
                </div>
                <hr className={"border-border-col/50 my-1 sm:my-0"}/>
                <div onClick={(e) => e.stopPropagation()} className={"text-text-main flex-1 overflow-hidden"}>
                    <ul id={"tripsList"}
                        className={"p-1 flex flex-col gap-2.5 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden pb-4 lg:pb-0"}>
                        {userTrips.map((trip) => (
                            <li key={trip.id}
                                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between border-2 rounded-xl p-3 lg:p-4 cursor-pointer gap-1 sm:gap-0 text-sm lg:text-base ${trip.id === activeTrip?.id
                                    ? "bg-accent text-white border-accent"
                                    : "bg-bg-main text-text-main border-border-col hover:bg-bg-input"
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    selectActiveTrip(trip)
                                }}>
                                <div className="font-bold sm:font-normal break-words w-full sm:w-auto">{trip.name}</div>
                                <div className="text-xs sm:text-sm lg:text-base opacity-90">{`${trip.startDate} → ${trip.endDate}`}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}