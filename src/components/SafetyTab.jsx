import {useState} from 'react'
import SettingsCard from './SettingsCard'
export default function SafetyTab() {
    const [userInfo, setUserInfo] = useState(
        {
            firstName: 'firstName',
            lastName: 'lastName',
            email: 'email',
            phoneNumber: 'phoneNumber'
        })

    return (
        <>
            <SettingsCard showButton={true} showSelect={false} showInput={true} header={"Zmień imię"} paragraph={"Zmień swoję imie, " +
                "w razie jakiejkolwiek pomyłki."} inputType={"text"} placeholder={"Tymczasowy placeholder"} name={"firstName"} maxLength={25} />
            <SettingsCard showButton={true} showSelect={false} showInput={true} header={"Zmień nazwisko"} paragraph={"Zmień swoję nazwisko, " +
                "w razie jakiejkolwiek pomyłki."} inputType={"text"} placeholder={"Tymczasowy placeholder"} name={"lastName"} maxLength={25} />
            <SettingsCard showButton={true} showSelect={false} showInput={true} header={"Adres e-mail"} paragraph={"Zmień swój adres e-mail."}
                          inputType={"text"} placeholder={"Tymczasowy placeholder"} name={"userMail"} maxLength={40} />
            <SettingsCard showButton={true} showSelect={false} showInput={true} header={"Numer telefonu"} paragraph={"Zmień swój numer telefonu."}
                          inputType={"text"} placeholder={"Tymczasowy placeholder"} name={"phoneNumber"} maxLength={25} />
        </>
    )
}