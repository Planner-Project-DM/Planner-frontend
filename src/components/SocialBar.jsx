import {useEffect, useRef} from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import FilterButtons from '../components/FilterButtons.jsx';
import { FaUser } from "react-icons/fa";
import { FaCrown } from "react-icons/fa6";
import { AiOutlineUsergroupDelete } from "react-icons/ai";

export default function SocialBar({tripItems, activeMark, selectedTripItem, setSelectedTripItem, activeTrip, loading,
                                      setSelectedCategory, selectedCategory, addItemToTrip, groupMembers, getTripGroupMem,
                                      setNewGroup, setMemberToDelete, openDelMem}) {
    const hotelRefs = useRef({});
    useEffect(() =>{
        if(selectedTripItem === null){
            return;
        } else {
        hotelRefs.current[selectedTripItem.id].scrollIntoView({ behavior: 'smooth' })
        }
    }, [selectedTripItem]);
    useEffect(() =>{
        getTripGroupMem();
    }, [activeTrip]);

    const finalSum = (activeTrip?.actualCost / activeTrip?.budget) * 100;
    return (
        <main className="bg-bg-card w-full h-full p-2 flex flex-col">
            <div className="flex flex-col flex-1 overflow-hidden max-h-160">
                {activeMark === "map" ? (
                    loading ? (
                        <div className={"flex items-center justify-center h-full"}>
                            <CircularProgress />
                        </div>
                    ) : tripItems.length === 0 ? (
                        <div className={"flex items-center justify-center h-full text-text-main"}>Tutaj pojawi się lista hoteli</div>
                    ) : (
                        <>
                            <div className={"p-5 flex items-center w-full justify-between max-h-20"}>
                                <FilterButtons name={"Wszystko"} onclick={() => setSelectedCategory('ALL')} isActive={selectedCategory === 'ALL'}/>
                                <FilterButtons name={"Hotele"} onclick={() => setSelectedCategory('HOTEL')} isActive={selectedCategory === 'HOTEL'}/>
                                <FilterButtons name={"Atrakcje"} onclick={() => setSelectedCategory('ATTRACTION')} isActive={selectedCategory === 'ATTRACTION'}/>
                            </div>
                            <div className={"overflow-y-scroll [&::-webkit-scrollbar]:hidden"}>
                                <ul className={"flex flex-col gap-2"}>
                                    {tripItems.map((hotel)=>(
                                        <li key={hotel.id}
                                            onClick={(e) => {e.stopPropagation(); setSelectedTripItem(hotel);}}
                                            ref={(el) => hotelRefs.current[hotel.id] = el}
                                            className={"flex flex-col gap-5 bg-bg-input border-border-col border-2 rounded-2xl p-5 cursor-pointer"}>
                                            <div className={"font-bold text-xl text-text-main"}>{hotel.name || "Brak informacji"}</div>
                                            <div className={"flex flex-col"}>{hotel.category === "HOTEL" ?
                                                <p className={"text-yellow-600 font-bold"}>⭐- {hotel.stars || "Brak informacji"}</p>
                                                : <p className={"text-green-600 font-bold"}> {hotel.email || "Brak informacji"}</p>
                                            }
                                                <p className={"text-text-main"} id={'street'}>{hotel.address.street || "Brak informacji"}</p>
                                            </div>
                                            <div>
                                                <p className={"text-accent font-bold"}>3500 zł</p>
                                            </div>
                                            <button onClick={(e) => {
                                                e.stopPropagation();
                                                addItemToTrip(hotel);
                                            }}
                                                className={"bg-accent text-white border-1 border-accent-hover w-3/4 rounded-2xl h-12 hover:bg-accent-hover"}>Dodaj do zakładki "Przewodnik"</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )
                ) : (
                    <>
                        <div className="h-12">
                            <p className={"text-text-main"}>Grupa • {!activeTrip?.tripGroup ? "Nazwij grupę" : activeTrip.tripGroup.groupUsers[0].group.name}</p>
                        </div>
                        <div className="flex-1 overflow-y-scroll max-h-128 [&::-webkit-scrollbar]:hidden">
                            <ul id="groupList" className="flex flex-col gap-5 text-text-main">
                                {groupMembers  === null ? (
                                        <div className={"flex items-center justify-center h-full text-text-main font-bold"}>Tutaj pojawią się członkowie grupy</div>
                                ) : (
                                    ([...groupMembers].sort((a, b) => a.role === "OWNER"? -1 : b.role === "OWNER"? 1 : 0) || []).map((member) => (
                                        <li className={"flex gap-1 items-center h-10 w-full justify-around"} key={member.user.email}>
                                            <div className={"flex justify-between gap-5"}>
                                                <div className={"bg-accent rounded-full p-1 h-10 flex justify-center items-center text-white w-10"}>
                                                    {`${member.user.firstName[0]}${member.user.lastName[0]}`}
                                                </div>
                                                <div className={"flex flex-col items-start flex-1"}>
                                                    <div className={"break-words flex min-w-64 items-center gap-2 font-bold"}>
                                                        {member.role === "OWNER" ? <FaCrown className={"text-yellow-400"} /> : <FaUser/> }
                                                        {member.user.firstName} {member.user.lastName}</div>
                                                    <div className={"text-xs text-text-secondary"}>{member.user.email}</div>
                                                </div>
                                            </div>
                                            <div>
                                                {member.role === "MEMBER" && (
                                                    <div>
                                                        <AiOutlineUsergroupDelete onClick={() => {setMemberToDelete(member); openDelMem();}}
                                                            size={25}
                                                            className={"mr-3 cursor-pointer"}/>
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                        <div className="p-5 flex justify-center items-center h-24">
                            <button onClick={(e) => {e.stopPropagation(); setNewGroup(true)}}
                                    className="h-12 w-64 border-2 border-accent border-dashed text-accent bg-bg-input rounded-2xl
                             hover:text-bg-input hover:bg-accent font-bold transition duration-150 ease-out hover:ease-in">+ Dodaj członka grupy
                            </button>
                        </div>
                    </>
                )}
            </div>
            <hr/>
            {activeMark !== "dayschedule"  && (
                <div className="shrink-0 flex flex-col gap-3">
                    <p className={"flex text-xl mt-2 text-text-main"}>Wydatki:</p>
                    <div className={"flex flex-col gap-1"}>
                        <div className={"flex justify-between text-text-main"}>
                            <p className={"font-bold"}>Budżet:</p>
                            <p className={"font-bold"}>{activeTrip?.budget || "0"} PLN</p>
                        </div>
                        <div className={"flex justify-between"}>
                            <p className={"text-text-secondary font-bold"}>Wydano:</p>
                            <p className={"text-accent font-bold"}>{activeTrip?.actualCost || "0"} PLN</p>
                        </div>
                    </div>
                    <LinearProgress variant="determinate" value={finalSum}
                                    sx={{height: 10, borderRadius: 4, backgroundColor: 'var(--bg-input)',
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: '#367EFA',
                                            borderRadius: 4,
                                        }}}/>
                </div>
            )}

        </main>
    )
}