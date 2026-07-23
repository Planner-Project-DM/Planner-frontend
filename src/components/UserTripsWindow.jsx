export default function UserTripsWindow({userTrips}){

    return(
        <div className="bg-bg-card border-2 border-accent border-t-0 text-white rounded-xl
                    absolute text-center w-144 min-h-114 right-52  shadow-gray-500 shadow-md rounded-t">
            <div className={"w-full text-text-main flex justify-around h-12 items-center font-bold mt-2 mb-2"}>
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
            <hr className={""}/>
            <div onClick={(e) => e.stopPropagation()} className={"text-text-main"} >
                <ul id={"tripsList"} className={"p-5"}>
                    {userTrips.map((trip) => (
                        <li key={trip.name}>
                            <div onClick={(e) => e.stopPropagation()}>{trip.name}</div>
                            <div onClick={(e) => e.stopPropagation()}>{`${trip.startDate} → ${trip.endDate}`}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}