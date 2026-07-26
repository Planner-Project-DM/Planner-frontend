import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { MdBlock } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
export default function UserNotifications({pendingFriends}){
    return (
        <div className="bg-bg-card border-2 border-accent border-t-0 text-white rounded-xl absolute text-center w-80 min-h-114
                    right-20 shadow-gray-500 shadow-md  rounded-t-0"
        onClick={e => e.stopPropagation()}>
            <ul className={"overflow-y-scroll [&::-webkit-scrollbar]:hidden h-114 p-5 flex flex-col gap-5 mt-2 w-full"}>
                {pendingFriends.map((request) => (
                    <li key={request.id} className={"p-3 min-h-28 items-start flex flex-col border-2 rounded-2xl justify-between bg-bg-input text-text-main border-border-col"}>
                        <div className={"flex flex-col w-full items-start"}>
                            <div className={"font-bold text-lg w-full flex justify-between"}><div>{request.name} {request.surname}</div><p><FaUserFriends /></p></div>
                            <div className={"text-sm w-full flex items-start"}>{request.email}</div>
                        </div>
                        <div className={"flex justify-around w-full"}>
                            <button>
                                <IoMdCheckmark size={25} style={{color:'green'}} />
                            </button>
                            <button>
                                <FaXmark size={25} style={{color:'red'}}/>
                            </button>
                            <button>
                                <MdBlock size={25}/>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}