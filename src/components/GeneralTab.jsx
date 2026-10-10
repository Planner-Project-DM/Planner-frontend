import {useState} from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {useContext} from 'react';
import {CurrencyContext} from '../api/CurrencyContext.jsx';
import SettingsCard from './SettingsCard.jsx'
import NotificationToggle from './NotificationToggle.jsx'
import api from "../api/axios.js";

export default function GeneralTab({darkMode, isDark, userSettings, getUserSettings, setSnackbar}) {

    const currencyCodes = Intl.supportedValuesOf('currency');
    const currencyNames = new Intl.DisplayNames(['pl'], {type: 'currency'});
    const [newBudget, setNewBudget] = useState(0);

    async function updateBasicBudget () {
        if (newBudget <= 0) return setSnackbar({
            open: true,
            message: 'Podaj kwotę większą od zera!',
            severity: 'warning'
        });
        try {
            const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
            await api.put(`/api/users/settings`,
                {
                    ...userSettings,
                    isNotificationsEnabled: userSettings.notificationEnabled,
                    budgetLimit: newBudget,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
            setSnackbar({open: true, message: 'Pomyślnie zmieniono budżet.', severity: 'success'});
            getUserSettings();
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Coś poszło nie tak!',
                severity: 'error'
            });
        }
    }
    const [checked, setChecked] = useState({
        friends: {
            request: userSettings.notifyFriendshipRequest,
            removed: userSettings.notifyFriendshipRemoved,
        },
        schedule: {
            updated: userSettings.notifyScheduleItemUpdated,
            added: userSettings.notifyScheduleItemAdded,
            removed: userSettings.notifyScheduleItemDeleted,
        },
        group: {
            added: userSettings.notifyGroupMemberAdded,
            removed: userSettings.notifyGroupMemberRemoved,
        },
        funds: userSettings.notifyFundItemCostUpdated
    });
    async function updateNotifications () {
        try {
            const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
            await api.put(`/api/users/settings`,
                {
                    ...userSettings,
                    isNotificationsEnabled: userSettings.notificationEnabled,
                    notifyFriendshipRequest: checked.friends.request,
                    notifyFriendshipRemoved: checked.friends.removed,
                    notifyScheduleItemAdded: checked.schedule.added,
                    notifyScheduleItemUpdated: checked.schedule.updated,
                    notifyScheduleItemDeleted: checked.schedule.removed,
                    notifyGroupMemberAdded: checked.group.added,
                    notifyGroupMemberRemoved: checked.group.removed,
                    notifyFundItemCostUpdated: checked.funds
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
            setSnackbar({open: true, message: 'Zapisano ustawienia powiadomień.', severity: 'success'});
            getUserSettings();
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Coś poszło nie tak!',
                severity: 'error'
            });
        }
    }

    function updateChecked(category, field, value) {
        setChecked(prev => {
            const updated = {
                ...prev,
                [category]: {
                    ...prev[category],
                    [field]: value
                }
            };
            return updated;
        });
    }

    function updateCategoryMain(category, fields, value) {
        setChecked(prev => {
            const updated = {
                ...prev,
                [category]: Object.fromEntries(fields.map(f => [f, value]))
            };
            return updated;
        });
    }

    const currencyOptions = currencyCodes.map(code => ({
        value: code,
        label: `${code} — ${currencyNames.of(code)}`
    }));
    const {currency, setCurrency} = useContext(CurrencyContext);

    function changeTheme(e) {
        if (e.target.value === "light") {
            darkMode(false)
        } else {
            darkMode(true)
        }
    }

    return (
        <>
            <div className={`bg-bg-funds-card rounded-2xl shadow-lg  w-full min-h-36 flex flex-col gap-5 p-3`}>
                <div className={"flex flex-col"}>
                    <h2 className={"font-bold text-xl text-text-main"}>Waluta</h2>
                    <p className={"text-text-main"}>Wybierz walutę, w której chcesz widzieć kwoty na stronie.</p>
                </div>
                <div className={"w-full flex justify-between"}>
                    <div className={"w-full mr-5"}>
                        <Autocomplete
                            options={currencyOptions}
                            value={currencyOptions.find(e => e.value === currency)}
                            getOptionLabel={(option) => option.label}
                            onChange={(event, newValue) => {
                                if (newValue) setCurrency(newValue?.value);
                            }}
                            renderInput={(params) => <TextField {...params} label="Waluta"/>}
                        />
                    </div>
                </div>
            </div>
            <SettingsCard header={"Język"} paragraph={"Wybierz swój preferowany język."}
                          options={[{
                              value: "pl",
                              label: "Polski"
                          },
                              {
                                  value: "eng",
                                  label: "English"
                              }]}
                          showButton={true} showSelect={true} showInput={false}
            />
            <SettingsCard header={"Motyw"} paragraph={"Dostosuj wygląd strony, wybierając jasny lub ciemny motyw."}
                          options={[{
                              value: "light",
                              label: "Jasny"
                          },
                              {
                                  value: "dark",
                                  label: "Ciemny"
                              }]}
                          showButton={false} showSelect={true} showInput={false}
                          selectValue={isDark ? "dark" : "light"}
                          onChange={changeTheme}
            />

            <SettingsCard header={"Budżet podstawowy"} paragraph={"Ta kwota będzie podpowiadana przy tworzeniu nowej podróży."} showSelect={false}
                          showButton={true} showInput={true} inputType={"number"} placeholder={userSettings.budgetLimit}
                          min={0} name={"userBasicBudget"}
                          onChange={(e) => setNewBudget(Number(e.target.value))}
                          onClick={() => updateBasicBudget()}/>

            <div className={`bg-bg-funds-card rounded-2xl shadow-lg  w-full min-h-36 flex flex-col p-3 flex-shrink-0`}>
                <div className={"flex flex-col"}>
                    <h2 className={"font-bold text-xl text-text-main"}>Powiadomienia</h2>
                    <p className={"text-text-main"}>Dostosuj powiadomienia, które będziesz otrzymywać.</p>
                </div>
                <div className={"w-full flex flex-col gap-3 p-3"}>
                    <NotificationToggle size={"lg"} checkedObj={[...Object.values(checked.friends), ...Object.values(checked.schedule),
                        ...Object.values(checked.group), checked.funds].some(Boolean)}
                                        onChange={(e) => {
                                            const value = e.target.checked;
                                            setChecked({
                                                friends: {removed: value, request: value},
                                                schedule: {added: value, updated: value, removed: value},
                                                group: {added: value, removed: value},
                                                funds: value
                                            });
                                        }}
                                        label={"Wszystkie powiadomienia"}
                    />
                    <div className={"w-full flex items-center justify-start m-1"}>
                        <hr className={"w-2/4 h-1 border-2 border-border-col"}/>
                    </div>
                    <div className={"flex flex-col gap-1"}>
                        <NotificationToggle size={"lg"} checkedObj={Object.values(checked.friends).some(Boolean)}
                                            disabled={false}
                                            onChange={(e) => updateCategoryMain("friends", ["removed", "request"], e.target.checked)}
                                            label={"Powiadomienia o znajomych"}
                        />
                        <NotificationToggle size={"sm"} checkedObj={checked.friends.request} marginLeft={"20px"}
                                            onChange={(e) => updateChecked("friends", "request", e.target.checked)}
                                            label={"Nowe zaproszenia do grona znajomych"}
                        />
                        <NotificationToggle size={"sm"} checkedObj={checked.friends.removed} marginLeft={"20px"}
                                            onChange={(e) => updateChecked("friends", "removed", e.target.checked)}
                                            label={"Usunięcia ze znajomych"}
                        />
                        <div className={"w-full flex items-center justify-start m-1"}>
                            <hr className={"w-2/4 h-1 border-2 border-border-col"}/>
                        </div>
                        <NotificationToggle size={"lg"} checkedObj={Object.values(checked.schedule).some(Boolean)}
                                            disabled={false}
                                            onChange={(e) => updateCategoryMain("schedule", ["added", "updated", "removed"], e.target.checked)}
                                            label={"Powiadomienia harmonogramu"}
                        />
                        <NotificationToggle size={"sm"} checkedObj={checked.schedule.added} marginLeft={"20px"}
                                            onChange={(e) => updateChecked("schedule", "added", e.target.checked)}
                                            label={"Dodane wydarzenia"}
                        />
                        <NotificationToggle size={"sm"} checkedObj={checked.schedule.updated} marginLeft={"20px"}
                                            onChange={(e) => updateChecked("schedule", "updated", e.target.checked)}
                                            label={"Zaktualizowanie wydarzenia"}
                        />
                        <NotificationToggle size={"sm"} checkedObj={checked.schedule.removed} marginLeft={"20px"}
                                            onChange={(e) => updateChecked("schedule", "removed", e.target.checked)}
                                            label={"Usunięcie wydarzenia"}
                        />
                        <div className={"w-full flex items-center justify-start m-1"}>
                            <hr className={"w-2/4 h-1 border-2 border-border-col"}/>
                        </div>
                        <NotificationToggle size={"lg"} checkedObj={Object.values(checked.group).some(Boolean)}
                                            disabled={false}
                                            onChange={(e) => updateCategoryMain("group", ["added", "removed"], e.target.checked)}
                                            label={"Powiadomienia grupy"}
                        />
                        <NotificationToggle size={"sm"} checkedObj={checked.group.added} marginLeft={"20px"}
                                            onChange={(e) => updateChecked("group", "added", e.target.checked)}
                                            label={"Dodanie członka grupy"}
                        />
                        <NotificationToggle size={"sm"} checkedObj={checked.group.removed} marginLeft={"20px"}
                                            onChange={(e) => updateChecked("group", "removed", e.target.checked)}
                                            label={"Usunięcie członka grupy"}
                        />
                    </div>
                    <div className={"w-full flex items-center justify-start m-1"}>
                        <hr className={"w-2/4 h-1 border-2 border-border-col"}/>
                    </div>
                    <NotificationToggle size={"lg"} checkedObj={checked.funds}
                                        disabled={false}
                                        onChange={(e) => {
                                            const value = e.target.checked;
                                            setChecked(prev => ({
                                                ...prev,
                                                funds: value,
                                            }));
                                        }}
                                        label={"Aktualizacja kosztów podróży"}
                    />
                    <div className="w-full flex justify-end">
                        <button className={"w-24 h-12 border-2 border-green-600 text-white hover:border-green-700 " +
                            "rounded-xl bg-green-500 hover:bg-green-600 transition duration-150 ease-out hover:ease-in"}
                                onClick={() => updateNotifications()}>Zapisz
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}