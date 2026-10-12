export default function SettingsCard({header, paragraph, showButton, options, onClick, onChange,
                                         selectValue, showSelect, showInput, inputType, placeholder, min, name, maxLength}) {

    return (
        <div className={`bg-bg-funds-card rounded-2xl shadow-lg w-full h-auto min-h-36 flex flex-col justify-between gap-4 lg:gap-7 p-4 lg:p-5 shrink-0`}>
            <div className={"flex flex-col"}>
                <h2 className={"font-bold text-lg lg:text-xl text-text-main"}>{header}</h2>
                <p className={"text-text-main text-sm lg:text-base"}>{paragraph}</p>
            </div>
            <div className={"w-full flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-auto"}>
                <div className={"w-full sm:w-auto"}>
                    {showSelect && (
                        <select
                            className={"w-full sm:w-auto px-2 lg:px-1 rounded-xl h-10 lg:h-12 cursor-pointer bg-bg-funds-card hover:bg-bg-main text-text-main text-sm lg:text-base"}
                            onChange={onChange}
                            value={selectValue}>
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    )}
                    {showInput && (
                        <input className={"w-full sm:w-auto rounded-xl h-10 lg:h-12 bg-bg-funds-card text-text-main border-border-col border-2 flex-1 p-2 text-sm lg:text-base"}
                               type={inputType} placeholder={placeholder} min={min} name={name} onChange={onChange} maxLength={maxLength}></input>
                    )}
                </div>
                {showButton && (
                    <button className={"w-full sm:w-24 h-10 lg:h-12 border-2 border-green-600 text-white hover:border-green-700 " +
                        "rounded-xl bg-green-500 hover:bg-green-600 transition duration-150 ease-out hover:ease-in text-sm lg:text-base shrink-0"}
                            onClick={onClick}>Zapisz
                    </button>
                )}
            </div>
        </div>
    )
}