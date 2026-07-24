import {useState, useEffect} from 'react';
import Map from '../components/Map.jsx';
import DaySchedule from '../components/DaySchedule.jsx';
import Summary from '../components/Summary.jsx';
import Funds from '../components/Funds.jsx';
import Stay from '../components/Stay.jsx';
import Weather from '../components/Weather.jsx';
import Notes from '../components/Notes.jsx';


export default function MainBar({activeMark, hotels, loading, setSelectedHotel, selectedHotel}) {
    if (activeMark === "map") {
        return (
            <Map hotels={hotels} loading={loading} setSelectedHotel={setSelectedHotel} selectedHotel={selectedHotel}/>
        )
    } else if (activeMark === "dayschedule") {
        return (
            <DaySchedule/>
        )
    }else if (activeMark === "notes") {
        return (
            <Notes/>
        )
    }else if (activeMark === "funds") {
        return (
            <Funds/>
        )
    }else if (activeMark === "stay") {
        return (
            <Stay/>
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