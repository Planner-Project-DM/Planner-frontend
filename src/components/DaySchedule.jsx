import {useState} from 'react';
import { Calendar, Editor, Willow } from "@svar-ui/react-calendar";
import "@svar-ui/react-calendar/all.css"

export default function DaySchedule({activeTrip, schedules}) {
    const [api, setApi] = useState(null);

    let events = []

    if (schedules === null) {
        return;
    } else {
       events = schedules.map((map) => (
           {
               id: map.id,
               start: new Date(map.startTime),
               end: new Date(map.endTime),
               text: map.tripItem.name,
           }
       ))
    }
    if (activeTrip === null) {
        return (<div className={"w-full h-full flex items-center justify-center text-5xl"}>
            Wybierz podróż!
        </div>);
    }
    return (
        <div className={"w-full h-full overflow-hidden p-3"}>
            <div className={"h-full w-full overflow-y-auto"}>
                <Willow>
                    <Calendar init={setApi} events={events} date={new Date(activeTrip.startDate)} view={"month"} />
                    {api && <Editor api={api} />}
                </Willow>
            </div>
        </div>
    )

}