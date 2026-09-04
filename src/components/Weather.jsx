import {useEffect, useState} from "react";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/pl';
import FormInput from '../components/FormInput.jsx';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

export default function Weather({getWeather, weatherData, setWeatherData, activeTrip}) {
    const [weatherForm, setWeatherForm] = useState({
        city: "",
        startDate: null,
        endDate: null
    });

    return (
        <div
            className={"flex p-3 gap-5 h-full bg-bg-funds-card w-full justify-center  items-center mt-5 rounded-2xl shadow-md"}>
            <div>
                <FormInput type={"text"} label={"Lokalizacja"} placeholder={"L. Podróży"}
                           onChange={(e) => setWeatherForm({...weatherForm, city: e.target.value})}/>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
                    <DatePicker
                        label="Wybierz datę początkową"
                        value={weatherForm.startDate}
                        sx={{
                            '& .MuiInputBase-input': {color: 'var(--text-main)'},
                            '& .MuiInputLabel-root': {color: 'var(--text-main)'},
                            '& .MuiSvgIcon-root': {color: 'var(--text-main)'},
                            '& .MuiOutlinedInput-notchedOutline': {borderColor: 'var(--border)'}
                        }}
                        onChange={(newValue) => setWeatherForm({...weatherForm, startDate: newValue})}
                        disablePast
                    />
                    <DatePicker
                        label="Wybierz datę końcową"
                        value={weatherForm.endDate}
                        sx={{
                            '& .MuiInputBase-input': {color: 'var(--text-main)'},
                            '& .MuiInputLabel-root': {color: 'var(--text-main)'},
                            '& .MuiSvgIcon-root': {color: 'var(--text-main)'},
                            '& .MuiOutlinedInput-notchedOutline': {borderColor: 'var(--border)'}
                        }}
                        onChange={(newValue) => setWeatherForm({...weatherForm, endDate: newValue})}
                        disablePast
                    />
                </LocalizationProvider>
            </div>

            <div>

            </div>

            <div>

            </div>
        </div>
    );
}