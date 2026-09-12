import {IoMdCheckmark} from "react-icons/io";
import {FaXmark} from "react-icons/fa6";
import {MdBlock} from "react-icons/md";
import {FaUserFriends} from "react-icons/fa";
import { GoRead } from "react-icons/go";
const translations = {
    "Cost of item updated": "Koszt przedmiotu zaktualizowany",
    "Friendship removed": "Usunięto ze znajomych",
    "Trip schedule deleted": "Usunięto wydarzenie z harmonogramu",
    "Schedule updated in trip": "Zaktualizowano wydarzenie w harmonogramie",
    "New schedule added to trip": "Dodano nowe wydarzenie do harmonogramu",
    "Added to group": "Dodano do grupy",
};
function translateNotification(title) {
    if (translations[title]) {
        return translations[title];
    }
    if (title.startsWith("Friendship request from")) {
        const name = title.slice("Friendship request from ".length);
        return `Zaproszenie do znajomych od ${name}`;
    }
    if (title.startsWith("Removed from group")) {
        const groupName = title.slice("Removed from group".length);
        return `Usunięto z grupy ${groupName}`;
    }
    return title;
}

export default function UserNotifications({pendingFriends, acceptFriend, rejectFriend, blockFriend, socketNotif}) {
    const friendsWithType = (pendingFriends || []).map((friend) => ({...friend, type: "friendRequest"}));
    const notifsWithType = socketNotif.map((notif) => ({...notif, type: "notification"}));
    const allNotifications = [...friendsWithType, ...notifsWithType];

    return (
        <div className="bg-bg-card border-2 border-accent border-t-0 text-white rounded-xl absolute text-center w-80 min-h-114
                    right-20 shadow-gray-500 shadow-md  rounded-t-0"
             onClick={e => e.stopPropagation()}>
            <ul className={"overflow-y-scroll [&::-webkit-scrollbar]:hidden h-114 p-5 flex flex-col gap-5 mt-2 w-full"}>
                {(allNotifications || []).map((request) => {
                    if (request.type === "friendRequest") {
                        return (
                            <li key={request.id}
                                className={"p-3 min-h-28 items-start flex flex-col border-2 rounded-2xl justify-between bg-bg-input text-text-main border-border-col"}>
                                <div className={"flex flex-col w-full items-start"}>
                                    <div className={"font-bold text-lg w-full flex justify-between"}>
                                        <div>{request.name} {request.surname}</div>
                                        <p><FaUserFriends/></p></div>
                                    <div className={"text-sm w-full flex items-start"}>{request.email}</div>
                                </div>
                                <div className={"flex justify-around w-full"}>
                                    <button onClick={() => acceptFriend(request.id)}>
                                        <IoMdCheckmark size={25} style={{color: 'green'}}/>
                                    </button>
                                    <button onClick={() => rejectFriend(request.id)}>
                                        <FaXmark size={25} style={{color: 'red'}}/>
                                    </button>
                                    <button onClick={() => blockFriend(request.id)}>
                                        <MdBlock size={25}/>
                                    </button>
                                </div>
                            </li>
                        )
                    } else {
                        return (
                            <li key={request.id} className={"p-3 min-h-28 items-start flex flex-col border-2 rounded-2xl justify-between bg-bg-input text-text-main border-border-col"}>
                                <div className={"flex flex-col w-full items-start"}>
                                    <div className={"font-bold text-lg w-full flex justify-start"}>
                                        <div>{translateNotification(request.title)}</div>
                                    </div>
                                    <div className={"text-sm w-full flex items-start text-left mt-2"}>
                                        {request.message}
                                    </div>
                                </div>
                                <div className={"flex justify-end w-full mt-2"}>
                                    <button className={"flex justify-center items-center bg-gray-600 border border-border-col " +
                                        "hover:bg-gray-500 text-white rounded-xl w-8 h-8 transition duration-150 ease-out hover:ease-in"}>
                                        <GoRead />
                                    </button>
                                </div>
                            </li>
                        )
                    }
                })}
            </ul>
        </div>
    )
}