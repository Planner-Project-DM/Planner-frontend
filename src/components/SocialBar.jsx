import {useEffect, useRef} from 'react';
import LinearProgress from '@mui/material/LinearProgress';
export default function SocialBar({hotels, activeMark, selectedHotel, setSelectedHotel, activeTrip}) {
    const hotelRefs = useRef({});
    useEffect(() =>{
        if(selectedHotel === null){
            return;
        } else {
        hotelRefs.current[selectedHotel.id].scrollIntoView({ behavior: 'smooth' })
        }
    }, [selectedHotel]);
    return (
        <main className="bg-bg-card w-full h-full p-2 flex flex-col">
            <div className="flex flex-col flex-1 overflow-hidden max-h-160">
                {activeMark === "map" ? (
                    hotels.length === 0 ? (
                        <div className={"flex items-center justify-center h-full"}>Tutaj pojawi się lista hoteli</div>
                    ) : (
                        <div className={"overflow-y-scroll"}>
                            <ul className={"flex flex-col gap-2"}>
                                {hotels.map((hotel)=>(
                                    <li key={hotel.id}
                                        onClick={(e) => {e.stopPropagation();setSelectedHotel(hotel);}}
                                        ref={(el) => hotelRefs.current[hotel.id] = el}
                                        className={"flex flex-col gap-5 bg-bg-input border-border-col border-2 rounded-2xl p-5 cursor-pointer"}>
                                        <div className={"font-bold text-xl"}>{hotel.name || "Brak informacji"}</div>
                                        <div className={"flex flex-col"}>
                                            <p className={"text-yellow-600 font-bold"}>⭐- {hotel.stars || "Brak informacji"}</p>
                                            <p id={'street'}>{hotel.address.street || "Brak informacji"}</p>
                                        </div>
                                        <div>
                                            <p className={"text-accent font-bold"}>3500 zł</p>
                                        </div>
                                        <button onClick={e => e.stopPropagation()}
                                            className={"bg-accent text-white border-1 border-accent-hover w-1/2 rounded-2xl h-12"}>Dodaj do noclegów</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                ): (
                    <>
                        <div className="h-12">
                            <p>Grupa • (nazwa)</p>
                        </div>
                        <div className="flex-1 overflow-y-scroll max-h-114 [&::-webkit-scrollbar]:hidden">
                            <ul id="groupList" className="flex flex-col gap-5">
                                <li>Inicjały <p>ANDRZEJ DRZEWKO</p></li>
                                <li>Inicjały <p>ANDRZEJ DRZEWKO</p></li>
                                <li>Inicjały <p>ANDRZEJ DRZEWKO</p></li>
                                <li>Inicjały <p>ANDRZEJ DRZEWKO</p></li>
                                <li>Inicjały <p>ANDRZEJ DRZEWKO</p></li>
                                <li>Inicjały <p>ANDRZEJ DRZEWKO</p></li>
                                <li>Inicjały <p>ANDRZEJ DRZEWKO</p></li>
                                <li>Inicjały <p>ANDRZEJ DRZEWKO</p></li>
                                <li>Inicjały <p>ANDRZEJ DRZEWKO</p></li>
                                <li>Inicjały <p>ANDRZEJ DRZEWKO</p></li>
                                <li>Inicjały <p>ANDRZEJ DRZEWKO</p></li>
                                <li>Inicjały <p>ANDRZEJ DRZEWKO</p></li>
                                <li>Inicjały <p>ANDRZEJ DRZEWKO</p></li>
                                <li>Inicjały <p>ANDRZEJ DRZEWKO</p></li>
                                <li>Inicjały <p>ANDRZEJ DRZEWKO</p></li>
                                <li>Inicjały <p>ANDRZEJ DRZEWKO</p></li>
                            </ul>
                        </div>
                        <div className="p-5 flex justify-center items-center h-24 pt-20">
                            <button className="h-12 w-64 border-2 border-accent border-dashed text-accent bg-bg-input rounded-2xl
                             hover:text-bg-input hover:bg-accent font-bold transition duration-150 ease-out hover:ease-in">+ Dodaj członka grupy
                            </button>
                        </div>
                    </>
                )}
            </div>
            <hr/>
            <div className="shrink-0 flex flex-col gap-3">
                <p className={"flex text-xl mt-2"}>Wydatki:</p>
                <div className={"flex flex-col gap-1"}>
                    <div className={"flex justify-between"}>
                        <p className={"font-bold"}>Budżet:</p>
                        <p className={"font-bold"}>{activeTrip?.budget || "0"} PLN</p>
                    </div>
                    <div className={"flex justify-between"}>
                        <p className={"text-text-secondary font-bold"}>Wydano:</p>
                        <p className={"text-accent font-bold"}>4500 PLN</p>
                    </div>
                </div>
                <LinearProgress variant="determinate" value={50}
                sx={{height: 10, borderRadius: 4, backgroundColor: 'var(--bg-input)',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: '#367EFA',
                        borderRadius: 4,
                    }}}/>
            </div>
        </main>
    )
}