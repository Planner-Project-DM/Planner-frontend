import {useState, useEffect} from "react";
import FormInput from '../components/FormInput.jsx';
import axios from 'axios';

const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;


export default function Weather({activeTrip}) {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [weatherForm, setWeatherForm] = useState({
        city: activeTrip? activeTrip.destination : "Warszawa",
    });
    useEffect(() => {
        handleCheckWeather();
    }, []);

    async function geoCodeCity({city}) {
        const resp = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
        return {
            lat: resp.data[0].lat,
            lon: resp.data[0].lon,
        }
    }

    async function handleCheckWeather() {
        if (!weatherForm.city.trim()) return;

        setIsLoading(true);
        const coords = await geoCodeCity({city: weatherForm.city});

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

        setWeatherData(mappedData);
        setIsLoading(false);
    }
    return (

        <div className={"flex h-full w-full justify-center items-center p-5"}>
            <div className={"flex flex-col h-full bg-bg-funds-card w-full justify-center items-center rounded-2xl shadow-md gap-5"}>
                <div className={"flex gap-3 bg-bg-main w-1/2 shadow-md m-5 h-20 items-center justify-center p-3 rounded-xl"}>
                    <FormInput shadow={"shadow-md"} type={"text"} value={weatherForm.city}
                               onChange={(e) => setWeatherForm({...weatherForm, city: e.target.value})}/>
                    <button
                        className={"w-36 h-12 border-2 border-green-600 text-white hover:border-green-700 " +
                            "rounded-xl bg-green-500 hover:bg-green-600 transition duration-150 ease-out hover:ease-in"}
                        onClick={() => handleCheckWeather()}
                    >Sprawdź pogodę
                    </button>
                </div>
                <div className="mx-auto w-3/4">
                    {isLoading && <p className="text-text-muted font-semibold text-center">Pobieranie danych...</p>}

                    {!isLoading && weatherData && (
                        <div className="rounded-3xl shadow-xl overflow-hidden border border-[var(--border)]">

                            <div className="bg-gradient-to-br from-blue-500 to-blue-400 text-white p-8">
                                <h2 className="text-4xl font-bold tracking-wide capitalize">{weatherForm.city}</h2>
                                <p className="text-white/80 text-sm mt-1 mb-6">Dzisiaj</p>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="text-7xl font-light tracking-tighter">
                                            {weatherData.current.temperature.current}°
                                        </div>
                                        <p className="text-xl mt-3 capitalize font-medium">
                                            {weatherData.current.description}
                                        </p>
                                    </div>
                                    <img
                                        src={`https://openweathermap.org/img/wn/${weatherData.current.icon}@4x.png`}
                                        alt="weather icon"
                                        className="w-32 h-32 drop-shadow-md"
                                    />
                                </div>

                                <div className="mt-8 flex space-x-6 text-sm font-medium">
                                    <p className="bg-white/20 px-4 py-2 rounded-xl">Wiatr: {weatherData.current.wind} km/h</p>
                                    <p className="bg-white/20 px-4 py-2 rounded-xl">Wilgotność: {weatherData.current.humidity}%</p>
                                </div>
                            </div>

                            <div className="bg-bg-funds-card p-6 flex justify-between items-center border-t border-border-col">
                                {weatherData.forecast.map((day, index) => (
                                    <div key={index} className="flex flex-col min-w-24 items-center bg-bg-card border border-border-col p-2 rounded-2xl shadow-sm">
                                        <p className="text-xs font-bold text-text-muted mb-1">
                                            {day.date.slice(5)}
                                        </p>
                                        <img
                                            src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                                            alt="icon"
                                            className="w-12 h-12 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
                                        />
                                        <p className="text-sm font-bold text-[var(--text-main)] mt-1">Maks. {day.temperature.max}°</p>
                                        <p className="text-xs font-medium text-[var(--text-secondary)]">Min. {day.temperature.min}°</p>
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