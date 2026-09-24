import SettingsCard from "../components/SettingsCard";

export default function TripTab({activeTrip}) {

    return (
        <>
            <SettingsCard header={"Nazwa grupy"} paragraph={"Zmień nazwę swojej grupy podróży."}
                          showButton={true} showInput={true} inputType={"text"} placeholder={"Nazwa grupy"} name={"tripNameChange"} maxLength={25}/>
            <SettingsCard header={"Budżet"} paragraph={"Zmień budżet podstawowy podróży."}
                          showButton={true} showInput={true} inputType={"number"} placeholder={activeTrip.budget} min={0} name={"tripBudget"}/>
        </>
    )
}