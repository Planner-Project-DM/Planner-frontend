// import {useState} from 'react';

export default function RegisterScreen() {

    return (
        <div className={"flex flex-row font-playpen"}>
            <div id="registerSide" className={"bg-[url('/loginScreen.png')] bg-cover w-full h-screen"}>
                <div id="registerCover" className="bg-primary backdrop-blur-sm  bg-black/60 h-full">
                    <div id="aboutSection" className={"flex p-12 w-full"}>
                        <div id="registerAbout" className={" w-full"}>
                            <div id="registerTitle" className={"text-white mt-12 font-semibold "}>PLANER PODRÓŻY - REJESTRACJA</div>
                            <div id="registerText" className={"text-white font-bold text-8xl mt-5 "}>Zaplanuj <br/> <i className={"text-yellow-500"}>podróż</i> życia</div>
                            <div id="registerDesc"><p className={"text-white font-semibold text-2xl mt-10"}>Twórz trasy, śledź rezerwacje i odkrywaj <br/>
                            miejsca, o których jeszcze nie wiesz, że <br/>
                                chcesz odwiedzić.</p>
                            </div>
                        </div>
                        <div id="regLogPhoto" className={"w-1/2 flex items-center justify-center"}>
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
            <div id={'registerMain'} className="bg-bg-main w-1/2 h-screen">
                    <div id='registerCard' className="flex flex-col p-8 bg-cyan-900 w-full h-full">
                        <p className="flex text-3xl font-bold text-[#FFFFFF] flex-col items-center justify-center">
                            Rejestracja
                        </p>
                        <form id="registerForm" className={"flex flex-col text-white gap-5"}>
                            <div id="registerUInfo" className={"flex gap-5"}>
                                <input type="text" id="registerFName" placeholder="Imię" className={"w-1/2"}/>
                                <input type="text" id="registerLName" placeholder="Nazwisko" className={"w-1/2"}/>
                            </div>
                            <input type="text" id="registerMail" placeholder="Adres E-mail"/>
                            <input type="password" id="registerPswd" placeholder="Hasło (Minimum 8 znaków)"/>
                            <div id="registerQSection" className={"flex flex-col mt-10"}>
                                <div id="remember" className={"flex items-center gap-2"}>
                                    <div id="rememberCheck" className={"flex items-center"}>
                                        <input type="checkbox" id="registerRemember"/>
                                    </div>
                                    <label htmlFor="registerRemember">Zapamiętaj mnie</label>
                                </div>
                                <button type={"submit"} className={"bg-accent hover:bg-accent-hover b rounded-2xl h-12 font-bold text-xl"}>Zarejestruj</button>
                            </div>
                        </form>
                        <hr className={"mt-12 border-2 rounded-2xl"}/>
                        <div id="registerFooter" className={"flex items-center justify-center flex-col gap-5 mt-12"}>
                            <button id="registerGoogle" className={"bg-white hover:bg-gray-300 min-h-12 w-full rounded-2xl flex items-center justify-center gap-3"}>
                                <img src="/LogoGoogleIcon.avif" alt="Google Logo" className={"h-10"}/>
                                <p className={"font-semibold"}>Kontynuuj przez konto Google</p>
                            </button>
                        </div>
                            <button id="registerAccQ" className={"text-white mt-20 font-bold flex items-center justify-center"}>Masz już konto?
                                <p className={"ml-2 text-accent"}>Zaloguj się</p>
                            </button>
                    </div>
            </div>
        </div>
    );
}