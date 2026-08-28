import Map from '../components/Map.jsx';
import DaySchedule from '../components/DaySchedule.jsx';
import Summary from '../components/Summary.jsx';
import Funds from '../components/Funds.jsx';
import Stay from '../components/Stay.jsx';
import Weather from '../components/Weather.jsx';
import Notes from '../components/Notes.jsx';


export default function MainBar({activeMark, tripItems, loading, setSelectedTripItem, selectedTripItem,
                                    activeTrip, setItemPrice, removeItemFromTrip, setSnackbar, setMemberBalance,downloadFundsReport, schedules, addSchedule, editSchedule }) {
    if (activeMark === "map") {
        return (
            <Map tripItems={tripItems} loading={loading} setSelectedTripItem={setSelectedTripItem} selectedTripItem={selectedTripItem}/>
        )
    } else if (activeMark === "dayschedule") {
        return (
            <DaySchedule activeTrip={activeTrip} schedules={schedules} addSchedule={addSchedule} editSchedule={editSchedule}/>
        )
    }else if (activeMark === "notes") {
        return (
            <Notes/>
        )
    }else if (activeMark === "funds") {
        return (
            <Funds activeTrip={activeTrip} setSnackbar={setSnackbar} setMemberBalance={setMemberBalance} downloadFundsReport={downloadFundsReport}/>
        )
    }else if (activeMark === "stay") {
        return (
            <Stay activeTrip={activeTrip} setItemPrice={setItemPrice} removeItemFromTrip={removeItemFromTrip}/>
        )
    }else if (activeMark === "weather") {
        return (
            <Weather/>
        )
    }else if (activeMark === "summary") {
        return (
            <Summary/>
        )
    }

}