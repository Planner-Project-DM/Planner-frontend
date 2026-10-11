import SettingsCard from "../components/SettingsCard";
import {useState} from "react";

export default function TripTab({activeTrip, changeTripGroupName, setSnackbar}) {
    const [groupName, setGroupName] = useState("")

    return (
        <>
            {activeTrip ? (
                <>
                    <SettingsCard header={"Nazwa grupy"} paragraph={"Zmień nazwę swojej grupy podróży."}
                                      showButton={true} showInput={true} inputType={"text"} placeholder={"Nazwa grupy"}
                                      name={"tripNameChange"} maxLength={25}
                    onChange={(e) => setGroupName(e.target.value)}
                    onClick={() => {
                        if (groupName.trim() === "") return setSnackbar({
                            open: true,
                            message: 'Upewnij się ze wartość pola jest poprawna!',
                            severity: 'warning'
                        });
                        changeTripGroupName(groupName.trim())
                    }}/>
                </>
            ) : (
                <div className={"w-full h-full flex items-center justify-center bg-bg-funds-card rounded-2xl shadow-lg"}>
                    <p className={"text-text-main text-2xl"}>Wybierz podróż!</p>
                </div>
            )}
        </>
    )
}