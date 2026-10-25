import {useEffect, useRef, useContext} from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import FilterButtons from '../components/FilterButtons.jsx';
import { FaUser } from "react-icons/fa";
import { FaCrown } from "react-icons/fa6";
import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { CurrencyContext } from '../api/CurrencyContext.jsx';

export default function SocialBar({tripItems, activeMark, selectedTripItem, setSelectedTripItem, activeTrip, loading,
                                      setSelectedCategory, selectedCategory, addItemToTrip, groupMembers, getTripGroupMem,
                                      setNewGroup, setMemberToDelete, openDelMem}) {
    const hotelRefs = useRef({});
    const { currency } = useContext(CurrencyContext);
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
        <main className="bg-bg-card w-full p-2 flex flex-col relative h-auto lg:h-full">
            <div className="flex flex-col flex-1 overflow-hidden lg:max-h-160">
                {activeMark === "map" ? (
                    loading ? (
                        <div className={"flex items-center justify-center h-48 lg:h-full"}>
                            <CircularProgress />
                        </div>
                    ) : tripItems.length === 0 ? (
                        <div className={"flex items-center justify-center h-48 lg:h-full text-text-main"}>Tutaj pojawi się lista hoteli</div>
                    ) : (
                        <>
                            <div className={"p-2 lg:p-5 flex items-center w-full justify-between max-h-20 gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden"}>
                                <FilterButtons name={"Wszystko"} onclick={() => setSelectedCategory('ALL')} isActive={selectedCategory === 'ALL'}/>
                                <FilterButtons name={"Hotele"} onclick={() => setSelectedCategory('HOTEL')} isActive={selectedCategory === 'HOTEL'}/>
                                <FilterButtons name={"Atrakcje"} onclick={() => setSelectedCategory('ATTRACTION')} isActive={selectedCategory === 'ATTRACTION'}/>
                            </div>
                            <div className={"overflow-y-scroll [&::-webkit-scrollbar]:hidden max-h-96 lg:max-h-full"}>
                                <ul className={"flex flex-col gap-2 p-1"}>
                                    {tripItems.map((hotel)=>(
                                        <li key={hotel.id}
                                            onClick={(e) => {e.stopPropagation(); setSelectedTripItem(hotel);}}
                                            ref={(el) => hotelRefs.current[hotel.id] = el}
                                            className={"flex flex-col gap-3 lg:gap-5 bg-bg-input border-border-col border-2 rounded-2xl p-4 lg:p-5 cursor-pointer"}>
                                            <div className={"font-bold text-lg lg:text-xl text-text-main"}>{hotel.name || "Brak informacji"}</div>
                                            <div className={"flex flex-col text-sm lg:text-base"}>{hotel.category === "HOTEL" ?
                                                <p className={"text-yellow-600 font-bold"}>⭐{hotel.stars || "Brak informacji"}</p>
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
                                                    className={"bg-accent text-white border-1 border-accent-hover w-full lg:w-3/4 rounded-2xl h-10 lg:h-12 hover:bg-accent-hover text-sm lg:text-base"}>Dodaj do zakładki "Przewodnik"</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )
                ) : (
                    <>
                        <div className="h-12 flex items-center px-2">
                            <p className={"text-text-main"}>Grupa • <b>{!activeTrip?.tripGroup?.name ? "Nazwij grupę" : activeTrip.tripGroup?.name}</b></p>
                        </div>
                        <div className="flex-1 overflow-y-scroll max-h-64 lg:max-h-128 [&::-webkit-scrollbar]:hidden">
                            <ul id="groupList" className="flex flex-col gap-5 text-text-main p-2">
                                {groupMembers  === null ? (
                                    <div className={"flex items-center justify-center h-full text-text-main font-bold"}>Tutaj pojawią się członkowie grupy</div>
                                ) : (
                                    ([...groupMembers].sort((a, b) => a.role === "OWNER"? -1 : b.role === "OWNER"? 1 : 0) || []).map((member) => (
                                        <li className={"flex gap-1 items-center h-10 w-full justify-between"} key={member.user.email}>
                                            <div className={"flex justify-between gap-3 lg:gap-5 w-full"}>
                                                <div className={"bg-accent rounded-full p-1 h-10 flex justify-center items-center text-white w-10 shrink-0"}>
                                                    {`${member.user.firstName[0]}${member.user.lastName[0]}`}
                                                </div>
                                                <div className={"flex flex-col items-start flex-1 min-w-0"}>
                                                    <div className={"break-words flex items-center gap-2 font-bold text-sm lg:text-base truncate w-full"}>
                                                        {member.role === "OWNER" ? <FaCrown className={"text-yellow-400 shrink-0"} /> : <FaUser className={"shrink-0"}/> }
                                                        <span className={"truncate"}>{member.user.firstName} {member.user.lastName}</span>
                                                    </div>
                                                    <div className={"text-xs text-text-secondary truncate w-full"}>{member.user.email}</div>
                                                </div>
                                                <div className={"flex items-center shrink-0"}>
                                                    {member.role === "MEMBER" && (
                                                        <div>
                                                            <AiOutlineUsergroupDelete onClick={() => {setMemberToDelete(member); openDelMem();}}
                                                                                      size={25}
                                                                                      className={"mr-1 lg:mr-3 cursor-pointer"}/>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                        <div className="p-2 lg:p-5 flex justify-center items-center h-20 lg:h-24">
                            <button onClick={(e) => {e.stopPropagation(); setNewGroup(true)}}
                                    className="h-10 lg:h-12 w-full lg:w-64 border-2 border-accent border-dashed text-accent bg-bg-input rounded-2xl
                             hover:text-bg-input hover:bg-accent font-bold transition duration-150 ease-out hover:ease-in text-sm lg:text-base">+ Dodaj członka grupy
                            </button>
                        </div>
                    </>
                )}
            </div>

            <hr className={"my-2 lg:my-0"}/>

            {activeMark !== "dayschedule"  && (
                <div className="shrink-0 flex flex-col gap-2 lg:gap-3 px-2 lg:px-0 pb-4 lg:pb-0">
                    <p className={"flex text-lg lg:text-xl lg:mt-2 text-text-main"}>Wydatki:</p>
                    <div className={"flex flex-col gap-1 text-sm lg:text-base"}>
                        <div className={"flex justify-between text-text-main"}>
                            <p className={"font-bold"}>Budżet:</p>
                            <p className={"font-bold"}>{new Intl.NumberFormat('pl-PL', { style: 'currency', currency }).format(activeTrip?.budget || 0)}</p>
                        </div>
                        <div className={"flex justify-between"}>
                            <p className={"text-text-secondary font-bold"}>Wydano:</p>
                            <p className={"text-accent font-bold"}>{new Intl.NumberFormat('pl-PL', { style: 'currency', currency }).format(activeTrip?.actualCost || 0)}</p>
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