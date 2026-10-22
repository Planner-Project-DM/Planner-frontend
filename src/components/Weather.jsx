import {useState, useEffect, useMemo} from "react";
import FormInput from '../components/FormInput.jsx';
import axios from 'axios';
import dayjs from "dayjs";

const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;


export default function Weather({activeTrip, setSnackbar}) {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [weatherList, setWeatherList] = useState([]);
    const [selectedDay, setSelectedDay] = useState(dayjs(new Date()).format('YYYY-MM-DD'))

    const [weatherForm, setWeatherForm] = useState({
        city: activeTrip ? activeTrip.destination : "Warszawa",
    });
    useEffect(() => {
        handleCheckWeather();
    }, []);

    async function geoCodeCity({city}) {
        const resp = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
        if (resp.data.length === 0) {
            return null;
        } else {
            return {
                lat: resp.data[0].lat,
                lon: resp.data[0].lon,
            }
        }
    }

    async function handleCheckWeather() {
        if (!weatherForm.city.trim()) return setSnackbar({
            open: true,
            message: 'Pole nie może byc puste!',
            severity: 'warning'
        });

        setIsLoading(true);
        try {
            const coords = await geoCodeCity({city: weatherForm.city});
            if (!coords) return setSnackbar({
                open: true,
                message: 'Upewnij się że wpisane miasto jest poprawne!',
                severity: 'warning'
            });

            const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric&lang=pl`);
            const forecastResp = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric&lang=pl`);

            const dailyForecast = forecastResp.data.list.filter((el) => el.dt_txt.includes("15:00:00"));

            const mappedData = {
                current: {
                    date: 'Dzisiaj',
                    description: resp.data.weather[0].description,
                    icon: resp.data.weather[0].icon,
                    temperature: {
                        current: String(Math.round(resp.data.main.temp)),
                        min: String(Math.round(resp.data.main.temp_min)),
                        max: String(Math.round(resp.data.main.temp_max)),
                    },
                    wind: String(Math.round(resp.data.wind.speed)),
                    humidity: resp.data.main.humidity,
                },
                forecast: dailyForecast.map(el => ({
                    date: el.dt_txt.split(' ')[0],
                    description: el.weather[0].description,
                    icon: el.weather[0].icon,
                    temperature: {
                        min: String(Math.round(el.main.temp_min)),
                        max: String(Math.round(el.main.temp_max)),
                    },
                    wind: String(Math.round(el.wind.speed)),
                    humidity: el.main.humidity,
                }))
            };
            setWeatherList(forecastResp.data.list)
            setWeatherData(mappedData);
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Nie udało się pobrać pogody!',
                severity: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    }

    const hourly = useMemo(() => {
        const hourForecast = weatherList.filter((el) => el.dt_txt.includes(selectedDay))
        const mappedForecast = hourForecast.map((el) => ({
            date: el.dt_txt.split(' ')[1],
            description: el.weather[0].description,
            icon: el.weather[0].icon,
            temperature: {
                current: String(Math.round(el.main.temp)),
            },
        }))
        return mappedForecast;
    }, [weatherList, selectedDay]);
    return (
        <div className={"flex h-full w-full justify-center items-center p-2 lg:p-5 overflow-y-hidden"}>
            <div
                className={"flex flex-col h-full bg-bg-funds-card w-full justify-start lg:justify-center items-center rounded-2xl " +
                    "shadow-md gap-3 lg:gap-5 overflow-y-scroll [&::-webkit-scrollbar]:hidden pb-24 lg:pb-0 pt-2 lg:pt-0"}>
                <div className="mx-auto w-full flex justify-center items-center min-h-full">
                    {isLoading && <p className="text-text-muted font-semibold text-center">Pobieranie danych...</p>}

                    {!isLoading && weatherData && (
                        <div className="rounded-2xl lg:rounded-3xl shadow-xl overflow-hidden border border-border-col w-full lg:w-11/12 my-auto">
                            <div className="bg-gradient-to-br from-blue-500 to-blue-400 text-white p-4 lg:p-5">
                                <div className={"flex flex-col lg:flex-row justify-between gap-4 lg:gap-0"}>
                                    <div>
                                        <h2 className="text-2xl lg:text-4xl font-bold tracking-wide capitalize">{weatherForm.city}</h2>
                                        <p className="text-white/80 text-xs lg:text-sm mt-1 mb-2 lg:mb-6">Dzisiaj</p>
                                    </div>
                                    <div className={"flex flex-col sm:flex-row gap-3 lg:gap-5 items-stretch sm:items-center justify-center w-full lg:w-auto"}>
                                        <div className="w-full sm:w-auto">
                                            <FormInput shadow={"shadow-md"} maxh={"max-h-12"} type={"text"} value={weatherForm.city}
                                                       onChange={(e) => setWeatherForm({
                                                           ...weatherForm,
                                                           city: e.target.value
                                                       })}/>
                                        </div>
                                        <button
                                            className={"w-full sm:w-36 h-12 border-2 border-green-600 text-white hover:border-green-700 " +
                                                "rounded-xl bg-green-500 hover:bg-green-600 transition duration-150 ease-out hover:ease-in shrink-0 text-sm lg:text-base"}
                                            onClick={() => handleCheckWeather()}
                                        >Sprawdź pogodę
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-2 lg:mt-0">
                                    <div>
                                        <div className="text-5xl lg:text-7xl font-light tracking-tighter">
                                            {weatherData.current.temperature.current}°
                                        </div>
                                        <p className="text-lg lg:text-xl mt-1 lg:mt-3 capitalize font-medium">
                                            {weatherData.current.description}
                                        </p>
                                    </div>
                                    <img
                                        src={`https://openweathermap.org/img/wn/${weatherData.current.icon}@4x.png`}
                                        alt="weather icon"
                                        className="w-24 h-24 lg:w-32 lg:h-32 drop-shadow-md"
                                    />
                                </div>
                                <div className="mt-4 lg:mt-8 flex gap-2 lg:gap-6 text-xs lg:text-sm font-medium flex-wrap">
                                    <p className="bg-white/20 px-3 lg:px-4 py-2 rounded-xl">Wiatr: {weatherData.current.wind} km/h</p>
                                    <p className="bg-white/20 px-3 lg:px-4 py-2 rounded-xl">Wilgotność: {weatherData.current.humidity}%</p>
                                </div>
                            </div>
                            <div
                                className="bg-bg-funds-card p-4 lg:p-6 flex justify-start lg:justify-evenly items-center border-t border-border-col gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                                {hourly.map((hour, index) => (
                                    <div key={index}
                                         className="flex flex-col min-w-[5rem] lg:min-w-24 items-center bg-bg-card border border-border-col p-2 rounded-2xl shadow-sm shrink-0">
                                        <p className="text-xs font-bold text-text-muted mb-1">
                                            {hour.date}
                                        </p>
                                        <img
                                            src={`https://openweathermap.org/img/wn/${hour.icon}@2x.png`}
                                            alt="icon"
                                            className="w-10 h-10 lg:w-12 lg:h-12 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
                                        />
                                        <p className="text-sm font-bold text-text-main mt-1">{hour.temperature.current}°</p>
                                    </div>
                                ))}
                            </div>
                            <div
                                className="bg-bg-funds-card p-4 lg:p-6 flex justify-start lg:justify-between items-center border-t border-border-col gap-3 lg:gap-0 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                                {weatherData.forecast.map((day, index) => (
                                    <div key={index}
                                         onClick={() => setSelectedDay(day.date)}
                                         className="flex flex-col min-w-[7rem] lg:min-w-36 items-center bg-bg-card border border-border-col p-2 rounded-2xl shadow-sm cursor-pointer hover:bg-bg-main shrink-0">
                                        <p className="text-xs font-bold text-text-muted mb-1">
                                            {day.date.slice(5)}
                                        </p>
                                        <img
                                            src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                                            alt="icon"
                                            className="w-10 h-10 lg:w-12 lg:h-12 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
                                        />
                                        <p className="text-xs lg:text-sm font-bold text-text-main mt-1">Maks. {day.temperature.max}°</p>
                                        <p className="text-[10px] lg:text-xs font-medium text-text-secondary">Min. {day.temperature.min}°</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}