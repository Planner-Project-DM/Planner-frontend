import {IoMdCheckmark} from "react-icons/io";
import {FaXmark} from "react-icons/fa6";
import {MdBlock} from "react-icons/md";
import {FaUserFriends} from "react-icons/fa";
import {GoRead} from "react-icons/go";
import {MdMarkAsUnread} from "react-icons/md";

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

export default function UserNotifications({pendingFriends, acceptFriend, rejectFriend, blockFriend, socketNotif, markAsRead, markAllAsRead}) {
    const friendsWithType = (pendingFriends || []).map((friend) => ({...friend, type: "friendRequest"}));
    const notifsWithType = socketNotif.map((notif) => ({...notif, type: "notification"}));
    const allNotifications = [...friendsWithType, ...notifsWithType];

    return (
        <div
            className="bg-bg-card border-2 border-accent text-white rounded-xl absolute w-[85vw] sm:w-80 h-[60vh] sm:h-114 left-1/2
            -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:-right-2 lg:right-20 shadow-gray-500 shadow-md flex flex-col overflow-hidden z-50"
            onClick={e => e.stopPropagation()}>
            <div
                className="w-full flex justify-between items-center px-3 lg:px-5 py-2 lg:py-3 border-b border-border-col bg-bg-main/50 shrink-0">
                <h3 className="font-bold text-base lg:text-lg text-text-main">Powiadomienia</h3>
                <button
                    onClick={() => markAllAsRead()}
                    className="flex items-center justify-center p-1.5 lg:p-2 rounded-lg bg-bg-input text-text-main border border-border-col hover:bg-gray-500 hover:text-white transition-colors"
                >
                    <MdMarkAsUnread className="w-5 h-5 lg:w-[20px] lg:h-[20px]"/>
                </button>
            </div>

            <ul className={"overflow-y-auto flex-1 [&::-webkit-scrollbar]:hidden p-2 lg:p-4 flex flex-col gap-3 lg:gap-4 w-full"}>
                {allNotifications?.length > 0 ? (
                    (allNotifications || []).map((request) => {
                        if (request.type === "friendRequest") {
                            return (
                                <li key={request.id}
                                    className={"shrink-0 h-auto p-3 items-start flex flex-col border-2 rounded-2xl justify-between bg-bg-input text-text-main border-border-col gap-2 lg:gap-0"}>
                                    <div className={"flex flex-col w-full items-start"}>
                                        <div className={"font-bold text-base lg:text-lg w-full flex justify-between gap-2"}>
                                            <div className={"break-words"}>{request.name} {request.surname}</div>
                                            <p className="shrink-0"><FaUserFriends/></p></div>
                                        <div className={"text-xs lg:text-sm w-full flex items-start break-words"}>{request.email}</div>
                                    </div>
                                    <div className={"flex justify-around w-full mt-1 lg:mt-2"}>
                                        <button onClick={() => acceptFriend(request.id)} className="p-1">
                                            <IoMdCheckmark className="w-6 h-6 lg:w-[25px] lg:h-[25px]" style={{color: 'green'}}/>
                                        </button>
                                        <button onClick={() => rejectFriend(request.id)} className="p-1">
                                            <FaXmark className="w-5 h-5 lg:w-[25px] lg:h-[25px]" style={{color: 'red'}}/>
                                        </button>
                                        <button onClick={() => blockFriend(request.id)} className="p-1">
                                            <MdBlock className="w-5 h-5 lg:w-[25px] lg:h-[25px]"/>
                                        </button>
                                    </div>
                                </li>
                            )
                        } else {
                            return (
                                <li key={request.id} className={"shrink-0 h-auto p-3 items-start flex flex-col border-2 rounded-2xl justify-between bg-bg-input text-text-main border-border-col"}>
                                    <div className={"flex flex-col w-full items-start"}>
                                        <div className={"font-bold text-base lg:text-lg w-full flex justify-start"}>
                                            <div className={"break-words"}>{translateNotification(request.title)}</div>
                                        </div>
                                        <div className={"text-xs lg:text-sm w-full flex items-start text-left mt-1 lg:mt-2 break-words"}>
                                            {request.message}
                                        </div>
                                    </div>
                                    <div className={"flex justify-end w-full mt-2"}>
                                        <button className={"flex justify-center items-center bg-gray-600 border border-border-col " +
                                            "hover:bg-gray-500 text-white rounded-xl w-8 h-8 transition duration-150 ease-out hover:ease-in"}
                                                onClick={() => markAsRead(request.id)}>
                                            <GoRead className="w-4 h-4 lg:w-auto lg:h-auto" />
                                        </button>
                                    </div>
                                </li>
                            )
                        }
                    })
                ) : (
                    <div
                        className="h-full w-full flex flex-col items-center justify-center text-text-main opacity-70 mt-10">
                        <span className="text-sm font-medium">Brak nowych powiadomień</span>
                    </div>
                )}
            </ul>
        </div>
    )
}