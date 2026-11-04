import {useState} from "react";
import api from "../api/axios.js";

const emptyForm = {currentPassword: "", newPassword: "", repeatPassword: ""};

export default function PasswordCard({setSnackbar}) {
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    async function changePassword() {
        if (!form.currentPassword || !form.newPassword || !form.repeatPassword) {
            setSnackbar({open: true, message: 'Uzupełnij wszystkie pola!', severity: 'warning'});
            return;
        }
        if (form.newPassword !== form.repeatPassword) {
            setSnackbar({open: true, message: 'Nowe hasła nie są takie same!', severity: 'warning'});
            return;
        }
        if (form.newPassword === form.currentPassword) {
            setSnackbar({open: true, message: 'Nowe hasło musi się różnić od obecnego!', severity: 'warning'});
            return;
        }

        setSaving(true);
        try {
            const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
            await api.put('/api/users/password',
                {currentPassword: form.currentPassword, newPassword: form.newPassword},
                {headers: {'Authorization': `Bearer ${token}`}});
            setSnackbar({open: true, message: 'Hasło zostało zmienione.', severity: 'success'});
            setForm(emptyForm);
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.response?.data?.message || 'Nie udało się zmienić hasła!',
                severity: 'error'
            });
        } finally {
            setSaving(false);
        }
    }

    const inputClass = "w-full rounded-xl h-10 lg:h-12 bg-bg-funds-card text-text-main border-border-col border-2 p-2 text-sm lg:text-base";

    return (
        <div className={"bg-bg-funds-card rounded-2xl shadow-lg w-full h-auto flex flex-col gap-4 lg:gap-5 p-4 lg:p-5 shrink-0"}>
            <div className={"flex flex-col"}>
                <h2 className={"font-bold text-lg lg:text-xl text-text-main"}>Zmień hasło</h2>
                <p className={"text-text-main text-sm lg:text-base"}>Podaj obecne hasło i wybierz nowe.</p>
            </div>
            <div className={"flex flex-col gap-3 lg:grid lg:grid-cols-3 lg:gap-4"}>
                <input className={inputClass} type="password" name="currentPassword" placeholder="Obecne hasło"
                       value={form.currentPassword} onChange={handleChange} autoComplete="current-password"/>
                <input className={inputClass} type="password" name="newPassword" placeholder="Nowe hasło"
                       value={form.newPassword} onChange={handleChange} autoComplete="new-password"/>
                <input className={inputClass} type="password" name="repeatPassword" placeholder="Powtórz nowe hasło"
                       value={form.repeatPassword} onChange={handleChange} autoComplete="new-password"/>
            </div>
            <div className={"flex sm:justify-end"}>
                <button onClick={changePassword} disabled={saving}
                        className={"w-full sm:w-32 h-10 lg:h-12 border-2 border-green-600 text-white hover:border-green-700 " +
                            "rounded-xl bg-green-500 hover:bg-green-600 transition duration-150 ease-out hover:ease-in text-sm lg:text-base shrink-0 " +
                            "disabled:opacity-50 disabled:cursor-not-allowed"}>
                    Zapisz
                </button>
            </div>
        </div>
    )
}