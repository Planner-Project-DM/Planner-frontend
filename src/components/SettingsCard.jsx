export default function SettingsCard({header, paragraph, showButton, options, onClick, onChange,
                                         selectValue, showSelect, showInput, inputType, placeholder, min, name, maxLength}) {

    return (
        <div className={`bg-bg-funds-card rounded-2xl shadow-lg  w-full min-h-36 flex flex-col gap-7 p-3`}>
            <div className={"flex flex-col"}>
                <h2 className={"font-bold text-xl text-text-main"}>{header}</h2>
                <p className={"text-text-main"}>{paragraph}</p>
            </div>
            <div className={"w-full flex justify-between"}>
                <div>
                    {showSelect && (
                        <select
                            className={"rounded-xl h-12 cursor-pointer bg-bg-funds-card hover:bg-bg-main text-text-main"}
                            onChange={onChange}
                            value={selectValue}>
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    )}
                    {showInput && (
                        <input className={"rounded-xl h-12 bg-bg-funds-card text-text-main border-border-col border-2 flex-1 p-1"}
                            type={inputType} placeholder={placeholder} min={min} name={name} maxLength={maxLength}></input>
                    )}
                </div>
                {showButton && (
                    <button className={"w-24 h-12 border-2 border-green-600 text-white hover:border-green-700 " +
                        "rounded-xl bg-green-500 hover:bg-green-600 transition duration-150 ease-out hover:ease-in"}
                            onClick={onClick}>Zapisz
                    </button>
                )}
            </div>
        </div>
    )
}