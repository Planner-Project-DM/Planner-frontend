import { TiUserDelete } from "react-icons/ti";
import Button from '@mui/material/Button';

export default function UserSettings({setNewFriend, friends, alertOpen, setFriendToDelete, isDark, setOpenSettings, setMySettings}){
    return (
        <div className="bg-bg-card border-2 border-accent border-t-0 text-white rounded-xl absolute text-center w-[90vw] sm:w-114 min-h-[50vh] lg:min-h-160
                    -right-2 sm:right-0 shadow-gray-500 shadow-md border-r-0 rounded-t p-2 font-bold z-50"
             onClick={e => e.stopPropagation()}>
            <div className={"flex text-text-main gap-3 lg:gap-5 items-center p-2 lg:p-3 justify-around"}>
                <button className={"cursor-pointer bg-bg-funds-card w-full lg:w-1/2 h-10 lg:h-12 hover:bg-bg-main font-bold rounded-xl border-border-col border-2" +
                    " transition duration-150 hover:ease-in ease-out text-sm lg:text-base"} onClick={() => {
                    setOpenSettings(true)
                    setMySettings(false)
                }}>Ustawienia
                </button>
            </div>
            <hr className="border-border-col"/>
            <div className={"flex flex-col text-text-main p-2 lg:p-3 gap-1"}>
                <div className={"flex flex-col justify-center items-center text-sm lg:text-base"}>Znajomi
                    <hr className={"w-1/2 border-2 border-accent rounded-2xl mt-1"}/></div>
                <ul id={"friendsList"} className={"w-full mt-2"}>
                    {(friends || []).map((friend) => (
                        <li className={"flex gap-1 items-center justify-between p-1"} key={friend.id}>
                            <div className={"flex justify-between gap-3 lg:gap-5 w-full"}>
                                <div className={"bg-accent rounded-full p-1 h-10 flex justify-center items-center text-white w-10 shrink-0"}>
                                    {`${friend.name[0]}${friend.surname[0]}`}
                                </div>
                                <div className={"flex flex-col items-start text-left w-full"}>
                                    <div className={"max-w-[150px] sm:max-w-52 break-words text-sm lg:text-base"}>{friend.name} {friend.surname}</div>
                                    <div className={"text-xs text-text-secondary break-all"}>{friend.email}</div>
                                </div>
                            </div>
                            <div className={"flex justify-center items-center shrink-0"}>
                                <Button onClick={() => { setFriendToDelete(friend.email); alertOpen(); }}
                                        style={isDark? {color: 'white'}: {color:'black'}}><TiUserDelete className="w-6 h-6 lg:w-[25px] lg:h-[25px]" />
                                </Button>
                            </div>
                        </li>
                    ))}
                    {(friends || []).length === 0 &&
                        <p className={"font-bold text-lg lg:text-2xl flex justify-center items-center py-4"}>Brak znajomych</p>
                    }
                </ul>
            </div>
            <hr className="border-border-col"/>
            <div className="text-text-main p-3 pt-4 lg:pt-5">
                <button onClick={(e) => {e.stopPropagation(); setNewFriend(true)}}
                        className={"border-2 h-10 lg:h-12 border-accent border-dashed text-accent bg-bg-input " +
                            "rounded-2xl hover:text-bg-input hover:bg-accent transition duration-150 ease-out hover:ease-in w-full lg:w-3/4 text-sm lg:text-base"}>
                    + Dodaj znajomego
                </button>
            </div>
        </div>
    )
}