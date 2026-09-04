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
        <div className={"flex justify-center items-center"}>
        </div>
    );
}