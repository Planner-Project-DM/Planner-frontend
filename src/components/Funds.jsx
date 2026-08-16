import { PieChart } from '@mui/x-charts/PieChart';

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
    const sortedSpends = (activeTrip.tripItineraries.sort((a,b) => b.price - a.price)).slice(0, 3);

    return (
        <div className={"flex flex-col gap-5 justify-center"}>
            <div className={"flex p-5 gap-5 h-1/3 pt-10 bg-bg-funds-card w-11/12 justify-center"}>
                <div className={"text-text-main w-1/2"}>
                <PieChart
                    colors={['blue', 'green', 'orange', 'gray']}
                    series={[
                        {
                            data: [
                                { id: 0, value: sum.HOTEL, label: 'Nocleg', color: 'blue'},
                                { id: 1, value: sum.ATTRACTION, label: 'Rozrywka', color: 'green' },
                                { id: 2, value: 1000, label: 'Jedzenie', color: 'orange' },
                                { id: 3, value: 200, label: 'Inne', color: 'gray'}
                            ],
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 3,
                            cornerRadius: 5,
                        },
                    ]}
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
                                <div className={"text-text-main font-bold break-words text-xl"}>{item.tripItem.name}</div>
                                <div className={"text-accent font-bold"}>{item.price + " PLN"}</div>
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className={"h-2/3 bg-bg-funds-card  w-11/12 justify-center"}>
                    TEST
            </div>
        </div>
    )
}