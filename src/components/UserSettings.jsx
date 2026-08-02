import { CiSettings } from "react-icons/ci";
import { CgDarkMode } from "react-icons/cg";
import { TiUserDelete } from "react-icons/ti";
import Button from '@mui/material/Button';

export default function UserSettings({setNewFriend, friends, alertOpen, setFriendToDelete, darkMode, isDark}){
    return (
        <div className="bg-bg-card border-2 border-accent border-t-0 text-white rounded-xl absolute text-center w-114 min-h-160
                    right-0 shadow-gray-500 shadow-md border-r-0 rounded-t p-2 font-bold"
        onClick={e => e.stopPropagation()}>
            <div className={"flex text-text-main gap-5 items-center p-3 justify-around"}>
                <p className={"cursor-pointer"} ><CiSettings size={30} />
                </p>
                <p onClick={darkMode} className={"cursor-pointer"}><CgDarkMode size={30} />
                </p>
            </div>
            <hr/>
            <div className={"flex flex-col text-text-main p-3 gap-1"}>
                <p className={"flex flex-col justify-center items-center"}>Znajomi
                <hr className={"w-1/2 border-2 border-accent rounded-2xl"}/></p>
                <ul id={"friendsList"} className={"w-full"}>
                    {(friends || []).map((friend) => (
                        <li className={"flex gap-1 items-center justify-between"} key={friend.id}>
                            <div className={"flex justify-between gap-5"}>
                                <div className={"bg-accent rounded-full p-1 h-10 flex justify-center items-center text-white w-10"}>
                                    {`${friend.name[0]}${friend.surname[0]}`}
                                </div>
                                <div className={"flex flex-col items-start"}>
                                    <div className={"max-w-52 break-words"}>{friend.name} {friend.surname}</div>
                                    <div className={"text-xs text-text-secondary"}>{friend.email}</div>
                                </div>
                            </div>
                            <div className={"flex justify-center items-center"}>
                                <Button onClick={() => { setFriendToDelete(friend.email); alertOpen(); }}
                                        style={isDark? {color: 'white'}: {color:'black'}}><TiUserDelete size={25} />
                                </Button>
                            </div>
                        </li>
                    ))}
                    {(friends || []).length === 0 &&
                        <p className={"font-bold text-2xl flex justify-center items-center"}>Brak znajomych</p>
                    }
                </ul>
            </div>
            <hr />
            <div className="text-text-main p-3 pt-5">
                <button onClick={(e) => {e.stopPropagation(); setNewFriend(true)}}
                    className={"border-2 h-12 border-accent border-dashed text-accent bg-bg-input " +
                    "rounded-2xl hover:text-bg-input hover:bg-accent transition duration-150 ease-out hover:ease-in w-3/4"}>
                    + Dodaj znajomego
                </button>
            </div>
        </div>
    )
}