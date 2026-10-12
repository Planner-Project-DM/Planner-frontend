import {PieChart} from '@mui/x-charts/PieChart';
import {BarChart} from '@mui/x-charts/BarChart';
import FormInput from "./FormInput.jsx";
import {useState, useContext} from "react";
import {CurrencyContext} from '../api/CurrencyContext.jsx';

export default function Funds({activeTrip, setMemberBalance, downloadFundsReport}) {
    const [userBalance, setUserBalance] = useState({});
    const {currency} = useContext(CurrencyContext);
    if (activeTrip === null)
        return (
            <div className={"h-full w-full flex items-center justify-center text-4xl font-bold"}>
                Wybierz podróż!
            </div>
        );

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
            <div
                className={"overflow-y-scroll h-full w-full [&::-webkit-scrollbar]:hidden flex flex-col items-center pb-20 lg:pb-0"}>

                <div
                    className={"flex flex-col lg:flex-row p-3 lg:gap-5 h-auto lg:h-96 bg-bg-funds-card w-11/12 lg:w-11/12 justify-center items-center mt-5 rounded-2xl shadow-md"}>
                    <div className={"text-text-main w-full lg:w-1/2 flex justify-center mb-5 lg:mb-0"}>
                        <div className="w-full flex justify-center max-w-[300px]">
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
                    </div>
                    <div className={"w-full lg:w-1/2 flex flex-col gap-3"}>
                        <div
                            className={"flex justify-center font-bold text-xl lg:text-3xl text-text-main pb-2 lg:pb-5"}>
                            Top 3 wydatków:
                        </div>
                        <div>
                            <ul className={"flex flex-col gap-3"}>
                                {sortedSpends.map((item) => (
                                    <li key={item.tripItem.id}
                                        className={"w-full h-auto lg:h-12 flex flex-col justify-center items-center text-center p-2"}>
                                        <div
                                            className={"text-text-main font-bold break-words text-base lg:text-xl"}>{item.tripItem.name}</div>
                                        <div
                                            className={"text-accent font-bold text-sm lg:text-base"}>{new Intl.NumberFormat('pl-PL', {
                                            style: 'currency',
                                            currency
                                        }).format(item.price || 0)}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={"font-bold text-xl lg:text-2xl m-3 text-text-main text-center"}>
                    Podział wydatków:
                </div>
                <div className={"h-auto lg:h-114 bg-bg-funds-card w-11/12 justify-center rounded-2xl mb-5 shadow-md p-3 lg:p-5"}>
                    <ul className={"max-h-96 overflow-y-scroll grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5 [&::-webkit-scrollbar]:hidden p-1 lg:p-3"}>
                        {activeTrip?.tripGroup?.groupUsers?.map((member) => (
                            <li key={member.user.email}
                                className={"flex flex-col sm:flex-row justify-between items-center sm:items-center shadow-md rounded-2xl h-auto min-h-[4rem] border border-border-col p-3 gap-3 sm:gap-0"}>
                                <div className={"flex gap-2 items-center w-full sm:w-auto"}>
                                    <div>
                                        <div
                                            className={"bg-accent rounded-full p-1 h-10 flex justify-center items-center text-white w-10 shrink-0"}>
                                            {`${member.user.firstName[0]}${member.user.lastName[0]}`}
                                        </div>
                                    </div>
                                    <div
                                        className={"text-text-main font-bold sm:font-normal text-sm sm:text-base truncate"}>{member.user.firstName} {member.user.lastName}</div>
                                </div>
                                <div
                                    className={"flex gap-3 items-center justify-between sm:justify-end w-full sm:w-auto"}>
                                    <div
                                        className={"text-text-main text-sm lg:text-base"}>{(member.balance / activeTrip.budget * 100).toFixed(1)} %
                                    </div>
                                    <div className={"w-24"}>
                                        <FormInput placeholder={member.balance ?? "0"} min={0} type={"number"}
                                                   onChange={e => setUserBalance({
                                                       ...userBalance,
                                                       [member.user.email]: Number(e.target.value)
                                                   })}
                                        />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className={"w-full flex justify-center lg:justify-end items-end mt-4 lg:mt-0"}>
                        <button
                            className={"w-full lg:w-36 h-12 border-2 border-green-600 text-white hover:border-green-700 " +
                                "rounded-xl bg-green-500 hover:bg-green-600 transition duration-150 ease-out hover:ease-in text-sm lg:text-base"}
                            onClick={() => {
                                const members = activeTrip.tripGroup?.groupUsers?.map((member) => (
                                    {
                                        email: member.user.email,
                                        role: member.role,
                                        balance: userBalance[member.user.email] ?? member.balance
                                    }
                                ));
                                setMemberBalance(members)
                            }}
                        >Zapisz podział
                        </button>
                    </div>
                </div>
                <div
                    className={"h-auto min-h-[300px] bg-bg-funds-card w-11/12 justify-center rounded-2xl mb-5 shadow-md p-2 lg:p-5 overflow-x-auto"}>
                    <div className="min-w-[400px]">
                        <BarChart
                            dataset={activeTrip?.tripGroup?.groupUsers?.map((user) => (
                                {
                                    name: `${user?.user.firstName}.${user?.user.lastName}. (${user?.user.email})`,
                                    balance: user?.balance
                                }
                            ))}
                            yAxis={[{scaleType: 'band', dataKey: "name"}]}
                            xAxis={[{max: activeTrip.budget}]}
                            series={[{dataKey: 'balance', label: 'Podział procentowy wydatków'}]}
                            layout="horizontal"
                            height={activeTrip?.tripGroup?.groupUsers?.length * 40 + 50}
                            margin={{left: 100}}
                            sx={{
                                '& .MuiChartsAxis-tickLabel': {fill: 'var(--text-main) !important', fontSize: '0.7rem'},
                                '& .MuiChartsLegend-root': {color: 'var(--text-main)'}
                            }}
                        />
                    </div>
                </div>
                <div className={"flex flex-1 items-center justify-center mb-5 w-11/12"}>
                    <button
                        className={"w-full lg:w-64 h-12 rounded-xl text-white border-2 text-base lg:text-xl font-bold border-accent-hover bg-accent " +
                            "hover:bg-accent-hover transition duration-150 ease-out hover:ease-in"}
                        onClick={() => {
                            downloadFundsReport()
                        }}>Pobierz Excel
                    </button>
                </div>
            </div>
        </div>
    )
}