import {useEffect, useState} from 'react';
import {Calendar, Editor, Willow, getEditorItems, registerEditorItem} from "@svar-ui/react-calendar";
import "@svar-ui/react-calendar/all.css"
import {RichSelect} from '@svar-ui/react-core';

registerEditorItem('select', RichSelect)

function toLocalISOString(date) {
    const pad = (n) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export default function DaySchedule({activeTrip, schedules, editSchedule, addSchedule, deleteSchedule}) {
    const [api, setApi] = useState(null);
    const [initialDate] = useState(() => new Date(activeTrip.startDate));
    let options;
    let events;

    useEffect(() => {
        if (!api) return;
        api.intercept("delete-event",
            async (ev) => {
                deleteSchedule({
                    scheduleId: ev.id,
                });
                return true;
        })
        api.intercept("update-event", async (ev) => {
            const originalId = schedules.find((el) => el.id === ev.id)
            if (originalId === undefined) return false;
            editSchedule({
                tripItemId: originalId.tripItem.id,
                startTime: toLocalISOString(ev.event.start),
                endTime: toLocalISOString(ev.event.end),
                scheduleId: ev.id,
            })
            return true;
        })
    }, [api]);

    function handleSave(ev) {
        if ((ev.values.id).includes("temp")) {
            addSchedule({
                tripItemId: ev.values.tripItemId,
                startTime: toLocalISOString(ev.values.start),
                endTime: toLocalISOString(ev.values.end),
            });
        } else {
            const originalId = schedules.find((el) => el.id === ev.values.id)
            if(ev.values.allDay){
                ev.values.start.setHours(6,0,0)
                ev.values.end.setHours(23,59,0);
            }

            editSchedule({
                tripItemId: ev.values.tripItemId ? ev.values.tripItemId : originalId.tripItem.id,
                startTime: toLocalISOString(ev.values.start),
                endTime: toLocalISOString(ev.values.end),
                scheduleId: ev.values.id,
            })
        }
    }

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
    options = activeTrip.tripItineraries.map((item) => (
        {
            id: item.tripItem.id,
            label: item.tripItem.name,
        }
    ))
    const items = [
        ...getEditorItems(),
        {comp: 'select', key: 'tripItemId', label: 'Atrakcje', options: options}
    ]
    const bottomButton = {
        items: [
            {comp: 'spacer'},
            {comp: 'button', text: 'Zapisz', id: 'save'},
        ]
    }
    return (
        <div className={"w-full h-full overflow-hidden p-3 min-h-0 relative z-0"}>
            <div className={"h-full w-full overflow-y-auto "}>
                <Willow>
                    <Calendar init={setApi} events={events} date={initialDate} views={[
                        {
                            id: "week",
                            sections: {
                                timeGrid: {
                                    yScale: {startHour: 6, endHour: 24}
                                }
                            }
                        },
                        {
                            id: "day",
                            sections: {
                                timeGrid: {
                                    yScale: {startHour: 6, endHour: 24}
                                }
                            }
                        },
                        "month"
                    ]}/>
                    {api &&
                        <Editor api={api} items={items} autoSave={false} onSave={handleSave} bottomBar={bottomButton}/>}
                </Willow>
            </div>
        </div>
    )

}