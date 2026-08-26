export default function FilterButtons({name, onclick, isActive, padding}) {

    return (
        <>
            <button onClick={onclick}
            className={`min-w-24 h-10  border-2 rounded-xl  flex-shrink-0 ${padding}
            ${isActive ? "bg-accent text-white border-accent-hover hover:bg-accent-hover" 
                : "bg-bg-main text-text-main border-border-col hover:bg-bg-input"
            }`}>{name}</button>
        </>
    )
}