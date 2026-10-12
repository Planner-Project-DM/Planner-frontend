import FormInput from "./FormInput.jsx";
import {useState} from "react";
import api from "../api/axios.js";
export default function GroupAdd ({closeGroupForm, setSnackbar, groupName, activeTrip, refreshActiveTrip}) {
    const [groupForm, setGroupForm] = useState({
        email: ""
    })
    async function addToGroup(){
        try {
            const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');

            await api.post(`/api/trips/${activeTrip.id}/group/members`,
                {
                    name: groupName,
                    email: groupForm.email
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
            setSnackbar({open: true, message: 'Dodano znajomego do grupy', severity: 'success' });
            refreshActiveTrip();
            closeGroupForm()
        }
        catch (error) {
            setSnackbar({ open: true, message: error.response?.data?.message || 'Coś poszło nie tak!', severity: 'error' });
        }
    }

    return (
        <div className="w-screen h-screen absolute bg-gray-800/80 top-0 left-0"  onClick={(e) => e.stopPropagation()}>
            <div
                className="bg-bg-card border-2 border-accent rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2
                         -translate-y-1/2 shadow-gray-500 shadow-md flex flex-col w-11/12 sm:w-144 p-5 sm:p-7 justify-between h-auto min-h-[280px] sm:h-1/3 gap-6 sm:gap-0">
                <div className={"flex justify-between items-center"}>
                    <p className={"font-bold text-xl sm:text-2xl text-text-main"}>Dodaj do grupy</p>
                    <button className={"text-text-main text-2xl"} onClick={(e) => {e.stopPropagation(); closeGroupForm();}} >✕</button>
                </div>
                <div className={"w-full"}>
                    <FormInput label="Email znajomego" id="friendMail" placeholder="np. jan@gmail.com"  maxLength={30} value={groupForm.email}
                               onChange={e => setGroupForm({...groupForm, email: e.target.value})}/>
                </div>
                <hr className={"my-2 sm:my-0"}/>
                <div className={"flex flex-col-reverse sm:flex-row items-center justify-end gap-3 sm:gap-5"}>
                    <button onClick={(e) => {e.stopPropagation(); closeGroupForm();}}
                            className={"bg-gray-400 border border-border-col w-full sm:w-24 h-10 rounded-xl " +
                                "hover:bg-gray-600 hover:text-white transition duration-150 ease-out hover:ease-in"}>Anuluj</button>
                    <button onClick={addToGroup}
                            className={"bg-accent border border-border-col w-full sm:w-40 h-10 rounded-xl " +
                                "hover:bg-accent-hover hover:text-white transition duration-150 ease-out hover:ease-in"}>Dodaj</button>
                </div>
            </div>
        </div>
    )
}