import SettingsCard from './SettingsCard'
import {useState} from "react";
import api from "../api/axios.js";
import ConfirmModal from './ConfirmModal.jsx'

export default function SafetyTab({userInfo, setSnackbar, getUserInfo}) {
    const [tempUsr, setTempUsr] = useState({
        firstName: userInfo?.firstName,
        lastName: userInfo?.lastName,
        email: userInfo?.email,
        phoneNumber: userInfo?.phoneNumber
    })
    const [confirmOpen, setConfirmOpen] = useState(false);
    function handleChange(e) {
        setTempUsr({...tempUsr, [e.target.name]: e.target.value})
    }
    function handleSave(field) {
        if (!tempUsr[field]?.trim()) {
            setSnackbar({open: true, message: 'Pole nie może być puste!', severity: 'warning'});
            return;
        }
        if (field === "email") {
            setConfirmOpen(true);
        } else {
            updateUserInfo(field);
        }
    }
    async function updateUserInfo(field) {
        try {
            const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
            await api.put(`/api/users/${encodeURIComponent(userInfo.email)}`,
                {[field]: tempUsr[field], isActive: userInfo?.isActive},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
            if (field === "email"){
                localStorage.removeItem('userToken');
                sessionStorage.removeItem('userToken');
                window.location.href = "/login"
                return;
            }
            setSnackbar({open: true, message: 'Zaktualizowane informacje.', severity: 'success'});
            getUserInfo();
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Nie udało się zapisać zmian!',
                severity: 'error'
            });
        }
    }

    return (
        <>
            <SettingsCard showButton={true} showSelect={false} showInput={true} header={"Zmień imię"} paragraph={"Zmień swoję imie, " +
                "w razie jakiejkolwiek pomyłki."} inputType={"text"} placeholder={userInfo?.firstName || "Imię"} name={"firstName"} maxLength={25}
                          onChange={handleChange} onClick={() => handleSave("firstName")} />
            <SettingsCard showButton={true} showSelect={false} showInput={true} header={"Zmień nazwisko"} paragraph={"Zmień swoję nazwisko, " +
                "w razie jakiejkolwiek pomyłki."} inputType={"text"} placeholder={userInfo?.lastName || "Nazwisko"} name={"lastName"} maxLength={25}
                          onChange={handleChange} onClick={() => handleSave("lastName")} />
            <SettingsCard showButton={true} showSelect={false} showInput={true} header={"Adres e-mail"} paragraph={"Zmień swój adres e-mail."}
                          inputType={"text"} placeholder={userInfo?.email || "E-mail"} name={"email"} maxLength={40}
                          onChange={handleChange} onClick={() => handleSave("email")} />
            <SettingsCard showButton={true} showSelect={false} showInput={true} header={"Numer telefonu"} paragraph={"Zmień swój numer telefonu."}
                          inputType={"text"} placeholder={userInfo?.phoneNumber || "Numer telefonu"} name={"phoneNumber"} maxLength={25}
                          onChange={handleChange} onClick={() => handleSave("phoneNumber")} />
            <ConfirmModal
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={() => {
                    setConfirmOpen(false);
                    updateUserInfo("email");
                }}
                title="Zmienić adres e-mail?"
                text="Po zmianie adresu zostaniesz wylogowany i zalogujesz się już nowym adresem."
                confirmLabel="Zmień"
            />
        </>
    )
}