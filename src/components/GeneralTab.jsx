import {useState} from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {useContext} from 'react';
import {CurrencyContext} from '../api/CurrencyContext.jsx';
import SettingsCard from './SettingsCard.jsx'
import NotificationToggle from './NotificationToggle.jsx'

export default function GeneralTab({darkMode, isDark}) {

    const currencyCodes = Intl.supportedValuesOf('currency');
    const currencyNames = new Intl.DisplayNames(['pl'], {type: 'currency'});
    const [checked, setChecked] = useState({
        generalNotifs: true,
        friends: {
            main: false,
            removed: false,
            request: false,
        },
        schedule: {
            main: false,
            updated: false,
            added: false,
            removed: false,
        },
        group: {
            main: false,
            added: false,
            removed: false,
        },
        funds: false
    });

    function updateChecked(category, field, value) {
        setChecked(prev => {
            const updated = {
                ...prev,
                [category]: {
                    ...prev[category],
                    [field]: value
                }
            };
            if (value) {
                updated.generalNotifs = true;
            }
            return updated;
        });
    }

    function updateCategoryMain(category, fields, value) {
        setChecked(prev => {
            const updated = {
                ...prev,
                [category]: Object.fromEntries(fields.map(f => [f, value]))
            };
            if (value) updated.generalNotifs = true;
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
            <div className={`bg-bg-funds-card rounded-2xl shadow-lg  w-full min-h-36 flex flex-col p-3 flex-shrink-0`}>
                <div className={"flex flex-col"}>
                    <h2 className={"font-bold text-xl text-text-main"}>Powiadomienia</h2>
                    <p className={"text-text-main"}>Dostosuj powiadomienia, które będziesz otrzymywać.</p>
                </div>
                <div className={"w-full flex flex-col gap-3 p-3"}>
                    <NotificationToggle size={"lg"} checkedObj={checked.generalNotifs}
                                        onChange={(e) => {
                                            const value = e.target.checked;
                                            setChecked({
                                                generalNotifs: value,
                                                friends: {main: value, removed: value, request: value},
                                                schedule: {main: value, added: value, updated: value, removed: value},
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
                        <NotificationToggle size={"lg"} checkedObj={checked.friends.main}
                                            disabled={false}
                                            onChange={(e) => updateCategoryMain("friends", ["main", "removed", "request"], e.target.checked)}
                                            label={"Powiadomienia o znajomych"}
                        />
                        <NotificationToggle size={"sm"} checkedObj={checked.friends.request} marginLeft={"20px"}
                                            onChange={(e) => updateChecked("friends", "request", e.target.checked)}
                                            label={"Nowe zaproszenia do grona znajomych"}
                                            disabled={!checked.friends.main}
                        />
                        <NotificationToggle size={"sm"} checkedObj={checked.friends.removed} marginLeft={"20px"}
                                            onChange={(e) => updateChecked("friends", "removed", e.target.checked)}
                                            label={"Usunięcia ze znajomych"}
                                            disabled={!checked.friends.main}
                        />
                        <div className={"w-full flex items-center justify-start m-1"}>
                            <hr className={"w-2/4 h-1 border-2 border-border-col"}/>
                        </div>
                        <NotificationToggle size={"lg"} checkedObj={checked.schedule.main}
                                            disabled={false}
                                            onChange={(e) => updateCategoryMain("schedule", ["main", "added", "updated", "removed"], e.target.checked)}
                                            label={"Powiadomienia harmonogramu"}
                        />
                        <NotificationToggle size={"sm"} checkedObj={checked.schedule.added} marginLeft={"20px"}
                                            onChange={(e) => updateChecked("schedule", "added", e.target.checked)}
                                            label={"Dodane wydarzenia"}
                                            disabled={!checked.schedule.main}
                        />
                        <NotificationToggle size={"sm"} checkedObj={checked.schedule.updated} marginLeft={"20px"}
                                            onChange={(e) => updateChecked("schedule", "updated", e.target.checked)}
                                            label={"Zaktualizowanie wydarzenia"}
                                            disabled={!checked.schedule.main}
                        />
                        <NotificationToggle size={"sm"} checkedObj={checked.schedule.removed} marginLeft={"20px"}
                                            onChange={(e) => updateChecked("schedule", "removed", e.target.checked)}
                                            label={"Usunięcie wydarzenia"}
                                            disabled={!checked.schedule.main}
                        />
                        <div className={"w-full flex items-center justify-start m-1"}>
                            <hr className={"w-2/4 h-1 border-2 border-border-col"}/>
                        </div>
                        <NotificationToggle size={"lg"} checkedObj={checked.group.main}
                                            disabled={false}
                                            onChange={(e) => updateCategoryMain("group", ["main", "added", "removed"], e.target.checked)}
                                            label={"Powiadomienia grupy"}
                        />
                        <NotificationToggle size={"sm"} checkedObj={checked.group.added} marginLeft={"20px"}
                                            onChange={(e) => updateChecked("group", "added", e.target.checked)}
                                            label={"Dodanie członka grupy"}
                                            disabled={!checked.group.main}
                        />
                        <NotificationToggle size={"sm"} checkedObj={checked.group.removed} marginLeft={"20px"}
                                            onChange={(e) => updateChecked("group", "removed", e.target.checked)}
                                            label={"Usunięcie członka grupy"}
                                            disabled={!checked.group.main}
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
                                                generalNotifs: value ? true : prev.generalNotifs
                                            }));
                                        }}
                                        label={"Aktualizacja kosztów podróży"}
                    />
                </div>
            </div>
        </>
    )
}