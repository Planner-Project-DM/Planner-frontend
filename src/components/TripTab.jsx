import SettingsCard from "../components/SettingsCard";
import {useState} from "react";
import 'dayjs/locale/pl';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";

export default function TripTab({activeTrip, changeTripGroupName, setSnackbar, updateTripInformation}) {
    const [groupName, setGroupName] = useState("")
    const [tripInfo, setTripInfo] = useState({
        name: activeTrip?.name,
        destination: activeTrip?.destination,
        budget: activeTrip?.budget,
        startDate: activeTrip?.startDate ? dayjs(activeTrip.startDate) : null,
        endDate: activeTrip?.endDate ? dayjs(activeTrip.endDate) : null
    })
    const pickerSx = {
        '& .MuiInputBase-input': { color: 'var(--text-main)' },
        '& .MuiInputLabel-root': { color: 'var(--text-main)' },
        '& .MuiInputLabel-root.Mui-focused': { color: 'var(--text-main)' },
        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border-col)' },
        '& .MuiSvgIcon-root': { color: 'var(--text-main)' },
        '& .MuiPickersInputBase-root': { color: 'var(--text-main)' },
        '& .MuiPickersSectionList-root': { color: 'var(--text-main)' },
        '& .MuiPickersInputBase-sectionContent': { color: 'var(--text-main)' },
        '& .MuiPickersInputBase-sectionBefore, & .MuiPickersInputBase-sectionAfter': { color: 'var(--text-main)' },
    }
    const popperSx = {
        '& .MuiPaper-root': { bgcolor: 'var(--bg-input)', color: 'var(--text-main)' },
        '& .MuiPickersDay-root': { color: 'var(--text-main)' },
        '& .MuiDayCalendar-weekDayLabel': { color: 'var(--text-main)' },
        '& .MuiPickersCalendarHeader-root, & .MuiIconButton-root': { color: 'var(--text-main)' },
    };
    return (
        <>
            {activeTrip ? (
                <>
                    <SettingsCard header={"Nazwa podróży"} paragraph={"Zmień nazwę podróży."}
                                  showButton={true} showInput={true} inputType={"text"} placeholder={activeTrip?.name}
                                  name={"tripNameChange"} maxLength={50}
                                  onChange={(e) => setTripInfo({...tripInfo, name: e.target.value})}
                                  onClick={() => {
                                      if (tripInfo?.name?.trim() === "" && tripInfo?.name?.trim() === null) return setSnackbar({
                                          open: true,
                                          message: 'Upewnij się ze wartość pola jest poprawna!',
                                          severity: 'warning'
                                      });
                                      updateTripInformation({key: "name", value: tripInfo?.name?.trim(), note: "Nazwa podróży została zaktualizowana pomyślnie!"});
                                  }}
                    />
                    <SettingsCard header={"Cel podróży"} paragraph={"Jeśli zmieniłeś/aś zdanie, edytuj cel podróży."}
                                  showButton={true} showInput={true} inputType={"text"} placeholder={activeTrip?.destination}
                                  name={"tripDestinationChange"} maxLength={20}
                                  onChange={(e) => setTripInfo({...tripInfo, destination: e.target.value})}
                                  onClick={() => {
                                      if (tripInfo?.destination?.trim() === "") return setSnackbar({
                                          open: true,
                                          message: 'Upewnij się ze wartość pola jest poprawna!',
                                          severity: 'warning'
                                      });
                                      updateTripInformation({key: "destination", value: tripInfo?.destination?.trim(), note: "Cel podróży został zmieniony pomyślnie!"});
                                  }}
                    />
                    <SettingsCard header={"Budżet podróży"} paragraph={"Zmień budżet podróży na tyle ile potrzebujesz."}
                                  showButton={true} showInput={true} inputType={"number"} placeholder={activeTrip?.budget}
                                  name={"tripBudgetChange"} min={0}
                                  onChange={(e) => setTripInfo({...tripInfo, budget: e.target.value})}
                                  onClick={() => {
                                      if (tripInfo.budget <= 0) return setSnackbar({
                                          open: true,
                                          message: 'Upewnij się ze wartość pola jest poprawna!',
                                          severity: 'warning'
                                      });
                                      updateTripInformation({key: "budget", value: Number(tripInfo.budget), note: "Budżet został zmieniony pomyślnie!"});
                                  }}
                    />
                    <SettingsCard header={"Nazwa grupy"} paragraph={"Zmień nazwę swojej grupy w podróży."}
                                  showButton={true} showInput={true} inputType={"text"} placeholder={activeTrip?.tripGroup?.name}
                                  name={"tripGroupNameChange"} maxLength={25}
                                  onChange={(e) => setGroupName(e.target.value)}
                                  onClick={() => {
                                      if (groupName.trim() === "") return setSnackbar({
                                          open: true,
                                          message: 'Upewnij się ze wartość pola jest poprawna!',
                                          severity: 'warning'
                                      });
                                      changeTripGroupName(groupName.trim())
                                  }}
                    />
                    <div className={"bg-bg-funds-card rounded-2xl shadow-lg w-full min-h-36 flex flex-col gap-4 lg:gap-5 p-4 lg:p-5 shrink-0"}>
                        <div className={"flex flex-col"}>
                            <h2 className={"font-bold text-lg lg:text-xl text-text-main"}>Daty podróży</h2>
                            <p className={"text-text-main text-sm lg:text-base"}>Zmień datę początku i końca podróży.</p>
                        </div>
                        <div className={"flex flex-col gap-4 sm:gap-5 w-full mt-2 lg:mt-0"}>
                            <div className={"flex flex-col sm:flex-row gap-4 sm:gap-5 w-full"}>
                                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pl">
                                    <DatePicker
                                        className="w-full"
                                        label="Data początkowa"
                                        value={tripInfo.startDate}
                                        sx={pickerSx}
                                        slotProps={{
                                            popper: { sx: popperSx },
                                            mobilePaper: { sx: popperSx },
                                            day: {
                                                sx: { color: 'var(--text-main)' },
                                            },
                                        }}

                                        onChange={(newValue) => setTripInfo({...tripInfo, startDate: newValue})}
                                        disablePast
                                    />
                                    <DatePicker
                                        className="w-full"
                                        label="Data końcowa"
                                        value={tripInfo.endDate}
                                        sx={pickerSx}
                                        slotProps={{
                                            popper: { sx: popperSx },
                                            mobilePaper: { sx: popperSx },
                                            day: {
                                                sx: { color: 'var(--text-main)' },
                                            },
                                        }}
                                        minDate={tripInfo.startDate}
                                        onChange={(newValue) => setTripInfo({...tripInfo, endDate: newValue})}
                                        disablePast
                                    />
                                </LocalizationProvider>
                            </div>
                            <div className={"flex justify-end items-center w-full"}>
                                <button className={"w-full sm:w-24 h-10 lg:h-12 border-2 border-green-600 text-white hover:border-green-700 " +
                                    "rounded-xl bg-green-500 hover:bg-green-600 transition duration-150 ease-out hover:ease-in text-sm lg:text-base"}
                                        onClick={() => {
                                            const {startDate, endDate} = tripInfo;
                                            if (!startDate?.isValid() || !endDate?.isValid() || endDate.isBefore(startDate)) {
                                                return setSnackbar({
                                                    open: true,
                                                    message: 'Sprawdź daty: koniec nie może być przed początkiem!',
                                                    severity: 'warning'
                                                });
                                            }
                                            updateTripInformation({
                                                body: {startDate: startDate.format('YYYY-MM-DD'), endDate: endDate.format('YYYY-MM-DD')},
                                                note: "Daty podróży zostały zmienione pomyślnie!"
                                            });
                                        }}>Zapisz
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div
                    className={"w-full h-full flex items-center justify-center bg-bg-funds-card rounded-2xl shadow-lg p-4 text-center"}>
                    <p className={"text-text-main text-xl lg:text-2xl"}>Wybierz podróż!</p>
                </div>
            )}
        </>
    )
}