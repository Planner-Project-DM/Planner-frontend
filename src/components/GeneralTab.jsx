import {useState} from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useContext } from 'react';
import { CurrencyContext } from '../api/CurrencyContext.jsx';
import SettingsCard from './SettingsCard.jsx'
import NotificationToggle from './NotificationToggle.jsx'

export default function GeneralTab({darkMode, isDark}) {

    const currencyCodes = Intl.supportedValuesOf('currency');
    const currencyNames = new Intl.DisplayNames(['pl'], { type: 'currency' });
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
            added: false,
            removed: false,
        },
        funds: false
    });
    const currencyOptions = currencyCodes.map(code => ({
        value: code,
        label: `${code} — ${currencyNames.of(code)}`
    }));
    const { currency, setCurrency } = useContext(CurrencyContext);
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
                                if(newValue) setCurrency(newValue?.value);
                            }}
                            renderInput={(params) => <TextField {...params} label="Waluta" />}
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
            <div className={`bg-bg-funds-card rounded-2xl shadow-lg  w-full min-h-36 flex flex-col p-3`}>
                <div className={"flex flex-col"}>
                    <h2 className={"font-bold text-xl text-text-main"}>Powiadomienia</h2>
                    <p className={"text-text-main"}>Dostosuj powiadomienia, które będziesz otrzymywać.</p>
                </div>
                <div className={"w-full flex flex-col gap-3 p-3"}>
                    <NotificationToggle size={"lg"} checkedObj={checked.generalNotifs}
                                        onChange={(e) => setChecked({...checked, generalNotifs: e.target.checked})}
                                        label={"Wszystkie powiadomienia"}
                    />
                    <div className={"w-full flex items-center justify-center"}>
                        <hr className={"w-3/4 h-1 border-2 border-border-col m-3"}/>
                    </div>

                </div>
            </div>
        </>
    )
}