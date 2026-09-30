import SettingsCard from '../components/SettingsCard.jsx';
import Switch from '@mui/joy/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useState} from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useContext } from 'react';
import { CurrencyContext } from '../api/CurrencyContext.jsx';


export default function GeneralTab({darkMode, isDark}) {
    const [checked, setChecked] = useState({friends: false, schedule: false, group: false, funds: false});
    const currencyCodes = Intl.supportedValuesOf('currency');
    const currencyNames = new Intl.DisplayNames(['pl'], { type: 'currency' });

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
                    <FormControlLabel
                        control={<Switch
                            disabled={false}
                            size="lg"
                            checked={checked.friends}
                            onChange={(e) => setChecked({...checked, friends: e.target.checked})}
                            color="primary"
                            variant={checked.friends ? 'solid' : 'outlined'}
                        />}
                        label={<span className="text-text-main">Znajomi</span>}
                        sx={{ gap: '8px' }}
                    />
                    <FormControlLabel
                        control={<Switch
                            disabled={false}
                            size="lg"
                            checked={checked.schedule}
                            onChange={(e) => setChecked({...checked, schedule: e.target.checked})}
                            color="primary"
                            variant={checked.schedule ? 'solid' : 'outlined'}
                        />}
                        label={<span className="text-text-main">Harmonogram podróży</span>}
                        sx={{ gap: '8px' }}
                    />
                    <FormControlLabel
                        control={<Switch
                            disabled={false}
                            size="lg"
                            checked={checked.group}
                            onChange={(e) => setChecked({...checked, group: e.target.checked})}
                            color="primary"
                            variant={checked.group ? 'solid' : 'outlined'}
                        />}
                        label={<span className="text-text-main">Grupa</span>}
                        sx={{ gap: '8px' }}
                    />
                    <FormControlLabel
                        control={<Switch
                            disabled={false}
                            size="lg"
                            checked={checked.funds}
                            onChange={(e) => setChecked({...checked, funds: e.target.checked})}
                            color="primary"
                            variant={checked.funds ? 'solid' : 'outlined'}
                        />}
                        label={<span className="text-text-main">Fundusze</span>}
                        sx={{ gap: '8px' }}
                    />
                </div>
            </div>
        </>
    )
}