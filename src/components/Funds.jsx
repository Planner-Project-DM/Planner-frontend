import {PieChart} from '@mui/x-charts/PieChart';
import {BarChart} from '@mui/x-charts/BarChart';
import FormInput from "./FormInput.jsx";
import {useState} from "react";

export default function Funds({activeTrip, setMemberBalance, downloadFundsReport}) {
    const [userBalance, setUserBalance] = useState({});
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
        <div className={"flex flex-col gap-5 justify-center items-center w-full h-full overflow-hidden"}>
            <div className={"overflow-y-scroll h-full w-full [&::-webkit-scrollbar]:hidden flex flex-col items-center"}>
                <div
                    className={"flex p-3 gap-5 h-96 bg-bg-funds-card w-11/12 justify-center items-center mt-5 rounded-2xl shadow-md"}>
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
                                '& .MuiChartsLegend-root': {color: 'var(--text-main)',}
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
                <div className={"font-bold text-2xl m-3 text-text-main"}>
                    Podział wydatków:
                </div>
                <div className={"h-114 bg-bg-funds-card  w-11/12 justify-center rounded-2xl mb-5 shadow-md p-5"}>
                    <ul className={"max-h-96 overflow-y-scroll grid grid-cols-2 gap-5 [&::-webkit-scrollbar]:hidden p-3"}>
                        {activeTrip?.tripGroup?.groupUsers.map((member) => (
                            <li key={member.user.email}
                                className={"flex justify-around items-center shadow-md rounded-2xl max-h-16 border border-border-col p-3"}>
                                <div className={"flex gap-2 items-center"}>
                                    <div>
                                        <div
                                            className={"bg-accent rounded-full p-1 h-10 flex justify-center items-center text-white w-10"}>
                                            {`${member.user.firstName[0]}${member.user.lastName[0]}`}
                                        </div>
                                    </div>
                                    <div className={"text-text-main"}>{member.user.firstName} {member.user.lastName}</div>
                                </div>
                                <div className={"flex gap-3 items-center"}>
                                    <div className={"text-text-main"}>{(member.balance / activeTrip.budget * 100).toFixed(1)} %</div>
                                    <div className={"w-24"}>
                                        <FormInput placeholder={member.balance ?? "0"} min={0} type={"number"}
                                                   onChange={e => setUserBalance({
                                                       ...userBalance,
                                                       [member.user.email]: e.target.value
                                                   })}
                                        />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className={"w-full  flex justify-end items-end"}>
                        <button
                            className={"w-36 h-12 border-2 border-green-600 text-white hover:border-green-700 " +
                                "rounded-xl bg-green-500 hover:bg-green-600 transition duration-150 ease-out hover:ease-in"}
                            onClick={() => {
                                const members = activeTrip.tripGroup.groupUsers.map((member) => (
                                    {
                                        email: member.user.email,
                                        role: member.role,
                                        balance: userBalance[member.user.email] ?? member.balance
                                    }
                                ));
                                setMemberBalance(members)
                            }}
                        >Zapisz podział</button>
                    </div>
                </div>
                <div className={"h-114 bg-bg-funds-card  w-11/12 justify-center rounded-2xl mb-5 shadow-md p-5"}>
                    <BarChart
                        dataset={activeTrip.tripGroup.groupUsers.map((user) => (
                            {name: `${user.user.firstName}.${user.user.lastName}. (${user.user.email})`,
                            balance: user.balance}
                        ))}
                        yAxis={[{ scaleType: 'band', dataKey: "name" }]}
                        xAxis={[{ max: activeTrip.budget }]}
                        series={[{ dataKey: 'balance', label: 'Podział procentowy wydatków'}]}
                        layout="horizontal"
                        height={activeTrip.tripGroup.groupUsers.length * 40 + 50}
                        sx={{
                            '& .MuiChartsAxis-tickLabel': { fill: 'var(--text-main) !important' },
                            '& .MuiChartsLegend-root': { color: 'var(--text-main)' }
                        }}
                    />
                </div>
                <div className={"flex flex-1 items-center justify-center mb-5 w-11/12"}>
                    <button className={"w-64 h-12 rounded-xl text-white border-2 text-xl font-bold border-accent-hover bg-accent " +
                        "hover:bg-accent-hover transition duration-150 ease-out hover:ease-in"}
                    onClick={()=> {downloadFundsReport()}}>Pobierz Excel</button>
                </div>
            </div>
        </div>
    )
}