import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormInput from "../components/FormInput.jsx";
import 'dayjs/locale/pl';
import {useState} from "react";
import api from '../api/axios.js';

export default function NewTripForm({closeTripForm, getTrips}) {
    const [tripForm, setTripForm] = useState({
        name: "",
        destination: "",
        budget: 0,
        startDate: null,
        endDate: null
    });
    async function sendTrip(){
        try {
            const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
            await api.post('/api/trips', tripForm, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            getTrips();
            closeTripForm();
        } catch(error) {
            console.error(error);
        }
    }
    return(
        <div className="w-screen h-screen absolute bg-gray-800/80 top-0 left-0"  onClick={(e) => e.stopPropagation()}>
            <div
                className="bg-bg-card border-2 border-accent rounded-xl absolute h-2/3 top-1/2 left-1/2 -translate-x-1/2
                         -translate-y-1/2 shadow-gray-500 shadow-md flex flex-col w-144 p-10 gap-7">
                <div className={"flex justify-between"}>
                    <p className={"font-bold text-2xl"}>Nowa podróż</p>
                    <button onClick={(e) => {e.stopPropagation(); closeTripForm();}} >✕</button>
                </div>
                <hr/>
                <div className={"flex flex-col gap-5"}>
                    <FormInput label="Nazwa podróży" id="tripName" placeholder="np. Japonia 2026"  maxLength={40} value={tripForm.name}
                               onChange={(e) => setTripForm({...tripForm, name: e.target.value})}/>
                    <FormInput label="Destynacja" id="tripName" placeholder="np. Japonia" maxLength={20} value={tripForm.destination}
                    onChange={(e) => setTripForm({...tripForm, destination: e.target.value})}/>
                    <FormInput label="Budżet" id="budget" placeholder="Podaj kwotę (PLN)" type="number" max={9999999999} value={tripForm.budget}
                    onChange={(e) => setTripForm({...tripForm, budget: e.target.value})}/>
                </div>
                <div className={"flex gap-5"}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
                        <DatePicker
                            label="Wybierz datę początkową"
                            value={tripForm.startDate}
                            onChange={(newValue) => setTripForm({...tripForm, startDate: newValue})}
                            disablePast
                        />
                        <DatePicker
                            label="Wybierz datę końcową"
                            value={tripForm.endDate}
                            onChange={(newValue) => setTripForm({...tripForm, endDate: newValue})}
                            minDate={tripForm.startDate}
                            disablePast
                        />
                    </LocalizationProvider>
                </div>
                <hr/>
                <div className={"flex items-center justify-end gap-5"}>
                    <button onClick={(e) => {e.stopPropagation(); closeTripForm();}}
                            className={"bg-gray-400 border border-border-col w-24 h-10 rounded-xl " +
                        "hover:bg-gray-600 hover:text-white transition duration-150 ease-out hover:ease-in"}>Anuluj</button>
                    <button onClick={sendTrip} className={"bg-accent border border-border-col w-40 h-10 rounded-xl " +
                        "hover:bg-accent-hover hover:text-white transition duration-150 ease-out hover:ease-in"}>Utwórz podróż</button>
                </div>
            </div>
        </div>
    )
}