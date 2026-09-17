export default function UserTripsWindow({userTrips, selectActiveTrip, activeTrip, showTrips}) {

    return (
        <div className="w-screen h-screen fixed z-50 bg-gray-800/80 top-0 left-0" onClick={(e) => e.stopPropagation()}>
            <div className="bg-bg-card border-2 border-accent rounded-xl absolute h-3/4 top-1/2 left-1/2 -translate-x-1/2
                         -translate-y-1/2 shadow-gray-500 shadow-md flex flex-col gap-4 w-192 p-5">
                <button className="absolute top-4 right-5 text-text-main hover:text-red-500 text-xl font-bold transition-colors"
                        onClick={(e) => {e.stopPropagation(); showTrips(false);}}> ✕
                </button>
                <div className={"w-full text-text-main flex justify-between h-12 items-center font-bold px-5 mt-4"}>
                    <button onClick={(e) => e.stopPropagation()}
                            className={"h-10 w-36 bg-accent rounded-xl text-white " +
                                "hover:bg-accent-hover border border-accent-hover "}>Aktywne
                    </button>
                    <button onClick={(e) => e.stopPropagation()}
                            className={"h-10 w-36 rounded-xl text-text-secondary bg-bg-main " +
                                "hover:bg-bg-input border border-border-col"}>Zakończone
                    </button>
                    <button onClick={(e) => e.stopPropagation()}
                            className={"h-10 w-36 rounded-xl text-white bg-red-500 " +
                                "hover:bg-red-700 border border-red-600"}>Anulowane
                    </button>
                </div>
                <hr className={"border-border-col/50"}/>
                <div onClick={(e) => e.stopPropagation()} className={"text-text-main flex-1 overflow-hidden"}>
                    <ul id={"tripsList"}
                        className={"p-1 flex flex-col gap-2.5 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden"}>
                        {userTrips.map((trip) => (
                            <li key={trip.id}
                                className={`flex flex-col items-start border-2 rounded-xl p-3 cursor-pointer ${trip.id === activeTrip?.id
                                    ? "bg-accent text-white border-accent"
                                    : "bg-bg-main text-text-main border-border-col hover:bg-bg-input"
                                }`}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    selectActiveTrip(trip)
                                }}>
                                <div>{trip.name}</div>
                                <div>{`${trip.startDate} → ${trip.endDate}`}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}