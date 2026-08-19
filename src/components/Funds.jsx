import {PieChart} from '@mui/x-charts/PieChart';
import FormInput from "./FormInput.jsx";

export default function Funds({activeTrip}) {
    if (activeTrip === null) {
        return null;
    }

    const sum = {
        HOTEL: 0,
        ATTRACTION: 0,
        FOOD: 0,
        OTHER: 0,
    }
    activeTrip.tripItineraries.forEach((item) => {
        sum[item.tripItem.category] += item.price
    })
    const sortedSpends = (activeTrip.tripItineraries.sort((a, b) => b.price - a.price)).slice(0, 3);

    return (
        <div className={"flex flex-col gap-5 justify-center items-center w-full h-full"}>
            <div
                className={"flex p-3 gap-5 h-1/3 bg-bg-funds-card w-11/12 justify-center items-center mt-5 rounded-2xl shadow-md"}>
                <div className={"text-text-main w-1/2"}>
                    <PieChart
                        colors={['blue', 'green', 'orange', 'gray']}
                        series={[
                            {
                                data: [
                                    {id: 0, value: sum.HOTEL, label: 'Nocleg', color: 'blue'},
                                    {id: 1, value: sum.ATTRACTION, label: 'Rozrywka', color: 'green'},
                                    {id: 2, value: 1000, label: 'Jedzenie', color: 'orange'},
                                    {id: 3, value: 200, label: 'Inne', color: 'gray'}
                                ],
                                innerRadius: 30,
                                outerRadius: 100,
                                paddingAngle: 3,
                                cornerRadius: 5,
                            },

                        ]}
                        sx={{
                            '& path': {stroke: 'var(--bg-funds-card)'},
                            '& .MuiChartsLegend-root': {color: 'var(--text-main)'}
                        }}
                        width={300}
                        height={200}
                    />
                </div>
                <div className={"w-1/2 flex flex-col gap-3"}>
                    <div className={"flex justify-center font-bold text-3xl text-text-main pb-5"}>
                        Top 3 wydatków:
                    </div>
                    <div>
                        <ul className={"flex flex-col gap-3"}>
                            {sortedSpends.map((item) => (
                                <li className={"w-full h-12 flex flex-col justify-center items-center"}>
                                    <div
                                        className={"text-text-main font-bold break-words text-xl"}>{item.tripItem.name}</div>
                                    <div className={"text-accent font-bold"}>{item.price + " PLN"}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className={"font-bold text-2xl"}>
                Podział wydatków:
            </div>
            <div className={"h-2/3 bg-bg-funds-card  w-11/12 justify-center rounded-2xl mb-5 shadow-md p-5"}>
                <ul className={"max-h-96 overflow-y-scroll grid grid-cols-2 gap-5 [&::-webkit-scrollbar]:hidden p-3"}>
                    {activeTrip?.tripGroup?.groupUsers.map((member) => (
                        <li key={member.user.email} className={"flex justify-around items-center shadow-md rounded-2xl max-h-16 border border-border-col p-3"}>
                            <div className={"flex gap-2 items-center"}>
                                <div>
                                    <div className={"bg-accent rounded-full p-1 h-10 flex justify-center items-center text-white w-10"}>
                                        {`${member.user.firstName[0]}${member.user.lastName[0]}`}
                                    </div>
                                </div>
                                <div>{member.user.firstName} {member.user.lastName}</div>
                            </div>
                            <div className={"flex gap-3 items-center"}>
                                <div>50%</div>
                                <div className={"w-24"}>
                                    <FormInput placeholder={"Kwota"} min={0} type={"number"} value={"2050"}/>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}