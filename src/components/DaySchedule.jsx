import {useState, useRef} from 'react';
import FilterButtons from '../components/FilterButtons.jsx'

export default function DaySchedule({activeTrip}) {
    const [selectedDay, setSelectedDay] = useState(null);
    const scrollRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [wasDragged, setWasDragged] = useState(false);
    if (activeTrip === null) {
        return (<div className={"w-full h-full flex items-center justify-center text-5xl"}>
            Wybierz podróż!
        </div>);
    }

    const start = new Date(activeTrip.startDate);
    const end = new Date(activeTrip.endDate);
    const date = [];

    while (start <= end) {
        date.push(new Date(start));
        start.setDate(start.getDate() + 1)
    }
    return (
        <div className={"w-full h-full overflow-hidden"}>
            <div className={"overflow-y-scroll flex flex-col justify-center [&::-webkit-scrollbar]:hidden"}>
                <div className={"flex gap-3 w-full overflow-x-auto p-3 [&::-webkit-scrollbar]:hidden"}
                     ref={scrollRef}
                     onMouseDown={(e) => {
                         setWasDragged(false)
                         setIsDragging(true);
                         setStartX(e.pageX);
                         setScrollLeft(scrollRef.current.scrollLeft);
                     }}
                     onMouseMove={(e) => {
                         if(!isDragging){
                             return null;
                         } else {
                             const diff = e.pageX - startX;
                             Math.abs(diff)  > 5 ? setWasDragged(true) : setWasDragged(false);
                             scrollRef.current.scrollLeft = scrollLeft - diff;
                         }
                     }}
                     onMouseUp={() => setIsDragging(false)}
                     onMouseLeave={() => setIsDragging(false)}
                >

                    {date.map((day) => (
                        <FilterButtons
                            onclick={() => {
                                if (wasDragged) return;
                                setSelectedDay(day)
                            }}
                            isActive={selectedDay?.getTime() === day.getTime()}
                            name={day.toLocaleDateString('pl-PL', {weekday: 'short'}) + " " + day.toLocaleDateString('pl-PL', {
                                day: '2-digit',
                                month: '2-digit'
                            })}
                            padding={"pl-2 pr-2"}
                        />
                    ))}
                </div>
            </div>
        </div>
    )

}