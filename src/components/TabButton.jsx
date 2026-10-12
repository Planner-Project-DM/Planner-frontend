export default function TabButton({ label, tabName, activeMark, setActiveMark }) {
    return (
        <button
            onClick={() => setActiveMark(tabName)}
            className={`flex items-center justify-center h-10 lg:h-12 px-4 lg:px-0 w-auto lg:w-full rounded-2xl border text-sm lg:text-base whitespace-nowrap shrink-0 lg:shrink
                ${activeMark === tabName
                ? "bg-accent text-white border-accent"
                : "bg-bg-main text-text-main border-border-col hover:bg-bg-input"
            }`}
        >
            {label}
        </button>
    )
}