import {useState} from 'react';
import axios from 'axios';
export default function RegisterScreen() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false)

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            setErrorMessage('Podaj poprawny adres e-mail.');
            return;
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        if(!passwordRegex.test(password)) {
            setErrorMessage('Hasło musi mieć min. 8 znaków, jedną dużą literę i znak specjalny.');
            return;
        }
        try {
            await axios.post('backend',{
                    firstName: firstName,
                    lastName: lastName,
                    email:email,
                    password:password,
                });
            setSuccess(true);
        } catch (error){
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || "Wystąpił błąd podczas rejestracji.");
            } else {
                setErrorMessage("Brak połączenia z serwerem. Spróbuj ponownie.");
            }
        }
    }
    return (
        <div className={"flex flex-row font-playpen"}>
            <div className={"bg-[url('/loginScreen.png')] bg-cover w-full h-screen"}>
                <div className="bg-primary backdrop-blur-sm  bg-black/60 h-full">
                    <div className={"flex p-12 w-full"}>
                        <div className={" w-full"}>
                            <div className={"text-white mt-12 font-semibold "}>PLANER PODRÓŻY -
                                REJESTRACJA
                            </div>
                            <div className={"text-white font-bold text-8xl mt-5 "}>Zaplanuj <br/> <i
                                className={"text-yellow-500 m-10"}>podróż</i>życia
                            </div>
                            <div><p className={"text-white font-semibold text-xl mt-10"}>Twórz trasy,
                                śledź rezerwacje i odkrywaj <br/>
                                miejsca, o których jeszcze nie wiesz, że <br/>
                                chcesz odwiedzić.</p>
                            </div>
                        </div>
                        <div className={"w-1/2 flex items-center justify-center"}>
                            <img src="/reg_logPhoto.png" alt="Vacation Photo" className={"w-72 mt-5"}/>
                        </div>
                    </div>
                    <div className={"flex justify-center items-center gap-3 mt-10"}>
                        <img src="/airplanePhoto.png" alt="Airplane Photo" className={"w-16"}/>
                        <hr className={"border-2 border-dashed w-9/12"}/>
                        <img src="/esFlag.png" alt="USA Flag" className={"w-12"}/>
                    </div>
                    <div className={"flex items-center pl-16 mt-5"}>
                        <img src="/ticketPhoto.png" alt="Ticket Photo" className={"h-72 max-h-72"}/>
                    </div>
                </div>
            </div>
            <div className="bg-bg-main w-1/2 h-screen">
                <div className="flex flex-col p-8 bg-cyan-900 w-full h-full">
                    <p className="flex text-3xl font-bold text-[#FFFFFF] flex-col items-center justify-center">
                        Rejestracja
                    </p>
                    <form id="registerForm" onSubmit={handleRegister} className={"flex flex-col text-white gap-5" }>
                        <div className={"flex gap-5"}>
                            <input type="text" id="registerFName"
                                   value={firstName}
                                   onChange={e => setFirstName(e.target.value)} placeholder="Imię"
                                   className={"w-1/2"}/>
                            <input type="text" id="registerLName" placeholder="Nazwisko"
                                   value={lastName}
                                   onChange={e => setLastName(e.target.value)}
                                   className={"w-1/2"}/>
                        </div>
                        <input type="email" id="registerMail"
                               value={email}
                               onChange={e => setEmail(e.target.value)}
                               placeholder="Adres E-mail"/>
                        <input type="password" id="registerPswd"
                               value={password}
                               onChange={e => setPassword(e.target.value)}
                               placeholder="Hasło (Minimum 8 znaków)"/>
                        {errorMessage && (
                            <div className="bg-red-500 text-white p-3 rounded-md mb-4 w-full text-center">
                                {errorMessage}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-500 text-white p-3 rounded-md mb-4 w-full text-center">
                                Rejestracja przebiegła pomyślnie! Witaj, {firstName}.
                            </div>
                        )}
                        <div className={"flex flex-col mt-10"}>
                            <div id="remember" className={"flex items-center gap-2"}>
                                <div className={"flex items-center"}>
                                    <input type="checkbox" id="registerRemember"/>
                                </div>
                                <label htmlFor="registerRemember">Zapamiętaj mnie</label>
                            </div>
                            <button type={"submit"}
                                    className={"bg-accent hover:bg-accent-hover b rounded-2xl h-12 font-bold text-xl"}>Zarejestruj
                            </button>
                        </div>
                    </form>
                    <hr className={"mt-12 border-2 rounded-2xl"}/>
                    <div className={"flex items-center justify-center flex-col gap-5 mt-12"}>
                        <button
                            className={"bg-white hover:bg-gray-300 min-h-12 w-full rounded-2xl flex items-center justify-center gap-3"}>
                            <img src="/LogoGoogleIcon.avif" alt="Google Logo" className={"h-10"}/>
                            <p className={"font-semibold"}>Kontynuuj przez konto Google</p>
                        </button>
                    </div>
                    <button className={"text-white mt-20 font-bold flex items-center justify-center"}>Masz już konto?
                        <p className={"ml-2 text-accent"}>Zaloguj się</p>
                    </button>
                </div>
            </div>
        </div>
    );
}